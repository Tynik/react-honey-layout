import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import type { ComponentWithAs, Nullable } from '../../types';
import type { HoneyDraggableMoveHandler } from '../../hooks';
import type { HoneyListItem, HoneyListGenericProps } from '../HoneyList';
import { getHoneyListItemId } from '../HoneyList';
import { HoneyBox } from '../HoneyBox';
import { useHoneyDraggable } from '../../hooks';
import { getTransformationValues } from '../../utils';
import { resolveColor } from '../../helpers';

type HoneyLoopingListDirection = 'vertical' | 'horizontal';

export const HoneyLoopingListStyled = styled(HoneyBox)`
  overflow: hidden;
`;

export const HoneyLoopingListItemStyled = styled.div``;

type HoneyLoopingListProps<Item extends HoneyListItem> = HoneyListGenericProps<
  Item,
  {
    activeItemIndex: number;
    direction?: HoneyLoopingListDirection;
  }
>;

export const HoneyLoopingList = <Item extends HoneyListItem>({
  children,
  items: originalItems,
  itemKey,
  activeItemIndex,
  direction = 'vertical',
  ...props
}: ComponentWithAs<HoneyLoopingListProps<Item>>) => {
  const [items, setItems] = useState(originalItems);

  const loopingListRef = useRef<Nullable<HTMLElement>>(null);
  const itemIndexRef = useRef(-1);

  const totalItems = items?.length ?? 0;

  const onMove = useCallback<HoneyDraggableMoveHandler<HTMLElement>>(loopingList => {
    const loopingListContainer = loopingList.parentElement as HTMLElement;

    const loopingListHeightCenter = loopingListContainer.clientHeight / 2;

    return ({ deltaX, deltaY }) => {
      const { translateX, translateY } = getTransformationValues(loopingList);

      const newContainerPositionX = direction === 'horizontal' ? translateX + deltaX : 0;
      const newContainerPositionY = direction === 'vertical' ? translateY + deltaY : 0;

      loopingList.style.transform = `translate(${newContainerPositionX}px, ${newContainerPositionY}px)`;

      // (Array.from(loopingList.children) as HTMLElement[]).some((item, itemIndex) => {
      //   const itemTopPosition = translateY + item.offsetTop;
      //   const itemBottomPosition = itemTopPosition + item.clientHeight;
      //
      //   if (containerHeightCenter > itemTopPosition && containerHeightCenter < itemBottomPosition) {
      //     if (itemIndex !== itemIndexRef.current) {
      //       itemIndexRef.current = itemIndex;
      //
      //       console.log(itemIndex);
      //
      //       setItems(items =>
      //         deltaY > 0
      //           ? [generateRandomString(5) as Item, ...(items?.slice(0, -1) ?? [])]
      //           : [...(items?.slice(1) ?? []), generateRandomString(5) as Item],
      //       );
      //     }
      //
      //     return true;
      //   }
      //
      //   return false;
      // });
    };
  }, []);

  useHoneyDraggable(loopingListRef, {
    onMove,
  });

  useEffect(() => {
    //
  }, []);

  useEffect(() => {
    const loopingList = loopingListRef.current;
    if (!loopingList) {
      return;
    }

    const centeredItem = loopingList.children[activeItemIndex] as HTMLElement;

    const loopingListHeightCenter = loopingList.parentElement!.clientHeight / 2;

    const itemCenter = centeredItem.offsetTop + centeredItem.clientHeight / 2;
    const newPosition = itemCenter - loopingListHeightCenter;

    // loopingList.style.transform = `translate(0, -${newPosition}px)`;
    //
    // const realItemIndex = currentItemIndex % totalItems;

    // loopingList.style.transform = `translateY(-${realIndex * itemHeight}px)`;
    // loopingList.style.transition =
    //   currentIndex < totalItems - itemCount ? 'transform 0.5s ease-in-out' : 'none';
  }, []);

  return (
    <HoneyBox $overflow="hidden" data-testid="honey-looping-list-container" {...props}>
      {/* @ts-expect-error */}
      <HoneyLoopingListStyled ref={loopingListRef} data-testid="honey-looping-list">
        {items?.map((item, itemIndex, thisItems) => {
          const itemId = getHoneyListItemId(item, itemKey, itemIndex);

          return (
            <HoneyLoopingListItemStyled
              key={String(itemId)}
              // ARIA
              aria-current={itemIndex === activeItemIndex}
            >
              {children(item, itemIndex, thisItems)}
            </HoneyLoopingListItemStyled>
          );
        })}
      </HoneyLoopingListStyled>
    </HoneyBox>
  );
};

const HoneyLoopingListExampleStyled = styled.div`
  padding: 8px;

  border-radius: 4px;
  border: 1px solid ${resolveColor('neutral.charcoalDark')};

  ${HoneyLoopingListStyled} {
    padding: 0;
    list-style-type: none;

    user-select: none;

    > * {
      padding: 4px 8px;
      border-radius: 4px;

      font-size: 1rem;

      &[aria-current='true'] {
        font-weight: bold;
        font-size: 1.3rem;

        background-color: ${resolveColor('neutral.charcoalDark')};
      }
    }
  }
`;

export const HoneyLoopingListExample = () => {
  const items = Array.from(Array(12)).map((_, index) => index + 1);

  return (
    <HoneyLoopingListExampleStyled>
      <HoneyLoopingList
        items={items}
        itemKey={item => item.toString()}
        activeItemIndex={Math.floor(items.length / 2)}
        $maxHeight="250px"
      >
        {item => item}
      </HoneyLoopingList>
    </HoneyLoopingListExampleStyled>
  );
};
