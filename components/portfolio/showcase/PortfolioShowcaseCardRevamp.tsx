"use client";

import { motion, useReducedMotion } from "framer-motion";

import PortfolioCardThumbnail from "@/components/portfolio/showcase/PortfolioCardThumbnail";
import { newTabProps } from "@/lib/newTabLink";
import type { PortfolioProject } from "@/lib/portfolio/projectUtils";
import { techStackBadgeClasses } from "@/lib/portfolioVisualUtils";

type PortfolioShowcaseCardRevampProps = {
  project: PortfolioProject;
  index: number;
};

export default function PortfolioShowcaseCardRevamp({ project, index }: PortfolioShowcaseCardRevampProps) {
  const reduceMotion = useReducedMotion();
  const demoUrl = project.externalUrl;

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.32, delay: Math.min(index * 0.035, 0.2) }}
      className="group overflow-hidden rounded-[18px] border border-[#e8ecef] bg-white shadow-[0_4px_24px_rgba(44,62,80,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(79,70,229,0.1)]"
    >
      <PortfolioCardThumbnail project={project} variant="card" />

      <div className="p-4">
        <h3 className="text-base font-bold text-[#2c3e50]">{project.title}</h3>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${techStackBadgeClasses(tech)}`}>
              {tech}
            </span>
          ))}
        </div>

        {demoUrl ? (
          <a
            href={demoUrl}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#3498db] transition hover:text-[#2980b9]"
            {...newTabProps(demoUrl)}
          >
            <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 3H3v10h10v-3M9 2h5v5M7 9l7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Live Demo
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}
