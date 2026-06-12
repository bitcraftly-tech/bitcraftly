/**
 * One-shot staging setup for staging.bitcraftly.com
 *
 * Usage (PowerShell):
 *   $env:VERCEL_TOKEN="your_token"
 *   node scripts/setup-staging-live.mjs
 *
 * Optional — auto DNS if domain uses Cloudflare:
 *   $env:CLOUDFLARE_API_TOKEN="your_cf_token"
 */

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const PROJECT_ID = "prj_TVZDDK6Ef0qKh4rW4pqp3wYrIh5c";
const TEAM_ID = "team_Glv1ZyRr0IgBU3YmiqJFxQY9";
const DOMAIN = "staging.bitcraftly.com";
const BRANCH = "development";
const ZONE = "bitcraftly.com";

const PREVIEW_ENV = [
  ["NEXT_PUBLIC_APP_ENV", "staging"],
  ["NEXT_PUBLIC_SITE_URL", `https://${DOMAIN}`],
  ["NEXT_PUBLIC_PUBLIC_BASE_URL", `https://${DOMAIN}`],
  ["NEXTAUTH_URL", `https://${DOMAIN}`],
];

if (!VERCEL_TOKEN) {
  console.error(
    "Missing VERCEL_TOKEN.\n" +
      "Create one: https://vercel.com/account/settings/tokens\n" +
      'Then: $env:VERCEL_TOKEN="..."; node scripts/setup-staging-live.mjs'
  );
  process.exit(1);
}

const vercelBase = `https://api.vercel.com/v10/projects/${PROJECT_ID}`;
const vercelHeaders = {
  Authorization: `Bearer ${VERCEL_TOKEN}`,
  "Content-Type": "application/json",
};

async function vercel(path, init = {}) {
  const url = `${vercelBase}${path}${path.includes("?") ? "&" : "?"}teamId=${TEAM_ID}`;
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

async function ensureDomain() {
  const domains = await vercel("/domains");
  const list = domains.domains ?? domains;
  const existing = Array.isArray(list) ? list.find((d) => d.name === DOMAIN) : null;

  if (existing) {
    console.log(`✓ Domain already on project: ${DOMAIN}`);
    if (existing.gitBranch !== BRANCH) {
      await vercel(`/domains/${DOMAIN}`, {
        method: "PATCH",
        body: JSON.stringify({ gitBranch: BRANCH }),
      });
      console.log(`✓ Assigned ${DOMAIN} → branch ${BRANCH}`);
    }
    return;
  }

  await vercel("/domains", {
    method: "POST",
    body: JSON.stringify({ name: DOMAIN, gitBranch: BRANCH }),
  });
  console.log(`✓ Added domain ${DOMAIN} → branch ${BRANCH}`);
}

async function ensureEnvVars() {
  const existing = await vercel("/env");
  const list = Array.isArray(existing?.envs) ? existing.envs : Array.isArray(existing) ? existing : [];

  for (const [key, value] of PREVIEW_ENV) {
    const found = list.find((e) => e.key === key && e.target?.includes("preview"));
    if (found) {
      console.log(`✓ Env exists: ${key}`);
      continue;
    }
    await vercel("/env", {
      method: "POST",
      body: JSON.stringify({
        key,
        value,
        type: "plain",
        target: ["preview"],
        gitBranch: BRANCH,
      }),
    });
    console.log(`✓ Created env: ${key}`);
  }
}

async function cloudflareDns() {
  if (!CF_TOKEN) {
    console.log("\n— Add this DNS record at your domain registrar (Namecheap / Advanced DNS) —");
    console.log(`  Type:   CNAME`);
    console.log(`  Host:   staging`);
    console.log(`  Value:  cname.vercel-dns.com`);
    console.log(`  Then wait 5–30 min and open https://${DOMAIN}`);
    return;
  }

  const zonesRes = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${ZONE}`, {
    headers: { Authorization: `Bearer ${CF_TOKEN}` },
  });
  const zones = await zonesRes.json();
  const zoneId = zones.result?.[0]?.id;
  if (!zoneId) {
    console.log("Cloudflare zone not found — add CNAME manually (see above).");
    return;
  }

  const recordsRes = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?type=CNAME&name=${DOMAIN}`,
    { headers: { Authorization: `Bearer ${CF_TOKEN}` } }
  );
  const records = await recordsRes.json();
  if (records.result?.length) {
    console.log("✓ Cloudflare CNAME already exists");
    return;
  }

  await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "CNAME",
      name: "staging",
      content: "cname.vercel-dns.com",
      proxied: true,
    }),
  });
  console.log("✓ Cloudflare CNAME created: staging → cname.vercel-dns.com");
}

async function main() {
  console.log("Setting up staging.bitcraftly.com …\n");
  await ensureDomain();
  await ensureEnvVars();
  await cloudflareDns();
  console.log(`\nDone. After DNS propagates (5–30 min): https://${DOMAIN}`);
  console.log("Redeploy development branch if needed: git push origin development");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
