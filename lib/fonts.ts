import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

/** Primary UI font — Geist Sans (enterprise SaaS) */
export const geistSans = GeistSans;

/** Monospace — code, terminal, technical snippets only */
export const geistMono = GeistMono;

/** Legacy alias — existing imports / CSS vars map to Geist Sans */
export const inter = GeistSans;

/** Legacy alias — display headings now use Geist Sans (same family) */
export const playfair = GeistSans;

export const FONT_FALLBACK_SANS =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const FONT_FALLBACK_MONO =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

export const FONT_FALLBACK_SERIF = FONT_FALLBACK_SANS;
