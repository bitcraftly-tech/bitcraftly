import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import type { AiSolutionItem } from './types';

interface AiSolutionCardProps {
  readonly solution: AiSolutionItem;
}

export function AiSolutionCard({ solution }: AiSolutionCardProps) {
  return (
    <article className="as-card" aria-labelledby={`${solution.id}-title`}>
      <span className="as-card__icon" aria-hidden>
        <Icon name={solution.icon} size="sm" className="h-[18px] w-[18px]" />
      </span>

      <h3 id={`${solution.id}-title`} className="as-card__title">
        {solution.title}
      </h3>
      <p className="as-card__desc">{solution.description}</p>

      <p className="as-card__label">Business benefits</p>
      <ul className="as-card__benefits">
        {solution.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>

      <div className="as-card__cta">
        <Link href={solution.cta.href}>
          {solution.cta.label}
          <Icon name="arrow-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
        </Link>
      </div>
    </article>
  );
}
