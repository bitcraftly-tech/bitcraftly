import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { getIndustryHref } from '@/constants/industries';
import type {
  IndustryCaseStudy,
  IndustryChallenge,
  IndustryComparisonRow,
  IndustryFaqItem,
  IndustryMetric,
  IndustryModel,
  IndustryProcessStep,
  IndustryProofItem,
  IndustryRelatedService,
  IndustryRoiOutcome,
  IndustrySolutionOffer,
  IndustryTechItem,
  IndustryWhyItem,
} from './industries.types';

function href(slug: string): string {
  return getIndustryHref(slug);
}

/** Full industry catalog for the Industries landing (and slug pages). */
export const INDUSTRIES_CATALOG: readonly IndustryModel[] = [
  {
    slug: 'healthcare',
    label: 'Healthcare',
    shortLabel: 'Care',
    description:
      'Patient-ready Industry System — website, ops dashboard, AI intake, leads, analytics, and integrations.',
    icon: 'shield',
    illustration: 'care',
    accent: 'teal',
    featured: true,
    companySize: 'Clinics → hospital groups',
    projectDuration: '8–16 weeks',
    technologyTags: ['Next.js', 'FastAPI', 'PostgreSQL', 'AWS'],
    businessGoals: ['Cut no-shows', 'Unify records', 'Audit readiness'],
    painPoints: [
      'Fragmented patient records across tools',
      'Manual scheduling and follow-ups',
      'Audit and privacy pressure',
    ],
    solutions: [
      'Unified care dashboards',
      'Role-based access & consent flows',
      'Automation for reminders and triage',
    ],
  },
  {
    slug: 'education',
    label: 'Education',
    shortLabel: 'Learn',
    description:
      'Learning platforms, admissions, and campus operations built for students, faculty, and administrators.',
    icon: 'message',
    illustration: 'learn',
    accent: 'indigo',
    featured: true,
    companySize: 'Institutions → edtech',
    projectDuration: '6–14 weeks',
    technologyTags: ['Next.js', 'Node.js', 'PostgreSQL', 'Analytics'],
    businessGoals: ['Faster enrollment', 'Mobile learning', 'Cohort insight'],
    painPoints: [
      'Scattered LMS and admin systems',
      'Poor mobile learning experience',
      'Slow reporting for decision makers',
    ],
    solutions: [
      'Modern learning portals',
      'Enrollment & payment workflows',
      'Analytics for cohorts and outcomes',
    ],
  },
  {
    slug: 'retail-ecommerce',
    label: 'Retail',
    shortLabel: 'Retail',
    description:
      'Storefronts, inventory, and commerce operations that convert browsers into repeat buyers.',
    icon: 'sparkles',
    illustration: 'shop',
    accent: 'amber',
    featured: true,
    companySize: 'D2C → multi-store',
    projectDuration: '6–12 weeks',
    technologyTags: ['Next.js', 'Commerce APIs', 'Cloud', 'A/B'],
    businessGoals: ['Raise conversion', 'Sync inventory', 'Faster campaigns'],
    painPoints: [
      'Checkout drop-offs',
      'Inventory disconnected from channels',
      'Slow campaign iteration',
    ],
    solutions: [
      'Performance-first storefronts',
      'OMS & catalog sync',
      'Conversion analytics & A/B ready UX',
    ],
  },
  {
    slug: 'manufacturing',
    label: 'Manufacturing',
    shortLabel: 'Plant',
    description:
      'Plant visibility, quality workflows, and operator software that keep production lines honest.',
    icon: 'database',
    illustration: 'factory',
    accent: 'sky',
    companySize: 'Plants → mid-market OEM',
    projectDuration: '10–18 weeks',
    technologyTags: ['React', 'APIs', 'IoT data', 'Dashboards'],
    businessGoals: ['Live visibility', 'Quality capture', 'Less paper ops'],
    painPoints: [
      'Paper-based shop-floor updates',
      'Limited live production visibility',
      'Quality issues found too late',
    ],
    solutions: [
      'Ops dashboards & alerts',
      'Digital work instructions',
      'Quality capture with audit trails',
    ],
  },
  {
    slug: 'fintech',
    label: 'Finance',
    shortLabel: 'Finance',
    description:
      'Payments, lending, and wealth experiences engineered for trust, speed, and regulator readiness.',
    icon: 'trending-up',
    illustration: 'finance',
    accent: 'emerald',
    featured: true,
    companySize: 'Fintech → NBFC',
    projectDuration: '10–20 weeks',
    technologyTags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Security'],
    businessGoals: ['Faster KYC', 'Safer portals', 'Ship new products'],
    painPoints: [
      'Legacy cores slow new products',
      'Manual KYC / ops bottlenecks',
      'Security and audit demand rising',
    ],
    solutions: [
      'API-first product shells',
      'Workflow automation for ops',
      'Secure multi-role portals',
    ],
  },
  {
    slug: 'real-estate',
    label: 'Real Estate',
    shortLabel: 'Property',
    description:
      'Real Estate Industry System — listings, lead pipeline, AI assistant, and performance analytics.',
    icon: 'globe',
    illustration: 'property',
    accent: 'rose',
    featured: true,
    companySize: 'Brokers → developers',
    projectDuration: '6–12 weeks',
    technologyTags: ['Next.js', 'CRM APIs', 'Maps', 'Reporting'],
    businessGoals: ['Lead capture', 'Listing freshness', 'Owner visibility'],
    painPoints: ['Stale listing data', 'Lead leakage across brokers', 'Weak owner visibility'],
    solutions: [
      'CRM-linked listing platforms',
      'Lead routing & nurture flows',
      'Owner dashboards & reporting',
    ],
  },
  {
    slug: 'restaurant',
    label: 'Restaurant',
    shortLabel: 'Dining',
    description:
      'Restaurant Industry System — brand site, reservations/leads, AI concierge, and operations dashboard.',
    icon: 'sparkles',
    illustration: 'stay',
    accent: 'amber',
    featured: true,
    companySize: 'Single location → groups',
    projectDuration: 'Configure → brand → launch',
    technologyTags: ['Next.js', 'Bookings', 'AI', 'Ops'],
    businessGoals: ['Fill covers', 'Capture demand', 'Streamline ops'],
    painPoints: [
      'Reservations and inquiries in separate tools',
      'Brand site not connected to ops',
      'Guest questions overwhelm staff',
    ],
    solutions: [
      'Complete Restaurant Industry System',
      'AI concierge workflows',
      'Ops dashboard + integrations',
    ],
  },
  {
    slug: 'corporate-services',
    label: 'Corporate Services',
    shortLabel: 'Corporate',
    description:
      'Corporate Services Industry System — authority website, CRM leads, AI assistant, and executive analytics.',
    icon: 'workflow',
    illustration: 'saas',
    accent: 'indigo',
    featured: true,
    companySize: 'Professional firms → B2B services',
    projectDuration: 'Configure → brand → launch',
    technologyTags: ['Next.js', 'CMS', 'AI', 'Analytics'],
    businessGoals: ['Build authority', 'Qualify demand', 'Operate clearly'],
    painPoints: [
      'Website sells services but ops stay fragmented',
      'Leads lack qualification and routing',
      'No single view of pipeline performance',
    ],
    solutions: [
      'Complete Corporate Services Industry System',
      'Lead management + AI assistant',
      'Executive dashboard and analytics',
    ],
  },
  {
    slug: 'logistics',
    label: 'Logistics',
    shortLabel: 'Fleet',
    description:
      'Tracking, fulfillment, and partner portals that keep shipments visible from dock to door.',
    icon: 'workflow',
    illustration: 'ship',
    accent: 'sky',
    companySize: '3PL → regional fleets',
    projectDuration: '8–16 weeks',
    technologyTags: ['React', 'APIs', 'Realtime', 'Cloud'],
    businessGoals: ['Shipment visibility', 'Partner sync', 'Exception speed'],
    painPoints: [
      'Blind spots in last-mile status',
      'Partner coordination via spreadsheets',
      'Exception handling overload',
    ],
    solutions: [
      'Real-time tracking UIs',
      'Partner APIs & portals',
      'Exception workflows with alerts',
    ],
  },
  {
    slug: 'hospitality',
    label: 'Hospitality',
    shortLabel: 'Stay',
    description:
      'Booking, guest journeys, and property ops for hotels and experiences that live on reviews.',
    icon: 'star',
    illustration: 'stay',
    accent: 'amber',
    companySize: 'Boutique → multi-property',
    projectDuration: '6–14 weeks',
    technologyTags: ['Next.js', 'Bookings', 'Payments', 'Ops'],
    businessGoals: ['Fewer booking conflicts', 'Faster guest care', 'Ops clarity'],
    painPoints: [
      'Channel booking conflicts',
      'Guest requests handled manually',
      'Ops and front-desk disconnect',
    ],
    solutions: [
      'Unified booking experiences',
      'Guest service workflows',
      'Property ops dashboards',
    ],
  },
  {
    slug: 'travel',
    label: 'Travel',
    shortLabel: 'Travel',
    description:
      'Booking engines, itinerary tools, and traveler products built for peak load and change.',
    icon: 'rocket',
    illustration: 'travel',
    accent: 'indigo',
    companySize: 'OTAs → travel brands',
    projectDuration: '10–18 weeks',
    technologyTags: ['Next.js', 'Search', 'Supplier APIs', 'Cloud'],
    businessGoals: ['Peak resilience', 'Supplier orchestration', 'Self-serve changes'],
    painPoints: [
      'Fragile search under peak traffic',
      'Complex supplier integrations',
      'Changes and refunds overwhelm support',
    ],
    solutions: [
      'Scalable search & booking UX',
      'Supplier orchestration layers',
      'Self-serve change flows',
    ],
  },
  {
    slug: 'government',
    label: 'Government',
    shortLabel: 'Civic',
    description:
      'Citizen services and internal systems designed for accessibility, auditability, and trust.',
    icon: 'shield',
    illustration: 'civic',
    accent: 'teal',
    companySize: 'Departments → agencies',
    projectDuration: '12–24 weeks',
    technologyTags: ['Accessible UI', 'Workflows', 'Secure docs', 'Audit'],
    businessGoals: ['Citizen clarity', 'Cross-dept flow', 'Accessible services'],
    painPoints: [
      'Legacy portals hard to use',
      'Siloed department systems',
      'Accessibility and language gaps',
    ],
    solutions: [
      'Accessible citizen portals',
      'Workflow across departments',
      'Secure document & status tracking',
    ],
  },
  {
    slug: 'startups',
    label: 'Startups',
    shortLabel: 'Startup',
    description:
      'MVP to scale — founder-led product engineering with AI where it compounds growth.',
    icon: 'zap',
    illustration: 'launch',
    accent: 'rose',
    companySize: 'Seed → Series B',
    projectDuration: '4–12 weeks',
    technologyTags: ['Next.js', 'FastAPI', 'AI', 'Cloud'],
    businessGoals: ['Ship MVP fast', 'Protect runway', 'AI that compounds'],
    painPoints: [
      'Need speed without rewrite debt',
      'Unclear scope burns runway',
      'Hiring full squads too early',
    ],
    solutions: [
      'Phased MVP delivery',
      'Written estimates & milestones',
      'AI features that ship with the core',
    ],
  },
  {
    slug: 'saas',
    label: 'SaaS',
    shortLabel: 'SaaS',
    description:
      'Multi-tenant products with billing-ready architecture, roles, and scalable delivery.',
    icon: 'cloud',
    illustration: 'saas',
    accent: 'emerald',
    companySize: 'B2B SaaS teams',
    projectDuration: '8–16 weeks',
    technologyTags: ['Next.js', 'Multi-tenant', 'Billing', 'SSO'],
    businessGoals: ['Tenant isolation', 'Clean entitlements', 'Enterprise ready'],
    painPoints: [
      'Tenant isolation complexity',
      'Billing and entitlements drift',
      'Hard to onboard enterprise buyers',
    ],
    solutions: [
      'Multi-tenant foundations',
      'Plans, seats & usage models',
      'Admin, audit & SSO-ready paths',
    ],
  },
] as const;

