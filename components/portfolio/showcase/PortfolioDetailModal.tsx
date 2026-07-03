"use client";

import { useEffect, useCallback, type ComponentType } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  ExternalLink,
  FolderKanban,
  MessageCircle,
  Star,
  TrendingUp,
  User,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";

import { newTabProps } from "@/lib/newTabLink";
import { whatsappUrl } from "@/lib/constants";
import { CASE_STUDY_LABELS } from "@/lib/portfolioContent";
import {
  caseStudyCategoryLabel,
  caseStudyClient,
  caseStudyHeadlineMetrics,
  caseStudyKeyFeatures,
  caseStudyOverview,
  caseStudyServices,
  caseStudyTimeline,
} from "@/lib/portfolio/caseStudyModal";
import type { PortfolioProject } from "@/lib/portfolio/projectUtils";
import type { CaseStudyHeadlineMetric } from "@/lib/portfolioItems";
import { PS_BTN_GHOST, PS_BTN_PRIMARY } from "@/lib/portfolioShowcaseTheme";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";
import { projectBadgeClassesLight, showcaseBadgeLabel, techStackBadgeClasses } from "@/lib/portfolioVisualUtils";

type PortfolioDetailModalProps = {
  project: PortfolioProject | null;
  onClose: () => void;
};

function MetricIcon({ icon }: { icon?: CaseStudyHeadlineMetric["icon"] }) {
  const cls = "size-4 text-[#8e44ad]";
  switch (icon) {
    case "trending":
      return <TrendingUp className={cls} aria-hidden />;
    case "users":
      return <Users className={cls} aria-hidden />;
    case "clock":
      return <Calendar className={cls} aria-hidden />;
    case "target":
      return <FolderKanban className={cls} aria-hidden />;
    default:
      return <Zap className={cls} aria-hidden />;
  }
}

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
  const demo = project?.demoHref?.trim() ?? project?.externalUrl;
  const cs = project?.caseStudy;

  return (
    <AnimatePresence>
      {project && cs ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-modal-title"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-[#2c3e50]/50 backdrop-blur-[2px]"
            aria-label="Close project details"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-10 flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[20px] border border-[#e8ecef] bg-white shadow-[0_24px_64px_rgba(44,62,80,0.18)] sm:rounded-[20px] dark:border-dark-border-primary dark:bg-dark-bg-card dark:shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-[#e8ecef] px-5 py-3.5 dark:border-dark-border-primary sm:px-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9b59b6] dark:text-indigo-400">Case Study Overview</p>
              <button
                type="button"
                onClick={onClose}
                className="flex size-8 items-center justify-center rounded-lg text-[#95a5a6] transition hover:bg-[#f4f6f8] hover:text-[#2c3e50] dark:text-dark-text-tertiary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain">
              {/* Summary + metrics */}
              <div className="border-b border-[#e8ecef] px-5 py-5 dark:border-dark-border-primary sm:px-6 sm:py-6">
                <div className="flex min-w-0 gap-4">
                  <div
                    className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9b59b6]/15 to-[#8e44ad]/10 sm:size-16"
                    aria-hidden
                  >
                    <span className="text-3xl sm:text-4xl">{project.emoji}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${projectBadgeClassesLight(project)}`}
                    >
                      {showcaseBadgeLabel(project)}
                    </span>
                    <h2 id="portfolio-modal-title" className="mt-2 text-xl font-bold text-[#2c3e50] dark:text-dark-text-primary sm:text-2xl">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#7f8c8d] dark:text-dark-text-secondary">{project.cardLine}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${techStackBadgeClasses(tech)}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid min-w-0 grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
                  {caseStudyHeadlineMetrics(project).map((m) => (
                    <div
                      key={`${m.label}-${m.value}`}
                      className="flex min-w-0 flex-col items-center overflow-hidden rounded-xl border border-[#e8ecef] bg-[#fafbfc] px-2 py-3 text-center dark:border-dark-border-primary dark:bg-dark-bg-secondary sm:px-3"
                    >
                      <MetricIcon icon={m.icon} />
                      <p className="mt-2 w-full truncate text-sm font-bold text-[#2c3e50] dark:text-dark-text-primary sm:text-base">{m.value}</p>
                      <p className="mt-0.5 w-full truncate text-[10px] font-medium text-[#95a5a6] dark:text-dark-text-tertiary">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two-column content */}
              <div className="grid gap-6 px-5 py-5 sm:px-6 sm:py-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
                <div className="space-y-6">
                  <section>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-[#2c3e50] dark:text-dark-text-primary">
                      <BookOpen className="size-4 text-[#8e44ad]" aria-hidden />
                      Overview
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#7f8c8d] dark:text-dark-text-secondary">{caseStudyOverview(project)}</p>
                  </section>

                  <section>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-[#2c3e50] dark:text-dark-text-primary">
                      <Star className="size-4 text-[#8e44ad]" aria-hidden />
                      Key Features
                    </h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {caseStudyKeyFeatures(project).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-[#7f8c8d] dark:text-dark-text-secondary">
                          <span
                            className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#9b59b6]/12 text-[10px] font-bold text-[#8e44ad]"
                            aria-hidden
                          >
                            ✓
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <aside className="h-fit rounded-2xl border border-[#e8ecef] bg-[#f4f6f8]/80 p-4 dark:border-dark-border-primary dark:bg-dark-bg-secondary/80 sm:p-5">
                  <dl className="space-y-4">
                    <MetaRow icon={User} label="Client" value={caseStudyClient(project)} />
                    <MetaRow icon={Calendar} label="Timeline" value={caseStudyTimeline(project)} />
                    <MetaRow icon={FolderKanban} label="Category" value={caseStudyCategoryLabel(project)} />
                    <MetaRow icon={Wrench} label="Services" value={caseStudyServices(project).join(", ")} />
                  </dl>

                  <div className="mt-5 space-y-2 border-t border-[#e8ecef] pt-4 dark:border-dark-border-primary">
                    {demo ? (
                      <a
                        href={demo}
                        className="flex items-center gap-2 text-sm font-semibold text-[#8e44ad] transition hover:text-[#9b59b6]"
                        {...newTabProps(demo)}
                      >
                        <ExternalLink className="size-3.5" aria-hidden />
                        Live Demo
                      </a>
                    ) : null}
                    {live ? (
                      <a
                        href={live}
                        className="flex items-center gap-2 text-sm font-semibold text-[#8e44ad] transition hover:text-[#9b59b6]"
                        {...newTabProps(live)}
                      >
                        <ExternalLink className="size-3.5" aria-hidden />
                        Live site
                      </a>
                    ) : null}
                    <Link
                      href={project.caseStudyHref}
                      className="flex items-center gap-2 text-sm font-semibold text-[#8e44ad] transition hover:text-[#9b59b6]"
                      onClick={onClose}
                    >
                      <ExternalLink className="size-3.5" aria-hidden />
                      {CASE_STUDY_LABELS.overview} page
                    </Link>
                  </div>
                </aside>
              </div>
            </div>

            {/* Sticky footer */}
            <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-[#e8ecef] bg-white px-4 py-3.5 dark:border-dark-border-primary dark:bg-dark-bg-card sm:gap-3 sm:px-5">
              <Link
                href={`/contact?service=${encodeURIComponent(project.title)}&intent=consultation&source=portfolio-modal`}
                className={PS_BTN_PRIMARY}
                onClick={onClose}
              >
                Start your project →
              </Link>
              <Link href="/contact?intent=consultation&source=portfolio-modal" className={PS_BTN_GHOST} onClick={onClose}>
                Book free consultation
              </Link>
              <a
                href={whatsappUrl(WHATSAPP_MESSAGES.portfolio)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${PS_BTN_GHOST} gap-2`}
              >
                <MessageCircle className="size-4 text-[#27ae60]" aria-hidden />
                WhatsApp
              </a>
              <Link href={project.caseStudyHref} className={`${PS_BTN_GHOST} sm:ml-auto`} onClick={onClose}>
                Full page →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-[#8e44ad]" aria-hidden />
      <div>
        <dt className="text-[11px] font-semibold uppercase tracking-wide text-[#95a5a6] dark:text-dark-text-tertiary">{label}</dt>
        <dd className="mt-0.5 text-sm font-medium text-[#2c3e50] dark:text-dark-text-primary">{value}</dd>
      </div>
    </div>
  );
}
