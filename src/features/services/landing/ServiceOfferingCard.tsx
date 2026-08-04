import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import type { ServiceOffering } from './types';

interface ServiceOfferingCardProps {
  readonly offering: ServiceOffering;
}

export function ServiceOfferingCard({ offering }: ServiceOfferingCardProps) {
  return (
    <article className="sl-card" aria-labelledby={`${offering.id}-title`}>
      <span className="sl-card__icon" aria-hidden>
        <Icon name={offering.icon} size="sm" className="h-[18px] w-[18px]" />
      </span>

      <h4 id={`${offering.id}-title`} className="sl-card__title">
        {offering.title}
      </h4>
      <p className="sl-card__desc">{offering.description}</p>

      <div className="sl-card__meta">
        <div>
          <p className="sl-card__label">Best for</p>
          <p className="sl-card__best">{offering.bestFor}</p>
        </div>

        <div>
          <p className="sl-card__label">Starting price</p>
          <p className="sl-card__price">
            {offering.startingPrice} <span>Starting From</span>
          </p>
        </div>

        <div>
          <p className="sl-card__label">Technologies</p>
          <ul className="sl-card__tech" aria-label={`${offering.title} technologies`}>
            {offering.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sl-card__cta">
        <Link href={offering.cta.href}>
          {offering.cta.label}
          <Icon name="arrow-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
        </Link>
      </div>
    </article>
  );
}
