import type {
  HoneyCSSMediaRule,
  HoneyFlattenedItem,
  KeysWithArrayValues,
  KeysWithNonArrayValues,
} from './types';

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
 * Converts a nested list structure into a flat list, excluding the nested list key from the result and adding depth level, parent ID, and total nested items properties.
 *
 * @template Item - The type of the items in the list.
 *
 * @param items - The array of items to be flattened. Can be undefined.
 * @param itemIdKey - The key in each item that uniquely identifies it.
 * @param nestedItemsKey - The key in each item that contains the nested list.
 * @param result - The array that accumulates the flattened items. Defaults to an empty array.
 * @param parentId - Optional. The ID of the parent item in the flattened structure. Defaults to undefined for parent item.
 * @param depthLevel - Optional. The current depth level of the item in the nested structure. Defaults to 0.
 *
 * @returns A flat array of items, excluding the nested list key and including `depthLevel`, `parentId`, and `totalNestedItems` properties.
 */
export const flattenNestedList = <Item extends object>(
  items: Item[] | undefined,
  itemIdKey: KeysWithNonArrayValues<Item>,
  nestedItemsKey: KeysWithArrayValues<Item>,
  result: HoneyFlattenedItem<Item, typeof nestedItemsKey>[] = [],
  parentId: Item[KeysWithNonArrayValues<Item>] | undefined = undefined,
  depthLevel = 0,
): HoneyFlattenedItem<Item, typeof nestedItemsKey>[] => {
  items?.forEach(item => {
    const { [nestedItemsKey]: _, ...itemWithoutNestedListKey } = item;

    const nestedItems = item[nestedItemsKey];
    const isNestedItemArray = Array.isArray(nestedItems);

    result.push({
      ...itemWithoutNestedListKey,
      parentId,
      depthLevel,
      totalNestedItems: isNestedItemArray ? nestedItems.length : 0,
    });

    if (isNestedItemArray) {
      const parentId = item[itemIdKey];

      flattenNestedList(nestedItems, itemIdKey, nestedItemsKey, result, parentId, depthLevel + 1);
    }
  });

  return result;
};

/**
 * Filters flattened items based on the specified parent ID and an optional predicate.
 *
 * @template Item - The type of the items in the list.
 * @template NestedListKey - The key within `Item` that contains nested items or lists.
 *
 * @param items - The array of flattened items to filter.
 * @param parentId - The parent ID to filter the items by.
 * @param predicate - Optional. A function to further filter the flattened items that match the parent ID.
 *
 * @returns An array of flattened items that match the specified parent ID and predicate.
 */
export const filterFlattenedItems = <Item extends object, NestedListKey extends string>(
  items: HoneyFlattenedItem<Item, NestedListKey>[],
  parentId: Item[KeysWithNonArrayValues<Item>],
  predicate?: (flattenedItem: HoneyFlattenedItem<Item, NestedListKey>) => boolean,
) =>
  items.filter(
    flattenedItem =>
      flattenedItem.parentId === parentId && (!predicate || predicate(flattenedItem)),
  );
