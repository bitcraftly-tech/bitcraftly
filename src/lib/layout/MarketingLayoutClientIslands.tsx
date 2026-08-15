'use client';

import { ClearHashOnPageNavigate } from '@/components/patterns/clear-hash-on-page-navigate';
import { DeferredNewsletter } from '@/components/patterns/deferred-newsletter';
import { MarketingClientChrome } from '@/components/patterns/marketing-client-chrome';
import { MarketingDeferredCss } from '@/lib/layout/MarketingDeferredCss';

/**
 * Code-split marketing client chrome — loaded asynchronously from the server
 * layout so Ask AI, lead funnel, newsletter, and deferred CSS are not in the
 * synchronous layout client bundle.
 */
export function MarketingLayoutClientHead() {
  return (
    <>
      <MarketingDeferredCss />
      <ClearHashOnPageNavigate />
      {/* StudioLaunchToast stays unmounted until AI Studio launches publicly. */}
    </>
  );
}

/** Below-main newsletter — preserves layout DOM order before the footer. */
export function MarketingLayoutClientMid() {
  return <DeferredNewsletter />;
}

/** Post-footer widgets — lead funnel (idle-deferred). */
export function MarketingLayoutClientTail() {
  return <MarketingClientChrome />;
}