export function getIndustryModelBySlug(slug: string): IndustryModel | undefined {
  return INDUSTRIES_CATALOG.find((item) => item.slug === slug);
}

export const INDUSTRIES_LANDING = {
  eyebrow: 'Industries',
  title: 'Domain networks. Measurable delivery.',
  titleHighlight: 'networks',
  description:
    'Bitcraftly partners with organizations across industries to design and build digital systems that solve real operational challenges — and deliver measurable results.',
  primaryCta: {
    label: NAV_ACTIONS.freeConsultation.label,
    href: NAV_ACTIONS.freeConsultation.href,
  },
  secondaryCta: {
    label: 'Browse industries',
    href: '#industries-grid',
  },
  highlights: [
    {
      id: 'expertise',
      title: 'Industry Expertise',
      description: 'Deep domain knowledge across 12+ industries',
      icon: 'layout-grid' as const,
      tone: 'primary' as const,
    },
    {
      id: 'scale',
      title: 'Scalable Solutions',
      description: 'Future-ready systems built to scale',
      icon: 'trending-up' as const,
      tone: 'success' as const,
    },
    {
      id: 'impact',
      title: 'Measurable Impact',
      description: 'Data-driven results that move your business forward',
      icon: 'sparkles' as const,
      tone: 'amber' as const,
    },
  ],
  trust: ['12+ verticals mapped', 'Compliance-aware engineering', 'Founder-led delivery'],
  heroPanel: {
    title: 'Industry coverage',
    countLabel: 'verticals',
    verticalColumn: 'Vertical',
    timelineColumn: 'Timeline',
    caption:
      'Featured industries with the organizations we build for and typical delivery timelines',
    note: 'Written proposal before delivery starts',
    moreLabel: 'Full list',
    moreHref: '#industries-grid',
  },
  trustedBy: {
    label: 'Trusted by innovative companies across industries',
    brands: [
      { id: 'medanta', name: 'Medanta' },
      { id: 'byjus', name: "BYJU'S" },
      { id: 'tata', name: 'TATA' },
      { id: 'zepto', name: 'Zepto' },
      { id: 'reliance', name: 'Reliance' },
      { id: 'delhivery', name: 'Delhivery' },
      { id: 'apollo', name: 'Apollo' },
      { id: 'hdfc', name: 'HDFC Bank' },
      { id: 'infosys', name: 'Infosys' },
      { id: 'swiggy', name: 'Swiggy' },
      { id: 'nestle', name: 'Nestlé' },
      { id: 'pharmeasy', name: 'PharmEasy' },
    ] as const,
  },
  featuredHeading: 'Where operators ask us first',
  featuredDescription:
    'High-signal verticals where we ship portals, ops tools, and AI workflows under real regulatory and growth pressure.',
  gridHeading: 'Industries we engineer for',
  gridDescription:
    'Explore how Bitcraftly maps pains to platforms — then talk with us about your operating reality.',
  proofHeading: 'Trusted by organizations like',
  proofDescription:
    'Domain patterns we see across operators who need durable systems — not slideware.',
  challengesHeading: 'Business challenges we see first',
  challengesDescription:
    'Before features, we understand friction — across compliance, scale, and day-to-day ops.',
  solutionsHeading: 'Bitcraftly solutions for your vertical',
  solutionsDescription: 'Composable builds that plug into how your industry already works.',
  techHeading: 'Technology stack',
  techDescription: 'Modern web, APIs, cloud, and AI — chosen for maintainability in your domain.',
  casesHeading: 'Outcomes by industry',
  casesDescription: 'Representative results from vertical engagements — scoped, shipped, measured.',
  metricsHeading: 'Business outcomes that compound',
  metricsDescription:
    'Premium KPI signals operators care about — manual work, reporting, deployment, cost, and satisfaction.',
  processHeading: 'How we enter a vertical',
  processDescription: 'A grounded path from domain discovery to systems your team can own.',
  comparisonHeading: 'Why industry-specific engineering matters',
  comparisonDescription:
    'Generic agency delivery vs Bitcraftly vertical engineering — side by side.',
  whyHeading: 'Why Bitcraftly for industries',
  whyDescription: 'Vertical empathy plus production engineering — without agency theater.',
  faqHeading: 'Industry FAQs',
  faqDescription: 'Straight answers about how we work inside regulated and high-growth markets.',
  relatedHeading: 'Related services',
  relatedDescription: 'Capabilities that pair with industry engagements.',
  cta: {
    heading: 'Tell us how your industry runs',
    description:
      'Book a free consultation, message us on WhatsApp, or schedule a discovery call — clear next steps, no pressure.',
    primaryCta: {
      label: 'Book Free Consultation',
      href: '/contact?intent=consultation&source=industries',
    },
    tertiaryCta: {
      label: 'Schedule Discovery Call',
      href: '/contact?intent=discovery&source=industries',
    },
    trust: [
      'Response within 24 hours',
      'Free consultation',
      'No obligation',
      'Written proposal',
    ] as const,
  },
} as const;

