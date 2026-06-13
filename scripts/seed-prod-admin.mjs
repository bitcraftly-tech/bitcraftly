/**
 * Create or update a production admin user via the protected seed-admin API.
 *
 * Usage (PowerShell):
 *   $env:AUTH_GOOGLE_SYNC_SECRET="your_shared_secret"
 *   node scripts/seed-prod-admin.mjs
 *
 * Optional overrides:
 *   API_BASE_URL=https://bitcraftly-api.onrender.com
 *   SEED_ADMIN_EMAIL=analytics.test@bitcraftly.com
 *   SEED_ADMIN_PASSWORD=Bitcraftly@Analytics2026
 *   SEED_ADMIN_NAME=Analytics Test Admin
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

function parseEnvFile(path) {
  const out = {};
  if (!existsSync(path)) return out;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

const localEnv = {
  ...parseEnvFile(resolve(ROOT, ".env.example")),
  ...parseEnvFile(resolve(ROOT, ".env.local")),
  ...parseEnvFile(resolve(ROOT, "backend/.env")),
};

const API_BASE = (process.env.API_BASE_URL || localEnv.AUTH_API_BASE_URL || "https://bitcraftly-api.onrender.com").replace(/\/$/, "");
const SYNC_SECRET = process.env.AUTH_GOOGLE_SYNC_SECRET || localEnv.AUTH_GOOGLE_SYNC_SECRET || "";
const EMAIL = process.env.SEED_ADMIN_EMAIL || "analytics.test@bitcraftly.com";
const PASSWORD = process.env.SEED_ADMIN_PASSWORD || "Bitcraftly@Analytics2026";
const NAME = process.env.SEED_ADMIN_NAME || "Analytics Test Admin";

if (!SYNC_SECRET) {
  console.error("Missing AUTH_GOOGLE_SYNC_SECRET. Set it in .env.local or pass as env var.");
  process.exit(1);
}

async function wakeApi() {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(60_000) });
      const body = await res.json().catch(() => ({}));
      console.log(`Health [${attempt}]: ${res.status}`, body);
      if (res.ok) return true;
    } catch (err) {
      console.log(`Health [${attempt}] failed:`, err.message);
    }
    await new Promise((r) => setTimeout(r, 5000));
  }
  return false;
}

async function main() {
  console.log(`API: ${API_BASE}`);
  console.log(`Admin email: ${EMAIL}`);

  const awake = await wakeApi();
  if (!awake) {
    console.error("API not reachable. Wake Render service first, then rerun this script.");
    process.exit(1);
  }

  const res = await fetch(`${API_BASE}/api/auth/seed-admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-google-sync-secret": SYNC_SECRET,
    },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD, name: NAME }),
    signal: AbortSignal.timeout(60_000),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("seed-admin failed:", res.status, data);
    process.exit(1);
  }

  console.log("✓ Admin user ready");
  console.log(`  Email:    ${EMAIL}`);
  console.log(`  Password: ${PASSWORD}`);
  console.log(`  Role:     ${data.user?.role ?? "admin"}`);
  console.log("\nLogin at https://bitcraftly.com/login then open /dashboard/analytics");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
