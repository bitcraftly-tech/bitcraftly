import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TrustedByRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

/** Server Component — CSS scroll reveal, no client hydration. */
export function TrustedByReveal({
  children,
  className,
  delayMs = 0,
}: TrustedByRevealProps) {
  const style =
    delayMs > 0
      ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties)
      : undefined;

  return (
    <div
      className={cn(
        "trusted-by-reveal",
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
