import type { IconName } from '@/components/ui/icon';

export interface WorkHubHeroStat {
  readonly id: string;
  readonly value: string;
  readonly label: string;
}

export interface WorkHubHeroCapability {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
}

export interface WorkHubHeroConfig {
  readonly eyebrow: string;
  readonly eyebrowIcon: IconName;
  readonly titleBefore: string;
  readonly titleMark: string;
  readonly titleAfter: string;
  readonly chips: readonly string[];
  readonly stats: readonly WorkHubHeroStat[];
  readonly capabilities: readonly WorkHubHeroCapability[];
}

const DEFAULT_STATS: readonly WorkHubHeroStat[] = [
  { id: 'ship', value: 'Live', label: 'Interactive demos' },
  { id: 'stack', value: 'Next.js', label: 'Modern delivery' },
  { id: 'scope', value: 'Clear', label: 'Written next steps' },
  { id: 'ops', value: 'Ops-ready', label: 'Handoff + docs' },
] as const;

function caps(
  items: readonly [string, string, string, string, string, string],
): readonly WorkHubHeroCapability[] {
  return [
    { id: 'a', title: items[0], detail: items[1] },
    { id: 'b', title: items[2], detail: items[3] },
    { id: 'c', title: items[4], detail: items[5] },
  ];
}

