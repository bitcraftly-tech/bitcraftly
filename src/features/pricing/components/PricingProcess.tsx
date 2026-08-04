import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { PRICING_PROCESS, PRICING_PROCESS_META } from '../pricing.content';

export function PricingProcess() {
  return (
    <Section id="pricing-process" spacing="lg" aria-labelledby="pricing-process-heading">
      <div className="pp-section-head">
        <p className="pp-section-eyebrow">{PRICING_PROCESS_META.eyebrow}</p>
        <h2 id="pricing-process-heading" className="pp-section-title">
          {PRICING_PROCESS_META.title}
        </h2>
        <p className="pp-section-desc">{PRICING_PROCESS_META.description}</p>
      </div>

      <ol className="pp-process">
        {PRICING_PROCESS.map((step) => (
          <li key={step.step} className="pp-process__step">
            <span className="pp-process__index">{step.step}</span>
            <span className="pp-process__icon" aria-hidden>
              <Icon name={step.icon} size="sm" className="h-[16px] w-[16px]" />
            </span>
            <h3 className="pp-process__title">{step.title}</h3>
            <p className="pp-process__desc">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
