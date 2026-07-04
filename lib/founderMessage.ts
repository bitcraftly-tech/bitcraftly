/** Homepage founder audio message section */

export type FounderAudioLocale = "en" | "hi";

export type FounderAudioSource = {
  src: string;
  type: string;
};

/** MP4/M4A (iOS + modern) then MP3 (universal fallback) — browser picks first supported format */
function founderAudioSources(slug: string): FounderAudioSource[] {
  return [
    { src: `/audio/${slug}.mp4`, type: "audio/mp4" },
    { src: `/audio/${slug}.m4a`, type: "audio/mp4" },
    { src: `/audio/${slug}.mp3`, type: "audio/mpeg" },
  ];
}

export const FOUNDER_MESSAGE = {
  eyebrow: "FOUNDER MESSAGE",
  title: "Hear from the founder",
  description:
    "Sanjay ka short voice message — English ya Hindi mein sunne ke liye language choose karein.",
  languageLabel: "Listen in your language",
  languageHint: "Tap to play",
  playerHint: "Tap again to pause",
  nowPlaying: "Now playing",
  loadError: "Audio load nahi ho paya. About page par jaayein.",
  unsupportedError: "Is browser mein audio play nahi ho sakta. Chrome, Safari ya Firefox try karein.",
  playBlockedError: "Audio shuru karne ke liye dubara tap karein.",
  audioTracks: {
    en: {
      label: "English",
      shortLabel: "EN",
      sources: [{ src: "/audio/founder-message-en.mp3", type: "audio/mpeg" }],
      title: "How Bitcraftly works — English",
      selectAriaLabel: "Play founder message in English",
      pauseAriaLabel: "Pause English founder message",
    },
    hi: {
      label: "हिंदी",
      shortLabel: "HI",
      sources: founderAudioSources("founder-message-hi"),
      title: "Bitcraftly kaise kaam karta hai — Hindi",
      selectAriaLabel: "Founder message Hindi mein chalayein",
      pauseAriaLabel: "Hindi founder message rok dein",
    },
  } satisfies Record<
    FounderAudioLocale,
    {
      label: string;
      shortLabel: string;
      sources: FounderAudioSource[];
      title: string;
      selectAriaLabel: string;
      pauseAriaLabel: string;
    }
  >,
  primaryCta: "View Pricing",
  primaryCtaHref: "/pricing",
  secondaryCta: "About Founder",
  secondaryCtaHref: "/about",
  secondaryCtaSectionId: "founder",
} as const;

export const FOUNDER_AUDIO_LOCALES = ["en", "hi"] as const satisfies readonly FounderAudioLocale[];

/** Shown in UI — English + Hindi founder voice messages */
export const FOUNDER_AUDIO_VISIBLE_LOCALES: readonly FounderAudioLocale[] = ["en", "hi"];

export const FOUNDER_AUDIO_DEFAULT_LOCALE: FounderAudioLocale = "hi";