/** Themed hero copy for every Work mega-menu / hub route. */
export const WORK_HUB_HEROES: Readonly<Record<string, WorkHubHeroConfig>> = {
  'featured-projects': {
    eyebrow: 'Work · Featured',
    eyebrowIcon: 'star',
    titleBefore: 'Flagship',
    titleMark: 'projects',
    titleAfter: 'that prove delivery',
    chips: ['Flagship', 'Measurable', 'Cross-industry', 'Production-shaped'],
    stats: [
      { id: 'flag', value: 'Flagship', label: 'Selected deliveries' },
      { id: 'impact', value: 'ROI', label: 'Outcome-led briefs' },
      { id: 'stack', value: 'Full-stack', label: 'Web · AI · SaaS' },
      { id: 'demo', value: 'Live', label: 'Interactive proof' },
    ],
    capabilities: caps([
      'Proof over pitch',
      'Real screens, not moodboards.',
      'Outcome framing',
      'Metrics tied to business goals.',
      'Reusable patterns',
      'Systems you can extend.',
    ]),
  },
  latest: {
    eyebrow: 'Work · Latest',
    eyebrowIcon: 'sparkles',
    titleBefore: 'Recently',
    titleMark: 'shipped',
    titleAfter: 'work worth opening',
    chips: ['2026', 'Websites', 'Apps', 'AI', 'Ecommerce'],
    stats: [
      { id: 'year', value: '2026', label: 'Current wave' },
      { id: 'pace', value: 'Fast', label: 'Pilot to launch' },
      { id: 'mobile', value: 'Mobile', label: 'First-class UX' },
      { id: 'demo', value: 'Live', label: 'Try the demos' },
    ],
    capabilities: caps([
      'Fresh launches',
      'Newest marketing and product surfaces.',
      'Demo-ready',
      'Interactive showcases you can click.',
      'Stack current',
      'Next.js, TypeScript, modern UX.',
    ]),
  },
  enterprise: {
    eyebrow: 'Work · Enterprise',
    eyebrowIcon: 'shield',
    titleBefore: 'Enterprise',
    titleMark: 'systems',
    titleAfter: 'for complex operating models',
    chips: ['Multi-role', 'Governance', 'Security', 'Integrations', 'Scale'],
    stats: [
      { id: 'roles', value: 'Multi-role', label: 'Operator workflows' },
      { id: 'sec', value: 'Secure', label: 'Access patterns' },
      { id: 'int', value: 'APIs', label: 'System integration' },
      { id: 'docs', value: 'Documented', label: 'Handoff ready' },
    ],
    capabilities: caps([
      'Complex ops',
      'Roles, permissions, and audit-minded UX.',
      'Integration-first',
      'Connect CRM, ERP, and data planes.',
      'Long-term fit',
      'Architecture that survives growth.',
    ]),
  },
  healthcare: {
    eyebrow: 'Work · Healthcare',
    eyebrowIcon: 'shield',
    titleBefore: 'Healthcare',
    titleMark: 'products',
    titleAfter: 'patients and care teams trust',
    chips: ['Trust UX', 'Appointments', 'Clarity', 'Compliance-minded'],
    stats: [
      { id: 'trust', value: 'Trust', label: 'Clinical clarity' },
      { id: 'book', value: 'Book', label: 'Enquiry paths' },
      { id: 'mobile', value: 'Mobile', label: 'Patient-ready' },
      { id: 'ai', value: 'AI', label: 'Assist layers' },
    ],
    capabilities: caps([
      'Care clarity',
      'Services, doctors, and pathways made obvious.',
      'Enquiry flow',
      'Appointment and lead capture that converts.',
      'Assistive AI',
      'Optional copilots with human escalation.',
    ]),
  },
  education: {
    eyebrow: 'Work · Education',
    eyebrowIcon: 'message',
    titleBefore: 'Education',
    titleMark: 'platforms',
    titleAfter: 'students and campuses use',
    chips: ['Admissions', 'Programs', 'Campus UX', 'Lead capture'],
    stats: [
      { id: 'enroll', value: 'Enroll', label: 'Clear CTAs' },
      { id: 'prog', value: 'Programs', label: 'Structured catalogs' },
      { id: 'trust', value: 'Trust', label: 'Credibility rails' },
      { id: 'mobile', value: 'Mobile', label: 'Parent-friendly' },
    ],
    capabilities: caps([
      'Program clarity',
      'Courses and institutes explained fast.',
      'Admission paths',
      'Enquiry and counseling CTAs that work.',
      'Campus proof',
      'Galleries, faculty, and outcome stories.',
    ]),
  },
  fintech: {
    eyebrow: 'Work · FinTech',
    eyebrowIcon: 'trending-up',
    titleBefore: 'FinTech',
    titleMark: 'experiences',
    titleAfter: 'with controls operators need',
    chips: ['Payments', 'Dashboards', 'Trust', 'Audit trails'],
    stats: [
      { id: 'ctrl', value: 'Controls', label: 'Operator UX' },
      { id: 'trust', value: 'Trust', label: 'Clear states' },
      { id: 'data', value: 'Data', label: 'Decision surfaces' },
      { id: 'sec', value: 'Secure', label: 'Access patterns' },
    ],
    capabilities: caps([
      'Money UX',
      'Balances, status, and next actions stay clear.',
      'Operator dashboards',
      'Finance teams see what needs action.',
      'Trust signals',
      'States, receipts, and confirmations.',
    ]),
  },
  retail: {
    eyebrow: 'Work · Retail',
    eyebrowIcon: 'sparkles',
    titleBefore: 'Retail &',
    titleMark: 'commerce',
    titleAfter: 'built to convert',
    chips: ['Catalog', 'Cart UX', 'Brand', 'Mobile checkout'],
    stats: [
      { id: 'conv', value: 'Convert', label: 'Storefront focus' },
      { id: 'brand', value: 'Brand', label: 'Premium framing' },
      { id: 'mobile', value: 'Mobile', label: 'Shop-ready' },
      { id: 'ops', value: 'Ops', label: 'Catalog clarity' },
    ],
    capabilities: caps([
      'Storefront craft',
      'Collections that feel premium, not template.',
      'Path to purchase',
      'Clear CTAs from browse to enquire/buy.',
      'Brand systems',
      'Headers, footers, and product stages.',
    ]),
  },
  logistics: {
    eyebrow: 'Work · Logistics',
    eyebrowIcon: 'workflow',
    titleBefore: 'Logistics',
    titleMark: 'tools',
    titleAfter: 'that keep operations moving',
    chips: ['Tracking', 'Fulfillment', 'Ops UI', 'Status clarity'],
    stats: [
      { id: 'ops', value: 'Ops', label: 'Status-first UI' },
      { id: 'track', value: 'Track', label: 'Shipment clarity' },
      { id: 'roles', value: 'Roles', label: 'Team workflows' },
      { id: 'int', value: 'APIs', label: 'Integrations' },
    ],
    capabilities: caps([
      'Status clarity',
      'Operators see blockers immediately.',
      'Fulfillment flows',
      'Steps that match real warehouse work.',
      'Integration ready',
      'Connect carriers, ERPs, and alerts.',
    ]),
  },
  'web-applications': {
    eyebrow: 'Work · Web Applications',
    eyebrowIcon: 'code',
    titleBefore: 'Web',
    titleMark: 'applications',
    titleAfter: 'operators rely on daily',
    chips: ['Portals', 'Dashboards', 'Workflows', 'SaaS shells'],
    stats: [
      { id: 'ops', value: 'Ops', label: 'Daily drivers' },
      { id: 'roles', value: 'Roles', label: 'Permissioned UX' },
      { id: 'speed', value: 'Fast', label: 'Task completion' },
      { id: 'scale', value: 'Scale', label: 'Product-ready' },
    ],
    capabilities: caps([
      'Operator UX',
      'Dense screens that stay scannable.',
      'Workflow depth',
      'Multi-step jobs without dead ends.',
      'Product shells',
      'SaaS patterns ready to extend.',
    ]),
  },
  'mobile-apps': {
    eyebrow: 'Work · Mobile Apps',
    eyebrowIcon: 'rocket',
    titleBefore: 'Mobile',
    titleMark: 'apps',
    titleAfter: 'that feel native and fast',
    chips: ['iOS / Android', 'Touch UX', 'Offline-ready', 'Push-ready'],
    stats: [
      { id: 'touch', value: 'Touch', label: 'Thumb-first UX' },
      { id: 'perf', value: 'Fast', label: 'Perf budgets' },
      { id: 'brand', value: 'Brand', label: 'On-device polish' },
      { id: 'api', value: 'API', label: 'Synced backends' },
    ],
    capabilities: caps([
      'Native feel',
      'Gestures, spacing, and motion that fit phones.',
      'Core journeys',
      'Book, buy, track — without friction.',
      'Backend sync',
      'APIs and auth that hold up in production.',
    ]),
  },
  portfolio: {
    eyebrow: 'Work · Portfolio',
    eyebrowIcon: 'layout-grid',
    titleBefore: 'Browse the',
    titleMark: 'portfolio',
    titleAfter: 'by category and outcome',
    chips: ['Websites', 'Apps', 'AI', 'Ecommerce', 'Healthcare'],
    stats: DEFAULT_STATS,
    capabilities: caps([
      'By category',
      'Websites, apps, AI, and platforms.',
      'Live demos',
      'Click through interactive showcases.',
      'Outcome focus',
      'See the business problem each build solves.',
    ]),
  },
  'case-studies': {
    eyebrow: 'Work · Case Studies',
    eyebrowIcon: 'star',
    titleBefore: 'Deep-dive',
    titleMark: 'stories',
    titleAfter: 'of delivery and impact',
    chips: ['Challenge', 'Approach', 'Results', 'Metrics'],
    stats: [
      { id: 'depth', value: 'Depth', label: 'Full narratives' },
      { id: 'metric', value: 'Metrics', label: 'Measured impact' },
      { id: 'ind', value: 'Industry', label: 'Context-rich' },
      { id: 'proof', value: 'Proof', label: 'Shipped evidence' },
    ],
    capabilities: caps([
      'Problem framing',
      'What was broken before we started.',
      'Approach',
      'How we scoped and shipped.',
      'Results',
      'Outcomes teams can verify.',
    ]),
  },
  'success-stories': {
    eyebrow: 'Work · Success Stories',
    eyebrowIcon: 'star',
    titleBefore: 'Client',
    titleMark: 'success',
    titleAfter: 'written in outcomes',
    chips: ['Partnerships', 'Outcomes', 'Retention', 'Growth'],
    stats: [
      { id: 'partner', value: 'Long-term', label: 'Partnerships' },
      { id: 'out', value: 'Outcomes', label: 'Business impact' },
      { id: 'trust', value: 'Trust', label: 'Repeat work' },
      { id: 'ship', value: 'Shipped', label: 'Production systems' },
    ],
    capabilities: caps([
      'Partnership arcs',
      'From first pilot to ongoing delivery.',
      'Business impact',
      'Leads, ops time, and conversion lifts.',
      'Proof points',
      'Stories backed by live product.',
    ]),
  },
  testimonials: {
    eyebrow: 'Work · Testimonials',
    eyebrowIcon: 'quote',
    titleBefore: 'What teams',
    titleMark: 'say',
    titleAfter: 'about working with us',
    chips: ['Founders', 'Operators', 'Product leads', 'Approved only'],
    stats: [
      { id: 'real', value: 'Real', label: 'Approved quotes' },
      { id: 'ind', value: 'Multi', label: 'Industries' },
      { id: 'role', value: 'Roles', label: 'Buyers & builders' },
      { id: 'link', value: 'Linked', label: 'To projects' },
    ],
    capabilities: caps([
      'Approved voice',
      'We only publish quotes clients approve.',
      'Context',
      'Role, industry, and related project.',
      'Credibility',
      'Pair feedback with live demos.',
    ]),
  },
  outcomes: {
    eyebrow: 'Work · Outcomes',
    eyebrowIcon: 'trending-up',
    titleBefore: 'Business',
    titleMark: 'outcomes',
    titleAfter: 'you can measure',
    chips: ['Leads', 'Ops time', 'Conversion', 'Time-to-launch'],
    stats: [
      { id: 'kpi', value: 'KPIs', label: 'Tracked goals' },
      { id: 'speed', value: 'TTM', label: 'Faster launches' },
      { id: 'ops', value: 'Ops', label: 'Less busywork' },
      { id: 'grow', value: 'Growth', label: 'Enquiry lift' },
    ],
    capabilities: caps([
      'Metric-first',
      'Every engagement starts with measurable goals.',
      'Ops leverage',
      'Cut repeat work without brittle scripts.',
      'Growth loops',
      'Sites and apps that keep converting.',
    ]),
  },
};

const FALLBACK_HERO: WorkHubHeroConfig = {
  eyebrow: 'Work hub',
  eyebrowIcon: 'layout-grid',
  titleBefore: 'Selected',
  titleMark: 'work',
  titleAfter: 'in this collection',
  chips: ['Portfolio', 'Demos', 'Outcomes'],
  stats: DEFAULT_STATS,
  capabilities: caps([
    'Curated work',
    'Projects matched to this collection.',
    'Live demos',
    'Interactive showcases where available.',
    'Clear next step',
    'Book a consultation when you are ready.',
  ]),
};

export function getWorkHubHeroConfig(slug: string, title?: string): WorkHubHeroConfig {
  const configured = WORK_HUB_HEROES[slug];
  if (configured) return configured;

  if (title) {
    return {
      ...FALLBACK_HERO,
      eyebrow: `Work · ${title}`,
      titleBefore: '',
      titleMark: title,
      titleAfter: '',
    };
  }

  return FALLBACK_HERO;
}
