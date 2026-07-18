export type ContactDataSource = "fastapi" | "supabase";

/**
 * Contact write/read provider for server routes.
 * Default: fastapi (Render Postgres).
 * Set CONTACT_DATA_SOURCE=supabase to prefer Supabase; the submit route
 * automatically falls back across FastAPI → Supabase → Firestore/email.
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
