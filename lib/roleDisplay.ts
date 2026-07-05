import { isPrivilegedDashboardRole, type CanonicalAppRole } from "@/lib/roles";

export type AppRole = CanonicalAppRole | string;

const ROLE_META: Record<string, { label: string; badgeClass: string }> = {
  admin: {
    label: "Administrator",
    badgeClass:
      "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-300",
  },
  staff: {
    label: "Staff",
    badgeClass:
      "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:border-blue-400/30 dark:bg-blue-500/15 dark:text-blue-300",
  },
  manager: {
    label: "Manager",
    badgeClass:
      "border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-500/15 dark:text-indigo-300",
  },
  user: {
    label: "Customer",
    badgeClass:
      "border-border-primary bg-bg-secondary text-text-secondary dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-secondary",
  },
};

export function formatRoleLabel(role?: string | null): string {
  const key = `${role ?? "user"}`.toLowerCase();
  return ROLE_META[key]?.label ?? key.charAt(0).toUpperCase() + key.slice(1);
}

export function roleBadgeClass(role?: string | null): string {
  const key = `${role ?? "user"}`.toLowerCase();
  return ROLE_META[key]?.badgeClass ?? ROLE_META.user.badgeClass;
}

export function isPrivilegedRole(role?: string | null): boolean {
  return isPrivilegedDashboardRole(role);
}
