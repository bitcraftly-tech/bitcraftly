/**
 * LinkedIn client acquisition system — Sanjay Kr. Singh · Bitcraftly
 * Copy-paste into profile, posts, connection notes, and DMs.
 */

export const LINKEDIN_PROFILE_URL = "https://linkedin.com/in/sanjay-ui-frontend-developer";
export const WEBSITE_URL = "https://bitcraftly.com";

/** Option A — recommended (220 char limit for headline; verify in profile editor) */
export const LINKEDIN_HEADLINE =
  "Founder @ Bitcraftly | Tech Lead & Frontend Architect | React.js · Next.js · AI-Powered Web Solutions | 18+ Yrs | Ghaziabad · India & Remote";

/** Option B — shorter */
export const LINKEDIN_HEADLINE_SHORT =
  "Frontend Architect · React & Next.js · Founder @ Bitcraftly | AI-ready websites that convert";

/** Full About section — paste into LinkedIn About */
export const LINKEDIN_ABOUT = `Most business websites look fine but fail at the one job that matters: turning visitors into enquiries.

I'm Sanjay Kr. Singh — Tech Lead, Frontend Architect, and founder of Bitcraftly. For 18+ years I've shipped interfaces that product teams and local businesses actually run on: React.js, Next.js, performance, and AI only where it earns its place.

What I do differently:
→ You work with me directly — not a sales handoff to juniors
→ Written scope and starting price before you pay
→ Mobile-first, SEO-conscious builds with WhatsApp-ready lead paths
→ English or Hinglish — straight talk, no agency fluff

Bitcraftly helps:
• Startup founders — MVP frontends, investor-ready UI, scalable React/Next.js
• SMBs & local brands — clinics, gyms, coaches, shops (Ghaziabad, Delhi NCR, India-wide)
• Growing teams — redesigns, Core Web Vitals, frontend architecture

Services: React.js development · Next.js websites · business websites · website redesign · landing pages · frontend architecture · practical AI (chat, smart forms, WhatsApp handoff)

Fast-launch packages available (48h landing · 5-day business site).

📍 Ghaziabad, Uttar Pradesh · Serving Delhi NCR & remote clients
🔗 Portfolio & booking: ${WEBSITE_URL}
📩 DM "SCOPE" for a free 15-min consultation or written ballpark estimate.`;

/** Featured section — pin these (titles + links) */
export const LINKEDIN_FEATURED = [
  {
    title: "Bitcraftly — React, Next.js & AI websites",
    description: "Founder-led studio · portfolio · fast packages · free consultation",
    url: WEBSITE_URL,
  },
  {
    title: "Free 15-min consultation",
    description: "Book scope call — clear React vs Next.js recommendation",
    url: `${WEBSITE_URL}/contact?intent=consultation&source=linkedin-featured`,
  },
  {
    title: "Live client work — Shrishti Cloud Kitchen",
    description: "Production Next.js site — menu-led UX & WhatsApp orders",
    url: "https://www.shrishticloud.kitchen/",
  },
  {
    title: "Portfolio & case studies",
    description: "React, Next.js, AI demos — problem → solution → results",
    url: `${WEBSITE_URL}/portfolio`,
  },
  {
    title: "Fast-launch packages",
    description: "5-day business site · 48h landing · clinic/gym/coach packs",
    url: `${WEBSITE_URL}/#fast-packages`,
  },
] as const;

export const REACT_AUTHORITY_POSITIONING = {
  headline: "The React & Next.js architect — not a page-builder freelancer",
  pillars: [
    "Component architecture, App Router, and maintainable codebases your next dev can extend",
    "SEO-friendly rendering (SSR/SSG) chosen for business growth — explained in plain language",
    "Performance budgets & Core Web Vitals — mobile-first for Indian traffic patterns",
    "18+ years shipping product UIs — startup speed with enterprise discipline",
  ],
  postAngles: [
    "React vs WordPress for Indian SMBs — when each makes money",
    "Next.js App Router mistakes that kill SEO",
    "One Core Web Vitals fix that helped a local brand",
    "Why I don't hand off to juniors after the sales call",
  ],
} as const;

