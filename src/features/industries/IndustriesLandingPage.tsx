import { MarketingIllustratedHero } from "@/components/patterns/hero-compositions";
import { PageShell } from "@/components/patterns/marketing-layout";
import { NAV_ACTIONS, ROUTES } from "@/constants/navigation";
import { buildIndustriesBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { IndustriesHeroVisual } from "./IndustriesHeroVisual";

export function IndustriesLandingPage() {
  const breadcrumbs = buildIndustriesBreadcrumbs();

  return (
    <PageShell className="industries-page">
      <MarketingIllustratedHero
        breadcrumbs={breadcrumbs}
        headingId="industries-page-heading"
        eyebrow="Industries"
        title="Built for how your industry actually operates"
        titleHighlight="industry"
        description="Healthcare, retail, manufacturing, education, logistics, and more — solutions shaped around real workflows, compliance, and growth pressures."
        supporting="Explore vertical experience and see how Bitcraftly partners with teams to ship reliable, AI-ready products."
        primaryCta={{
          label: NAV_ACTIONS.freeConsultation.label,
          href: NAV_ACTIONS.freeConsultation.href,
        }}
        secondaryCta={{
          label: "View solutions",
          href: ROUTES.solutions,
        }}
        trustItems={[
          "Vertical domain experience",
          "Compliance-aware delivery",
          "Enterprise-ready systems",
        ]}
        visual={<IndustriesHeroVisual />}
      />
    </PageShell>
  );
}

export const INDUSTRIES_LANDING_META = {
  title: "Industries",
  description:
    "Industry-focused digital engineering for SaaS, e-commerce, education, healthcare, and enterprise teams.",
  path: ROUTES.industries,
} as const;
