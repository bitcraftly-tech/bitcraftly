'use client';

import dynamic from 'next/dynamic';
import { DeferredMount } from '@/components/patterns/deferred-mount';

function ChromeUnavailable() {
  return null;
}

const LeadFunnelWidgets = dynamic(
  () =>
    import('@/features/lead-funnel')
      .then((mod) => mod.LeadFunnelWidgets)
      .catch(() => ChromeUnavailable),
  { ssr: false },
);

/**
 * Non-critical marketing chrome — client-only, code-split, idle-deferred.
 * Ask AI is off for now (ASK_AI_ENABLED in AskAiTab + not mounted here).
 */
export function MarketingClientChrome() {
  return (
    <DeferredMount delayMs={5000}>
      <LeadFunnelWidgets />
    </DeferredMount>
  );
}
