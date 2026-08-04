import { MarketingFinalCtaBand } from '@/components/patterns/marketing-final-cta-band';
import { WORK_FINAL_CTA } from './work.content';

/**
 * Work final CTA — canonical MarketingFinalCtaBand shell.
 */
export function WorkFinalCta() {
  return (
    <MarketingFinalCtaBand
      headingId="work-final-heading"
      heading={WORK_FINAL_CTA.title}
      description={WORK_FINAL_CTA.description}
      primaryCta={WORK_FINAL_CTA.primaryCta}
      tertiaryCta={WORK_FINAL_CTA.secondaryCta}
      trust={[...WORK_FINAL_CTA.trustItems]}
    />
  );
}
