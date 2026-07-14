import { PageShell } from "@/components/patterns/marketing-layout";
import { JsonLdScript } from "@/components/patterns/json-ld";
import { buildSolutionsBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { SolutionsCategoryNav } from "./SolutionsCategoryNav";
import { SolutionsHero } from "./SolutionsHero";
import { SolutionsPageCta } from "./SolutionsPageCta";
import {
  SolutionsCaseStudiesSection,
  SolutionsCategoriesSection,
  SolutionsFaqSection,
  SolutionsFeaturedSection,
  SolutionsGroupsSection,
  SolutionsHubsSection,
  SolutionsIndustriesSection,
  SolutionsProcessSection,
  SolutionsTechSection,
  SolutionsWhySection,
} from "./SolutionsSections";
import { getSolutionCardModels } from "./solutions.content";
import { buildSolutionsListingJsonLd } from "./solutions-schema";
import "@/features/services/services.css";

export function SolutionsLandingPage() {
  const breadcrumbs = buildSolutionsBreadcrumbs();
  const cards = getSolutionCardModels();

  return (
    <PageShell className="solutions-page">
      <JsonLdScript data={buildSolutionsListingJsonLd()} />

      <SolutionsHero breadcrumbs={breadcrumbs} />
      <SolutionsCategoryNav />
      <SolutionsCategoriesSection />
      <SolutionsFeaturedSection />
      <SolutionsGroupsSection cards={cards} />
      <SolutionsIndustriesSection />
      <SolutionsTechSection />
      <SolutionsCaseStudiesSection />
      <SolutionsWhySection />
      <SolutionsProcessSection />
      <SolutionsFaqSection />
      <SolutionsHubsSection />
      <SolutionsPageCta />
    </PageShell>
  );
}
