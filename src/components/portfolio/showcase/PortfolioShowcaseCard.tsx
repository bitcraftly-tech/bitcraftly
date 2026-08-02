'use client';

import { motion, useReducedMotion } from 'framer-motion';

import PortfolioCardThumbnail from '@/components/portfolio/showcase/PortfolioCardThumbnail';
import { newTabProps } from '@/lib/newTabLink';
import type { PortfolioProject } from '@/lib/portfolio/projectUtils';
import { useMobileStaticEntrance } from '@/hooks/useMobileStaticEntrance';
import { PS_CARD } from '@/lib/portfolioShowcaseTheme';

import './portfolio-cards.css';

type PortfolioShowcaseCardProps = {
  project: PortfolioProject;
  index: number;
  onOpenCaseStudy: (project: PortfolioProject) => void;
};

const BTN_PRIMARY =
  'inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors duration-250 hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

const BTN_GHOST =
  'inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#374151] transition-colors duration-250 hover:border-[#D1D5DB] hover:bg-[#F9FAFB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:hover:border-dark-border-secondary dark:hover:bg-dark-bg-card';

export default function PortfolioShowcaseCard({
  project,
  index,
  onOpenCaseStudy,
}: PortfolioShowcaseCardProps) {
  const reduceMotion = useReducedMotion();
  const staticEntrance = useMobileStaticEntrance();
  const demoUrl = project.externalUrl;
  const skipEntrance = reduceMotion || staticEntrance;
  const demoLabel = project.badge === 'Interactive demo' ? 'Interactive demo' : 'Live Client';

  return (
    <motion.article
      layout
      initial={skipEntrance ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.18), ease: [0.22, 1, 0.36, 1] }}
      className={PS_CARD}
    >
      <PortfolioCardThumbnail project={project} variant="card" />

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="min-w-0 space-y-1">
          <h3 className="text-xl font-bold leading-snug tracking-tight text-[#111827] dark:text-dark-text-primary">
            {project.title}
          </h3>
          <p className="line-clamp-1 text-sm leading-relaxed text-[#6B7280] dark:text-dark-text-secondary">
            {project.cardLine}
          </p>
        </div>

        <div className="flex min-h-[3.25rem] flex-wrap content-start gap-1.5">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="inline-flex rounded-md bg-[#F3F4F6] px-2 py-0.5 text-xs font-medium text-[#4B5563] dark:bg-dark-bg-secondary dark:text-dark-text-secondary"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 ? (
            <span className="inline-flex rounded-md bg-[#F3F4F6] px-2 py-0.5 text-xs font-medium text-[#6B7280] dark:bg-dark-bg-secondary dark:text-dark-text-tertiary">
              +{project.techStack.length - 5}
            </span>
          ) : null}
        </div>

        <div className={`mt-auto grid gap-2 ${demoUrl ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <button type="button" onClick={() => onOpenCaseStudy(project)} className={BTN_PRIMARY}>
            Case Study
          </button>
          {demoUrl ? (
            <a href={demoUrl} className={BTN_GHOST} {...newTabProps(demoUrl)}>
              {demoLabel}
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