export const INDUSTRY_PROOF: readonly IndustryProofItem[] = [
  {
    id: 'healthcare',
    industry: 'Healthcare',
    outcome: 'Fewer no-shows with reminder automation and clearer clinic queues.',
    icon: 'shield',
    tone: 'emerald',
  },
  {
    id: 'retail',
    industry: 'Retail',
    outcome: 'Faster campaign launches with catalog sync across channels.',
    icon: 'sparkles',
    tone: 'amber',
  },
  {
    id: 'manufacturing',
    industry: 'Manufacturing',
    outcome: 'Live plant visibility that replaces paper shop-floor updates.',
    icon: 'database',
    tone: 'sky',
  },
  {
    id: 'education',
    industry: 'Education',
    outcome: 'Enrollment and learning portals decision-makers can actually report on.',
    icon: 'message',
    tone: 'primary',
  },
  {
    id: 'finance',
    industry: 'Finance',
    outcome: 'KYC exception consoles that cut review time with audit trails intact.',
    icon: 'trending-up',
    tone: 'accent',
  },
] as const;

export const INDUSTRY_CHALLENGES: readonly IndustryChallenge[] = [
  {
    id: 'compliance',
    title: 'Compliance without freezing delivery',
    problem: 'Privacy, audit, and industry rules arrive mid-roadmap.',
    impact: 'Teams slow shipping or accumulate risk in undocumented shortcuts.',
    approach: 'Design access, logs, and workflows so scrutiny is built-in.',
    outcome: 'Ship speed survives audits — without rewriting under pressure.',
    icon: 'shield',
    tone: 'emerald',
  },
  {
    id: 'integration',
    title: 'Legacy systems that must stay online',
    problem: 'Core systems cannot be ripped out in a single quarter.',
    impact: 'Duplicate data entry and fragile bridges burn ops capacity.',
    approach: 'Wrap cores with APIs, portals, and staged migration paths.',
    outcome: 'Modern UX on durable foundations — zero big-bang risk.',
    icon: 'workflow',
    tone: 'primary',
  },
  {
    id: 'ops',
    title: 'Ops still living in spreadsheets',
    problem: 'Critical process lives in tribal knowledge and shared sheets.',
    impact: 'Exceptions pile up; reporting lags peak demand.',
    approach: 'Turn process into software — alerts, roles, and durable queues.',
    outcome: 'Floor teams run the system without chasing status on chat.',
    icon: 'layout-grid',
    tone: 'amber',
  },
  {
    id: 'scale',
    title: 'Peak load and partner sprawl',
    problem: 'Seasons, tenders, and partner volume spike unpredictably.',
    impact: 'Outages and manual workarounds appear exactly when revenue peaks.',
    approach: 'Architectures that bend with demand — queues, caching, observability.',
    outcome: 'Peak windows feel planned — not heroic.',
    icon: 'trending-up',
    tone: 'accent',
  },
] as const;

