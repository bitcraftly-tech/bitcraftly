'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

interface AnimatedCurrencyProps {
  value: number;
  format: (value: number) => string;
  className?: string;
}

function subscribeReducedMotion(onStoreChange: () => void): () => void {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', onStoreChange);
  return () => media.removeEventListener('change', onStoreChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

/** Accessible currency tween — respects prefers-reduced-motion. */
export function AnimatedCurrency({ value, format, className }: AnimatedCurrencyProps) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [animated, setAnimated] = useState(value);
  const frameRef = useRef<number | null>(null);
  const fromRef = useRef(value);

  useEffect(() => {
    if (reduceMotion) {
      fromRef.current = value;
      return;
    }

    const from = fromRef.current;
    const to = value;
    const duration = 450;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      const next = Math.round(from + (to - from) * eased);
      setAnimated(next);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [reduceMotion, value]);

  const display = reduceMotion ? value : animated;

  return (
    <span className={className} aria-live="polite">
      {format(display)}
    </span>
  );
}
