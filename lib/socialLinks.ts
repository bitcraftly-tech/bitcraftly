import { FOUNDER } from "@/lib/siteContent";

/** Override via `NEXT_PUBLIC_INSTAGRAM_URL` in .env.local */
export const BITCRAFTLY_INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/bitcraftly";

/** Override via `NEXT_PUBLIC_FACEBOOK_URL` in .env.local */
export const BITCRAFTLY_FACEBOOK_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_URL ??
  "https://www.facebook.com/profile.php?id=61590718501473";

/** Override via `NEXT_PUBLIC_YOUTUBE_CHANNEL_URL` in .env.local */
export const BITCRAFTLY_YOUTUBE_URL =
  process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL ?? "https://www.youtube.com/@bitcraftly";

export type SocialPlatform = "instagram" | "facebook" | "youtube" | "linkedin";

export type SocialLink = {
  platform: SocialPlatform;
  href: string;
  label: string;
};

/** Public Bitcraftly social profiles for footer, schema, etc. */
export function getBitcraftlySocialLinks(linkedInUrl?: string | null): SocialLink[] {
  const links: SocialLink[] = [
    { platform: "instagram", href: BITCRAFTLY_INSTAGRAM_URL, label: "Instagram" },
    { platform: "facebook", href: BITCRAFTLY_FACEBOOK_URL, label: "Facebook" },
    { platform: "youtube", href: BITCRAFTLY_YOUTUBE_URL, label: "YouTube" },
  ];

  const linkedIn = linkedInUrl ?? FOUNDER.linkedIn;
  if (linkedIn) {
    links.push({ platform: "linkedin", href: linkedIn, label: "LinkedIn" });
  }

  return links;
}

/** URLs for JSON-LD `sameAs` — excludes founder-only profiles if needed later */
export function bitcraftlySocialSameAs(linkedInUrl?: string | null): string[] {
  return getBitcraftlySocialLinks(linkedInUrl).map((item) => item.href);
}
