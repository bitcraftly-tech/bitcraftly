import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import type {
  WorkCaseStudy,
  WorkCategory,
  WorkFaqItem,
  WorkHubContent,
  WorkLandingSectionMeta,
  WorkProcessStep,
  WorkProcessTrustItem,
  WorkProject,
  WorkRelatedService,
  WorkResultHighlight,
  WorkResultKpi,
  WorkTechGroup,
  WorkTestimonial,
  WorkTrustBandItem,
  WorkTrustFallbackTopic,
  WorkTrustPillar,
} from './work.types';
import type { WorkExplorerGroup } from './work.filters';
import { filterWorkProjects } from './work.filters';
import { workProductImage } from './work-images';

const WORK_BASE = ROUTES.work;

export function getWorkProjectHref(slug: string): string {
  return `${ROUTES.workProjects}/${slug}`;
}

/**
 * Portfolio catalog — real Bitcraftly projects with live product screenshots
 * from https://bitcraftly.com/products (no stock imagery).
 */
export const WORK_PROJECTS: readonly WorkProject[] = [
  {
    slug: 'shrishti-cloud-kitchen',
    title: 'Shrishti Cloud Kitchen',
    summary: 'Live cloud kitchen experience — menu discovery built for WhatsApp-first orders.',
    coverImage: workProductImage('Shrishti Cloud Kitchen.png'),
    coverImageAlt: 'Shrishti Cloud Kitchen website screenshot',
    previewHost: 'shrishticloud.kitchen',
    badge: 'Live client',
    liveUrl: 'https://www.shrishticloud.kitchen/',
    liveExternal: true,
    industry: 'Food & QSR',
    industrySlug: 'hospitality',
    businessGoal: 'Convert mobile diners into WhatsApp orders without friction.',
    services: ['Website Development', 'Web Applications'],
    techStack: ['Next.js', 'React', 'Mobile UX', 'SEO', 'WhatsApp'],
    categories: ['web-applications', 'saas'],
    filterIds: ['featured', 'web-applications', 'hospitality'],
    duration: '4–6 weeks',
    timeline: '4–6 weeks to live storefront',
    result: 'Clear mobile menu path with WhatsApp-ready enquiry CTAs.',
    outcome: 'Guests discover menus and order via WhatsApp in one continuous flow.',
    problem: 'Cloud kitchen demand lived on phones — desktop-only layouts lost order intent.',
    solution: 'Thumb-first Next.js storefront with menu discovery and WhatsApp order handoff.',
    metrics: [
      { id: 'mobile', value: '90%+', label: 'mobile session share' },
      { id: 'cta', value: '1-tap', label: 'WhatsApp order path' },
    ],
    featured: true,
    year: 2025,
    accent: 'amber',
    seoTitle: 'Shrishti Cloud Kitchen | Work',
    seoDescription: 'Live cloud kitchen website with WhatsApp-first menu discovery by Bitcraftly.',
  },
  {
    slug: 'swastik-makhana',
    title: 'Swastik Makhana',
    summary: 'Live D2C brand storefront — premium makhana packs, cart flows, and NCR delivery.',
    coverImage: workProductImage('Swastik Makhana.png'),
    coverImageAlt: 'Swastik Makhana ecommerce storefront screenshot',
    previewHost: 'swastikmakhana.co',
    badge: 'Live client',
    liveUrl: 'https://www.swastikmakhana.co/',
    liveExternal: true,
    industry: 'Ecommerce',
    industrySlug: 'retail-ecommerce',
    businessGoal: 'Scale D2C pack sales with trustworthy mobile checkout UX.',
    services: ['Website Development', 'Ecommerce'],
    techStack: ['Next.js', 'React', 'Ecommerce UX', 'Mobile-first', 'SEO'],
    categories: ['web-applications', 'saas'],
    filterIds: ['featured', 'web-applications', 'retail'],
    duration: '5–8 weeks',
    timeline: '5–8 weeks to storefront launch',
    result: 'Catalog, cart, and delivery messaging designed for high-intent mobile buyers.',
    outcome: 'Shoppers browse packs and convert without page-builder clutter.',
    problem: 'Brand demand needed a fast storefront — not a heavy template stack.',
    solution: 'Lean Next.js commerce UX with pack storytelling and NCR delivery clarity.',
    metrics: [
      { id: 'conversion', value: '+35%', label: 'enquiry conversion' },
      { id: 'speed', value: 'fast', label: 'Core Web Vitals mindset' },
    ],
    featured: true,
    year: 2025,
    accent: 'indigo',
    seoTitle: 'Swastik Makhana | Work',
    seoDescription: 'Live D2C makhana ecommerce storefront engineered by Bitcraftly.',
  },
  {
    slug: 'kunwar-dairy',
    title: 'Kunwar Dairy',
    summary: 'Live dairy brand — farm-fresh milk, ghee, and subscription delivery across Bihar.',
    coverImage: workProductImage('dairy farm.png'),
    coverImageAlt: 'Kunwar Dairy website screenshot',
    previewHost: 'kunwardairy.com',
    badge: 'Live client',
    liveUrl: 'https://kunwardairy.com/',
    liveExternal: true,
    industry: 'Ecommerce',
    industrySlug: 'retail-ecommerce',
    businessGoal: 'Grow subscription dairy orders with trust-led brand storytelling.',
    services: ['Website Development', 'Ecommerce'],
    techStack: ['Next.js', 'React', 'Subscription UX', 'Razorpay-ready', 'Mobile-first'],
    categories: ['web-applications', 'saas'],
    filterIds: ['featured', 'web-applications', 'retail'],
    duration: '5–8 weeks',
    timeline: '5–8 weeks to subscription-ready site',
    result: 'Farm story + product paths designed for repeat dairy buyers.',
    outcome: 'Customers subscribe and reorder with payment-ready UX patterns.',
    problem: 'Traditional dairy trust signals were hard to express on generic templates.',
    solution: 'Brand-led Next.js experience with subscription and Razorpay-ready flows.',
    metrics: [
      { id: 'subs', value: '↑', label: 'subscription intent' },
      { id: 'trust', value: 'local', label: 'Bihar delivery clarity' },
    ],
    featured: true,
    year: 2025,
    accent: 'emerald',
    seoTitle: 'Kunwar Dairy | Work',
    seoDescription: 'Live dairy brand website with subscription UX by Bitcraftly.',
  },
  {
    slug: 'next-gen-saas-platform',
    title: 'SaaSPro Dashboard',
    summary:
      'Future SaaS product shell — analytics, billing UX, and operator workflows in one control plane.',
    coverImage: workProductImage('Next-Gen SaaS Platform.png'),
    coverImageAlt: 'SaaSPro future project dashboard preview',
    previewHost: 'saaspro.preview',
    badge: 'Future project',
    industry: 'SaaS',
    industrySlug: 'saas',
    businessGoal: 'Ship a product-grade SaaS shell teams can extend into production.',
    services: ['Custom Software', 'Dashboards', 'SaaS'],
    techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma'],
    categories: ['saas', 'dashboards', 'web-applications'],
    filterIds: ['featured', 'saas', 'dashboards', 'web-applications'],
    duration: 'In design',
    timeline: 'Future engagement — scoped after discovery',
    result: 'Dashboard patterns for revenue, plans, and operator activity.',
    outcome:
      'A full SaaS control plane concept — revenue, users, plans, and activity in one surface.',
    problem: 'Founders need a production-shaped dashboard before full product build.',
    solution: 'Bitcraftly future build: typed Next.js SaaS shell with billing-ready analytics UX.',
    metrics: [
      { id: 'ttm', value: '−40%', label: 'target time to market' },
      { id: 'stack', value: 'typed', label: 'TypeScript end-to-end' },
    ],
    featured: true,
    status: 'future',
    year: 2026,
    accent: 'indigo',
    seoTitle: 'SaaSPro Dashboard | Future Work',
    seoDescription:
      'Future Bitcraftly SaaS dashboard project — analytics, billing UX, and operator workflows.',
  },
  {
    slug: 'clinic-healthcare',
    title: 'Clinic & Healthcare',
    summary: 'Healthcare showcase built for trust, clarity, and appointment enquiries.',
    coverImage: workProductImage('Clinic & Healthcare.png'),
    coverImageAlt: 'Clinic and healthcare website screenshot',
    previewHost: 'clinic.showcase',
    badge: 'Interactive demo',
    liveUrl: '/portfolio/clinic-healthcare-showcase',
    liveExternal: true,
    industry: 'Healthcare',
    industrySlug: 'healthcare',
    businessGoal: 'Increase appointment enquiries with credible clinical UX.',
    services: ['Website Development', 'Web Applications'],
    techStack: ['React', 'Forms', 'Trust UX', 'SEO'],
    categories: ['web-applications'],
    filterIds: ['web-applications', 'healthcare'],
    duration: '4–7 weeks',
    timeline: '4–7 weeks to admissions-ready site',
    result: 'Patients find services and book enquiry paths on mobile first.',
    outcome: 'Clinic brands present trust signals before the ask for an appointment.',
    problem: 'Generic templates diluted clinical credibility and buried CTAs.',
    solution: 'Trust-led healthcare layout with forms optimized for enquiries.',
    metrics: [
      { id: 'leads', value: '+28%', label: 'appointment enquiries' },
      { id: 'mobile', value: 'thumb-first', label: 'layout discipline' },
    ],
    featured: false,
    year: 2024,
    accent: 'teal',
    seoTitle: 'Clinic & Healthcare | Work',
    seoDescription: 'Healthcare clinic website showcase for trust and appointment enquiries.',
  },
  {
    slug: 'school-website',
    title: 'Admissions-Ready School Site',
    summary: 'Education showcase with a clear admissions path parents can complete on mobile.',
    coverImage: workProductImage('School Website.png'),
    coverImageAlt: 'School website admissions showcase screenshot',
    previewHost: 'school.showcase',
    badge: 'Interactive demo',
    liveUrl: '/portfolio/school-website-showcase',
    liveExternal: true,
    industry: 'Education',
    industrySlug: 'education',
    businessGoal: 'Convert parent interest into complete admissions enquiries.',
    services: ['Website Development'],
    techStack: ['Next.js', 'Forms', 'Content structure', 'Mobile UX'],
    categories: ['web-applications'],
    filterIds: ['web-applications', 'education'],
    duration: '4–6 weeks',
    timeline: '4–6 weeks to admissions funnel',
    result: 'Parents complete enquiry paths without desktop-only friction.',
    outcome: 'Admissions teams receive structured leads instead of scattered WhatsApp noise.',
    problem: 'School sites buried admissions CTAs under brochure-style content.',
    solution: 'Content hierarchy and forms designed around the parent admissions journey.',
    metrics: [
      { id: 'funnel', value: 'clear', label: 'admissions path' },
      { id: 'mobile', value: 'parent-ready', label: 'mobile UX' },
    ],
    featured: false,
    year: 2024,
    accent: 'sky',
    seoTitle: 'School Website | Work',
    seoDescription: 'Education admissions website showcase engineered by Bitcraftly.',
  },
  {
    slug: 'gym-website',
    title: 'Gym Website',
    summary: 'Fitness brand demo — trials, classes, and membership enquiry paths that convert.',
    coverImage: workProductImage('Gym Website.png'),
    coverImageAlt: 'Gym website fitness brand screenshot',
    previewHost: 'gym.showcase',
    badge: 'Interactive demo',
    liveUrl: '/portfolio/gym-fitness-showcase',
    liveExternal: true,
    industry: 'Fitness',
    industrySlug: 'startup',
    businessGoal: 'Drive trial and membership enquiries from mobile visitors.',
    services: ['Website Development'],
    techStack: ['React', 'Responsive UI', 'Lead forms', 'SEO'],
    categories: ['web-applications'],
    filterIds: ['web-applications', 'startup'],
    duration: '3–5 weeks',
    timeline: '3–5 weeks to lead-ready site',
    result: 'Class and membership CTAs survive scroll fatigue on phones.',
    outcome: 'Gym brands capture trial intent before visitors bounce.',
    problem: 'Fitness sites over-designed visuals and under-designed enquiry paths.',
    solution: 'Responsive React landing with lead forms above scroll fatigue.',
    metrics: [
      { id: 'trial', value: '↑', label: 'trial enquiries' },
      { id: 'seo', value: 'local', label: 'discovery basics' },
    ],
    featured: false,
    year: 2024,
    accent: 'rose',
    seoTitle: 'Gym Website | Work',
    seoDescription: 'Fitness brand website showcase with membership lead paths.',
  },
  {
    slug: 'restaurant-ai-chatbot',
    title: 'Restaurant AI Concierge',
    summary: 'AI menu answers with seamless human handoff on WhatsApp when intent is high.',
    coverImage: workProductImage('AI Chatbot for Restaurant.png'),
    coverImageAlt: 'Restaurant AI chatbot showcase screenshot',
    previewHost: 'restaurant-ai.showcase',
    badge: 'Interactive demo',
    liveUrl: '/portfolio/restaurant-ai-chatbot-showcase',
    liveExternal: true,
    industry: 'AI',
    industrySlug: 'hospitality',
    businessGoal: 'Answer repeat menu questions without losing human sales paths.',
    services: ['AI Automation', 'Website Development'],
    techStack: ['OpenAI', 'Next.js', 'React', 'WhatsApp API'],
    categories: ['ai-automation', 'web-applications'],
    filterIds: ['ai-automation', 'web-applications', 'hospitality'],
    duration: '4–8 weeks',
    timeline: '4–8 weeks to assisted concierge',
    result: 'Bots handle FAQs; high-intent leads escalate to WhatsApp humans.',
    outcome: 'Restaurants stay available 24/7 without burying the sales team.',
    problem: 'Staff repeated menu answers while night enquiries went unanswered.',
    solution: 'OpenAI-assisted concierge with WhatsApp handoff for purchase intent.',
    metrics: [
      { id: 'deflect', value: '65%', label: 'FAQ deflection' },
      { id: 'handoff', value: 'human', label: 'high-intent path' },
    ],
    featured: false,
    year: 2025,
    accent: 'teal',
    seoTitle: 'Restaurant AI Concierge | Work',
    seoDescription: 'Restaurant AI chatbot with WhatsApp human handoff by Bitcraftly.',
  },
  {
    slug: 'ecommerce-store',
    title: 'Ecommerce Store',
    summary: 'Ecommerce demo — catalog clarity, checkout trust, and COD-friendly flows.',
    coverImage: workProductImage('Ecommerce Store.png'),
    coverImageAlt: 'Ecommerce Store storefront screenshot',
    previewHost: 'store.showcase',
    badge: 'Interactive demo',
    liveUrl: '/portfolio/ecommerce-store-showcase',
    liveExternal: true,
    industry: 'Ecommerce',
    industrySlug: 'retail-ecommerce',
    businessGoal: 'Reduce checkout drop-off with clearer cart and trust UX.',
    services: ['Website Development', 'Ecommerce'],
    techStack: ['Next.js', 'React', 'Razorpay-ready UX', 'Cart flows'],
    categories: ['web-applications', 'saas'],
    filterIds: ['web-applications', 'retail'],
    duration: '5–9 weeks',
    timeline: '5–9 weeks to commerce demo',
    result: 'Catalog and cart flows prioritize conversion clarity over decoration.',
    outcome: 'Buyers understand price, shipping, and COD options before pay.',
    problem: 'Template checkouts hid trust signals Indian buyers rely on.',
    solution: 'Next.js commerce UX with COD trust and mobile cart discipline.',
    metrics: [
      { id: 'cart', value: 'clear', label: 'checkout path' },
      { id: 'cod', value: 'ready', label: 'COD trust patterns' },
    ],
    featured: false,
    year: 2024,
    accent: 'amber',
    seoTitle: 'Ecommerce Store | Work',
    seoDescription: 'Ecommerce catalog and checkout UX showcase by Bitcraftly.',
  },
  {
    slug: 'builder-website',
    title: 'Builder Website',
    summary: 'Real estate demo — project gallery that builds enquiry trust for buyers.',
    coverImage: workProductImage('Builder Website.png'),
    coverImageAlt: 'Real estate builder website screenshot',
    previewHost: 'builder.showcase',
    badge: 'Interactive demo',
    liveUrl: '/portfolio/dayal-builders-showcase',
    liveExternal: true,
    industry: 'Real Estate',
    industrySlug: 'real-estate',
    businessGoal: 'Turn gallery browsing into qualified project enquiries.',
    services: ['Website Development', 'CRM'],
    techStack: ['React', 'Gallery UX', 'Lead forms'],
    categories: ['web-applications', 'crm'],
    filterIds: ['web-applications', 'crm', 'real-estate'],
    duration: '4–7 weeks',
    timeline: '4–7 weeks to gallery + leads',
    result: 'Project storytelling supports enquiry CTAs at decision moments.',
    outcome: 'Builders capture interest while prospects browse inventories.',
    problem: 'Static galleries rarely converted curiosity into structured leads.',
    solution: 'Gallery-first React site with lead forms wired to sales follow-up.',
    metrics: [
      { id: 'leads', value: '+42%', label: 'project enquiries' },
      { id: 'gallery', value: 'trust', label: 'visual storytelling' },
    ],
    featured: false,
    year: 2024,
    accent: 'indigo',
    seoTitle: 'Builder Website | Work',
    seoDescription: 'Real estate builder website with enquiry-focused galleries.',
  },
  {
    slug: 'society-portal',
    title: 'Society Portal',
    summary: 'Resident portal demo — notices, forms, and lightweight ops workflows.',
    coverImage: workProductImage('Society Portal.png'),
    coverImageAlt: 'Society portal resident dashboard screenshot',
    previewHost: 'society.showcase',
    badge: 'Interactive demo',
    liveUrl: '/portfolio/society-management-showcase',
    liveExternal: true,
    industry: 'Community',
    industrySlug: 'government',
    businessGoal: 'Replace notice chaos with a lightweight resident portal.',
    services: ['Custom Software', 'Web Applications'],
    techStack: ['React', 'Forms', 'Notices UX', 'Admin patterns'],
    categories: ['web-applications', 'enterprise-software'],
    filterIds: ['web-applications', 'enterprise-software'],
    duration: '6–10 weeks',
    timeline: '6–10 weeks to portal MVP',
    result: 'Residents find notices and submit forms without admin bottlenecks.',
    outcome: 'Society ops stay organized with durable request trails.',
    problem: 'Announcements and requests lived in chat threads that disappear.',
    solution: 'Role-aware React portal with notice boards and form workflows.',
    metrics: [
      { id: 'ops', value: '↓', label: 'admin back-and-forth' },
      { id: 'forms', value: 'tracked', label: 'request trails' },
    ],
    featured: false,
    year: 2024,
    accent: 'sky',
    seoTitle: 'Society Portal | Work',
    seoDescription: 'Resident society portal with notices and form workflows.',
  },
  {
    slug: 'rpy-training-institute',
    title: 'RPY Training Institute',
    summary: 'Training institute demo — courses, document verification, and franchise paths.',
    coverImage: workProductImage('RPY Training Institute.png'),
    coverImageAlt: 'RPY Training Institute website screenshot',
    previewHost: 'rpy.showcase',
    badge: 'Interactive demo',
    liveUrl: '/portfolio/rpytech-training-showcase',
    liveExternal: true,
    industry: 'Education',
    industrySlug: 'education',
    businessGoal: 'Clarify courses and franchise interest for serious prospects.',
    services: ['Website Development'],
    techStack: ['Next.js', 'Responsive UI', 'Forms', 'SEO'],
    categories: ['web-applications'],
    filterIds: ['web-applications', 'education'],
    duration: '4–7 weeks',
    timeline: '4–7 weeks to institute site',
    result: 'Course and franchise CTAs are discoverable on every viewport.',
    outcome: 'Institutes collect structured leads for admissions and partners.',
    problem: 'Training sites mixed marketing fluff with weak verification UX.',
    solution: 'Next.js institute layout with courses, verify docs, and franchise forms.',
    metrics: [
      { id: 'leads', value: 'structured', label: 'course enquiries' },
      { id: 'seo', value: 'local', label: 'institute discovery' },
    ],
    featured: false,
    year: 2024,
    accent: 'emerald',
    seoTitle: 'RPY Training Institute | Work',
    seoDescription: 'Training institute website with courses and franchise paths.',
  },
  {
    slug: 'local-services-lead-site',
    title: 'Local Services Lead Site',
    summary: 'Local services demo — high-intent CTAs for coaches, consultants, and pros.',
    coverImage: workProductImage('Local Services Lead Site.png'),
    coverImageAlt: 'Local services lead generation website screenshot',
    previewHost: 'local.showcase',
    badge: 'Interactive demo',
    liveUrl: '/portfolio/local-services-leads-showcase',
    liveExternal: true,
    industry: 'Services',
    industrySlug: 'startup',
    businessGoal: 'Capture high-intent local leads before bounce.',
    services: ['Website Development'],
    techStack: ['React', 'Landing UX', 'Local SEO'],
    categories: ['web-applications'],
    filterIds: ['web-applications', 'startup'],
    duration: '2–4 weeks',
    timeline: '2–4 weeks to lead landing',
    result: 'Primary CTAs stay above scroll fatigue on mobile.',
    outcome: 'Independent pros convert intent into calls and WhatsApp chats.',
    problem: 'Local service sites hid contact actions behind long copy.',
    solution: 'Landing-first React page with local SEO and high-intent CTAs.',
    metrics: [
      { id: 'ctr', value: '↑', label: 'CTA engagement' },
      { id: 'seo', value: 'local', label: 'search readiness' },
    ],
    featured: false,
    year: 2024,
    accent: 'amber',
    seoTitle: 'Local Services Lead Site | Work',
    seoDescription: 'Local services landing page showcase optimized for high-intent leads.',
  },
  {
    slug: 'online-crockery-shop',
    title: 'Online Crockery Shop',
    summary: 'Crockery Wala demo — elegant tableware storefront with premium catalog UX.',
    coverImage: workProductImage('Online Crockery Shop.png'),
    coverImageAlt: 'Crockery Wala elegant tableware ecommerce showcase screenshot',
    previewHost: 'claycraft.showcase',
    badge: 'Interactive demo',
    liveUrl: '/portfolio/claycraft-crockery-showcase',
    liveExternal: true,
    industry: 'Ecommerce',
    industrySlug: 'retail-ecommerce',
    businessGoal: 'Present premium dinnerware with calm conversion-ready shopping UX.',
    services: ['Website Development', 'Ecommerce'],
    techStack: ['Next.js', 'React', 'Ecommerce UX', 'Tableware UI'],
    categories: ['web-applications', 'saas'],
    filterIds: ['web-applications', 'retail'],
    duration: '4–8 weeks',
    timeline: '4–8 weeks to commerce demo',
    result: 'Warm clay-gold retail chrome frames product discovery without clutter.',
    outcome: 'Shoppers feel quality before price — then move into collections confidently.',
    problem: 'Generic ecommerce templates make handmade tableware feel cheap.',
    solution: 'Custom Crockery Wala shell with premium header, footer, and catalog-ready stage.',
    metrics: [
      { id: 'brand', value: 'premium', label: 'tableware framing' },
      { id: 'nav', value: 'clear', label: 'collection paths' },
    ],
    featured: false,
    year: 2026,
    accent: 'amber',
    seoTitle: 'Online Crockery Shop | Work',
    seoDescription: 'Crockery Wala online crockery shop showcase by Bitcraftly.',
  },
] as const;

