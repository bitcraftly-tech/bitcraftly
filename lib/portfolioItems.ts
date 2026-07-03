import type { PortfolioFocusType } from "@/lib/portfolioContent";

/** @deprecated Import from @/lib/portfolio/categories */
export type { PortfolioCategoryId } from "@/lib/portfolio/categories";

export type PortfolioPerformanceMetric = {
  label: string;
  value: string;
  note?: string;
};

/** Hero metrics in case study modal */
export type CaseStudyHeadlineMetric = {
  value: string;
  label: string;
  icon?: "zap" | "trending" | "users" | "clock" | "target";
};

export type PortfolioMockup =
  | "restaurant"
  | "school"
  | "gym"
  | "ecommerce"
  | "chatbot"
  | "clinic"
  | "local"
  | "generic";

export type PortfolioProjectBadge = "Live client" | "Interactive demo";

export type PortfolioCaseStudy = {
  problem: string;
  solution: string;
  results: string[];
  beforeLabel: string;
  afterLabel: string;
  beforePoints: string[];
  afterPoints: string[];
  performance?: PortfolioPerformanceMetric[];
  trustNote?: string;
  /** Modal overview paragraph */
  overview?: string;
  client?: string;
  timeline?: string;
  categoryLabel?: string;
  services?: string[];
  headlineMetrics?: CaseStudyHeadlineMetric[];
};

export type PortfolioItem = {
  title: string;
  hint: string;
  /** Premium one-liner on cards */
  cardLine: string;
  /** Shorter line on mobile cards */
  mobileCardLine: string;
  /** Build type for filters & trust */
  projectFocus: PortfolioFocusType;
  gradient: string;
  emoji: string;
  mockup: PortfolioMockup;
  /** Optional card preview screenshot from /public/products */
  image?: string;
  featureBullets: string[];
  demoHref?: string;
  liveUrl?: string;
  ctaLabel?: string;
  details?: string;
  tag: "Website" | "Ecommerce" | "AI" | "Product UI";
  categories: (
    | "business-websites"
    | "startup-saas"
    | "react-nextjs"
    | "ai-powered"
    | "ecommerce"
    | "dashboard-admin"
  )[];
  badge: PortfolioProjectBadge;
  techStack: string[];
  githubUrl?: string;
  keyFeatures?: string[];
  resultHighlight: string;
  caseStudy: PortfolioCaseStudy;
};

export const RECENT_PROJECT_TRUST_LINES = [
  "Lead-focused UX",
  "SEO-ready structure",
  "WhatsApp handoff",
  "Fast mobile experience",
];

const defaultPerformance: PortfolioPerformanceMetric[] = [
  { label: "Mobile UX", value: "First", note: "Layouts built for phone traffic" },
  { label: "Lead CTA", value: "WhatsApp", note: "Enquiry path above the fold" },
  { label: "SEO", value: "Structured", note: "Titles, hierarchy, local basics" },
];

const defaultCaseStudy = (overrides: Partial<PortfolioCaseStudy>): PortfolioCaseStudy => ({
  problem: "Visitors were not converting — unclear offers, weak mobile UX, and no structured path to enquire.",
  solution: "A modern, mobile-first experience with clear CTAs, trust sections, and WhatsApp-ready contact flows.",
  results: ["Clearer user journey", "Faster mobile experience", "Structured SEO pages", "Easier enquiry handoff"],
  beforeLabel: "Before",
  afterLabel: "After (Bitcraftly build)",
  beforePoints: ["Generic layout", "Slow or cluttered mobile", "Weak CTA placement", "Limited local SEO structure"],
  afterPoints: ["Industry-tailored UX", "Mobile-first performance focus", "Prominent enquiry paths", "SEO-friendly page structure"],
  performance: defaultPerformance,
  trustNote: "Founder-led frontend — scope and stack choices explained before payment.",
  ...overrides,
});

