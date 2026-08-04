import { MarketingFinalCtaBand } from '@/components/patterns/marketing-final-cta-band';
import { SERVICES_FINAL_CTA } from './services-landing.content';

/**
 * Services landing final CTA — canonical MarketingFinalCtaBand shell.
 */
export function ServicesFinalCta() {
  return (
    <MarketingFinalCtaBand
      headingId="services-final-heading"
      heading={SERVICES_FINAL_CTA.title}
      description={SERVICES_FINAL_CTA.description}
      primaryCta={SERVICES_FINAL_CTA.primaryCta}
      tertiaryCta={SERVICES_FINAL_CTA.secondaryCta}
      trust={[...SERVICES_FINAL_CTA.trustItems]}
    />
  );
}
