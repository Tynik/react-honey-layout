import React, { Fragment } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import type { ComponentWithAs, HoneyBoxProps, HoneyStatusContentOptions } from '../../types';
import type { HoneyListItem, HoneyListItemKey } from './HoneyList.types';
import { HoneyBox } from '../HoneyBox';
import { HoneyStatusContent } from '../HoneyStatusContent';
import { getListItemId } from './HoneyList.helpers';

const HoneyListStyled = styled(
  HoneyBox,
) //   .attrs({
//   role: 'list',
// })
`
  overflow: hidden auto;
`;

type HoneyListProps<Item extends HoneyListItem> = Omit<
  HoneyStatusContentOptions<
    Omit<HoneyBoxProps, 'children'> & {
      children: (item: Item, itemIndex: number, thisItems: Item[]) => ReactNode;
      items: Item[] | undefined;
      itemKey?: HoneyListItemKey<Item>;
    }
  >,
  'isNoContent'
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
    <HoneyListStyled {...boxProps}>
      <HoneyStatusContent
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
      </HoneyStatusContent>
    </HoneyListStyled>
  );
};