export const homePortfolioItems: PortfolioItem[] = [
  {
    title: "Shrishti Cloud Kitchen",
    hint: "Menu-led UX, fast ordering path, local delivery trust",
    cardLine: "Live cloud kitchen — menu discovery built for WhatsApp orders",
    mobileCardLine: "Live site · menu + WhatsApp orders",
    projectFocus: "Next.js",
    gradient: "from-orange-500/20 to-amber-500/10",
    emoji: "🍽️",
    mockup: "restaurant",
    image: "/products/Shrishti Cloud Kitchen.png",
    featureBullets: [...RECENT_PROJECT_TRUST_LINES],
    liveUrl: "https://www.shrishticloud.kitchen/",
    ctaLabel: "View live site →",
    tag: "Website",
    categories: ["business-websites", "react-nextjs"],
    badge: "Live client",
    techStack: ["Next.js", "React", "Mobile UX", "SEO", "WhatsApp"],
    resultHighlight: "Menu-led path designed for faster order enquiries",
    caseStudy: defaultCaseStudy({
      problem: "Customers needed a faster way to browse menus and reach the kitchen without phone tag.",
      solution: "Menu-led website with mobile-first layout, local trust cues, and direct WhatsApp order handoff.",
      results: ["Clear menu discovery", "Mobile-friendly ordering path", "Local SEO structure", "WhatsApp-ready CTAs"],
      beforePoints: ["Menu scattered on social posts", "No dedicated mobile ordering flow", "Weak local discovery"],
      afterPoints: ["Structured menu UX", "One-tap WhatsApp order path", "Trust-first local brand page"],
      performance: [
        { label: "Ordering path", value: "Fewer taps", note: "Menu → WhatsApp without phone tag" },
        { label: "Mobile", value: "First", note: "Built for local delivery searches on phone" },
        { label: "Trust", value: "Brand-led", note: "Kitchen story + service area clarity" },
      ],
      trustNote: "Production client site — same delivery standards we offer new business builds.",
    }),
  },
  {
    title: "Swastik Makhana",
    hint: "Ecommerce UX, pack-size clarity & NCR delivery trust",
    cardLine: "Live D2C brand — premium makhana store with cart, packs & NCR delivery",
    mobileCardLine: "Live site · makhana ecommerce + NCR delivery",
    projectFocus: "Next.js",
    gradient: "from-emerald-500/20 to-lime-500/10",
    emoji: "🌿",
    mockup: "ecommerce",
    image: "/products/Swastik Makhana.png",
    featureBullets: ["Pack-size catalog", "Cart & checkout UX", "GI-tagged brand trust", "NCR delivery messaging"],
    liveUrl: "https://www.swastikmakhana.co/",
    ctaLabel: "View live site →",
    tag: "Ecommerce",
    categories: ["ecommerce", "business-websites", "react-nextjs"],
    badge: "Live client",
    techStack: ["Next.js", "React", "Ecommerce UX", "Mobile-first", "SEO"],
    resultHighlight: "Premium D2C storefront for GI-tagged makhana — packs, cart & NCR delivery",
    caseStudy: defaultCaseStudy({
      problem:
        "A Bihar-origin makhana brand needed a credible online store — not just social posts — with clear pack sizes, pricing, and delivery trust for NCR buyers.",
      solution:
        "Full ecommerce experience with pack-size catalog, coming-soon flavour roadmap, benefits & recipes content, secure checkout cues, and mobile-first brand storytelling from farm to shelf.",
      results: [
        "Clear pack-size product grid (100g–250g)",
        "Brand trust — GI tag, Bihar origin, farmer story",
        "NCR delivery & secure payment messaging",
        "Content hub for benefits, recipes & newsletter",
      ],
      beforePoints: [
        "No dedicated ecommerce storefront",
        "Pack sizes and pricing unclear online",
        "Weak delivery & payment trust signals",
      ],
      afterPoints: [
        "Structured shop with cart-ready packs",
        "Premium brand page with Bihar wetland story",
        "NCR delivery, secure payment & customer reviews",
      ],
      performance: [
        { label: "Catalog", value: "Pack-led", note: "100g–250g sizes with clear MRP & offer pricing" },
        { label: "Mobile", value: "First", note: "Shopping and storytelling tuned for phone buyers" },
        { label: "Trust", value: "GI + farm", note: "Bihar origin, farmer partnerships, reviews" },
      ],
      overview:
        "Live ecommerce site for Swastik Makhana — thin plain phool makhana from Bihar's wetlands, with pack-size shopping, flavour roadmap, and NCR delivery.",
      client: "Swastik Makhana",
      timeline: "Live production",
      categoryLabel: "Ecommerce · D2C",
      services: ["Next.js storefront", "Ecommerce UX", "Brand & content pages", "Mobile optimization"],
      headlineMetrics: [
        { value: "4.9★", label: "Customer rating", icon: "users" },
        { value: "5+", label: "Pack sizes live", icon: "target" },
        { value: "NCR", label: "Delivery zone", icon: "zap" },
      ],
      trustNote: "Production client site at swastikmakhana.co — same ecommerce delivery standards we offer D2C brands.",
    }),
  },
  {
    title: "Gym Website",
    hint: "Plans, trainers, class schedules & trial enquiries",
    cardLine: "Fitness brand demo — trials, classes & membership enquiries",
    mobileCardLine: "Gym demo · trials & class enquiries",
    projectFocus: "Business website",
    gradient: "from-rose-500/20 to-fuchsia-500/10",
    emoji: "💪",
    mockup: "gym",
    image: "/products/Gym Website.png",
    featureBullets: [...RECENT_PROJECT_TRUST_LINES],
    demoHref: "/portfolio/gym-fitness-showcase",
    ctaLabel: "Open interactive demo →",
    tag: "Website",
    categories: ["business-websites"],
    badge: "Interactive demo",
    techStack: ["React", "Responsive UI", "Lead forms", "SEO"],
    resultHighlight: "Trial & class enquiry flows tuned for mobile visitors",
    caseStudy: defaultCaseStudy({
      problem: "Gyms lose leads when class schedules and trial offers are hard to find on mobile.",
      solution: "Showcase with plans, trainer roster, timetable, and prominent trial CTA strip.",
      results: ["Trial offer above the fold", "Class schedule clarity", "Trainer credibility section"],
    }),
  },
  {
    title: "School Website",
    hint: "Admissions, notices & parent-friendly structure",
    cardLine: "Education demo — admissions funnel parents actually use",
    mobileCardLine: "School demo · admissions & notices",
    projectFocus: "Next.js",
    gradient: "from-blue-500/20 to-indigo-500/10",
    emoji: "🎓",
    mockup: "school",
    image: "/products/School Website.png",
    featureBullets: [...RECENT_PROJECT_TRUST_LINES],
    demoHref: "/portfolio/school-website-showcase",
    ctaLabel: "Open interactive demo →",
    tag: "Website",
    categories: ["business-websites"],
    badge: "Interactive demo",
    techStack: ["Next.js", "Forms", "Content structure", "Mobile UX"],
    resultHighlight: "Parent-friendly admissions and notices architecture",
    caseStudy: defaultCaseStudy({
      problem: "Parents could not quickly find admissions info, notices, and contact paths on older school sites.",
      solution: "Admission-focused layout with notices, downloads, and enquiry forms scoped for parent journeys.",
      results: ["Clear admission CTA", "Notices & calendar structure", "Mobile-readable content hierarchy"],
    }),
  },
  {
    title: "Ecommerce Store",
    hint: "Catalog, checkout clarity & delivery messaging",
    cardLine: "Ecommerce demo — catalog UX, checkout clarity, COD trust",
    mobileCardLine: "Store demo · catalog + checkout clarity",
    projectFocus: "Next.js",
    gradient: "from-violet-500/20 to-purple-500/10",
    emoji: "🛍️",
    mockup: "ecommerce",
    image: "/products/Ecommerce Store.png",
    featureBullets: ["Category-led UX", "Checkout clarity", "Mobile shopping", "Trust badges"],
    demoHref: "/portfolio/ecommerce-store-showcase",
    ctaLabel: "Open interactive demo →",
    tag: "Ecommerce",
    categories: ["ecommerce", "react-nextjs"],
    badge: "Interactive demo",
    techStack: ["Next.js", "React", "Razorpay-ready UX", "Cart flows"],
    resultHighlight: "Shopping flow designed for clarity — not checkout confusion",
    caseStudy: defaultCaseStudy({
      problem: "Small stores lose sales when catalog browsing and checkout steps feel cluttered on mobile.",
      solution: "Category-led storefront with trust badges, delivery/COD messaging, and simplified checkout path.",
      results: ["Clear product discovery", "Mobile checkout patterns", "Payment-ready UX scaffolding"],
      beforePoints: ["Flat product lists", "Unclear shipping/COD info", "Heavy checkout friction"],
      afterPoints: ["Category navigation", "Trust & delivery messaging", "Streamlined mobile checkout UX"],
    }),
  },
];

