export type HoneyListItem = object;

export type HoneyListItemKey<Item extends HoneyListItem> = ((item: Item) => string) | keyof Item;

export type HoneyListItemId<Item extends HoneyListItem> = Item[keyof Item] | number | string;