export const INDUSTRY_SOLUTION_OFFERS: readonly IndustrySolutionOffer[] = [
  {
    id: 'portals',
    title: 'Industry portals',
    description: 'Patient, student, broker, citizen, and partner experiences with clear roles.',
    recommendedServices: ['Web applications', 'Custom software'],
    technologyStack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    deliveryModel: 'Fixed milestones · weekly demos',
    typicalTimeline: '6–12 weeks to first release',
    icon: 'globe',
    href: ROUTES.solutions,
    ctaLabel: 'Explore portals',
    tone: 'primary',
  },
  {
    id: 'ops-systems',
    title: 'Operations systems',
    description: 'Dashboards, queues, and automation that compress exception handling.',
    recommendedServices: ['Custom software', 'AI solutions'],
    technologyStack: ['React', 'FastAPI', 'Observability'],
    deliveryModel: 'Phased core → deepen workflows',
    typicalTimeline: '8–14 weeks to ops core',
    icon: 'database',
    href: ROUTES.services,
    ctaLabel: 'Explore ops systems',
    tone: 'emerald',
  },
  {
    id: 'ai-workflows',
    title: 'AI workflows',
    description: 'Assistive automation that keeps humans in the loop where judgment matters.',
    recommendedServices: ['AI solutions', 'Custom software'],
    technologyStack: ['OpenAI', 'Workflow engines', 'APIs'],
    deliveryModel: 'Guardrailed pilots · human escalation',
    typicalTimeline: '4–10 weeks to assisted workflow',
    icon: 'brain',
    href: `${ROUTES.solutions}/ai-automation`,
    ctaLabel: 'Explore AI workflows',
    tone: 'accent',
  },
  {
    id: 'commerce',
    title: 'Commerce & bookings',
    description: 'Conversion-first storefronts, reservations, and payment-ready journeys.',
    recommendedServices: ['Website development', 'Web applications'],
    technologyStack: ['Next.js', 'Payments', 'Analytics'],
    deliveryModel: 'Performance-first · iteration loops',
    typicalTimeline: '6–12 weeks to launchable UX',
    icon: 'sparkles',
    href: `${ROUTES.services}/website-development`,
    ctaLabel: 'Explore commerce',
    tone: 'amber',
  },
] as const;

