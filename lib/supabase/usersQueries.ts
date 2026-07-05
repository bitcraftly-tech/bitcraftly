import type { SupabaseClient } from "@supabase/supabase-js";

export type SanitizedSupabaseError = {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
};

export function sanitizeSupabaseError(error: unknown): SanitizedSupabaseError {
  if (!error || typeof error !== "object") {
    return { message: "unknown_error" };
  }

  const record = error as Record<string, unknown>;
  return {
    code: typeof record.code === "string" ? record.code : undefined,
    message: typeof record.message === "string" ? record.message : undefined,
    details: typeof record.details === "string" ? record.details : undefined,
    hint: typeof record.hint === "string" ? record.hint : undefined,
  };
}

export class SupabaseUsersQueryError extends Error {
  readonly operation: string;
  readonly sanitized: SanitizedSupabaseError;

  constructor(operation: string, sanitized: SanitizedSupabaseError) {
    const code = sanitized.code ?? "unknown";
    const message = sanitized.message ?? "unknown";
    super(`${operation}:${code}:${message}`);
    this.name = "SupabaseUsersQueryError";
    this.operation = operation;
    this.sanitized = sanitized;
  }
}

function throwUsersQueryError(operation: string, error: unknown): never {
  throw new SupabaseUsersQueryError(operation, sanitizeSupabaseError(error));
}

/** Public columns only — never select credential fields (none exist on this table). */
export const USER_PUBLIC_COLUMNS =
  "id, legacy_id, email, name, role, is_active, auth_provider, legacy_created_at, created_at, updated_at";

export type SupabaseUserRow = {
  id: string;
  legacy_id: number | null;
  email: string;
  name: string | null;
  role: string;
  is_active: boolean;
  auth_provider: string | null;
  legacy_created_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function countUsersWithClient(client: SupabaseClient): Promise<number> {
  const { count, error } = await client
    .from("users")
    .select("id", { count: "exact", head: true });

  if (error) throwUsersQueryError("count_users", error);
  return count ?? 0;
}

export async function getUserByEmailWithClient(
  client: SupabaseClient,
  email: string,
): Promise<SupabaseUserRow | null> {
  const normalized = email.trim().toLowerCase();
  const { data, error } = await client
    .from("users")
    .select(USER_PUBLIC_COLUMNS)
    .eq("email", normalized)
    .maybeSingle();
  if (error) throwUsersQueryError("get_user_by_email", error);
  return (data as SupabaseUserRow | null) ?? null;
}

export async function getUserByLegacyIdWithClient(
  client: SupabaseClient,
  legacyId: number,
): Promise<SupabaseUserRow | null> {
  const { data, error } = await client
    .from("users")
    .select(USER_PUBLIC_COLUMNS)
    .eq("legacy_id", legacyId)
    .maybeSingle();
  if (error) throwUsersQueryError("get_user_by_legacy_id", error);
  return (data as SupabaseUserRow | null) ?? null;
}
