/**
 * Controlled Phase 4A users migration to Supabase.
 * Default: dry run only. Writes require explicit --apply.
 *
 * Usage:
 *   node --import ./scripts/register-path-alias.mjs --experimental-strip-types scripts/migrate-users-to-supabase.ts
 *   node --import ./scripts/register-path-alias.mjs --experimental-strip-types scripts/migrate-users-to-supabase.ts --apply
 */
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

import { getSupabaseCoreEnv } from "../lib/supabase/env.ts";
import {
  countUsersWithClient,
  getUserByEmailWithClient,
  getUserByLegacyIdWithClient,
  SupabaseUsersQueryError,
  USER_PUBLIC_COLUMNS,
  type SupabaseUserRow,
} from "../lib/supabase/usersQueries.ts";

const MANIFEST_DIR = path.join(process.cwd(), "storage", "database", ".supabase-migration");
const PLAN_PATH = path.join(MANIFEST_DIR, "users-plan.json");
const MIGRATED_PATH = path.join(MANIFEST_DIR, "users-migrated.json");

const CANONICAL_ROLES = new Set(["admin", "manager", "staff", "user"]);
const FORBIDDEN_FIELDS = new Set([
  "password_hash",
  "password",
  "access_token",
  "refresh_token",
  "jwt",
  "token",
  "secret",
  "hash",
  "credentials",
]);

type PlannedUser = {
  legacy_id: number;
  email: string;
  name: string | null;
  canonical_role: string;
  is_active: boolean;
  auth_provider: string;
  legacy_created_at: string | null;
};

type MigrationPlan = {
  generated_at: string;
  phase: string;
  users_checksum: string;
  source: {
    identifier: string;
    type: "render_postgresql" | "local_sqlite";
    authoritative: boolean;
    production_verified: boolean;
    selection_reason: string;
    local_sqlite_count: number;
    render_postgresql_count: number | null;
    render_reachable: boolean;
    sqlite_appears_local_dev_only?: boolean;
  };
  summary: {
    duplicate_emails: Array<{ email: string; legacy_ids: number[] }>;
    duplicate_legacy_ids: number[];
    unsupported_roles: Array<{ legacy_id: number; role: string }>;
  };
  users: PlannedUser[];
};

type InsertPayload = {
  legacy_id: number;
  email: string;
  name: string | null;
  role: string;
  is_active: boolean;
  auth_provider: string | null;
  legacy_created_at: string | null;
};

type ValidationIssue = {
  code: string;
  message: string;
  legacy_id?: number;
  email?: string;
};

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

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    apply: args.includes("--apply"),
    confirmLocalDevSource: args.includes("--confirm-local-dev-source"),
  };
}

