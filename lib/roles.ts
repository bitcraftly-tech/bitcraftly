/**
 * Canonical Bitcraftly application roles (Phase 3 foundation).
 * Backend Render DB stores admin | manager | user; frontend also recognizes staff.
 */

export const CANONICAL_APP_ROLES = ["admin", "manager", "staff", "user"] as const;

export type CanonicalAppRole = (typeof CANONICAL_APP_ROLES)[number];

/** Roles that may access the privileged dashboard (Next.js middleware). */
export const PRIVILEGED_DASHBOARD_ROLES = ["admin", "manager", "staff"] as const;

export type PrivilegedDashboardRole = (typeof PRIVILEGED_DASHBOARD_ROLES)[number];

export function normalizeAppRole(role: string | null | undefined): CanonicalAppRole | null {
  const normalized = `${role ?? ""}`.trim().toLowerCase();
  return (CANONICAL_APP_ROLES as readonly string[]).includes(normalized)
    ? (normalized as CanonicalAppRole)
    : null;
}

export function isPrivilegedDashboardRole(role: string | null | undefined): boolean {
  const normalized = `${role ?? ""}`.trim().toLowerCase();
  return (PRIVILEGED_DASHBOARD_ROLES as readonly string[]).includes(normalized);
}

export function mapRenderRoleToCanonical(role: string | null | undefined): CanonicalAppRole {
  const normalized = normalizeAppRole(role);
  if (normalized) return normalized;
  return "user";
}
