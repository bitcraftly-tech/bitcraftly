import Image from 'next/image';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { WORK_FEATURED_META } from './work.content';
import type { WorkProject } from './types';

const ctaClassName = bcButtonClassName({
  variant: 'primary',
  size: 'lg',
  className: 'group h-[48px] min-w-[160px] px-[20px]',
});

interface WorkFeaturedCaseStudyProps {
  readonly project: WorkProject;
  readonly onViewDetails: () => void;
}

export function WorkFeaturedCaseStudy({ project, onViewDetails }: WorkFeaturedCaseStudyProps) {
  return (
    <Section
      id="work-featured"
      spacing="lg"
      aria-labelledby="work-featured-heading"
      className="wp-featured"
    >
      <header className="wp-section-head">
        <p className="wp-section-eyebrow">{WORK_FEATURED_META.eyebrow}</p>
        <h2 id="work-featured-heading" className="wp-section-title">
          {WORK_FEATURED_META.title}
        </h2>
      </header>

      <article className="wp-featured__card" aria-labelledby={`${project.id}-featured-title`}>
        <div className="wp-featured__media">
          <Image
            src={project.coverImage}
            alt={project.coverImageAlt}
            fill
            priority
            sizes="(max-width: 959px) 100vw, 55vw"
            className="wp-featured__img"
          />
        </div>

        <div className="wp-featured__body">
          <p className="wp-featured__industry">{project.industry}</p>
          <h3 id={`${project.id}-featured-title`} className="wp-featured__title">
            {project.name}
          </h3>
          <p className="wp-featured__overview">{project.overview}</p>

          <div className="wp-featured__meta">
            <div>
              <p className="wp-featured__label">Technology</p>
              <ul className="wp-featured__tech" aria-label={`${project.name} technology`}>
                {project.technology.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="wp-featured__label">Timeline</p>
              <p className="wp-featured__value">{project.timeline}</p>
            </div>
            <div>
              <p className="wp-featured__label">Business impact</p>
              <p className="wp-featured__value wp-featured__impact">{project.businessImpact}</p>
            </div>
            <div>
              <p className="wp-featured__label">Project type</p>
              <p className="wp-featured__value">{project.projectType}</p>
            </div>
          </div>

          <div className="wp-featured__actions">
            <button type="button" className={ctaClassName} onClick={onViewDetails}>
              <span>{project.cta.label}</span>
              <ButtonArrow className="text-[15px]" />
            </button>
          </div>
        </div>
      </article>
    </Section>
  );
}
