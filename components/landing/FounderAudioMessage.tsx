"use client";

import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { CONTAINER } from "@/lib/constants";
import { FOUNDER_MESSAGE } from "@/lib/founderMessage";
import { FOUNDER } from "@/lib/siteContent";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export default function FounderAudioMessage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        /* autoplay policies or missing file */
      }
    } else {
      audio.pause();
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    if (audio.readyState >= 1) {
      setDuration(audio.duration);
    }

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="founder-message" className={`${CONTAINER} scroll-mt-24 py-4 md:py-6`}>
      <div className="grid items-center gap-6 rounded-2xl border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
            {FOUNDER_MESSAGE.eyebrow}
          </p>
          <h2 className="mt-3 font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary sm:text-3xl">
            {FOUNDER_MESSAGE.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
            {FOUNDER_MESSAGE.description}
          </p>

          <div
            className="mt-5 rounded-xl border border-indigo-500/15 bg-gradient-to-br from-indigo-50/60 via-bg-card to-violet-50/40 p-4 dark:border-indigo-400/20 dark:from-indigo-950/30 dark:via-dark-bg-card dark:to-violet-950/20 sm:p-5"
            role="group"
            aria-label="Founder audio message player"
          >
            <audio ref={audioRef} preload="metadata" src={FOUNDER_MESSAGE.audioSrc}>
              <track kind="captions" />
            </audio>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => void togglePlay()}
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-[0_4px_14px_rgba(79,70,229,0.35)] transition hover:bg-indigo-700 active:scale-[0.98]"
                aria-label={playing ? "Pause founder message" : "Play founder message"}
              >
                {playing ? <Pause className="size-5" aria-hidden /> : <Play className="ml-0.5 size-5" aria-hidden />}
              </button>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                  {FOUNDER.name}
                </p>
                <p className="truncate text-xs text-text-secondary dark:text-dark-text-secondary">
                  {FOUNDER_MESSAGE.audioTitle}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <div className="relative min-w-0 flex-1">
                    <div
                      className="pointer-events-none h-1.5 overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-950/60"
                      aria-hidden
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 transition-[width] duration-150"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={0.1}
                      value={progress}
                      onChange={(e) => handleSeek(Number(e.target.value))}
                      className="founder-audio-range absolute inset-0 h-1.5 w-full cursor-pointer opacity-0"
                      aria-label="Audio progress"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(progress)}
                    />
                  </div>
                  <span className="shrink-0 tabular-nums text-[11px] font-medium text-text-tertiary dark:text-dark-text-tertiary">
                    {formatTime(currentTime)}
                    <span className="mx-0.5" aria-hidden>
                      /
                    </span>
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">
            Prefer reading? Visit the{" "}
            <Link href="/about#founder" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              About page
            </Link>{" "}
            or compare packages on the{" "}
            <Link href="/pricing" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Pricing page
            </Link>
            .
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={FOUNDER_MESSAGE.primaryCtaHref}
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              {FOUNDER_MESSAGE.primaryCta}
            </Link>
            <Link
              href={FOUNDER_MESSAGE.secondaryCtaHref}
              className="inline-flex items-center justify-center rounded-full border border-border-secondary px-4 py-2 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
            >
              {FOUNDER_MESSAGE.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-xl border border-border-primary dark:border-dark-border-primary">
            <div className="relative aspect-[4/5] w-full max-h-[28rem] bg-bg-secondary dark:bg-dark-bg-secondary sm:aspect-[5/6] lg:max-h-none lg:aspect-[4/5]">
              <Image
                src={FOUNDER.photoSrc}
                alt={FOUNDER.photoAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-[#111827]/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="text-sm font-semibold text-white">{FOUNDER.name}</p>
                <p className="mt-1 text-xs text-white/85">{FOUNDER.shortTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
