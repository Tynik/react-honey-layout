import * as CSS from 'csstype';

import type { ComponentType, HTMLAttributes, ReactNode } from 'react';
import type { DataType } from 'csstype';

export type TimeoutId = ReturnType<typeof setTimeout>;

export type KeysWithArrayValues<T> = {
  [K in keyof T]: T[K] extends unknown[] | null | undefined ? K : never;
}[Extract<keyof T, string>];

export type KeysWithNonArrayValues<T> = {
  [K in keyof T]: T[K] extends unknown[] | null | undefined ? never : K;
}[Extract<keyof T, string>];

type HoneyCSSAbsoluteLengthUnit = 'px' | 'cm' | 'mm' | 'in' | 'pt' | 'pc';
type HoneyCSSRelativeLengthUnit = 'em' | 'rem' | '%' | 'vh' | 'vw' | 'vmin' | 'vmax';

/**
 * Represents a CSS length unit, which can be either an absolute or relative length unit.
 */
export type HoneyCSSLengthUnit = HoneyCSSAbsoluteLengthUnit | HoneyCSSRelativeLengthUnit;

export type HoneyCSSResolution = 'dpi' | 'dpcm' | 'dppx' | 'x';

export type HoneyCSSResolutionValue = `${number}${HoneyCSSResolution}`;

export type HoneyCSSMediaOrientation = 'landscape' | 'portrait';

/**
 * Represents a specific CSS length value with a unit.
 */
export type HoneyCSSLengthValue<Unit extends HoneyCSSLengthUnit = HoneyCSSLengthUnit> =
  `${number}${Unit}`;

/**
 * Represents a shorthand CSS length value for 2, 3, or 4 values with the same unit.
 *
 * @template Value - Type of the value.
 * @template Unit - CSS length unit.
 */
export type HoneyCSSLengthShortHandValue<Value, Unit extends HoneyCSSLengthUnit> = Value extends [
  unknown,
  unknown,
]
  ? `${HoneyCSSLengthValue<Unit>} ${HoneyCSSLengthValue<Unit>}`
  : Value extends [unknown, unknown, unknown]
    ? `${HoneyCSSLengthValue<Unit>} ${HoneyCSSLengthValue<Unit>} ${HoneyCSSLengthValue<Unit>}`
    : Value extends [unknown, unknown, unknown, unknown]
      ? `${HoneyCSSLengthValue<Unit>} ${HoneyCSSLengthValue<Unit>} ${HoneyCSSLengthValue<Unit>} ${HoneyCSSLengthValue<Unit>}`
      : never;

/**
 * Represents an array of CSS values, either 2, 3, or 4 values.
 *
 * @template T - Type of the value.
 */
export type HoneyCSSArrayValue<T> = [T, T] | [T, T, T] | [T, T, T, T];

/**
 * Represents a CSS value that can be either a single value or an array of values.
 *
 * @template T - Type of the value.
 */
export type HoneyCSSMultiValue<T> = T | HoneyCSSArrayValue<T>;

/**
 * Options for CSS @media at-rule.
 */
export type HoneyCSSMediaRule = {
  operator?: 'not' | 'only';
  mediaType?: 'all' | 'print' | 'screen' | 'speech';
  width?: HoneyCSSLengthValue;
  minWidth?: HoneyCSSLengthValue;
  maxWidth?: HoneyCSSLengthValue;
  height?: HoneyCSSLengthValue;
  minHeight?: HoneyCSSLengthValue;
  maxHeight?: HoneyCSSLengthValue;
  orientation?: HoneyCSSMediaOrientation;
  resolution?: HoneyCSSResolutionValue;
  minResolution?: HoneyCSSResolutionValue;
  maxResolution?: HoneyCSSResolutionValue;
  update?: 'none' | 'slow' | 'fast';
};

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
 * A type representing a function that returns a value for a specific CSS property based on the provided theme.
 *
 * @template CSSProperty - The CSS property this function will generate a value for.
 */
type HoneyCSSPropertyValueFn<CSSProperty extends keyof CSS.Properties> = (props: {
  theme: HoneyTheme;
}) => CSS.Properties[CSSProperty];