export const WORK_CASE_STUDIES: readonly WorkCaseStudy[] = [
  {
    slug: 'next-gen-saas-platform',
    projectSlug: 'next-gen-saas-platform',
    title: 'SaaSPro Dashboard',
    description: 'Future SaaS control plane with analytics, billing UX, and operator workflows.',
    challenge: 'Founders need a production-shaped dashboard before committing to full build.',
    approach: 'Typed Next.js SaaS shell with Stripe-ready billing UI and analytics patterns.',
    results: 'Scoped after discovery — architecture-ready for a fast first release.',
    metrics: [{ id: 'ttm', value: '−40%', label: 'target time to market' }],
  },
] as const;

export const WORK_CATEGORIES: readonly WorkCategory[] = [
  {
    id: 'web-applications',
    label: 'Web Applications',
    description: 'Portals, dashboards, and operator-facing web products.',
    href: `${WORK_BASE}/web-applications`,
    icon: 'layout-grid',
  },
  {
    id: 'enterprise-software',
    label: 'Enterprise Software',
    description: 'Systems for multi-role, multi-team operating models.',
    href: `${WORK_BASE}/enterprise`,
    icon: 'shield',
  },
  {
    id: 'crm',
    label: 'CRM',
    description: 'Customer pipelines and relationship workflows.',
    href: `${WORK_BASE}/crm`,
    icon: 'message',
  },
  {
    id: 'erp',
    label: 'ERP',
    description: 'Operational cores for inventory, finance, and fulfillment.',
    href: `${WORK_BASE}/erp`,
    icon: 'database',
  },
  {
    id: 'ai-automation',
    label: 'AI Automation',
    description: 'Assistive automation with human escalation paths.',
    href: `${WORK_BASE}/ai-solutions`,
    icon: 'brain',
  },
  {
    id: 'saas',
    label: 'SaaS',
    description: 'Multi-tenant products with roles and entitlements.',
    href: `${WORK_BASE}/saas`,
    icon: 'cloud',
  },
  {
    id: 'mobile-apps',
    label: 'Mobile Apps',
    description: 'Native and cross-platform client experiences.',
    href: `${WORK_BASE}/mobile-apps`,
    icon: 'rocket',
  },
  {
    id: 'dashboards',
    label: 'Dashboards',
    description: 'Decision surfaces for ops, finance, and leadership.',
    href: `${WORK_BASE}/dashboards`,
    icon: 'trending-up',
  },
  {
    id: 'cloud',
    label: 'Cloud',
    description: 'Secure hosting, delivery pipelines, and observability.',
    href: `${WORK_BASE}/cloud`,
    icon: 'cloud',
  },
] as const;

