/**
 * Verify Phase 3 Supabase users foundation (read-only).
 *
 * Usage:
 *   node --import ./scripts/register-path-alias.mjs --experimental-strip-types scripts/verify-supabase-users-foundation.ts
 */
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

import { getSupabaseCoreEnv } from "../lib/supabase/env.ts";
import {
  countUsersWithClient,
  getUserByEmailWithClient,
  getUserByLegacyIdWithClient,
  SupabaseUsersQueryError,
} from "../lib/supabase/usersQueries.ts";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function createServerClient() {
  const { url, secretKey } = getSupabaseCoreEnv();
  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function logQueryError(error: unknown) {
  if (error instanceof SupabaseUsersQueryError) {
    console.error("operation:", error.operation);
    console.error("postgrest_code:", error.sanitized.code ?? "unknown");
    console.error("postgrest_message:", error.sanitized.message ?? "unknown");
    if (error.sanitized.details) {
      console.error("postgrest_details:", error.sanitized.details);
    }
    if (error.sanitized.hint) {
      console.error("postgrest_hint:", error.sanitized.hint);
    }
    return;
  }

  const message = error instanceof Error ? error.message : String(error);
  console.error("verification_error:", message);
}

async function verifyAnonymousBlocked(url: string): Promise<{ ok: boolean; detail: string }> {
  const anonKey = `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""}`.trim();
  if (!anonKey) {
    return { ok: true, detail: "skipped_no_anon_key_configured" };
  }

  const anonClient = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await anonClient.from("users").select("id").limit(1);

  if (error) {
    return { ok: true, detail: "anon_blocked_by_error" };
  }

  if (!data || data.length === 0) {
    return { ok: true, detail: "anon_returns_empty" };
  }

  return { ok: false, detail: "anon_read_unexpected_rows" };
}

async function verify(): Promise<number> {
  loadEnvLocal();

  console.log("Supabase users foundation verification");

  const { url } = getSupabaseCoreEnv();
  const client = createServerClient();

  const userCount = await countUsersWithClient(client);
  console.log("users_row_count:", userCount);

  if (userCount !== 0) {
    console.error("FAIL — expected zero rows in public.users.");
    return 1;
  }

  const missingEmail = await getUserByEmailWithClient(
    client,
    "__foundation_probe__@invalid.local",
  );
  console.log("email_lookup:", missingEmail === null ? "null" : "unexpected_row");
  if (missingEmail !== null) {
    console.error("FAIL — unexpected probe user row by email.");
    return 1;
  }

  const missingLegacy = await getUserByLegacyIdWithClient(client, 9_000_000_001);
  console.log("legacy_id_lookup:", missingLegacy === null ? "null" : "unexpected_row");
  if (missingLegacy !== null) {
    console.error("FAIL — unexpected probe user row by legacy_id.");
    return 1;
  }

  const anon = await verifyAnonymousBlocked(url);
  console.log("anonymous_read:", anon);

  if (!anon.ok) {
    console.error("FAIL — anonymous access to users is not blocked.");
    return 1;
  }

  console.log("PASS — Supabase users foundation verified.");
  return 0;
}

verify()
  .then((code) => {
    setImmediate(() => process.exit(code));
  })
  .catch((error) => {
    logQueryError(error);
    console.error("FAIL — verification error.");
    console.error(
      "Hint: apply migrations first — python scripts/apply_supabase_migrations.py (requires SUPABASE_DB_URL).",
    );
    setImmediate(() => process.exit(1));
  });
