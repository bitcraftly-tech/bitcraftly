import { MarketingIllustratedHero } from "@/components/patterns/hero-compositions";
import { PageShell } from "@/components/patterns/marketing-layout";
import { NAV_ACTIONS, ROUTES } from "@/constants/navigation";
import { buildPricingBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { PricingHeroVisual } from "./PricingHeroVisual";

export function PricingLandingPage() {
  const breadcrumbs = buildPricingBreadcrumbs();

  return (
    <PageShell className="pricing-page">
      <MarketingIllustratedHero
        breadcrumbs={breadcrumbs}
        headingId="pricing-page-heading"
        eyebrow="Pricing"
        title="Transparent estimates for websites, products, and AI systems"
        titleHighlight="Transparent estimates"
        description="Use our cost calculator mindset — clear ranges, milestone billing, and written proposals. No surprise invoices."
        supporting="Start with a free consultation and a scoped estimate for your next build."
        primaryCta={{
          label: "Get an estimate",
          href: "/#cost-calculator",
        }}
        secondaryCta={{
          label: NAV_ACTIONS.bookCall.label,
          href: NAV_ACTIONS.bookCall.href,
        }}
        trustItems={[
          "Written proposals",
          "Milestone billing",
          "No obligation consult",
        ]}
        visual={<PricingHeroVisual />}
      />
    </PageShell>
  );
}

export const PRICING_LANDING_META = {
  title: "Pricing",
  description:
    "Transparent Bitcraftly pricing ranges for websites, custom software, and AI automation — with written estimates.",
  path: ROUTES.pricing,
} as const;