/** Smart filter chip groups for Portfolio Explorer (Sprint 5D). */
export const WORK_EXPLORER_GROUPS: readonly WorkExplorerGroup[] = [
  {
    id: 'industry',
    label: 'Industry',
    chips: [
      { id: 'healthcare', label: 'Healthcare' },
      { id: 'finance', label: 'Finance' },
      { id: 'retail', label: 'Retail' },
      { id: 'education', label: 'Education' },
      { id: 'manufacturing', label: 'Manufacturing' },
      { id: 'real-estate', label: 'Real Estate' },
      { id: 'logistics', label: 'Logistics' },
      { id: 'hospitality', label: 'Hospitality' },
      { id: 'travel', label: 'Travel' },
      { id: 'government', label: 'Government' },
      { id: 'startup', label: 'Startup' },
      { id: 'saas', label: 'SaaS' },
    ],
  },
  {
    id: 'service',
    label: 'Service',
    chips: [
      { id: 'web-development', label: 'Web Development' },
      { id: 'mobile-apps', label: 'Mobile Apps' },
      { id: 'crm', label: 'CRM' },
      { id: 'erp', label: 'ERP' },
      { id: 'ai-automation', label: 'AI Automation' },
      { id: 'custom-software', label: 'Custom Software' },
      { id: 'cloud', label: 'Cloud' },
      { id: 'api', label: 'API' },
      { id: 'dashboard', label: 'Dashboard' },
    ],
  },
  {
    id: 'technology',
    label: 'Technology',
    chips: [
      { id: 'react', label: 'React' },
      { id: 'next.js', label: 'Next.js' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'node.js', label: 'Node.js' },
      { id: 'openai', label: 'OpenAI' },
      { id: 'supabase', label: 'Supabase' },
      { id: 'aws', label: 'AWS' },
      { id: 'postgresql', label: 'PostgreSQL' },
    ],
  },
] as const;

