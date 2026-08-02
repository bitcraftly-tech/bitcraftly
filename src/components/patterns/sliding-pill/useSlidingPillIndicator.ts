'use client';

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefCallback,
} from 'react';

export interface SlidingPillBox {
  left: number;
  top: number;
  width: number;
  height: number;
  ready: boolean;
}

const EMPTY: SlidingPillBox = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  ready: false,
};

/**
 * Shared sliding active-pill geometry — same motion language as
 * bitcraftly.com/careers Framer layoutId pills (spring-like CSS transition).
 */
export function useSlidingPillIndicator(activeId: string | null | undefined) {
  const containerRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef(new Map<string, HTMLElement>());
  const [box, setBox] = useState<SlidingPillBox>(EMPTY);

  const setContainerRef = useCallback((node: HTMLElement | null) => {
    containerRef.current = node;
  }, []);

  const setItemRef = useCallback((id: string, node: HTMLElement | null) => {
    if (node) itemRefs.current.set(id, node);
    else itemRefs.current.delete(id);
  }, []);

  const itemRef = useCallback(
    (id: string): RefCallback<HTMLElement> =>
      (node) => {
        setItemRef(id, node);
      },
    [setItemRef],
  );

  const update = useCallback(() => {
    const container = containerRef.current;
    if (!container || !activeId) {
      setBox(EMPTY);
      return;
    }

    const item = itemRefs.current.get(activeId);
    if (!item) {
      setBox(EMPTY);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    setBox({
      left: itemRect.left - containerRect.left + container.scrollLeft,
      top: itemRect.top - containerRect.top + container.scrollTop,
      width: itemRect.width,
      height: itemRect.height,
      ready: true,
    });
  }, [activeId]);

  useLayoutEffect(() => {
    update();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => update());
    resizeObserver.observe(container);
    for (const item of itemRefs.current.values()) {
      resizeObserver.observe(item);
    }

    window.addEventListener('resize', update);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [update, activeId]);

  const indicatorStyle: CSSProperties = {
    transform: `translate3d(${box.left}px, ${box.top}px, 0)`,
    width: box.width,
    height: box.height,
    opacity: box.ready && activeId ? 1 : 0,
  };

  return {
    containerRef: setContainerRef,
    setItemRef,
    itemRef,
    indicatorStyle,
    ready: box.ready,
  };
}