export const INDUSTRY_TECH: readonly IndustryTechItem[] = [
  { name: 'Next.js', category: 'Frontend', icon: 'rocket', tone: 'primary' },
  { name: 'React', category: 'Frontend', icon: 'sparkles', tone: 'accent' },
  { name: 'TypeScript', category: 'Frontend', icon: 'code', tone: 'sky' },
  { name: 'Node.js', category: 'Backend', icon: 'workflow', tone: 'emerald' },
  { name: 'Python / FastAPI', category: 'Backend', icon: 'zap', tone: 'amber' },
  { name: 'PostgreSQL', category: 'Backend', icon: 'database', tone: 'primary' },
  { name: 'AWS', category: 'Cloud', icon: 'cloud', tone: 'sky' },
  { name: 'Docker', category: 'Cloud', icon: 'cloud', tone: 'accent' },
  { name: 'Supabase', category: 'Cloud', icon: 'database', tone: 'emerald' },
  { name: 'OpenAI', category: 'AI', icon: 'brain', tone: 'rose' },
  { name: 'Assistive models', category: 'AI', icon: 'bot', tone: 'primary' },
  { name: 'Workflow engines', category: 'Automation', icon: 'workflow', tone: 'amber' },
  { name: 'Queue & alerts', category: 'Automation', icon: 'zap', tone: 'emerald' },
  { name: 'Product analytics', category: 'Analytics', icon: 'trending-up', tone: 'sky' },
  { name: 'Ops reporting', category: 'Analytics', icon: 'search', tone: 'accent' },
] as const;

