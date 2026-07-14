import { MarketingFinalCtaBand } from "@/components/patterns/marketing-final-cta-band";
import { SERVICES_LANDING } from "./services.content";

export function ServicesPageCta() {
  return (
    <MarketingFinalCtaBand
      headingId="services-cta-heading"
      heading={SERVICES_LANDING.cta.heading}
      description={SERVICES_LANDING.cta.description}
      primaryCta={SERVICES_LANDING.primaryCta}
      tertiaryCta={SERVICES_LANDING.tertiaryCta}
      trust={SERVICES_LANDING.cta.trust}
    />
  );
}
