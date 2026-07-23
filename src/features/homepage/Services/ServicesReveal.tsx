import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ServicesRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

/** Server Component — CSS scroll reveal, no client hydration. */
export function ServicesReveal({
  children,
  className,
  delayMs = 0,
}: ServicesRevealProps) {
  const style =
    delayMs > 0
      ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties)
      : undefined;

  return (
    <div
      className={cn("services-reveal", "is-visible", "hp-scroll-reveal", className)}
      style={style}
    >
      {children}
    </div>
  );
}
