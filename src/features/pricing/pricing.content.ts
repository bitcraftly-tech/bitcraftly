import type { IconName } from '@/components/ui/icon';
import { ROUTES } from '@/constants/navigation';

export const PRICING_HERO = {
  eyebrow: 'AI-Powered Pricing',
  titleBefore: 'Transparent estimates. No surprises.',
  titleHighlight: 'Just clarity.',
  description:
    'Describe your project and get an instant cost range — or pick a package with clear deliverables, milestone billing, and a written proposal.',
  primaryCta: { label: 'Get My Estimate', href: '#pricing-estimator' },
  secondaryCta: {
    label: 'Book Discovery Call',
    href: `${ROUTES.contact}?intent=discovery&source=pricing-hero`,
  },
  trustItems: [
    'No Hidden Charges',
    'Milestone Payments',
    'Source Code Ownership',
  ] as const,
} as const;

export const PRICING_ESTIMATOR = {
  title: 'AI Project Estimator',
  liveLabel: 'Live',
  welcome:
    'Tell me what you want to build. I’ll map an indicative package, timeline, tech stack, and cost range — free, no commitment.',
  suggestions: [
    'Business website with lead forms',
    'Booking system + WhatsApp',
    'AI chatbot for support',
  ] as const,
  placeholder: 'Describe your project in a sentence or two…',
  enhanceLabel: 'Enhance brief',
  generateLabel: 'Get My Estimate',
  reviseLabel: 'Update Estimate',
  badges: ['Free', '2 Min', 'No commitment'] as const,
  loadingSteps: [
    'Understanding your brief…',
    'Detecting project type…',
    'Matching package & budget…',
    'Selecting stack & add-ons…',
    'Drafting proposal preview…',
  ] as const,
  clarifyPrompt: 'Got it. To sharpen the estimate, which best matches what you need?',
  clarifyOptions: [
    'Starter brochure site',
    'Business website',
    'Professional / custom site',
    'Web app or booking system',
  ] as const,
  followUpPrompt: 'Want to refine this? Ask for a cheaper band, AI features, or a faster timeline.',
  followUpSuggestions: [
    'Make it more affordable',
    'Add AI chatbot',
    'Need it faster',
  ] as const,
  resultEyebrow: 'Indicative estimate',
  projectTypeLabel: 'Detected type',
  packageLabel: 'Recommended package',
  timelineLabel: 'Timeline',
  stackLabel: 'Suggested stack',
  addOnsLabel: 'Recommended add-ons',
  rangeLabel: 'Budget estimate',
  proposalLabel: 'Proposal preview',
  milestonesLabel: 'Suggested milestones',
  deliverablesLabel: 'Key deliverables',
  resultNote: 'Indicative only · final quote after discovery · no hidden charges',
  bookLabel: 'Book Discovery Call',
  secondaryCtaLabel: 'Browse packages',
  secondaryCtaHref: '#pricing-packages',
  trustItems: [
    'No Hidden Charges',
    'Milestone Payments',
    'NDA Available',
  ] as const,
} as const;

export type PricingPackageTabId = 'websites' | 'web-apps' | 'ai';

export interface PricingPackage {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly priceLabel: string;
  readonly priceSuffix: string;
  readonly popular?: boolean;
  readonly features: readonly string[];
  readonly ctaLabel: string;
  readonly ctaHref: string;
}

export const PRICING_PACKAGE_TABS: readonly {
  readonly id: PricingPackageTabId;
  readonly label: string;
}[] = [
  { id: 'websites', label: 'Websites' },
  { id: 'web-apps', label: 'Web Applications' },
  { id: 'ai', label: 'AI Solutions' },
] as const;

