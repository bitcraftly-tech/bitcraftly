'use client';

import { useEffect } from 'react';
import type { HeroIndustryPreview } from './hero.constants';

type SystemBrowserCarouselProps = {
  items: readonly HeroIndustryPreview[];
  activeIndex: number;
  durationMs: number;
};

const PREVIEW_SLUG: Record<string, string> = {
  healthcare: 'clinic-healthcare',
  restaurant: 'shrishti-cloud-kitchen',
  'real-estate': 'builder-website',
  corporate: 'local-services-lead-site',
};

function previewSrcForViewport(item: HeroIndustryPreview): string {
  const slug = PREVIEW_SLUG[item.id] ?? item.id;
  if (typeof window === 'undefined') {
    return item.imageSrc;
  }
  const width = window.innerWidth < 768 ? 480 : window.innerWidth < 1024 ? 720 : 960;
  return `/products/hero/${slug}-${width}.avif`;
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

/**
 * Compact fixed browser window — chrome stays put; industry pages
 * crossfade / scale / slide under constant chrome (controlled by parent).
 */
export function SystemBrowserCarousel({
  items,
  activeIndex,
  durationMs,
}: SystemBrowserCarouselProps) {
  const total = items.length;
  const active = items[activeIndex] ?? items[0];

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      // Warm only the next slide at a viewport-sized AVIF — avoid preloading all 960 assets.
      const nextIndex = (activeIndex + 1) % total;
      const next = items[nextIndex];
      if (!next || cancelled) return;
      await warmImage(previewSrcForViewport(next));
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [activeIndex, items, total]);

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

      <div className="sys__browser-viewport">
        <div
          className="sys__browser-track"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {items.map((item, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            const nextIndex = (activeIndex + 1) % total;
            // Only active + next slide: keeps LCP payload minimal.
            const shouldRender = isActive || slideIndex === nextIndex;

            return (
              <div
                key={item.id}
                className={
                  isActive ? 'sys__browser-page is-active' : 'sys__browser-page'
                }
              >
                {shouldRender ? (
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
                      loading={isActive ? 'eager' : 'lazy'}
                      fetchPriority={isActive ? 'high' : 'low'}
                      draggable={false}
                    />
                  </picture>
                ) : null}
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
    </div>
  );
}
