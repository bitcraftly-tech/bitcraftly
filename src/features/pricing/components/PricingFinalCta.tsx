import { MarketingFinalCtaBand } from '@/components/patterns/marketing-final-cta-band';
import { PRICING_FINAL_CTA } from '../pricing.content';

/**
 * Pricing final CTA — canonical MarketingFinalCtaBand shell.
 */
export function PricingFinalCta() {
  return (
    <MarketingFinalCtaBand
      headingId="pricing-final-heading"
      heading={PRICING_FINAL_CTA.title}
      description={PRICING_FINAL_CTA.description}
      primaryCta={PRICING_FINAL_CTA.primaryCta}
      tertiaryCta={PRICING_FINAL_CTA.secondaryCta}
      trust={[...PRICING_FINAL_CTA.trustItems]}
    />
  );
}
