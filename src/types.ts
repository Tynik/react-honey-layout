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
export type HoneyLayoutBreakpoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type HoneyLayoutBreakpointName = keyof HoneyLayoutBreakpoints;

/**
 * Represents a responsive CSS property value for a specific CSS property.
 * Each breakpoint name is associated with the corresponding CSS property value.
 */
type HoneyLayoutResponsiveCSSPropertyValue<CSSProperty extends keyof CSS.Properties> = Partial<
  Record<HoneyLayoutBreakpointName, CSS.Properties[CSSProperty]>
>;

/**
 * Represents a CSS property value that can be either a single value or a responsive value.
 * For responsive values, each breakpoint name is associated with the corresponding CSS property value.
 */
export type HoneyLayoutCSSPropertyValue<CSSProperty extends keyof CSS.Properties> =
  | CSS.Properties[CSSProperty]
  | HoneyLayoutResponsiveCSSPropertyValue<CSSProperty>;

/**
 * Represents the props that can be used to style a box element with CSS properties.
 * Each CSS property is prefixed with '$' to indicate it's a `HoneyLayoutCSSPropertyValue`.
 */
export type HoneyLayoutBoxProps = Partial<{
  [CSSProperty in keyof CSS.Properties as `$${CSSProperty}`]: HoneyLayoutCSSPropertyValue<CSSProperty>;
}>;

/**
 * Represents the state of the screen layout.
 */
export type HoneyLayoutScreenState = {
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

export type HoneyLayoutContainer = {
  maxWidth: CSS.Properties['width'];
};

/**
 * Represents the primary colors used in the theme.
 * These type can be overwritten when using this library.
 *
 * Example of overriding:
 *
 * ```typescript
 * declare module '@tynik/react-honey-layout' {
 *   export type HoneyLayoutPrimaryColors = 'red' | 'blue' | 'green';
 * }
 * ```
 */
export type HoneyLayoutPrimaryColors = string;
export type HoneyLayoutSecondaryColors = string;
export type HoneyLayoutAccentColors = string;
export type HoneyLayoutNeutralColors = string;
export type HoneyLayoutSuccessColors = string;
export type HoneyLayoutWarningColors = string;
export type HoneyLayoutErrorColors = string;

/**
 * Defines different spacing sizes available in the theme.
 */
export type HoneyLayoutSpacings = {
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
export type HoneyLayoutColors = {
  primary: Record<HoneyLayoutPrimaryColors, DataType.Color>;
  secondary: Record<HoneyLayoutSecondaryColors, DataType.Color>;
  accent: Record<HoneyLayoutAccentColors, DataType.Color>;
  neutral: Record<HoneyLayoutNeutralColors, DataType.Color>;
  success: Record<HoneyLayoutSuccessColors, DataType.Color>;
  warning: Record<HoneyLayoutWarningColors, DataType.Color>;
  error: Record<HoneyLayoutErrorColors, DataType.Color>;
};

/**
 * Represents the theme configuration.
 */
export type HoneyLayoutTheme = Partial<{
  breakpoints: Partial<HoneyLayoutBreakpoints>;
  container: Partial<HoneyLayoutContainer>;
  spacings: HoneyLayoutSpacings;
  colors: HoneyLayoutColors;
}>;

export type HoneyLayoutThemedProps<T = unknown> = { theme: HoneyLayoutTheme } & T;
