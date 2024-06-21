import type { HoneyCSSMediaRule, HoneyFlattenedItem, KeysWithArrayValues } from './types';

export const camelToDashCase = (str: string) =>
  str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

/**
 * Converts a pixel value to rem.
 *
 * @param px - The pixel value to be converted to rem.
 * @param base - The base value for conversion. Default is 16, which is the typical root font size.
 *
 * @returns The value in rem as a string.
 */
export const pxToRem = (px: number, base: number = 16): string => {
  return `${px / base}rem`;
};

/**
 * Converts a 3-character or 6-character HEX color code to an 8-character HEX with alpha (RRGGBBAA) format.
 *
 * @param hex - The 3-character or 6-character HEX color code (e.g., "#RGB" or "#RRGGBB" or "RGB" or "RRGGBB").
 * @param alpha - The alpha transparency value between 0 (fully transparent) and 1 (fully opaque).
 *
 * @throws {Error} If alpha value is not between 0 and 1, or if the hex code is invalid.
 *
 * @returns The 8-character HEX with alpha (RRGGBBAA) format color code, or null if input is invalid.
 */
export const convertHexToHexWithAlpha = (hex: string, alpha: number): string => {
  if (alpha < 0 || alpha > 1) {
    throw new Error(`[honey-layout]: Alpha "${alpha}" is not a valid hex format.`);
  }

  const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  const match = hex.match(hexRegex);
  if (!match) {
    throw new Error(`[honey-layout]: Invalid hex format.`);
  }

  const cleanHex = match[1];

  // Expand 3-character hex to 6-character hex if necessary
  const fullHex =
    cleanHex.length === 3
      ? cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2]
      : cleanHex;

  // Convert to 8-character hex with alpha
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .toUpperCase()
    .padStart(2, '0');

  return `#${fullHex + alphaHex}`;
};

/**
 * Builds a media query string based on the provided options.
 *
 * @param {HoneyCSSMediaRule[]} rules - Conditions for the media query.
 *
 * @returns {string} The generated media query string.
 */
export const media = (rules: HoneyCSSMediaRule[]): string => {
  const mediaRules = rules.map(rule => {
    const conditions = [
      rule.width && ['width', rule.width],
      rule.minWidth && ['min-width', rule.minWidth],
      rule.maxWidth && ['max-width', rule.maxWidth],
      rule.height && ['height', rule.height],
      rule.minHeight && ['min-height', rule.minHeight],
      rule.maxHeight && ['max-height', rule.maxHeight],
      rule.orientation && ['orientation', rule.orientation],
      rule.minResolution && ['min-resolution', rule.minResolution],
      rule.maxResolution && ['max-resolution', rule.maxResolution],
      rule.resolution && ['resolution', rule.resolution],
      rule.update && ['update', rule.update],
    ]
      .filter(Boolean)
      .map(r => r && `(${r[0]}: ${r[1]})`)
      .join(' and ');

    const operatorPart = rule.operator ? `${rule.operator} ` : '';
    const conditionsPart = conditions ? ` and ${conditions}` : '';

    return `${operatorPart}${rule.mediaType ?? 'screen'}${conditionsPart}`;
  });

  return `@media ${mediaRules.join(', ')}`;
};

/**
 * Converts a nested list structure into a flat list, excluding the nested list key from the result and adding a depth level property.
 *
 * @template Item - The type of the items in the list.
 *
 * @param items - The array of items to be flattened. Can be undefined.
 * @param nestedListKey - The key in each item that contains the nested list.
 * @param result - The array that accumulates the flattened items. Defaults to an empty array.
 * @param parentIndex - Optional. The index of the parent item in the flattened structure. Defaults to undefined for parent item.
 * @param depthLevel - Optional. The current depth level of the item in the nested structure. Defaults to 0.
 *
 * @returns A flat array of items, excluding the nested list key and including a depthLevel property.
 */
export const flattenNestedList = <Item extends object>(
  items: Item[] | undefined,
  nestedListKey: KeysWithArrayValues<Item>,
  result: HoneyFlattenedItem<Item, typeof nestedListKey>[] = [],
  parentIndex: number | undefined = undefined,
  depthLevel = 0,
) => {
  items?.forEach(item => {
    const { [nestedListKey]: _, ...itemWithoutNestedListKey } = item;

    result.push({
      ...itemWithoutNestedListKey,
      parentIndex,
      depthLevel,
    });

    const nestedList = item[nestedListKey];

    if (Array.isArray(nestedList)) {
      flattenNestedList(nestedList, nestedListKey, result, result.length - 1, depthLevel + 1);
    }
  });

  return result;
};
