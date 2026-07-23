import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TechnologiesRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

/** Server Component — CSS scroll reveal, no client hydration. */
export function TechnologiesReveal({
  children,
  className,
  delayMs = 0,
}: TechnologiesRevealProps) {
  const style =
    delayMs > 0
      ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties)
      : undefined;

  return (
    <div
      className={cn(
        "technologies-reveal",
        "is-visible",
        "hp-scroll-reveal",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
