import "server-only";

import { verifySupabaseDatabaseConnectionSafe } from "@/lib/supabase/databaseProbe";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type { SupabaseDatabaseHealthResult } from "@/lib/supabase/databaseProbe";

/**
 * Read-only Supabase PostgreSQL / PostgREST connectivity check (server components & API routes).
 * Performs no inserts, updates, or DDL.
 */
export async function verifySupabaseDatabaseConnection() {
  return verifySupabaseDatabaseConnectionSafe(getSupabaseServerClient);
}
