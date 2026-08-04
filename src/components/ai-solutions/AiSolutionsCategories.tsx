import { Section } from '@/components/ui/section';
import { AI_CATEGORIES_META, AI_SOLUTION_ITEMS } from './ai-solutions.content';
import { AiSolutionCard } from './AiSolutionCard';

export function AiSolutionsCategories() {
  return (
    <Section
      id="ai-solutions-categories"
      spacing="lg"
      aria-labelledby="ai-solutions-categories-heading"
    >
      <header className="as-section-head">
        <p className="as-section-eyebrow">{AI_CATEGORIES_META.eyebrow}</p>
        <h2 id="ai-solutions-categories-heading" className="as-section-title">
          {AI_CATEGORIES_META.title}
        </h2>
        <p className="as-section-desc">{AI_CATEGORIES_META.description}</p>
      </header>

      <div className="as-grid">
        {AI_SOLUTION_ITEMS.map((solution) => (
          <AiSolutionCard key={solution.id} solution={solution} />
        ))}
      </div>
    </Section>
  );
}
