"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  Calendar,
  Download,
  HardHat,
  HeartHandshake,
  MapPin,
  Maximize2,
  Shield,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import DayalReveal from "@/components/dayal/DayalReveal";
import {
  DAYAL,
  HERO_DESCRIPTION,
  HERO_VIDEO,
  HERO_VIDEO_POSTER,
  TRUST_HIGHLIGHTS,
} from "@/lib/dayal/data";

const TRUST_ICONS = [HardHat, Building2, Sparkles, Shield, HeartHandshake] as const;

type VideoWithWebkit = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
};

function isDocumentFullscreen() {
  const doc = document as Document & { webkitFullscreenElement?: Element | null };
  return Boolean(doc.fullscreenElement ?? doc.webkitFullscreenElement);
}

export default function DayalHero() {
  const reduce = useReducedMotion();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasVideo = Boolean(HERO_VIDEO) && !reduce;

  const syncFullscreenState = useCallback(() => {
    const shell = shellRef.current;
    const video = videoRef.current;
    const doc = document as Document & { webkitFullscreenElement?: Element | null };
    const active = doc.fullscreenElement ?? doc.webkitFullscreenElement;
    const webkitFs = Boolean((video as VideoWithWebkit | null)?.webkitDisplayingFullscreen);
    setIsFullscreen(Boolean(active === shell || active === video || webkitFs));
  }, []);

  const resetHeroVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.controls = false;
    video.muted = true;
    void video.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (!hasVideo) return;
    resetHeroVideo();
  }, [hasVideo, resetHeroVideo]);

  const openFullscreen = useCallback(async () => {
    const video = videoRef.current;
    const shell = shellRef.current;
    if (!video) return;

    video.controls = true;
    video.muted = false;

    try {
      await video.play();

      if (shell?.requestFullscreen) {
        await shell.requestFullscreen();
        return;
      }

      if (video.requestFullscreen) {
        await video.requestFullscreen();
        return;
      }

      const webkitVideo = video as VideoWithWebkit;
      if (webkitVideo.webkitEnterFullscreen) {
        webkitVideo.webkitEnterFullscreen();
        setIsFullscreen(true);
        return;
      }
    } catch {
      resetHeroVideo();
    }
  }, [resetHeroVideo]);

  const closeFullscreen = useCallback(
    async (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      } catch {
        // ignore
      }
      resetHeroVideo();
    },
    [resetHeroVideo]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onFullscreenChange = () => {
      syncFullscreenState();
      if (!isDocumentFullscreen()) {
        const webkitVideo = video as VideoWithWebkit;
        if (!webkitVideo.webkitDisplayingFullscreen) {
          resetHeroVideo();
        }
      }
    };

    const onWebkitEnd = () => {
      syncFullscreenState();
      resetHeroVideo();
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    video.addEventListener("webkitendfullscreen", onWebkitEnd);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      video.removeEventListener("webkitendfullscreen", onWebkitEnd);
    };
  }, [hasVideo, resetHeroVideo, syncFullscreenState]);

  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {!reduce &&
          Array.from({ length: 12 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-[#c8a46b]/40"
              style={{ left: `${8 + i * 7}%`, top: `${12 + (i % 5) * 14}%` }}
              animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
      </div>

      <div className="dayal-container relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <DayalReveal>
          <span className="inline-flex rounded-full bg-[#0b1633] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            {DAYAL.tagline}
          </span>
          <h1 className="dayal-serif mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-[#0b1633] sm:text-5xl lg:text-6xl">
            {DAYAL.brand.toUpperCase()}
          </h1>
          <p className="dayal-serif mt-2 text-xl font-medium tracking-[0.12em] text-[#c8a46b] sm:text-2xl">
            {DAYAL.heroHighlight}
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-[#5c6478]">
            <MapPin className="h-4 w-4 text-[#c8a46b]" aria-hidden />
            {DAYAL.location}
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#5c6478]">
            {HERO_DESCRIPTION}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="dayal-btn-primary">
              <Calendar className="h-4 w-4" />
              Let&apos;s Connect
            </a>
            <a
              href={DAYAL.website}
              target="_blank"
              rel="noopener noreferrer"
              className="dayal-btn-outline"
            >
              <Download className="h-4 w-4" />
              Visit Official Site
            </a>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {TRUST_HIGHLIGHTS.map((label, i) => {
              const Icon = TRUST_ICONS[i] ?? Shield;
              return (
                <li key={label} className="flex flex-col items-center text-center">
                  <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#c8a46b]/40 text-[#c8a46b]">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <span className="dayal-caption font-medium leading-tight text-[#0b1633]/80">
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </DayalReveal>

        <DayalReveal delay={0.15} className="relative">
          {hasVideo ? (
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-[#0b1633]/20 ring-1 ring-[#0b1633]/10">
              <div
                ref={shellRef}
                className="dayal-hero-video-shell group relative aspect-[4/3] cursor-pointer overflow-hidden"
                role="button"
                tabIndex={0}
                aria-label={
                  isFullscreen
                    ? "Char Sahebzade video fullscreen"
                    : "Play Char Sahebzade video in fullscreen"
                }
                onClick={() => {
                  if (!isFullscreen) void openFullscreen();
                }}
                onKeyDown={(e) => {
                  if (isFullscreen) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    void openFullscreen();
                  }
                }}
              >
                <video
                  ref={videoRef}
                  className="dayal-hero-video h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={HERO_VIDEO_POSTER}
                  aria-label="Dayal Builders — Char Sahebzade"
                >
                  <source src={HERO_VIDEO} type="video/mp4" />
                </video>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0b1633]/50 via-transparent to-transparent"
                  aria-hidden
                />
                {isFullscreen ? (
                  <button
                    type="button"
                    onClick={(e) => void closeFullscreen(e)}
                    className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-lg bg-[#c8a46b] text-[#0b1633] shadow-lg transition hover:bg-[#d4b57d]"
                    aria-label="Close fullscreen video"
                  >
                    <X className="h-5 w-5" aria-hidden />
                  </button>
                ) : (
                  <span className="pointer-events-none absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-sm">
                    <Maximize2 className="h-4 w-4" aria-hidden />
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-[#0b1633]/20 ring-1 ring-[#0b1633]/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO_VIDEO_POSTER}
                alt="Dayal Builders — Char Sahebzade"
                className="h-full w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0b1633]/50 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          )}

          <div className="absolute -bottom-4 -left-4 z-10 hidden rounded-xl bg-white px-5 py-4 shadow-xl sm:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#c8a46b]">Since</p>
            <p className="dayal-serif text-lg font-semibold text-[#0b1633]">Jamshedpur</p>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
