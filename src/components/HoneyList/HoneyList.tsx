import React, { Fragment } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import type { ComponentWithAs, HoneyStatusContentOptions } from '../../types';
import type { HoneyListItem, HoneyListItemKey } from './HoneyList.types';
import type { HoneyBoxProps } from '../HoneyBox';
import { HoneyBox } from '../HoneyBox';
import { HoneyStatusContent } from '../HoneyStatusContent';
import { getHoneyListItemId } from './HoneyList.helpers';

const HoneyListStyled = styled(
  HoneyBox,
) //   .attrs({
//   role: 'list',
// })
`
  overflow: hidden auto;
`;

export type HoneyListGenericProps<Item extends HoneyListItem, T = unknown> = Omit<
  HoneyBoxProps,
  'children'
> & {
  children: (item: Item, itemIndex: number, thisItems: Item[]) => ReactNode;
  items: Item[] | undefined;
  itemKey?: HoneyListItemKey<Item>;
} & T;

type HoneyListProps<Item extends HoneyListItem> = HoneyListGenericProps<
  Item,
  Omit<HoneyStatusContentOptions, 'isNoContent'>
>;

export const HoneyList = <Item extends HoneyListItem>({
  children,
  items,
  itemKey,
  isLoading,
  loadingBlockContent,
  isError,
  errorBlockContent,
  noContent,
  ...boxProps
}: ComponentWithAs<HoneyListProps<Item>>) => {
  return (
    <HoneyListStyled data-testid="honey-list" {...boxProps}>
      <HoneyStatusContent
        isLoading={isLoading}
        loadingBlockContent={loadingBlockContent}
        isError={isError}
        errorBlockContent={errorBlockContent}
        isNoContent={items?.length === 0}
        noContent={noContent}
      >
        {items?.map((item, itemIndex, thisItems) => {
          const itemId = getHoneyListItemId(item, itemKey, itemIndex);

          return <Fragment key={String(itemId)}>{children(item, itemIndex, thisItems)}</Fragment>;
        })}
      </HoneyStatusContent>
    </HoneyListStyled>
  );
};