/**
 * Represents a responsive CSS property value for a specific CSS property.
 * Each breakpoint name is associated with the corresponding CSS property value.
 */
type HoneyResponsiveCSSPropertyValue<CSSProperty extends keyof CSS.Properties> = Partial<
  Record<HoneyBreakpointName, CSS.Properties[CSSProperty] | HoneyCSSPropertyValueFn<CSSProperty>>
>;

/**
 * Represents a CSS property value that can be either a single value or a responsive value.
 * For responsive values, each breakpoint name is associated with the corresponding CSS property value.
 */
export type HoneyCSSPropertyValue<CSSProperty extends keyof CSS.Properties> =
  | CSS.Properties[CSSProperty]
  | HoneyCSSPropertyValueFn<CSSProperty>
  | HoneyResponsiveCSSPropertyValue<CSSProperty>;

/**
 * Defines a type representing a set of CSS properties where each property key is prefixed with a dollar sign ($).
 */
export type HoneyCSSProperties = Partial<{
  [CSSProperty in keyof CSS.Properties as `$${CSSProperty}`]: HoneyCSSPropertyValue<CSSProperty>;
}>;

/**
 * Represents the props that can be used to style a box element with CSS properties.
 */
export type HoneyBoxProps = HTMLAttributes<HTMLElement> & HoneyCSSProperties;

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

export type HoneyColor = DataType.Color;

/**
 * Defines the color palette used in the theme.
 */
export interface BaseHoneyColors {
  /**
   * Used for elements that require high visibility and emphasis, such as primary buttons, call-to-action elements,
   * and important elements like headers or titles.
   */
  primary: Record<string, HoneyColor>;
  /**
   * Used to complement the primary color and add visual interest.
   * Often used for secondary buttons, borders, and decorative elements to provide contrast and balance within the design.
   * Helps create a cohesive visual hierarchy by providing variation in color tones.
   */
  secondary: Record<string, HoneyColor>;
  /**
   * Used to draw attention to specific elements or interactions.
   * Often applied to interactive elements like links, icons, or tooltips to indicate their interactive nature.
   * Can be used sparingly to highlight important information or to create visual focal points.
   */
  accent: Record<string, HoneyColor>;
  /**
   * Used for backgrounds, text, and other elements where a subtle, non-distracting color is desired.
   * Provides a versatile palette for elements like backgrounds, borders, text, and icons, allowing other colors to stand
   * out more prominently. Helps maintain balance and readability without overwhelming the user with too much color.
   */
  neutral: Record<string, HoneyColor>;
  /**
   * Used to indicate successful or positive actions or states.
   * Often applied to elements like success messages, notifications, or icons to convey successful completion of tasks or operations.
   * Provides visual feedback to users to indicate that their actions were successful.
   */
  success: Record<string, HoneyColor>;
  /**
   * Used to indicate cautionary or potentially risky situations.
   * Applied to elements like warning messages, alerts, or icons to notify users about potential issues or actions that require attention.
   * Helps users recognize and address potential problems or risks before they escalate.
   */
  warning: Record<string, HoneyColor>;
  /**
   * Used to indicate errors, critical issues, or potentially destructive actions.
   * Applied to elements like error messages, validation indicators, form fields, or delete buttons to alert users about incorrect input,
   * system errors, or actions that may have irreversible consequences. Provides visual feedback to prompt users to
   * take corrective actions or seek assistance when encountering errors or potentially risky actions.
   */
  error: Record<string, HoneyColor>;
}

/**
 * Example of augmenting the colors interface.
 *
 * @example
 * ```typescript
 * declare module '@tynik/react-honey-layout' {
 *  interface HoneyColors {
 *    neutral: Record<'charcoalDark' | 'charcoalGray' | 'crimsonRed', HoneyColor>;
 *  }
 * }
 * ```
 */
export interface HoneyColors extends BaseHoneyColors {}

