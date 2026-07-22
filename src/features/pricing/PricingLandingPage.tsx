import { MarketingIllustratedHero } from "@/components/patterns/hero-compositions";
import { PageShell } from "@/components/patterns/marketing-layout";
import { Section } from "@/components/ui/section";
import { NAV_ACTIONS, ROUTES } from "@/constants/navigation";
import { buildPricingBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { PricingCalculatorLazy } from "./calculator/PricingCalculatorLazy";
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
        description="Use the interactive calculator below — clear ranges, milestone billing, and written proposals. No surprise invoices."
        supporting="Start with a free consultation and a scoped estimate for your next build."
        primaryCta={{
          label: "Open calculator",
          href: "#pricing-calculator",
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
        renderVisual={() => <PricingHeroVisual />}
      />

      <Section
        id="pricing-calculator"
        spacing="lg"
        background="default"
        aria-label="Pricing calculator"
        className="border-t border-border/60"
      >
        <PricingCalculatorLazy headingId="pricing-calculator-heading" />
      </Section>
    </PageShell>
  );
}

export const PRICING_LANDING_META = {
  title: "Pricing",
  description:
    "Transparent Bitcraftly pricing ranges for websites, custom software, and AI automation — with an interactive cost calculator and written estimates.",
  path: ROUTES.pricing,
} as const;
