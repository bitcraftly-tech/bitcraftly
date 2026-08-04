import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { PRICING_WHY, PRICING_WHY_META } from '../pricing.content';

export function PricingWhy() {
  return (
    <Section
      id="pricing-why"
      spacing="lg"
      aria-labelledby="pricing-why-heading"
      className="pp-section--muted"
    >
      <div className="pp-section-head">
        <p className="pp-section-eyebrow">{PRICING_WHY_META.eyebrow}</p>
        <h2 id="pricing-why-heading" className="pp-section-title">
          {PRICING_WHY_META.title}
        </h2>
        <p className="pp-section-desc">{PRICING_WHY_META.description}</p>
      </div>

      <div className="pp-why">
        {PRICING_WHY.map((item) => (
          <article key={item.title} className="pp-why__card">
            <span className="pp-why__icon" aria-hidden>
              <Icon name={item.icon} size="sm" className="h-[18px] w-[18px]" />
            </span>
            <h3 className="pp-why__title">{item.title}</h3>
            <p className="pp-why__desc">{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
