'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import { HERO_HEADING } from './hero.constants';

/** Replay typing every few seconds — no caret blink. */
const TYPE_CYCLE_MS = 4800;

export function HeroTypedFocus() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const reduceMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMedia.matches) return;

    let raf = 0;
    let lastTick = performance.now();
    let running = true;

    const tick = (now: number) => {
      if (!running) return;
      raf = window.requestAnimationFrame(tick);
      if (reduceMedia.matches || document.visibilityState === 'hidden') {
        lastTick = now;
        return;
      }
      if (now - lastTick >= TYPE_CYCLE_MS) {
        lastTick = now;
        setCycle((current) => current + 1);
      }
    };

    raf = window.requestAnimationFrame(tick);
    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span className="hp-hero-heading__focus">
      <span key={cycle} className="hp-hero-heading__letters">
        {Array.from(HERO_HEADING.focus).map((char, index) => (
          <span
            key={`${cycle}-${char}-${index}`}
            className={cn(
              'hp-hero-heading__char',
              'hp-hero-heading__char--type',
              char === ' ' && 'hp-hero-heading__char--space',
            )}
            style={{ ['--i' as string]: index }}
          >
            {char === ' ' ? '\u00a0' : char}
          </span>
        ))}
      </span>
      <svg
        key={`ink-${cycle}`}
        className="hp-hero-heading__ink"
        viewBox="0 0 140 28"
        aria-hidden="true"
        focusable="false"
      >
        {/* Soft marker / brush highlight — tapered ends, slight wave */}
        <path
          className="hp-hero-heading__ink-path"
          d="M8 14
             C 18 8, 34 7, 52 10
             C 72 13.5, 90 18, 112 15.5
             C 122 14.5, 130 12, 134 11
             C 128 18, 116 22, 98 22.5
             C 78 23, 58 20, 40 16.5
             C 26 14, 14 13, 8 14 Z"
        />
      </svg>
    </span>
  );
}
