import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import type { IndustriesFaqItem, IndustriesMetric, IndustriesWhyItem, IndustryItem } from './types';

const discoveryCta = (label = 'Explore Solutions') =>
  ({
    label,
    href: ROUTES.contact,
  }) as const;

export const INDUSTRIES_HERO = {
  eyebrow: 'Industries',
  title: 'Industry-Focused Digital Solutions',
  description:
    'We design and ship software that fits how your industry actually operates — clearer workflows, stronger conversion, and measurable outcomes.',
  primaryCta: {
    label: NAV_ACTIONS.bookCall.label,
    href: NAV_ACTIONS.bookCall.href,
  },
  secondaryCta: {
    label: 'Browse industries',
    href: '#industries-grid',
  },
} as const;

export const INDUSTRY_ITEMS: readonly IndustryItem[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    shortDescription:
      'Secure platforms for clinics, hospitals, and care operators — bookings, records, and patient experience.',
    icon: 'calendar',
    challenges: [
      'Missed appointments and phone-heavy scheduling',
      'Fragmented patient and staff workflows',
      'Compliance pressure around sensitive data',
    ],
    solutions: [
      'Online booking and reminder systems',
      'Role-based portals for doctors and staff',
      'Secure patient data handling with audit-friendly design',
    ],
    recommendedServices: ['Booking Systems', 'Custom Portals', 'AI Chatbots', 'Dashboards'],
    technologyStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
    typicalTimeline: '6–10 weeks',
    startingInvestment: '₹45,000',
    cta: discoveryCta('Solve Healthcare Challenges'),
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    shortDescription:
      'High-converting storefronts and commerce systems built for catalog, checkout, and retention.',
    icon: 'globe',
    challenges: [
      'Slow mobile conversion and cart abandonment',
      'Hard-to-manage catalogs and promotions',
      'Weak post-purchase visibility',
    ],
    solutions: [
      'Performance-first storefronts',
      'Streamlined checkout and order tracking',
      'Merchandising and ops tooling for growth',
    ],
    recommendedServices: ['Business Websites', 'Marketplaces', 'AI Recommendation', 'Analytics'],
    technologyStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    typicalTimeline: '8–12 weeks',
    startingInvestment: '₹35,000',
    cta: discoveryCta('Grow Online Sales'),
  },
  {
    id: 'education',
    name: 'Education',
    shortDescription:
      'Learning platforms and institute systems for enrollment, courses, and learner progress.',
    icon: 'sparkles',
    challenges: [
      'Disconnected enrollment and course tools',
      'Low completion visibility',
      'Poor mobile learning experience',
    ],
    solutions: [
      'Unified course and enrollment platforms',
      'Progress tracking for learners and instructors',
      'Mobile-first learning experiences',
    ],
    recommendedServices: ['Custom Portals', 'Dashboards', 'AI Search', 'UI/UX'],
    technologyStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'AI'],
    typicalTimeline: '7–11 weeks',
    startingInvestment: '₹40,000',
    cta: discoveryCta('Modernize Learning'),
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    shortDescription:
      'Project showcases, inquiry capture, and sales follow-up systems for property brands.',
    icon: 'map-pin',
    challenges: [
      'Leads trapped in WhatsApp and static pages',
      'Weak project storytelling online',
      'Slow sales follow-up',
    ],
    solutions: [
      'Premium project showcase websites',
      'Structured inquiry and lead routing',
      'CRM-ready pipelines for sales teams',
    ],
    recommendedServices: ['Corporate Websites', 'CRM', 'Landing Pages', 'AI Chatbots'],
    technologyStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
    typicalTimeline: '5–8 weeks',
    startingInvestment: '₹30,000',
    cta: discoveryCta('Capture Better Leads'),
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    shortDescription:
      'Operations software for inventory, production visibility, and plant-floor coordination.',
    icon: 'database',
    challenges: [
      'Spreadsheet-driven inventory and production',
      'Limited visibility across plants and teams',
      'Manual reconciliation delays',
    ],
    solutions: [
      'Inventory and operations dashboards',
      'Workflow systems for procurement and fulfillment',
      'Role-based access for plant and HQ teams',
    ],
    recommendedServices: ['ERP', 'Inventory', 'Dashboards', 'Cloud & DevOps'],
    technologyStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    typicalTimeline: '10–16 weeks',
    startingInvestment: '₹1,00,000',
    cta: discoveryCta('Digitize Operations'),
  },
  {
    id: 'logistics',
    name: 'Logistics',
    shortDescription:
      'Tracking, dispatch, and partner portals that keep shipments and teams aligned.',
    icon: 'workflow',
    challenges: [
      'Opaque shipment status for customers',
      'Dispatch coordination across partners',
      'Fragmented status updates',
    ],
    solutions: [
      'Shipment tracking experiences',
      'Partner and ops portals',
      'Status workflows with live visibility',
    ],
    recommendedServices: ['Custom Portals', 'Dashboards', 'API Integration', 'Mobile Apps'],
    technologyStack: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    typicalTimeline: '8–14 weeks',
    startingInvestment: '₹75,000',
    cta: discoveryCta('Improve Delivery Ops'),
  },
  {
    id: 'finance',
    name: 'Finance',
    shortDescription:
      'Secure customer experiences and internal tools for fintech and financial services teams.',
    icon: 'shield',
    challenges: [
      'Trust and security expectations at every step',
      'Complex onboarding and verification flows',
      'Reporting that lags decision-making',
    ],
    solutions: [
      'Secure web applications with strong access control',
      'Clear onboarding and workflow UX',
      'Analytics for risk and operations teams',
    ],
    recommendedServices: ['Web Applications', 'Dashboards', 'Security Monitoring', 'AI Analytics'],
    technologyStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    typicalTimeline: '10–16 weeks',
    startingInvestment: '₹90,000',
    cta: discoveryCta('Build Secure Finance UX'),
  },
  {
    id: 'travel',
    name: 'Travel',
    shortDescription:
      'Booking journeys, itinerary experiences, and partner systems for travel brands.',
    icon: 'globe',
    challenges: [
      'Complex booking flows that drop conversions',
      'Content and inventory hard to keep fresh',
      'Support overload during peak seasons',
    ],
    solutions: [
      'Conversion-focused booking experiences',
      'Content and inventory management systems',
      'AI assistants for FAQs and trip support',
    ],
    recommendedServices: ['Booking Systems', 'Marketplaces', 'AI Chatbots', 'Mobile Apps'],
    technologyStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'AI'],
    typicalTimeline: '8–13 weeks',
    startingInvestment: '₹55,000',
    cta: discoveryCta('Upgrade Travel Journeys'),
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    shortDescription:
      'Ordering, menus, and kitchen-ready systems for restaurants and cloud kitchens.',
    icon: 'zap',
    challenges: [
      'Peak-hour order chaos',
      'Menu and outlet inconsistencies',
      'Weak online ordering conversion',
    ],
    solutions: [
      'Digital menus and ordering flows',
      'Kitchen status and outlet routing',
      'Mobile-first customer experiences',
    ],
    recommendedServices: ['Web Applications', 'Mobile Apps', 'AI Automation', 'Dashboards'],
    technologyStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
    typicalTimeline: '6–10 weeks',
    startingInvestment: '₹40,000',
    cta: discoveryCta('Streamline Restaurant Ops'),
  },
  {
    id: 'retail',
    name: 'Retail',
    shortDescription:
      'Omnichannel retail systems spanning storefronts, inventory, and customer engagement.',
    icon: 'layout-grid',
    challenges: [
      'Disconnected online and offline inventory',
      'Inconsistent brand experience across channels',
      'Limited insight into what sells and why',
    ],
    solutions: [
      'Unified catalog and commerce experiences',
      'Inventory visibility for teams',
      'Analytics that inform merchandising decisions',
    ],
    recommendedServices: ['E-commerce', 'Inventory', 'CRM', 'AI Recommendation'],
    technologyStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'AI'],
    typicalTimeline: '8–14 weeks',
    startingInvestment: '₹50,000',
    cta: discoveryCta('Unify Retail Experience'),
  },
  {
    id: 'saas',
    name: 'SaaS',
    shortDescription:
      'Product-grade SaaS foundations — auth, dashboards, billing-ready architecture, and scale.',
    icon: 'code',
    challenges: [
      'MVP architecture that cannot scale cleanly',
      'Slow feature velocity from weak foundations',
      'Unclear product UX for activation',
    ],
    solutions: [
      'Scalable multi-tenant app architecture',
      'Product UX focused on activation and retention',
      'CI/CD and observability from day one',
    ],
    recommendedServices: ['Web Applications', 'UI/UX', 'Cloud & DevOps', 'AI Features'],
    technologyStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    typicalTimeline: '10–18 weeks',
    startingInvestment: '₹1,25,000',
    cta: discoveryCta('Build SaaS Right'),
  },
  {
    id: 'startups',
    name: 'Startups',
    shortDescription:
      'Speed-to-market product builds with founder-level clarity on scope, stack, and milestones.',
    icon: 'rocket',
    challenges: [
      'Need to ship fast without creating debt',
      'Unclear MVP boundaries',
      'Limited engineering bandwidth',
    ],
    solutions: [
      'Scoped MVPs with written milestones',
      'Modern stack ready for iteration',
      'Founder-led architecture and delivery',
    ],
    recommendedServices: ['Landing Pages', 'MVP Apps', 'Design Systems', 'AI Prototypes'],
    technologyStack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'AI'],
    typicalTimeline: '4–8 weeks',
    startingInvestment: '₹25,000',
    cta: discoveryCta('Launch Faster'),
  },
] as const;

