"use client";

import { motion, useReducedMotion } from "framer-motion";

import PortfolioCardThumbnail from "@/components/portfolio/showcase/PortfolioCardThumbnail";
import { newTabProps } from "@/lib/newTabLink";
import {
  PORTFOLIO_CARD_HOVER,
  PORTFOLIO_CARD_SHELL,
  PORTFOLIO_LINK_ACCENT,
  PORTFOLIO_RESULT_HIGHLIGHT,
} from "@/lib/portfolioPalette";
import type { PortfolioProject } from "@/lib/portfolio/projectUtils";
import {
  PORTFOLIO_CHECK_ICON,
  projectBadgeClasses,
  projectFocusClasses,
  techStackBadgeClasses,
} from "@/lib/portfolioVisualUtils";

type PortfolioShowcaseCardProps = {
  project: PortfolioProject;
  index: number;
  onOpenCaseStudy: (project: PortfolioProject) => void;
};

export default function PortfolioShowcaseCard({ project, index, onOpenCaseStudy }: PortfolioShowcaseCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.24) }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className={`${PORTFOLIO_CARD_SHELL} ${PORTFOLIO_CARD_HOVER} flex flex-col overflow-hidden`}
    >
      <PortfolioCardThumbnail project={project} />

      <div className="flex flex-1 flex-col border-t border-[#bdc3c7]/35 p-4 dark:border-[#34495e]/45">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${projectBadgeClasses(project.badge)}`}>
            {project.badge}
          </span>
          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${projectFocusClasses(project.projectFocus)}`}>
            {project.projectFocus}
          </span>
        </div>

        <h3 className="mt-2 text-base font-semibold text-text-primary dark:text-dark-text-primary">{project.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary md:hidden">
          {project.mobileCardLine}
        </p>
        <p className="mt-1 hidden line-clamp-2 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary md:block">
          {project.cardLine}
        </p>
        <p className={`mt-2 text-[11px] font-semibold ${PORTFOLIO_RESULT_HIGHLIGHT}`}>{project.resultHighlight}</p>

        {project.caseStudy.performance?.[0] ? (
          <p className="mt-1 text-[10px] text-text-tertiary dark:text-dark-text-tertiary">
            <span className="font-semibold text-[#16a085]">{project.caseStudy.performance[0].label}:</span> {project.caseStudy.performance[0].value}
          </p>
        ) : null}

        <div className="mt-2 flex flex-wrap gap-1">
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech} className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${techStackBadgeClasses(tech)}`}>
              {tech}
            </span>
          ))}
        </div>

        <ul className="mt-3 hidden space-y-1 sm:block">
          {(project.keyFeatures ?? project.featureBullets).slice(0, 3).map((line) => (
            <li key={line} className="flex items-start gap-1.5 text-[11px] text-text-secondary dark:text-dark-text-secondary">
              <span className={`mt-[2px] shrink-0 ${PORTFOLIO_CHECK_ICON}`} aria-hidden>
                ✔
              </span>
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {project.externalUrl ? (
            <a
              href={project.externalUrl}
              className={`inline-flex items-center rounded-lg border border-[#3498db]/35 bg-[#3498db]/8 px-3 py-1.5 text-[11px] font-semibold ${PORTFOLIO_LINK_ACCENT}`}
              {...newTabProps(project.externalUrl)}
            >
              {project.ctaLabel ?? "View project →"}
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="inline-flex items-center rounded-lg bg-[#2980b9]/10 px-3 py-1.5 text-[11px] font-semibold text-[#2980b9] transition hover:bg-[#3498db]/15 dark:text-[#5dade2]"
          >
            Case study
          </button>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-[#34495e]/30 px-3 py-1.5 text-[11px] font-semibold text-[#7f8c8d] transition hover:border-[#3498db]/40 dark:text-[#bdc3c7]"
            >
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
