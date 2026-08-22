import { ROUTES, SECTION_IDS } from '@/constants/navigation';
import { getWorkProjectHref, WORK_PROJECTS } from '@/features/work/work.content';
import type { WorkProject } from '@/features/work/work.types';
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
  'Website, AI, dashboard, analytics, and integrations — one Industry System, ready to launch.';

export const HERO_MODULE_CHIPS: readonly string[] = [
  'Website',
  'AI',
  'Dashboard',
  'Analytics',
  'CMS',
  'Leads',
  'Integrations',
  'Go-Live',
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
    label: 'Book a Strategy Call',
    href: `${ROUTES.contact}?intent=strategy`,
    variant: 'outline',
  },
];

export const HERO_TRUST = {
  label: 'Trusted path for Healthcare, Real Estate, Restaurant & Corporate',
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

/** Hero browser portfolio previews — auto-rotate every ~5s (layout frozen). */
export const HERO_INDUSTRY_ROTATE_MS = 5000;

const HERO_PREVIEW_WIDTHS = [480, 720, 960, 1280] as const;
const HERO_IMAGE_SIZES = '(max-width: 767px) 92vw, (max-width: 1023px) 50vw, 560px';

/** Work slugs with responsive AVIF/WebP under `public/products/hero`. */
const HERO_OPTIMIZED_ASSET_SLUGS = new Set([
  'shrishti-cloud-kitchen',
  'swastik-makhana',
  'kunwar-dairy',
  'next-gen-saas-platform',
  'clinic-healthcare',
  'school-website',
  'gym-website',
  'restaurant-ai-chatbot',
  'ecommerce-store',
  'playnest-toy-store',
  'builder-website',
  'society-portal',
  'rpy-training-institute',
  'local-services-lead-site',
  'online-crockery-shop',
]);

export type HeroIndustryPreview = {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly industry: string;
  readonly host: string;
  readonly imageSrc: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly imageWebpSrcSet: string;
  readonly imageAvifSrcSet: string;
  readonly imageSizes: string;
  /** True when AVIF/WebP srcsets point at `/products/hero/*` assets. */
  readonly usesHeroOptimized: boolean;
  readonly ai: {
    readonly title: string;
    readonly message: string;
    readonly suggestions: readonly string[];
  };
  readonly dashboard: {
    readonly title: string;
    readonly panels: readonly string[];
  };
  readonly analytics: {
    readonly kpis: readonly { readonly label: string; readonly value: string }[];
  };
};

type HeroPreviewOverlay = Pick<
  HeroIndustryPreview,
  'label' | 'title' | 'industry' | 'host' | 'ai' | 'dashboard' | 'analytics'
>;

function heroOptimizedImage(slug: string, naturalWidth: number, naturalHeight: number) {
  const webpSrcSet = HERO_PREVIEW_WIDTHS.map(
    (width) => `/products/hero/${slug}-${width}.webp ${width}w`,
  ).join(', ');
  const avifSrcSet = HERO_PREVIEW_WIDTHS.map(
    (width) => `/products/hero/${slug}-${width}.avif ${width}w`,
  ).join(', ');

  return {
    imageSrc: `/products/hero/${slug}-960.webp`,
    imageWidth: naturalWidth,
    imageHeight: naturalHeight,
    imageWebpSrcSet: webpSrcSet,
    imageAvifSrcSet: avifSrcSet,
    imageSizes: HERO_IMAGE_SIZES,
    usesHeroOptimized: true,
  } as const;
}

function heroCoverImage(coverImage: string) {
  return {
    imageSrc: coverImage,
    imageWidth: 1280,
    imageHeight: 960,
    imageWebpSrcSet: coverImage,
    imageAvifSrcSet: coverImage,
    imageSizes: HERO_IMAGE_SIZES,
    usesHeroOptimized: false,
  } as const;
}

/** Browser chrome URL — exact live route / URL as defined on the work project. */
function heroBrowserHost(project: WorkProject): string {
  const live = project.liveUrl?.trim();
  if (live) {
    if (live.startsWith('http://') || live.startsWith('https://')) {
      try {
        const url = new URL(live);
        const host = url.hostname.replace(/^www\./, '');
        const path = url.pathname.replace(/\/$/, '');
        return path && path !== '/' ? `${host}${path}` : host;
      } catch {
        /* fall through */
      }
    }
    if (live.startsWith('/')) {
      return live.replace(/\/$/, '') || live;
    }
  }

  return getWorkProjectHref(project.slug);
}

type HeroRichOverlay = Omit<HeroPreviewOverlay, 'host'>;

/** Rich desktop overlays for flagship industry systems (keyed by work slug). */
const HERO_RICH_OVERLAYS: Readonly<Record<string, HeroRichOverlay>> = {
  'clinic-healthcare': {
    label: 'Healthcare System',
    title: 'Medicare+',
    industry: 'Healthcare',
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
  'shrishti-cloud-kitchen': {
    label: 'Restaurant System',
    title: 'Shrishti Kitchen',
    industry: 'Restaurant',
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
  'builder-website': {
    label: 'Real Estate System',
    title: 'Dayal Builders',
    industry: 'Real Estate',
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
  'local-services-lead-site': {
    label: 'Corporate Services System',
    title: 'Local Services Pro',
    industry: 'Corporate Services',
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
};

const HERO_OPTIMIZED_DIMENSIONS: Readonly<Record<string, readonly [number, number]>> = {
  'shrishti-cloud-kitchen': [1448, 1086],
  'swastik-makhana': [1448, 1086],
  'kunwar-dairy': [1536, 1024],
  'next-gen-saas-platform': [1536, 1024],
  'clinic-healthcare': [1200, 900],
  'school-website': [1200, 900],
  'gym-website': [1200, 900],
  'restaurant-ai-chatbot': [1200, 900],
  'ecommerce-store': [1200, 900],
  'playnest-toy-store': [1200, 900],
  'builder-website': [1200, 900],
  'society-portal': [1200, 900],
  'rpy-training-institute': [1200, 900],
  'local-services-lead-site': [1200, 900],
  'online-crockery-shop': [1200, 900],
};

function genericOverlay(project: WorkProject): HeroRichOverlay {
  const summary =
    project.summary.length > 96 ? `${project.summary.slice(0, 93).trimEnd()}…` : project.summary;

  return {
    label: `${project.industry} System`,
    title: project.title,
    industry: project.industry,
    ai: {
      title: 'AI Assistant',
      message: summary,
      suggestions: ['Learn more', 'Get quote', 'Book call'],
    },
    dashboard: {
      title: 'Operations',
      panels: ['Leads', 'Pipeline', 'Content', 'AI Activity'],
    },
    analytics: {
      kpis: [
        { label: 'Focus', value: 'Live' },
        { label: 'Stack', value: 'System' },
        { label: 'Ready', value: 'Go-live' },
      ],
    },
  };
}

function buildHeroPreview(project: WorkProject): HeroIndustryPreview {
  const overlay = HERO_RICH_OVERLAYS[project.slug] ?? genericOverlay(project);
  const images = HERO_OPTIMIZED_ASSET_SLUGS.has(project.slug)
    ? heroOptimizedImage(
        project.slug,
        HERO_OPTIMIZED_DIMENSIONS[project.slug]?.[0] ?? 1280,
        HERO_OPTIMIZED_DIMENSIONS[project.slug]?.[1] ?? 960,
      )
    : heroCoverImage(project.coverImage);

  return {
    id: project.slug,
    ...overlay,
    ...images,
    host: heroBrowserHost(project),
  };
}

/** Full portfolio catalog in hero browser order (unique work slugs). */
export const HERO_INDUSTRY_PREVIEWS: readonly HeroIndustryPreview[] = WORK_PROJECTS.filter(
  (project, index, all) => all.findIndex((entry) => entry.slug === project.slug) === index,
).map(buildHeroPreview);

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
