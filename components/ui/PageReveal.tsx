import type { CSSProperties, ReactNode } from "react";

import { LOADER_REVEAL } from "@/lib/loader/config";

type PageRevealProps = {
  children: ReactNode;
  /** Stagger index — 0 = first block (navbar), then 1, 2, … for each section */
  index: number;
  className?: string;
};

/** Wraps a page block for staggered fade-in after the global loader completes. */
export default function PageReveal({ children, index, className }: PageRevealProps) {
  const style = {
    ["--bc-reveal-delay" as string]: `${index * LOADER_REVEAL.staggerMs}ms`,
  } satisfies CSSProperties;

  return (
    <div className={className ? `bc-reveal ${className}` : "bc-reveal"} style={style}>
      {children}
    </div>
  );
}
