"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

interface MarketingStaggerProps {
  children: ReactNode;
  className?: string;
  /** List semantics for card grids */
  as?: "div" | "ul" | "ol";
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

/**
 * One IntersectionObserver for a group — children use `.mkt-stagger__item`
 * (+ optional `--stagger` custom property) for fade-up delays.
 * Reduced-motion users see content immediately (derived, no sync setState).
 */
export function MarketingStagger({
  children,
  className,
  as = "div",
}: MarketingStaggerProps) {
  const ref = useRef<HTMLDivElement | HTMLUListElement | HTMLOListElement>(
    null,
  );
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [visible, setVisible] = useState(false);
  const isVisible = reduceMotion || visible;

  useEffect(() => {
    if (reduceMotion) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const classes = cn("mkt-stagger", isVisible && "is-visible", className);

  if (as === "ul") {
    return (
      <ul ref={ref as React.RefObject<HTMLUListElement>} className={classes}>
        {children}
      </ul>
    );
  }

  if (as === "ol") {
    return (
      <ol ref={ref as React.RefObject<HTMLOListElement>} className={classes}>
        {children}
      </ol>
    );
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={classes}>
      {children}
    </div>
  );
}
