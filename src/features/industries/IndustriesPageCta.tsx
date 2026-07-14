import { MarketingFinalCtaBand } from "@/components/patterns/marketing-final-cta-band";
import { INDUSTRIES_LANDING } from "./industries.content";
import "./industries.css";

export function IndustriesPageCta() {
  return (
    <div className="industries-final-cta">
      <MarketingFinalCtaBand
        headingId="industries-final-cta-heading"
        heading={INDUSTRIES_LANDING.cta.heading}
        description={INDUSTRIES_LANDING.cta.description}
        primaryCta={INDUSTRIES_LANDING.cta.primaryCta}
        tertiaryCta={INDUSTRIES_LANDING.cta.tertiaryCta}
        trust={INDUSTRIES_LANDING.cta.trust}
      />
    </div>
  );
}
