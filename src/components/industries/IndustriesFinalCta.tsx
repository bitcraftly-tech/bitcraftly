import { MarketingFinalCtaBand } from '@/components/patterns/marketing-final-cta-band';
import { INDUSTRIES_FINAL_CTA } from './industries.content';

/**
 * Industries final CTA — canonical MarketingFinalCtaBand shell.
 */
export function IndustriesFinalCta() {
  return (
    <MarketingFinalCtaBand
      headingId="industries-final-heading"
      heading={INDUSTRIES_FINAL_CTA.title}
      description={INDUSTRIES_FINAL_CTA.description}
      primaryCta={INDUSTRIES_FINAL_CTA.primaryCta}
      tertiaryCta={INDUSTRIES_FINAL_CTA.secondaryCta}
      trust={[...INDUSTRIES_FINAL_CTA.trustItems]}
    />
  );
}
