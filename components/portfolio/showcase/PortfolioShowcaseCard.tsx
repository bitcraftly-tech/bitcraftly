"use client";

import { motion, useReducedMotion } from "framer-motion";

import PortfolioCardThumbnail from "@/components/portfolio/showcase/PortfolioCardThumbnail";
import { newTabProps } from "@/lib/newTabLink";
import type { PortfolioProject } from "@/lib/portfolio/projectUtils";
import { PS_BTN_TEXT, PS_CARD } from "@/lib/portfolioShowcaseTheme";
import { projectBadgeClassesLight, showcaseBadgeLabel, techStackBadgeClasses } from "@/lib/portfolioVisualUtils";

type PortfolioShowcaseCardProps = {
  project: PortfolioProject;
  index: number;
  onOpenCaseStudy: (project: PortfolioProject) => void;
};

export default function PortfolioShowcaseCard({ project, index, onOpenCaseStudy }: PortfolioShowcaseCardProps) {
  const reduceMotion = useReducedMotion();
  const demoUrl = project.externalUrl;

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.32, delay: Math.min(index * 0.035, 0.2) }}
      className={PS_CARD}
    >
      <div className="flex items-start justify-between gap-2 px-4 pt-4">
        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${projectBadgeClassesLight(project)}`}>
          {showcaseBadgeLabel(project)}
        </span>
        <button
          type="button"
          onClick={() => onOpenCaseStudy(project)}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#9b59b6]/10 text-[#8e44ad] transition hover:bg-[#9b59b6]/20"
          aria-label={`Open case study for ${project.title}`}
        >
          <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 8h8M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-4 pb-4 sm:flex-row sm:items-stretch">
        <PortfolioCardThumbnail project={project} variant="compact" />

        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="text-base font-bold text-[#2c3e50]">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#7f8c8d]">{project.cardLine}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span key={tech} className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${techStackBadgeClasses(tech)}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 border-t border-[#ecf0f1] px-4 py-3">
        {demoUrl ? (
          <a href={demoUrl} className={PS_BTN_TEXT} {...newTabProps(demoUrl)}>
            <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 3H3v10h10v-3M9 2h5v5M7 9l7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Live Demo
          </a>
        ) : null}
        <button type="button" onClick={() => onOpenCaseStudy(project)} className={PS_BTN_TEXT}>
          Case Study
          <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 8h8M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </motion.article>
  );
}
