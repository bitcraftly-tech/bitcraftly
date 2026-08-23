import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { NAV_ACTIONS } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { getWorkProjectCaseStudyHref, getWorkProjectHref } from './work.content';
import { WorkBrowserCover } from './WorkBrowserCover';
import type { WorkProject } from './work.types';

interface WorkFeaturedProjectCardProps {
  project: WorkProject;
  variant?: 'spotlight' | 'rail';
  index?: number;
  className?: string;
  priority?: boolean;
}

function projectPrimaryHref(project: WorkProject): string {
  return getWorkProjectCaseStudyHref(project) ?? getWorkProjectHref(project.slug);
}

/**
 * Featured Work card — editorial spotlight + distinct secondary rail tiles.
 * Layout intentionally differs from Selected Projects bento cards.
 */
export function WorkFeaturedProjectCard({
  project,
  variant = 'rail',
  index = 1,
  className,
  priority = false,
}: WorkFeaturedProjectCardProps) {
  const isFuture = project.status === 'future';
  const caseStudyHref = getWorkProjectCaseStudyHref(project);
  const href = isFuture ? NAV_ACTIONS.freeConsultation.href : projectPrimaryHref(project);
  const ctaLabel = isFuture
    ? 'Discuss this build'
    : caseStudyHref
      ? 'View Case Study'
      : 'View project';
  const results = project.metrics.slice(0, variant === 'spotlight' ? 2 : 1);
  const tech = project.techStack.slice(0, variant === 'spotlight' ? 5 : 3);
  const hostname = project.previewHost ?? `${project.slug.replace(/-/g, '.')}.app`;
  const coverAlt = project.coverImageAlt ?? `${project.title} product screenshot`;
  const indexLabel = String(index).padStart(2, '0');

  return (
    <article
      className={cn(
        'work-feat',
        `work-feat--${variant}`,
        `work-feat--${project.accent}`,
        isFuture && 'work-feat--future',
        className,
      )}
    >
      <div className="work-feat__media">
        <WorkBrowserCover
          namespace="work-featured-card"
          src={project.coverImage}
          alt={coverAlt}
          hostname={hostname}
          priority={priority}
          sizes={
            variant === 'spotlight'
              ? '(max-width: 1024px) 100vw, 55vw'
              : '(max-width: 1024px) 100vw, 30vw'
          }
        />
        <div className="work-feat__badges">
          {isFuture ? (
            <span className="work-feat__badge work-feat__badge--future">Future project</span>
          ) : (
            <span className="work-feat__badge">{project.industry}</span>
          )}
        </div>
      </div>

      <div className="work-feat__panel">
        {variant === 'rail' ? (
          <p className="work-feat__index" aria-hidden>
            {indexLabel}
          </p>
        ) : null}

        <div className="work-feat__meta">
          {!isFuture ? (
            <span className="work-feat__service">{project.services[0]}</span>
          ) : (
            <span className="work-feat__service">Coming soon</span>
          )}
          {project.duration ? (
            <span className="work-feat__duration">{project.duration}</span>
          ) : null}
        </div>

        <h3 className="work-feat__title">{project.title}</h3>

        <p className="work-feat__outcome">{project.outcome}</p>

        {variant === 'spotlight' ? (
          <ul className="work-feat__tech" aria-label="Technology stack">
            {tech.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        {results.length > 0 && !isFuture ? (
          <ul className="work-feat__metrics" aria-label="Key results">
            {results.map((metric) => (
              <li key={metric.id}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {isFuture ? (
          <p className="work-feat__future-note">
            Concept preview — available for scoped delivery after discovery.
          </p>
        ) : null}

        <Link href={href} className="work-feat__cta">
          {ctaLabel}
          <Icon name="arrow-up-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
        </Link>
      </div>
    </article>
  );
}
