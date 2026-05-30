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
  Play,
  Shield,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import DayalReveal from "@/components/dayal/DayalReveal";
import {
  DAYAL,
  HERO_DESCRIPTION,
  HERO_MEDIA_SLIDES,
  HERO_VIDEO,
  HERO_VIDEO_POSTER,
  TRUST_HIGHLIGHTS,
  type HeroMediaSlide,
} from "@/lib/dayal/data";

const TRUST_ICONS = [HardHat, Building2, Sparkles, Shield, HeartHandshake] as const;

type VideoWithWebkit = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
};

/** iOS / Android WebView — muted inline playback */
function configureMobileHeroVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");
  video.setAttribute("x5-playsinline", "true");
  video.setAttribute("x5-video-player-type", "h5");
}

function attemptHeroVideoPlay(video: HTMLVideoElement | null) {
  if (!video) return false;
  configureMobileHeroVideo(video);
  if (video.readyState < HTMLMediaElement.HAVE_METADATA) {
    video.load();
  }
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
  return !video.paused;
}

function isDocumentFullscreen() {
  const doc = document as Document & { webkitFullscreenElement?: Element | null };
  return Boolean(doc.fullscreenElement ?? doc.webkitFullscreenElement);
}

function SincePlaque({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`dayal-since-plaque__inner flex items-center gap-2.5 sm:gap-3 ${
        compact ? "dayal-since-plaque--compact" : "dayal-since-plaque--desktop"
      }`}
    >
      <span className="dayal-since-plaque__icon flex shrink-0 items-center justify-center rounded-full">
        <MapPin className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} strokeWidth={2} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="dayal-since-plaque__eyebrow">Since</p>
        <p className="dayal-since-plaque__city">Jamshedpur</p>
        {!compact ? <p className="dayal-since-plaque__sub">Jharkhand, India</p> : null}
      </div>
      {!compact ? (
        <span className="dayal-since-plaque__mark dayal-serif hidden md:block" aria-hidden>
          DB
        </span>
      ) : null}
    </div>
  );
}

/** Corner heritage plaque on hero media */
function SinceJamshedpurBadge() {
  return (
    <div className="dayal-since-plaque pointer-events-none absolute left-0 top-0 z-10" aria-hidden>
      <div className="sm:hidden">
        <SincePlaque compact />
      </div>
      <div className="hidden sm:block">
        <SincePlaque />
      </div>
    </div>
  );
}

