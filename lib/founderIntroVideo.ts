/** Homepage founder intro video — set NEXT_PUBLIC_FOUNDER_INTRO_YOUTUBE_ID when ready */

function parseYoutubeId(value: string | undefined): string | null {
  const raw = (value ?? "").trim();
  if (!raw) return null;

  if (/^[\w-]{11}$/.test(raw)) return raw;

  try {
    const url = new URL(raw);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }
    const v = url.searchParams.get("v");
    if (v) return v;
    const embedMatch = url.pathname.match(/\/embed\/([\w-]{11})/);
    if (embedMatch?.[1]) return embedMatch[1];
  } catch {
    return null;
  }

  return null;
}

export const FOUNDER_INTRO_YOUTUBE_ID = parseYoutubeId(
  process.env.NEXT_PUBLIC_FOUNDER_INTRO_YOUTUBE_ID ?? process.env.NEXT_PUBLIC_FOUNDER_INTRO_YOUTUBE_URL,
);

export const FOUNDER_INTRO_VIDEO = {
  durationLabel: "60 sec",
  eyebrow: "Founder intro",
  title: "Sanjay se 1 minute mein — Bitcraftly kya hai, kaise kaam karta hai",
  description:
    "Sales team nahi — seedha founder. Pricing clear hai, scope likh ke milta hai, WhatsApp par same-day reply. Video English ya Hinglish mix mein.",
  comingSoonTitle: "Intro video — jald aa raha hai",
  comingSoonBody:
    "Hum ek short founder video record kar rahe hain. Tab tak pricing compare karo ya About page par process padho.",
  playLabel: "Watch 60-sec intro",
  playAriaLabel: "Play founder introduction video",
} as const;

export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
}

export function youtubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