/** Category-wise technology groups for the Industries stack section. */
export const INDUSTRY_TECH_GROUPS = [
  {
    id: 'frontend',
    category: 'Frontend',
    icon: 'rocket' as const,
    tone: 'primary' as const,
    items: INDUSTRY_TECH.filter((item) => item.category === 'Frontend'),
  },
  {
    id: 'backend',
    category: 'Backend',
    icon: 'workflow' as const,
    tone: 'emerald' as const,
    items: INDUSTRY_TECH.filter((item) => item.category === 'Backend'),
  },
  {
    id: 'cloud',
    category: 'Cloud',
    icon: 'cloud' as const,
    tone: 'sky' as const,
    items: INDUSTRY_TECH.filter((item) => item.category === 'Cloud'),
  },
  {
    id: 'ai',
    category: 'AI',
    icon: 'brain' as const,
    tone: 'rose' as const,
    items: INDUSTRY_TECH.filter((item) => item.category === 'AI'),
  },
  {
    id: 'automation',
    category: 'Automation',
    icon: 'zap' as const,
    tone: 'amber' as const,
    items: INDUSTRY_TECH.filter((item) => item.category === 'Automation'),
  },
  {
    id: 'analytics',
    category: 'Analytics',
    icon: 'trending-up' as const,
    tone: 'accent' as const,
    items: INDUSTRY_TECH.filter((item) => item.category === 'Analytics'),
  },
] as const;

