"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  format: (value: number) => string;
  className?: string;
}

/** Lightweight price counter — no framer dependency. */
export function AnimatedNumber({
  value,
  format,
  className,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value);
  const frameRef = useRef<number | null>(null);
  const fromRef = useRef(value);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }

    const from = fromRef.current;
    const to = value;
    const duration = 420;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      const next = Math.round(from + (to - from) * eased);
      setDisplay(next);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value]);

  return <span className={className}>{format(display)}</span>;
}
