import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import "./sliding-pill.css";

export type SlidingPillVariant =
  | "gradient"
  | "accent"
  | "primary"
  | "segment";

interface SlidingPillIndicatorProps {
  style: CSSProperties;
  variant?: SlidingPillVariant;
  className?: string;
}

/**
 * Animated active-pill background for tab/chip groups.
 */
export function SlidingPillIndicator({
  style,
  variant = "gradient",
  className,
}: SlidingPillIndicatorProps) {
  return (
    <span
      className={cn(
        "sliding-pill-indicator",
        `sliding-pill-indicator--${variant}`,
        className,
      )}
      style={style}
      aria-hidden
    />
  );
}
