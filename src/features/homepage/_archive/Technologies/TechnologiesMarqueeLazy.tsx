'use client';

import { MountWhenVisible } from '@/components/patterns/mount-when-visible';

const loadMarquee = () => import('./TechnologiesMarquee').then((mod) => mod.TechnologiesMarquee);

/** Defers marquee client JS until near viewport. */
export function TechnologiesMarqueeLazy() {
  return (
    <MountWhenVisible
      load={loadMarquee}
      fallback={
        <div
          className="min-h-[8rem] w-full rounded-[var(--token-radius-lg)] bg-surface/40"
          aria-hidden
        />
      }
    />
  );
}