/** Fixed display packages — do not invent new price points beyond these bands. */
export const PRICING_PACKAGES: Record<PricingPackageTabId, readonly PricingPackage[]> = {
  websites: [
    {
      id: 'starter-website',
      name: 'Starter Website',
      description: 'Perfect for:',
      priceLabel: '₹15,000',
      priceSuffix: 'Starting From',
      features: [
        'Up to 5 Pages',
        'Responsive Design',
        'Contact Form',
        'WhatsApp Integration',
        'Basic SEO',
        '7 Days Support',
      ],
      ctaLabel: 'Start My Project',
      ctaHref: `${ROUTES.contact}?intent=quote&package=starter-website&source=pricing-packages`,
    },
    {
      id: 'business-website',
      name: 'Business Website',
      description: 'Perfect for:',
      priceLabel: '₹35,000',
      priceSuffix: 'Starting From',
      popular: true,
      features: [
        'Up to 10 Pages',
        'Premium UI Design',
        'Lead Forms',
        'Blog Ready',
        'Basic CMS',
        'Speed Optimization',
        '30 Days Support',
      ],
      ctaLabel: 'Start My Project',
      ctaHref: `${ROUTES.contact}?intent=quote&package=business-website&source=pricing-packages`,
    },
    {
      id: 'professional-website',
      name: 'Professional Website',
      description: 'Perfect for:',
      priceLabel: '₹60,000',
      priceSuffix: 'Starting From',
      features: [
        'Up to 20 Pages',
        'Custom UI/UX',
        'CMS + Blog',
        'Payment Gateway (Razorpay)',
        'Cart + Checkout',
        'Analytics',
        'Performance Optimization',
        '60 Days Support',
      ],
      ctaLabel: 'Request Proposal',
      ctaHref: `${ROUTES.contact}?intent=quote&package=professional-website&source=pricing-packages`,
    },
  ],
  'web-apps': [
    {
      id: 'starter-app',
      name: 'Starter Web App',
      description: 'Authenticated MVP with core workflows and clean admin surfaces.',
      priceLabel: '₹89,999',
      priceSuffix: 'Starting From',
      features: [
        'Auth + protected routes',
        'Core dashboard',
        'API integrations (1–2)',
        'Role basics',
        'Staging deploy',
      ],
      ctaLabel: 'Start My Project',
      ctaHref: `${ROUTES.contact}?intent=quote&package=starter-app&source=pricing-packages`,
    },
    {
      id: 'business-app',
      name: 'Business Platform',
      description: 'Operator-ready product workflows with richer data and permissions.',
      priceLabel: '₹1,49,999',
      priceSuffix: 'Starting From',
      popular: true,
      features: [
        'Multi-role access',
        'Admin console',
        'Payments-ready UX',
        'Audit-friendly flows',
        'Phased milestones',
      ],
      ctaLabel: 'Start My Project',
      ctaHref: `${ROUTES.contact}?intent=quote&package=business-app&source=pricing-packages`,
    },
    {
      id: 'enterprise-app',
      name: 'Custom Product Build',
      description: 'Scoped product engineering for complex systems and AI workflows.',
      priceLabel: 'Custom',
      priceSuffix: 'Scoped quote',
      features: [
        'Discovery workshop',
        'Architecture blueprint',
        'Custom integrations',
        'SLA-oriented delivery',
        'Dedicated pod',
      ],
      ctaLabel: 'Book Discovery Call',
      ctaHref: `${ROUTES.contact}?intent=discovery&package=enterprise-app&source=pricing-packages`,
    },
  ],
  ai: [
    {
      id: 'ai-chatbot',
      name: 'AI Chatbot',
      description: 'Guided assistant for sales, support, or internal knowledge.',
      priceLabel: '₹35,000',
      priceSuffix: 'Starting From',
      features: [
        'Custom knowledge base',
        'Website embed',
        'Handoff to WhatsApp / email',
        'Basic analytics',
      ],
      ctaLabel: 'Start My Project',
      ctaHref: `${ROUTES.contact}?intent=quote&package=ai-chatbot&source=pricing-packages`,
    },
    {
      id: 'ai-automation',
      name: 'AI Automation Pack',
      description: 'Automate repetitive ops with AI + workflow connectors.',
      priceLabel: '₹75,000',
      priceSuffix: 'Starting From',
      popular: true,
      features: [
        'Process mapping',
        '2–3 automated workflows',
        'Tool integrations',
        'Human-in-the-loop controls',
      ],
      ctaLabel: 'Start My Project',
      ctaHref: `${ROUTES.contact}?intent=quote&package=ai-automation&source=pricing-packages`,
    },
    {
      id: 'custom-ai',
      name: 'Custom AI System',
      description: 'Productized AI features inside your Industry System.',
      priceLabel: 'Custom',
      priceSuffix: 'Scoped quote',
      features: [
        'Use-case discovery',
        'Model + UX design',
        'Secure data handling',
        'Eval + iteration plan',
      ],
      ctaLabel: 'Book Discovery Call',
      ctaHref: `${ROUTES.contact}?intent=discovery&package=custom-ai&source=pricing-packages`,
    },
  ],
};

export const PRICING_PACKAGES_META = {
  eyebrow: 'Packages',
  title: 'Choose the right package for your needs.',
  description: 'Clear deliverables, fixed starting bands, and room to grow with add-ons.',
  decisionCue: 'Most teams start with Business Website — best balance of scope, speed, and budget.',
  footnote:
    '*Prices shown are starting estimates (ex-GST). Final quotation depends on scope, features, integrations, and timeline — no hidden platform fees.',
  compareLabel: 'Book Discovery Call',
  compareHref: `${ROUTES.contact}?intent=discovery&source=pricing-packages-compare`,
  trustItems: [
    'No Hidden Charges',
    'Milestone Payments',
    'Dedicated Project Manager',
    'Source Code Ownership',
  ] as const,
} as const;

