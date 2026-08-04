import { MarketingFinalCtaBand } from '@/components/patterns/marketing-final-cta-band';
import { AI_FINAL_CTA } from './ai-solutions.content';

/**
 * AI Solutions final CTA — canonical MarketingFinalCtaBand shell.
 */
export function AiSolutionsFinalCta() {
  return (
    <MarketingFinalCtaBand
      headingId="ai-solutions-final-heading"
      heading={AI_FINAL_CTA.title}
      description={AI_FINAL_CTA.description}
      primaryCta={AI_FINAL_CTA.primaryCta}
      tertiaryCta={AI_FINAL_CTA.secondaryCta}
      trust={[...AI_FINAL_CTA.trustItems]}
    />
  );
}
