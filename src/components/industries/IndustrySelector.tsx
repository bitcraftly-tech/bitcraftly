import { INDUSTRY_ITEMS } from './industries.content';
import type { IndustryId } from './types';

interface IndustrySelectorProps {
  readonly selectedId: IndustryId;
  readonly onSelect: (id: IndustryId) => void;
}

export function IndustrySelector({ selectedId, onSelect }: IndustrySelectorProps) {
  return (
    <div className="ip-selector" role="group" aria-label="Select an industry">
      {INDUSTRY_ITEMS.map((industry) => {
        const pressed = selectedId === industry.id;

        return (
          <button
            key={industry.id}
            type="button"
            className="ip-selector__btn"
            aria-pressed={pressed}
            onClick={() => onSelect(industry.id)}
          >
            {industry.name}
          </button>
        );
      })}
    </div>
  );
}
