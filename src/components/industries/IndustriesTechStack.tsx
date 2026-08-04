import { Section } from '@/components/ui/section';
import { INDUSTRIES_TECH, INDUSTRIES_TECH_META } from './industries.content';

export function IndustriesTechStack() {
  return (
    <Section
      id="industries-tech"
      spacing="lg"
      aria-labelledby="industries-tech-heading"
      className="ip-section--muted"
    >
      <header className="ip-section-head">
        <p className="ip-section-eyebrow">{INDUSTRIES_TECH_META.eyebrow}</p>
        <h2 id="industries-tech-heading" className="ip-section-title">
          {INDUSTRIES_TECH_META.title}
        </h2>
        <p className="ip-section-desc">{INDUSTRIES_TECH_META.description}</p>
      </header>

      <ul className="ip-tech" aria-label="Technologies used across industry solutions">
        {INDUSTRIES_TECH.map((tech) => (
          <li key={tech} className="ip-tech__item">
            {tech}
          </li>
        ))}
      </ul>
    </Section>
  );
}
