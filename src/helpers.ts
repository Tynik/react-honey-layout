import * as CSS from 'csstype';
import { css } from 'styled-components';

import type {
  HoneyLayoutBoxProps,
  HoneyLayoutBreakpointName,
  HoneyLayoutCSSPropertyValue,
  HoneyLayoutThemedProps,
} from './types';
import { camelToDashCase, createMediaRule } from './utils';

const getCSSPropertyValue = <CSSProperty extends keyof CSS.Properties>(
  propertyValue: HoneyLayoutCSSPropertyValue<CSSProperty>,
  breakpoint: HoneyLayoutBreakpointName,
) => (typeof propertyValue === 'object' ? propertyValue[breakpoint] : propertyValue);

export const generateStyles =
  (breakpoint: HoneyLayoutBreakpointName) =>
  ({ theme, ...props }: HoneyLayoutThemedProps<HoneyLayoutBoxProps>) => css`
    ${Object.entries(props)
      .filter(
        ([propertyName, propertyValue]) =>
          (propertyName[0] === '$' && breakpoint === 'xs') ||
          (typeof propertyValue === 'object' && breakpoint in propertyValue),
      )
      .map(([propertyName, propertyValue]) => {
        const cssPropertyName = camelToDashCase(propertyName).slice(1);

        return css`
          ${cssPropertyName}: ${getCSSPropertyValue(propertyValue, breakpoint)};
        `;
      })}
  `;

const checkIfApplyBreakpoint = (
  breakpoint: HoneyLayoutBreakpointName,
  props: HoneyLayoutBoxProps,
) =>
  Object.entries(props).some(
    ([propertyName, propertyValue]) =>
      propertyName[0] === '$' && typeof propertyValue === 'object' && breakpoint in propertyValue,
  );

export const useBreakpoint = (breakpoint: HoneyLayoutBreakpointName) => {
  const down = ({ theme }: HoneyLayoutThemedProps<HoneyLayoutBoxProps>) => {
    const size = theme.breakpoints?.[breakpoint];
    if (!size) {
      return null;
    }

    return createMediaRule({
      maxWidth: `${size}px`,
    });
  };

  const up = ({ theme }: HoneyLayoutThemedProps<HoneyLayoutBoxProps>) => {
    const size = theme.breakpoints?.[breakpoint];
    if (!size) {
      return null;
    }

    return createMediaRule({
      minWidth: `${size}px`,
    });
  };

  return {
    down,
    up,
  };
};

export const generateMediaStyles =
  (breakpoint: HoneyLayoutBreakpointName) =>
  ({ theme, ...props }: HoneyLayoutThemedProps<HoneyLayoutBoxProps>) => {
    const breakpointConfig = theme.breakpoints?.[breakpoint];

    if (!breakpointConfig || !checkIfApplyBreakpoint(breakpoint, props)) {
      return null;
    }

    return css`
      ${useBreakpoint(breakpoint).up} {
        ${generateStyles(breakpoint)};
      }
    `;
  };
