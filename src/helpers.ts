import * as CSS from 'csstype';
import { css } from 'styled-components';

import type {
  HoneyBoxProps,
  HoneyBreakpointName,
  HoneyCSSArrayValue,
  HoneyCSSLengthShortHandValue,
  HoneyCSSLengthUnit,
  HoneyCSSMultiValue,
  HoneyCSSPropertyValue,
  HoneyCSSMediaRule,
  HoneySpacings,
  HoneyTheme,
  HoneyThemedProps,
} from './types';
import { camelToDashCase, buildMediaQuery } from './utils';

/**
 * Retrieves the CSS property value corresponding to the provided breakpoint.
 * If the property value is an object (indicating a responsive value),
 * it returns the value associated with the specified breakpoint.
 *
 * @param {HoneyCSSPropertyValue<CSSProperty>} propertyValue - The property value which can be an object or any other type.
 * @param {HoneyBreakpointName} breakpoint - The name of the breakpoint.
 */
const getCSSPropertyValue = <CSSProperty extends keyof CSS.Properties>(
  propertyValue: HoneyCSSPropertyValue<CSSProperty>,
  breakpoint: HoneyBreakpointName,
) => (typeof propertyValue === 'object' ? propertyValue[breakpoint] : propertyValue);

/**
 * Generates CSS styles based on the provided breakpoint and props.
 * Filters the props to include only those with breakpoints matching the specified breakpoint.
 * For each matching prop, it converts the property name to dash-case and retrieves the corresponding value.
 *
 * @param {HoneyBreakpointName} breakpoint - The name of the breakpoint.
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
 * Utility function that returns functions for generating media queries for the specified breakpoint.
 * The down function creates a media query for screen sizes smaller than the breakpoint,
 * while the up function creates a media query for screen sizes larger than the breakpoint.
 *
 * @param {HoneyBreakpointName} breakpoint - The name of the breakpoint.
 * @param {HoneyCSSMediaRule} [ruleOptions={}] - Additional options for the media rule.
 *
 * @returns Functions for generating media queries.
 */
export const buildBreakpointMediaQuery = (
  breakpoint: HoneyBreakpointName,
  ruleOptions: Omit<HoneyCSSMediaRule, 'width' | 'minWidth' | 'maxWidth'> = {},
) => {
  const resolveBreakpointValue = (theme: HoneyTheme) => {
    const value = theme.breakpoints[breakpoint];
    if (!value) {
      throw new Error(`[honey-layout]: Setup for breakpoint "${breakpoint}" was not found`);
    }

    return value;
  };

  const down = ({ theme }: HoneyThemedProps<HoneyBoxProps>) => {
    return buildMediaQuery([
      {
        maxWidth: `${resolveBreakpointValue(theme)}px`,
        ...ruleOptions,
      },
    ]);
  };

  const up = ({ theme }: HoneyThemedProps<HoneyBoxProps>) => {
    return buildMediaQuery([
      {
        minWidth: `${resolveBreakpointValue(theme)}px`,
        ...ruleOptions,
      },
    ]);
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
    const breakpointConfig = theme.breakpoints[breakpoint];

    if (!breakpointConfig || !checkIfApplyBreakpoint(breakpoint, props)) {
      return null;
    }

    return css`
      ${buildBreakpointMediaQuery(breakpoint).up} {
        ${generateStyles(breakpoint)};
      }
    `;
  };

/**
 * Conditional type to determine the return type of the `resolveSpacing` function.
 *
 * @template MultiValue - Type of the spacing value, can be a single value or an array of values.
 * @template Unit - CSS length unit, which can be null or a specific unit type.
 * @template T - Type of the numeric value.
 */
type ResolveSpacingResult<
  MultiValue extends HoneyCSSMultiValue<T>,
  Unit extends HoneyCSSLengthUnit | null,
  T extends number,
> = Unit extends null
  ? MultiValue extends HoneyCSSArrayValue<T>
    ? // Returns an array of calculated values if `MultiValue` is an array
      HoneyCSSArrayValue<T>
    : // Returns a single calculated value if `MultiValue` is a single number
      T
  : MultiValue extends HoneyCSSArrayValue<T>
    ? // Returns a shorthand CSS value for arrays with specified unit
      HoneyCSSLengthShortHandValue<MultiValue, NonNullable<Unit>>
    : // Returns a single value with specified unit
      `${T}${Unit}`;

/**
 * Resolves the spacing value based on the provided `value`, `unit`, and `type`.
 *
 * @param value - The spacing factor to be applied, which can be a single number or an array of 2, 3, or 4 numbers.
 * @param unit - The CSS unit to be used for the calculated value, e.g., 'px', 'em'. Set `null` to apply no unit. Default: 'px'.
 * @param type - The type of spacing to be used from the theme, e.g., 'base', 'small', 'large'. Default: 'base'.
 *
 * @returns The resolved spacing value, either as a single number or a string of space-separated numbers, optionally with the specified unit.
 *
 * @template MultiValue - Type of the spacing value, can be a single value or an array of values.
 * @template Unit - CSS length unit, which can be null or a specific unit type.
 * @template T - Type of the numeric value.
 */
export const resolveSpacing =
  <
    MultiValue extends HoneyCSSMultiValue<T>,
    Unit extends HoneyCSSLengthUnit | null = 'px',
    T extends number = number,
  >(
    value: MultiValue,
    unit: Unit = 'px' as Unit,
    type: keyof HoneySpacings = 'base',
  ) =>
  ({ theme }: HoneyThemedProps): ResolveSpacingResult<MultiValue, Unit, T> => {
    const selectedSpacing = theme.spacings[type] ?? 0;

    if (typeof value === 'number') {
      const calculatedValue = value * selectedSpacing;

      return (unit ? `${calculatedValue}${unit}` : calculatedValue) as ResolveSpacingResult<
        MultiValue,
        Unit,
        T
      >;
    }

    const calculatedValues = value.map(v => {
      const calculatedValue = v * selectedSpacing;

      return unit ? `${calculatedValue}${unit}` : calculatedValue;
    });

    return calculatedValues.join(' ') as ResolveSpacingResult<MultiValue, Unit, T>;
  };
