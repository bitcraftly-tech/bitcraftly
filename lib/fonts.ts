import { Inter, Playfair_Display } from "next/font/google";

/** System stacks paint immediately; brand fonts swap in when downloaded (font-display: swap). */
export const FONT_FALLBACK_SANS =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const FONT_FALLBACK_SERIF = 'Georgia, "Times New Roman", Times, serif';

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});
