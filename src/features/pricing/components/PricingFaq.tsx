import Link from 'next/link';
import { FaqAccordion } from '@/components/patterns/faq-accordion';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { PRICING_FAQ, PRICING_FAQ_META } from '../pricing.content';

/**
 * Pricing FAQ — canonical FaqAccordion treatment.
 */
export function PricingFaq() {
  return (
    <Section
      id="pricing-faq"
      spacing="lg"
      aria-labelledby="pricing-faq-heading"
      className="pp-section--soft"
    >
      <div className="pp-faq-head">
        <div className="pp-section-head pp-section-head--flush">
          <p className="pp-section-eyebrow">{PRICING_FAQ_META.eyebrow}</p>
          <h2 id="pricing-faq-heading" className="pp-section-title">
            {PRICING_FAQ_META.title}
          </h2>
        </div>
        <Link href={PRICING_FAQ_META.viewAllHref} className="pp-faq-link">
          {PRICING_FAQ_META.viewAllLabel}
          <Icon name="arrow-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
        </Link>
      </div>

      <div className="pp-faq-panel">
        <FaqAccordion items={[...PRICING_FAQ]} />
      </div>
    </Section>
  );
}
