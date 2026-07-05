import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

/** Reserved probe table — intentionally absent until Phase 3+ migrations. */
const FOUNDATION_PROBE_TABLE = "_bitcraftly_foundation_probe";

export type SupabaseDatabaseHealthResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "connection_failed" | "unauthorized" | "unexpected" };

function isExpectedProbeTableMissing(error: PostgrestError): boolean {
  const code = `${error.code ?? ""}`.toUpperCase();
  const message = `${error.message ?? ""}`.toLowerCase();

  if (code === "PGRST205" || code === "42P01") return true;
  if (message.includes("could not find the table")) return true;
  if (message.includes("does not exist") && message.includes("relation")) return true;

  return false;
}

function isUnauthorizedError(error: PostgrestError): boolean {
  const code = `${error.code ?? ""}`.toUpperCase();
  const message = `${error.message ?? ""}`.toLowerCase();

  if (code === "PGRST301" || code === "401") return true;
  if (message.includes("invalid") && message.includes("jwt")) return true;
  if (message.includes("unauthorized")) return true;

  return false;
}

function isMissingEnvError(error: unknown): boolean {
  return error instanceof Error && error.message.startsWith("Missing required environment variable:");
}

/**
 * Read-only PostgREST probe — no writes. Shared by server routes and CLI scripts.
 */
export async function runDatabaseConnectivityProbe(
  client: SupabaseClient,
): Promise<SupabaseDatabaseHealthResult> {
  const { error } = await client
    .from(FOUNDATION_PROBE_TABLE)
    .select("*", { count: "exact", head: true });

  if (!error) {
    return { ok: true };
  }

  if (isExpectedProbeTableMissing(error)) {
    return { ok: true };
  }

  if (isUnauthorizedError(error)) {
    return { ok: false, reason: "unauthorized" };
  }

  return { ok: false, reason: "unexpected" };
}

export async function verifySupabaseDatabaseConnectionSafe(
  getClient: () => SupabaseClient,
): Promise<SupabaseDatabaseHealthResult> {
  try {
    return await runDatabaseConnectivityProbe(getClient());
  } catch (error) {
    if (isMissingEnvError(error)) {
      return { ok: false, reason: "not_configured" };
    }

    return { ok: false, reason: "connection_failed" };
  }
}
