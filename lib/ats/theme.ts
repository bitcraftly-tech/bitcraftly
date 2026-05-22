/** Bitcraftly ATS — purple + navy premium SaaS tokens (light-first) */

export const ATS = {
  purple: "#6366f1",
  purpleDark: "#4f46e5",
  purpleLight: "#eef2ff",
  navy: "#1e293b",
  navySoft: "#334155",
  surface: "#ffffff",
  surfaceMuted: "#f8fafc",
  border: "#e2e8f0",
  borderSoft: "#f1f5f9",
  text: "#0f172a",
  textMuted: "#64748b",
  textSubtle: "#94a3b8",
  gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2b5ce6 100%)",
  shadow: "0 1px 3px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(79, 70, 229, 0.08)",
  shadowHover: "0 4px 20px rgba(79, 70, 229, 0.14)",
  radius: "16px",
} as const;

export const atsCard =
  "rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] dark:border-dark-border-primary dark:bg-dark-bg-card";

export const atsInput =
  "h-11 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/15 dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-primary";

export const atsLabel = "text-xs font-semibold uppercase tracking-wide text-[#64748b] dark:text-dark-text-tertiary";

export const atsBtnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]";

export const atsBtnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-6 py-2.5 text-sm font-semibold text-[#1e293b] transition hover:border-[#c7d2fe] hover:bg-[#f8fafc] dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-primary";
