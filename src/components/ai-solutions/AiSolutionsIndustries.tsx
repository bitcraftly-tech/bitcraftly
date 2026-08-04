import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { AI_INDUSTRIES, AI_INDUSTRIES_META } from './ai-solutions.content';

export function AiSolutionsIndustries() {
  return (
    <Section
      id="ai-solutions-industries"
      spacing="lg"
      aria-labelledby="ai-solutions-industries-heading"
      className="as-section--muted"
    >
      <header className="as-section-head">
        <p className="as-section-eyebrow">{AI_INDUSTRIES_META.eyebrow}</p>
        <h2 id="ai-solutions-industries-heading" className="as-section-title">
          {AI_INDUSTRIES_META.title}
        </h2>
        <p className="as-section-desc">{AI_INDUSTRIES_META.description}</p>
      </header>

      <div className="as-industries">
        {AI_INDUSTRIES.map((industry) => (
          <article key={industry.id} className="as-industry">
            <span className="as-industry__icon" aria-hidden>
              <Icon name={industry.icon} size="sm" className="h-[18px] w-[18px]" />
            </span>
            <h3 className="as-industry__title">{industry.title}</h3>
            <p className="as-industry__desc">{industry.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
