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

## 5) Production Checklist

- Set strong `DATABASE_URL` for managed Postgres
- Ensure Render service uses persistent Postgres (not ephemeral)
- Keep `NEXT_PUBLIC_API_BASE_URL` pointing to `https://api.bitcraftly.com`
- Verify wildcard certificate is active in Cloudflare and Vercel
- Test:
  - `bitcraftly.com`
  - `demo.bitcraftly.com`
  - `api.bitcraftly.com/health`
