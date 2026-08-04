'use client';

import dynamic from 'next/dynamic';

function MissingIsland() {
  return null;
}

function resolveIsland<T>(value: T | undefined): T | typeof MissingIsland {
  return typeof value === 'function' ? value : MissingIsland;
}

const MarketingLayoutClientHead = dynamic(
  () =>
    import('./MarketingLayoutClientIslands').then((mod) =>
      resolveIsland(mod.MarketingLayoutClientHead),
    ),
  { ssr: false },
);

const MarketingLayoutClientMid = dynamic(
  () =>
    import('./MarketingLayoutClientIslands').then((mod) =>
      resolveIsland(mod.MarketingLayoutClientMid),
    ),
  { ssr: false },
);

const MarketingLayoutClientTail = dynamic(
  () =>
    import('./MarketingLayoutClientIslands').then((mod) =>
      resolveIsland(mod.MarketingLayoutClientTail),
    ),
  { ssr: false },
);

/** Minimal client boundary — heavy chrome loads in async chunks. */
export function MarketingLayoutClientHeadLoader() {
  return <MarketingLayoutClientHead />;
}

export function MarketingLayoutClientMidLoader() {
  return <MarketingLayoutClientMid />;
}

export function MarketingLayoutClientTailLoader() {
  return <MarketingLayoutClientTail />;
}
