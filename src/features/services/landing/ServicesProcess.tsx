import { Section } from '@/components/ui/section';
import { SERVICES_PROCESS, SERVICES_PROCESS_META } from './services-landing.content';

export function ServicesProcess() {
  return (
    <Section id="services-process" spacing="lg" aria-labelledby="services-process-heading">
      <header className="sl-section-head">
        <p className="sl-section-eyebrow">{SERVICES_PROCESS_META.eyebrow}</p>
        <h2 id="services-process-heading" className="sl-section-title">
          {SERVICES_PROCESS_META.title}
        </h2>
        <p className="sl-section-desc">{SERVICES_PROCESS_META.description}</p>
      </header>

      <ol className="sl-process">
        {SERVICES_PROCESS.map((step) => (
          <li key={step.id} className="sl-process__card">
            <p className="sl-process__step">{step.step}</p>
            <h3 className="sl-process__title">{step.title}</h3>
            <p className="sl-process__desc">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
