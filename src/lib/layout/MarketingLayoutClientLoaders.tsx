"use client";

import dynamic from "next/dynamic";

const MarketingLayoutClientHead = dynamic(
  () =>
    import("./MarketingLayoutClientIslands").then(
      (mod) => mod.MarketingLayoutClientHead,
    ),
  { ssr: false },
);

const MarketingLayoutClientMid = dynamic(
  () =>
    import("./MarketingLayoutClientIslands").then(
      (mod) => mod.MarketingLayoutClientMid,
    ),
  { ssr: false },
);

const MarketingLayoutClientTail = dynamic(
  () =>
    import("./MarketingLayoutClientIslands").then(
      (mod) => mod.MarketingLayoutClientTail,
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