export const INDUSTRY_CASE_STUDIES: readonly IndustryCaseStudy[] = [
  {
    id: 'care-portal',
    industry: 'Healthcare',
    clientType: 'Multi-clinic group',
    problem: 'High no-shows and fragmented staff queues across locations.',
    solution: 'Clinic portal with reminder automation and role-based queues.',
    outcome: 'Fewer no-shows and clearer day-of staff priorities.',
    metric: '−32%',
    metricLabel: 'no-shows',
    href: ROUTES.work,
    ctaLabel: 'View healthcare outcome',
    icon: 'shield',
    tone: 'teal',
  },
  {
    id: 'retail-ops',
    industry: 'Retail',
    clientType: 'Multi-channel retailer',
    problem: 'Campaign launches stalled by catalog drift across stores.',
    solution: 'Ops shell with multi-channel catalog sync and launch workflows.',
    outcome: 'Faster campaign launches with consistent assortment.',
    metric: '3×',
    metricLabel: 'launch speed',
    href: ROUTES.work,
    ctaLabel: 'View retail outcome',
    icon: 'sparkles',
    tone: 'amber',
  },
  {
    id: 'fintech-ops',
    industry: 'Finance',
    clientType: 'NBFC ops team',
    problem: 'Manual KYC exceptions slowed onboarding and audit prep.',
    solution: 'Ops console for exceptions with durable audit trails.',
    outcome: 'Review throughput up — compliance evidence intact.',
    metric: '41%',
    metricLabel: 'faster reviews',
    href: ROUTES.caseStudies,
    ctaLabel: 'View finance outcome',
    icon: 'trending-up',
    tone: 'emerald',
  },
] as const;

export const INDUSTRY_METRICS: readonly IndustryMetric[] = [
  {
    id: 'verticals',
    value: '12',
    label: 'Industries mapped',
    hint: 'From care to SaaS',
    icon: 'globe',
    tone: 'primary',
  },
  {
    id: 'engagements',
    value: '200+',
    label: 'Projects delivered',
    hint: 'Across growth markets',
    icon: 'layout-grid',
    tone: 'accent',
  },
  {
    id: 'response',
    value: '<24h',
    label: 'Response time',
    hint: 'Business days',
    icon: 'zap',
    tone: 'amber',
  },
  {
    id: 'satisfaction',
    value: '98%',
    label: 'Client satisfaction',
    hint: 'Founder-led QA',
    icon: 'star',
    tone: 'emerald',
  },
] as const;

/** Premium ROI / business-outcome KPI cards. */
export const INDUSTRY_ROI: readonly IndustryRoiOutcome[] = [
  {
    id: 'manual',
    title: 'Reduce manual work',
    example: 'Automate reminders, queues, and exception routing.',
    value: '↓ hours / week',
    icon: 'workflow',
    tone: 'primary',
  },
  {
    id: 'reporting',
    title: 'Improve reporting',
    example: 'Operator dashboards that replace spreadsheet chase.',
    value: '↑ decision speed',
    icon: 'trending-up',
    tone: 'accent',
  },
  {
    id: 'deploy',
    title: 'Faster deployment',
    example: 'Milestone releases with demos stakeholders can evaluate.',
    value: '4–12 wk core',
    icon: 'rocket',
    tone: 'sky',
  },
  {
    id: 'cost',
    title: 'Lower operational cost',
    example: 'Fewer rework loops and partner handoff failures.',
    value: '↓ rework',
    icon: 'database',
    tone: 'amber',
  },
  {
    id: 'csat',
    title: 'Higher customer satisfaction',
    example: 'Clearer portals, status, and self-serve journeys.',
    value: '↑ CSAT',
    icon: 'star',
    tone: 'emerald',
  },
] as const;

export const INDUSTRY_COMPARISON: readonly IndustryComparisonRow[] = [
  {
    id: 'discovery',
    criterion: 'Discovery',
    generic: 'Feature checklist workshops',
    bitcraftly: 'Operator & constraint mapping by vertical',
  },
  {
    id: 'compliance',
    criterion: 'Compliance',
    generic: 'Added late as a checklist',
    bitcraftly: 'Roles, consent, and audit designed in',
  },
  {
    id: 'integrations',
    criterion: 'Integrations',
    generic: 'Rip-and-replace bias',
    bitcraftly: 'Wrap legacy cores with staged APIs',
  },
  {
    id: 'delivery',
    criterion: 'Delivery',
    generic: 'Vague timelines, slide updates',
    bitcraftly: 'Written milestones and weekly demos',
  },
  {
    id: 'ai',
    criterion: 'AI',
    generic: 'Demo bots without guardrails',
    bitcraftly: 'Assistive workflows with human escalation',
  },
  {
    id: 'ownership',
    criterion: 'Ownership',
    generic: 'Handoff with thin docs',
    bitcraftly: 'Training, instrumentation, team-ready systems',
  },
] as const;

