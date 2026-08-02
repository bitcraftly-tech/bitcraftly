import { ROUTES, SECTION_IDS } from '@/constants/navigation';
import type { HeroCapabilityTag, HeroCta } from './hero.types';

export const HERO_ID = SECTION_IDS.hero;
export const HERO_HEADING_ID = 'hero-heading';

export const HERO_BADGE = 'AI-Powered Digital Engineering Partner';

export const HERO_HEADING = {
  lead: 'Complete',
  focus: 'Digital Systems',
  sub: 'for Your Industry.',
  /** Quiet sans opener before the script accent */
  subLead: 'for Your',
  /** Matches Digital Systems script treatment */
  subAccent: 'Industry.',
  /** @deprecated Prefer lead/focus/sub */
  line1: 'Complete Digital Systems',
  line2: 'for Your Industry.',
} as const;

export const HERO_DESCRIPTION =
  'Website, AI, dashboard, analytics, and integrations — engineered as one Industry System, ready to launch.';

export const HERO_MODULE_CHIPS: readonly string[] = [
  'Website',
  'AI',
  'Dashboard',
  'Analytics',
  'CMS',
  'Leads',
  'Integrations',
  'Deploy',
];

/** @deprecated Use HERO_MODULE_CHIPS — no generic feature cards */
export const HERO_FEATURE_PILLS: readonly HeroCapabilityTag[] = [
  { id: 'website', label: 'Website', icon: 'layout-grid' },
  { id: 'ai', label: 'AI', icon: 'sparkles' },
  { id: 'dashboard', label: 'Dashboard', icon: 'layout-grid' },
  { id: 'analytics', label: 'Analytics', icon: 'trending-up' },
];

export const HERO_CTAS: HeroCta[] = [
  {
    label: 'Explore Industry Systems',
    href: ROUTES.industries,
    variant: 'primary',
  },
  {
    label: 'Book Strategy Call',
    href: `${ROUTES.contact}?intent=strategy`,
    variant: 'outline',
  },
];

export const HERO_TRUST = {
  label: 'Industry Systems for Healthcare, Real Estate, Restaurant & Corporate Services',
  countBadge: '4',
  avatars: [
    { initials: 'HC', tone: 'violet' as const },
    { initials: 'RE', tone: 'blue' as const },
    { initials: 'RS', tone: 'rose' as const },
    { initials: 'CS', tone: 'amber' as const },
  ],
};

export const HERO_SYSTEM = {
  industry: 'Healthcare System',
  flow: ['Website', 'AI', 'Dashboard', 'Analytics'] as const,
  website: {
    brand: 'Medicare+',
    headline: 'Compassionate Care.\nAdvanced Healthcare.',
    cta: 'Book Appointment',
  },
  ai: {
    title: 'AI Assistant',
    message: 'I can help schedule a visit or answer service questions.',
    suggestions: ['Book visit', 'Insurance', 'Doctors'],
  },
  dashboard: {
    title: 'Operations',
    panels: ['Leads', 'Schedule', 'Content', 'AI Activity'],
  },
  analytics: {
    kpis: [
      { label: 'Leads', value: '248' },
      { label: 'Bookings', value: '86' },
      { label: 'Conv.', value: '12.4%' },
    ],
  },
} as const;

/** Hero browser industry previews — auto-rotate every ~5.5s (layout frozen). */
export const HERO_INDUSTRY_ROTATE_MS = 5500;