/** Simple portfolio chips — aligned with bitcraftly.com/portfolio. */
export const WORK_PORTFOLIO_FILTERS = [
  { id: 'all', label: 'All Projects', short: 'All' },
  { id: 'react', label: 'React.js', short: 'React' },
  { id: 'next', label: 'Next.js', short: 'Next' },
  { id: 'ai', label: 'AI Solutions', short: 'AI' },
  { id: 'websites', label: 'Websites', short: 'Web' },
  { id: 'dashboards', label: 'Dashboards', short: 'Dash' },
  { id: 'ecommerce', label: 'Ecommerce', short: 'Shop' },
] as const;

export const WORK_EXPLORER_COPY = {
  eyebrow: 'Portfolio Explorer',
  heading: 'Find projects by industry, technology, or business solution.',
  description:
    'Browse our work to see how we solve real-world engineering challenges across different industries and platforms.',
  searchPlaceholder: 'Search projects, industries, or stack…',
  clearLabel: 'Clear filters',
} as const;

export const WORK_RESULT_KPIS: readonly WorkResultKpi[] = [
  {
    id: 'delivered',
    value: '200+',
    label: 'Projects Delivered',
    hint: 'Shipped across growth markets',
    icon: 'layout-grid',
    tone: 'primary',
    chart: 'bars',
    progress: 88,
    trend: 'up',
  },
  {
    id: 'performance',
    value: '+40%',
    label: 'Performance Improvement',
    hint: 'Representative launch deltas',
    icon: 'zap',
    tone: 'amber',
    chart: 'sparkline',
    progress: 78,
    trend: 'up',
  },
  {
    id: 'automation',
    value: '65%',
    label: 'Automation Hours Saved',
    hint: 'Queues, reminders, review assists',
    icon: 'workflow',
    tone: 'sky',
    chart: 'ring',
    progress: 65,
    trend: 'down',
  },
  {
    id: 'users',
    value: '2M+',
    label: 'User Growth',
    hint: 'Users served on delivered platforms',
    icon: 'globe',
    tone: 'accent',
    chart: 'sparkline',
    progress: 84,
    trend: 'up',
  },
  {
    id: 'infra',
    value: '−28%',
    label: 'Infrastructure Cost Reduction',
    hint: 'Right-sized cloud footprints',
    icon: 'cloud',
    tone: 'emerald',
    chart: 'bars',
    progress: 72,
    trend: 'down',
  },
  {
    id: 'ttm',
    value: '−40%',
    label: 'Time to Market',
    hint: 'Faster development cycles',
    icon: 'rocket',
    tone: 'primary',
    chart: 'trend',
    progress: 80,
    trend: 'down',
  },
  {
    id: 'satisfaction',
    value: '98%',
    label: 'Customer Satisfaction',
    hint: 'Founder-led delivery QA',
    icon: 'star',
    tone: 'emerald',
    chart: 'ring',
    progress: 98,
    trend: 'up',
  },
  {
    id: 'enterprise',
    value: '40+',
    label: 'Enterprise Clients',
    hint: 'Multi-role operating models',
    icon: 'shield',
    tone: 'sky',
    chart: 'bars',
    progress: 70,
    trend: 'up',
  },
] as const;

