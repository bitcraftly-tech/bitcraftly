"use client";

import Image from "next/image";
import Link from "next/link";
import { Headphones, Pause, Play } from "lucide-react";

import MarketingSectionLink from "@/components/landing/MarketingSectionLink";
import { useCallback, useEffect, useRef, useState } from "react";

import { CONTAINER } from "@/lib/constants";
import {
  FOUNDER_AUDIO_DEFAULT_LOCALE,
  FOUNDER_AUDIO_VISIBLE_LOCALES,
  FOUNDER_MESSAGE,
  type FounderAudioLocale,
} from "@/lib/founderMessage";
import { FOUNDER } from "@/lib/siteContent";

const WAVE_BARS = [40, 56, 44, 52, 48] as const;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export default function FounderAudioMessage({ embedded = false }: { embedded?: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const durationCache = useRef<Partial<Record<FounderAudioLocale, number>>>({});
  const shouldAutoplay = useRef(false);
  const [locale, setLocale] = useState<FounderAudioLocale>(FOUNDER_AUDIO_DEFAULT_LOCALE);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const track = FOUNDER_MESSAGE.audioTracks[locale];

  const tryPlay = useCallback(async (audio: HTMLAudioElement) => {
    try {
      await audio.play();
      setPlaybackError(null);
      setHasStarted(true);
    } catch {
      setPlaybackError(FOUNDER_MESSAGE.playBlockedError);
      setPlaying(false);
    }
  }, []);

  const handleSeek = useCallback(
    (value: number) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      const nextTime = (value / 100) * duration;
      audio.currentTime = nextTime;
      setCurrentTime(nextTime);
    },
    [duration],
  );

  const handleLanguageSelect = useCallback(
    (nextLocale: FounderAudioLocale) => {
      if (playbackError && nextLocale === locale) return;

      const audio = audioRef.current;

      if (nextLocale === locale) {
        if (!audio) return;
        if (playing) {
          audio.pause();
        } else {
          shouldAutoplay.current = false;
          void tryPlay(audio);
        }
        return;
      }

      if (audio) {
        audio.pause();
      }

      shouldAutoplay.current = true;
      setPlaybackError(null);

      const cachedDuration = durationCache.current[nextLocale];
      setLocale(nextLocale);
      setPlaying(false);
      setCurrentTime(0);
      setDuration(cachedDuration ?? 0);
      setReady(Boolean(cachedDuration));
    },
    [locale, playbackError, playing, tryPlay],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const maybeAutoplay = () => {
      if (cancelled || !shouldAutoplay.current) return;
      shouldAutoplay.current = false;
      void tryPlay(audio);
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      if (cancelled) return;
      durationCache.current[locale] = audio.duration;
      setDuration(audio.duration);
      setReady(true);
      setPlaybackError(null);
      maybeAutoplay();
    };
    const onCanPlay = () => {
      if (cancelled) return;
      setReady(true);
      setPlaybackError(null);
      maybeAutoplay();
    };
    const onEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
    };
    const onError = () => {
      if (cancelled) return;
      shouldAutoplay.current = false;
      setPlaying(false);
      if (audio.error?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
        setPlaybackError(FOUNDER_MESSAGE.unsupportedError);
      } else {
        setPlaybackError(FOUNDER_MESSAGE.loadError);
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    audio.pause();
    audio.currentTime = 0;

    while (audio.firstChild) {
      audio.removeChild(audio.firstChild);
    }
    track.sources.forEach((source) => {
      const el = document.createElement("source");
      el.src = source.src;
      el.type = source.type;
      audio.appendChild(el);
    });

    audio.load();

    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
      durationCache.current[locale] = audio.duration;
      setDuration(audio.duration);
      setReady(true);
      maybeAutoplay();
    }

    return () => {
      cancelled = true;
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [locale, track.sources, tryPlay]);

  useEffect(() => {
    const links: HTMLLinkElement[] = [];

    FOUNDER_AUDIO_VISIBLE_LOCALES.forEach((key) => {
      const href = FOUNDER_MESSAGE.audioTracks[key].sources[0]?.src;
      if (!href) return;

      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "audio";
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach((link) => link.remove());
    };
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const playerBody = (
    <div className={embedded ? "flex h-full flex-col justify-center p-3.5 sm:p-4 lg:p-4 xl:p-5" : "relative p-3 sm:p-3.5"}>
      {embedded ? (
        <div className="mb-2.5 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/80 sm:text-xs">
            {FOUNDER_MESSAGE.eyebrow}
          </p>
          <p className="text-sm font-semibold text-white sm:text-base">{FOUNDER_MESSAGE.title}</p>
        </div>
      ) : null}

      <div className={`flex flex-col gap-2 ${embedded ? "sm:gap-2" : "gap-2.5 sm:flex-row sm:items-center sm:gap-3"}`}>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className={`relative shrink-0 overflow-hidden rounded-full ring-2 ring-white/20 ${embedded ? "size-9" : "size-10"}`}>
            <Image
              src={FOUNDER.photoSrc}
              alt={FOUNDER.photoAlt}
              fill
              quality={92}
              className="object-cover object-[46%_14%] scale-[1.14]"
              sizes={embedded ? "36px" : "40px"}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className={`truncate font-bold leading-tight text-white ${embedded ? "text-sm" : "text-sm"}`}>
              {FOUNDER.name}
            </p>
            <p className={`truncate font-medium text-white/80 ${embedded ? "text-xs" : "text-xs sm:text-sm"}`}>{track.title}</p>
          </div>
        </div>

        <div className="flex w-full items-center gap-1.5 sm:w-auto sm:shrink-0">
          <Headphones className="hidden size-3.5 shrink-0 text-white/70 sm:block" aria-hidden />
          {FOUNDER_AUDIO_VISIBLE_LOCALES.length === 1 ? (
            <button
              type="button"
              aria-pressed={playing}
              onClick={() => handleLanguageSelect(FOUNDER_AUDIO_VISIBLE_LOCALES[0])}
              className={`inline-flex items-center justify-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-bold transition-colors duration-200 ${
                playing
                  ? "border-white bg-white text-indigo-800 shadow-sm"
                  : "border-white/35 bg-white/12 text-white hover:border-white/50 hover:bg-white/18"
              }`}
              aria-label={playing ? track.pauseAriaLabel : track.selectAriaLabel}
            >
              {playing ? (
                <Pause className="size-3 shrink-0" aria-hidden />
              ) : (
                <Play className="size-3 shrink-0" aria-hidden />
              )}
              {track.label}
            </button>
          ) : (
            <div
              className={`flex flex-1 rounded-full border border-white/15 bg-white/10 p-0.5 sm:flex-none ${embedded ? "sm:min-w-[10.5rem]" : "sm:min-w-[11.5rem]"}`}
              role="tablist"
              aria-label={FOUNDER_MESSAGE.languageLabel}
            >
              {FOUNDER_AUDIO_VISIBLE_LOCALES.map((key) => {
                const option = FOUNDER_MESSAGE.audioTracks[key];
                const active = locale === key;
                const isPlaying = active && playing;

                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-pressed={isPlaying}
                    onClick={() => handleLanguageSelect(key)}
                    className={`flex flex-1 items-center justify-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                      isPlaying
                        ? "bg-white text-indigo-700 shadow-sm"
                        : active
                          ? "bg-white/90 text-indigo-700"
                          : "text-indigo-100/90 hover:bg-white/10 hover:text-white"
                    }`}
                    aria-label={isPlaying ? option.pauseAriaLabel : option.selectAriaLabel}
                  >
                    {isPlaying ? (
                      <Pause className="size-2.5 shrink-0" aria-hidden />
                    ) : (
                      <Play className="size-2.5 shrink-0" aria-hidden />
                    )}
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-2" role="group" aria-label="Founder audio message player">
            <audio ref={audioRef} preload="metadata" playsInline aria-describedby={playbackError ? "founder-audio-error" : undefined} />

            {playbackError ? (
              <p id="founder-audio-error" role="alert" className="mb-1.5 text-[11px] text-amber-200/95">
                {playbackError}
              </p>
            ) : null}

            <div className="flex items-center gap-2">
              <div className="flex h-4 w-10 shrink-0 items-end gap-px" aria-hidden>
                {WAVE_BARS.map((height, index) => (
                  <span
                    key={index}
                    className={`w-1 rounded-full bg-white/75 ${playing ? "founder-wave-active" : "opacity-50"}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="relative min-w-0 flex-1 py-1">
                <div className="pointer-events-none h-1 overflow-hidden rounded-full bg-white/15" aria-hidden>
                  <div className="h-full rounded-full bg-white/85" style={{ width: `${progress}%` }} />
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.1}
                  value={progress}
                  disabled={!ready || Boolean(playbackError) || !hasStarted}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                  aria-label="Audio progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                />
              </div>
              <span className="shrink-0 tabular-nums text-xs font-semibold text-white/90">
                {formatTime(currentTime)}/{formatTime(duration)}
              </span>
            </div>
          </div>

      {!embedded ? (
        <p className="mt-2 text-[10px] text-indigo-100/60">
          <MarketingSectionLink path="/about" sectionId="founder" className="font-medium text-white/90 hover:underline">
            About founder
          </MarketingSectionLink>
          <span aria-hidden> · </span>
          <Link href="/pricing" className="font-medium text-white/90 hover:underline">
            Pricing
          </Link>
        </p>
      ) : null}
    </div>
  );

  if (embedded) {
    return (
      <div id="founder-message" className="scroll-mt-24">
        {playerBody}
      </div>
    );
  }

  return (
    <section id="founder-message" className={`${CONTAINER} scroll-mt-24 py-3 md:py-4`}>
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
          {FOUNDER_MESSAGE.eyebrow}
        </p>
        <h2 className="font-[var(--font-playfair)] text-xl text-text-primary dark:text-dark-text-primary sm:text-2xl">
          {FOUNDER_MESSAGE.title}
        </h2>
      </div>

      <div className="relative mt-3 overflow-hidden rounded-xl border border-indigo-500/20 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] shadow-[0_12px_32px_-16px_rgba(79,70,229,0.45)] dark:border-indigo-400/25">
        {playerBody}
      </div>
    </section>
  );
}
