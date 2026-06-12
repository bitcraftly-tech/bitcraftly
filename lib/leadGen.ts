/** Lead generation & conversion copy — CTAs, magnets, WhatsApp prefill */

export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

export { WHATSAPP_MESSAGES, resolveWhatsAppMessage, type WhatsAppMessageKey } from "@/lib/whatsappFunnel";

export const FREE_CONSULTATION = {
  id: "free-consultation",
  eyebrow: "Free consultation",
  headline: "15-minute call with the founder — clear scope, no pressure",
  body: "Tell us about your business, current website (if any), and goals. Sanjay will recommend React vs Next.js, AI scope, timeline, and a written starting estimate — English or Hinglish.",
  bullets: [
    "Free · 15 minutes · Video or phone",
    "Written scope summary after the call",
    "Founder-led — not a sales handoff team",
  ],
  primaryCta: "Book Free Consultation",
  secondaryCta: "WhatsApp Sanjay",
  microcopy: "Usually same-day reply · 10 AM – 9 PM IST",
} as const;

export const WEBSITE_AUDIT = {
  id: "website-audit",
  eyebrow: "Free lead magnet",
  headline: "Free Website Audit — speed, mobile UX & lead checklist",
  body: "Share your current site URL (or idea). We send a practical checklist: what's slowing you down, what's hurting mobile conversions, and 3 quick wins — no obligation to buy.",
  deliverables: ["Mobile & speed snapshot", "Lead/CTA placement notes", "React vs rebuild recommendation"],
  primaryCta: "Request Free Audit",
  secondaryCta: "WhatsApp audit request",
  formIntent: "audit",
} as const;

export const TRUST_INQUIRY = {
  title: "Why owners trust Bitcraftly with enquiries",
  points: [
    "18+ years frontend experience · founder on every call",
    "Written estimates before payment — no surprise invoices",
    "React.js, Next.js & practical AI — explained in plain language",
    "Serving Ghaziabad, India-wide & remote clients",
  ],
} as const;

export const CONTACT_FORM = {
  headline: "Get your free consultation or website audit",
  subheadline: "Form takes about 2 minutes. We reply same day on WhatsApp or call.",
  submitCta: "Get My Free Consultation →",
  submitAuditCta: "Request Free Website Audit →",
  submitQuoteCta: "Request written quote →",
  whatsappAlternative: "Prefer WhatsApp? Message Sanjay directly",
  privacyNote: "Your details stay private — used only to reply about your project.",
} as const;

/** Contact page with package pre-selected and enquiry form auto-opened */
export function buildQuoteContactUrl(service: string, source: string): string {
  const params = new URLSearchParams({
    service,
    intent: "quote",
    source,
    form: "1",
  });
  return `/contact?${params.toString()}`;
}

export const MOBILE_STICKY_CTA = {
  consultation: "Free consult",
  whatsapp: "WhatsApp",
} as const;

export const CTA_COPY = {
  heroPrimary: "Book Free Consultation",
  heroSecondary: "WhatsApp the Founder",
  pricing: "Get Written Estimate",
  portfolio: "Scope a Similar Project",
  audit: "Get Free Website Audit",
  finalPrimary: "Book Free Consultation",
  finalSecondary: "Message on WhatsApp",
} as const;

export const BUDGET_OPTIONS = [
  "Not sure yet",
  "Under ₹15,000",
  "₹15,000 – ₹30,000",
  "₹30,000 – ₹60,000",
  "₹60,000+",
] as const;

export const TIMELINE_OPTIONS = [
  "ASAP (1–2 weeks)",
  "2–4 weeks",
  "1–2 months",
  "Flexible / exploring",
] as const;
