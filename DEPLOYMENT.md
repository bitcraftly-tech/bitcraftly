# SaaS Deployment Setup

## Architecture

- Frontend: Next.js on Vercel
- Backend: FastAPI on Render
- DNS + wildcard routing: Cloudflare

## Required Domains

- Main app: `bitcraftly.com`
- Wildcard tenants: `*.bitcraftly.com`
- API: `api.bitcraftly.com`

## 1) Deploy Backend (Render)

1. Push repository to GitHub.
2. In Render, create a **Web Service** from this repo.
3. Render will detect `render.yaml`.
4. Set required environment variable:
   - `DATABASE_URL` = your production PostgreSQL URL
5. Confirm optional env:
   - `CORS_ORIGINS=https://bitcraftly.com,https://www.bitcraftly.com,https://*.bitcraftly.com`
6. Deploy and verify health check:
   - `https://<render-service>.onrender.com/health` returns `{"status":"ok"}`.

## 2) Deploy Frontend (Vercel)

1. Import the same repo into Vercel.
2. Configure environment variable:
   - `NEXT_PUBLIC_API_BASE_URL=https://api.bitcraftly.com`
3. Deploy production.
4. In Vercel project domains, add:
   - `bitcraftly.com`
   - `www.bitcraftly.com`
   - `*.bitcraftly.com`

## 3) Cloudflare DNS Mapping

Create DNS records:

- `A` or `CNAME` for apex:
  - `bitcraftly.com` -> Vercel target (per Vercel instructions)
- `CNAME` for `www`:
  - `www` -> `cname.vercel-dns.com`
- `CNAME` wildcard for tenants:
  - `*` -> `cname.vercel-dns.com`
- `CNAME` for API:
  - `api` -> `<render-service>.onrender.com`

Recommended:

- Proxy status: **Proxied** for web records
- SSL/TLS mode: **Full (strict)**

## 4) Domain Flow

- Tenant page request:
  - `tenant1.bitcraftly.com` -> Cloudflare -> Vercel (Next.js)
- Frontend API calls:
  - `https://api.bitcraftly.com/api/...` -> Cloudflare -> Render (FastAPI)
- Tenant resolution:
  - Subdomain extracted by Next middleware + FastAPI middleware for multi-tenant context

## 5) Staging / testing environment (live)

Use **`staging.bitcraftly.com`** for QA before merging `development` → `main`.

| | Production | Staging |
|---|------------|---------|
| **Branch** | `main` | `development` |
| **URL** | `https://bitcraftly.com` | `https://staging.bitcraftly.com` |
| **Vercel env** | Production | Preview (branch: `development`) |

### Vercel

1. Project → **Settings** → **Domains** → Add `staging.bitcraftly.com`.
2. Assign the domain to Git branch **`development`** (Preview).
3. **Settings** → **Environment Variables** — add for **Preview** only:

   | Variable | Value |
   |----------|--------|
   | `NEXT_PUBLIC_APP_ENV` | `staging` |
   | `NEXT_PUBLIC_SITE_URL` | `https://staging.bitcraftly.com` |
   | `NEXT_PUBLIC_PUBLIC_BASE_URL` | `https://staging.bitcraftly.com` |
   | `NEXTAUTH_URL` | `https://staging.bitcraftly.com` |

   Copy other production vars (auth, API keys) as needed for Preview.

4. Push to `development` — Vercel deploys staging automatically.

### DNS (domain registrar — Namecheap)

`bitcraftly.com` uses registrar DNS (`dns1.registrar-servers.com`). Add:

| Type | Host | Value |
|------|------|-------|
| **CNAME** | `staging` | `cname.vercel-dns.com` |

Namecheap: Domain List → Manage → **Advanced DNS** → Add New Record. Wait 5–30 min.

### Automated setup (ek baar setup, phir auto)

**Ek baar (5 min):**

1. [Vercel token](https://vercel.com/account/settings/tokens) banao.
2. GitHub → [Secrets](https://github.com/bitcraftly-tech/bitcraftly/settings/secrets/actions) → **New secret** → `VERCEL_TOKEN`
3. Namecheap → Advanced DNS → CNAME `staging` → `cname.vercel-dns.com` (ek baar)

**Uske baad automatic:**

| Aap kya karte ho | System kya karta hai |
|------------------|----------------------|
| `development` branch par code push | Vercel staging deploy |
| Same push | GitHub Action: domain + env vars sync |
| `main` par merge (jab ready) | Production `bitcraftly.com` deploy |

Manual workflow run: **Actions** → **Setup staging.bitcraftly.com** → **Run workflow**

Local: `$env:VERCEL_TOKEN="..."; npm run setup:staging`

### App behaviour

- Amber **“Staging environment”** banner on preview builds
- `robots.txt` blocks indexing on staging
- `staging` subdomain is reserved (not treated as a tenant slug)

Until DNS is configured, use the Vercel preview URL:
`https://bitcraftly-tech-v2-git-development-bitcraftly-techs-projects.vercel.app`

## 6) Production Checklist

- Set strong `DATABASE_URL` for managed Postgres
- Ensure Render service uses persistent Postgres (not ephemeral)
- Keep `NEXT_PUBLIC_API_BASE_URL` pointing to `https://api.bitcraftly.com`
- Verify wildcard certificate is active in Cloudflare and Vercel
- Test:
  - `bitcraftly.com`
  - `demo.bitcraftly.com`
  - `api.bitcraftly.com/health`
