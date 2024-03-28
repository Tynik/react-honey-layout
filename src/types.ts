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
export interface BaseHoneyLayoutColors {
  primary: Record<string, DataType.Color>;
  secondary: Record<string, DataType.Color>;
  accent: Record<string, DataType.Color>;
  neutral: Record<string, DataType.Color>;
  success: Record<string, DataType.Color>;
  warning: Record<string, DataType.Color>;
  error: Record<string, DataType.Color>;
}

/**
 * Example of augmenting the `HoneyLayoutColors` interface.
 * This adds a custom color palette to the theme.
 *
 * @example
 *
 * ```typescript
 * declare module '@tynik/react-honey-layout' {
 *  interface HoneyLayoutColors extends BaseHoneyLayoutColors {
 *    neutral: Record<'charcoalDark' | 'charcoalGray' | 'crimsonRed', DataType.Color>;
 *    custom: Record<string, DataType.Color>;
 *  }
 * }
 * ```
 */
export interface HoneyLayoutColors extends BaseHoneyLayoutColors {}

export interface BaseHoneyLayoutTheme {
  breakpoints?: Partial<HoneyLayoutBreakpoints>;
  container?: Partial<HoneyLayoutContainer>;
  spacings?: HoneyLayoutSpacings;
  colors?: HoneyLayoutColors;
}
/**
 * Represents the theme configuration.
 */
export interface HoneyLayoutTheme extends BaseHoneyLayoutTheme {}

export type HoneyLayoutThemedProps<T = unknown> = { theme: HoneyLayoutTheme } & T;
