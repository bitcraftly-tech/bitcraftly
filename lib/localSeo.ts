/**
 * Google Business Profile & local SEO — copy, keywords, templates.
 * Use for GBP setup, posts, review requests, and on-site local pages.
 */

export const GBP_PRIMARY_CITY = "Ghaziabad";
export const GBP_REGION = "Uttar Pradesh";
export const GBP_COUNTRY = "India";

/** Google Business Profile — business description (max ~750 chars; keep under 700) */
export const GBP_DESCRIPTION = `Bitcraftly is a founder-led web development studio in Ghaziabad, Uttar Pradesh, serving Delhi NCR and clients across India.

Led by Sanjay Kr. Singh (Tech Lead & Frontend Architect, 20+ years), we build fast, mobile-first business websites using React.js, Next.js, and practical AI — designed to generate leads on WhatsApp and Google, not just look good.

Services: React.js development, Next.js websites, business & clinic/gym/coach websites, website redesign, landing pages, frontend architecture, performance optimization, and AI chatbot integration.

You work directly with the founder — written scope and starting price before payment. Free 15-minute consultation. English or Hinglish.

📍 Based in Ghaziabad · Serving Noida, Greater Noida, Delhi, Gurugram, Faridabad & remote India
📞 WhatsApp / call for quotes & fast-launch packages`;

/** Recommended Google Business categories (primary first) */
export const GBP_CATEGORIES = {
  primary: "Website designer",
  additional: [
    "Software company",
    "Internet marketing service",
    "Marketing consultant",
    "Design agency",
    "Consultant",
  ],
  /** Avoid unless you truly offer these on-site */
  avoid: ["Advertising agency", "Computer repair service", "Web hosting company"],
} as const;

/** Service items to add in GBP Services tab */
export const GBP_SERVICES_LIST = [
  "React.js website development",
  "Next.js website development",
  "Business website development",
  "AI-powered website solutions",
  "Website redesign",
  "Landing page development",
  "Frontend architecture consulting",
  "Website performance optimization",
  "Clinic website development",
  "Gym website development",
  "Startup MVP frontend",
] as const;

export const LOCAL_SEO_KEYWORDS = {
  primary: [
    "website development company Ghaziabad",
    "web developer Ghaziabad",
    "React.js developer Ghaziabad",
    "Next.js website development Ghaziabad",
    "website designer Ghaziabad",
    "AI website development Ghaziabad",
  ],
  delhiNcr: [
    "website development company Noida",
    "website development Delhi NCR",
    "web developer Greater Noida",
    "Next.js developer Noida",
    "business website development Gurugram",
    "website redesign Faridabad",
    "React.js development Delhi NCR",
  ],
  service: [
    "React.js development services India",
    "Next.js SEO website development",
    "AI chatbot website India",
    "frontend architect India",
    "website redesign services",
    "landing page development India",
    "clinic website development",
    "gym website development",
  ],
  longTail: [
    "best website developer in Ghaziabad",
    "affordable business website Ghaziabad",
    "WhatsApp lead website development",
    "fast website development 5 days India",
    "founder led web development studio",
  ],
} as const;

export const GHAZIABAD_SEO_STRATEGY = {
  positioning:
    "Own “founder-led React/Next.js websites in Ghaziabad” — premium but approachable, WhatsApp-first, written quotes.",
  onPage: [
    "Homepage + contact: Ghaziabad, Uttar Pradesh in title, H1 area, footer, JSON-LD",
    "Dedicated local page later: /web-development-ghaziabad (service + FAQ + areas served)",
    "Portfolio: tag live Ghaziabad/NCR client work when available",
    "FAQ: Hindi–Hinglish questions (timeline, cost, remote clients)",
  ],
  citations: [
    "Google Business Profile (verified)",
    "LinkedIn founder profile (see lib/linkedinGrowth.ts) + company page with Ghaziabad location",
    "IndiaMART / Justdial only if you will actively manage leads",
    "Consistent NAP: Bitcraftly · +91 96677 10954 · hello@bitcraftly.com · Ghaziabad, UP",
  ],
  mapsPack: [
    "GBP 100% complete: services, photos, posts weekly, Q&A seeded",
    "20+ Google reviews mentioning Ghaziabad / website / Sanjay",
    "Website links to GBP; GBP links to site + WhatsApp",
    "Local photos: founder, laptop workspace, project screenshots (no stock fakes)",
  ],
} as const;

export const DELHI_NCR_STRATEGY = {
  serviceAreas: [
    "Ghaziabad",
    "Noida",
    "Greater Noida",
    "Delhi",
    "New Delhi",
    "Gurugram",
    "Faridabad",
    "Indirapuram",
    "Vaishali",
    "Crossings Republik",
  ],
  targeting: [
    "Set GBP service areas (do not use fake office pin if home-based — use service area business)",
    "Create NCR-specific lines on site: “Serving Delhi NCR” in hero trust line",
    "Lightweight location mentions in blog posts (e.g. clinic website tips for Noida/Ghaziabad)",
    "Run Google posts mentioning NCR availability + fast-launch packages",
  ],
  keywords: LOCAL_SEO_KEYWORDS.delhiNcr,
  avoid: ["Keyword stuffing city names on one page", "Duplicate GBP listings per city"],
} as const;

