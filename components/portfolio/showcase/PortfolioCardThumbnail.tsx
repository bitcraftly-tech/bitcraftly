"use client";

import { useEffect, useRef, useState } from "react";

import type { PortfolioProject } from "@/lib/portfolio/projectUtils";
import { cardPreviewAccent } from "@/lib/portfolioVisualUtils";

type PortfolioCardThumbnailProps = {
  project: PortfolioProject;
};

/** Lazy-rendered preview — gradient + device chrome (no heavy mockup DOM until visible) */
export default function PortfolioCardThumbnail({ project }: PortfolioCardThumbnailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${project.gradient}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${cardPreviewAccent(project)}`} aria-hidden />
      <div className="absolute inset-x-0 top-0 flex items-center gap-1 border-b border-white/10 bg-black/20 px-2.5 py-2 backdrop-blur-sm dark:bg-black/35">
        <span className="size-2 rounded-full bg-[#e74c3c]/80" aria-hidden />
        <span className="size-2 rounded-full bg-[#f1c40f]/80" aria-hidden />
        <span className="size-2 rounded-full bg-[#2ecc71]/80" aria-hidden />
        <span className="ml-2 truncate text-[10px] font-medium text-white/90">{project.title}</span>
      </div>
      {visible ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <span className="text-4xl drop-shadow-sm sm:text-5xl" aria-hidden>
            {project.emoji}
          </span>
          <p className="mt-2 max-w-[85%] text-center text-[10px] font-semibold uppercase tracking-wide text-white/90">
            {project.projectFocus}
          </p>
        </div>
      ) : (
        <div className="absolute inset-0 animate-pulse bg-[#ecf0f1]/20 dark:bg-[#34495e]/25" aria-hidden />
      )}
      {project.badge === "Live client" ? (
        <span className="absolute bottom-2 right-2 rounded-full border border-[#2ecc71]/50 bg-[#27ae60]/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
          Live
        </span>
      ) : null}
    </div>
  );
}
