import { Icon } from '@/components/ui/icon';
import type { IndustryItem } from './types';

interface IndustryCardProps {
  readonly industry: IndustryItem;
  readonly selected: boolean;
  readonly onSelect: () => void;
}

export function IndustryCard({ industry, selected, onSelect }: IndustryCardProps) {
  return (
    <button
      type="button"
      className="ip-card"
      aria-pressed={selected}
      aria-controls="industry-detail-panel"
      onClick={onSelect}
    >
      <span className="ip-card__icon" aria-hidden>
        <Icon name={industry.icon} size="sm" className="h-[18px] w-[18px]" />
      </span>

      <h3 className="ip-card__title">{industry.name}</h3>
      <p className="ip-card__desc">{industry.shortDescription}</p>

      <div className="ip-card__block">
        <p className="ip-card__label">Common challenges</p>
        <ul className="ip-card__list">
          {industry.challenges.slice(0, 2).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="ip-card__block">
        <p className="ip-card__label">Solutions provided</p>
        <ul className="ip-card__list">
          {industry.solutions.slice(0, 2).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <span className="ip-card__cta">
        {industry.cta.label}
        <Icon name="arrow-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
      </span>
    </button>
  );
}
