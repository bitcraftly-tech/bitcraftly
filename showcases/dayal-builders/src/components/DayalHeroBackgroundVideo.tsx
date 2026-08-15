'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

import {
  HERO_VIDEO,
  HERO_VIDEO_MOBILE,
  HERO_VIDEO_POSTER,
} from '@bitcraftly/showcase-dayal-builders/lib/data';

type Props = {
  /** When false, video stays mounted but paused (no display:none) */
  active: boolean;
  /** When false (reduced motion), the poster frame stays until the visitor plays it */
  autoplay?: boolean;
  className?: string;
  shellRef?: RefObject<HTMLDivElement | null>;
  onVideoRef?: (el: HTMLVideoElement | null) => void;
};

function pickVideoSrc(): string {
  if (typeof window === 'undefined') return HERO_VIDEO;
  const mobile =
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(pointer: coarse)').matches;
  return mobile && HERO_VIDEO_MOBILE ? HERO_VIDEO_MOBILE : HERO_VIDEO;
}

function configureMobileHeroVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute('muted', '');
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', 'true');
  video.setAttribute('x5-playsinline', 'true');
  video.setAttribute('x5-video-player-type', 'h5');
}

function forcePlay(video: HTMLVideoElement | null) {
  if (!video) return;
  configureMobileHeroVideo(video);
  if (video.readyState < HTMLMediaElement.HAVE_METADATA) {
    video.load();
  }
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
}

/**
 * Hydration-safe hero background video — iOS Safari / Chrome mobile autoplay.
 * Renders only after mount; never uses opacity:0 or display:none when active.
 */
export default function DayalHeroBackgroundVideo({
  active,
  autoplay = true,
  className = 'absolute inset-0 h-full w-full object-cover',
  shellRef,
  onVideoRef,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const srcRef = useRef(HERO_VIDEO);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const bindVideo = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      onVideoRef?.(node);
      if (node) {
        configureMobileHeroVideo(node);
        srcRef.current = pickVideoSrc();
        if (node.getAttribute('src') !== srcRef.current) {
          node.src = srcRef.current;
        }
        if (autoplay) forcePlay(node);
      }
    },
    [autoplay, onVideoRef],
  );

  useEffect(() => {
    if (!mounted || !autoplay) return;
    forcePlay(videoRef.current);
  }, [mounted, autoplay]);

  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      const nextSrc = pickVideoSrc();
      if (video.getAttribute('src') !== nextSrc) {
        video.src = nextSrc;
        video.load();
      }
      if (autoplay) forcePlay(video);
    } else {
      video.pause();
    }
  }, [mounted, active, autoplay]);

  useEffect(() => {
    if (!mounted || !active || !autoplay) return;
    const video = videoRef.current;
    const shell = shellRef?.current ?? null;
    if (!video) return;

    const retry = () => forcePlay(video);

    video.addEventListener('loadedmetadata', retry);
    video.addEventListener('loadeddata', retry);
    video.addEventListener('canplay', retry);
    video.addEventListener('canplaythrough', retry);
    video.addEventListener('playing', () => video.removeAttribute('poster'), { once: true });

    const observer = shell
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.15) retry();
            }
          },
          { threshold: [0, 0.15, 0.5, 1] },
        )
      : null;
    if (shell) observer?.observe(shell);

    let cancelled = false;
    let attempts = 0;
    const burst = () => {
      if (cancelled || attempts >= 20) return;
      attempts += 1;
      if (video.paused) forcePlay(video);
      if (!video.paused) return;
      window.setTimeout(burst, attempts <= 6 ? 180 : 450);
    };
    burst();

    const onUnlock = () => forcePlay(video);
    window.addEventListener('touchstart', onUnlock, { passive: true });
    window.addEventListener('pointerdown', onUnlock, { passive: true });

    const resume = () => {
      if (document.visibilityState === 'visible' && active) forcePlay(video);
    };
    document.addEventListener('visibilitychange', resume);
    window.addEventListener('pageshow', resume);

    return () => {
      cancelled = true;
      observer?.disconnect();
      video.removeEventListener('loadedmetadata', retry);
      video.removeEventListener('loadeddata', retry);
      video.removeEventListener('canplay', retry);
      video.removeEventListener('canplaythrough', retry);
      window.removeEventListener('touchstart', onUnlock);
      window.removeEventListener('pointerdown', onUnlock);
      document.removeEventListener('visibilitychange', resume);
      window.removeEventListener('pageshow', resume);
    };
  }, [mounted, active, autoplay, shellRef]);

  if (!mounted) return null;

  return (
    <video
      ref={bindVideo}
      className={className}
      autoPlay={autoplay}
      muted
      loop
      playsInline
      preload={autoplay ? 'auto' : 'metadata'}
      poster={HERO_VIDEO_POSTER}
      src={HERO_VIDEO}
      aria-label="Dayal Builders — Char Sahebzade"
      aria-hidden={!active}
    >
      <source src={HERO_VIDEO} type="video/mp4" />
    </video>
  );
}
