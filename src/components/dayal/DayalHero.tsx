'use client';

import { motion, useReducedMotion } from 'framer-motion';
import DayalSectionLink from '@/components/dayal/DayalSectionLink';
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
} from 'lucide-react';
import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

import DayalHeroBackgroundVideo from '@/components/dayal/DayalHeroBackgroundVideo';
import DayalReveal from '@/components/dayal/DayalReveal';
import {
  DAYAL,
  HERO_DESCRIPTION,
  HERO_MEDIA_SLIDES,
  HERO_VIDEO,
  HERO_VIDEO_POSTER,
  TRUST_HIGHLIGHTS,
  type HeroMediaSlide,
} from '@/lib/dayal/data';

const TRUST_ICONS = [HardHat, Building2, Sparkles, Shield, HeartHandshake] as const;

type VideoWithWebkit = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
};

function subscribeToClientMount() {
  return () => undefined;
}

function isDocumentFullscreen() {
  const doc = document as Document & { webkitFullscreenElement?: Element | null };
  return Boolean(doc.fullscreenElement ?? doc.webkitFullscreenElement);
}

function SincePlaque({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`dayal-since-plaque__inner flex items-center gap-2.5 sm:gap-3 ${
        compact ? 'dayal-since-plaque--compact' : 'dayal-since-plaque--desktop'
      }`}
    >
      <span className="dayal-since-plaque__icon flex shrink-0 items-center justify-center rounded-full">
        <MapPin className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} strokeWidth={2} aria-hidden />
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
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
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
                  ? 'z-10 ring-2 ring-[#c8a46b] shadow-[0_4px_16px_rgba(200,164,107,0.45)]'
                  : 'ring-1 ring-white/25 opacity-80 hover:opacity-100'
              }`}
            >
              <Image src={slide.thumb} alt="" fill className="object-cover" sizes="84px" />
              {slide.type === 'video' ? (
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
  // Reduced-motion preference is client-only, so decorative motion waits for mount.
  const mounted = useSyncExternalStore(
    subscribeToClientMount,
    () => true,
    () => false,
  );
  const reduce = useReducedMotion();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const autoplayVideo = !reduce;
  const hasVideo = Boolean(HERO_VIDEO);

  const slides = useMemo(
    () => HERO_MEDIA_SLIDES.filter((s) => s.type !== 'video' || hasVideo),
    [hasVideo],
  );

  const firstSlideId = slides[0]?.id ?? 'char-video';
  const [activeId, setActiveId] = useState(firstSlideId);

  const activeSlide = useMemo(
    () => slides.find((s) => s.id === activeId) ?? slides[0],
    [slides, activeId],
  );

  const isVideoActive = activeSlide?.type === 'video' && hasVideo;

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
    if (autoplayVideo) void video.play().catch(() => {});
    else video.pause();
  }, [autoplayVideo]);

  useEffect(() => {
    if (!slides.some((s) => s.id === activeId)) {
      setActiveId(firstSlideId);
    }
  }, [slides, activeId, firstSlideId]);

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
    [resetHeroVideo],
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

    document.addEventListener('fullscreenchange', onFullscreenChange);
    video.addEventListener('webkitendfullscreen', onWebkitEnd);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      video.removeEventListener('webkitendfullscreen', onWebkitEnd);
    };
  }, [hasVideo, resetHeroVideo, syncFullscreenState]);

  return (
    <section
      id="home"
      className="dayal-hero relative overflow-hidden pt-20 pb-12 sm:pt-24 lg:pt-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#c8a46b]/10 blur-3xl" />
        <div className="absolute -right-16 bottom-8 h-80 w-80 rounded-full bg-[rgb(11_22_51_/_0.04)] blur-3xl" />
        {mounted && !reduce
          ? Array.from({ length: 8 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-[#c8a46b]/35"
                style={{ left: `${10 + i * 11}%`, top: `${18 + (i % 4) * 16}%` }}
                animate={{ y: [0, -14, 0], opacity: [0.15, 0.55, 0.15] }}
                transition={{ duration: 5 + i * 0.35, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))
          : null}
      </div>

      <div className="dayal-container relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <DayalReveal className="lg:col-span-5">
            <p className="dayal-eyebrow">{DAYAL.tagline}</p>

            <h1 className="mt-5">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0b1633]/55 sm:text-xs">
                {DAYAL.brand}
              </span>
              <span className="dayal-serif mt-2 block text-[2.35rem] font-bold leading-[1.05] tracking-tight text-[#0b1633] sm:text-5xl lg:text-[3.35rem] xl:text-6xl">
                {DAYAL.heroHighlight}
              </span>
            </h1>

            <div className="mt-4 flex items-center gap-3" aria-hidden>
              <span className="dayal-gold-line" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8a46b]" />
            </div>

            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#c8a46b]/30 bg-white/70 px-3 py-1.5 text-sm text-[#5c6478] shadow-sm backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-[#c8a46b]" aria-hidden />
              {DAYAL.location}
            </p>

            <p className="mt-5 max-w-md text-base leading-relaxed text-[#5c6478] sm:text-[1.05rem]">
              {HERO_DESCRIPTION}
            </p>

            <div className="dayal-btn-stack-mobile mt-7 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
              <DayalSectionLink href="#contact" className="dayal-btn-primary">
                <Calendar className="h-4 w-4" aria-hidden />
                Let&apos;s Connect
              </DayalSectionLink>
              <a
                href={DAYAL.website}
                target="_blank"
                rel="noopener noreferrer"
                className="dayal-btn-outline"
              >
                <Download className="h-4 w-4" aria-hidden />
                Visit Official Site
              </a>
            </div>
          </DayalReveal>

          <DayalReveal instant className="relative lg:col-span-7">
            <div className="dayal-hero-media relative">
              <div
                className="pointer-events-none absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-[#c8a46b]/55 via-[#c8a46b]/15 to-transparent p-px"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[1.25rem] bg-[#0b1633] shadow-[0_28px_64px_rgba(11,22,51,0.28)] ring-1 ring-[#0b1633]/10">
                <div
                  ref={shellRef}
                  className={`dayal-hero-video-shell group relative aspect-[5/4] overflow-hidden sm:aspect-[4/3] ${
                    isVideoActive ? 'cursor-pointer' : ''
                  }`}
                  role={isVideoActive ? 'button' : undefined}
                  tabIndex={isVideoActive ? 0 : undefined}
                  aria-label={
                    isVideoActive
                      ? isFullscreen
                        ? 'Char Sahebzade video fullscreen'
                        : 'Play Char Sahebzade video in fullscreen'
                      : activeSlide?.label
                  }
                  onClick={() => {
                    if (isVideoActive && !isFullscreen) void openFullscreen();
                  }}
                  onTouchStart={() => {
                    const video = videoRef.current;
                    if (isVideoActive && autoplayVideo && video?.paused) {
                      video.muted = true;
                      void video.play().catch(() => {});
                    }
                  }}
                  onKeyDown={(e) => {
                    if (!isVideoActive || isFullscreen) return;
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      void openFullscreen();
                    }
                  }}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={HERO_VIDEO_POSTER}
                      alt=""
                      fill
                      className="z-[1] object-cover"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      priority
                      aria-hidden
                    />

                    {hasVideo ? (
                      <DayalHeroBackgroundVideo
                        active={isVideoActive}
                        autoplay={autoplayVideo}
                        shellRef={shellRef}
                        onVideoRef={(el) => {
                          videoRef.current = el;
                        }}
                        className={`dayal-hero-video absolute inset-0 h-full w-full object-cover ${
                          isVideoActive ? 'z-[2]' : 'z-0 pointer-events-none invisible'
                        }`}
                      />
                    ) : null}

                    {activeSlide && !isVideoActive ? (
                      <Image
                        key={activeSlide.id}
                        src={activeSlide.src}
                        alt={activeSlide.label}
                        fill
                        className="z-[3] object-cover"
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        priority={activeSlide.id === firstSlideId}
                      />
                    ) : null}

                    {!hasVideo && !activeSlide ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={HERO_VIDEO_POSTER}
                        alt="Dayal Builders"
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0b1633]/50 via-transparent to-[#0b1633]/10"
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

                  {isVideoActive && !autoplayVideo && !isFullscreen ? (
                    <span
                      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
                      aria-hidden
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c8a46b] text-[#0b1633] shadow-lg">
                        <Play className="ml-0.5 h-6 w-6 fill-current" />
                      </span>
                    </span>
                  ) : null}

                  <SinceJamshedpurBadge />

                  {!isFullscreen ? (
                    <div className="pointer-events-none absolute bottom-[5.25rem] left-3 z-20 sm:bottom-[5.75rem] sm:left-4">
                      <div className="rounded-xl border border-white/15 bg-[#0b1633]/72 px-3.5 py-2.5 text-white shadow-lg backdrop-blur-md">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c8a46b]">
                          Featured project
                        </p>
                        <p className="dayal-serif mt-0.5 text-sm font-semibold sm:text-base">
                          {DAYAL.heroHighlight}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {slides.length > 1 ? (
                    <HeroMediaThumbnails
                      slides={slides}
                      activeId={activeId}
                      onSelect={setActiveId}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </DayalReveal>
        </div>

        <DayalReveal>
          <ul className="dayal-hero-trust mt-10 sm:mt-12" aria-label="Why Dayal Builders">
            {TRUST_HIGHLIGHTS.map((label, i) => {
              const Icon = TRUST_ICONS[i] ?? Shield;
              return (
                <DayalReveal
                  as="li"
                  key={label}
                  delay={0.08 + i * 0.07}
                  className="dayal-hero-trust__item"
                >
                  <span className="dayal-hero-trust__icon" aria-hidden>
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <span className="dayal-hero-trust__label">{label}</span>
                </DayalReveal>
              );
            })}
          </ul>
        </DayalReveal>
      </div>
    </section>
  );
}
