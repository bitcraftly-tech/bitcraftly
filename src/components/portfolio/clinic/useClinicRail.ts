'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type RailApi<T extends HTMLElement> = {
  railRef: React.RefObject<T | null>;
  atStart: boolean;
  atEnd: boolean;
  /** Scroll one card forward (`1`) or backward (`-1`). */
  scrollByCard: (direction: 1 | -1) => void;
  /** Wire to the rail's `onScroll` so the arrow disabled states stay accurate. */
  onScroll: () => void;
};

/** Shared scroll-snap carousel behaviour for the doctor and testimonial rails. */
export function useClinicRail<T extends HTMLElement>(): RailApi<T> {
  const railRef = useRef<T>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const onScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setAtStart(rail.scrollLeft <= 8);
    setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener('resize', onScroll);
    return () => window.removeEventListener('resize', onScroll);
  }, [onScroll]);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * direction, behavior: 'smooth' });
  }, []);

  return { railRef, atStart, atEnd, scrollByCard, onScroll };
}