export const PRICING_ADDONS: readonly {
  readonly id: string;
  readonly label: string;
  readonly priceLabel: string;
  readonly icon: IconName;
}[] = [
  { id: 'extra-page', label: 'Extra Page', priceLabel: '₹2,000', icon: 'layout-grid' },
  { id: 'blog-cms', label: 'Blog / CMS', priceLabel: '₹9,000', icon: 'message' },
  { id: 'auth', label: 'Authentication', priceLabel: '₹10,000', icon: 'shield' },
  { id: 'booking', label: 'Booking System', priceLabel: '₹15,000', icon: 'calendar' },
  { id: 'seo', label: 'Technical SEO', priceLabel: '₹8,000', icon: 'search' },
  { id: 'payments', label: 'Payment Gateway (Razorpay)', priceLabel: '₹22,000', icon: 'zap' },
  { id: 'ai-chat', label: 'AI Chatbot', priceLabel: '₹35,000', icon: 'sparkles' },
  { id: 'maintenance', label: 'Annual Maintenance', priceLabel: '₹12,000/year', icon: 'headset' },
] as const;

export const PRICING_ADDONS_META = {
  eyebrow: 'Extensions',
  title: 'Popular add-ons',
  description: 'Extend any package without rebuilding from scratch.',
  consultTitle: 'Not sure what you need?',
  consultBody:
    'Book a free discovery call — we’ll map scope, timeline, and the right package band before you commit.',
  consultCta: {
    label: 'Book Discovery Call',
    href: `${ROUTES.contact}?intent=discovery&source=pricing-addons`,
  },
  consultPoints: [
    'Clear package recommendation',
    'Milestone plan in writing',
    'No obligation to proceed',
  ] as const,
} as const;

export const PRICING_PROCESS: readonly {
  readonly step: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}[] = [
  {
    step: '01',
    title: 'Discover',
    description: 'Goals, constraints, and success metrics.',
    icon: 'search',
  },
  {
    step: '02',
    title: 'Plan',
    description: 'Scope, milestones, and written estimate.',
    icon: 'calendar',
  },
  {
    step: '03',
    title: 'Design',
    description: 'UX structure aligned to conversion.',
    icon: 'layout-grid',
  },
  {
    step: '04',
    title: 'Develop',
    description: 'Production-grade build with reviews.',
    icon: 'code',
  },
  {
    step: '05',
    title: 'Test',
    description: 'QA, performance, and accessibility.',
    icon: 'check',
  },
  {
    step: '06',
    title: 'Launch & Support',
    description: 'Deploy, handoff, and optional care.',
    icon: 'rocket',
  },
] as const;

export const PRICING_PROCESS_META = {
  eyebrow: 'Delivery',
  title: 'From idea to launch in 6 simple steps.',
  description:
    'A calm delivery rhythm with milestone payments — clarity and approval at every phase.',
} as const;

export const PRICING_WHY: readonly {
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}[] = [
  {
    title: 'AI-Powered Delivery',
    description: 'Faster scoping and sharper estimates without cutting engineering quality.',
    icon: 'sparkles',
  },
  {
    title: 'Expert Team',
    description: 'Product engineers who ship Industry Systems, not slideware.',
    icon: 'star',
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden charges — written proposals before payment.',
    icon: 'zap',
  },
  {
    title: 'Milestone Billing',
    description: 'Pay for progress. Every phase is scoped and reviewable.',
    icon: 'calendar',
  },
  {
    title: 'Secure by Default',
    description: 'NDA available. Practical security and privacy baked into delivery.',
    icon: 'shield',
  },
  {
    title: 'Post Launch Support',
    description: 'Source code ownership plus optional care after go-live.',
    icon: 'check',
  },
] as const;

export const PRICING_WHY_META = {
  eyebrow: 'Why Bitcraftly',
  title: 'Why businesses trust us.',
  description: 'Premium product engineering with calm process and clear commercials.',
} as const;

