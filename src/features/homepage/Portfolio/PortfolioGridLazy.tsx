"use client";

import { MountWhenVisible } from "@/components/patterns/mount-when-visible";

const loadPortfolioGrid = () =>
  import("./PortfolioGrid").then((mod) => mod.PortfolioGrid);

/** Defers PortfolioGrid hydration until near viewport (cuts homepage TBT). */
export function PortfolioGridLazy() {
  return (
    <MountWhenVisible
      load={loadPortfolioGrid}
      fallback={
        <div
          className="min-h-[28rem] w-full rounded-[var(--token-radius-lg)] bg-surface/50"
          aria-hidden
        />
      }
    />
  );
}
