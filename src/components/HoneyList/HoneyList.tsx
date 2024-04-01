import React, { Fragment } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import type { ComponentWithAs, HoneyBoxProps } from '../../types';
import type { HoneyListItem, HoneyListItemKey } from './HoneyList.types';
import type { HoneyConditionalBlockProps } from '../HoneyConditionalBlock';
import { HoneyBox } from '../HoneyBox';
import { HoneyConditionalBlock } from '../HoneyConditionalBlock';
import { getListItemId } from './HoneyList.helpers';

const HoneyListStyled = styled(HoneyBox).attrs({
  role: 'list',
})`
  overflow: hidden auto;
`;

type HoneyListProps<Item extends HoneyListItem> = ComponentWithAs<
  Omit<HoneyBoxProps, 'children'> &
    Omit<HoneyConditionalBlockProps, 'isNoContent'> & {
      children: (item: Item, itemIndex: number, thisItems: Item[]) => ReactNode;
      items: Item[] | undefined;
      itemKey?: HoneyListItemKey<Item>;
    }
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
}: HoneyListProps<Item>) => {
  return (
    <HoneyListStyled {...boxProps}>
      <HoneyConditionalBlock
        isLoading={isLoading}
        loadingBlockContent={loadingBlockContent}
        isError={isError}
        errorBlockContent={errorBlockContent}
        isNoContent={items?.length === 0}
        noContent={noContent}
      >
        {items?.map((item, itemIndex, thisItems) => {
          const itemId = getListItemId(item, itemKey, itemIndex);

          return <Fragment key={String(itemId)}>{children(item, itemIndex, thisItems)}</Fragment>;
        })}
      </HoneyConditionalBlock>
    </HoneyListStyled>
  );
};
