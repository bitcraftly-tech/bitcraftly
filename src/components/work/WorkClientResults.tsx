import { Section } from '@/components/ui/section';
import { WORK_METRICS, WORK_METRICS_META } from './work.content';

export function WorkClientResults() {
  return (
    <Section id="work-results" spacing="lg" aria-labelledby="work-results-heading">
      <header className="wp-section-head">
        <p className="wp-section-eyebrow">{WORK_METRICS_META.eyebrow}</p>
        <h2 id="work-results-heading" className="wp-section-title">
          {WORK_METRICS_META.title}
        </h2>
        <p className="wp-section-desc">{WORK_METRICS_META.description}</p>
      </header>

      <div className="wp-metrics">
        {WORK_METRICS.map((metric) => (
          <article key={metric.id} className="wp-metric">
            <p className="wp-metric__value">{metric.value}</p>
            <p className="wp-metric__label">{metric.label}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
