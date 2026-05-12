/** Shared display helpers for session user (avatar initials, etc.) */

export function userInitials(name: string, email: string): string {
  const n = name.trim();
  if (n.includes(" ")) {
    const parts = n.split(/\s+/).filter(Boolean);
    const a = parts[0]?.[0] ?? "";
    const b = parts[1]?.[0] ?? "";
    return `${a}${b}`.toUpperCase().slice(0, 2) || "?";
  }
  if (n.length >= 2) return n.slice(0, 2).toUpperCase();
  if (n.length === 1) return n.toUpperCase();
  const local = email.split("@")[0] || "?";
  return local.slice(0, 2).toUpperCase();
}
