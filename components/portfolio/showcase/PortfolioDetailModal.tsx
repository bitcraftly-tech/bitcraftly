"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import PortfolioCardThumbnail from "@/components/portfolio/showcase/PortfolioCardThumbnail";
import { newTabProps } from "@/lib/newTabLink";
import { whatsappUrl } from "@/lib/constants";
import { CASE_STUDY_LABELS, PORTFOLIO } from "@/lib/portfolioContent";
import {
  PORTFOLIO_CASE_AFTER,
  PORTFOLIO_CASE_BEFORE,
  PORTFOLIO_CASE_LIVE,
  PORTFOLIO_CTA_PRIMARY,
  PORTFOLIO_CTA_SECONDARY,
  PORTFOLIO_PERF_METRIC,
  PORTFOLIO_RESULT_HIGHLIGHT,
} from "@/lib/portfolioPalette";
import type { PortfolioProject } from "@/lib/portfolio/projectUtils";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";
import {
  PORTFOLIO_CHECK_ICON,
  projectBadgeClasses,
  projectFocusClasses,
  techStackBadgeClasses,
} from "@/lib/portfolioVisualUtils";

type PortfolioDetailModalProps = {
  project: PortfolioProject | null;
  onClose: () => void;
};

export default function PortfolioDetailModal({ project, onClose }: PortfolioDetailModalProps) {
  const reduceMotion = useReducedMotion();

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!project) return;
    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [project, handleKey]);

  const live = project?.liveUrl?.trim();
  const demo = project?.demoHref?.trim();
  const cs = project?.caseStudy;

  return (
    <AnimatePresence>
      {project && cs ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-modal-title"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-[#2c3e50]/60 backdrop-blur-sm dark:bg-[#2c3e50]/75"
            aria-label="Close project details"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-[#bdc3c7]/50 bg-bg-card shadow-2xl dark:border-[#34495e]/55 dark:bg-dark-bg-card sm:rounded-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <div className="flex items-center justify-between border-b border-[#bdc3c7]/40 px-4 py-3 dark:border-[#34495e]/45">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#2980b9]">{CASE_STUDY_LABELS.overview}</p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-2 py-1 text-sm font-medium text-[#7f8c8d] hover:bg-[#ecf0f1] dark:hover:bg-[#34495e]/50"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain">
              <PortfolioCardThumbnail project={project} />

              <div className="space-y-6 p-5 sm:p-6">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase ${projectBadgeClasses(project.badge)}`}>
                      {project.badge}
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${projectFocusClasses(project.projectFocus)}`}>
                      {project.projectFocus}
                    </span>
                  </div>
                  <h2 id="portfolio-modal-title" className="mt-3 font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary">
                    {project.title}
                  </h2>
                  <p className={`mt-2 text-sm font-medium ${PORTFOLIO_RESULT_HIGHLIGHT}`}>{project.resultHighlight}</p>
                  <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">{project.cardLine}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#bdc3c7]/40 bg-bg-secondary/30 p-4 dark:border-[#34495e]/45">
                    <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{CASE_STUDY_LABELS.problem}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{cs.problem}</p>
                  </div>
                  <div className="rounded-xl border border-[#3498db]/25 bg-[#3498db]/5 p-4">
                    <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{CASE_STUDY_LABELS.solution}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{cs.solution}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{CASE_STUDY_LABELS.techStack}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${techStackBadgeClasses(tech)}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {cs.performance && cs.performance.length > 0 ? (
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{CASE_STUDY_LABELS.performance}</h3>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {cs.performance.map((m) => (
                        <div key={m.label} className={PORTFOLIO_PERF_METRIC}>
                          <p className="text-[10px] font-bold uppercase tracking-wide text-[#16a085]">{m.label}</p>
                          <p className="mt-1 text-lg font-semibold text-[#2980b9]">{m.value}</p>
                          {m.note ? <p className="mt-0.5 text-[10px] text-text-tertiary">{m.note}</p> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div>
                  <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{CASE_STUDY_LABELS.results}</h3>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                    {cs.results.map((r) => (
                      <li key={r} className="flex gap-2 rounded-lg border border-[#bdc3c7]/40 px-3 py-2 text-sm text-text-secondary dark:border-[#34495e]/45">
                        <span className={PORTFOLIO_CHECK_ICON} aria-hidden>
                          ✔
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className={PORTFOLIO_CASE_BEFORE}>
                    <p className="text-xs font-bold uppercase text-[#95a5a6]">{cs.beforeLabel}</p>
                    <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                      {cs.beforePoints.map((p) => (
                        <li key={p}>· {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={PORTFOLIO_CASE_AFTER}>
                    <p className="text-xs font-bold uppercase text-[#2980b9]">{cs.afterLabel}</p>
                    <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                      {cs.afterPoints.map((p) => (
                        <li key={p}>✔ {p}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {(project.keyFeatures ?? project.featureBullets).length > 0 ? (
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Key features</h3>
                    <ul className="mt-2 space-y-1">
                      {(project.keyFeatures ?? project.featureBullets).map((f) => (
                        <li key={f} className="flex gap-2 text-sm text-text-secondary">
                          <span className={PORTFOLIO_CHECK_ICON}>✔</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {live ? (
                  <div className={PORTFOLIO_CASE_LIVE}>
                    <p className="text-sm font-semibold">{PORTFOLIO.liveProjectTitle}</p>
                    <a href={live} className={`mt-3 inline-flex ${PORTFOLIO_CTA_PRIMARY}`} {...newTabProps(live)}>
                      Open live site →
                    </a>
                  </div>
                ) : demo ? (
                  <a href={demo} className={`inline-flex ${PORTFOLIO_CTA_SECONDARY}`} {...newTabProps(demo)}>
                    {project.ctaLabel ?? "Open demo →"}
                  </a>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-[#bdc3c7]/40 bg-bg-secondary/20 p-4 dark:border-[#34495e]/45">
              <Link
                href={`/contact?service=${encodeURIComponent(project.title)}&intent=consultation&source=portfolio-modal`}
                className={PORTFOLIO_CTA_PRIMARY}
                onClick={onClose}
              >
                Start your project
              </Link>
              <Link href={`/contact?intent=consultation&source=portfolio-modal`} className={PORTFOLIO_CTA_SECONDARY} onClick={onClose}>
                Book free consultation
              </Link>
              <a href={whatsappUrl(WHATSAPP_MESSAGES.portfolio)} target="_blank" rel="noopener noreferrer" className={PORTFOLIO_CTA_SECONDARY}>
                WhatsApp
              </a>
              <Link href={project.caseStudyHref} className={`${PORTFOLIO_CTA_SECONDARY} ml-auto`} onClick={onClose}>
                Full page →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
