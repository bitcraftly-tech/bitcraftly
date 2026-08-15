'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type Props = {
  value: number;
  suffix?: string;
  /** Rendered verbatim instead of counting (for non-numeric metrics like 24/7). */
  display?: string;
  durationMs?: number;
};

function format(value: number) {
  return value >= 1000 ? value.toLocaleString('en-IN') : String(value);
}

/** Counts up to `value` the first time the metric scrolls into view. */
export default function ClinicCounter({ value, suffix = '', display, durationMs = 1600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || display || reduceMotion) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      // easeOutCubic keeps the last digits from crawling.
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, durationMs, display, reduceMotion]);

  const label = display ?? `${format(value)}${suffix}`;
  const shown = display ?? (reduceMotion ? label : `${format(current)}${suffix}`);

  return (
    <span ref={ref} aria-label={label}>
      <span aria-hidden>{shown}</span>
    </span>
  );
}