const portfolioExtras: PortfolioItem[] = [
  {
    title: "Builder Website",
    hint: "Projects, credibility & enquiry-ready layouts",
    cardLine: "Real estate demo — project gallery that builds enquiry trust",
    mobileCardLine: "Builder demo · project gallery + leads",
    projectFocus: "Business website",
    gradient: "from-slate-500/18 to-zinc-500/10",
    emoji: "🏗️",
    mockup: "local",
    image: "/products/Builder Website.png",
    featureBullets: ["Project highlights", "Lead enquiries", "Mobile friendly"],
    demoHref: "/portfolio/dayal-builders-showcase",
    ctaLabel: "Open interactive demo →",
    tag: "Website",
    categories: ["business-websites"],
    badge: "Interactive demo",
    techStack: ["React", "Gallery UX", "Lead forms"],
    resultHighlight: "Project credibility structured for serious buyer enquiries",
    details: "Trust-first pages for builders — project showcases and enquiry flows scoped to how you sell.",
    caseStudy: defaultCaseStudy({
      problem: "Builders relied on PDFs and phone calls — projects were not showcased with modern mobile credibility.",
      solution: "Project gallery, enquiry forms, and trust sections without turning the site into a listings portal.",
    }),
  },
  {
    title: "Society Portal",
    hint: "Residents, notices & practical workflows",
    cardLine: "Resident portal demo — notices, forms & lightweight workflows",
    mobileCardLine: "Portal demo · notices & resident forms",
    projectFocus: "Dashboard / admin",
    gradient: "from-emerald-500/15 to-teal-500/12",
    emoji: "🏘️",
    mockup: "generic",
    image: "/products/Society Portal.png",
    featureBullets: ["Clear resident UX", "Forms & notices", "WhatsApp-friendly"],
    demoHref: "/portfolio/society-management-showcase",
    ctaLabel: "Open interactive demo →",
    tag: "Website",
    categories: ["business-websites", "startup-saas", "dashboard-admin"],
    badge: "Interactive demo",
    techStack: ["React", "Forms", "Notices UX", "Admin patterns"],
    resultHighlight: "Resident tasks simplified — not a heavy ERP pitch",
    details: "Lightweight resident-facing sites — notices, forms and handoffs scoped to committee needs.",
    caseStudy: defaultCaseStudy({
      problem: "Societies needed resident-facing clarity without buying an oversized management suite.",
      solution: "Focused portal patterns for notices, forms, and WhatsApp-friendly resident communication.",
    }),
  },
  {
    title: "AI Chatbot for Restaurant",
    hint: "Menu FAQs, smart replies & WhatsApp handoff",
    cardLine: "AI demo — menu answers with human WhatsApp handoff",
    mobileCardLine: "AI chat · menu FAQs → WhatsApp",
    projectFocus: "AI-powered",
    gradient: "from-indigo-500/15 to-slate-500/15",
    emoji: "💬",
    mockup: "chatbot",
    image: "/products/AI Chatbot for Restaurant.png",
    featureBullets: ["Quick menu answers", "WhatsApp handoff", "Hours & FAQs"],
    demoHref: "/portfolio/restaurant-ai-chatbot-showcase",
    ctaLabel: "Open AI demo →",
    tag: "AI",
    categories: ["ai-powered", "business-websites"],
    badge: "Interactive demo",
    techStack: ["OpenAI", "Next.js", "React", "WhatsApp API"],
    keyFeatures: [
      "Natural language menu queries",
      "WhatsApp handoff for complex orders",
      "24/7 automated customer support",
      "Multi-language support ready",
      "Order tracking integration",
      "Custom training on menu data",
    ],
    resultHighlight: "FAQ automation that still routes to a real person",
    details: "Customer-facing assistant for menus, hours, and quick questions — with clean handoff to staff or WhatsApp.",
    caseStudy: defaultCaseStudy({
      overview:
        "AI chatbot for restaurants with WhatsApp integration, enabling automated customer support, menu queries, and order assistance while maintaining a human touch for complex requests.",
      client: "The Food Junction (Demo)",
      timeline: "3 Weeks",
      categoryLabel: "AI Solutions",
      services: ["AI Development", "WhatsApp Integration"],
      headlineMetrics: [
        { value: "45%", label: "Faster Response", icon: "zap" },
        { value: "32%", label: "Order Increase", icon: "trending" },
        { value: "2.8K+", label: "Happy Users", icon: "users" },
      ],
      problem: "Staff repeated the same menu and hours questions — wasting time on low-value calls.",
      solution: "AI-assisted FAQ layer with structured menu answers and WhatsApp escalation when humans are needed.",
      results: ["Faster FAQ resolution", "Staff time saved on repeat questions", "WhatsApp handoff preserved"],
      beforePoints: ["Manual replies only", "No structured menu Q&A", "Leads lost after hours"],
      afterPoints: ["Instant menu/hours answers", "Smart escalation paths", "Brand-consistent tone"],
    }),
  },
  {
    title: "Clinic & Healthcare",
    hint: "Doctors, timings, appointment requests",
    cardLine: "Healthcare demo — credible layout + appointment enquiries",
    mobileCardLine: "Clinic demo · doctors + appointments",
    projectFocus: "Business website",
    gradient: "from-cyan-500/20 to-teal-500/10",
    emoji: "🏥",
    mockup: "clinic",
    image: "/products/Clinic & Healthcare.png",
    featureBullets: ["Doctor profiles", "Appointment requests", "Mobile friendly"],
    demoHref: "/portfolio/clinic-healthcare-showcase",
    ctaLabel: "Open interactive demo →",
    tag: "Website",
    categories: ["business-websites"],
    badge: "Interactive demo",
    techStack: ["React", "Forms", "Trust UX", "SEO"],
    resultHighlight: "Patient trust and appointment paths on mobile",
    details: "Clean layouts that feel credible — services, doctors, and secure enquiry flows.",
    caseStudy: defaultCaseStudy({
      problem: "Clinics lost patient trust online when sites looked outdated or hid appointment options.",
      solution: "Credible healthcare layout with doctor profiles, services, and secure appointment enquiry flows.",
    }),
  },
  {
    title: "RPY Training Institute",
    hint: "Vocational courses, verification & placement",
    cardLine: "Training institute demo — courses, verify docs & franchise",
    mobileCardLine: "RPY Tech demo · vocational training site",
    projectFocus: "Business website",
    gradient: "from-blue-900/25 to-orange-500/15",
    emoji: "🏭",
    mockup: "local",
    image: "/products/RPY Training Institute.png",
    featureBullets: ["Course catalog", "Certificate verify", "Placement cell"],
    demoHref: "/portfolio/rpytech-training-showcase",
    ctaLabel: "Open interactive demo →",
    tag: "Website",
    categories: ["business-websites"],
    badge: "Interactive demo",
    techStack: ["Next.js", "Responsive UI", "Forms", "SEO"],
    resultHighlight: "Vocational training homepage — courses, verification & placement",
    caseStudy: defaultCaseStudy({
      problem: "Training institutes need credible sites with verification, course discovery, and placement proof.",
      solution: "Full homepage mock aligned to rpytech.in — hero, stats, courses, gallery, franchise & contact.",
      results: ["Verification flows", "Course carousel", "Placement & partner sections"],
    }),
  },
  {
    title: "Local Services Lead Site",
    hint: "Coaching, salons, CA firms — calls & WhatsApp",
    cardLine: "Local services demo — high-intent CTAs for coaches & pros",
    mobileCardLine: "Local leads demo · WhatsApp-first funnel",
    projectFocus: "Business website",
    gradient: "from-amber-500/20 to-yellow-500/10",
    emoji: "📍",
    mockup: "local",
    image: "/products/Local Services Lead Site.png",
    featureBullets: ["Strong CTAs", "WhatsApp contact", "Local-ready pages"],
    demoHref: "/portfolio/local-services-leads-showcase",
    ctaLabel: "Open interactive demo →",
    tag: "Website",
    categories: ["business-websites"],
    badge: "Interactive demo",
    techStack: ["React", "Landing UX", "Local SEO"],
    resultHighlight: "One-page funnels engineered for calls and WhatsApp",
    details: "Multi-page funnels with strong CTAs for local search and professional services.",
    caseStudy: defaultCaseStudy({
      problem: "Coaches and local pros depended on Instagram alone — no structured funnel to capture leads.",
      solution: "Lead-focused site with service clarity, social proof placeholders, and WhatsApp-first contact.",
    }),
  },
  {
    title: "React Product UI Demo",
    hint: "SaaS-style screens, motion & component systems",
    cardLine: "Startup UI demo — React product screens & interaction patterns",
    mobileCardLine: "SaaS UI demo · React dashboards & flows",
    projectFocus: "Startup frontend",
    gradient: "from-indigo-500/20 to-violet-500/10",
    emoji: "⚛️",
    mockup: "generic",
    image: "/products/Next-Gen SaaS Platform.png",
    featureBullets: ["Component patterns", "Dashboard-ready UI", "Responsive layouts"],
    demoHref: "/portfolio/react-video-demo",
    ctaLabel: "Open product demo →",
    tag: "Product UI",
    categories: ["startup-saas", "react-nextjs", "dashboard-admin"],
    badge: "Interactive demo",
    techStack: ["React.js", "TypeScript", "Dashboard UI", "Motion"],
    resultHighlight: "Product-grade frontend patterns for SaaS & startup MVPs",
    details: "Showcase of modern React UI patterns for founders who need investor-ready product screens.",
    caseStudy: defaultCaseStudy({
      problem: "Startups needed polished UI fast without hiring a full product team.",
      solution: "React-based product demo illustrating scalable components, states, and dashboard-ready layouts.",
      results: ["Reusable UI patterns", "Investor-demo ready screens", "Maintainable component structure"],
    }),
  },
];

export const portfolioPageItems: PortfolioItem[] = [...homePortfolioItems, ...portfolioExtras];

export function slugifyPortfolioTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getPortfolioPageItemBySlug(slug: string): PortfolioItem | undefined {
  return portfolioPageItems.find((item) => slugifyPortfolioTitle(item.title) === slug);
}

export { filterPortfolioByCategory, countByCategory } from "@/lib/portfolio/categories";
