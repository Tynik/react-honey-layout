import { useEffect } from 'react';
import type { MutableRefObject } from 'react';

import type { Nullable } from '../types';
import { calculateEuclideanDistance, calculateMovingSpeed } from '../utils';

export type HoneyDraggableStartHandler<Element extends HTMLElement> = (
  draggableElement: Element,
) => void;

type HoneyDraggableMoveContext = {
  deltaX: number;
  deltaY: number;
  distanceX: number;
  distanceY: number;
  euclideanDistance: number;
};

export type HoneyDraggableMoveHandler<Element extends HTMLElement> = (
  draggableElement: Element,
  // Return false when immediately stop the drag handling
) => (moveContext: HoneyDraggableMoveContext) => void | false;

type HoneyDraggableOnEndContext = {
  deltaX: number;
  deltaY: number;
  movingSpeedX: number;
  movingSpeedY: number;
};

export type HoneyDraggableEndHandler<Element extends HTMLElement> = (
  endContext: HoneyDraggableOnEndContext,
  draggableElement: Element,
) => void;

export type HoneyDraggableHandlers<Element extends HTMLElement> = {
  onMove: HoneyDraggableMoveHandler<Element>;
  /**
   * Callback function triggered when dragging starts.
   */
  onStart?: HoneyDraggableStartHandler<Element>;
  /**
   * Callback function triggered when dragging ends.
   */
  onEnd?: HoneyDraggableEndHandler<Element>;
};

/**
 * A hook that provides touch and mouse-based dragging functionality for an element.
 * It tracks touch and mouse events, calculates dragging speed and distances during the drag,
 * and exposes `onStart`, `onMove`, and `onEnd` callbacks to handle various stages of dragging.
 *
 * @param {MutableRefObject<Element>} draggableElementRef - A `ref` to the element that should be made draggable.
 * @param {Object} handlers - An object containing the callback functions for different dragging stages.
 */
export const useHoneyDraggable = <Element extends HTMLElement>(
  draggableElementRef: MutableRefObject<Nullable<Element>>,
  { onMove: onMoveHandler, onStart, onEnd }: HoneyDraggableHandlers<Element>,
) => {
  useEffect(() => {
    const draggableElement = draggableElementRef.current;
    if (!draggableElement) {
      return;
    }

    const onMove = onMoveHandler(draggableElement);

    let isDragging = false;

    let startPositionX = 0;
    let startPositionY = 0;
    let lastPositionX = 0;
    let lastPositionY = 0;

    let startTime = 0;

    /**
     * Handles the start of a drag event.
     *
     * @param {number} clientX - The initial X position of the drag.
     * @param {number} clientY - The initial Y position of the drag.
     */
    const startHandler = (clientX: number, clientY: number) => {
      isDragging = true;

      startPositionX = clientX;
      startPositionY = clientY;
      lastPositionX = clientX;
      lastPositionY = clientY;

      startTime = Date.now();

      onStart?.(draggableElement);
    };

    /**
     * Handles the end of a drag event.
     */
    const endHandler = () => {
      if (!isDragging) {
        return;
      }

      isDragging = false;

      if (onEnd) {
        const elapsedTime = Date.now() - startTime;

        const deltaX = lastPositionX - startPositionX;
        const deltaY = lastPositionY - startPositionY;

        const endContext: HoneyDraggableOnEndContext = {
          deltaX,
          deltaY,
          get movingSpeedX() {
            return calculateMovingSpeed(deltaX, elapsedTime);
          },
          get movingSpeedY() {
            return calculateMovingSpeed(deltaY, elapsedTime);
          },
        };

        onEnd(endContext, draggableElement);
      }
    };

    const mouseUpHandler = () => {
      endHandler();

      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };

    /**
     * Handles the drag move event.
     *
     * @param {number} clientX - The current X position of the drag.
     * @param {number} clientY - The current Y position of the drag.
     */
    const moveHandler = (clientX: number, clientY: number) => {
      if (!isDragging) {
        return;
      }

      const moveContext: HoneyDraggableMoveContext = {
        get deltaX() {
          return clientX - lastPositionX;
        },
        get deltaY() {
          return clientY - lastPositionY;
        },
        get distanceX() {
          return clientX - startPositionX;
        },
        get distanceY() {
          return clientY - startPositionY;
        },
        get euclideanDistance() {
          return calculateEuclideanDistance(startPositionX, startPositionY, clientX, clientY);
        },
      };

      if (onMove(moveContext) === false) {
        lastPositionX = clientX;
        lastPositionY = clientY;

        mouseUpHandler();
        return;
      }

      lastPositionX = clientX;
      lastPositionY = clientY;
    };

    const cancelHandler = () => {
      isDragging = false;
    };

    const touchStartHandler = (e: TouchEvent) => {
      const touch = e.touches[0];

      startHandler(touch.clientX, touch.clientY);
    };

    const touchMoveHandler = (e: TouchEvent) => {
      const touch = e.touches[0];

      moveHandler(touch.clientX, touch.clientY);
    };

    const touchEndHandler = () => {
      endHandler();
    };

    const touchCancelHandler = () => {
      cancelHandler();
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      moveHandler(e.clientX, e.clientY);
    };

    const mouseDownHandler = (e: MouseEvent) => {
      startHandler(e.clientX, e.clientY);

      window.addEventListener('mousemove', mouseMoveHandler);
      window.addEventListener('mouseup', mouseUpHandler);
    };

    draggableElement.addEventListener('touchstart', touchStartHandler, {
      passive: true,
    });
    draggableElement.addEventListener('touchmove', touchMoveHandler, {
      passive: true,
    });
    draggableElement.addEventListener('touchend', touchEndHandler);
    draggableElement.addEventListener('touchcancel', touchCancelHandler);
    draggableElement.addEventListener('mousedown', mouseDownHandler);

    return () => {
      draggableElement.removeEventListener('touchstart', touchStartHandler);
      draggableElement.removeEventListener('touchmove', touchMoveHandler);
      draggableElement.removeEventListener('touchend', touchEndHandler);
      draggableElement.removeEventListener('touchcancel', touchCancelHandler);
      draggableElement.removeEventListener('mousedown', mouseDownHandler);
    };
  }, [onEnd, onMoveHandler, onStart, draggableElementRef]);
};
