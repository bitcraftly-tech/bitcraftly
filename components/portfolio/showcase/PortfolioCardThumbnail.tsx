"use client";

import { useEffect, useRef, useState } from "react";

import type { PortfolioProject } from "@/lib/portfolio/projectUtils";
import { cardPreviewAccent } from "@/lib/portfolioVisualUtils";

type PortfolioCardThumbnailProps = {
  project: PortfolioProject;
  variant?: "card" | "compact";
};

/** Lazy-rendered preview — mesh gradient hero with glass emoji tile */
export default function PortfolioCardThumbnail({ project, variant = "card" }: PortfolioCardThumbnailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const compact = variant === "compact";

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

  if (compact) {
    return (
      <div
        ref={ref}
        className={`relative size-[88px] shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br shadow-inner sm:size-[100px] ${project.gradient}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${cardPreviewAccent(project)}`} aria-hidden />
        {visible ? (
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
            <span className="text-3xl drop-shadow-sm sm:text-4xl" aria-hidden>
              {project.emoji}
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 animate-pulse bg-[#ecf0f1]/40" aria-hidden />
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`ps-card-thumb relative aspect-[5/3] w-full overflow-hidden bg-gradient-to-br sm:aspect-[16/10] ${project.gradient}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${cardPreviewAccent(project)}`} aria-hidden />
      <div
        className="pointer-events-none absolute -left-1/4 top-0 size-[130%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.24)_0%,transparent_62%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-1/4 -right-1/5 size-[70%] rounded-full bg-[radial-gradient(circle,rgba(142,68,173,0.12)_0%,transparent_68%)]"
        aria-hidden
      />
      <div className="ps-thumb-shine" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[#2c3e50]/0 transition-colors duration-500 group-hover:bg-[#2c3e50]/[0.03]"
        aria-hidden
      />
      {visible ? (
        <div className="absolute inset-0 z-[3] flex items-center justify-center pb-2">
          <div className="ps-thumb-orb size-[4.75rem] sm:size-[5.5rem]">
            <span className="text-[2.35rem] drop-shadow-[0_6px_14px_rgba(44,62,80,0.1)] sm:text-[2.75rem]" aria-hidden>
              {project.emoji}
            </span>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-[3] flex items-center justify-center pb-2" aria-hidden>
          <div className="size-[4.75rem] animate-pulse rounded-[1.35rem] bg-white/30 sm:size-[5.5rem]" />
        </div>
      )}
    </div>
  );
}
