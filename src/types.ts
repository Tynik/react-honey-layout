import type { HTMLAttributes } from 'react';
import type { DataType } from 'csstype';
import * as CSS from 'csstype';

/**
 * Represents the breakpoints configuration for a responsive layout.
 *
 * Notes:
 * - `xs`: Extra small devices
 * - `sm`: Small devices
 * - `md`: Medium devices
 * - `lg`: Large devices
 * - `xl`: Extra large devices
 */
export type HoneyBreakpoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type HoneyBreakpointName = keyof HoneyBreakpoints;

/**
 * Represents a responsive CSS property value for a specific CSS property.
 * Each breakpoint name is associated with the corresponding CSS property value.
 */
type HoneyResponsiveCSSPropertyValue<CSSProperty extends keyof CSS.Properties> = Partial<
  Record<HoneyBreakpointName, CSS.Properties[CSSProperty]>
>;

/**
 * Represents a CSS property value that can be either a single value or a responsive value.
 * For responsive values, each breakpoint name is associated with the corresponding CSS property value.
 */
export type HoneyCSSPropertyValue<CSSProperty extends keyof CSS.Properties> =
  | CSS.Properties[CSSProperty]
  | HoneyResponsiveCSSPropertyValue<CSSProperty>;

/**
 * Represents the props that can be used to style a box element with CSS properties.
 * Each CSS property is prefixed with '$' to indicate it's a `HoneyLayoutCSSPropertyValue`.
 */
export type HoneyBoxProps = HTMLAttributes<HTMLElement> &
  Partial<{
    [CSSProperty in keyof CSS.Properties as `$${CSSProperty}`]: HoneyCSSPropertyValue<CSSProperty>;
  }>;

/**
 * Represents the state of the screen layout.
 */
export type HoneyScreenState = {
  /** Indicates if the screen size is extra-small (xs). */
  isXs: boolean;
  /** Indicates if the screen size is small (sm). */
  isSm: boolean;
  /** Indicates if the screen size is medium (md). */
  isMd: boolean;
  /** Indicates if the screen size is large (lg). */
  isLg: boolean;
  /** Indicates if the screen size is extra-large (xl). */
  isXl: boolean;
  /** Indicates if the screen orientation is portrait. */
  isPortrait: boolean;
  /** Indicates if the screen orientation is landscape. */
  isLandscape: boolean;
};

export type HoneyContainer = {
  maxWidth: CSS.Properties['width'];
};

/**
 * Defines different spacing sizes available in the theme.
 */
export type HoneySpacings = {
  /**
   * The base spacing value in pixels.
   */
  base: number;
  // Additional spacing sizes
  small?: number;
  medium?: number;
  large?: number;
};

/**
 * Defines the color palette used in the theme.
 */
export interface BaseHoneyColors {
  primary: Record<string, DataType.Color>;
  secondary: Record<string, DataType.Color>;
  accent: Record<string, DataType.Color>;
  neutral: Record<string, DataType.Color>;
  success: Record<string, DataType.Color>;
  warning: Record<string, DataType.Color>;
  error: Record<string, DataType.Color>;
}

/**
 * Example of augmenting the colors interface.
 *
 * @example
 * ```typescript
 * declare module '@tynik/react-honey-layout' {
 *  interface HoneyColors {
 *    neutral: Record<'charcoalDark' | 'charcoalGray' | 'crimsonRed', DataType.Color>;
 *  }
 * }
 * ```
 */
export interface HoneyColors extends BaseHoneyColors {}

/**
 * Represents the theme configuration.
 */
export interface BaseHoneyTheme {
  breakpoints?: Partial<HoneyBreakpoints>;
  container?: Partial<HoneyContainer>;
  spacings?: HoneySpacings;
  colors?: HoneyColors;
}

export interface HoneyTheme extends BaseHoneyTheme {}

export type HoneyThemedProps<T = unknown> = { theme: HoneyTheme } & T;
