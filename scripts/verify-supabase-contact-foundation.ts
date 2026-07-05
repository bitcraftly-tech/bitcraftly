/**
 * Verify Phase 4C Supabase contact_submissions foundation.
 *
 * Usage:
 *   node --import ./scripts/register-path-alias.mjs --experimental-strip-types scripts/verify-supabase-contact-foundation.ts
 */
import { createClient } from "@supabase/supabase-js";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { getSupabaseCoreEnv } from "../lib/supabase/env.ts";
import {
  countContactSubmissionsWithClient,
  createContactSubmissionWithClient,
  deleteContactSubmissionWithClient,
  getContactSubmissionByIdWithClient,
  markContactSubmissionContactedWithClient,
  SupabaseContactQueryError,
  updateContactSubmissionMetaWithClient,
  updateContactSubmissionNotesWithClient,
} from "../lib/supabase/contactQueries.ts";
import { countUsersWithClient } from "../lib/supabase/usersQueries.ts";

const VERIFICATION_EMAIL = "__phase4c_contact_verify__@invalid.local";
const VERIFICATION_SOURCE = "__phase4c_synthetic_verification__";

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

function inspectCatalog() {
  const result = spawnSync("python", ["scripts/inspect_contact_submissions_catalog.py"], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  if (result.status !== 0) {
    console.error("FAIL — could not inspect contact_submissions catalog.");
    if (result.stderr) console.error(result.stderr.trim());
    return null;
  }
  return JSON.parse(result.stdout) as {
    table_exists: boolean;
    rls_enabled: boolean;
    policy_count: number;
    stage_constraint: boolean;
    index_count: number;
  };
}

async function verify(): Promise<number> {
  loadEnvLocal();
  console.log("Supabase contact_submissions foundation verification");

  const client = createServerClient();
  const catalog = inspectCatalog();

  console.log("catalog:", catalog);
  if (!catalog?.table_exists) {
    console.error("FAIL — public.contact_submissions does not exist.");
    return 1;
  }

  const usersCount = await countUsersWithClient(client);
  console.log("public.users row count:", usersCount);
  if (usersCount !== 0) {
    console.error("FAIL — expected public.users count to remain 0.");
    return 1;
  }

  const initialCount = await countContactSubmissionsWithClient(client);
  console.log("initial contact_submissions count:", initialCount);

  let createdId: string | null = null;
  try {
    const created = await createContactSubmissionWithClient(client, {
      name: "Phase 4C Verify",
      business_name: "Synthetic Verification Co",
      business_type: "Other",
      phone: "9999999999",
      email: VERIFICATION_EMAIL,
      message: "Synthetic verification row — safe to delete",
      source: VERIFICATION_SOURCE,
    });
    createdId = created.id;
    console.log("create: ok", createdId);

    const fetched = await getContactSubmissionByIdWithClient(client, createdId);
    if (!fetched || fetched.source !== VERIFICATION_SOURCE) {
      console.error("FAIL — could not read back verification row.");
      return 1;
    }
    console.log("read: ok");

    await updateContactSubmissionNotesWithClient(client, createdId, "verification notes updated");
    await updateContactSubmissionMetaWithClient(client, createdId, "in_progress", "verify-bot");
    await markContactSubmissionContactedWithClient(client, createdId);

    const updated = await getContactSubmissionByIdWithClient(client, createdId);
    if (
      !updated ||
      updated.notes !== "verification notes updated" ||
      updated.stage !== "in_progress" ||
      updated.assigned_to !== "verify-bot" ||
      !updated.is_contacted
    ) {
      console.error("FAIL — updated values mismatch.", updated);
      return 1;
    }
    console.log("update: ok");

    const deleted = await deleteContactSubmissionWithClient(client, createdId);
    if (!deleted) {
      console.error("FAIL — verification row delete failed.");
      return 1;
    }
    createdId = null;
    console.log("delete: ok");
  } catch (error) {
    if (error instanceof SupabaseContactQueryError) {
      console.error("operation:", error.operation);
      console.error("postgrest_code:", error.sanitized.code ?? "unknown");
      console.error("postgrest_message:", error.sanitized.message ?? "unknown");
    } else {
      console.error("verification_error:", error instanceof Error ? error.message : String(error));
    }
    return 1;
  } finally {
    if (createdId) {
      await deleteContactSubmissionWithClient(client, createdId).catch(() => undefined);
    }
  }

  const finalCount = await countContactSubmissionsWithClient(client);
  console.log("final contact_submissions count:", finalCount);
  if (finalCount !== initialCount) {
    console.error("FAIL — final row count does not match initial count.");
    return 1;
  }

  const secretImportScan = [
    "lib/supabase/contacts.ts",
    "app/contact/ContactContent.tsx",
    "hooks/useDashboardQueries.ts",
  ];
  for (const file of secretImportScan) {
    const content = fs.readFileSync(path.join(process.cwd(), file), "utf8");
    if (content.includes("SUPABASE_SECRET_KEY") || content.includes("createClient(")) {
      if (file !== "lib/supabase/contacts.ts") {
        console.error(`FAIL — potential client-side secret usage in ${file}`);
        return 1;
      }
    }
  }
  console.log("secret exposure scan: ok (server-only Supabase modules)");

  console.log("PASS — Supabase contact_submissions foundation verified.");
  return 0;
}

verify()
  .then((code) => {
    setImmediate(() => process.exit(code));
  })
  .catch((error) => {
    console.error("FAIL — verification error:", error instanceof Error ? error.message : String(error));
    setImmediate(() => process.exit(1));
  });
