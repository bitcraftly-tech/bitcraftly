/**
 * Prepare sanitized Supabase users migration plan from verified source inspection.
 * Read-only — never writes Supabase data, never prints secrets or password hashes.
 *
 * Usage:
 *   node --import ./scripts/register-path-alias.mjs --experimental-strip-types scripts/prepare-users-migration.ts
 */
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const MANIFEST_DIR = path.join(process.cwd(), "storage", "database", ".supabase-migration");
const MANIFEST_PATH = path.join(MANIFEST_DIR, "users-plan.json");

const CANONICAL_ROLES = new Set(["admin", "manager", "staff", "user"]);

type SourceUser = {
  legacy_id: number;
  email: string;
  name: string | null;
  role: string;
  is_active: boolean;
  created_at: string | null;
};

type SourceVerification = {
  backend_environment: string;
  database_url_classification: {
    configured: boolean;
    scheme: string | null;
    is_sqlite: boolean;
    is_postgresql: boolean;
  };
  resolved_backend_db: string;
  local_sqlite: {
    count: number;
    users: SourceUser[];
  };
  render_postgresql: {
    reachable: boolean;
    reason_if_unreachable?: string;
    count: number | null;
    users: SourceUser[];
  };
  source_assessment: {
    sqlite_appears_local_dev_only: boolean;
    local_dev_email_indicators: string[];
    render_production_inspectable: boolean;
    can_verify_production_authoritative_source: boolean;
  };
};

type PlannedUser = {
  legacy_id: number;
  email: string;
  name: string | null;
  canonical_role: string;
  is_active: boolean;
  auth_provider: string;
  legacy_created_at: string | null;
};

function runSourceVerification(): SourceVerification {
  const result = spawnSync("python", ["scripts/verify_migration_source.py"], {
    cwd: process.cwd(),
    encoding: "utf8",
  });

  if (result.status !== 0) {
    console.error("FAIL — could not verify migration source.");
    if (result.stderr) console.error(result.stderr.trim());
    process.exit(1);
  }

  return JSON.parse(result.stdout) as SourceVerification;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function mapRole(role: string): string {
  const normalized = role.trim().toLowerCase();
  return CANONICAL_ROLES.has(normalized) ? normalized : "user";
}

function chooseAuthoritativeSource(verification: SourceVerification): {
  identifier: string;
  type: "render_postgresql" | "local_sqlite";
  authoritative: boolean;
  productionVerified: boolean;
  reason: string;
  users: SourceUser[];
} {
  const render = verification.render_postgresql;
  const sqlite = verification.local_sqlite;

  if (render.reachable && render.count !== null && render.users.length > 0) {
    return {
      identifier: "render_postgresql",
      type: "render_postgresql",
      authoritative: true,
      productionVerified: true,
      reason: "Render PostgreSQL is reachable and contains the current user records.",
      users: render.users,
    };
  }

  if (render.reachable && render.count === 0) {
    return {
      identifier: "render_postgresql",
      type: "render_postgresql",
      authoritative: true,
      productionVerified: true,
      reason: "Render PostgreSQL is reachable; source table is empty.",
      users: [],
    };
  }

  return {
    identifier: "local_sqlite",
    type: "local_sqlite",
    authoritative: false,
    productionVerified: false,
    reason:
      "Render PostgreSQL is not safely inspectable (DATABASE_URL is SQLite or unreachable). " +
      "Local SQLite appears to contain development-only users and cannot be treated as production.",
    users: sqlite.users,
  };
}

function buildManifestUsers(users: SourceUser[]): PlannedUser[] {
  return users.map((user) => ({
    legacy_id: user.legacy_id,
    email: normalizeEmail(user.email),
    name: user.name,
    canonical_role: mapRole(user.role),
    is_active: Boolean(user.is_active),
    auth_provider: "unknown",
    legacy_created_at: user.created_at,
  }));
}

function checksumUsers(users: PlannedUser[]): string {
  const stable = [...users].sort((a, b) => a.legacy_id - b.legacy_id);
  return createHash("sha256").update(JSON.stringify(stable)).digest("hex");
}

function summarize(users: PlannedUser[]) {
  const emails = new Map<string, number[]>();
  const legacyIds: number[] = [];
  const unsupportedRoles: Array<{ legacy_id: number; role: string }> = [];

  for (const user of users) {
    legacyIds.push(user.legacy_id);
    const ids = emails.get(user.email) ?? [];
    ids.push(user.legacy_id);
    emails.set(user.email, ids);
    if (!CANONICAL_ROLES.has(user.canonical_role)) {
      unsupportedRoles.push({ legacy_id: user.legacy_id, role: user.canonical_role });
    }
  }

  const duplicateEmails = [...emails.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([email, legacy_ids]) => ({ email, legacy_ids }));

  const duplicateLegacyIds = legacyIds.filter(
    (id, index) => legacyIds.indexOf(id) !== index,
  );

  return {
    total_source_users: users.length,
    duplicate_emails: duplicateEmails,
    duplicate_legacy_ids: [...new Set(duplicateLegacyIds)],
    unsupported_roles: unsupportedRoles,
    migration_ready_count: users.filter((u) => u.email.includes("@")).length,
  };
}

function main() {
  console.log("Preparing users migration plan (read-only)…");

  const verification = runSourceVerification();
  const chosen = chooseAuthoritativeSource(verification);
  const manifestUsers = buildManifestUsers(chosen.users);
  const summary = summarize(manifestUsers);

  fs.mkdirSync(MANIFEST_DIR, { recursive: true });

  const plan = {
    generated_at: new Date().toISOString(),
    phase: "4a-preparation",
    writes_supabase: false,
    includes_credentials: false,
    source: {
      identifier: chosen.identifier,
      type: chosen.type,
      authoritative: chosen.authoritative,
      production_verified: chosen.productionVerified,
      selection_reason: chosen.reason,
      backend_environment: verification.backend_environment,
      resolved_backend_db: verification.resolved_backend_db,
      local_sqlite_count: verification.local_sqlite.count,
      render_postgresql_count: verification.render_postgresql.count,
      render_reachable: verification.render_postgresql.reachable,
      render_unreachable_reason: verification.render_postgresql.reason_if_unreachable ?? null,
      sqlite_appears_local_dev_only: verification.source_assessment.sqlite_appears_local_dev_only,
      local_dev_email_indicators: verification.source_assessment.local_dev_email_indicators,
    },
    users_checksum: checksumUsers(manifestUsers),
    summary,
    users: manifestUsers,
  };

  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(plan, null, 2)}\n`, "utf8");

  console.log("PASS — migration plan written.");
  console.log("Authoritative source:", plan.source.identifier);
  console.log("Production verified:", plan.source.production_verified);
  console.log("Reason:", plan.source.selection_reason);
  console.log("Summary:", plan.summary);
  console.log(`Manifest: ${path.relative(process.cwd(), MANIFEST_PATH)}`);
  console.log(`Checksum: ${plan.users_checksum}`);
}

main();
