import { Section } from '@/components/ui/section';
import { WORK_TECH, WORK_TECH_META } from './work.content';

export function WorkTechStack() {
  return (
    <Section
      id="work-tech"
      spacing="lg"
      aria-labelledby="work-tech-heading"
      className="wp-section--muted"
    >
      <header className="wp-section-head">
        <p className="wp-section-eyebrow">{WORK_TECH_META.eyebrow}</p>
        <h2 id="work-tech-heading" className="wp-section-title">
          {WORK_TECH_META.title}
        </h2>
        <p className="wp-section-desc">{WORK_TECH_META.description}</p>
      </header>

      <ul className="wp-tech" aria-label="Technologies used across Bitcraftly work">
        {WORK_TECH.map((tech) => (
          <li key={tech} className="wp-tech__item">
            {tech}
          </li>
        ))}
      </ul>
    </Section>
  );
}
