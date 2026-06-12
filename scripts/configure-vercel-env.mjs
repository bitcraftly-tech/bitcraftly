/**
 * Sync production + staging env vars to Vercel (idempotent).
 *
 * Usage (PowerShell):
 *   $env:VERCEL_TOKEN="your_token"
 *   node scripts/configure-vercel-env.mjs
 *
 * Reads `.env.local` for secrets (auth, calendly, etc.) and applies production URL overrides.
 * Optional: `.env.production.local` for GA4_PROPERTY_ID, GOOGLE_SERVICE_ACCOUNT_JSON, Firebase, GSC.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const PROJECT_ID = "prj_TVZDDK6Ef0qKh4rW4pqp3wYrIh5c";
const TEAM_ID = "team_Glv1ZyRr0IgBU3YmiqJFxQY9";
const PROD_URL = "https://bitcraftly.com";
const API_URL = "https://api.bitcraftly.com";
const STAGING_DOMAIN = "staging.bitcraftly.com";
const STAGING_BRANCH = "development";

/** Known production GA4 measurement ID (also verified on live site). */
const PROD_GA4_MEASUREMENT_ID = "G-63X7GK86QK";

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

const fileEnv = parseEnvFile(resolve(ROOT, ".env.local"));
const VERCEL_TOKEN = process.env.VERCEL_TOKEN || fileEnv.VERCEL_TOKEN;

function loadEnv() {
  const local = fileEnv;
  const prodLocal = parseEnvFile(resolve(ROOT, ".env.production.local"));
  return { ...local, ...prodLocal };
}

function buildProductionEnv(source) {
  const pick = (...keys) => {
    for (const k of keys) {
      if (source[k]?.trim()) return source[k].trim();
    }
    return "";
  };

  const entries = {
    NEXT_PUBLIC_API_BASE_URL: API_URL,
    NEXT_PUBLIC_API_URL: API_URL,
    NEXT_PUBLIC_PUBLIC_BASE_URL: PROD_URL,
    NEXTAUTH_URL: PROD_URL,
    AUTH_API_BASE_URL: API_URL,
    NEXT_PUBLIC_GA4_MEASUREMENT_ID: pick("NEXT_PUBLIC_GA4_MEASUREMENT_ID") || PROD_GA4_MEASUREMENT_ID,
    GSC_SITE_URL: pick("GSC_SITE_URL") || `${PROD_URL}/`,
    ANALYTICS_LEAD_NOTIFY_EMAIL: pick("ANALYTICS_LEAD_NOTIFY_EMAIL") || "hello@bitcraftly.com",
    NEXT_PUBLIC_CALENDLY_URL: pick("NEXT_PUBLIC_CALENDLY_URL"),
    AUTH_SECRET: pick("AUTH_SECRET", "NEXTAUTH_SECRET"),
    AUTH_GOOGLE_ID: pick("AUTH_GOOGLE_ID"),
    AUTH_GOOGLE_SECRET: pick("AUTH_GOOGLE_SECRET"),
    AUTH_GOOGLE_SYNC_SECRET: pick("AUTH_GOOGLE_SYNC_SECRET"),
    NEXT_PUBLIC_GSC_VERIFICATION: pick("NEXT_PUBLIC_GSC_VERIFICATION"),
    GA4_PROPERTY_ID: pick("GA4_PROPERTY_ID"),
    GOOGLE_SERVICE_ACCOUNT_JSON: pick("GOOGLE_SERVICE_ACCOUNT_JSON"),
    FIREBASE_PROJECT_ID: pick("FIREBASE_PROJECT_ID"),
    FIREBASE_CLIENT_EMAIL: pick("FIREBASE_CLIENT_EMAIL"),
    FIREBASE_PRIVATE_KEY: pick("FIREBASE_PRIVATE_KEY"),
    PAGESPEED_API_KEY: pick("PAGESPEED_API_KEY"),
    RESEND_API_KEY: pick("RESEND_API_KEY"),
    NEXT_PUBLIC_FOUNDER_INTRO_YOUTUBE_ID: pick(
      "NEXT_PUBLIC_FOUNDER_INTRO_YOUTUBE_ID",
      "NEXT_PUBLIC_FOUNDER_INTRO_YOUTUBE_URL",
    ),
  };

  return Object.entries(entries).filter(([, v]) => Boolean(v));
}

const PREVIEW_ENV = [
  ["NEXT_PUBLIC_APP_ENV", "staging"],
  ["NEXT_PUBLIC_SITE_URL", `https://${STAGING_DOMAIN}`],
  ["NEXT_PUBLIC_PUBLIC_BASE_URL", `https://${STAGING_DOMAIN}`],
  ["NEXTAUTH_URL", `https://${STAGING_DOMAIN}`],
  ["NEXT_PUBLIC_API_BASE_URL", API_URL],
  ["NEXT_PUBLIC_API_URL", API_URL],
  ["AUTH_API_BASE_URL", API_URL],
];

