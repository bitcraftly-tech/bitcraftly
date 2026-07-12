"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface HomepageRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** CSS class stem, e.g. "why" → `.why-reveal` */
  name: string;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Shared IntersectionObserver fade-up for homepage sections.
 */
export function HomepageReveal({
  children,
  className,
  delayMs = 0,
  name,
  threshold = 0.12,
  rootMargin = "0px 0px -6% 0px",
}: HomepageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={cn(`${name}-reveal`, visible && "is-visible", className)}
      style={
        visible && delayMs > 0
          ? { transitionDelay: `${delayMs}ms` }
          : undefined
      }
    >
      {children}
    </div>
  );
}
