'use client';

import { ExitIntentPopup } from './components/ExitIntentPopup';
import { StickyLeadCta } from './components/StickyLeadCta';
/* lead-funnel.css loaded post-paint via MarketingDeferredCss */

/**
 * Global lead-funnel widgets for marketing chrome.
 * Parent MarketingClientChrome already idle-defers mount.
 */
export function LeadFunnelWidgets() {
  return (
    <>
      <StickyLeadCta />
      <ExitIntentPopup />
    </>
  );
}
