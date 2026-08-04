import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { PRICING_CLIENT_TRUST, PRICING_CLIENT_TRUST_META } from '../pricing.content';

export function PricingClientTrust() {
  return (
    <Section
      id="pricing-client-trust"
      spacing="lg"
      aria-labelledby="pricing-client-trust-heading"
    >
      <div className="pp-section-head">
        <p className="pp-section-eyebrow">{PRICING_CLIENT_TRUST_META.eyebrow}</p>
        <h2 id="pricing-client-trust-heading" className="pp-section-title">
          {PRICING_CLIENT_TRUST_META.title}
        </h2>
        <p className="pp-section-desc">{PRICING_CLIENT_TRUST_META.description}</p>
      </div>

      <div className="pp-client-trust">
        {PRICING_CLIENT_TRUST.map((item) => (
          <article key={item.title} className="pp-client-trust__card">
            <span className="pp-client-trust__icon" aria-hidden>
              <Icon name={item.icon} size="sm" className="h-[16px] w-[16px]" />
            </span>
            <h3 className="pp-client-trust__title">{item.title}</h3>
            <p className="pp-client-trust__desc">{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
