import * as CSS from 'csstype';
import { css } from 'styled-components';

import type {
  HoneyBoxProps,
  HoneyBreakpointName,
  HoneyCSSPropertyValue,
  HoneyThemedProps,
} from './types';
import { camelToDashCase, createMediaRule } from './utils';

/**
 * Retrieves the CSS property value corresponding to the provided breakpoint.
 * If the property value is an object (indicating a responsive value),
 * it returns the value associated with the specified breakpoint.
 */
const getCSSPropertyValue = <CSSProperty extends keyof CSS.Properties>(
  propertyValue: HoneyCSSPropertyValue<CSSProperty>,
  breakpoint: HoneyBreakpointName,
) => (typeof propertyValue === 'object' ? propertyValue[breakpoint] : propertyValue);

/**
 * Generates CSS styles based on the provided breakpoint and props.
 * Filters the props to include only those with breakpoints matching the specified breakpoint.
 * For each matching prop, it converts the property name to dash-case and retrieves the corresponding value.
 */
export const generateStyles =
  (breakpoint: HoneyBreakpointName) =>
  ({ theme, ...props }: HoneyThemedProps<HoneyBoxProps>) => css`
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

/**
 * Checks if any of the props require a media query for the specified breakpoint.
 * Filters the props to include only those with responsive values containing the specified breakpoint.
 */
const checkIfApplyBreakpoint = (breakpoint: HoneyBreakpointName, props: HoneyBoxProps) =>
  Object.entries(props).some(
    ([propertyName, propertyValue]) =>
      propertyName[0] === '$' && typeof propertyValue === 'object' && breakpoint in propertyValue,
  );

/**
 * Hook that returns functions for generating media queries for the specified breakpoint.
 * The down function creates a media query for screen sizes smaller than the breakpoint,
 * while the up function creates a media query for screen sizes larger than the breakpoint.
 */
export const useBreakpoint = (breakpoint: HoneyBreakpointName) => {
  const down = ({ theme }: HoneyThemedProps<HoneyBoxProps>) => {
    const size = theme.breakpoints?.[breakpoint];
    if (!size) {
      return null;
    }

    return createMediaRule({
      maxWidth: `${size}px`,
    });
  };

  const up = ({ theme }: HoneyThemedProps<HoneyBoxProps>) => {
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

/**
 * Generates media query styles based on the provided breakpoint and props.
 */
export const generateMediaStyles =
  (breakpoint: HoneyBreakpointName) =>
  ({ theme, ...props }: HoneyThemedProps<HoneyBoxProps>) => {
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
