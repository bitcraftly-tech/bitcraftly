/** Bitcraftly global loader — timing & copy */

import { BRAND } from "@/lib/siteContent";

export type LoaderDesign = "aura" | "classic";

/** `aura` = orbit ring + pulse waves + sweep bar; `classic` = logo stack + dot wave */
export const LOADER_DESIGN: LoaderDesign = "aura";

export const LOADER_STORAGE_KEY = "bitcraftly-preloader-done";

/** Master switch — set NEXT_PUBLIC_LOADER_ENABLED=false in .env to disable */
export const LOADER_ENABLED = process.env.NEXT_PUBLIC_LOADER_ENABLED !== "false";

/** Fullscreen loader on every page load/refresh — opt-in via NEXT_PUBLIC_LOADER_ALWAYS_ON=true */
export const LOADER_ALWAYS_ON = process.env.NEXT_PUBLIC_LOADER_ALWAYS_ON === "true";

const isDev = process.env.NODE_ENV === "development";

export const LOADER_COPY = {
  brand: "Bitcraftly",
  tagline: BRAND.headerTagline,
  label: "Loading…",
} as const;

export const LOADER_TIMING = {
  /** Dev: longer so you can review loader UI on refresh */
  initialMinMs: isDev ? 1800 : 180,
  initialMaxMs: isDev ? 4500 : 1400,
  exitMs: isDev ? 520 : 480,
  /** Route / manual — brief transition only */
  routeMs: isDev ? 1800 : 320,
} as const;

/** Staggered section reveal after the splash loader */
export const LOADER_REVEAL = {
  staggerMs: isDev ? 90 : 70,
  durationMs: isDev ? 680 : 580,
  /** Navbar + 6 homepage sections + footer */
  sectionCount: 8,
} as const;

export function loaderRevealTotalMs(): number {
  return LOADER_REVEAL.durationMs + LOADER_REVEAL.staggerMs * (LOADER_REVEAL.sectionCount - 1);
}

/** Premium easing — Stripe/Vercel-like */
export const LOADER_EASE = [0.22, 1, 0.36, 1] as const;

export const LOADER_SPRING = { type: "spring" as const, stiffness: 380, damping: 32 };

/** Centered splash column — compact loader footprint */
export const LOADER_CONTENT_WIDTH = "w-[200px] sm:w-[228px]";

/** Aura design — room for orbit ring + multi-line tagline */
export const LOADER_CONTENT_WIDTH_AURA = "w-[248px] sm:w-[288px]";
