"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";

import JobRoleThumb from "@/components/ats/JobRoleThumb";
import { PS_BTN_TEXT, PS_CARD } from "@/lib/ats/careersShowcaseTheme";
import { jobApplyHref, type JobOpening } from "@/lib/ats/jobs";
import { techStackBadgeClasses } from "@/lib/portfolioVisualUtils";

function topBadgeClass(job: JobOpening): string {
  if (job.featured) return "border-[#9b59b6]/30 bg-[#9b59b6]/10 text-[#8e44ad]";
  if (job.workMode === "remote") return "border-[#27ae60]/30 bg-[#2ecc71]/10 text-[#27ae60]";
  if (job.workMode === "hybrid") return "border-[#f39c12]/35 bg-[#f39c12]/10 text-[#e67e22]";
  return "border-[#3498db]/35 bg-[#3498db]/10 text-[#2980b9]";
}

function topBadgeLabel(job: JobOpening): string {
  if (job.featured) return "Featured role";
  return job.workMode.toUpperCase();
}

type JobRoleCardProps = {
  job: JobOpening;
  index: number;
};

export default function JobRoleCard({ job, index }: JobRoleCardProps) {
  const reduceMotion = useReducedMotion();
  const applyHref = jobApplyHref(job);

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
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${topBadgeClass(job)}`}
        >
          {topBadgeLabel(job)}
        </span>
        <Link
          href={applyHref}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#9b59b6]/10 text-[#8e44ad] transition hover:bg-[#9b59b6]/20"
          aria-label={`Apply for ${job.title}`}
        >
          <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 8h8M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-4 pb-4 sm:flex-row sm:items-stretch">
        <JobRoleThumb department={job.department} />

        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="text-base font-bold text-[#2c3e50]">{job.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#7f8c8d]">{job.description}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-[#bdc3c7]/50 bg-[#ecf0f1]/80 px-2 py-0.5 text-[10px] font-medium text-[#7f8c8d]">
              {job.experience}
            </span>
            <span className="rounded-full border border-[#bdc3c7]/50 bg-[#ecf0f1]/80 px-2 py-0.5 text-[10px] font-medium text-[#7f8c8d]">
              {job.employmentType}
            </span>
            <span className="rounded-full border border-[#2c3e50]/20 bg-[#2c3e50] px-2 py-0.5 text-[10px] font-bold text-white">
              {job.salaryRange}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.skills.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${techStackBadgeClasses(tech)}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#ecf0f1] px-4 py-3">
        <span className="flex items-center gap-1 text-xs text-[#95a5a6]">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          Remote-first · India
        </span>
        <Link href={applyHref} className={PS_BTN_TEXT}>
          Apply now
          <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 8h8M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}
