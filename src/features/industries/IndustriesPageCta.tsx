import { MarketingFinalCtaBand } from "@/components/patterns/marketing-final-cta-band";
import { INDUSTRIES_LANDING } from "./industries.content";

/**
 * Final CTA — same MarketingFinalCtaBand shell as /services (left-aligned band).
 */
export function IndustriesPageCta() {
  return (
    <MarketingFinalCtaBand
      headingId="industries-cta-heading"
      heading={INDUSTRIES_LANDING.cta.heading}
      description={INDUSTRIES_LANDING.cta.description}
      primaryCta={INDUSTRIES_LANDING.cta.primaryCta}
      tertiaryCta={INDUSTRIES_LANDING.cta.tertiaryCta}
      trust={INDUSTRIES_LANDING.cta.trust}
    />
  );
}