/**
 * Generates a union of all possible color keys by combining each property of `HoneyColors` with its corresponding keys.
 *
 * This type iterates over each key in the `HoneyColors` interface and creates a string template,
 * which combines the color type with each of its keys. The result is a union of all possible color keys.
 *
 * @example
 *
 * Given the `HoneyColors` interface:
 * ```typescript
 * interface HoneyColors {
 *   primary: Record<'blue' | 'green', HoneyColor>;
 *   neutral: Record<'charcoalDark' | 'charcoalGray' | 'crimsonRed', HoneyColor>;
 * }
 * ```
 *
 * The resulting `HoneyColorKey` type will be:
 * ```typescript
 * type HoneyColorKey = 'neutral.charcoalDark' | 'neutral.charcoalGray' | 'neutral.crimsonRed' | 'primary.blue' | 'primary.green';
 * ```
 */
export type HoneyColorKey = {
  [ColorType in keyof HoneyColors]: `${ColorType}.${keyof HoneyColors[ColorType] & string}`;
}[keyof HoneyColors];

export type HoneyFont = {
  size: number;
  family?: string;
  weight?: number;
  lineHeight?: number;
  letterSpacing?: number;
};

/**
 * Example of augmenting the fonts interface.
 *
 * @example
 * ```typescript
 * declare module '@tynik/react-honey-layout' {
 *  interface HoneyFonts {
 *    body: HoneyFont;
 *    caption: HoneyFont;
 *  }
 * }
 * ```
 */
export interface HoneyFonts {
  [key: string]: HoneyFont;
}

export type HoneyFontName = keyof HoneyFonts;

/**
 * Represents the theme configuration.
 */
export interface BaseHoneyTheme {
  breakpoints: Partial<HoneyBreakpoints>;
  container: Partial<HoneyContainer>;
  spacings: HoneySpacings;
  fonts: HoneyFonts;
  colors: HoneyColors;
}

export interface HoneyTheme extends BaseHoneyTheme {}

export type HoneyThemedProps<T = unknown> = { theme: HoneyTheme } & T;

export type ComponentWithAs<T, P = object> = {
  as?: string | ComponentType<P>;
} & T;

/**
 * Type definition for status content options in a component.
 *
 * This type is used to provide properties for handling different states of a component,
 * such as loading, error, and no content states, along with the content to display in each state.
 *
 * @template T - An optional generic type parameter to extend the type with additional properties.
 */
export type HoneyStatusContentOptions<T = unknown> = {
  /**
   * A flag indicating whether the component is in a loading state.
   *
   * @default false
   */
  isLoading?: boolean;
  /**
   * The content to display when the component is in a loading state.
   *
   * @default null
   */
  loadingBlockContent?: ReactNode;
  /**
   * A flag indicating whether the component has encountered an error.
   *
   * @default false
   */
  isError?: boolean;
  /**
   * The content to display when the component has encountered an error.
   *
   * @default null
   */
  errorBlockContent?: ReactNode;
  /**
   * A flag indicating whether the component has no content to display.
   *
   * @default false
   */
  isNoContent?: boolean;
  /**
   * The content to display when the component has no content to display.
   *
   * @default null
   */
  noContent?: ReactNode;
} & T;

/**
 * Represents an item that has been flattened with additional properties for hierarchical data structures.
 *
 * @template Item - The type of the original item.
 * @template NestedListKey - The key within `Item` that contains nested items or lists.
 */
export type HoneyFlattenedItem<Item extends object, NestedListKey extends string> = Omit<
  Item,
  // Remove `NestedListKey` from the keys of `Item`
  NestedListKey
> & {
  /**
   * Optional id of the parent item in the flattened structure.
   * Used to establish parent-child relationships in hierarchical data.
   */
  parentId: Item[KeysWithNonArrayValues<Item>] | undefined;
  /**
   * The depth level of the item in the flattened structure.
   * Indicates how deep the item is nested within the hierarchy.
   */
  depthLevel: number;
  /**
   * The total number of nested items within the current item.
   * Helps to keep track of the size of the nested structure.
   *
   * @default 0
   */
  totalNestedItems: number;
};
