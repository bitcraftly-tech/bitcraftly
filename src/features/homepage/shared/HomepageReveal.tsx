import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface HomepageRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** CSS class stem, e.g. "why" → `.why-reveal` */
  name: string;
  /** Kept for API compatibility — no longer used (no IntersectionObserver). */
  threshold?: number;
  rootMargin?: string;
}

/**
 * Homepage section reveal — Server Component (zero hydration).
 * Motion uses CSS scroll-driven animation when supported.
 */
export function HomepageReveal({
  children,
  className,
  delayMs = 0,
  name,
}: HomepageRevealProps) {
  const style =
    delayMs > 0
      ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties)
      : undefined;

  return (
    <div
      className={cn(`${name}-reveal`, "hp-scroll-reveal", className)}
      style={style}
    >
      {children}
    </div>
  );
}
