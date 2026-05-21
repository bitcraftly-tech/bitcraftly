/**
 * Bitcraftly revenue growth playbook — fast cash, recurring income, founder-led sales.
 * Aligns with fastPackages.ts + Pricing.tsx on-site; ops copy for Sanjay.
 */

export const REVENUE_GOAL = {
  month1CashTarget: "₹80,000 – ₹1,50,000 project revenue",
  month1RecurringTarget: "₹6,000 – ₹15,000 MRR (2–5 maintenance clients)",
  positioning: "Premium founder-led studio — not cheapest, clearest scope & fastest credible delivery",
} as const;

/** Ranked by speed-to-close (founder-led solo studio) */
export const FASTEST_SELLING_SERVICES = [
  {
    rank: 1,
    name: "Landing Page in 48 Hours",
    price: "₹8,999",
    why: "Low scope, urgent campaigns, easy advance payment, 1-page delivery",
    closeTime: "24–48h sales cycle",
  },
  {
    rank: 2,
    name: "Business Website in 5 Days",
    price: "₹12,999",
    why: "Most Popular on site — full credibility for local SMB, clear deliverables",
    closeTime: "2–5 day sales cycle",
  },
  {
    rank: 3,
    name: "Clinic / Gym / Coaching packages",
    price: "₹12,999 – ₹13,999",
    why: "Industry template + emotion (trust, leads) — NCR/local WhatsApp outbound",
    closeTime: "3–7 days",
  },
  {
    rank: 4,
    name: "Website Redesign",
    price: "₹12,999+",
    why: "Obvious pain (old site) — upsell from free audit",
    closeTime: "5–10 days",
  },
  {
    rank: 5,
    name: "AI Chatbot add-on",
    price: "₹9,999+",
    why: "Attach to existing site or new build — premium label, smaller scope",
    closeTime: "3–5 days",
  },
  {
    rank: 6,
    name: "Starter Business Website",
    price: "₹7,999",
    why: "Entry tier — convert price-sensitive; upsell maintenance",
    closeTime: "2–4 days",
  },
  {
    rank: 7,
    name: "Professional / React / MVP",
    price: "₹14,999 – ₹34,999+",
    why: "Higher ticket but longer cycle — pursue after first 2–3 wins",
    closeTime: "1–3 weeks",
  },
] as const;

export const LOW_FRICTION_OFFERS = [
  {
    name: "Free 15-min consultation",
    price: "₹0",
    friction: "Lowest",
    outcome: "Written ballpark + package recommendation — no deck",
    cta: "Book / WhatsApp SCOPE",
  },
  {
    name: "Free website audit",
    price: "₹0",
    friction: "Low",
    outcome: "3 quick wins PDF/WhatsApp — natural upsell to redesign or 5-day site",
    cta: "Send URL on WhatsApp",
  },
  {
    name: "48h landing page",
    price: "₹8,999 · 50% advance",
    friction: "Low",
    outcome: "Single page, fixed scope, fast delivery",
    cta: "Reserve slot",
  },
  {
    name: "5-day business site",
    price: "₹12,999 · 50% advance",
    friction: "Low-medium",
    outcome: "5 pages, WhatsApp CTA, content-ready clause",
    cta: "Reserve 5-day slot",
  },
  {
    name: "Paid discovery (optional)",
    price: "₹1,500 · credited to project",
    friction: "Medium filter",
    outcome: "1-page written scope for React/MVP — serious buyers only",
    cta: "After 2 no-shows on free consults",
  },
] as const;

