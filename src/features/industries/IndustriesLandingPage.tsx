import { JsonLdScript } from "@/components/patterns/json-ld";
import { PageShell } from "@/components/patterns/marketing-layout";
import { ROUTES } from "@/constants/navigation";
import { buildIndustriesBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { IndustriesHero } from "./IndustriesHero";
import { IndustriesPageCta } from "./IndustriesPageCta";
import {
  IndustriesCaseStudiesSection,
  IndustriesChallengesSection,
  IndustriesComparisonSection,
  IndustriesFaqSection,
  IndustriesFeaturedSection,
  IndustriesGridSection,
  IndustriesMetricsSection,
  IndustriesProcessSection,
  IndustriesProofSection,
  IndustriesRelatedServicesSection,
  IndustriesSolutionsSection,
  IndustriesTechSection,
  IndustriesWhySection,
} from "./IndustriesSections";
import { buildIndustriesListingJsonLd } from "./industries-schema";
import "./industries.css";

/**
 * Industries landing — vertical engineering credibility, conversion-focused.
 */
export function IndustriesLandingPage() {
  const breadcrumbs = buildIndustriesBreadcrumbs();

  return (
    <PageShell className="industries-page">
      <JsonLdScript data={buildIndustriesListingJsonLd()} />

      <IndustriesHero breadcrumbs={breadcrumbs} />
      <IndustriesFeaturedSection />
      <IndustriesGridSection />
      <IndustriesProofSection />
      <IndustriesChallengesSection />
      <IndustriesSolutionsSection />
      <IndustriesTechSection />
      <IndustriesCaseStudiesSection />
      <IndustriesMetricsSection />
      <IndustriesProcessSection />
      <IndustriesComparisonSection />
      <IndustriesWhySection />
      <IndustriesFaqSection />
      <IndustriesRelatedServicesSection />
      <IndustriesPageCta />
    </PageShell>
  );
}

export const INDUSTRIES_LANDING_META = {
  title: "Industries",
  description:
    "Bitcraftly engineers industry platforms for healthcare, education, retail, finance, logistics, SaaS, and more — domain networks, measurable delivery.",
  path: ROUTES.industries,
} as const;
