import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { AI_WHY, AI_WHY_META } from './ai-solutions.content';

export function AiSolutionsWhy() {
  return (
    <Section id="ai-solutions-why" spacing="lg" aria-labelledby="ai-solutions-why-heading">
      <header className="as-section-head">
        <p className="as-section-eyebrow">{AI_WHY_META.eyebrow}</p>
        <h2 id="ai-solutions-why-heading" className="as-section-title">
          {AI_WHY_META.title}
        </h2>
        <p className="as-section-desc">{AI_WHY_META.description}</p>
      </header>

      <div className="as-why">
        {AI_WHY.map((item) => (
          <article key={item.id} className="as-why__card">
            <span className="as-why__icon" aria-hidden>
              <Icon name={item.icon} size="sm" className="h-[18px] w-[18px]" />
            </span>
            <h3 className="as-why__title">{item.title}</h3>
            <p className="as-why__desc">{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
