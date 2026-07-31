# Lead Capture — Staging Verification Checklist

**Sprint:** 002 — Production Lead Capture  
**Use on:** Staging URL (or local with `.env.local` + Resend test keys)  
**Last updated:** 2026-07-18

Complete every section before promoting to production.

---

## Environment setup

1. Copy `.env.example` → `.env.local` (local) or configure staging env vars.
2. Set all three Resend variables:

```env
RESEND_API_KEY=re_xxxxxxxx
LEAD_NOTIFICATION_TO=your-team@company.com
LEAD_FROM_EMAIL=Bitcraftly Leads <notifications@verified-domain.com>
```

3. [ ] Staging `NEXT_PUBLIC_SITE_URL` matches staging hostname
4. [ ] Restart dev server / redeploy staging after env changes
5. [ ] Confirm Resend domain verified for `LEAD_FROM_EMAIL`

---

## Automated validation (run locally or in CI)

```bash
npm run lint
npm run typecheck
npm run test:unit -- src/features/lead-funnel
npm run build
```

| Command                                 | Expected                         | Pass |
| --------------------------------------- | -------------------------------- | ---- |
| `lint`                                  | Exit 0                           | ☐    |
| `typecheck`                             | Exit 0                           | ☐    |
| `test:unit -- src/features/lead-funnel` | 6 files, 23 tests pass           | ☐    |
| `build`                                 | Exit 0, `/contact` route present | ☐    |

---

## Manual smoke — Contact form (`/contact`)

### Happy path

- [ ] Open `/contact`
- [ ] Fill: name, email, message (≥10 chars), intent
- [ ] Submit → loading state on button
- [ ] **Success UI appears only after server responds** (not instant/mock)
- [ ] Success region has `role="status"` and receives focus
- [ ] Email arrives at `LEAD_NOTIFICATION_TO` within ~1 minute
- [ ] Email contains: lead type, name, email, intent, source, page, message
- [ ] `reply_to` is submitter’s email

### Client validation (no server round-trip for obvious errors)

- [ ] Invalid email → inline error, no success UI
- [ ] Empty name / short message → inline errors
- [ ] No `lead_funnel_form_submit_success` in console/dataLayer

### Server validation / errors

Test with valid client-side data where server can reject:

- [ ] **DELIVERY (missing env):** Unset one Resend var → user sees friendly delivery message, **not** “not configured”
- [ ] **RATE_LIMIT:** Submit 6+ times same email/IP within 15 min → rate limit message
- [ ] Error alert visible, focus moves to alert (`role="alert"`)

### Analytics (browser DevTools)

Open console — in development, `[lead-funnel]` logs appear.

- [ ] On page load: `lead_funnel_form_view` (once)
- [ ] On **successful** submit only: `lead_funnel_form_submit_success` with `source`, `intent`, etc.
- [ ] On failed submit: **no** `form_submit_success`, **no** `form_submit_error`

```js
// Optional: inspect dataLayer in console
window.dataLayer?.filter((e) => e.event?.startsWith('lead_funnel_'));
```

---

## Manual smoke — Newsletter (homepage footer)

- [ ] Scroll to `#newsletter` on `/`
- [ ] Enter valid work email → Submit
- [ ] Loading label “Subscribing…” during request
- [ ] Success message: “Thanks — you're subscribed…”
- [ ] Success region focused (`tabIndex={-1}`, `role="status"`)
- [ ] Notification email received (lead type: Newsletter)
- [ ] `lead_funnel_form_submit_success` with `source: "newsletter"` **only after success**

### Newsletter errors

- [ ] Invalid email → inline error, `role="alert"`, focus on error
- [ ] Resend failure → friendly message, form remains usable
- [ ] No analytics on failure

---

## Resend configuration verification

| Check                                                                    | Pass |
| ------------------------------------------------------------------------ | ---- |
| API key valid (200 from Resend on successful submit)                     | ☐    |
| From address uses verified domain                                        | ☐    |
| HTML + plain text parts present in received email                        | ☐    |
| User HTML in message escaped (try `<script>` in test message on staging) | ☐    |
| Notification subject includes lead type and name                         | ☐    |

---

## Error code matrix (staging)

| Scenario     | How to trigger                                      | Expected UI               | Analytics |
| ------------ | --------------------------------------------------- | ------------------------- | --------- |
| `VALIDATION` | Bypass client validation* or invalid server payload | Server validation message | None      |
| `HONEYPOT`   | Fill hidden honeypot via DevTools                   | “Unable to submit…”       | None      |
| `RATE_LIMIT` | 6+ rapid submits                                    | “Too many submissions…”   | None      |
| `DELIVERY`   | Missing/invalid Resend config                       | “We could not deliver…”   | None      |
| `UNKNOWN`    | Simulate network failure**                          | “Something went wrong…”   | None      |

\*Use DevTools to remove `minLength` or send malformed request only in staging.  
\*\*Optional: offline mode in DevTools during submit.

---

## Accessibility checklist

### Contact form

- [ ] Tab through all fields in logical order
- [ ] Honeypot skipped in tab order
- [ ] Required fields announced (label + required indicator)
- [ ] Field errors linked via `aria-describedby` + `aria-invalid`
- [ ] Submit button disabled while submitting
- [ ] Success: focus on success container
- [ ] Error: focus on form-level alert

### Newsletter

- [ ] Email field has visible sr-only label
- [ ] `aria-busy` on form while loading
- [ ] `aria-invalid` on error
- [ ] Error described by `newsletter-section-error`
- [ ] Success message announced (`aria-live="polite"`)

### General

- [ ] Visible focus rings on interactive elements
- [ ] No keyboard traps
- [ ] Works at 200% zoom (no horizontal scroll on form)

---

## Security spot-checks

- [ ] `RESEND_API_KEY` not present in client bundle (search built `.next` or Network tab — key must not appear)
- [ ] Server action errors never expose stack traces to user
- [ ] Honeypot field hidden from assistive tech on wrapper (`aria-hidden`) — bots only

---

## Regression checks

- [ ] Contact page still renders hero, channels, sticky CTA
- [ ] Homepage still loads with newsletter section
- [ ] Unrelated pages unaffected (Services, Solutions protected — no accidental edits in lead PR)

---

## Staging sign-off

| Area                    | Verified by | Date | Pass |
| ----------------------- | ----------- | ---- | ---- |
| Contact form happy path |             |      | ☐    |
| Newsletter happy path   |             |      | ☐    |
| Resend emails received  |             |      | ☐    |
| Error handling          |             |      | ☐    |
| Analytics integrity     |             |      | ☐    |
| Accessibility           |             |      | ☐    |
| Automated tests + build |             |      | ☐    |

**Ready for production deployment:** ☐ Yes ☐ No — blockers: _______________