export const PRICING_STRATEGY = {
  principles: [
    "Anchor premium with founder + 18 yrs — compete on clarity & speed, not race to bottom",
    "Always show starting-from + written scope before payment",
    "50% advance to start · 50% on delivery (projects under ₹30k)",
    "MVP/React: 40/30/30 milestone for ₹30k+",
    "Never discount without removing scope (e.g. drop 1 revision, not 20% off)",
  ],
  anchors: {
    entry: "₹7,999 Starter",
    core: "₹12,999 5-day / ₹14,999 Professional",
    premium: "₹29,999+ React/Next · ₹34,999+ MVP",
    addOn: "₹9,999+ AI chatbot",
  },
  upsellPath: [
    "Starter ₹7,999 → Professional ₹14,999",
    "5-day ₹12,999 → + maintenance ₹2,999/mo",
    "New site → + AI chat ₹9,999",
    "Audit free → Redesign ₹12,999+",
  ],
  objectionHandlers: {
    expensive: "Written scope + founder delivery — compare to agency junior handoff + change requests",
    needTime: "Lock slot with 50% advance; timeline in writing",
    haveCheaperQuote: "Ask what's excluded (SEO, mobile, revisions, who builds)",
  },
} as const;

export const RECURRING_REVENUE_PLANS = {
  why: "First project is acquisition; maintenance + care plans are margin & predictable cash",
  attachRateGoal: "60%+ of one-time clients on Care Lite within 14 days of launch",
  plans: [
    {
      id: "care-lite",
      name: "Care Lite",
      price: "₹2,999/mo",
      for: "Starter & 5-day sites",
      includes: ["Minor content updates (2h/mo)", "Bug fixes", "Uptime check", "WhatsApp support"],
    },
    {
      id: "care-pro",
      name: "Care Pro",
      price: "₹4,999/mo",
      for: "Professional & clinic/gym/coach",
      includes: ["Updates (4h/mo)", "Performance check quarterly", "SEO basics refresh", "Priority WhatsApp"],
    },
    {
      id: "care-growth",
      name: "Care Growth",
      price: "₹7,999/mo",
      for: "React/Next & AI sites",
      includes: ["8h/mo dev", "AI FAQ tuning", "Landing page tweaks", "Monthly report"],
    },
  ],
  annualPitch: "Pay 10 months get 12 — improves cash & retention",
} as const;

export const MAINTENANCE_PACKAGES = RECURRING_REVENUE_PLANS.plans;

export const STARTUP_OFFERS = [
  {
    name: "Startup MVP Frontend Sprint",
    price: "₹34,999+",
    timeline: "2–3 weeks",
    deliverables: ["Core flows UI", "Component library", "API-ready", "Handoff doc"],
    payment: "40% start · 30% mid · 30% delivery",
    leadSource: "LinkedIn founders, DM MVP",
  },
  {
    name: "Investor Demo UI",
    price: "₹18,999 – ₹24,999",
    timeline: "7–10 days",
    deliverables: ["3–5 key screens", "Polished React UI", "Clickable prototype feel"],
    leadSource: "LinkedIn, startup groups",
  },
  {
    name: "Landing + waitlist",
    price: "₹8,999 – ₹12,999",
    timeline: "48h – 5 days",
    deliverables: ["Launch page", "Email/waitlist hook", "Analytics ready"],
    leadSource: "Fast package + Twitter/LinkedIn",
  },
] as const;

export const LOCAL_BUSINESS_OFFERS = [
  {
    name: "Ghaziabad / NCR 5-day business site",
    price: "₹12,999",
    channels: ["GBP", "WhatsApp groups", "local referrals, Justdial leads"],
  },
  {
    name: "Clinic Website Package",
    price: "₹13,999",
    channels: ["Doctor networks, medical equipment vendors"],
  },
  {
    name: "Gym / Coaching package",
    price: "₹12,999 – ₹13,999",
    channels: ["Instagram DMs, gym consultants, coach communities"],
  },
  {
    name: "Restaurant / cloud kitchen",
    price: "₹12,999+ (reference Shrishti live)",
    channels: ["Walk-in pitch with live demo URL"],
  },
  {
    name: "Free audit → redesign",
    price: "₹12,999+",
    channels: ["Cold WhatsApp with 3 bullet audit"],
  },
] as const;

