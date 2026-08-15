'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import {
  WORK_CAROUSEL_AUTO_MS,
  WORK_CAROUSEL_ITEMS,
  type WorkCarouselItem,
} from './work-carousel.constants';

function wrapOffset(slideIndex: number, index: number, total: number) {
  let offset = slideIndex - index;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

function slotClass(offset: number) {
  if (offset === 0) return 'is-center';
  if (offset === -1) return 'is-prev';
  if (offset === 1) return 'is-next';
  if (offset === -2) return 'is-far-prev';
  if (offset === 2) return 'is-far-next';
  return '';
}

function SlideCard({ item, active }: { item: WorkCarouselItem; active: boolean }) {
  return (
    <article
      className={cn('hp-work-slide', active && 'is-active')}
      data-accent={item.accent}
      aria-hidden={!active}
      aria-roledescription="slide"
      aria-label={`${item.title} — ${item.industry}`}
    >
      <Link href={item.href} className="hp-work-slide__link" tabIndex={active ? 0 : -1}>
        <div className="hp-work-slide__chrome">
          <span className="hp-work-slide__dot hp-work-slide__dot--r" />
          <span className="hp-work-slide__dot hp-work-slide__dot--y" />
          <span className="hp-work-slide__dot hp-work-slide__dot--g" />
          <span className="hp-work-slide__host">{item.host}</span>
        </div>
        <div className="hp-work-slide__media">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 768px) 86vw, 420px"
            className="object-cover object-top"
            priority={active}
          />
          <div className="hp-work-slide__shade" aria-hidden />
        </div>
        <div className="hp-work-slide__body">
          <div className="hp-work-slide__meta">
            <span className="hp-work-slide__badge">{item.badge}</span>
            <span className="hp-work-slide__industry">{item.industry}</span>
          </div>
          <h3 className="hp-work-slide__title">{item.title}</h3>
          <p className="hp-work-slide__summary">{item.summary}</p>
          <span className="hp-work-slide__cta">
            View project
            <Icon name="arrow-right" size="sm" className="h-3 w-3" aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function WorkCarousel() {
  const total = WORK_CAROUSEL_ITEMS.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused || total <= 1) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, WORK_CAROUSEL_AUTO_MS);

    return () => window.clearInterval(timer);
  }, [paused, total]);

  return (
    <div
      className="hp-work-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (start == null || end == null) return;
        const delta = end - start;
        if (Math.abs(delta) < 40) return;
        goTo(index + (delta < 0 ? 1 : -1));
      }}
    >
      <div
        className="hp-work-carousel__stage"
        aria-roledescription="carousel"
        aria-label="Portfolio projects"
      >
        {WORK_CAROUSEL_ITEMS.map((item, slideIndex) => {
          const offset = wrapOffset(slideIndex, index, total);
          if (Math.abs(offset) > 2) return null;

          return (
            <div key={item.id} className={cn('hp-work-carousel__slot', slotClass(offset))}>
              <SlideCard item={item} active={offset === 0} />
            </div>
          );
        })}
      </div>

      <div className="hp-work-carousel__controls">
        <div className="hp-work-carousel__nav">
          <button
            type="button"
            className="hp-work-carousel__btn"
            aria-label="Previous project"
            onClick={() => goTo(index - 1)}
          >
            <Icon
              name="arrow-right"
              size="sm"
              aria-hidden
              className="h-[14px] w-[14px] rotate-180"
            />
          </button>
          <button
            type="button"
            className="hp-work-carousel__btn"
            aria-label="Next project"
            onClick={() => goTo(index + 1)}
          >
            <Icon name="arrow-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
          </button>
        </div>

        <p className="hp-work-carousel__count" aria-live="polite">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden> / </span>
          <span>{String(total).padStart(2, '0')}</span>
        </p>

        <div className="hp-work-carousel__dots" role="tablist" aria-label="Project slides">
          {WORK_CAROUSEL_ITEMS.map((entry, dotIndex) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`Show ${entry.title}`}
              className={cn('hp-work-carousel__dot', dotIndex === index && 'is-active')}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
