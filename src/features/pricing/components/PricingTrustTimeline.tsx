import { Section } from '@/components/ui/section';
import { PRICING_TRUST_TIMELINE, PRICING_TRUST_TIMELINE_META } from '../pricing.content';

export function PricingTrustTimeline() {
  return (
    <Section
      id="pricing-trust-timeline"
      spacing="lg"
      aria-labelledby="pricing-trust-timeline-heading"
    >
      <div className="pp-section-head">
        <p className="pp-section-eyebrow">{PRICING_TRUST_TIMELINE_META.eyebrow}</p>
        <h2 id="pricing-trust-timeline-heading" className="pp-section-title">
          {PRICING_TRUST_TIMELINE_META.title}
        </h2>
        <p className="pp-section-desc">{PRICING_TRUST_TIMELINE_META.description}</p>
      </div>

      <ol className="pp-trust-timeline">
        {PRICING_TRUST_TIMELINE.map((step, index) => (
          <li key={step.title} className="pp-trust-timeline__step">
            <div className="pp-trust-timeline__marker" aria-hidden>
              <span className="pp-trust-timeline__dot" />
              {index < PRICING_TRUST_TIMELINE.length - 1 ? (
                <span className="pp-trust-timeline__line" />
              ) : null}
            </div>
            <div className="pp-trust-timeline__content">
              <p className="pp-trust-timeline__title">{step.title}</p>
              <p className="pp-trust-timeline__desc">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
