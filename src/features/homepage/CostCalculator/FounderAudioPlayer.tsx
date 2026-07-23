"use client";

import {
  memo,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { trackCostCalculatorEvent } from "./analytics";
import type {
  FounderLanguageId,
  FounderMessageContent,
} from "./cost-calculator.types";

interface FounderAudioPlayerProps {
  content: FounderMessageContent;
  active?: boolean;
}

const PLAYBACK_SPEED_OPTIONS = [0.75, 1, 1.25, 1.5] as const;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function FounderAudioPlayerComponent({
  content,
  active = true,
}: FounderAudioPlayerProps) {
  const reactId = useId();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [langId, setLangId] = useState<FounderLanguageId>(
    content.languages[0]?.id ?? "hi",
  );
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  const language =
    content.languages.find((item) => item.id === langId) ?? content.languages[0];

  const stopAndReset = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
    setCurrentTime(0);
  }, []);

  useEffect(() => {
    if (!active) {
      stopAndReset();
    }
  }, [active, stopAndReset]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !language) return;

    stopAndReset();
    setDuration(0);
    setAudioAvailable(true);
    audio.load();
    audio.playbackRate = playbackRate;
    // Only reload when language track changes — not when speed changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: keep current rate without restarting
  }, [language, stopAndReset]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
  }, [muted]);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio || !audioAvailable) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      audio.playbackRate = playbackRate;
      await audio.play();
      setPlaying(true);
      trackCostCalculatorEvent("founder_audio_played", { language: langId });
    } catch {
      setAudioAvailable(false);
      setPlaying(false);
    }
  }

  function changePlaybackRate(next: number) {
    setPlaybackRate(next);
    if (audioRef.current) {
      audioRef.current.playbackRate = next;
    }
  }

  function switchLanguage(nextLang: FounderLanguageId) {
    if (nextLang === langId) return;
    stopAndReset();
    setLangId(nextLang);
    trackCostCalculatorEvent("language_switched", { language: nextLang });
  }

  function onSeek(value: number) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const next = (value / 100) * duration;
    audio.currentTime = next;
    setCurrentTime(next);
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const waveBars = [40, 70, 55, 85, 48, 92, 60, 78, 45, 88, 52, 74];

  return (
    <aside
      className="founder-audio-card founder-audio-card--row !p-[16px]"
      aria-labelledby={content.headingId}
    >
      <div className="founder-audio-main">
        <p className="founder-eyebrow">{content.eyebrow}</p>
        <h3 id={content.headingId} className="founder-heading">
          {content.heading}
        </h3>
        <p className="founder-description">{content.description}</p>

        <div className="founder-identity">
          <span className="founder-photo">
            <Image
              src={content.founderPhotoSrc}
              alt={content.founderPhotoAlt}
              fill
              sizes="56px"
              className="object-cover object-[46%_14%] scale-[1.14]"
            />
          </span>
          <div className="min-w-0">
            <p className="founder-name">{content.founderName}</p>
            <p className="founder-role">{content.founderRole}</p>
          </div>
        </div>

        <ul className="founder-trust-badges" aria-label="Founder credentials">
          {content.trustBadges.map((badge) => (
            <li key={badge}>{badge}</li>
          ))}
        </ul>

        <p className="founder-transcript founder-transcript--desktop">
          “{language?.transcript}”
        </p>
      </div>

      <div
        className="founder-player founder-player--panel"
        role="group"
        aria-label="Founder audio message player"
      >
        <div
          className="founder-lang-row"
          role="group"
          aria-label="Listen in your language"
        >
          {content.languages.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn(
                "founder-lang-btn",
                langId === item.id && "is-active",
              )}
              aria-pressed={langId === item.id}
              onClick={() => switchLanguage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <audio
          ref={audioRef}
          preload="none"
          playsInline
          src={language?.audioSrc}
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration || 0);
            setAudioAvailable(true);
          }}
          onTimeUpdate={(event) => {
            setCurrentTime(event.currentTarget.currentTime);
          }}
          onEnded={() => {
            const audio = audioRef.current;
            if (audio) audio.currentTime = 0;
            setPlaying(false);
            setCurrentTime(0);
          }}
          onError={() => {
            setAudioAvailable(false);
            setPlaying(false);
          }}
        />

        <div className="founder-player-row">
          <button
            type="button"
            className="founder-play-btn"
            aria-label={
              playing ? "Pause founder message" : "Play founder message"
            }
            disabled={!audioAvailable}
            onClick={() => {
              void togglePlayback();
            }}
          >
            {playing ? (
              <span className="founder-pause-icon" aria-hidden />
            ) : (
              <Icon
                name="play"
                size="sm"
                aria-hidden
                className="h-[14px] w-[14px]"
              />
            )}
          </button>

          <div
            className={cn("founder-wave", playing && "is-active")}
            aria-hidden
          >
            {waveBars.map((height, index) => (
              <span
                key={`${reactId}-wave-${index}`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>

          <label className="founder-speed">
            <span className="sr-only">Playback speed</span>
            <select
              value={playbackRate}
              aria-label="Playback speed"
              title="Playback speed"
              onChange={(event) => {
                changePlaybackRate(Number(event.target.value));
              }}
            >
              {PLAYBACK_SPEED_OPTIONS.map((rate) => (
                <option key={rate} value={rate}>
                  {rate}x
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="founder-mute-btn"
            aria-label={muted ? "Unmute audio" : "Mute audio"}
            onClick={() => setMuted((current) => !current)}
          >
            {muted ? "Unmute" : "Mute"}
          </button>
        </div>

        <label className="founder-seek">
          <span className="sr-only">Audio progress</span>
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            disabled={!audioAvailable || duration <= 0}
            onChange={(event) => onSeek(Number(event.target.value))}
          />
        </label>

        <div className="founder-time-row">
          <span>{formatTime(currentTime)}</span>
          <span>
            {duration > 0
              ? formatTime(duration)
              : (language?.durationHint ?? "0:00")}
          </span>
        </div>

        {!audioAvailable ? (
          <p className="founder-fallback">
            Audio unavailable right now — transcript below.
          </p>
        ) : null}
      </div>

      <p className="founder-transcript founder-transcript--mobile">
        “{language?.transcript}”
      </p>
    </aside>
  );
}

export const FounderAudioPlayer = memo(FounderAudioPlayerComponent);
