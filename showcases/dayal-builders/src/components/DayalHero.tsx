'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Maximize2, Play, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';

import DayalHeroBackgroundVideo from '@bitcraftly/showcase-dayal-builders/components/DayalHeroBackgroundVideo';
import DayalSectionLink from '@bitcraftly/showcase-dayal-builders/components/DayalSectionLink';
import {
  DAYAL,
  HERO_DESCRIPTION,
  HERO_MEDIA_SLIDES,
  HERO_VIDEO,
  HERO_VIDEO_POSTER,
  type HeroMediaSlide,
} from '@bitcraftly/showcase-dayal-builders/lib/data';

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

function HeroFilmstrip({
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
    el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeId]);

  return (
    <div
      ref={stripRef}
      className="dayal-hero-filmstrip"
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
            className={`dayal-hero-filmstrip__thumb${active ? ' is-active' : ''}`}
          >
            <Image src={slide.thumb} alt="" fill className="object-cover" sizes="96px" />
            {slide.type === 'video' ? (
              <span className="dayal-hero-filmstrip__play" aria-hidden>
                <Play className="h-3 w-3 fill-current" />
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export default function DayalHero() {
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

  const motionSafe = mounted && !reduce;

  return (
    <section id="home" className="dayal-hero" aria-label={`${DAYAL.brand} showcase`}>
      <div
        ref={shellRef}
        className={`dayal-hero__stage${isVideoActive ? ' is-video' : ''}${isFullscreen ? ' is-fullscreen' : ''}`}
        role={isVideoActive && !isFullscreen ? 'button' : undefined}
        tabIndex={isVideoActive && !isFullscreen ? 0 : undefined}
        aria-label={
          isVideoActive
            ? isFullscreen
              ? `${DAYAL.heroHighlight} video fullscreen`
              : `Play ${DAYAL.heroHighlight} video in fullscreen`
            : undefined
        }
        onClick={() => {
          if (isVideoActive && !isFullscreen) void openFullscreen();
        }}
        onKeyDown={(e) => {
          if (!isVideoActive || isFullscreen) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            void openFullscreen();
          }
        }}
      >
        <div className="dayal-hero__media" aria-hidden={!isVideoActive}>
          <Image
            src={HERO_VIDEO_POSTER}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
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
                isVideoActive ? 'z-[2] opacity-100' : 'z-0 pointer-events-none opacity-0'
              }`}
            />
          ) : null}

          <AnimatePresence mode="wait">
            {activeSlide && !isVideoActive ? (
              <motion.div
                key={activeSlide.id}
                className="absolute inset-0 z-[3]"
                initial={motionSafe ? { opacity: 0, scale: 1.04 } : false}
                animate={{ opacity: 1, scale: 1 }}
                exit={motionSafe ? { opacity: 0 } : undefined}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={activeSlide.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={activeSlide.id === firstSlideId}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="dayal-hero__veil" aria-hidden />

        {isVideoActive ? (
          isFullscreen ? (
            <button
              type="button"
              onClick={(e) => void closeFullscreen(e)}
              className="dayal-hero__fs-btn"
              aria-label="Close fullscreen video"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          ) : (
            <span className="dayal-hero__fs-hint" aria-hidden>
              <Maximize2 className="h-4 w-4" />
            </span>
          )
        ) : null}

        {!isFullscreen ? (
          <div className="dayal-hero__content">
            <motion.div
              className="dayal-hero__copy"
              initial={motionSafe ? { opacity: 0, y: 28 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            >
              <p className="dayal-hero__brand">{DAYAL.brand}</p>
              <h1 className="dayal-hero__headline">{DAYAL.heroHeadline}</h1>
              <p className="dayal-hero__lead">{HERO_DESCRIPTION}</p>
              <div className="dayal-hero__actions">
                <DayalSectionLink href="#future-projects" className="dayal-btn-gold">
                  View projects
                </DayalSectionLink>
                <DayalSectionLink href="#contact" className="dayal-btn-ghost-light">
                  Book a visit
                </DayalSectionLink>
              </div>
            </motion.div>

            {slides.length > 1 ? (
              <motion.div
                className="dayal-hero__strip-wrap"
                initial={motionSafe ? { opacity: 0, y: 16 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <p className="dayal-hero__strip-label">{activeSlide?.label ?? 'Gallery'}</p>
                <HeroFilmstrip slides={slides} activeId={activeId} onSelect={setActiveId} />
              </motion.div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
