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

type HoneyLayoutColorSegment =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'error';

export type HoneyLayoutTheme = Partial<{
  breakpoints: Partial<HoneyLayoutBreakpoints>;
  container: Partial<HoneyLayoutContainer>;
  spacing: unknown;
  colors: Record<HoneyLayoutColorSegment, Record<string, DataType.Color>>;
}>;

export type HoneyLayoutThemedProps<T> = { theme: HoneyLayoutTheme } & T;
