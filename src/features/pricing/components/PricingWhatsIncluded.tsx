import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { PRICING_INCLUDED, PRICING_INCLUDED_META } from '../pricing.content';

export function PricingWhatsIncluded() {
  return (
    <Section id="pricing-included" spacing="lg" aria-labelledby="pricing-included-heading">
      <div className="pp-section-head">
        <p className="pp-section-eyebrow">{PRICING_INCLUDED_META.eyebrow}</p>
        <h2 id="pricing-included-heading" className="pp-section-title">
          {PRICING_INCLUDED_META.title}
        </h2>
        <p className="pp-section-desc">{PRICING_INCLUDED_META.description}</p>
      </div>

      <ul className="pp-included">
        {PRICING_INCLUDED.map((item) => (
          <li key={item} className="pp-included__item">
            <span className="pp-included__icon" aria-hidden>
              <Icon name="check" size="sm" className="h-[14px] w-[14px]" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
