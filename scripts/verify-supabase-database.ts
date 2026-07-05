/**
 * Read-only Supabase PostgreSQL / PostgREST connectivity verification.
 *
 * Usage:
 *   node --import ./scripts/register-path-alias.mjs --experimental-strip-types scripts/verify-supabase-database.ts
 */
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

import { verifySupabaseDatabaseConnectionSafe } from "../lib/supabase/databaseProbe.ts";
import { getSupabaseCoreEnv } from "../lib/supabase/env.ts";

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

function maskEnvPresence() {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}`.trim();
  const secret = `${process.env.SUPABASE_SECRET_KEY ?? ""}`.trim();

  return {
    NEXT_PUBLIC_SUPABASE_URL: url ? "set" : "missing",
    SUPABASE_SECRET_KEY: secret ? "set" : "missing",
  };
}

async function main() {
  loadEnvLocal();

  console.log("Supabase database verification (read-only)");
  console.log("Environment:", maskEnvPresence());

  try {
    getSupabaseCoreEnv();
  } catch {
    console.error("FAIL — required Supabase env variables are not configured.");
    process.exit(1);
  }

  const result = await verifySupabaseDatabaseConnectionSafe(() => {
    const { url, secretKey } = getSupabaseCoreEnv();
    return createClient(url, secretKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  });

  if (result.ok) {
    console.log("PASS — Supabase PostgREST reachable with server credentials.");
    process.exit(0);
  }

  console.error(`FAIL — reason: ${result.reason}`);
  process.exit(1);
}

main().catch(() => {
  console.error("FAIL — unexpected verification error.");
  process.exit(1);
});
