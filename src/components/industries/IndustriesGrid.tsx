import { Section } from '@/components/ui/section';
import { INDUSTRIES_GRID_META, INDUSTRY_ITEMS } from './industries.content';
import { IndustryCard } from './IndustryCard';
import type { IndustryId } from './types';

interface IndustriesGridProps {
  readonly selectedId: IndustryId;
  readonly onSelect: (id: IndustryId) => void;
}

export function IndustriesGrid({ selectedId, onSelect }: IndustriesGridProps) {
  return (
    <Section id="industries-grid" spacing="lg" aria-labelledby="industries-grid-heading">
      <header className="ip-section-head">
        <p className="ip-section-eyebrow">{INDUSTRIES_GRID_META.eyebrow}</p>
        <h2 id="industries-grid-heading" className="ip-section-title">
          {INDUSTRIES_GRID_META.title}
        </h2>
        <p className="ip-section-desc">{INDUSTRIES_GRID_META.description}</p>
      </header>

      <div className="ip-grid">
        {INDUSTRY_ITEMS.map((industry) => (
          <IndustryCard
            key={industry.id}
            industry={industry}
            selected={selectedId === industry.id}
            onSelect={() => onSelect(industry.id)}
          />
        ))}
      </div>
    </Section>
  );
}
