import { useCallback, useEffect } from 'react';
import type { MutableRefObject } from 'react';

import type { Nullable } from '../types';
import type { HoneyDraggableMoveHandler, HoneyDraggableHandlers } from './use-honey-draggable';
import { useHoneyDraggable } from './use-honey-draggable';
import { calculatePercentage, getTransformationValues } from '../utils';

type SyntheticScrollableContainerOptions<Element extends HTMLElement> = Pick<
  HoneyDraggableHandlers<Element>,
  'onStart' | 'onEnd'
> & {
  /**
   * The percentage of the window width and height within which dragging is allowed.
   *
   * @default 0
   */
  availableWindowPercentage?: number;
};

/**
 * A hook that enables synthetic scrolling behavior for a container element.
 * It allows horizontal and vertical dragging within a specified window percentage when the content overflows.
 * The hook handles touch and mouse events for dragging and resets the scroll position upon window resize.
 *
 * @param {MutableRefObject<Nullable<Element>>} scrollableContainerRef - A ref to the scrollable container element to be assigned to the target element.
 * @param {SyntheticScrollableContainerOptions<Element>} options - Options for configuring the synthetic scrollable container.
 *
 * @returns {MutableRefObject<Nullable<Element>>} - A ref to the scrollable container element that should be assigned to the target element.
 */
export const useHoneySyntheticScrollableContainer = <Element extends HTMLElement>(
  scrollableContainerRef: MutableRefObject<Nullable<Element>>,
  {
    availableWindowPercentage = 0,
    onStart,
    onEnd,
  }: SyntheticScrollableContainerOptions<Element> = {},
): MutableRefObject<Nullable<Element>> => {
  const onMove = useCallback<HoneyDraggableMoveHandler<Element>>(
    scrollableContainer =>
      ({ deltaX, deltaY }) => {
        const overflowWidth = scrollableContainer.scrollWidth - scrollableContainer.clientWidth;
        const overflowHeight = scrollableContainer.scrollHeight - scrollableContainer.clientHeight;

        // If there is no overflow, exit early
        if (overflowWidth <= 0 && overflowHeight <= 0) {
          return;
        }

        const horizontalThreshold = calculatePercentage(
          scrollableContainer.clientWidth,
          availableWindowPercentage,
        );

        const verticalThreshold = calculatePercentage(
          scrollableContainer.clientHeight,
          availableWindowPercentage,
        );

        const { translateX, translateY } = getTransformationValues(scrollableContainer);

        const newContainerPositionX = translateX + deltaX;
        const newContainerPositionY = translateY + deltaY;

        let shouldUpdateTransform = false;
        let updatedTranslateX = translateX;
        let updatedTranslateY = translateY;

        if (
          (deltaX < 0 && newContainerPositionX >= (overflowWidth + horizontalThreshold) * -1) ||
          (deltaX > 0 && newContainerPositionX <= horizontalThreshold)
        ) {
          updatedTranslateX = newContainerPositionX;
          shouldUpdateTransform = true;
        }

        if (
          (deltaY < 0 && newContainerPositionY >= (overflowHeight + verticalThreshold) * -1) ||
          (deltaY > 0 && newContainerPositionY <= verticalThreshold)
        ) {
          updatedTranslateY = newContainerPositionY;
          shouldUpdateTransform = true;
        }

        if (shouldUpdateTransform) {
          scrollableContainer.style.transform = `translate(${updatedTranslateX}px, ${updatedTranslateY}px)`;
        }
      },
    [availableWindowPercentage],
  );

  useHoneyDraggable(scrollableContainerRef, {
    onStart,
    onEnd,
    onMove,
  });

  useEffect(() => {
    const resizeHandler = () => {
      scrollableContainerRef.current?.style.removeProperty('transform');
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return scrollableContainerRef;
};
