"use client";

import dynamic from "next/dynamic";
import { DeferredMount } from "@/components/patterns/deferred-mount";

function ChromeUnavailable() {
  return null;
}

const AskAiTab = dynamic(
  () =>
    import("@/features/homepage/AskAi/AskAiTab")
      .then((mod) => mod.AskAiTab)
      .catch(() => ChromeUnavailable),
  { ssr: false },
);

const LeadFunnelWidgets = dynamic(
  () =>
    import("@/features/lead-funnel")
      .then((mod) => mod.LeadFunnelWidgets)
      .catch(() => ChromeUnavailable),
  { ssr: false },
);

/**
 * Non-critical marketing chrome — client-only, code-split, idle-deferred.
 * Delays chunk download/parse so first paint is not competing with Ask AI / lead funnel.
 */
export function MarketingClientChrome() {
  return (
    <DeferredMount delayMs={5000}>
      <AskAiTab />
      <LeadFunnelWidgets />
    </DeferredMount>
  );
}
