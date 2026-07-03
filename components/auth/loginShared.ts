import { BarChart3, FolderKanban, ShieldCheck } from "lucide-react";

export const authInputClassName =
  "h-11 w-full rounded-xl border border-border-primary bg-bg-card px-3.5 text-sm text-text-primary outline-none transition placeholder:text-text-tertiary focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary";

export const portalHighlights = [
  {
    icon: FolderKanban,
    label: "Projects & delivery",
    detail: "Track builds, timelines, and handoffs in one place.",
  },
  {
    icon: BarChart3,
    label: "Analytics & leads",
    detail: "Monitor traffic, conversions, and inbound enquiries.",
  },
  {
    icon: ShieldCheck,
    label: "Secure access",
    detail: "Role-based login for your team and stakeholders.",
  },
] as const;

export function safeCallbackUrl(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/dashboard";
  return value;
}

export function isPrivilegedRole(role?: string): boolean {
  const normalized = `${role ?? ""}`.toLowerCase();
  return normalized === "admin" || normalized === "staff" || normalized === "manager";
}
