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
  console.log(
    "SKIP: VERCEL_TOKEN not set.\n" +
      "One-time: GitHub → Settings → Secrets → VERCEL_TOKEN\n" +
      "https://vercel.com/account/settings/tokens"
  );
  process.exit(0);
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

/** Namecheap API — run from a machine whose IP is whitelisted in Namecheap */
async function namecheapDns() {
  const apiUser = process.env.NAMECHEAP_API_USER;
  const apiKey = process.env.NAMECHEAP_API_KEY;
  const clientIp = process.env.NAMECHEAP_CLIENT_IP;
  const userName = process.env.NAMECHEAP_USERNAME ?? apiUser;

  if (!apiUser || !apiKey || !clientIp) return false;

  const base = "https://api.namecheap.com/xml.response";
  const common = new URLSearchParams({
    ApiUser: apiUser,
    ApiKey: apiKey,
    UserName: userName,
    ClientIp: clientIp,
  });

  const getUrl = `${base}?${common}&Command=namecheap.domains.dns.getHosts&SLD=bitcraftly&TLD=com`;
  const getRes = await fetch(getUrl);
  const getXml = await getRes.text();

  if (getXml.includes('Name="staging"')) {
    console.log("✓ Namecheap CNAME staging already exists");
    return true;
  }

  const hosts = [];
  const hostRe = /<host\s([^>]+)\/>/g;
  let m;
  while ((m = hostRe.exec(getXml))) {
    const attrs = m[1];
    const pick = (k) => attrs.match(new RegExp(`${k}="([^"]*)"`))?.[1] ?? "";
    hosts.push({
      HostName: pick("Name"),
      RecordType: pick("Type"),
      Address: pick("Address"),
      MXPref: pick("MXPref") || "10",
      TTL: pick("TTL") || "1800",
    });
  }

  hosts.push({
    HostName: "staging",
    RecordType: "CNAME",
    Address: "cname.vercel-dns.com.",
    MXPref: "10",
    TTL: "1800",
  });

  const setParams = new URLSearchParams(common);
  setParams.set("Command", "namecheap.domains.dns.setHosts");
  setParams.set("SLD", "bitcraftly");
  setParams.set("TLD", "com");
  hosts.forEach((h, i) => {
    const n = i + 1;
    setParams.set(`HostName${n}`, h.HostName);
    setParams.set(`RecordType${n}`, h.RecordType);
    setParams.set(`Address${n}`, h.Address);
    setParams.set(`TTL${n}`, h.TTL);
    if (h.RecordType === "MX") setParams.set(`MXPref${n}`, h.MXPref);
  });

  const setRes = await fetch(`${base}?${setParams}`);
  const setXml = await setRes.text();
  if (!setXml.includes('Status="OK"')) {
    console.log("Namecheap DNS update failed — add CNAME manually.");
    return false;
  }
  console.log("✓ Namecheap CNAME created: staging → cname.vercel-dns.com");
  return true;
}

async function cloudflareDns() {
  if (!CF_TOKEN) return false;

  const zonesRes = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${ZONE}`, {
    headers: { Authorization: `Bearer ${CF_TOKEN}` },
  });
  const zones = await zonesRes.json();
  const zoneId = zones.result?.[0]?.id;
  if (!zoneId) {
    console.log("Cloudflare zone not found — add CNAME manually.");
    return false;
  }

  const recordsRes = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?type=CNAME&name=${DOMAIN}`,
    { headers: { Authorization: `Bearer ${CF_TOKEN}` } }
  );
  const records = await recordsRes.json();
  if (records.result?.length) {
    console.log("✓ Cloudflare CNAME already exists");
    return true;
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
  return true;
}

async function printManualDns() {
  console.log("\n— One-time DNS at Namecheap (if not automated) —");
  console.log("  Advanced DNS → CNAME | Host: staging | Value: cname.vercel-dns.com");
  console.log(`  Then open https://${DOMAIN} (5–30 min)`);
}

async function main() {
  console.log("Setting up staging.bitcraftly.com …\n");
  await ensureDomain();
  await ensureEnvVars();
  const dnsDone =
    (await namecheapDns()) ||
    (CF_TOKEN ? await cloudflareDns() && true : false);
  if (!dnsDone) await printManualDns();
  console.log(`\nDone. Staging URL: https://${DOMAIN}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
