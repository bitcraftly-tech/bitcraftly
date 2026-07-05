export type ContactDataSource = "fastapi" | "supabase";

/**
 * Contact write/read provider for server routes.
 * Default: fastapi (preserves local dev unless explicitly configured).
 * Production should set CONTACT_DATA_SOURCE explicitly (e.g. supabase on staging).
 */
export function getContactDataSource(): ContactDataSource {
  const raw = `${process.env.CONTACT_DATA_SOURCE ?? ""}`.trim().toLowerCase();
  if (raw === "supabase") return "supabase";
  if (raw === "fastapi") return "fastapi";
  return "fastapi";
}

export function isContactSupabaseSource(): boolean {
  return getContactDataSource() === "supabase";
}

/** Client-safe hint — mirrors server CONTACT_DATA_SOURCE when exposed. */
export function isContactSupabaseSourceClient(): boolean {
  const raw = `${process.env.NEXT_PUBLIC_CONTACT_DATA_SOURCE ?? process.env.CONTACT_DATA_SOURCE ?? ""}`
    .trim()
    .toLowerCase();
  return raw === "supabase";
}
