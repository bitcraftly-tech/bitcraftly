/**
 * Light-theme portfolio showcase — scoped UI tokens (Flat UI defo inspired).
 * Applied only inside `.portfolio-showcase-light` — does not change global site theme.
 */

export const PS = {
  bg: "#fafbfc",
  surface: "#ffffff",
  surfaceMuted: "#f4f6f8",
  text: "#2c3e50",
  textMuted: "#7f8c8d",
  textSoft: "#95a5a6",
  border: "rgba(189, 195, 199, 0.65)",
  borderGlow: "rgba(142, 68, 173, 0.22)",
  purple: "#8e44ad",
  purpleLight: "#9b59b6",
  purpleSoft: "rgba(155, 89, 182, 0.12)",
  blue: "#3498db",
  blueDark: "#2980b9",
  green: "#27ae60",
  greenSoft: "rgba(46, 204, 113, 0.12)",
  shadow: "0 4px 24px rgba(44, 62, 80, 0.06)",
  shadowHover: "0 12px 40px rgba(142, 68, 173, 0.12)",
} as const;

/** Wrapper — forces light surfaces even when site is in dark mode */
export const PORTFOLIO_LIGHT_WRAPPER =
  "portfolio-showcase-light bg-[#fafbfc] text-[#2c3e50] [&_*]:border-[#e8ecef]";

export const PS_SECTION =
  "relative overflow-hidden rounded-none bg-[#fafbfc]";

export const PS_HERO_BADGE =
  "flex items-center gap-3 rounded-2xl border border-[#e8ecef] bg-white px-4 py-3 shadow-[0_4px_24px_rgba(44,62,80,0.06)] sm:px-5 sm:py-4";

export const PS_CARD =
  "ps-card group relative flex flex-col overflow-hidden rounded-[24px] border border-[#e8ecef]/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03),0_8px_28px_-6px_rgba(15,23,42,0.08)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[rgba(142,68,173,0.14)] hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_22px_48px_-14px_rgba(142,68,173,0.16)]";

export const PS_FILTER_ACTIVE =
  "relative z-[1] border-transparent bg-[#8e44ad] text-white shadow-[0_4px_14px_rgba(142,68,173,0.35)]";

export const PS_FILTER_IDLE =
  "border-[#e8ecef] bg-white text-[#2c3e50] shadow-sm hover:border-[rgba(142,68,173,0.25)] hover:bg-[#fafbfc]";

export const PS_BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#8e44ad] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(142,68,173,0.35)] transition hover:bg-[#9b59b6] hover:shadow-[0_6px_20px_rgba(142,68,173,0.4)] active:scale-[0.98]";

export const PS_BTN_GHOST =
  "inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#e8ecef] bg-white px-4 py-2 text-sm font-semibold text-[#2c3e50] transition hover:border-[rgba(142,68,173,0.3)] hover:bg-[#fafbfc]";

export const PS_BTN_TEXT =
  "inline-flex items-center gap-1.5 text-sm font-semibold text-[#8e44ad] transition hover:text-[#9b59b6]";

export const PS_FEATURED_CARD =
  "flex flex-col gap-4 overflow-hidden rounded-[20px] border border-[#e8ecef] bg-white p-5 shadow-[0_4px_24px_rgba(44,62,80,0.06)] transition hover:shadow-[0_12px_40px_rgba(142,68,173,0.1)] sm:flex-row sm:items-center sm:gap-6 sm:p-6";

export const PS_BOTTOM_CTA =
  "flex flex-col gap-5 rounded-[20px] border border-[#e8ecef] bg-white p-6 shadow-[0_4px_24px_rgba(44,62,80,0.06)] sm:flex-row sm:items-center sm:justify-between sm:p-8";

export const PS_EYEBROW = "text-xs font-bold uppercase tracking-[0.2em] text-[#8e44ad]";

export const PS_HEADING = "font-[var(--font-playfair)] text-3xl font-semibold tracking-tight text-[#2c3e50] sm:text-4xl md:text-[2.75rem]";

export const PS_THUMB =
  "relative shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br shadow-inner";