if (!VERCEL_TOKEN) {
  console.log(
    "SKIP: VERCEL_TOKEN not set.\n" +
      "Create: https://vercel.com/account/settings/tokens\n" +
      'Then: $env:VERCEL_TOKEN="..."; npm run configure:production',
  );
  process.exit(0);
}

const vercelBase = `https://api.vercel.com/v10/projects/${PROJECT_ID}`;
const vercelHeaders = {
  Authorization: `Bearer ${VERCEL_TOKEN}`,
  "Content-Type": "application/json",
};

async function vercel(path, init = {}) {
  const sep = path.includes("?") ? "&" : "?";
  const url = `${vercelBase}${path}${sep}teamId=${TEAM_ID}`;
  const res = await fetch(url, { ...init, headers: { ...vercelHeaders, ...init.headers } });
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`Vercel ${init.method ?? "GET"} ${path}: ${res.status} ${JSON.stringify(body)}`);
  }
  return body;
}

async function listEnv() {
  const existing = await vercel("/env");
  return Array.isArray(existing?.envs) ? existing.envs : Array.isArray(existing) ? existing : [];
}

async function upsertEnv(key, value, target, { gitBranch, sensitive = false } = {}) {
  const list = await listEnv();
  const matches = list.filter((e) => {
    if (e.key !== key) return false;
    const targets = e.target ?? [];
    if (!targets.some((t) => target.includes(t))) return false;
    if (gitBranch && e.gitBranch && e.gitBranch !== gitBranch) return false;
    if (!gitBranch && e.gitBranch) return false;
    return true;
  });

  const body = {
    key,
    value,
    type: sensitive ? "encrypted" : "plain",
    target,
    ...(gitBranch ? { gitBranch } : {}),
  };

  if (matches.length) {
    const id = matches[0].id;
    await vercel(`/env/${id}`, { method: "PATCH", body: JSON.stringify({ value }) });
    console.log(`✓ Updated: ${key} → ${target.join(",")}${gitBranch ? ` (${gitBranch})` : ""}`);
    return;
  }

  await vercel("/env", { method: "POST", body: JSON.stringify(body) });
  console.log(`✓ Created: ${key} → ${target.join(",")}${gitBranch ? ` (${gitBranch})` : ""}`);
}

async function triggerProductionDeploy() {
  const body = {
    name: "bitcraftly-tech-v2",
    target: "production",
    gitSource: { type: "github", ref: "main" },
  };
  try {
    await fetch(`https://api.vercel.com/v13/deployments?teamId=${TEAM_ID}`, {
      method: "POST",
      headers: vercelHeaders,
      body: JSON.stringify(body),
    });
    console.log("✓ Triggered production redeploy");
  } catch {
    console.log("→ Redeploy manually: Vercel → Deployments → Redeploy");
  }
}

function reportMissing(source) {
  const optional = [
    ["NEXT_PUBLIC_GSC_VERIFICATION", "Search Console HTML verification token"],
    ["GA4_PROPERTY_ID", "GA4 numeric property ID (dashboard charts)"],
    ["GOOGLE_SERVICE_ACCOUNT_JSON", "Google Cloud service account JSON (GA4 + GSC APIs)"],
    ["FIREBASE_PROJECT_ID", "Firebase Firestore for leads"],
    ["FIREBASE_CLIENT_EMAIL", "Firebase admin SDK email"],
    ["FIREBASE_PRIVATE_KEY", "Firebase admin private key"],
    ["NEXT_PUBLIC_FOUNDER_INTRO_YOUTUBE_ID", "Founder intro YouTube video"],
    ["PAGESPEED_API_KEY", "Core Web Vitals panel (optional)"],
    ["RESEND_API_KEY", "Lead email alerts (optional)"],
  ];

  const missing = optional.filter(([k]) => !source[k]?.trim());
  if (!missing.length) return;

  console.log("\n— Still manual (add to .env.production.local, re-run) —");
  for (const [key, hint] of missing) {
    console.log(`  • ${key}: ${hint}`);
  }
}

async function main() {
  const source = loadEnv();
  const production = buildProductionEnv(source);

  console.log("Configuring Vercel env …\n");

  const sensitiveKeys = new Set([
    "AUTH_SECRET",
    "AUTH_GOOGLE_SECRET",
    "AUTH_GOOGLE_SYNC_SECRET",
    "GOOGLE_SERVICE_ACCOUNT_JSON",
    "FIREBASE_PRIVATE_KEY",
    "RESEND_API_KEY",
    "PAGESPEED_API_KEY",
  ]);

  for (const [key, value] of production) {
    await upsertEnv(key, value, ["production"], {
      sensitive: sensitiveKeys.has(key),
    });
  }

  for (const [key, value] of PREVIEW_ENV) {
    await upsertEnv(key, value, ["preview"], { gitBranch: STAGING_BRANCH });
  }

  reportMissing(source);
  await triggerProductionDeploy();

  console.log("\nDone.");
  console.log(`Production: ${PROD_URL}`);
  console.log(`Staging: https://${STAGING_DOMAIN}`);
  console.log("\nAdmin user: promote in Render PostgreSQL:");
  console.log("  UPDATE users SET role = 'admin' WHERE email = 'your@email.com';");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
