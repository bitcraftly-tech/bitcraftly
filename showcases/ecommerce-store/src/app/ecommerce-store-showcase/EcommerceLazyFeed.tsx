'use client';

import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';

import type { ShopProduct } from './ecommerce-demo-data';

const LOAD_DELAY_MS = 520;
const PAGE_SIZE = 4;

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function ProductCardSkeleton() {
  return (
    <div className="ec-feed-card-skeleton" aria-hidden>
      <div className="ec-feed-skel ec-feed-skel--thumb" />
      <div className="ec-feed-skel ec-feed-skel--line" />
      <div className="ec-feed-skel ec-feed-skel--line ec-feed-skel--short" />
      <div className="ec-feed-skel ec-feed-skel--price" />
      <div className="ec-feed-skel ec-feed-skel--line ec-feed-skel--tiny" />
      <div className="ec-feed-skel ec-feed-skel--btn" />
    </div>
  );
}

type EcLazySectionProps = {
  children: ReactNode;
  skeleton: ReactNode;
  className?: string;
  rootMargin?: string;
};

/** Facebook-style: shimmer first, then content when scrolled into view. */
export function EcLazySection({
  children,
  skeleton,
  className,
  rootMargin = '120px 0px',
}: EcLazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'idle' | 'loading' | 'ready'>('idle');

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      setPhase('ready');
      return;
    }

    let timer: number | null = null;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        setPhase('loading');
        observer.disconnect();
        timer = window.setTimeout(() => setPhase('ready'), LOAD_DELAY_MS);
      },
      { rootMargin, threshold: 0.08 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (timer != null) window.clearTimeout(timer);
    };
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} aria-busy={phase === 'loading'} data-ec-lazy={phase}>
      {phase === 'ready' ? <div className="ec-feed-reveal">{children}</div> : skeleton}
    </div>
  );
}

export function useEcInfiniteProducts(items: readonly ShopProduct[], pageSize = PAGE_SIZE) {
  const [visibleCount, setVisibleCount] = useState(() => Math.min(pageSize, items.length));
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const itemsKey = items.map((p) => p.id).join('|');

  useEffect(() => {
    setVisibleCount(Math.min(pageSize, items.length));
    setLoading(false);
    loadingRef.current = false;
  }, [itemsKey, items.length, pageSize]);

  const hasMore = visibleCount < items.length;

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        const delay = prefersReducedMotion() ? 0 : LOAD_DELAY_MS;
        window.setTimeout(() => {
          setVisibleCount((count) => Math.min(count + pageSize, items.length));
          setLoading(false);
          loadingRef.current = false;
        }, delay);
      },
      { rootMargin: '180px 0px', threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, items.length, pageSize, visibleCount]);

  return {
    visibleProducts: items.slice(0, visibleCount),
    loading,
    hasMore,
    sentinelRef: sentinelRef as RefObject<HTMLDivElement>,
  };
}

export function ProductGridSkeleton({
  count = 4,
  variant = 'rail',
}: {
  count?: number;
  variant?: 'rail' | 'catalog';
}) {
  return (
    <div
      className={`ec-product-grid ${variant === 'catalog' ? 'ec-product-grid--catalog' : 'ec-product-grid--rail'}`}
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={`ec-skel-${i}`} />
      ))}
    </div>
  );
}
