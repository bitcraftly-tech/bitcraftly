"use client";

import MarketingPageNav from "@/components/landing/MarketingPageNav";
import { PRICING_PAGE_NAV } from "@/lib/pageSequences";

function PricingPageNav() {
  return <MarketingPageNav items={PRICING_PAGE_NAV} ariaLabel="Pricing page sections" />;
}

PricingPageNav.displayName = "PricingPageNav";

export default PricingPageNav;
