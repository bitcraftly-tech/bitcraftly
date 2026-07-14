"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { cn } from "@/lib/cn";

interface AnimatedStatProps {
  value: string;
  className?: string;
}

function subscribeReducedMotion(onStoreChange: () => void): () => void {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return true;
}

/** Parses countable display strings like `200+`, `98%`, `24h`. Skips `24/7`. */
function parseCountable(
  value: string,
): { target: number; suffix: string } | null {
  if (value.includes("/")) return null;
  const match = /^(\d+)(.*)$/.exec(value);
  if (!match) return null;
  return { target: Number(match[1]), suffix: match[2] ?? "" };
}

/**
 * Lightweight rAF count-up — reserved width avoids CLS; static until visible.
 */
export function AnimatedStat({ value, className }: AnimatedStatProps) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const parsed = useMemo(() => parseCountable(value), [value]);
  const target = parsed?.target ?? 0;
  const suffix = parsed?.suffix ?? "";
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(target);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!parsed || reduceMotion) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [parsed, reduceMotion]);

  useEffect(() => {
    if (!started || !parsed || reduceMotion) return;

    const duration = 880;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, parsed, reduceMotion, target]);

  const reserveStyle = {
    minWidth: `${Math.max(value.length, 2)}ch`,
  } as const;

  if (!parsed || reduceMotion || !started) {
    return (
      <span
        ref={parsed && !reduceMotion ? ref : undefined}
        className={cn("tabular-nums inline-block text-left", className)}
        style={reserveStyle}
      >
        {value}
      </span>
    );
  }

  return (
    <span
      className={cn("tabular-nums inline-block text-left", className)}
      style={reserveStyle}
      aria-label={value}
    >
      {display}
      {suffix}
    </span>
  );
}
