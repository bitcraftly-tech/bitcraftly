'use client';

import Image from 'next/image';
import { CaseStudyDetails } from './CaseStudyDetails';
import type { CaseStudyItem } from './types';

interface CaseStudyCardProps {
  readonly study: CaseStudyItem;
  readonly expanded: boolean;
  readonly onToggle: () => void;
}

export function CaseStudyCard({ study, expanded, onToggle }: CaseStudyCardProps) {
  const detailsId = `${study.id}-details`;

  return (
    <article className="cs-card" aria-labelledby={`${study.id}-title`}>
      <div className="cs-card__media">
        <p className="cs-card__industry">{study.industry}</p>
        <Image
          src={study.coverImage}
          alt={study.coverImageAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 560px"
          className="cs-card__media-img"
        />
      </div>

      <div className="cs-card__body">
        <h3 id={`${study.id}-title`} className="cs-card__name">
          {study.name}
        </h3>
        <p className="cs-card__description">{study.description}</p>

        <div className="cs-card__meta">
          <div>
            <p className="cs-card__label">Technology stack</p>
            <ul className="cs-card__stack" aria-label={`${study.name} technology stack`}>
              {study.techStack.map((tech) => (
                <li key={tech} className="cs-card__stack-item">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="cs-card__label">Timeline</p>
            <p className="cs-card__timeline">{study.timeline}</p>
          </div>

          <div>
            <p className="cs-card__label">Key features</p>
            <ul className="cs-card__features">
              {study.keyFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="cs-card__label">Business outcome</p>
            <p className="cs-card__outcome">{study.businessOutcome}</p>
          </div>
        </div>

        <div className="cs-card__footer">
          <button
            type="button"
            className="cs-card__cta"
            aria-expanded={expanded}
            aria-controls={detailsId}
            onClick={onToggle}
          >
            {study.ctaLabel}
            <span className="cs-card__cta-icon" aria-hidden="true">
              ▾
            </span>
          </button>
        </div>
      </div>

      <CaseStudyDetails id={detailsId} open={expanded} details={study.details} />
    </article>
  );
}
