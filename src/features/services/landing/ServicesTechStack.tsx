import { Section } from '@/components/ui/section';
import { SERVICES_TECH_META, SERVICES_TECH_STACK } from './services-landing.content';

export function ServicesTechStack() {
  return (
    <Section
      id="services-tech"
      spacing="lg"
      aria-labelledby="services-tech-heading"
      className="sl-section--muted"
    >
      <header className="sl-section-head">
        <p className="sl-section-eyebrow">{SERVICES_TECH_META.eyebrow}</p>
        <h2 id="services-tech-heading" className="sl-section-title">
          {SERVICES_TECH_META.title}
        </h2>
        <p className="sl-section-desc">{SERVICES_TECH_META.description}</p>
      </header>

      <div className="sl-tech">
        {SERVICES_TECH_STACK.map((group) => (
          <article key={group.id} className="sl-tech__card">
            <h3 className="sl-tech__title">{group.title}</h3>
            <ul className="sl-tech__list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
