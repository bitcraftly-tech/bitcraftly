import { Section } from '@/components/ui/section';
import { AI_PROCESS, AI_PROCESS_META } from './ai-solutions.content';

export function AiSolutionsProcess() {
  return (
    <Section id="ai-solutions-process" spacing="lg" aria-labelledby="ai-solutions-process-heading">
      <header className="as-section-head">
        <p className="as-section-eyebrow">{AI_PROCESS_META.eyebrow}</p>
        <h2 id="ai-solutions-process-heading" className="as-section-title">
          {AI_PROCESS_META.title}
        </h2>
        <p className="as-section-desc">{AI_PROCESS_META.description}</p>
      </header>

      <ol className="as-process">
        {AI_PROCESS.map((step) => (
          <li key={step.id} className="as-process__card">
            <p className="as-process__step">{step.step}</p>
            <h3 className="as-process__title">{step.title}</h3>
            <p className="as-process__desc">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