export const REVIEW_REQUEST_TEMPLATES = {
  smsWhatsApp:
    "Namaste! Sanjay from Bitcraftly — website project complete ho gaya. Agar experience achha raha ho to Google par 2-line review likh dena (Ghaziabad / service mention optional). Link: [GBP_REVIEW_LINK] — bahut help milti hai local clients ko. Dhanyavaad!",
  emailSubject: "Quick favour — share your Bitcraftly experience on Google?",
  emailBody: `Hi [Name],

Thanks again for trusting Bitcraftly with your website.

If you're happy with the delivery and communication, a short Google review helps other Ghaziabad & NCR businesses find us.

👉 [GBP_REVIEW_LINK]

A sentence about what we built (e.g. business site, speed, WhatsApp leads) is perfect.

Thank you,
Sanjay Kr. Singh
Bitcraftly · Ghaziabad`,
  inPerson:
    "Project handoff par: 'Google review link WhatsApp par bhej dunga — 1 min lagta hai, local search mein bahut help hoti hai.'",
  tips: [
    "Ask within 48 hours of happy handoff",
    "Never incentivize reviews (no discounts for 5★)",
    "Reply to every review within 48h — thank + mention service",
  ],
} as const;

export const LOCAL_CONTENT_IDEAS = [
  "Ghaziabad business website cost guide 2026 (React vs WordPress)",
  "Clinic website checklist for doctors in Ghaziabad & Noida",
  "Gym website features that get trial sign-ups on mobile",
  "Why WhatsApp CTAs beat contact forms for local Indian businesses",
  "Next.js vs simple website — which is right for your shop in NCR?",
  "Case study: cloud kitchen / restaurant website (menu + orders)",
  "5 signs your Ghaziabad business website is losing leads",
  "AI chatbot on local business sites — when it helps vs hype",
] as const;

export const GBP_POST_IDEAS = [
  { type: "Offer", title: "Business Website in 5 Days — from ₹12,999", cta: "WhatsApp for slot" },
  { type: "Offer", title: "Landing Page in 48 Hours — campaign-ready", cta: "Message on WhatsApp" },
  { type: "Update", title: "Free 15-min consultation with founder", cta: "Book on website" },
  { type: "Update", title: "Free website audit — speed + mobile UX", cta: "Send your URL" },
  { type: "What's new", title: "New portfolio: React & Next.js demos live", cta: "View portfolio" },
  { type: "Tip", title: "3 reasons NCR clinics lose patients online", cta: "Read on blog" },
  { type: "Offer", title: "Clinic / Gym / Coach website packages", cta: "Get written quote" },
] as const;

export const LOCAL_RANKING_STRATEGY = {
  quickWins: [
    "Verify GBP; add primary + 3 secondary categories; complete services with prices from",
    "Add 15+ real photos; geotag Ghaziabad where accurate",
    "Post weekly (offer + tip rotation); answer Q&A with keywords naturally",
    "Get first 10 reviews from real clients; respond to all",
    "Embed Google reviews on site when available (replace placeholder)",
  ],
  website: [
    "Keep Core Web Vitals green on mobile",
    "Internal links: services → contact with local anchor text",
    "schema.org LocalBusiness / ProfessionalService (already on homepage)",
    "Sitemap + local blog posts over time",
  ],
  offPage: [
    "LinkedIn posts tagging Ghaziabad / NCR projects",
    "Partner referrals from coaches, CAs, print shops (one backlink each)",
    "Avoid spam directories; focus NAP consistency",
  ],
  measure: ["GBP insights: calls, direction requests, website clicks", "Search Console: Ghaziabad/Noida queries", "WhatsApp leads tagged by source"],
} as const;

export const LOCAL_TRUST_POSITIONING = {
  headline: "Ghaziabad’s founder-led React & Next.js studio — not a template reseller",
  pillars: [
    "Named founder on every enquiry (Sanjay Kr. Singh, 20+ yrs)",
    "Written scope & price before advance — trusted by local SMBs",
    "Live client sites + interactive demos — proof before you pay",
    "English / Hinglish support — NCR business culture fit",
  ],
  gbpAttributes: ["Online appointments", "Identifies as women-owned — only if applicable", "LGBTQ+ friendly — optional"],
  qAndASeed: [
    { q: "Do you only work in Ghaziabad?", a: "We're based in Ghaziabad and serve all Delhi NCR plus remote clients across India." },
    { q: "What is your starting price for a business website?", a: "Fast-launch packages from ₹8,999–₹12,999; written quote after a short consultation." },
    { q: "Do you build in React or WordPress?", a: "We specialize in React.js and Next.js for speed, SEO, and maintainability — scoped to your goals." },
    { q: "Can I talk to the founder directly?", a: "Yes — Sanjay handles discovery, scope, and delivery on every project." },
  ],
} as const;
