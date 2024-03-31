import { useCallback, useRef } from 'react';
import type { MutableRefObject } from 'react';

export type UseHoneyInfiniteScrollOnFetchMoreItems = () => void;

export const useHoneyInfiniteScroll = <
  ScrollableContainerElement extends HTMLElement,
  TargetElement extends HTMLElement,
>(
  containerRef: MutableRefObject<ScrollableContainerElement | null> | undefined,
  onFetchMoreItems: UseHoneyInfiniteScrollOnFetchMoreItems,
) => {
  const scrollableContainerRef = useRef<ScrollableContainerElement | null>(null);

  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<TargetElement | null>(null);

  const assignIntersectionObserver = (
    scrollableContainer: ScrollableContainerElement | null,
    target: TargetElement | null,
  ) => {
    scrollableContainerRef.current = scrollableContainer;
    targetRef.current = target;

    if (!scrollableContainer) {
      return;
    }

    if (target) {
      const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          onFetchMoreItems();
        }
      };

      intersectionObserverRef.current = new IntersectionObserver(handleIntersection, {
        root: scrollableContainer,
        rootMargin: '0px',
        threshold: 0,
      });

      intersectionObserverRef.current.observe(target);
    } else if (intersectionObserverRef.current) {
      intersectionObserverRef.current.disconnect();

      intersectionObserverRef.current = null;
    }
  };

  const scrollableContainerRefFn = useCallback(
    (scrollableContainer: ScrollableContainerElement | null) => {
      assignIntersectionObserver(scrollableContainer, targetRef.current);
    },
    [],
  );

  const targetRefFn = useCallback(
    (target: TargetElement | null) => {
      assignIntersectionObserver(scrollableContainerRef.current, target);
    },
    [scrollableContainerRef, onFetchMoreItems],
  );

  return {
    scrollableContainerRef: scrollableContainerRefFn,
    targetRef: targetRefFn,
  };
};
