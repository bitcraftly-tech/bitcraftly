import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import type { AboutFeaturedCaseStudy } from './about.types';

interface AboutFeaturedCaseStudyCardProps {
  study: AboutFeaturedCaseStudy;
}

/**
 * Reusable featured case study block — Project / Challenge / Solution / Results / CTA.
 */
export function AboutFeaturedCaseStudyCard({ study }: AboutFeaturedCaseStudyCardProps) {
  return (
    <article className="about-case" aria-labelledby={`${study.id}-heading`}>
      <header className="about-case__header">
        <p className="about-eyebrow">{study.eyebrow}</p>
        <h2 id={`${study.id}-heading`} className="about-heading">
          {study.heading}
        </h2>
        <p className="about-case__project">
          <span className="about-case__label">Project</span>
          {study.project}
        </p>
      </header>

      <div className="about-case__grid">
        <div className="about-case__block">
          <h3 className="about-case__label">Challenge</h3>
          <p className="about-case__text">{study.challenge}</p>
        </div>
        <div className="about-case__block">
          <h3 className="about-case__label">Solution</h3>
          <p className="about-case__text">{study.solution}</p>
        </div>
      </div>

      <div className="about-case__results">
        <h3 className="about-case__label">Results</h3>
        <ul className="about-case__results-list">
          {study.results.map((result) => (
            <li key={result}>
              <Icon
                name="check"
                size="sm"
                aria-hidden
                className="mt-[2px] h-[16px] w-[16px] shrink-0 text-primary"
              />
              <span>{result}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link href={study.ctaHref} className="about-case__cta">
        {study.ctaLabel}
        <Icon name="arrow-up-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
      </Link>
    </article>
  );
}