function HeroMediaThumbnails({
  slides,
  activeId,
  onSelect,
}: {
  slides: readonly HeroMediaSlide[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const el = thumbRefs.current.get(activeId);
    if (!el || !stripRef.current) return;
    el.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId]);

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-20 pb-3 pt-8 sm:pb-3.5"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[5.5rem] bg-gradient-to-t from-[#0b1633]/95 via-[#0b1633]/75 to-transparent sm:h-24"
        aria-hidden
      />
      <div
        ref={stripRef}
        className="relative flex gap-2 overflow-x-auto overscroll-x-contain scroll-smooth scroll-px-4 px-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:scroll-px-5 sm:px-5"
        role="tablist"
        aria-label="Project gallery"
      >
        {slides.map((slide) => {
          const active = slide.id === activeId;
          return (
            <button
              key={slide.id}
              ref={(node) => {
                if (node) thumbRefs.current.set(slide.id, node);
                else thumbRefs.current.delete(slide.id);
              }}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={slide.label}
              title={slide.label}
              onClick={() => onSelect(slide.id)}
              className={`relative h-[3.25rem] w-[4.75rem] shrink-0 snap-center overflow-hidden rounded-lg transition duration-200 sm:h-[3.75rem] sm:w-[5.25rem] ${
                active
                  ? "z-10 ring-2 ring-[#c8a46b] shadow-[0_4px_16px_rgba(200,164,107,0.45)]"
                  : "ring-1 ring-white/25 opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={slide.thumb}
                alt=""
                fill
                className="object-cover"
                sizes="84px"
              />
              {slide.type === "video" ? (
                <span className="absolute inset-0 flex items-center justify-center bg-[#0b1633]/40">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c8a46b]/90 text-[#0b1633] shadow-md">
                    <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
                  </span>
                </span>
              ) : null}
              {active ? (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1633]/90 to-transparent px-1 pb-1 pt-4">
                  <span className="block truncate text-center text-[8px] font-semibold uppercase tracking-wide text-white/90 sm:text-[9px]">
                    {slide.label}
                  </span>
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function DayalHero() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasVideo = Boolean(HERO_VIDEO) && !reduce;

  const slides = useMemo(
    () => HERO_MEDIA_SLIDES.filter((s) => s.type !== "video" || hasVideo),
    [hasVideo]
  );

  const firstSlideId = slides[0]?.id ?? "char-video";
  const [activeId, setActiveId] = useState(firstSlideId);

  const activeSlide = useMemo(
    () => slides.find((s) => s.id === activeId) ?? slides[0],
    [slides, activeId]
  );

  const isVideoActive = activeSlide?.type === "video" && hasVideo;

  const setVideoNode = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node) {
      configureMobileHeroVideo(node);
      attemptHeroVideoPlay(node);
    }
  }, []);

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
    attemptHeroVideoPlay(video);
  }, []);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!slides.some((s) => s.id === activeId)) {
      setActiveId(firstSlideId);
    }
  }, [slides, activeId, firstSlideId]);

  useEffect(() => {
    if (!mounted || !hasVideo) return;
    const video = videoRef.current;
    if (!video) return;

    if (isVideoActive) {
      video.controls = false;
      attemptHeroVideoPlay(video);
    } else {
      video.pause();
    }
  }, [mounted, hasVideo, isVideoActive, activeId]);

  useEffect(() => {
    if (!mounted || !hasVideo || !isVideoActive) return;
    const video = videoRef.current;
    const shell = shellRef.current;
    if (!video || !shell) return;

    attemptHeroVideoPlay(video);

    const retry = () => {
      if (activeSlide?.type === "video") attemptHeroVideoPlay(video);
    };

    video.addEventListener("loadedmetadata", retry);
    video.addEventListener("loadeddata", retry);
    video.addEventListener("canplay", retry);
    video.addEventListener("canplaythrough", retry);
    video.addEventListener("playing", () => video.removeAttribute("poster"), { once: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) retry();
        }
      },
      { threshold: [0, 0.2, 0.5, 1] }
    );
    observer.observe(shell);

    let cancelled = false;
    let attempts = 0;
    const burstRetry = () => {
      if (cancelled || attempts >= 15) return;
      attempts += 1;
      if (video.paused) attemptHeroVideoPlay(video);
      if (!video.paused) return;
      window.setTimeout(burstRetry, attempts <= 5 ? 200 : 500);
    };
    burstRetry();

    return () => {
      cancelled = true;
      observer.disconnect();
      video.removeEventListener("loadedmetadata", retry);
      video.removeEventListener("loadeddata", retry);
      video.removeEventListener("canplay", retry);
      video.removeEventListener("canplaythrough", retry);
    };
  }, [mounted, hasVideo, isVideoActive, activeSlide?.type, activeId]);

  useEffect(() => {
    if (!mounted || !hasVideo) return;

    const resumeIfNeeded = () => {
      if (document.visibilityState === "visible" && isVideoActive) {
        attemptHeroVideoPlay(videoRef.current);
      }
    };

    document.addEventListener("visibilitychange", resumeIfNeeded);
    window.addEventListener("pageshow", resumeIfNeeded);

    return () => {
      document.removeEventListener("visibilitychange", resumeIfNeeded);
      window.removeEventListener("pageshow", resumeIfNeeded);
    };
  }, [mounted, hasVideo, isVideoActive]);

  useEffect(() => {
    if (!mounted || !hasVideo) return;

    const unlock = () => attemptHeroVideoPlay(videoRef.current);

    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("scroll", unlock, { passive: true });

    return () => {
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("scroll", unlock);
    };
  }, [mounted, hasVideo]);

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
    <section id="home" className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-24">
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
          <h1 className="dayal-serif mt-4 text-[1.75rem] font-bold leading-[1.08] tracking-tight text-[#0b1633] sm:mt-6 sm:text-5xl lg:text-6xl">
            {DAYAL.brand.toUpperCase()}
          </h1>
          <p className="dayal-serif mt-2 text-base font-medium tracking-[0.08em] text-[#c8a46b] sm:text-2xl sm:tracking-[0.12em]">
            {DAYAL.heroHighlight}
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-[#5c6478]">
            <MapPin className="h-4 w-4 text-[#c8a46b]" aria-hidden />
            {DAYAL.location}
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#5c6478]">
            {HERO_DESCRIPTION}
          </p>
          <div className="dayal-btn-stack-mobile mt-6 sm:mt-8 sm:flex sm:flex-wrap sm:gap-4">
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
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {TRUST_HIGHLIGHTS.map((label, i) => {
              const Icon = TRUST_ICONS[i] ?? Shield;
              const isLastOdd = TRUST_HIGHLIGHTS.length % 2 === 1 && i === TRUST_HIGHLIGHTS.length - 1;
              return (
                <li
                  key={label}
                  className={`flex flex-col items-center text-center ${isLastOdd ? "col-span-2 justify-self-center sm:col-span-1" : ""}`}
                >
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

        <DayalReveal instant className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl shadow-[#0b1633]/20 ring-1 ring-[#0b1633]/10">
            <div
              ref={shellRef}
              className={`dayal-hero-video-shell group relative aspect-[4/3] overflow-hidden ${
                isVideoActive ? "cursor-pointer" : ""
              }`}
              role={isVideoActive ? "button" : undefined}
              tabIndex={isVideoActive ? 0 : undefined}
              aria-label={
                isVideoActive
                  ? isFullscreen
                    ? "Char Sahebzade video fullscreen"
                    : "Play Char Sahebzade video in fullscreen"
                  : activeSlide?.label
              }
              onClick={() => {
                if (isVideoActive && !isFullscreen) void openFullscreen();
              }}
              onTouchStart={() => {
                if (isVideoActive && videoRef.current?.paused) {
                  attemptHeroVideoPlay(videoRef.current);
                }
              }}
              onKeyDown={(e) => {
                if (!isVideoActive || isFullscreen) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  void openFullscreen();
                }
              }}
            >
              <div className="absolute inset-0">
                {!mounted ? (
                  <Image
                    src={HERO_VIDEO_POSTER}
                    alt="Dayal Builders — Char Sahebzade"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : null}

                {mounted && hasVideo ? (
                  <video
                    ref={setVideoNode}
                    src={HERO_VIDEO}
                    className={`dayal-hero-video absolute inset-0 h-full w-full object-cover ${
                      isVideoActive ? "z-[2]" : "z-0 pointer-events-none"
                    }`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={HERO_VIDEO_POSTER}
                    aria-label="Dayal Builders — Char Sahebzade"
                    aria-hidden={!isVideoActive}
                  />
                ) : null}

                {mounted && activeSlide && !isVideoActive ? (
                  <Image
                    key={activeSlide.id}
                    src={activeSlide.src}
                    alt={activeSlide.label}
                    fill
                    className="z-[3] object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={activeSlide.id === firstSlideId}
                  />
                ) : null}

                {mounted && !hasVideo && !activeSlide ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={HERO_VIDEO_POSTER}
                    alt="Dayal Builders"
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>

              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0b1633]/45 via-transparent to-transparent"
                aria-hidden
              />

              {isVideoActive ? (
                isFullscreen ? (
                  <button
                    type="button"
                    onClick={(e) => void closeFullscreen(e)}
                    className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-lg bg-[#c8a46b] text-[#0b1633] shadow-lg transition hover:bg-[#d4b57d]"
                    aria-label="Close fullscreen video"
                  >
                    <X className="h-5 w-5" aria-hidden />
                  </button>
                ) : (
                  <span className="pointer-events-none absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-sm">
                    <Maximize2 className="h-4 w-4" aria-hidden />
                  </span>
                )
              ) : null}

              <SinceJamshedpurBadge />

              {slides.length > 1 ? (
                <HeroMediaThumbnails
                  slides={slides}
                  activeId={activeId}
                  onSelect={setActiveId}
                />
              ) : null}
            </div>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
