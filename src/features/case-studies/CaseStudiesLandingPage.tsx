import { MarketingIllustratedHero } from "@/components/patterns/hero-compositions";
import { PageShell } from "@/components/patterns/marketing-layout";
import { NAV_ACTIONS, ROUTES } from "@/constants/navigation";
import { buildCaseStudiesBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { CaseStudiesHeroVisual } from "./CaseStudiesHeroVisual";

export function CaseStudiesLandingPage() {
  const breadcrumbs = buildCaseStudiesBreadcrumbs();

  return (
    <PageShell className="case-studies-page">
      <MarketingIllustratedHero
        breadcrumbs={breadcrumbs}
        headingId="case-studies-page-heading"
        eyebrow="Case studies"
        title="Outcomes measured in conversion, ROI, and growth"
        titleHighlight="ROI"
        description="Before-and-after stories from Bitcraftly engagements — timelines, scope, and business metrics that matter to founders and operators."
        supporting="See how we turn discovery into shipped systems with clear payback."
        primaryCta={{
          label: "View portfolio",
          href: ROUTES.workPortfolio,
        }}
        secondaryCta={{
          label: NAV_ACTIONS.bookCall.label,
          href: NAV_ACTIONS.bookCall.href,
        }}
        trustItems={[
          "Before / after metrics",
          "Written delivery notes",
          "Measurable ROI",
        ]}
        visual={<CaseStudiesHeroVisual />}
      />
    </PageShell>
  );
}