export const INDUSTRIES_GRID_META = {
  eyebrow: 'Industries',
  title: 'Solutions shaped by how your industry works',
  description:
    'Select an industry to see challenges, solutions, recommended services, and typical engagement details.',
} as const;

export const INDUSTRIES_DETAIL_META = {
  eyebrow: 'Industry deep dive',
  titlePrefix: 'How we help',
} as const;

export const INDUSTRIES_WHY: readonly IndustriesWhyItem[] = [
  {
    id: 'expertise',
    title: 'Industry expertise',
    description: 'We map software to real workflows — not generic templates with new labels.',
    icon: 'sparkles',
  },
  {
    id: 'ai-first',
    title: 'AI-first development',
    description:
      'Practical AI where it improves conversion, support, or operations — with guardrails.',
    icon: 'brain',
  },
  {
    id: 'scalable',
    title: 'Scalable architecture',
    description: 'Foundations that grow with demand, teams, and product complexity.',
    icon: 'trending-up',
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Access control, secure defaults, and production-minded delivery practices.',
    icon: 'shield',
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Fast experiences that protect conversion and keep operators productive.',
    icon: 'zap',
  },
  {
    id: 'team',
    title: 'Dedicated team',
    description: 'Founder-led engagement with clear ownership from discovery through launch.',
    icon: 'headset',
  },
] as const;