export const WORK_RESULT_HIGHLIGHTS: readonly WorkResultHighlight[] = [
  { id: 'dev-speed', value: '40%', label: 'Faster Development' },
  { id: 'automation', value: '65%', label: 'Process Automation' },
  { id: 'availability', value: '99.9%', label: 'Availability' },
  { id: 'users-served', value: '2M+', label: 'Users Served' },
  { id: 'conversion', value: '35%', label: 'Higher Conversion' },
  { id: 'reporting', value: '50%', label: 'Faster Reporting' },
] as const;

export const WORK_RESULTS_COPY = {
  eyebrow: 'Business Outcomes',
  heading: 'Engineering that delivers measurable business outcomes.',
  description:
    'Showcase the real impact of our engineering across performance, scalability, automation and customer experience.',
  dashboardLabel: 'Impact analytics overview',
  highlightsLabel: 'Result highlights',
} as const;

export const WORK_PORTFOLIO_COPY = {
  eyebrow: 'Featured Work',
  heading: 'Our Portfolio',
  description:
    'Explore shipped products, platforms, and automations — filter above to match your industry, service, or stack.',
} as const;

export const WORK_TECH_GROUPS: readonly WorkTechGroup[] = [
  {
    id: 'frontend',
    category: 'Frontend',
    icon: 'rocket',
    tone: 'primary',
    items: ['React', 'Next.js', 'TypeScript', 'Redux', 'Tailwind'],
  },
  {
    id: 'backend',
    category: 'Backend',
    icon: 'code',
    tone: 'emerald',
    items: ['Node.js', 'FastAPI', 'Python', 'Express'],
  },
  {
    id: 'cloud',
    category: 'Cloud',
    icon: 'cloud',
    tone: 'sky',
    items: ['AWS', 'Azure', 'Vercel', 'Cloudflare', 'Docker'],
  },
  {
    id: 'database',
    category: 'Database',
    icon: 'database',
    tone: 'accent',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    id: 'ai',
    category: 'AI',
    icon: 'brain',
    tone: 'rose',
    items: ['OpenAI', 'Claude', 'Gemini', 'LangChain', 'Vector DB'],
  },
  {
    id: 'automation',
    category: 'Automation',
    icon: 'workflow',
    tone: 'amber',
    items: ['n8n', 'Supabase', 'Webhooks', 'REST APIs', 'GraphQL'],
  },
] as const;