export const INDUSTRY_PROCESS: readonly IndustryProcessStep[] = [
  {
    id: 'listen',
    title: 'Domain listen',
    description: 'Map operators, constraints, peak seasons, and compliance non-negotiables.',
    icon: 'message',
    tone: 'primary',
  },
  {
    id: 'blueprint',
    title: 'Blueprint',
    description: 'Define workflows, roles, integrations, and success metrics before UI polish.',
    icon: 'layout-grid',
    tone: 'accent',
  },
  {
    id: 'build',
    title: 'Build in phases',
    description: 'Ship a usable core first — then deepen AI, portals, and partner surfaces.',
    icon: 'code',
    tone: 'emerald',
  },
  {
    id: 'operate',
    title: 'Handover & operate',
    description: 'Docs, training, and instrumentation so your team runs the system confidently.',
    icon: 'check',
    tone: 'amber',
  },
] as const;

export const INDUSTRY_WHY: readonly IndustryWhyItem[] = [
  {
    id: 'vertical',
    title: 'Vertical-first discovery',
    description: 'We start from operating reality — not a generic feature checklist.',
    metric: '12+ verticals mapped',
    icon: 'globe',
    tone: 'primary',
  },
  {
    id: 'security',
    title: 'Security as default',
    description: 'Roles, auditability, and sensible data boundaries from day one.',
    metric: 'Audit-ready by design',
    icon: 'shield',
    tone: 'emerald',
  },
  {
    id: 'speed',
    title: 'Ship with discipline',
    description: 'Written estimates, milestones, and demos your stakeholders can evaluate.',
    metric: '4–12 wk first release',
    icon: 'zap',
    tone: 'amber',
  },
  {
    id: 'ai',
    title: 'AI with guardrails',
    description: 'Automation that escalates exceptions — never silent failure on critical paths.',
    metric: 'Human-in-the-loop',
    icon: 'brain',
    tone: 'accent',
  },
] as const;

export const INDUSTRY_FAQS: readonly IndustryFaqItem[] = [
  {
    id: 'specialize',
    question: 'Do you specialize in only a few industries?',
    answer:
      'We concentrate delivery where we’ve shipped before — healthcare, education, retail, finance, logistics, and growing SaaS — while applying the same discovery rigor to adjacent verticals like hospitality and government.',
  },
  {
    id: 'compliance',
    question: 'Can you work inside regulated environments?',
    answer:
      'Yes. We design with roles, consent, audit trails, and secure hosting patterns. We are not your legal counsel — we partner with your compliance owners and implement what policy requires.',
  },
  {
    id: 'legacy',
    question: 'What if we have legacy systems that must stay?',
    answer:
      'Most industry engagements wrap or integrate existing cores. We prefer API boundaries and phased cutovers over risky big-bang replacements.',
  },
  {
    id: 'timeline',
    question: 'How long does an industry engagement take?',
    answer:
      'First usable releases often land in 4–12 weeks depending on integrations. You get a written timeline and milestones before build starts.',
  },
  {
    id: 'start',
    question: 'How do we start?',
    answer:
      'Book a free consultation. Share workflows, peak pressures, and must-keep systems. We’ll return clear next steps and a scoped estimate.',
  },
] as const;

export const INDUSTRY_RELATED_SERVICES: readonly IndustryRelatedService[] = [
  {
    id: 'custom-software',
    title: 'Custom software',
    description: 'Domain systems shaped around how your teams work.',
    href: `${ROUTES.services}/custom-software-development`,
    icon: 'code',
    relatedIndustryCount: 12,
    ctaLabel: 'Explore custom software',
  },
  {
    id: 'web-apps',
    title: 'Web applications',
    description: 'Portals and ops tools with roles, speed, and clarity.',
    href: `${ROUTES.services}/web-application-development`,
    icon: 'layout-grid',
    relatedIndustryCount: 10,
    ctaLabel: 'Explore web apps',
  },
  {
    id: 'ai',
    title: 'AI solutions',
    description: 'Assistive automation with human escalation paths.',
    href: `${ROUTES.services}/ai-solutions`,
    icon: 'brain',
    relatedIndustryCount: 8,
    ctaLabel: 'Explore AI solutions',
  },
  {
    id: 'websites',
    title: 'Website development',
    description: 'High-performance marketing and conversion sites.',
    href: `${ROUTES.services}/website-development`,
    icon: 'globe',
    relatedIndustryCount: 6,
    ctaLabel: 'Explore websites',
  },
] as const;

export { href as industryDetailHref };