export const AI_AUTHORITY_POSITIONING = {
  headline: "AI on websites that protects human sales — not gimmick bots",
  pillars: [
    "FAQ & menu chatbots with WhatsApp escalation when intent is high",
    "Smart forms that qualify leads before they reach the founder",
    "Architecture-ready for automation — scoped, not buzzword-driven",
    "Human-backed: AI reduces repeat questions; you still close on WhatsApp",
  ],
  postAngles: [
    "When an AI chatbot helps a clinic/gym — and when it hurts",
    "3 questions to ask before adding AI to your business site",
    "How we wire AI chat → WhatsApp without losing trust",
  ],
} as const;

/** Daily posting rhythm — Mon–Sun themes */
export const DAILY_POSTING_STRATEGY = {
  weeklyRhythm: [
    { day: "Monday", theme: "Authority", example: "React/Next.js tip or myth-bust (short carousel or text)" },
    { day: "Tuesday", theme: "Proof", example: "Portfolio snippet, before/after, or live client mention" },
    { day: "Wednesday", theme: "Founder story", example: "Lesson from 18 yrs — handoff, scope, or client comms" },
    { day: "Thursday", theme: "AI practical", example: "AI + WhatsApp funnel — one use case" },
    { day: "Friday", theme: "Offer", example: "Fast package or free consult CTA — soft, not spammy" },
    { day: "Saturday", theme: "Local / SMB", example: "Ghaziabad/NCR business website insight" },
    { day: "Sunday", theme: "Engage", example: "Comment 10 posts from founders & CTOs; 0 sell" },
  ],
  formatMix: ["Text post 40%", "Carousel 25%", "Short video/Loom 15%", "Poll 10%", "Document/PDF 10%"],
  bestTimesIst: ["8:30–9:30 AM", "12:30–1:30 PM", "6:00–7:30 PM"],
  rules: [
    "Hook in first 2 lines — outcome, not 'I'm excited to share'",
    "One CTA max: DM keyword, link in comments, or profile featured",
    "Reply to every comment within 2 hours during business hours",
    "Hashtags: 3–5 max (#ReactJS #Nextjs #WebDevelopment #StartupIndia #Frontend)",
  ],
} as const;

export const CONNECTION_REQUEST_TEMPLATES = {
  startupFounder:
    "Hi [Name] — Sanjay here, frontend architect & founder of Bitcraftly. Saw your work on [specific: product/launch/post]. I help founders ship React/Next.js UIs fast — no agency handoff. Happy to connect.",
  smbOwner:
    "Hi [Name] — Sanjay from Bitcraftly (Ghaziabad). I build lead-focused websites for [industry] businesses in NCR. Not selling on connect — just thought your profile was relevant. 🙏",
  agencyPeer:
    "Hi [Name] — Sanjay, Tech Lead (React/Next.js). Always good to connect with [agency/studio] folks in India. Open to collaborate on frontend-heavy projects.",
  postEngager:
    "Hi [Name] — thanks for engaging on my post about [topic]. I'm Sanjay — founder @ Bitcraftly. Connecting to stay in touch on React/frontend topics.",
  mutual:
    "Hi [Name] — we're both connected with [Mutual] and work in the product/web space. Would be glad to connect — Sanjay, Bitcraftly.",
} as const;

export const STARTUP_FOUNDER_OUTREACH = {
  connectionNote: CONNECTION_REQUEST_TEMPLATES.startupFounder,
  dmAfterAccept: `Thanks for connecting, [Name].

Quick context: I run Bitcraftly — founder-led React/Next.js studio. I help startups with MVP frontends, investor demos, and SEO-ready marketing sites (18+ yrs, ex–product team delivery).

If you're shaping [product/website] this quarter, I can share a 1-page scope template or a 15-min call — no pitch deck.

Worth a short chat? Reply "yes" or pass — either is fine.`,
  dmMvpLaunch: `Hi [Name] — noticed [startup] is pushing [launch/fundraise/feature].

If frontend/UI is on your critical path, we do focused MVP sprints (React/Next.js) with written milestones — founder on the thread throughout.

Portfolio: ${WEBSITE_URL}/portfolio — happy to send a relevant case study if useful.`,
} as const;