export const HERO_INDUSTRY_PREVIEWS = [
  {
    id: 'healthcare',
    label: 'Healthcare System',
    title: 'Medicare+',
    industry: 'Healthcare',
    host: 'medicare.bitcraftly.com',
    imageSrc: '/products/Clinic%20%26%20Healthcare.png',
    ai: {
      title: 'AI Assistant',
      message: 'I can help schedule a visit or answer service questions.',
      suggestions: ['Book visit', 'Insurance', 'Doctors'],
    },
    dashboard: {
      title: 'Operations',
      panels: ['Leads', 'Schedule', 'Content', 'AI Activity'],
    },
    analytics: {
      kpis: [
        { label: 'Leads', value: '248' },
        { label: 'Bookings', value: '86' },
        { label: 'Conv.', value: '12.4%' },
      ],
    },
  },
  {
    id: 'restaurant',
    label: 'Restaurant System',
    title: 'Shrishti Kitchen',
    industry: 'Restaurant',
    host: 'shrishti.bitcraftly.com',
    imageSrc: '/products/Shrishti%20Cloud%20Kitchen.png',
    ai: {
      title: 'AI Concierge',
      message: 'I can take orders, share the menu, or route a WhatsApp handoff.',
      suggestions: ['Order now', 'Menu', 'Reserve'],
    },
    dashboard: {
      title: 'Operations',
      panels: ['Orders', 'Menu', 'Leads', 'AI Chats'],
    },
    analytics: {
      kpis: [
        { label: 'Orders', value: '412' },
        { label: 'Avg. ticket', value: '₹640' },
        { label: 'Repeat', value: '31%' },
      ],
    },
  },
  {
    id: 'real-estate',
    label: 'Real Estate System',
    title: 'Dayal Builders',
    industry: 'Real Estate',
    host: 'dayal.bitcraftly.com',
    imageSrc: '/products/Builder%20Website.png',
    ai: {
      title: 'AI Assistant',
      message: 'I can match inventory, book site visits, or qualify a lead.',
      suggestions: ['Site visit', 'Projects', 'Pricing'],
    },
    dashboard: {
      title: 'Operations',
      panels: ['Leads', 'Inventory', 'Visits', 'AI Activity'],
    },
    analytics: {
      kpis: [
        { label: 'Leads', value: '186' },
        { label: 'Visits', value: '54' },
        { label: 'Conv.', value: '9.8%' },
      ],
    },
  },
  {
    id: 'corporate',
    label: 'Corporate Services System',
    title: 'Local Services Pro',
    industry: 'Corporate Services',
    host: 'services.bitcraftly.com',
    imageSrc: '/products/Local%20Services%20Lead%20Site.png',
    ai: {
      title: 'AI Assistant',
      message: 'I can capture a brief, estimate scope, or book a strategy call.',
      suggestions: ['Get quote', 'Services', 'Book call'],
    },
    dashboard: {
      title: 'Operations',
      panels: ['Leads', 'Pipeline', 'Content', 'AI Activity'],
    },
    analytics: {
      kpis: [
        { label: 'Leads', value: '164' },
        { label: 'Qualified', value: '71' },
        { label: 'Conv.', value: '14.2%' },
      ],
    },
  },
] as const;

export type HeroIndustryPreview = (typeof HERO_INDUSTRY_PREVIEWS)[number];

export const HERO_EYEBROW_LABEL = HERO_BADGE;
export const HERO_DESCRIPTION_MOBILE = HERO_DESCRIPTION;
export const HERO_CAPABILITY_TAGS = HERO_FEATURE_PILLS;

export const HERO_HEADING_LEGACY = {
  brand: 'Bitcraftly',
  main: 'Complete Digital Systems for Your Industry.',
  accent: 'Complete Digital Systems',
} as const;

export const HERO_METRICS = [
  { value: '20+', label: 'Years of Experience' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support & Maintenance' },
];

export const HERO_DASHBOARD = {
  url: 'app.bitcraftly.com/analytics',
  title: 'Revenue Overview',
  subtitle: 'Last 30 days · live',
  growth: '+24.8%',
  revenueLabel: 'Total Revenue',
  revenueValue: '₹24.8L',
  previousValue: '₹19.9L',
} as const;

export const HERO_DASHBOARD_STATS = [
  { label: 'Projects', value: '32', change: '+12.4%' },
  { label: 'Leads', value: '248', change: '+15.2%' },
  { label: 'Success', value: '98%', change: '+2.1%' },
];

export const HERO_STAGE_PROGRESS = [
  { label: 'AI Platform', value: 75 },
  { label: 'CRM System', value: 60 },
  { label: 'Mobile App', value: 40 },
] as const;

export const HERO_STAGE_USERS = {
  value: '12,460',
  change: '+24.8%',
} as const;

export const HERO_ASSISTANT = {
  name: 'AI Assistant',
  version: 'Bitcraftly · online',
  status: 'Live',
  message: 'Hello! How can I help you today?',
} as const;

export const HERO_ASSISTANT_SUGGESTIONS = [
  {
    text: 'Website',
    href: `${ROUTES.contact}?intent=website&source=hero-stage`,
  },
  {
    text: 'AI Chatbot',
    href: `${ROUTES.contact}?intent=ai&source=hero-stage`,
  },
  {
    text: 'CRM',
    href: `${ROUTES.contact}?intent=crm&source=hero-stage`,
  },
  {
    text: 'Automation',
    href: `${ROUTES.contact}?intent=automation&source=hero-stage`,
  },
];

export const HERO_AUTOMATION = {
  title: 'Automation Flow',
  subtitle: 'Lead → qualify → notify',
  status: 'Running',
} as const;

export const HERO_AUTOMATION_STEPS = [
  { label: 'New Lead', completed: true },
  { label: 'AI Qualify', completed: true },
  { label: 'Notify Team', completed: true },
];
