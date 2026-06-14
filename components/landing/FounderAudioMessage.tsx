"use client";

import Image from "next/image";
import Link from "next/link";
import { Headphones, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { CONTAINER } from "@/lib/constants";
import { FOUNDER_MESSAGE } from "@/lib/founderMessage";
import { FOUNDER } from "@/lib/siteContent";

const WAVE_BARS = [28, 44, 36, 52, 32, 48, 40, 56, 34, 50, 38, 46, 30, 54, 42, 36, 48, 32, 44, 38, 52, 34, 46, 40] as const;

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
    <section id="founder-message" className={`${CONTAINER} scroll-mt-24 py-6 md:py-8`}>
      <div className="mx-auto max-w-3xl text-center lg:max-w-none lg:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
          {FOUNDER_MESSAGE.eyebrow}
        </p>
        <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
          {FOUNDER_MESSAGE.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary lg:mx-0 lg:text-base">
          {FOUNDER_MESSAGE.description}
        </p>
      </div>

      <div className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-indigo-500/20 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] shadow-[0_24px_60px_-20px_rgba(79,70,229,0.55)] dark:border-indigo-400/25">
        <div
          className="pointer-events-none absolute -left-16 top-0 size-56 rounded-full bg-violet-400/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-10 right-0 size-72 rounded-full bg-indigo-300/15 blur-3xl"
          aria-hidden
        />

        <div className="relative p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left lg:w-[13.5rem] lg:shrink-0 lg:flex-col lg:justify-center">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-full ring-4 ring-white/20 sm:size-28">
                <Image
                  src={FOUNDER.photoSrc}
                  alt={FOUNDER.photoAlt}
                  fill
                  className="object-cover object-top"
                  sizes="112px"
                />
                <span className="absolute inset-0 rounded-full bg-indigo-900/10" aria-hidden />
              </div>
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-indigo-100">
                  <Headphones className="size-3" aria-hidden />
                  Audio note
                </span>
                <p className="mt-3 text-lg font-semibold text-white">{FOUNDER.name}</p>
                <p className="mt-1 text-sm text-indigo-100/80">{FOUNDER.shortTitle}</p>
              </div>
            </div>

            <div
              className="flex min-h-[11rem] flex-1 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-md sm:min-h-[12rem] sm:p-5"
              role="group"
              aria-label="Founder audio message player"
            >
              <audio ref={audioRef} preload="metadata" src={FOUNDER_MESSAGE.audioSrc}>
                <track kind="captions" />
              </audio>

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white/90">{FOUNDER_MESSAGE.audioTitle}</p>
                  <p className="mt-1 text-xs text-indigo-100/65">Tap play — works on mobile &amp; desktop</p>
                </div>
                <button
                  type="button"
                  onClick={() => void togglePlay()}
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-indigo-700 shadow-lg transition hover:scale-[1.03] hover:bg-indigo-50 active:scale-[0.98]"
                  aria-label={playing ? "Pause founder message" : "Play founder message"}
                >
                  {playing ? <Pause className="size-5" aria-hidden /> : <Play className="ml-0.5 size-5" aria-hidden />}
                </button>
              </div>

              <div className="mt-5 flex h-10 items-end justify-center gap-[3px] sm:gap-1" aria-hidden>
                {WAVE_BARS.map((height, index) => (
                  <span
                    key={index}
                    className={`w-1 rounded-full bg-gradient-to-t from-indigo-300/50 to-violet-200/90 sm:w-1.5 ${
                      playing ? "animate-pulse" : "opacity-70"
                    }`}
                    style={{
                      height: `${height}%`,
                      animationDelay: playing ? `${index * 45}ms` : undefined,
                    }}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="relative min-w-0 flex-1">
                  <div className="pointer-events-none h-2 overflow-hidden rounded-full bg-white/15" aria-hidden>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-200 to-white transition-[width] duration-150"
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
                    className="absolute inset-0 h-2 w-full cursor-pointer opacity-0"
                    aria-label="Audio progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progress)}
                  />
                </div>
                <span className="shrink-0 tabular-nums text-xs font-medium text-indigo-100/90">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-center text-xs leading-relaxed text-indigo-100/75 sm:text-left">
              Prefer reading? Visit the{" "}
              <Link href="/about#founder" className="font-semibold text-white underline-offset-2 hover:underline">
                About page
              </Link>{" "}
              or compare packages on the{" "}
              <Link href="/pricing" className="font-semibold text-white underline-offset-2 hover:underline">
                Pricing page
              </Link>
              .
            </p>
            <div className="flex shrink-0 flex-wrap justify-center gap-2.5 sm:justify-end">
              <Link
                href={FOUNDER_MESSAGE.primaryCtaHref}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
              >
                {FOUNDER_MESSAGE.primaryCta}
              </Link>
              <Link
                href={FOUNDER_MESSAGE.secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                {FOUNDER_MESSAGE.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
