import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { NAV_ACTIONS } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { getWorkProjectCaseStudyHref, getWorkProjectHref } from './work.content';
import type { WorkProject } from './work.types';

export type WorkProjectCardSize = 'large' | 'medium' | 'compact';

interface WorkProjectCardProps {
  project: WorkProject;
  size?: WorkProjectCardSize;
  className?: string;
}

function projectPrimaryHref(project: WorkProject): string {
  return getWorkProjectCaseStudyHref(project) ?? getWorkProjectHref(project.slug);
}

/**
 * Portfolio catalog card — matches bitcraftly.com/portfolio rhythm:
 * image → title → summary → tags → Case Study + Live Client / Interactive demo.
 */
export function WorkProjectCard({ project, className }: WorkProjectCardProps) {
  const isFuture = project.status === 'future';
  const isInteractiveDemo = project.badge === 'Interactive demo';
  const caseStudyHref = getWorkProjectCaseStudyHref(project);
  const primaryHref = isFuture ? NAV_ACTIONS.freeConsultation.href : projectPrimaryHref(project);
  const liveHref = project.liveUrl ?? primaryHref;
  const liveExternal = Boolean(project.liveExternal) || isInteractiveDemo;
  const coverAlt = project.coverImageAlt ?? `${project.title} product screenshot`;
  const badge = project.badge ?? (isFuture ? 'Future project' : project.industry);
  const demoLabel = isInteractiveDemo ? 'Interactive demo' : 'Live Client';
  const primaryLabel = isFuture ? 'Discuss build' : caseStudyHref ? 'Case Study' : 'View project';

  return (
    <article
      className={cn(
        'work-pf-card',
        `work-pf-card--${project.accent}`,
        isFuture && 'work-pf-card--future',
        className,
      )}
    >
      <div className="work-pf-card__media">
        <div className="work-pf-card__media-visual">
          <Image
            src={project.coverImage}
            alt={coverAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top"
          />
        </div>
        <div className="work-pf-card__media-overlay" aria-hidden />
        <div className="work-pf-card__media-badges">
          <span className="work-pf-card__chip">{project.industry}</span>
          <span className="work-pf-card__chip work-pf-card__chip--accent">{badge}</span>
        </div>
      </div>

      <h3 className="work-pf-card__title">{project.title}</h3>
      <p className="work-pf-card__summary">{project.summary}</p>

      <ul className="work-pf-card__tech" aria-label="Technologies used">
        {project.techStack.slice(0, 5).map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <div className="work-pf-card__actions">
        <Link href={primaryHref} className="work-pf-card__btn work-pf-card__btn--primary">
          {primaryLabel}
          <Icon name="arrow-up-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
        </Link>
        {!isFuture ? (
          <Link
            href={liveHref}
            target={liveExternal ? '_blank' : undefined}
            rel={liveExternal ? 'noopener noreferrer' : undefined}
            className="work-pf-card__btn work-pf-card__btn--outline"
          >
            {demoLabel}
            <Icon name="arrow-up-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
