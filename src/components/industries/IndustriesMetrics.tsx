import { Section } from '@/components/ui/section';
import { INDUSTRIES_METRICS, INDUSTRIES_METRICS_META } from './industries.content';

export function IndustriesMetrics() {
  return (
    <Section id="industries-metrics" spacing="lg" aria-labelledby="industries-metrics-heading">
      <header className="ip-section-head">
        <p className="ip-section-eyebrow">{INDUSTRIES_METRICS_META.eyebrow}</p>
        <h2 id="industries-metrics-heading" className="ip-section-title">
          {INDUSTRIES_METRICS_META.title}
        </h2>
        <p className="ip-section-desc">{INDUSTRIES_METRICS_META.description}</p>
      </header>

      <div className="ip-metrics">
        {INDUSTRIES_METRICS.map((metric) => (
          <article key={metric.id} className="ip-metric">
            <p className="ip-metric__value">{metric.value}</p>
            <p className="ip-metric__label">{metric.label}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