function createServerClient(): SupabaseClient {
  const { url, secretKey } = getSupabaseCoreEnv();
  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function checksumUsers(users: PlannedUser[]): string {
  const stable = [...users].sort((a, b) => a.legacy_id - b.legacy_id);
  return createHash("sha256").update(JSON.stringify(stable)).digest("hex");
}

function loadPlan(): MigrationPlan {
  if (!fs.existsSync(PLAN_PATH)) {
    throw new Error("missing_users_plan");
  }
  return JSON.parse(fs.readFileSync(PLAN_PATH, "utf8")) as MigrationPlan;
}

function runLiveSourceVerification() {
  const result = spawnSync("python", ["scripts/verify_migration_source.py"], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  if (result.status !== 0) {
    throw new Error("source_verification_failed");
  }

  const payload = JSON.parse(result.stdout) as {
    local_sqlite: { count: number; users: Array<Record<string, unknown>> };
    render_postgresql: { reachable: boolean; count: number | null; users: Array<Record<string, unknown>> };
    source_assessment: { can_verify_production_authoritative_source: boolean };
  };

  const mapUsers = (rows: Array<Record<string, unknown>>): PlannedUser[] =>
    rows.map((row) => ({
      legacy_id: Number(row.legacy_id),
      email: String(row.email).trim().toLowerCase(),
      name: row.name ? String(row.name) : null,
      canonical_role: String(row.role).trim().toLowerCase(),
      is_active: Boolean(row.is_active),
      auth_provider: "unknown",
      legacy_created_at: row.created_at ? String(row.created_at) : null,
    }));

  return {
    local_sqlite_count: payload.local_sqlite.count,
    render_postgresql_count: payload.render_postgresql.count,
    render_reachable: payload.render_postgresql.reachable,
    production_verified: payload.source_assessment.can_verify_production_authoritative_source,
    sqlite_users: mapUsers(payload.local_sqlite.users),
    render_users: mapUsers(payload.render_postgresql.users),
  };
}

function isValidEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return normalized.includes("@") && normalized.length >= 3;
}

function findForbiddenFields(user: Record<string, unknown>): string[] {
  return Object.keys(user).filter((key) => FORBIDDEN_FIELDS.has(key.toLowerCase()));
}

function validatePlannedUsers(users: PlannedUser[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const user of users) {
    for (const field of findForbiddenFields(user as unknown as Record<string, unknown>)) {
      issues.push({
        code: "forbidden_field",
        message: `Forbidden field present in plan: ${field}`,
        legacy_id: user.legacy_id,
        email: user.email,
      });
    }

    if (!Number.isInteger(user.legacy_id) || user.legacy_id <= 0) {
      issues.push({
        code: "invalid_legacy_id",
        message: "legacy_id must be a positive integer",
        legacy_id: user.legacy_id,
        email: user.email,
      });
    }

    if (!isValidEmail(user.email)) {
      issues.push({
        code: "invalid_email",
        message: "email is invalid",
        legacy_id: user.legacy_id,
        email: user.email,
      });
    }

    if (!CANONICAL_ROLES.has(user.canonical_role)) {
      issues.push({
        code: "unsupported_role",
        message: `unsupported role: ${user.canonical_role}`,
        legacy_id: user.legacy_id,
        email: user.email,
      });
    }

    if (typeof user.is_active !== "boolean") {
      issues.push({
        code: "invalid_is_active",
        message: "is_active must be boolean",
        legacy_id: user.legacy_id,
        email: user.email,
      });
    }
  }

  return issues;
}

function toInsertPayload(user: PlannedUser): InsertPayload {
  return {
    legacy_id: user.legacy_id,
    email: user.email.trim().toLowerCase(),
    name: user.name,
    role: user.canonical_role,
    is_active: user.is_active,
    auth_provider: user.auth_provider === "unknown" ? null : user.auth_provider,
    legacy_created_at: user.legacy_created_at,
  };
}

async function findTargetConflicts(
  client: SupabaseClient,
  users: PlannedUser[],
): Promise<ValidationIssue[]> {
  const conflicts: ValidationIssue[] = [];

  for (const user of users) {
    const byEmail = await getUserByEmailWithClient(client, user.email);
    if (byEmail) {
      conflicts.push({
        code: "target_email_exists",
        message: "Supabase already contains this email",
        legacy_id: user.legacy_id,
        email: user.email,
      });
    }

    const byLegacy = await getUserByLegacyIdWithClient(client, user.legacy_id);
    if (byLegacy) {
      conflicts.push({
        code: "target_legacy_id_exists",
        message: "Supabase already contains this legacy_id",
        legacy_id: user.legacy_id,
        email: user.email,
      });
    }
  }

  return conflicts;
}

async function insertUser(
  client: SupabaseClient,
  payload: InsertPayload,
): Promise<SupabaseUserRow> {
  const { data, error } = await client
    .from("users")
    .insert(payload)
    .select(USER_PUBLIC_COLUMNS)
    .single();

  if (error) {
    throw new SupabaseUsersQueryError("insert_user", {
      code: typeof error.code === "string" ? error.code : undefined,
      message: typeof error.message === "string" ? error.message : "insert_failed",
      details: typeof error.details === "string" ? error.details : undefined,
      hint: typeof error.hint === "string" ? error.hint : undefined,
    });
  }

  return data as SupabaseUserRow;
}

function compareField(label: string, expected: unknown, actual: unknown): ValidationIssue | null {
  const exp = expected ?? null;
  const act = actual ?? null;
  if (String(exp) !== String(act)) {
    return {
      code: "verification_mismatch",
      message: `${label} mismatch: expected ${String(exp)}, got ${String(act)}`,
    };
  }
  return null;
}

async function verifyMigratedRows(
  client: SupabaseClient,
  planned: PlannedUser[],
): Promise<ValidationIssue[]> {
  const issues: ValidationIssue[] = [];

  for (const user of planned) {
    const row = await getUserByLegacyIdWithClient(client, user.legacy_id);
    if (!row) {
      issues.push({
        code: "missing_migrated_row",
        message: "Migrated row not found by legacy_id",
        legacy_id: user.legacy_id,
        email: user.email,
      });
      continue;
    }

    for (const mismatch of [
      compareField("email", user.email, row.email),
      compareField("name", user.name, row.name),
      compareField("role", user.canonical_role, row.role),
      compareField("is_active", user.is_active, row.is_active),
      compareField(
        "auth_provider",
        user.auth_provider === "unknown" ? null : user.auth_provider,
        row.auth_provider,
      ),
      compareField("legacy_created_at", user.legacy_created_at, row.legacy_created_at),
    ]) {
      if (mismatch) {
        mismatch.legacy_id = user.legacy_id;
        mismatch.email = user.email;
        issues.push(mismatch);
      }
    }
  }

  return issues;
}

async function runMigration(): Promise<number> {
  loadEnvLocal();
  const { apply, confirmLocalDevSource } = parseArgs();
  const mode = apply ? "apply" : "dry_run";

  console.log(`Supabase users migration (${mode})`);

  const plan = loadPlan();
  const liveSource = runLiveSourceVerification();
  const client = createServerClient();

  const validationIssues: ValidationIssue[] = [];
  const forbiddenFieldsFound = new Set<string>();

  if (checksumUsers(plan.users) !== plan.users_checksum) {
    validationIssues.push({
      code: "checksum_mismatch",
      message: "Plan checksum does not match users payload",
    });
  }

  validationIssues.push(...validatePlannedUsers(plan.users));

  for (const user of plan.users) {
    for (const field of findForbiddenFields(user as unknown as Record<string, unknown>)) {
      forbiddenFieldsFound.add(field);
    }
  }

  let applyBlockedReason: string | null = null;

  if (!plan.source.production_verified) {
    applyBlockedReason =
      "Production Render PostgreSQL source is not verified. Configure backend DATABASE_URL to production PostgreSQL and regenerate the plan.";
  }

  if (plan.source.type === "local_sqlite" && plan.source.authoritative !== true) {
    if (!confirmLocalDevSource) {
      applyBlockedReason =
        applyBlockedReason ??
        "Local SQLite is not an approved authoritative source. Use --confirm-local-dev-source only after explicit human approval.";
    }
  }

  const liveUsers =
    plan.source.type === "render_postgresql" ? liveSource.render_users : liveSource.sqlite_users;
  if (checksumUsers(liveUsers) !== plan.users_checksum) {
    validationIssues.push({
      code: "source_changed_since_plan",
      message: "Live source users no longer match the approved plan checksum",
    });
  }

  const supabaseUsersBefore = await countUsersWithClient(client);
  if (supabaseUsersBefore !== 0) {
    validationIssues.push({
      code: "unexpected_supabase_rows",
      message: `Expected 0 Supabase users before migration, found ${supabaseUsersBefore}`,
    });
  }

  const targetConflicts = await findTargetConflicts(client, plan.users);
  validationIssues.push(...targetConflicts);

  const duplicateEmails = plan.summary.duplicate_emails.length;
  const duplicateLegacyIds = plan.summary.duplicate_legacy_ids.length;
  const unsupportedRoles = plan.summary.unsupported_roles.length;

  if (duplicateEmails > 0) {
    validationIssues.push({ code: "duplicate_emails", message: "Duplicate emails in plan" });
  }
  if (duplicateLegacyIds > 0) {
    validationIssues.push({ code: "duplicate_legacy_ids", message: "Duplicate legacy IDs in plan" });
  }
  if (unsupportedRoles > 0) {
    validationIssues.push({ code: "unsupported_roles", message: "Unsupported roles in plan" });
  }

  const dryRunClean = validationIssues.length === 0 && applyBlockedReason === null;
  const applyCommand =
    "node --import ./scripts/register-path-alias.mjs --experimental-strip-types scripts/migrate-users-to-supabase.ts --apply";

  console.log("Authoritative source:", plan.source.identifier);
  console.log("Production verified:", plan.source.production_verified);
  console.log("Reason:", plan.source.selection_reason);
  console.log("Local SQLite count:", liveSource.local_sqlite_count);
  console.log("Render PostgreSQL count:", liveSource.render_postgresql_count ?? "unavailable");
  console.log("Source users approved:", plan.users.length);
  console.log("Supabase users before:", supabaseUsersBefore);
  console.log("Planned inserts:", plan.users.length);
  console.log("Duplicate emails:", duplicateEmails);
  console.log("Duplicate legacy IDs:", duplicateLegacyIds);
  console.log("Unsupported roles:", unsupportedRoles);
  console.log("Forbidden fields found:", forbiddenFieldsFound.size);
  console.log("Target conflicts:", targetConflicts.length);
  console.log("Validation issues:", validationIssues.length);
  if (applyBlockedReason) {
    console.log("Apply blocked:", applyBlockedReason);
  }

  if (!apply) {
    console.log("Dry run result:", dryRunClean ? "CLEAN" : "BLOCKED");
    console.log("Exact apply command:", applyCommand);
    if (!dryRunClean || applyBlockedReason) {
      console.error("FAIL — dry run is not clean; migration not applied.");
      return 1;
    }
    console.log("PASS — dry run clean. Re-run with --apply to insert approved users.");
    return 0;
  }

  if (!dryRunClean || applyBlockedReason) {
    console.error("FAIL — apply blocked by validation or source verification.");
    return 1;
  }

  let usersInserted = 0;
  let failedInserts = 0;
  const migratedEntries: Array<Record<string, unknown>> = [];

  for (const user of plan.users) {
    try {
      await insertUser(client, toInsertPayload(user));
      usersInserted += 1;
      migratedEntries.push({
        legacy_id: user.legacy_id,
        email: user.email,
        role: user.canonical_role,
        source: plan.source.identifier,
        migration_status: "inserted",
        migrated_at: new Date().toISOString(),
        verification_status: "pending",
      });
    } catch (error) {
      failedInserts += 1;
      const message =
        error instanceof SupabaseUsersQueryError
          ? `${error.operation}:${error.sanitized.code ?? "unknown"}:${error.sanitized.message ?? "unknown"}`
          : error instanceof Error
            ? error.message
            : "insert_failed";
      console.error("Insert failed:", message);
      break;
    }
  }

  const supabaseUsersAfter = await countUsersWithClient(client);
  const verificationIssues = await verifyMigratedRows(
    client,
    plan.users.slice(0, usersInserted),
  );

  for (const entry of migratedEntries) {
    entry.verification_status =
      verificationIssues.length === 0 ? "verified" : "verification_failed";
  }

  fs.mkdirSync(MANIFEST_DIR, { recursive: true });
  fs.writeFileSync(
    MIGRATED_PATH,
    `${JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        phase: "4a-applied",
        source: plan.source.identifier,
        users_inserted: usersInserted,
        failed_inserts: failedInserts,
        verification_issues: verificationIssues,
        entries: migratedEntries,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  console.log("Supabase users after:", supabaseUsersAfter);

  if (failedInserts > 0 || verificationIssues.length > 0) {
    console.error("FAIL — migration incomplete or verification failed.");
    return 1;
  }

  console.log("PASS — users migrated and verified.");
  console.log(`Manifest: ${path.relative(process.cwd(), MIGRATED_PATH)}`);
  return 0;
}

runMigration()
  .then((code) => {
    setImmediate(() => process.exit(code));
  })
  .catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error("FAIL — migration error:", message);
    setImmediate(() => process.exit(1));
  });
