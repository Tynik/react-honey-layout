import type { HoneyListItem, HoneyListItemId, HoneyListItemKey } from './HoneyList.types';

export const getListItemId = <Item extends HoneyListItem>(
  item: Item,
  itemKey: HoneyListItemKey<Item> | undefined,
  index: number,
): HoneyListItemId<Item> => {
  if (typeof itemKey === 'function') {
    return itemKey(item);
  }

  return itemKey ? item[itemKey] : index;
};
