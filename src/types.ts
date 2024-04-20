import type { ComponentType, HTMLAttributes } from 'react';
import type { DataType } from 'csstype';
import * as CSS from 'csstype';

export type TimeoutId = ReturnType<typeof setTimeout>;

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
  /** Max container width in px */
  maxWidth: number;
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
  /**
   * Used for elements that require high visibility and emphasis, such as primary buttons, call-to-action elements,
   * and important elements like headers or titles.
   */
  primary: Record<string, DataType.Color>;
  /**
   * Used to complement the primary color and add visual interest.
   * Often used for secondary buttons, borders, and decorative elements to provide contrast and balance within the design.
   * Helps create a cohesive visual hierarchy by providing variation in color tones.
   */
  secondary: Record<string, DataType.Color>;
  /**
   * Used to draw attention to specific elements or interactions.
   * Often applied to interactive elements like links, icons, or tooltips to indicate their interactive nature.
   * Can be used sparingly to highlight important information or to create visual focal points.
   */
  accent: Record<string, DataType.Color>;
  /**
   * Used for backgrounds, text, and other elements where a subtle, non-distracting color is desired.
   * Provides a versatile palette for elements like backgrounds, borders, text, and icons, allowing other colors to stand
   * out more prominently. Helps maintain balance and readability without overwhelming the user with too much color.
   */
  neutral: Record<string, DataType.Color>;
  /**
   * Used to indicate successful or positive actions or states.
   * Often applied to elements like success messages, notifications, or icons to convey successful completion of tasks or operations.
   * Provides visual feedback to users to indicate that their actions were successful.
   */
  success: Record<string, DataType.Color>;
  /**
   * Used to indicate cautionary or potentially risky situations.
   * Applied to elements like warning messages, alerts, or icons to notify users about potential issues or actions that require attention.
   * Helps users recognize and address potential problems or risks before they escalate.
   */
  warning: Record<string, DataType.Color>;
  /**
   * Used to indicate errors, critical issues, or potentially destructive actions.
   * Applied to elements like error messages, validation indicators, form fields, or delete buttons to alert users about incorrect input,
   * system errors, or actions that may have irreversible consequences. Provides visual feedback to prompt users to
   * take corrective actions or seek assistance when encountering errors or potentially risky actions.
   */
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

export type ComponentWithAs<T, P = object> = {
  as?: string | ComponentType<P>;
} & T;
