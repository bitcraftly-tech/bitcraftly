"use client";

import { motion, useReducedMotion } from "framer-motion";

import PortfolioCardThumbnail from "@/components/portfolio/showcase/PortfolioCardThumbnail";
import { newTabProps } from "@/lib/newTabLink";
import { PORTFOLIO_FEATURED } from "@/lib/portfolioContent";
import type { PortfolioProject } from "@/lib/portfolio/projectUtils";
import { PS_CARD } from "@/lib/portfolioShowcaseTheme";
import {
  projectBadgeClassesLight,
  projectFocusClasses,
  showcaseBadgeLabel,
  techStackBadgeClasses,
} from "@/lib/portfolioVisualUtils";

import "./portfolio-cards.css";

type PortfolioShowcaseCardProps = {
  project: PortfolioProject;
  index: number;
  onOpenCaseStudy: (project: PortfolioProject) => void;
};

function statusLabel(project: PortfolioProject): string {
  return showcaseBadgeLabel(project);
}

function isLiveClient(project: PortfolioProject): boolean {
  return project.badge === "Live client";
}

function actionLayoutClass(hasDemo: boolean, hasGithub: boolean): string {
  const count = 1 + (hasDemo ? 1 : 0) + (hasGithub ? 1 : 0);
  if (count === 1) return "ps-card-actions--single";
  if (count >= 3) return "ps-card-actions--triple";
  return "";
}

export default function PortfolioShowcaseCard({ project, index, onOpenCaseStudy }: PortfolioShowcaseCardProps) {
  const reduceMotion = useReducedMotion();
  const demoUrl = project.externalUrl;
  const isFeatured = project.slug === PORTFOLIO_FEATURED.slug;
  const categoryLabel = project.caseStudy.categoryLabel ?? project.tag;
  const liveClient = isLiveClient(project);
  const hasGithub = Boolean(project.githubUrl);

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.035, 0.21), ease: [0.22, 1, 0.36, 1] }}
      className={`${PS_CARD} ${
        isFeatured
          ? "ring-2 ring-[#8e44ad]/20 shadow-[0_2px_4px_rgba(15,23,42,0.04),0_18px_48px_-12px_rgba(142,68,173,0.2)]"
          : ""
      }`}
    >
      <div className="relative overflow-hidden rounded-t-[24px]">
        <PortfolioCardThumbnail project={project} variant="card" />
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-4">
          <div className="flex flex-wrap gap-2">
            {isFeatured ? (
              <span className="inline-flex items-center rounded-full border border-white/55 bg-[#8e44ad] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_4px_12px_rgba(142,68,173,0.32)]">
                Featured
              </span>
            ) : null}
            <span
              className={`ps-hero-badge inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.11em] ${projectBadgeClassesLight(project)} ${
                liveClient ? "ps-badge-live" : ""
              }`}
            >
              {statusLabel(project)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="ps-hero-arrow inline-flex size-9 shrink-0 items-center justify-center rounded-full text-[#8e44ad] hover:border-[#8e44ad]/25 active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8e44ad]"
            aria-label={`Open case study for ${project.title}`}
          >
            <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 8h8M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="ps-card-body relative flex flex-1 flex-col gap-4 px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
        <div className="ps-meta-bar w-fit max-w-full">
          <span className="ps-meta-label">{categoryLabel}</span>
          <span className="ps-meta-divider" aria-hidden />
          <span className="inline-flex items-center gap-1.5 pe-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#95a5a6]">
            Type
            <span
              className={`ps-chip inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold normal-case tracking-normal ${projectFocusClasses(project.projectFocus)}`}
            >
              {project.projectFocus}
            </span>
          </span>
        </div>

        <div className="min-w-0 space-y-2">
          <h3 className="font-[var(--font-playfair)] text-[1.35rem] font-semibold leading-[1.2] tracking-tight text-[#2c3e50] sm:text-[1.45rem]">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-[13px] leading-[1.65] text-[#7f8c8d] sm:text-sm">{project.cardLine}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className={`ps-chip inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-tight sm:text-[11px] ${techStackBadgeClasses(tech)}`}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 ? (
            <span className="ps-chip ps-chip-muted inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold sm:text-[11px]">
              +{project.techStack.length - 5}
            </span>
          ) : null}
        </div>

        <div className={`ps-card-actions mt-auto ${actionLayoutClass(Boolean(demoUrl), hasGithub)}`}>
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="ps-btn-primary-soft inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8e44ad]"
          >
            Case Study
            <svg className="size-3.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 8h8M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {demoUrl ? (
            <a
              href={demoUrl}
              className="ps-btn-ghost inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-[#2c3e50] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8e44ad]"
              {...newTabProps(demoUrl)}
            >
              <svg className="size-3.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 3H3v10h10v-3M9 2h5v5M7 9l7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Live Demo
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              className="ps-btn-ghost inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-[#2c3e50] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8e44ad]"
              {...newTabProps(project.githubUrl)}
            >
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
