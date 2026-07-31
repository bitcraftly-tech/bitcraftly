import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import type { PortfolioProject } from './portfolio.types';

interface PortfolioCardProps {
  project: PortfolioProject;
  className?: string;
}

export function PortfolioCard({ project, className }: PortfolioCardProps) {
  const liveExternal = Boolean(project.livePreviewExternal);
  const caseExternal = project.caseStudyHref.startsWith('http');
  const isInteractiveDemo = project.badge === 'Interactive demo';
  const demoLabel = isInteractiveDemo ? 'Interactive demo' : 'Live Client';

  return (
    <article
      className={cn('portfolio-card flex h-full flex-col rounded-[16px] !p-[16px]', className)}
    >
      <div className="portfolio-card-media">
        <div className="portfolio-card-media-visual">
          <Image
            src={project.imageSrc}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top"
          />
        </div>
        <div className="portfolio-card-media-overlay" aria-hidden />
        <div className="absolute left-[12px] top-[12px] z-[1] flex flex-wrap gap-[6px]">
          <span
            className={cn(
              'rounded-full bg-background/95 px-[10px] py-[4px]',
              'font-sans text-[11px] font-semibold uppercase tracking-[0.08em]',
              'text-foreground',
            )}
          >
            {project.industry}
          </span>
          <span
            className={cn(
              'rounded-full px-[10px] py-[4px]',
              'bg-primary/90 text-primary-foreground',
              'font-sans text-[11px] font-semibold uppercase tracking-[0.08em]',
            )}
          >
            {project.badge}
          </span>
        </div>
      </div>

      <h3 className="portfolio-card__title mb-0 font-sans text-[16px] font-bold leading-[1.25] tracking-[-0.015em] text-foreground">
        {project.title}
      </h3>

      <p className="portfolio-card__description mb-0 flex-1 font-sans text-[13px] font-normal leading-[1.55] text-muted-foreground line-clamp-3 sm:text-[14px]">
        {project.description}
      </p>

      <ul
        className="portfolio-card__tags m-0 flex list-none flex-wrap p-0"
        aria-label="Technologies used"
      >
        {project.technologies.map((tech) => (
          <li
            key={tech}
            className={cn(
              'rounded-[8px] bg-[#f0f4ff] px-[8px] py-[4px]',
              'font-sans text-[11px] font-medium text-primary',
            )}
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="portfolio-card-actions mt-auto flex flex-wrap items-center">
        <Link
          href={project.caseStudyHref}
          target={caseExternal ? '_blank' : undefined}
          rel={caseExternal ? 'noopener noreferrer' : undefined}
          className={cn(
            'group inline-flex items-center gap-[5px] no-underline',
            'font-sans text-[13px] font-semibold text-primary sm:text-[14px]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          )}
        >
          Case Study
          <Icon
            name="arrow-right"
            size="sm"
            aria-hidden
            className="h-[13px] w-[13px] transition-transform duration-[var(--duration-normal)] group-hover:translate-x-[3px]"
          />
        </Link>
        <Link
          href={project.livePreviewHref}
          target={liveExternal ? '_blank' : undefined}
          rel={liveExternal ? 'noopener noreferrer' : undefined}
          className={cn(
            'group inline-flex items-center gap-[5px] no-underline',
            'font-sans text-[13px] font-semibold text-foreground sm:text-[14px]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          )}
        >
          {demoLabel}
          <Icon
            name="arrow-up-right"
            size="sm"
            aria-hidden
            className="h-[13px] w-[13px] transition-transform duration-[var(--duration-normal)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
          />
        </Link>
      </div>
    </article>
  );
}