export const WORK_TECH_COPY = {
  eyebrow: 'Technology Expertise',
  heading: 'Modern engineering powered by proven technologies.',
  description:
    'Our teams build scalable, secure and high-performance digital products using a carefully selected technology ecosystem.',
  architectureLabel: 'Architecture illustration',
} as const;

export const WORK_PROCESS: readonly WorkProcessStep[] = [
  {
    id: 'discovery',
    step: '01',
    title: 'Discovery',
    description: 'Align on goals, constraints, and what success looks like.',
    items: ['Understand business goals', 'Technical audit', 'Stakeholder workshops'],
    icon: 'message',
    tone: 'primary',
  },
  {
    id: 'planning',
    step: '02',
    title: 'Planning',
    description: 'Shape the architecture and delivery path before build.',
    items: ['Architecture', 'Roadmap', 'Sprint planning', 'Timeline'],
    icon: 'calendar',
    tone: 'accent',
  },
  {
    id: 'design',
    step: '03',
    title: 'Design',
    description: 'Prototype usable flows and a cohesive product surface.',
    items: ['UX', 'UI', 'Design system', 'Prototypes'],
    icon: 'layout-grid',
    tone: 'sky',
  },
  {
    id: 'development',
    step: '04',
    title: 'Development',
    description: 'Ship working software in transparent, reviewable increments.',
    items: ['Agile sprints', 'Code reviews', 'CI/CD', 'Weekly demos'],
    icon: 'code',
    tone: 'emerald',
  },
  {
    id: 'qa',
    step: '05',
    title: 'QA',
    description: 'Prove readiness across quality, access, speed, and security.',
    items: ['Testing', 'Accessibility', 'Performance', 'Security'],
    icon: 'shield',
    tone: 'amber',
  },
  {
    id: 'launch',
    step: '06',
    title: 'Deployment',
    description: 'Release with confidence and instrumentation ready.',
    items: ['Deployment', 'Monitoring', 'Rollback plans'],
    icon: 'rocket',
    tone: 'primary',
  },
  {
    id: 'support',
    step: '07',
    title: 'Support',
    description: 'Stay accountable after go-live with durable ownership.',
    items: ['Optimization', 'Long-term support', 'Continuous improvement'],
    icon: 'headset',
    tone: 'sky',
  },
] as const;

export const WORK_PROCESS_TRUST: readonly WorkProcessTrustItem[] = [
  { id: 'demos', label: 'Weekly demos', icon: 'play' },
  { id: 'pm', label: 'Dedicated PM', icon: 'headset' },
  { id: 'reporting', label: 'Transparent reporting', icon: 'trending-up' },
  { id: 'docs', label: 'Enterprise documentation', icon: 'check' },
] as const;

export const WORK_PROCESS_COPY = {
  eyebrow: 'Delivery Process',
  heading: 'A transparent engineering process from discovery to long-term success.',
  description:
    'Every engagement follows a structured, collaborative workflow to ensure quality, predictable delivery, and measurable outcomes.',
  timelineLabel: 'Delivery process timeline',
  trustLabel: 'Engagement trust signals',
} as const;

/** Empty until approved quotes exist — UI must not invent testimonials. */
export const WORK_TESTIMONIALS: readonly WorkTestimonial[] = [] as const;

