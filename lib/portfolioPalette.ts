/**
 * Flat UI Colors — "defo" palette (flatuicolors.com/palette/defo)
 * Scoped to Portfolio Showcase & Case Study visuals only.
 */

export const FLAT_UI_DEFO = {
  turquoise: "#1abc9c",
  greenSea: "#16a085",
  emerald: "#2ecc71",
  nephritis: "#27ae60",
  peterRiver: "#3498db",
  belizeHole: "#2980b9",
  amethyst: "#9b59b6",
  wisteria: "#8e44ad",
  wetAsphalt: "#34495e",
  midnightBlue: "#2c3e50",
  sunFlower: "#f1c40f",
  orange: "#f39c12",
  carrot: "#e67e22",
  alizarin: "#e74c3c",
  clouds: "#ecf0f1",
  silver: "#bdc3c7",
  concrete: "#95a5a6",
  asbestos: "#7f8c8d",
} as const;

/** Semantic mapping for portfolio UI */
export const PORTFOLIO_VISUAL = {
  primaryAccent: FLAT_UI_DEFO.peterRiver,
  primaryAccentDark: FLAT_UI_DEFO.belizeHole,
  secondaryAccent: FLAT_UI_DEFO.amethyst,
  secondaryAccentDark: FLAT_UI_DEFO.wisteria,
  cardHighlight: FLAT_UI_DEFO.clouds,
  cardHighlightDark: FLAT_UI_DEFO.wetAsphalt,
  liveBadge: FLAT_UI_DEFO.emerald,
  liveBadgeDark: FLAT_UI_DEFO.nephritis,
  demoBadge: FLAT_UI_DEFO.amethyst,
  performance: FLAT_UI_DEFO.turquoise,
  performanceDark: FLAT_UI_DEFO.greenSea,
  neutralTag: FLAT_UI_DEFO.concrete,
  react: FLAT_UI_DEFO.peterRiver,
  nextjs: FLAT_UI_DEFO.belizeHole,
  ai: FLAT_UI_DEFO.wisteria,
} as const;

/** Section backdrop — subtle, does not override global bg tokens */
export const PORTFOLIO_SECTION_ACCENT =
  "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#3498db]/[0.04] via-transparent to-[#9b59b6]/[0.03] dark:from-[#3498db]/[0.07] dark:to-[#8e44ad]/[0.05]";

export const PORTFOLIO_CARD_SHELL =
  "group flex h-full min-h-0 scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-[#bdc3c7]/50 bg-bg-card shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform dark:border-[#34495e]/55 dark:bg-dark-bg-card";

export const PORTFOLIO_CARD_HOVER =
  "hover:-translate-y-0.5 hover:border-[#3498db]/45 hover:shadow-[0_14px_32px_rgba(52,152,219,0.14)] dark:hover:border-[#3498db]/40 dark:hover:shadow-[0_16px_36px_rgba(44,62,80,0.45)]";

export const PORTFOLIO_FILTER_ACTIVE =
  "border-[#3498db]/50 bg-[#3498db]/12 text-[#2980b9] dark:border-[#3498db]/45 dark:bg-[#3498db]/15 dark:text-[#85c1e9]";

export const PORTFOLIO_FILTER_IDLE =
  "border-border-primary bg-bg-card text-text-secondary hover:border-[#3498db]/35 hover:bg-[#3498db]/5 dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-secondary dark:hover:border-[#3498db]/30";

export const PORTFOLIO_LINK_ACCENT =
  "text-[#2980b9] transition hover:text-[#3498db] dark:text-[#5dade2] dark:hover:text-[#85c1e9]";

export const PORTFOLIO_RESULT_HIGHLIGHT =
  "text-[#2980b9] dark:text-[#5dade2]";

export const PORTFOLIO_CTA_PRIMARY =
  "rounded-xl bg-gradient-to-r from-[#2980b9] to-[#8e44ad] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-[#3498db] hover:to-[#9b59b6] hover:shadow-md";

export const PORTFOLIO_CTA_SECONDARY =
  "rounded-xl border border-[#bdc3c7] bg-bg-card px-5 py-2.5 text-sm font-semibold text-text-primary transition hover:border-[#3498db]/45 hover:bg-[#3498db]/5 dark:border-[#34495e] dark:bg-dark-bg-card dark:text-dark-text-primary dark:hover:border-[#3498db]/40";

export const PORTFOLIO_CASE_OVERVIEW =
  "rounded-2xl border border-[#bdc3c7]/45 bg-[#ecf0f1]/40 p-6 dark:border-[#34495e]/50 dark:bg-[#34495e]/20 md:p-8";

export const PORTFOLIO_CASE_LIVE =
  "rounded-2xl border border-[#2ecc71]/35 bg-[#2ecc71]/8 p-6 dark:border-[#27ae60]/40 dark:bg-[#27ae60]/12 md:p-8";

export const PORTFOLIO_CASE_DEMO =
  "rounded-2xl border border-[#9b59b6]/30 bg-[#9b59b6]/6 p-6 dark:border-[#8e44ad]/35 dark:bg-[#8e44ad]/10 md:p-8";

export const PORTFOLIO_CASE_AFTER =
  "rounded-xl border border-[#3498db]/35 bg-[#3498db]/6 p-5 dark:border-[#2980b9]/40 dark:bg-[#2980b9]/12";

export const PORTFOLIO_CASE_BEFORE =
  "rounded-xl border border-dashed border-[#95a5a6]/55 bg-bg-card/50 p-5 dark:border-[#7f8c8d]/50 dark:bg-dark-bg-card/50";

export const PORTFOLIO_PERF_METRIC =
  "rounded-xl border border-[#1abc9c]/28 bg-[#1abc9c]/6 p-4 dark:border-[#16a085]/35 dark:bg-[#16a085]/10";

export const PORTFOLIO_STRUCTURE_STEP =
  "rounded-xl border border-[#bdc3c7]/40 bg-bg-card p-3 transition hover:border-[#3498db]/30 dark:border-[#34495e]/50 dark:bg-dark-bg-card dark:hover:border-[#3498db]/25 sm:p-4";
