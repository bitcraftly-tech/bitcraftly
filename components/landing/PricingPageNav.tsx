import MarketingPageNav from "@/components/landing/MarketingPageNav";
import { PRICING_PAGE_NAV } from "@/lib/pageSequences";

export default function PricingPageNav() {
  return <MarketingPageNav items={PRICING_PAGE_NAV} ariaLabel="Pricing page sections" />;
}
