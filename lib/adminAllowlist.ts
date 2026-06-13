/** Comma-separated admin emails — grants admin role even when API sync is unavailable. */

const BOOTSTRAP_ADMIN_EMAILS = ["sanjayndls09@gmail.com"];

export function parseAdminAllowlist(raw?: string): string[] {
  return `${raw ?? ""}`
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function roleFromAdminAllowlist(email?: string | null, rawList?: string): "admin" | undefined {
  if (!email) return undefined;
  const normalized = email.trim().toLowerCase();
  const list = [
    ...new Set([...parseAdminAllowlist(rawList ?? process.env.AUTH_ADMIN_EMAILS), ...BOOTSTRAP_ADMIN_EMAILS]),
  ];
  return list.includes(normalized) ? "admin" : undefined;
}
