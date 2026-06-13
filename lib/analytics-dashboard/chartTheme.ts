/** Bitcraftly Analytics — chart palette (Vercel/Stripe-inspired) */

export const ANALYTICS_COLORS = {
  primary: "#2563EB",
  secondary: "#0F172A",
  accent: "#22C55E",
  primaryLight: "#3B82F6",
  accentMuted: "#86EFAC",
  slate: "#64748B",
  violet: "#7C3AED",
  amber: "#F59E0B",
  rose: "#F43F5E",
} as const;

export const CHART_PALETTE = [
  ANALYTICS_COLORS.primary,
  ANALYTICS_COLORS.accent,
  ANALYTICS_COLORS.violet,
  ANALYTICS_COLORS.amber,
  ANALYTICS_COLORS.rose,
  "#06B6D4",
] as const;

export function chartGridColor(isDark: boolean): string {
  return isDark ? "rgba(148, 163, 184, 0.12)" : "rgba(15, 23, 42, 0.08)";
}

export function chartAxisColor(isDark: boolean): string {
  return isDark ? "#94A3B8" : "#64748B";
}

export function chartTooltipStyle(isDark: boolean) {
  return {
    backgroundColor: isDark ? "#1C1C27" : "#FFFFFF",
    border: `1px solid ${isDark ? "#2A2A3D" : "#E2E8F0"}`,
    borderRadius: "10px",
    fontSize: "12px",
    color: isDark ? "#F0EFF8" : "#0F172A",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
  };
}
