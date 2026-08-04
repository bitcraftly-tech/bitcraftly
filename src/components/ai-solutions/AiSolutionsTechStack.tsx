import { Section } from '@/components/ui/section';
import { AI_TECH_META, AI_TECH_STACK } from './ai-solutions.content';

export function AiSolutionsTechStack() {
  return (
    <Section
      id="ai-solutions-tech"
      spacing="lg"
      aria-labelledby="ai-solutions-tech-heading"
      className="as-section--muted"
    >
      <header className="as-section-head">
        <p className="as-section-eyebrow">{AI_TECH_META.eyebrow}</p>
        <h2 id="ai-solutions-tech-heading" className="as-section-title">
          {AI_TECH_META.title}
        </h2>
        <p className="as-section-desc">{AI_TECH_META.description}</p>
      </header>

      <ul className="as-tech" aria-label="AI solutions technology stack">
        {AI_TECH_STACK.map((tech) => (
          <li key={tech} className="as-tech__item">
            {tech}
          </li>
        ))}
      </ul>
    </Section>
  );
}