export const WORK_TRUST_PILLARS: readonly WorkTrustPillar[] = [
  {
    id: 'communication',
    title: 'Transparent Communication',
    items: ['Weekly demos', 'Written status', 'Clear decision paths'],
    icon: 'message',
    tone: 'primary',
  },
  {
    id: 'performance',
    title: 'Performance',
    items: ['Fast paths', 'Lean payloads', 'Core Web Vitals mindset'],
    icon: 'zap',
    tone: 'amber',
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    items: ['Keyboard-first flows', 'Readable contrast', 'Inclusive UX'],
    icon: 'check',
    tone: 'emerald',
  },
  {
    id: 'security',
    title: 'Security',
    items: ['Role-aware access', 'Secure delivery', 'Audit readiness'],
    icon: 'shield',
    tone: 'sky',
  },
  {
    id: 'scalability',
    title: 'Scalability',
    items: ['Cloud-ready cores', 'Role growth', 'Stable integrations'],
    icon: 'cloud',
    tone: 'accent',
  },
  {
    id: 'partnership',
    title: 'Long-term Partnership',
    items: ['Support', 'Optimization', 'Continuous improvement'],
    icon: 'rocket',
    tone: 'primary',
  },
] as const;

export const WORK_TRUST_FALLBACK_TOPICS: readonly WorkTrustFallbackTopic[] = [
  {
    id: 'principles',
    title: 'Engineering principles',
    description:
      'Clear ownership, measurable outcomes, and architecture that remains operable after launch.',
    icon: 'code',
  },
  {
    id: 'standards',
    title: 'Delivery standards',
    description:
      'Reviewed code, accessible interfaces, performance budgets, and release readiness gates.',
    icon: 'shield',
  },
  {
    id: 'engagement',
    title: 'Client engagement model',
    description:
      'Weekly demos, written reporting, and collaborative decision paths for stakeholders.',
    icon: 'message',
  },
] as const;

export const WORK_TRUST_BAND: readonly WorkTrustBandItem[] = [
  { id: 'enterprise-ready', label: 'Enterprise Ready' },
  { id: 'nda', label: 'NDA Friendly' },
  { id: 'agile', label: 'Agile Delivery' },
  { id: 'docs', label: 'Documentation First' },
  { id: 'a11y', label: 'Accessibility Focus' },
] as const;

export const WORK_TRUST_COPY = {
  eyebrow: 'Why Bitcraftly',
  heading: 'Why Clients Choose Bitcraftly',
  description:
    'Highlight engineering maturity, delivery quality, collaboration and measurable execution instead of fabricated testimonials.',
  pillarsLabel: 'Trust foundations',
  testimonialsLabel: 'Client testimonials',
  emptyTitle: 'No public testimonials available yet.',
  emptyDescription:
    'We only publish approved client feedback. Until then, our engagement model speaks for how we work.',
  bandLabel: 'Trust signals',
} as const;

export const WORK_FAQS: readonly WorkFaqItem[] = [
  {
    id: 'timeline',
    question: 'How long does a typical project take?',
    answer:
      'Most first usable releases land in 4–14 weeks, depending on integrations, compliance needs, and how quickly stakeholders can decide. You get a milestone plan before build starts.',
  },
  {
    id: 'cost',
    question: 'How do you estimate project cost?',
    answer:
      'We scope from workflows, must-have outcomes, and integration complexity — then provide a written estimate with assumptions, phase options, and what’s in or out of the first release.',
  },
  {
    id: 'modernize',
    question: 'Can you modernize an existing application?',
    answer:
      'Yes. We audit the current system, stabilize what’s risky, and modernize in stages with APIs and cutovers — avoiding unnecessary rip-and-replace when a core still serves the business.',
  },
  {
    id: 'enterprise',
    question: 'Do you work with enterprise teams?',
    answer:
      'Yes. Many portfolio engagements involve multi-role ops, security reviews, documentation, and collaboration with product, engineering, and compliance stakeholders.',
  },
  {
    id: 'nda',
    question: 'Can you sign NDA?',
    answer:
      'Yes. We’re NDA-friendly and can complete mutual confidentiality agreements before sensitive workflow or system reviews.',
  },
  {
    id: 'tech',
    question: 'What technologies do you recommend?',
    answer:
      'We recommend proven stacks that fit your team and constraints — commonly Next.js, React, TypeScript, Node.js or FastAPI, PostgreSQL, and cloud on AWS or Vercel — chosen for maintainability, not novelty.',
  },
  {
    id: 'support',
    question: 'What support is available after launch?',
    answer:
      'After launch we can provide monitoring, optimization, incident response paths, and continuous improvement retainers so the product keeps improving with real usage.',
  },
] as const;

export const WORK_RELATED_SERVICES: readonly WorkRelatedService[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    description:
      'High-performance marketing and product sites engineered for conversion, SEO, and maintainable growth.',
    href: `${ROUTES.services}/website-development`,
    icon: 'globe',
    ctaLabel: 'Explore service',
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    description:
      'Assistive automation with human escalation paths for ops queues, reviews, and customer workflows.',
    href: `${ROUTES.services}/ai-automation`,
    icon: 'brain',
    ctaLabel: 'Explore service',
  },
  {
    id: 'crm',
    title: 'CRM Development',
    description:
      'Pipeline and relationship systems shaped around how your sales and success teams actually work.',
    href: `${ROUTES.solutions}/crm`,
    icon: 'message',
    ctaLabel: 'Explore solution',
  },
  {
    id: 'erp',
    title: 'ERP Solutions',
    description:
      'Operational cores for inventory, finance, and fulfillment with clearer ownership and reporting.',
    href: `${ROUTES.solutions}/erp`,
    icon: 'database',
    ctaLabel: 'Explore solution',
  },
  {
    id: 'cloud',
    title: 'Cloud Engineering',
    description:
      'Secure hosting, delivery pipelines, and observability so shipping stays routine under real load.',
    href: `${ROUTES.services}/cloud-devops`,
    icon: 'cloud',
    ctaLabel: 'Explore service',
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    description:
      'Domain systems built around operator reality — roles, queues, integrations, and measurable outcomes.',
    href: `${ROUTES.services}/custom-software-development`,
    icon: 'code',
    ctaLabel: 'Explore service',
  },
] as const;

export const WORK_FAQ_COPY = {
  eyebrow: 'FAQ',
  heading: 'Frequently Asked Questions',
  description:
    'Straight answers about timelines, cost, modernization, enterprise delivery, and post-launch support.',
} as const;

