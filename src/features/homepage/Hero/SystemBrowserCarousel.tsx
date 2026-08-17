'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import type { HeroIndustryPreview } from './hero.constants';

type SystemBrowserCarouselProps = {
  items: readonly HeroIndustryPreview[];
  activeIndex: number;
  durationMs: number;
  onSelectIndex?: (index: number) => void;
};

const SWIPE_THRESHOLD_PX = 48;
const AXIS_LOCK_PX = 10;

function previewSrcForViewport(item: HeroIndustryPreview): string {
  if (!item.usesHeroOptimized || typeof window === 'undefined') {
    return item.imageSrc;
  }
  const width = window.innerWidth < 768 ? 480 : window.innerWidth < 1024 ? 720 : 960;
  return `/products/hero/${item.id}-${width}.avif`;
}

function warmImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    img.decoding = 'async';
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

type SwipeState = {
  pointerId: number;
  startX: number;
  startY: number;
  axis: 'undecided' | 'horizontal' | 'vertical';
};

/**
 * Compact fixed browser window — chrome stays put; industry pages
 * slide under constant chrome (controlled by parent activeIndex).
 * Mobile: horizontal swipe for prev/next (vertical page scroll preserved).
 */
export function SystemBrowserCarousel({
  items,
  activeIndex,
  durationMs,
  onSelectIndex,
}: SystemBrowserCarouselProps) {
  const total = items.length;
  const active = items[activeIndex] ?? items[0];
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(activeIndex);
  const swipeRef = useRef<SwipeState | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      // Warm the exact fallback URLs the <img> uses so every slide paints.
      for (const item of items) {
        if (cancelled) return;
        await warmImage(item.imageSrc);
        await warmImage(previewSrcForViewport(item));
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [items]);

  /* Instant jump on wrap so last→first does not slide backward through all pages. */
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prev = prevIndexRef.current;
    prevIndexRef.current = activeIndex;
    if (prev === activeIndex) return;

    const wrapped =
      (prev === total - 1 && activeIndex === 0) || (prev === 0 && activeIndex === total - 1);
    if (!wrapped) {
      track.classList.remove('is-wrap-jump');
      return;
    }

    track.classList.add('is-wrap-jump');
    void track.offsetWidth;
    track.classList.remove('is-wrap-jump');
  }, [activeIndex, total]);

  const commitSwipe = useCallback(
    (deltaX: number) => {
      if (!onSelectIndex || total < 2) return;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;

      // Swipe left → next; swipe right → previous
      const nextIndex = deltaX < 0 ? (activeIndex + 1) % total : (activeIndex - 1 + total) % total;
      onSelectIndex(nextIndex);
    },
    [activeIndex, onSelectIndex, total],
  );

  const goToRelative = useCallback(
    (delta: -1 | 1) => {
      if (!onSelectIndex || total < 2) return;
      onSelectIndex((activeIndex + delta + total) % total);
    },
    [activeIndex, onSelectIndex, total],
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!onSelectIndex || event.pointerType === 'mouse') return;

    swipeRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      axis: 'undecided',
    };
    viewportRef.current?.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const swipe = swipeRef.current;
    if (!swipe || swipe.pointerId !== event.pointerId) return;

    const dx = event.clientX - swipe.startX;
    const dy = event.clientY - swipe.startY;

    if (swipe.axis === 'undecided') {
      if (Math.abs(dx) < AXIS_LOCK_PX && Math.abs(dy) < AXIS_LOCK_PX) return;
      swipe.axis = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
      if (swipe.axis === 'vertical') {
        swipeRef.current = null;
        if (viewportRef.current?.hasPointerCapture(event.pointerId)) {
          viewportRef.current.releasePointerCapture(event.pointerId);
        }
      }
    }
  };

  const onPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const swipe = swipeRef.current;
    if (!swipe || swipe.pointerId !== event.pointerId) return;

    const dx = event.clientX - swipe.startX;
    if (swipe.axis === 'horizontal') {
      commitSwipe(dx);
    }

    swipeRef.current = null;
    if (viewportRef.current?.hasPointerCapture(event.pointerId)) {
      viewportRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const trackStyle = {
    ['--sys-slide' as string]: String(activeIndex),
  } as CSSProperties;

  return (
    <div className="sys__panel sys__panel--site">
      <div className="sys__chrome">
        <span className="sys__dot sys__dot--r" />
        <span className="sys__dot sys__dot--y" />
        <span className="sys__dot sys__dot--g" />
        <div className="sys__address" aria-hidden="true">
          <svg
            className="sys__address-lock"
            viewBox="0 0 12 12"
            width={10}
            height={10}
            fill="none"
            aria-hidden
          >
            <rect
              x="2.5"
              y="5.5"
              width="7"
              height="5"
              rx="1.2"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M4 5.5V4a2 2 0 0 1 4 0v1.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <span key={active.host} className="sys__url sys__url--swap">
            {active.host}
          </span>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="sys__browser-viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div ref={trackRef} className="sys__browser-track" style={trackStyle}>
          {items.map((item, slideIndex) => {
            const isActive = slideIndex === activeIndex;

            return (
              <div
                key={item.id}
                className={isActive ? 'sys__browser-page is-active' : 'sys__browser-page'}
              >
                {/*
                  Never lazy-load carousel shots — overflow:hidden + translate
                  tracks hide off-screen slides from the lazy observer, so images
                  never load and slides look blank.
                */}
                {item.usesHeroOptimized ? (
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={item.imageAvifSrcSet}
                      sizes={item.imageSizes}
                    />
                    <source
                      type="image/webp"
                      srcSet={item.imageWebpSrcSet}
                      sizes={item.imageSizes}
                    />
                    <img
                      src={item.imageSrc}
                      alt=""
                      width={item.imageWidth}
                      height={item.imageHeight}
                      className="sys__browser-shot"
                      decoding="async"
                      loading="eager"
                      fetchPriority={isActive ? 'high' : 'low'}
                      draggable={false}
                    />
                  </picture>
                ) : (
                  <img
                    src={item.imageSrc}
                    alt=""
                    width={item.imageWidth}
                    height={item.imageHeight}
                    className="sys__browser-shot"
                    decoding="async"
                    loading="eager"
                    fetchPriority={isActive ? 'high' : 'low'}
                    draggable={false}
                  />
                )}
                <div className="sys__browser-shade" />
                <div className="sys__browser-caption">
                  <p className="sys__site-brand">{item.title}</p>
                  <p className="sys__browser-industry">{item.industry}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sys__browser-progress" aria-hidden="true">
          <span
            key={active.id}
            className="sys__browser-progress__bar"
            style={{ animationDuration: `${durationMs}ms` }}
          />
        </div>
      </div>

      {/* Outside overflow:hidden viewport so it always paints */}
      <div className="sys__browser-pager" aria-hidden="true">
        <span className="sys__browser-pager__current">{activeIndex + 1}</span>
        <span className="sys__browser-pager__sep">/</span>
        <span className="sys__browser-pager__total">{total}</span>
      </div>

      {/* Desktop-only prev/next — small side arrows */}
      <div className="sys__browser-nav" aria-hidden="true">
        <button
          type="button"
          className="sys__browser-nav__btn sys__browser-nav__btn--prev"
          tabIndex={-1}
          onClick={() => goToRelative(-1)}
          aria-label="Previous portfolio"
        >
          <svg viewBox="0 0 16 16" width={14} height={14} fill="none" aria-hidden>
            <path
              d="M10 3.5 5.5 8 10 12.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="sys__browser-nav__btn sys__browser-nav__btn--next"
          tabIndex={-1}
          onClick={() => goToRelative(1)}
          aria-label="Next portfolio"
        >
          <svg viewBox="0 0 16 16" width={14} height={14} fill="none" aria-hidden>
            <path
              d="M6 3.5 10.5 8 6 12.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