export const PRICING_FAQ: readonly {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}[] = [
  {
    id: 'ownership',
    question: 'Do I own the source code?',
    answer:
      'Yes. You own the project source code on handover, as defined in your written proposal. We transfer repositories and deployment access at launch.',
  },
  {
    id: 'milestones',
    question: 'Can I pay in milestones?',
    answer:
      'Yes. We split delivery into clear phases. You approve each milestone before the next payment — no surprise invoices.',
  },
  {
    id: 'timeline',
    question: 'How long does development take?',
    answer:
      'Starter sites typically take 1–2 weeks, business sites 2–4 weeks, and professional or custom builds 4–12 weeks depending on scope, integrations, and feedback cycles.',
  },
  {
    id: 'features',
    question: 'Can features be added later?',
    answer:
      'Absolutely. We design for growth. New features can be scoped as add-ons or follow-on phases with a revised estimate before work begins.',
  },
  {
    id: 'nda',
    question: 'Will you sign an NDA?',
    answer:
      'Yes. We can sign a mutual NDA before discovery when your project requires confidentiality.',
  },
  {
    id: 'after-launch',
    question: 'What happens after launch?',
    answer:
      'You receive documentation, basic training, a warranty window, and optional post-launch support or Annual Maintenance for ongoing care.',
  },
] as const;

export const PRICING_FAQ_META = {
  eyebrow: 'FAQ',
  title: 'Frequently asked questions',
  viewAllLabel: 'View all FAQs',
  viewAllHref: ROUTES.resourcesFaq,
} as const;

export const PRICING_CLIENT_TRUST: readonly {
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}[] = [
  {
    title: 'Transparent Pricing',
    description: 'Clear starting bands and written proposals — no hidden platform fees.',
    icon: 'zap',
  },
  {
    title: 'Source Code Ownership',
    description: 'You own the code on handover, with clean repository transfer.',
    icon: 'code',
  },
  {
    title: 'Milestone Based Payments',
    description: 'Pay for approved progress. Every phase is scoped and reviewable.',
    icon: 'calendar',
  },
  {
    title: 'NDA Available',
    description: 'Mutual confidentiality when your project requires it.',
    icon: 'shield',
  },
  {
    title: 'Dedicated Project Manager',
    description: 'One accountable owner for scope, timeline, and communication.',
    icon: 'headset',
  },
  {
    title: 'Free Discovery Call',
    description: 'A no-obligation consult to map the right package before you commit.',
    icon: 'phone',
  },
  {
    title: 'Post Launch Support',
    description: 'Warranty window plus optional care after go-live.',
    icon: 'rocket',
  },
  {
    title: 'AI-first Development',
    description: 'Faster scoping and sharper delivery without cutting engineering quality.',
    icon: 'sparkles',
  },
] as const;

export const PRICING_CLIENT_TRUST_META = {
  eyebrow: 'Trust',
  title: 'Why clients choose Bitcraftly',
  description: 'Enterprise-grade clarity from first conversation to post-launch support.',
} as const;

export const PRICING_INCLUDED: readonly string[] = [
  'Discovery Workshop',
  'UI/UX Design',
  'Development',
  'Testing',
  'Deployment',
  'Documentation',
  'Source Code',
  'Basic Training',
  'Warranty',
] as const;

export const PRICING_INCLUDED_META = {
  eyebrow: 'Delivery standard',
  title: "What's included",
  description: 'Every project includes the essentials needed to launch with confidence.',
} as const;

export const PRICING_TRUST_TIMELINE: readonly {
  readonly title: string;
  readonly description: string;
}[] = [
  { title: 'Discovery', description: 'Goals, constraints, and success metrics.' },
  { title: 'Design', description: 'UX structure and visual direction.' },
  { title: 'Development', description: 'Production-grade build with reviews.' },
  { title: 'Testing', description: 'QA, performance, and accessibility.' },
  { title: 'Launch', description: 'Deploy, handoff, and go-live support.' },
  { title: 'Support', description: 'Warranty window and optional ongoing care.' },
] as const;

export const PRICING_TRUST_TIMELINE_META = {
  eyebrow: 'Timeline',
  title: 'Project timeline',
  description: 'A clear path from discovery to support — with milestone checkpoints.',
} as const;

export const PRICING_TRUST_BANNER = {
  title: 'Still have questions?',
  description:
    'Book a FREE 30-minute consultation with our solution architect — no obligation, just clarity.',
  cta: {
    label: 'Book Free Consultation',
    href: `${ROUTES.contact}?intent=discovery&source=pricing-trust-banner`,
  },
} as const;

export const PRICING_FINAL_CTA = {
  eyebrow: 'Next step',
  title: 'Ready to build with clarity?',
  description:
    'Get your AI estimate in minutes, or book a discovery call — we’ll help you choose the right package before you commit.',
  primaryCta: { label: 'Get My Estimate', href: '#pricing-estimator' },
  secondaryCta: {
    label: 'Book Discovery Call',
    href: `${ROUTES.contact}?intent=discovery&source=pricing-final`,
  },
  trustItems: [
    'No Hidden Charges',
    'Milestone Payments',
    'Source Code Ownership',
    'NDA Available',
  ] as const,
} as const;
