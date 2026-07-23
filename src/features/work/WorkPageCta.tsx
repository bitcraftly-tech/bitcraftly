import { MarketingFinalCtaBand } from "@/components/patterns/marketing-final-cta-band";
import { WORK_CTA_COPY } from "./work.content";

/**
 * Final CTA — same MarketingFinalCtaBand shell as /services.
 */
export function WorkPageCta() {
  return (
    <MarketingFinalCtaBand
      headingId="work-cta-heading"
      heading={WORK_CTA_COPY.heading}
      description={WORK_CTA_COPY.description}
      primaryCta={WORK_CTA_COPY.primaryCta}
      tertiaryCta={WORK_CTA_COPY.tertiaryCta}
      trust={WORK_CTA_COPY.trust}
    />
  );
}
