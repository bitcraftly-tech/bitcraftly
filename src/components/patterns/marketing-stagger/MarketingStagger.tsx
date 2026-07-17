import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface MarketingStaggerProps {
  children: ReactNode;
  className?: string;
  /** List semantics for card grids */
  as?: "div" | "ul" | "ol";
}

/**
 * Stagger container — Server Component.
 * Visibility/stagger handled by CSS (`.mkt-stagger.is-visible` defaults on).
 * Zero IntersectionObserver hydration.
 */
export function MarketingStagger({
  children,
  className,
  as = "div",
}: MarketingStaggerProps) {
  const classes = cn("mkt-stagger", "is-visible", "hp-scroll-reveal", className);

  if (as === "ul") {
    return <ul className={classes}>{children}</ul>;
  }

  if (as === "ol") {
    return <ol className={classes}>{children}</ol>;
  }

  return <div className={classes}>{children}</div>;
}
