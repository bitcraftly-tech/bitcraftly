"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Play, X } from "lucide-react";

import { CONTAINER } from "@/lib/constants";
import {
  FOUNDER_INTRO_VIDEO,
  FOUNDER_INTRO_YOUTUBE_ID,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
} from "@/lib/founderIntroVideo";
import { FOUNDER } from "@/lib/siteContent";

export default function FounderIntroVideo() {
  const videoId = FOUNDER_INTRO_YOUTUBE_ID;
  const isLive = Boolean(videoId);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <section id="founder-intro-video" className={`${CONTAINER} scroll-mt-24 py-4 md:py-6`}>
      <div className="grid items-center gap-6 rounded-2xl border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
            {FOUNDER_INTRO_VIDEO.eyebrow}
          </p>
          <h2 className="mt-3 font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary sm:text-3xl">
            {isLive ? FOUNDER_INTRO_VIDEO.title : FOUNDER_INTRO_VIDEO.comingSoonTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
            {isLive ? FOUNDER_INTRO_VIDEO.description : FOUNDER_INTRO_VIDEO.comingSoonBody}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              View pricing →
            </Link>
            <Link
              href="/about#founder"
              className="inline-flex items-center justify-center rounded-full border border-border-secondary px-4 py-2 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
            >
              About founder
            </Link>
          </div>
        </div>

        <div className="relative">
          {isLive && videoId ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group relative block w-full overflow-hidden rounded-xl border border-border-primary text-left dark:border-dark-border-primary"
              aria-label={FOUNDER_INTRO_VIDEO.playAriaLabel}
            >
              <div className="relative aspect-video w-full bg-bg-secondary dark:bg-dark-bg-secondary">
                <Image
                  src={youtubeThumbnailUrl(videoId)}
                  alt=""
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/50 via-[#111827]/10 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  {FOUNDER_INTRO_VIDEO.durationLabel}
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-white/95 text-indigo-600 shadow-lg transition group-hover:scale-105">
                    <Play className="ml-0.5 size-7 fill-current" aria-hidden />
                  </span>
                </span>
              </div>
              <p className="border-t border-border-primary bg-bg-primary px-4 py-3 text-sm font-semibold text-text-primary dark:border-dark-border-primary dark:bg-dark-bg-primary dark:text-dark-text-primary">
                {FOUNDER_INTRO_VIDEO.playLabel}
              </p>
            </button>
          ) : (
            <div className="relative overflow-hidden rounded-xl border border-dashed border-border-primary dark:border-dark-border-primary">
              <div className="relative aspect-video w-full bg-gradient-to-br from-indigo-50/80 via-bg-secondary to-violet-50/60 dark:from-indigo-950/40 dark:via-dark-bg-secondary dark:to-violet-950/30">
                <Image
                  src={FOUNDER.photoSrc}
                  alt={FOUNDER.photoAlt}
                  fill
                  className="object-cover object-top opacity-90"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/75 via-[#111827]/25 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  Coming soon
                </span>
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                  <span className="flex size-14 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-sm">
                    <Play className="ml-0.5 size-7 fill-current opacity-80" aria-hidden />
                  </span>
                  <p className="text-sm font-semibold text-white">{FOUNDER_INTRO_VIDEO.durationLabel} founder intro</p>
                  <p className="text-xs text-white/85">Recording in progress — pricing &amp; About available now</p>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {open && videoId ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111827]/70 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="Founder introduction video"
          onClick={close}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-border-primary bg-black shadow-2xl dark:border-dark-border-primary"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
              aria-label="Close video"
            >
              <X className="size-5" aria-hidden />
            </button>
            <div className="relative aspect-video w-full">
              <iframe
                title={`${FOUNDER.name} — Bitcraftly intro`}
                src={youtubeEmbedUrl(videoId)}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
