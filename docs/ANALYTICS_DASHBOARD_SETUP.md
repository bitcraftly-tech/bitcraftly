# Bitcraftly Analytics Dashboard Setup

Admin dashboard: `/dashboard/analytics` (admin login required).

## 1. Client tracking (marketing site)

Production Vercel env:

```env
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GSC_VERIFICATION=your-search-console-token
```

Events tracked: `page_view`, `whatsapp_click`, `call_click`, `email_click`, `quote_click`, `pricing_page_visit`, `services_page_visit`, `portfolio_view`, `form_submit`, `generate_lead`.

First-party copies are also sent to `/api/analytics/events` (Firestore when configured).

## 2. GA4 Data API (dashboard charts)

1. Google Cloud Console → enable **Google Analytics Data API**
2. Create service account → download JSON key
3. GA4 Admin → Property access management → add service account email as **Viewer**
4. Copy numeric **Property ID** (not `G-` measurement ID)

```env
GA4_PROPERTY_ID=123456789
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
```

## 3. Search Console API

1. Enable **Search Console API** in the same Google Cloud project
2. Search Console → Settings → Users → add service account as **Full** or **Restricted**
3. Set property URL exactly:

```env
GSC_SITE_URL=https://bitcraftly.com/
```

## 4. Firebase Firestore (leads)

1. Firebase console → Create project → Firestore (production mode)
2. Project settings → Service accounts → Generate new private key
3. Vercel env:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Collections used:

- `leads` — lead management + status pipeline
- `analytics_events` — first-party event log

## 5. Core Web Vitals

Enable PageSpeed Insights API and set:

```env
PAGESPEED_API_KEY=your-api-key
```

## 6. Lead notifications

```env
ANALYTICS_LEAD_NOTIFY_EMAIL=hello@bitcraftly.com
RESEND_API_KEY=re_xxxx          # optional email
ANALYTICS_LEAD_NOTIFY_WHATSAPP_WEBHOOK=https://...  # optional Zapier/Make webhook
```

## 7. Authentication

Dashboard routes use existing **NextAuth** session. Analytics API routes require `role: admin`.

Login: `/login` with admin account.

## 8. Demo mode

If GA4/GSC env vars are missing, the dashboard shows **demo data** with a yellow banner.

## Folder structure

```
app/api/analytics/          # Protected API routes
app/dashboard/analytics/    # Dashboard UI + lead detail
components/analytics-dashboard/
lib/analytics-dashboard/    # GA4, GSC, Firebase, types
hooks/useAnalyticsDashboard.ts
lib/analytics.ts            # Client gtag tracking
lib/logServerEvent.ts       # Beacon to first-party API
```