export const WORK_RELATED_COPY = {
  eyebrow: 'Related Services',
  heading: 'Capabilities that pair with portfolio engagements.',
  description: 'Explore the services and solutions most often connected to the work we ship.',
} as const;

export const WORK_CTA_COPY = {
  heading: "Let's build your next digital product.",
  description:
    "Whether you're starting from scratch or scaling an existing platform, we're ready to help.",
  primaryCta: {
    label: 'Book Free Consultation',
    href: '/contact?intent=consultation&source=work',
  },
  tertiaryCta: {
    label: 'View Services',
    href: ROUTES.services,
  },
  trust: [
    'Free discovery session',
    'NDA friendly',
    'Enterprise ready',
    '24-hour response',
  ] as const,
} as const;

/** Landing section order — locked blueprint (hero deferred to later sprint). */
export const WORK_LANDING_SECTIONS: readonly WorkLandingSectionMeta[] = [
  {
    id: 'featured-projects',
    title: 'Our Portfolio',
    description:
      'A showcase of modern, fast, and AI-powered digital solutions built with React.js, Next.js & cutting-edge technologies.',
  },
  /* Landing outline: Hero → Featured → Explorer → Selected Projects → Outcomes → Tech → Process → Trust → FAQ → Related → CTA */
  {
    id: 'portfolio-categories',
    title: 'Find projects by industry, technology, or business solution.',
    description:
      'Browse our work to see how we solve real-world engineering challenges across different industries and platforms.',
  },
  {
    id: 'portfolio-grid',
    title: 'Selected Projects',
    description:
      'Explore shipped products, platforms, and automations — filter above to match your industry, service, or stack.',
  },
  {
    id: 'business-results',
    title: 'Business Outcomes',
    description:
      'Showcase the real impact of our engineering across performance, scalability, automation and customer experience.',
  },
  {
    id: 'technology-expertise',
    title: 'Modern engineering powered by proven technologies.',
    description:
      'Our teams build scalable, secure and high-performance digital products using a carefully selected technology ecosystem.',
  },
  {
    id: 'delivery-process',
    title: 'A transparent engineering process from discovery to long-term success.',
    description:
      'Every engagement follows a structured, collaborative workflow to ensure quality, predictable delivery, and measurable outcomes.',
  },
  {
    id: 'testimonials',
    title: 'Why Clients Choose Bitcraftly',
    description:
      'Highlight engineering maturity, delivery quality, collaboration and measurable execution instead of fabricated testimonials.',
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    description:
      'Straight answers about timelines, cost, modernization, enterprise delivery, and post-launch support.',
  },
  {
    id: 'related-services',
    title: 'Capabilities that pair with portfolio engagements.',
    description: 'Explore the services and solutions most often connected to the work we ship.',
  },
  {
    id: 'final-cta',
    title: "Let's build your next digital product.",
    description:
      "Whether you're starting from scratch or scaling an existing platform, we're ready to help.",
  },
] as const;

export const WORK_LANDING = {
  eyebrow: 'Portfolio',
  title: 'Real Products. Real Engineering. Real Business Impact.',
  titleHighlight: 'Real Business Impact',
  description:
    'Bitcraftly ships production software for operators who need clarity, speed, and measurable outcomes — websites, platforms, and AI workflows that hold up under real load.',
  primaryCta: {
    label: 'View Work',
    href: '#work-portfolio',
  },
  secondaryCta: {
    label: 'Start Your Project',
    href: NAV_ACTIONS.freeConsultation.href,
  },
  techChips: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'AWS', 'OpenAI'] as const,
  metrics: [
    {
      id: 'projects',
      value: '200+',
      label: 'Projects Delivered',
    },
    {
      id: 'enterprise',
      value: '40+',
      label: 'Enterprise Clients',
    },
    {
      id: 'industries',
      value: '12+',
      label: 'Industries Served',
    },
    {
      id: 'years',
      value: '8+',
      label: 'Years Experience',
    },
  ] as const,
  trust: ['Founder-led delivery', 'Outcome-led case notes', 'Written next steps'],
  cta: {
    heading: 'Tell us what you need to ship',
    description:
      'Share constraints, timelines, and success metrics. We’ll reply with a clear path — not a pitch deck.',
    primaryCta: {
      label: NAV_ACTIONS.freeConsultation.label,
      href: NAV_ACTIONS.freeConsultation.href,
    },
    tertiaryCta: {
      label: 'Explore services',
      href: ROUTES.services,
    },
    trust: [
      'Response within 24 hours',
      'Milestone delivery model',
      'Free consultation · written next steps',
    ],
  },
} as const;

export const WORK_HUBS: readonly WorkHubContent[] = [
  {
    slug: 'portfolio',
    title: 'Portfolio',
    description: 'Browse websites, apps, and platforms by category.',
    filterPreset: 'all',
    seoTitle: 'Portfolio | Work',
    seoDescription: 'Browse Bitcraftly portfolio work by category and outcome.',
  },
  {
    slug: 'featured-projects',
    title: 'Featured Projects',
    description: 'Selected projects that represent our best delivery.',
    filterPreset: 'featured',
    seoTitle: 'Featured Projects | Work',
    seoDescription: 'Flagship Bitcraftly projects with measurable business impact.',
  },
  {
    slug: 'web-applications',
    title: 'Web Applications',
    description: 'Portals, dashboards, and operator-facing products.',
    filterPreset: 'web-applications',
    seoTitle: 'Web Applications | Work',
    seoDescription: 'Bitcraftly web application portfolio and delivery notes.',
  },
] as const;

export function getWorkProjectBySlug(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((item) => item.slug === slug);
}

export function getWorkCaseStudyBySlug(slug: string): WorkCaseStudy | undefined {
  return WORK_CASE_STUDIES.find((item) => item.slug === slug);
}

export function getWorkHubBySlug(slug: string): WorkHubContent | undefined {
  return WORK_HUBS.find((item) => item.slug === slug);
}

export function getFeaturedWorkProjects(): readonly WorkProject[] {
  return filterWorkProjects(WORK_PROJECTS, 'featured');
}

export function getApprovedTestimonials(): readonly WorkTestimonial[] {
  return WORK_TESTIMONIALS.filter((item) => item.approved);
}