export const AI_PREMIUM_OFFERS = [
  {
    name: "AI Chatbot Integration",
    price: "₹9,999+ add-on · ₹14,999 standalone",
    includes: ["FAQ/menu bot", "WhatsApp handoff", "Knowledge base setup"],
    pitch: "Saves 2h/day staff time on repeat questions — human closes sale",
  },
  {
    name: "AI + new website bundle",
    price: "₹22,999+ (Professional + AI)",
    pitch: "Modern site + smart lead qualification — premium vs competitors",
  },
  {
    name: "AI workflow review",
    price: "₹3,999 one-time",
    deliverable: "Written map: what to automate vs what stays human",
    leadIn: "Low-risk entry to full AI build",
  },
] as const;

export const REVENUE_30_DAY_ROADMAP = {
  week1: {
    goal: "₹25,000 – ₹40,000 booked (advances)",
    actions: [
      "Offer stack live: push 48h + 5-day + free audit on WhatsApp/LinkedIn daily",
      "List 50 warm contacts — past colleagues, local businesses, Shrishti referral ask",
      "10 personalized outreaches/day (WhatsApp/LinkedIn)",
      "Close 1 fast package — 50% advance before work",
      "GBP + profile updated (local SEO)",
    ],
  },
  week2: {
    goal: "₹40,000 – ₹70,000 cumulative booked",
    actions: [
      "Deliver first project flawlessly → ask review + maintenance pitch",
      "5 free audits to local businesses (template in whatsappFunnel)",
      "Post proof daily (LinkedIn + GBP)",
      "Second client: industry pack (clinic/gym/coach)",
      "Attach Care Lite ₹2,999 to first delivery",
    ],
  },
  week3: {
    goal: "₹60,000 – ₹1,00,000 cumulative · 2+ maintenance",
    actions: [
      "Follow up all Week 1–2 leads (followUp template)",
      "Partner pitch: 1 CA / coach / marketing freelancer for referrals",
      "Upsell AI chat to any site client",
      "Start 1 higher-ticket redesign or MVP conversation",
    ],
  },
  week4: {
    goal: "₹80,000 – ₹1,50,000 month · ₹6k+ MRR",
    actions: [
      "Month review: which offer closed fastest — double down",
      "Raise slots / mild scarcity (2 five-day slots/week max)",
      "Document 1 case study with numbers",
      "Plan Month 2: 2 fast sites/week capacity cap",
    ],
  },
} as const;

export const DAILY_FOUNDER_ACTION_PLAN = {
  morning90Min: [
    "Check WhatsApp + LinkedIn — reply all leads first (trust)",
    "3 outbound messages (personalized, one offer: audit OR 5-day)",
    "1 LinkedIn post OR comment on 5 founder posts",
  ],
  midday60Min: [
    "1 discovery call OR send 1 written quote",
    "Delivery block on active client (no sales during deep work if possible)",
  ],
  evening45Min: [
    "Follow up open quotes (max 3)",
    "GBP post OR WhatsApp status (offer/availability)",
    "Log pipeline: name · offer · advance? · next step",
  ],
  weeklyRituals: {
    monday: "Set week revenue target + 3 named prospects",
    wednesday: "Send 5 audit offers to local businesses",
    friday: "Invoice/collect balances · maintenance pitches",
  },
  pipelineColumns: ["Lead", "Audit/Call done", "Quote sent", "Advance received", "In delivery", "Launched + maintenance"],
  rules: [
    "No build without 50% advance (under ₹30k)",
    "Scope in WhatsApp + email before pay",
    "Max 2 active fast projects if solo",
    "Every launch → review ask + Care plan within 48h",
  ],
} as const;

export const LOW_COST_LEAD_GEN = [
  "WhatsApp prefilled funnel (site) — ₹0",
  "LinkedIn 30-day plan — ₹0",
  "Google Business Profile + reviews — ₹0",
  "Free audit for 10 businesses/week — time only",
  "Referral: ₹2,000 credit for successful intro (not cash discount)",
  "Portfolio demos as proof in DMs — ₹0",
  "Hinglish YouTube Short / Loom — optional later",
] as const;