export const INDUSTRIES_WHY_META = {
  eyebrow: 'Why Bitcraftly',
  title: 'Built for industry outcomes',
  description:
    'Enterprise discipline with startup speed — focused on business value in every engagement.',
} as const;

export const INDUSTRIES_TECH = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'FastAPI',
  'PostgreSQL',
  'Supabase',
  'AWS',
  'Docker',
  'AI',
] as const;

export const INDUSTRIES_TECH_META = {
  eyebrow: 'Technology',
  title: 'Technology stack',
  description: 'Modern tools chosen for performance, maintainability, and long-term ownership.',
} as const;

export const INDUSTRIES_METRICS: readonly IndustriesMetric[] = [
  { id: 'projects', value: '300+', label: 'Projects Delivered' },
  { id: 'satisfaction', value: '100%', label: 'Client Satisfaction' },
  { id: 'industries', value: '24+', label: 'Industries Served' },
  { id: 'delivery', value: '6–12 wks', label: 'Average Delivery Time' },
] as const;

export const INDUSTRIES_METRICS_META = {
  eyebrow: 'Impact',
  title: 'Success metrics',
  description: 'Proof points from delivery across sectors — speed, quality, and satisfaction.',
} as const;

export const INDUSTRIES_FAQ: readonly IndustriesFaqItem[] = [
  {
    id: 'fit',
    question: 'Do you customize solutions for each industry?',
    answer:
      'Yes. We start with industry workflows and constraints, then recommend the right service mix — website, app, AI, or operations system — with a written scope.',
  },
  {
    id: 'existing',
    question: 'Can you work with our existing tools and data?',
    answer:
      'In most cases, yes. We integrate CRMs, WhatsApp, payment systems, ERPs, and internal APIs carefully so new software fits your operating model.',
  },
  {
    id: 'timeline',
    question: 'How long does an industry solution usually take?',
    answer:
      'Focused websites and booking systems often ship in weeks. Custom portals, marketplaces, and AI systems follow milestone plans based on discovery.',
  },
  {
    id: 'investment',
    question: 'Are starting investments fixed packages?',
    answer:
      'Starting investments indicate entry bands. Final proposals depend on scope, integrations, and compliance needs — always shared before build begins.',
  },
  {
    id: 'ai',
    question: 'When do you recommend AI for an industry use case?',
    answer:
      'When AI shortens response time, reduces repetitive work, or improves decision quality. If a strong UX and workflow is enough, we recommend that first.',
  },
  {
    id: 'ownership',
    question: 'Who owns the product after launch?',
    answer:
      'You own the delivered product assets. We provide handoff documentation and optional ongoing support for iteration and reliability.',
  },
] as const;

export const INDUSTRIES_FAQ_META = {
  eyebrow: 'FAQ',
  title: 'Industry-focused questions',
  description: 'Clear answers on fit, timelines, integrations, and ownership.',
  viewAllLabel: 'View all FAQs',
  viewAllHref: ROUTES.resourcesFaq,
} as const;

export const INDUSTRIES_FINAL_CTA = {
  eyebrow: 'Next step',
  title: 'Need a solution for your industry?',
  description:
    'Tell us your sector, constraints, and goals. We’ll map challenges to a clear solution path and written proposal.',
  primaryCta: {
    label: 'Book a Free Discovery Call',
    href: ROUTES.contact,
  },
  secondaryCta: {
    label: 'View Services',
    href: ROUTES.services,
  },
  trustItems: ['No-obligation discovery', 'Industry-aware scoping', 'Written proposals'] as const,
} as const;