export const CLIENT_OUTREACH_DMS = {
  warmComment: `Hi [Name] — appreciated your comment on [topic].

If you ever want a second opinion on your site (speed, mobile UX, or lead CTAs), I do free 15-min reviews for founders/SMBs — no obligation.

Just reply "audit" if useful.`,
  postWebsitePain: `Hi [Name] — your post about [website/leads/SEO pain] resonated.

I help [industry] brands fix exactly that with React/Next.js + WhatsApp-first funnels — founder-led from Bitcraftly.

If you want a written ballpark (not a sales call), send your URL + goal — I'll reply async.`,
  afterPortfolioView: `Hi [Name] — thanks for checking Bitcraftly.

What are you building — business site, landing page, or product UI? I'll point you to the right package or honest "not a fit" in 2 lines.`,
  followUpNoReply: `Hi [Name] — gentle bump on my note below. If timing isn't right, no worries — I'll close the loop. If still exploring websites this quarter, reply with your URL and I'll send 3 quick wins.`,
  closeWon: `Great speaking with you, [Name]. Summary attached separately: scope, timeline, starting price. Next step: [advance/contract/content date]. WhatsApp me anytime for quick questions.`,
} as const;

/** 30-day execution plan */
export const LINKEDIN_30_DAY_PLAN = {
  week1: {
    title: "Profile & foundation",
    tasks: [
      "Update headline, About, banner (Bitcraftly + React/Next.js + Ghaziabad)",
      "Pin 3–5 Featured links (site, consult, portfolio, live client)",
      "Turn on Creator mode → select Website + Consulting topics",
      "Post 3×: intro story, React authority, AI practical",
      "Connect 15–20: startup founders + NCR SMB owners (personalized notes)",
      "Comment 5×/day on target accounts — zero pitch",
    ],
  },
  week2: {
    title: "Proof & engagement",
    tasks: [
      "Post 4×: case study, carousel (5-day package), founder lesson, poll",
      "DM 10 warm connections from Week 1 comments (template: warmComment)",
      "Publish 1 document: 'Ghaziabad business website checklist'",
      "Request 2 LinkedIn recommendations from past clients/colleagues",
      "Connect 20 more — agency peers + SaaS founders",
    ],
  },
  week3: {
    title: "Outbound & offers",
    tasks: [
      "Post 4×: AI + WhatsApp, Next.js SEO tip, client win, Friday offer",
      "10 founder DMs (startupFounder + dmMvpLaunch variants)",
      "Go live or Loom: 3-min portfolio walkthrough",
      "Engage in 2 LinkedIn groups (startup India, web dev)",
      "Track: connections, DMs sent, calls booked (spreadsheet)",
    ],
  },
  week4: {
    title: "Convert & systemize",
    tasks: [
      "Post 4×: testimonial/review, 30-day learnings, fast package, CTA consult",
      "Follow up all open DMs (followUpNoReply)",
      "Recycle best post as carousel v2",
      "Review metrics: profile views, search appearances, website clicks",
      "Plan Month 2: 1 newsletter-style post/week + 15 connects/week",
    ],
  },
  kpis: [
    "Profile views: +50% vs baseline",
    "Inbound DMs: 8–15/month",
    "Consultation calls booked: 4–8/month",
    "Paid projects: 1–2 from LinkedIn in 30–60 days (realistic for solo founder)",
  ],
} as const;

export const PREMIUM_POSITIONING = {
  neverSay: ["Cheap websites", "Best price guaranteed", "Unlimited revisions", "We do everything IT"],
  alwaysSay: ["Founder-led", "Written scope", "React/Next.js", "Lead-focused", "18+ years", "Practical AI"],
  dmKeywords: {
    SCOPE: "Free 15-min consultation + written ballpark",
    AUDIT: "Free website audit checklist",
    MVP: "Startup MVP frontend sprint info",
  },
} as const;
