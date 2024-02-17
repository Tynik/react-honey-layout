import type { DataType } from 'csstype';
import * as CSS from 'csstype';

/**
 * Represents the configuration for a single breakpoint in a responsive layout.
 * Contains optional `minWidth` and `maxWidth` values for the breakpoint,
 *  which define the range of screen widths for applying the @media rule.
 */
export type HoneyLayoutBreakpoint = Partial<{
  /**
   * Minimum width for the @media rule
   */
  minWidth: number;
  /**
   * Maximum width for the @media rule
   */
  maxWidth: number;
}>;

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
  xs: HoneyLayoutBreakpoint;
  sm: HoneyLayoutBreakpoint;
  md: HoneyLayoutBreakpoint;
  lg: HoneyLayoutBreakpoint;
  xl: HoneyLayoutBreakpoint;
};

export type HoneyLayoutBreakpointName = keyof HoneyLayoutBreakpoints;

type HoneyLayoutResponsiveCSSPropertyValue<CSSProperty extends keyof CSS.Properties> = Partial<
  Record<HoneyLayoutBreakpointName, CSS.Properties[CSSProperty]>
>;

export type HoneyLayoutCSSPropertyValue<CSSProperty extends keyof CSS.Properties> =
  | CSS.Properties[CSSProperty]
  | HoneyLayoutResponsiveCSSPropertyValue<CSSProperty>;

export type HoneyLayoutBoxProps = Partial<{
  [CSSProperty in keyof CSS.Properties as `$${CSSProperty}`]: HoneyLayoutCSSPropertyValue<CSSProperty>;
}>;

export type HoneyLayoutContainer = {
  maxWidth: CSS.Properties['width'];
};

export type HoneyLayoutPrimaryColors = string;
export type HoneyLayoutSecondaryColors = string;
export type HoneyLayoutAccentColors = string;
export type HoneyLayoutNeutralColors = string;
export type HoneyLayoutSuccessColors = string;
export type HoneyLayoutWarningColors = string;
export type HoneyLayoutErrorColors = string;

export type HoneyLayoutTheme = Partial<{
  breakpoints: Partial<HoneyLayoutBreakpoints>;
  container: Partial<HoneyLayoutContainer>;
  spacing: {
    // Value in px
    nominal: number;
  };
  colors: {
    primary: Record<HoneyLayoutPrimaryColors, DataType.Color>;
    secondary: Record<HoneyLayoutSecondaryColors, DataType.Color>;
    accent: Record<HoneyLayoutAccentColors, DataType.Color>;
    neutral: Record<HoneyLayoutNeutralColors, DataType.Color>;
    success: Record<HoneyLayoutSuccessColors, DataType.Color>;
    warning: Record<HoneyLayoutWarningColors, DataType.Color>;
    error: Record<HoneyLayoutErrorColors, DataType.Color>;
  };
}>;

export type HoneyLayoutThemedProps<T = unknown> = { theme: HoneyLayoutTheme } & T;
