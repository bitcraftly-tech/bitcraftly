/** Bitcraftly global loader — timing & copy */

export type LoaderDesign = "aura" | "classic";

/** `aura` = orbit ring + pulse waves + sweep bar; `classic` = logo stack + dot wave */
export const LOADER_DESIGN: LoaderDesign = "aura";

export const LOADER_STORAGE_KEY = "bitcraftly-preloader-done";

/** Master switch — false disables all loaders site-wide */
export const LOADER_ENABLED = true;

/** Fullscreen loader on every visit when true; false = once per tab session */
export const LOADER_ALWAYS_ON = true;

export const LOADER_COPY = {
  brand: "Bitcraftly",
  tagline: "Digital Solutions, Crafted for Growth",
  label: "Loading…",
} as const;

export const LOADER_TIMING = {
  initialMinMs: 800,
  initialMaxMs: 4500,
  exitMs: 520,
  routeMs: 420,
} as const;

/** Premium easing — Stripe/Vercel-like */
export const LOADER_EASE = [0.22, 1, 0.36, 1] as const;

export const LOADER_SPRING = { type: "spring" as const, stiffness: 380, damping: 32 };

/** Centered splash column — compact loader footprint */
export const LOADER_CONTENT_WIDTH = "w-[200px] sm:w-[228px]";

/** Aura design — room for orbit ring */
export const LOADER_CONTENT_WIDTH_AURA = "w-[220px] sm:w-[248px]";
