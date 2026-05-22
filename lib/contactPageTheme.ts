/** Contact page — scoped light flat UI */

export const CP = {
  bg: "#F9FAFB",
  surface: "#FFFFFF",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  text: "#111827",
  textMuted: "#6B7280",
  textSoft: "#9CA3AF",
  indigo: "#4F46E5",
  indigoDark: "#4338CA",
  indigoSoft: "rgba(79, 70, 229, 0.08)",
  indigoBorder: "rgba(79, 70, 229, 0.2)",
  whatsapp: "#25D366",
  whatsappDark: "#128C7E",
  whatsappSoft: "rgba(37, 211, 102, 0.08)",
  whatsappBorder: "rgba(37, 211, 102, 0.25)",
  check: "#4F46E5",
} as const;

export const CP_PAGE = "contact-page min-h-full bg-[#F9FAFB] text-[#111827]";

export const CP_CARD = "border border-[#E5E7EB] bg-white";

export const CP_ACCENT = "border border-[#C7D2FE] bg-[#EEF2FF]";

export const CP_INPUT =
  "h-11 w-full min-w-0 border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/12";

export const CP_BTN_PRIMARY =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-4 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(79,70,229,0.35)] transition hover:opacity-95 hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)] disabled:opacity-70";

export const CP_BTN_WHATSAPP =
  "inline-flex h-11 flex-1 items-center justify-center gap-2 bg-[#25D366] px-4 text-sm font-semibold text-white transition hover:bg-[#20bd5a]";

export const CP_BTN_GHOST =
  "inline-flex h-11 flex-1 items-center justify-center border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#111827] transition hover:border-[#4F46E5]/30 hover:bg-[#F9FAFB]";
