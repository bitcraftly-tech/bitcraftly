import { MarketingFinalCtaBand } from "@/components/patterns/marketing-final-cta-band";
import { SOLUTIONS_LANDING } from "./solutions.content";

export function SolutionsPageCta() {
  return (
    <MarketingFinalCtaBand
      headingId="solutions-cta-heading"
      heading={SOLUTIONS_LANDING.cta.heading}
      description={SOLUTIONS_LANDING.cta.description}
      primaryCta={SOLUTIONS_LANDING.primaryCta}
      tertiaryCta={SOLUTIONS_LANDING.tertiaryCta}
      trust={SOLUTIONS_LANDING.cta.trust}
    />
  );
}
