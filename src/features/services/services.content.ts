import {
  ALL_SERVICES,
  getServiceBySlug,
  getServiceHref,
  SERVICE_GROUPS,
} from '@/constants/services';
import type {
  RelatedLink,
  ServiceCardModel,
  ServiceFaqItem,
  ServiceGroupIntro,
  ServiceGroupRelatedLinks,
  ServiceHubCard,
  ServicePageContent,
} from './services.types';

const DEFAULT_PROCESS = [
  {
    title: 'Discovery',
    description: 'Goals, audience, constraints, and success metrics — written before build starts.',
  },
  {
    title: 'Solution design',
    description: 'Scope, architecture, timeline, and a clear estimate in plain language.',
  },
  {
    title: 'Build & iterate',
    description: 'Founder-led delivery with reviews on real progress — not slide decks.',
  },
  {
    title: 'Launch & support',
    description: 'Go-live checklist, handoff, and optional ongoing care.',
  },
] as const;

type ServiceContentOverride = Partial<
  Omit<ServicePageContent, 'slug' | 'label' | 'icon' | 'groupId' | 'groupTitle' | 'summary'>
> & {
  relatedServiceSlugs: readonly string[];
};

const CONTENT_OVERRIDES: Record<string, ServiceContentOverride> = {
  'ai-solutions': {
    metaDescription:
      'Bitcraftly AI solutions — assistants, automation, and LLM products built for measurable business outcomes.',
    eyebrow: 'AI & Automation',
    headline: 'AI Solutions that drive real outcomes',
    intro:
      'We design and ship AI products that shorten the path to a lead, reduce ops work, and stay human-backed where it matters — WhatsApp handoff included.',
    highlights: [
      'AI assistants tuned to your business language',
      'Automation workflows with clear human escalation',
      'LLM integration with OpenAI, Gemini, and custom models',
      'Secure data handling and practical guardrails',
      'Dashboards to measure adoption and ROI',
    ],
    outcomes: [
      'Faster lead response without growing headcount',
      'Fewer repetitive support tickets',
      'Clear audit trail for AI-assisted decisions',
    ],
    relatedServiceSlugs: [
      'ai-chatbots',
      'ai-automation',
      'llm-integration',
      'web-application-development',
    ],
    keywords: ['AI solutions India', 'LLM products', 'AI engineering agency'],
    faqs: [
      {
        id: 'ai-fit',
        question: 'Do we need AI on every project?',
        answer:
          'No. We recommend AI only when it shortens time-to-lead, reduces repetitive work, or improves decision quality. Otherwise WhatsApp + solid UX is often enough.',
      },
      {
        id: 'ai-data',
        question: 'Can you work with our existing tools?',
        answer:
          'Yes — CRM, WhatsApp, docs, and internal APIs. We integrate carefully so AI becomes part of your workflow, not a disconnected demo.',
      },
    ],
  },
  'ai-chatbots': {
    metaDescription:
      'AI chatbots for support and sales — menu answers, lead qualification, and WhatsApp handoff by Bitcraftly.',
    eyebrow: 'AI & Automation',
    headline: 'AI Chatbots that convert conversations',
    intro:
      'Conversational assistants for websites and WhatsApp that answer FAQs, qualify leads, and escalate to a real person when needed.',
    highlights: [
      'Website and WhatsApp chatbot experiences',
      'Lead qualification with clear next steps',
      'Human handoff for high-intent enquiries',
      'Menu, FAQ, and product knowledge grounding',
      'Analytics on intents and conversion paths',
    ],
    outcomes: [
      '24/7 first response without losing the human touch',
      'Higher-quality sales handoffs',
      'Fewer repeated FAQ tickets',
    ],
    relatedServiceSlugs: ['ai-solutions', 'ai-automation', 'website-development'],
    keywords: ['AI chatbot', 'WhatsApp chatbot', 'conversational AI'],
    faqs: [
      {
        id: 'bot-vs-whatsapp',
        question: 'Chatbot or WhatsApp only?',
        answer:
          'Many local businesses start with WhatsApp. We add a site chatbot when FAQs or menu discovery justify it — always with human escalation.',
      },
    ],
  },
  'ai-automation': {
    metaDescription:
      'AI automation for repetitive workflows — Bitcraftly builds practical automations with human oversight.',
    eyebrow: 'AI & Automation',
    headline: 'AI Automation for everyday operations',
    intro:
      'Automate repetitive workflows across leads, documents, and internal tools — with monitoring and human review where risk is high.',
    highlights: [
      'Workflow automation across CRM and ops tools',
      'Document classification and extraction',
      'Trigger → process → notify pipelines',
      'Error handling and retry strategies',
      'Dashboards for throughput and failures',
    ],
    outcomes: [
      'Hours saved on repetitive admin work',
      'Fewer manual handoffs between tools',
      'Consistent process quality',
    ],
    relatedServiceSlugs: ['ai-solutions', 'ai-agents', 'api-integration'],
    keywords: ['AI automation', 'workflow automation', 'ops AI'],
  },
  'ai-agents': {
    metaDescription:
      'AI agents for complex operations — Bitcraftly designs agent workflows with clear guardrails.',
    eyebrow: 'AI & Automation',
    headline: 'AI Agents for multi-step work',
    intro:
      'Autonomous agents that plan and execute multi-step tasks — researched, constrained, and supervised for production use.',
    highlights: [
      'Tool-using agents with scoped permissions',
      'Multi-step planning with checkpoints',
      'Integration with APIs and internal systems',
      'Audit logs for agent actions',
      'Human approval gates for sensitive steps',
    ],
    outcomes: [
      'Complex tasks completed with less supervision',
      'Repeatable agent playbooks for your team',
      'Safer automation with clear limits',
    ],
    relatedServiceSlugs: ['ai-automation', 'llm-integration', 'ai-solutions'],
    keywords: ['AI agents', 'autonomous agents', 'agentic workflows'],
  },
  'llm-integration': {
    metaDescription:
      'LLM integration with OpenAI, Gemini, and custom models — production wiring by Bitcraftly.',
    eyebrow: 'AI & Automation',
    headline: 'LLM Integration done for production',
    intro:
      'Wire large language models into your product safely — prompts, retrieval, rate limits, evaluation, and cost controls included.',
    highlights: [
      'OpenAI, Gemini, and custom model wiring',
      'RAG patterns for private knowledge',
      'Prompt and evaluation workflows',
      'Cost, latency, and rate-limit controls',
      'Secure key management and logging',
    ],
    outcomes: [
      'Reliable model calls in production',
      'Lower surprise spend on tokens',
      'Better answer quality over time',
    ],
    relatedServiceSlugs: ['ai-solutions', 'document-ai', 'web-application-development'],
    keywords: ['LLM integration', 'OpenAI integration', 'RAG'],
  },
  'document-ai': {
    metaDescription: 'Document AI — extract, classify, and process documents with Bitcraftly.',
    eyebrow: 'AI & Automation',
    headline: 'Document AI that reduces manual review',
    intro:
      'Extract, classify, and route documents so your team spends time on decisions — not copy-paste.',
    highlights: [
      'OCR and structured extraction pipelines',
      'Classification for invoices, forms, and contracts',
      'Human review queues for low-confidence results',
      'Export to CRM, ERP, or data stores',
      'Accuracy monitoring over time',
    ],
    outcomes: [
      'Faster document turnaround',
      'Fewer data-entry errors',
      'Searchable document archives',
    ],
    relatedServiceSlugs: ['ai-automation', 'llm-integration', 'custom-software-development'],
    keywords: ['Document AI', 'OCR', 'document extraction'],
  },
  'website-development': {
    metaDescription:
      'High-performance website development with Next.js — SEO-friendly sites that convert, by Bitcraftly.',
    eyebrow: 'Development',
    headline: 'Websites built to convert',
    intro:
      'Marketing and product websites that load fast, rank cleanly, and turn visitors into WhatsApp enquiries and booked calls.',
    highlights: [
      'Next.js / React builds for speed and SEO',
      'Mobile-first layouts that convert',
      'Clear CTAs and enquiry paths',
      'Technical SEO foundations',
      'Analytics and conversion tracking',
    ],
    outcomes: [
      'Faster pages and stronger Core Web Vitals',
      'More qualified enquiries',
      'Code your next developer can extend',
    ],
    relatedServiceSlugs: [
      'technical-seo',
      'performance-optimization',
      'ui-ux-design',
      'website-maintenance',
    ],
    keywords: ['website development India', 'Next.js agency', 'business website'],
    faqs: [
      {
        id: 'timeline',
        question: 'How fast can a site launch?',
        answer:
          'Fast-launch packs can ship in days when content is ready. Custom builds get a written timeline after discovery — no surprise mid-project invoices.',
      },
    ],
  },
  'web-application-development': {
    metaDescription:
      'Web application development — SaaS, dashboards, and portals engineered by Bitcraftly.',
    eyebrow: 'Development',
    headline: 'Web apps engineered for scale',
    intro:
      'SaaS platforms, dashboards, and portals built with typed React/Next.js stacks — ready for real users, not just demos.',
    highlights: [
      'SaaS and multi-tenant product shells',
      'Role-based dashboards and workflows',
      'Auth, billing-ready UI, and API layers',
      'Performance budgets and observability',
      'Maintainable component architecture',
    ],
    outcomes: [
      'Investor-ready product walkthroughs',
      'Stable releases with fewer regressions',
      'A codebase your team can own',
    ],
    relatedServiceSlugs: ['api-integration', 'cloud-devops', 'analytics-dashboard', 'ui-ux-design'],
    keywords: ['web app development', 'SaaS development', 'dashboard development'],
  },
  'mobile-app-development': {
    metaDescription:
      'Mobile app development for Android and iOS — polished product UX by Bitcraftly.',
    eyebrow: 'Development',
    headline: 'Mobile apps with product-grade UX',
    intro:
      'Native and cross-platform apps with clear flows, reliable APIs, and release discipline — from MVP to growth.',
    highlights: [
      'Cross-platform or native strategies',
      'Polished onboarding and core journeys',
      'API integration and offline-friendly patterns',
      'Store-ready builds and release checklists',
      'Analytics for retention and activation',
    ],
    outcomes: [
      'Ship an MVP without throwing away the foundation',
      'Consistent UX across devices',
      'Clear path from prototype to production',
    ],
    relatedServiceSlugs: ['ui-ux-design', 'api-integration', 'web-application-development'],
    keywords: ['mobile app development', 'React Native', 'iOS Android apps'],
  },
  'custom-software-development': {
    metaDescription: 'Custom software — ERP, CRM, CMS, and internal tools tailored by Bitcraftly.',
    eyebrow: 'Development',
    headline: 'Custom software for how you operate',
    intro:
      'ERP, CRM, CMS, and bespoke tools shaped around your teams — not generic templates that fight your process.',
    highlights: [
      'Discovery workshops with operators and owners',
      'Modular architecture you can grow',
      'Integrations with existing systems',
      'Permissions, audit trails, and reporting',
      'Training and handoff documentation',
    ],
    outcomes: [
      'Less spreadsheet chaos',
      'Faster internal decision cycles',
      'Software that matches real workflows',
    ],
    relatedServiceSlugs: ['web-application-development', 'api-integration', 'analytics-dashboard'],
    keywords: ['custom software', 'ERP CRM CMS', 'internal tools'],
  },
  'cloud-devops': {
    metaDescription:
      'Cloud & DevOps — CI/CD, infrastructure, and reliability for Bitcraftly products.',
    eyebrow: 'Development',
    headline: 'Cloud & DevOps that keep shipping',
    intro:
      'Infrastructure, CI/CD, and monitoring so releases stay boring — in the best way — while products keep moving.',
    highlights: [
      'Cloud architecture for growth stages',
      'CI/CD pipelines with quality gates',
      'Environments, secrets, and access hygiene',
      'Observability and alerting basics',
      'Cost-aware infrastructure choices',
    ],
    outcomes: [
      'Safer, faster releases',
      'Fewer production surprises',
      'Clear ownership of deploy paths',
    ],
    relatedServiceSlugs: [
      'security-monitoring',
      'web-application-development',
      'performance-optimization',
    ],
    keywords: ['DevOps', 'CI/CD', 'cloud architecture'],
  },
  'api-integration': {
    metaDescription:
      'API integration — reliable system wiring and third-party integrations by Bitcraftly.',
    eyebrow: 'Development',
    headline: 'API Integration you can trust',
    intro:
      'Connect CRMs, payments, WhatsApp, and internal systems with resilient APIs — retries, auth, and observability included.',
    highlights: [
      'Third-party and internal API wiring',
      'Auth, webhooks, and rate-limit handling',
      'Idempotent jobs and error recovery',
      'Contract testing where it matters',
      'Documentation for future developers',
    ],
    outcomes: [
      'Fewer broken handoffs between tools',
      'Predictable sync and webhook behavior',
      'Faster onboarding for new integrations',
    ],
    relatedServiceSlugs: [
      'web-application-development',
      'ai-automation',
      'custom-software-development',
    ],
    keywords: ['API integration', 'webhooks', 'system integration'],
  },
  'ui-ux-design': {
    metaDescription:
      'UI/UX design for products and marketing sites — Bitcraftly design systems that convert.',
    eyebrow: 'Digital Growth',
    headline: 'UI/UX that feels premium and clear',
    intro:
      'Product design systems and marketing experiences that reduce friction — strong hierarchy, accessible patterns, conversion-first flows.',
    highlights: [
      'Information architecture and wireflows',
      'High-fidelity UI for web and app',
      'Design systems your engineers can ship',
      'Accessibility and responsive polish',
      'Conversion-focused landing patterns',
    ],
    outcomes: ['Clearer user journeys', 'Faster engineering handoff', 'Stronger brand consistency'],
    relatedServiceSlugs: [
      'website-development',
      'web-application-development',
      'mobile-app-development',
    ],
    keywords: ['UI UX design', 'product design', 'design system'],
  },
  'technical-seo': {
    metaDescription:
      'Technical SEO — crawlability, structure, and search performance by Bitcraftly.',
    eyebrow: 'Digital Growth',
    headline: 'Technical SEO that compounds',
    intro:
      'Crawlability, structure, metadata, and performance foundations so content and campaigns have a solid base.',
    highlights: [
      'Crawl and indexation health checks',
      'Semantic HTML and heading hierarchy',
      'Metadata, OG, and structured data',
      'Internal linking and URL structure',
      'Core Web Vitals alignment with SEO',
    ],
    outcomes: [
      'Cleaner indexing signals',
      'Stronger page experience metrics',
      'Pages that are easier to grow with content',
    ],
    relatedServiceSlugs: ['website-development', 'performance-optimization', 'analytics-dashboard'],
    keywords: ['technical SEO', 'Core Web Vitals SEO', 'structured data'],
  },
  'performance-optimization': {
    metaDescription:
      'Performance optimization — speed, Core Web Vitals, and scale with Bitcraftly.',
    eyebrow: 'Digital Growth',
    headline: 'Performance that users feel',
    intro:
      'Speed, Core Web Vitals, and rendering strategy — so your product feels premium on real devices and networks.',
    highlights: [
      'LCP, INP, and CLS diagnostics',
      'Image, font, and bundle strategy',
      'Caching and edge-friendly patterns',
      'Server/client boundary tuning',
      'Budgets and regression checks',
    ],
    outcomes: [
      'Faster first impressions',
      'Higher conversion on mobile',
      'Fewer performance regressions',
    ],
    relatedServiceSlugs: ['website-development', 'technical-seo', 'cloud-devops'],
    keywords: ['performance optimization', 'Core Web Vitals', 'site speed'],
  },
  'analytics-dashboard': {
    metaDescription:
      'Analytics dashboards — decision-ready product and business analytics by Bitcraftly.',
    eyebrow: 'Digital Growth',
    headline: 'Analytics dashboards for decisions',
    intro:
      'Decision-ready product and business analytics — clear metrics, trustworthy data, and UI founders can present confidently.',
    highlights: [
      'KPI frameworks with stakeholders',
      'Product and revenue dashboards',
      'Event instrumentation guidance',
      'Role-based views and exports',
      'Realtime or scheduled refresh patterns',
    ],
    outcomes: [
      'One source of truth for leadership',
      'Faster weekly operating reviews',
      'Less spreadsheet archaeology',
    ],
    relatedServiceSlugs: [
      'web-application-development',
      'ai-solutions',
      'custom-software-development',
    ],
    keywords: ['analytics dashboard', 'business intelligence UI', 'product analytics'],
  },
  'website-maintenance': {
    metaDescription: 'Website maintenance — updates, reliability, and ongoing care by Bitcraftly.',
    eyebrow: 'Digital Growth',
    headline: 'Website maintenance that protects momentum',
    intro:
      'Ongoing care, dependency updates, and content support so your site stays fast, secure, and conversion-ready after launch.',
    highlights: [
      'Dependency and security updates',
      'Content and landing page changes',
      'Uptime and form monitoring basics',
      'Performance check-ins',
      'Priority support windows',
    ],
    outcomes: [
      'Fewer surprise breakages',
      'Steady improvement after launch',
      'A clear owner for site health',
    ],
    relatedServiceSlugs: ['website-development', 'security-monitoring', 'performance-optimization'],
    keywords: ['website maintenance', 'website support', 'site care plan'],
  },
  'security-monitoring': {
    metaDescription:
      'Security & monitoring — hardening, alerts, and incident readiness by Bitcraftly.',
    eyebrow: 'Digital Growth',
    headline: 'Security & monitoring basics that matter',
    intro:
      'Hardening, monitoring, and incident readiness for web products — practical controls without enterprise theater.',
    highlights: [
      'Auth and secrets hygiene reviews',
      'Dependency vulnerability monitoring',
      'Uptime and error alerting',
      'Backup and recovery checklists',
      'Incident response playbooks',
    ],
    outcomes: [
      'Faster detection of issues',
      'Lower risk from common web threats',
      'Clear steps when something breaks',
    ],
    relatedServiceSlugs: ['cloud-devops', 'website-maintenance', 'web-application-development'],
    keywords: ['web security', 'monitoring', 'incident readiness'],
  },
};

function getGroupForSlug(slug: string): { id: string; title: string } {
  for (const group of SERVICE_GROUPS) {
    if (group.items.some((item) => item.slug === slug)) {
      return { id: group.id, title: group.title };
    }
  }
  return { id: 'services', title: 'Services' };
}

function buildDefaultFaqs(label: string): ServicePageContent['faqs'] {
  return [
    {
      id: 'timeline',
      question: `How long does ${label} usually take?`,
      answer:
        'Timelines depend on scope and content readiness. After a short discovery we share a written estimate and milestone plan — no surprise invoices mid-project.',
    },
    {
      id: 'founder',
      question: 'Who will I work with?',
      answer:
        'Bitcraftly is founder-led. You stay on one senior thread from first message to launch — not a revolving junior handoff.',
    },
  ];
}

export function getServicePageContent(slug: string): ServicePageContent | undefined {
  const nav = getServiceBySlug(slug);
  if (!nav) return undefined;

  const group = getGroupForSlug(slug);
  const override = CONTENT_OVERRIDES[slug];
  const related =
    override?.relatedServiceSlugs ??
    ALL_SERVICES.filter((s) => s.slug !== slug)
      .slice(0, 4)
      .map((s) => s.slug);

  return {
    slug: nav.slug,
    label: nav.label,
    icon: nav.icon,
    groupId: group.id,
    groupTitle: group.title,
    summary: nav.description,
    metaDescription: override?.metaDescription ?? `${nav.label} by Bitcraftly — ${nav.description}`,
    eyebrow: override?.eyebrow ?? group.title,
    headline: override?.headline ?? nav.label,
    intro:
      override?.intro ??
      `${nav.description} Founder-led delivery with clear scope, timelines, and measurable outcomes.`,
    highlights: override?.highlights ?? [
      'Clear written scope before kickoff',
      'Founder-led engineering and reviews',
      'Mobile-first, accessible UI patterns',
      'Internal links and SEO-ready structure',
      'Handoff documentation your team can own',
    ],
    outcomes: override?.outcomes ?? [
      'A production-ready deliverable',
      'Transparent progress and communication',
      'A path to iterate after launch',
    ],
    process: override?.process ?? DEFAULT_PROCESS,
    faqs: override?.faqs ?? buildDefaultFaqs(nav.label),
    relatedServiceSlugs: related,
    keywords: override?.keywords ?? [nav.label, 'Bitcraftly', group.title],
    ctaPrimaryLabel: override?.ctaPrimaryLabel ?? 'Book Free Consultation',
    ctaSecondaryLabel: override?.ctaSecondaryLabel ?? 'View All Services',
  };
}

const SERVICE_CARD_BADGES: Partial<Record<string, ServiceCardModel['badge']>> = {
  'ai-solutions': 'Popular',
  'ai-chatbots': 'Recommended',
  'ai-automation': 'Popular',
  'ai-agents': 'New',
  'llm-integration': 'Popular',
  'document-ai': 'Recommended',
  'website-development': 'Popular',
  'web-application-development': 'Recommended',
  'mobile-app-development': 'Recommended',
  'custom-software-development': 'Enterprise',
  'cloud-devops': 'Enterprise',
  'api-integration': 'Recommended',
  'ui-ux-design': 'Popular',
  'technical-seo': 'Recommended',
  'performance-optimization': 'Recommended',
  'analytics-dashboard': 'Popular',
  'website-maintenance': 'Recommended',
  'security-monitoring': 'Enterprise',
};

const SERVICE_CARD_BEST_FOR: Record<string, string> = {
  'ai-solutions': 'Teams embedding AI into products & ops',
  'ai-chatbots': 'Support and sales conversation volume',
  'ai-automation': 'Repetitive workflows with clear rules',
  'ai-agents': 'Multi-step ops that need autonomy',
  'llm-integration': 'Products that need model wiring',
  'document-ai': 'High document / intake volume',
  'website-development': 'Marketing sites that must convert',
  'web-application-development': 'Portals, dashboards, SaaS UIs',
  'mobile-app-development': 'iOS / Android customer apps',
  'custom-software-development': 'Unique internal or product systems',
  'cloud-devops': 'Teams shipping with reliability targets',
  'api-integration': 'Connecting CRM, ERP, and tools',
  'ui-ux-design': 'Products needing clearer UX flows',
  'technical-seo': 'Sites that need crawl & index health',
  'performance-optimization': 'Slow sites hurting conversion',
  'analytics-dashboard': 'Leaders who need decision views',
  'website-maintenance': 'Sites needing ongoing care',
  'security-monitoring': 'Apps with compliance / risk needs',
};

const SERVICE_CARD_TIMELINES: Record<string, string> = {
  'ai-solutions': '6–14 weeks',
  'ai-chatbots': '3–8 weeks',
  'ai-automation': '4–10 weeks',
  'ai-agents': '8–16 weeks',
  'llm-integration': '2–6 weeks',
  'document-ai': '4–10 weeks',
  'website-development': '2–6 weeks',
  'web-application-development': '6–16 weeks',
  'mobile-app-development': '8–18 weeks',
  'custom-software-development': '8–20 weeks',
  'cloud-devops': '3–10 weeks',
  'api-integration': '2–8 weeks',
  'ui-ux-design': '2–6 weeks',
  'technical-seo': '2–6 weeks',
  'performance-optimization': '1–4 weeks',
  'analytics-dashboard': '3–8 weeks',
  'website-maintenance': 'Ongoing',
  'security-monitoring': '2–6 weeks + ongoing',
};

const SERVICE_CARD_TAGS: Record<string, readonly string[]> = {
  'ai-solutions': ['AI', 'Automation'],
  'ai-chatbots': ['AI', 'Automation'],
  'ai-automation': ['AI', 'Automation'],
  'ai-agents': ['AI', 'Automation'],
  'llm-integration': ['AI', 'Automation'],
  'document-ai': ['AI', 'Automation'],
  'website-development': ['Web', 'Marketing'],
  'web-application-development': ['Web', 'Cloud', 'SaaS', 'CRM'],
  'mobile-app-development': ['Mobile'],
  'custom-software-development': ['Cloud', 'ERP', 'CRM', 'SaaS'],
  'cloud-devops': ['Cloud'],
  'api-integration': ['Cloud', 'CRM', 'ERP'],
  'ui-ux-design': ['Web', 'Mobile', 'Marketing'],
  'technical-seo': ['Web', 'Marketing'],
  'performance-optimization': ['Web', 'Cloud'],
  'analytics-dashboard': ['Web', 'Cloud', 'CRM'],
  'website-maintenance': ['Web'],
  'security-monitoring': ['Cloud'],
};

export function getServiceCardModels(): readonly ServiceCardModel[] {
  return ALL_SERVICES.map((service) => ({
    slug: service.slug,
    title: service.label,
    description: service.description,
    href: getServiceHref(service.slug),
    icon: service.icon,
    ctaLabel: 'Learn More',
    badge: SERVICE_CARD_BADGES[service.slug] ?? ('Recommended' as const),
    tags: SERVICE_CARD_TAGS[service.slug] ?? [],
    bestFor: SERVICE_CARD_BEST_FOR[service.slug],
    timeline: SERVICE_CARD_TIMELINES[service.slug],
  }));
}

export function getRelatedServices(slug: string, limit = 4): readonly ServiceCardModel[] {
  const content = getServicePageContent(slug);
  const slugs =
    content?.relatedServiceSlugs ??
    ALL_SERVICES.filter((s) => s.slug !== slug)
      .slice(0, limit)
      .map((s) => s.slug);

  return slugs
    .map((relatedSlug) => {
      const service = getServiceBySlug(relatedSlug);
      if (!service) return null;
      const model: ServiceCardModel = {
        slug: service.slug,
        title: service.label,
        description: service.description,
        href: getServiceHref(service.slug),
        icon: service.icon,
        ctaLabel: 'Learn More',
        badge: SERVICE_CARD_BADGES[service.slug] ?? 'Recommended',
        bestFor: SERVICE_CARD_BEST_FOR[service.slug],
        timeline: SERVICE_CARD_TIMELINES[service.slug],
      };
      return model;
    })
    .filter((item): item is ServiceCardModel => item !== null)
    .slice(0, limit);
}

const WORK_LABELS: Record<string, string> = {
  '/work': 'All Work',
  '/work/portfolio': 'Portfolio',
  '/work/featured-projects': 'Featured Projects',
  '/work/case-studies': 'Case Studies',
  '/work/websites': 'Websites',
  '/work/web-applications': 'Web Applications',
  '/work/mobile-apps': 'Mobile Apps',
  '/work/ai-solutions': 'AI Solutions Work',
  '/work/enterprise': 'Enterprise Work',
  '/work/outcomes': 'Outcomes',
};

export function getRelatedWorkLinks(hrefs: readonly string[]): RelatedLink[] {
  return hrefs.map((href) => ({
    href,
    label:
      WORK_LABELS[href] ??
      href
        .split('/')
        .filter(Boolean)
        .slice(-1)[0]
        ?.replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()) ??
      href,
  }));
}

export const SERVICES_LANDING = {
  eyebrow: 'What we build',
  title: 'End-to-End Digital Engineering Services',
  titleHighlight: 'Digital Engineering',
  description:
    'AI systems, websites, apps, custom software, and growth engineering — founder-led delivery with clear scope, measurable outcomes, and production-ready quality.',
  supporting:
    'From discovery to launch, we design systems your team will actually use — with WhatsApp-friendly updates, written estimates, and timelines you can trust.',
  primaryCta: {
    label: 'Book Free Consultation',
    href: '/contact?intent=consultation&source=services',
  },
  secondaryCta: {
    label: 'View Our Work',
    href: '/work',
  },
  tertiaryCta: {
    label: 'Schedule Discovery Call',
    href: '/contact?intent=discovery&source=services',
  },
  trustIndicators: [
    'Founder-led delivery',
    'Clear scope & timelines',
    'Delhi NCR / remote',
  ] as const,
  stats: [
    { value: '20+', label: 'Service lines' },
    { value: '3', label: 'Delivery groups' },
    { value: '24h', label: 'Response target' },
    { value: '100%', label: 'Scoped estimates' },
  ] as const,
  techChips: [
    { id: 'react', label: 'React', icon: 'code' as const },
    { id: 'next', label: 'Next.js', icon: 'globe' as const },
    { id: 'node', label: 'Node.js', icon: 'database' as const },
    { id: 'ai', label: 'AI & LLMs', icon: 'brain' as const },
    { id: 'cloud', label: 'Cloud', icon: 'cloud' as const },
  ],
  filterChips: [
    'AI',
    'Web',
    'Mobile',
    'Cloud',
    'CRM',
    'ERP',
    'Marketing',
    'Automation',
    'SaaS',
  ] as const,
  popularSearches: [
    'AI chatbot',
    'Website',
    'Web app',
    'CRM',
    'ERP',
    'SaaS',
    'Cloud DevOps',
    'SEO',
  ] as const,
  trendingServices: [
    { label: 'AI Solutions', href: '/services/ai-solutions', icon: 'brain' as const },
    {
      label: 'Web Applications',
      href: '/services/web-application-development',
      icon: 'code' as const,
    },
    { label: 'AI Automation', href: '/services/ai-automation', icon: 'zap' as const },
    {
      label: 'Custom Software',
      href: '/services/custom-software-development',
      icon: 'database' as const,
    },
    {
      label: 'Performance',
      href: '/services/performance-optimization',
      icon: 'trending-up' as const,
    },
  ] as const,
  featuredByGroup: [
    {
      groupId: 'ai-automation',
      slug: 'ai-solutions',
      title: 'AI Solutions',
      description:
        'Design and ship production AI systems — assistants, automation, and model integrations grounded in your data and workflows.',
      useCases: [
        'Internal knowledge assistants',
        'Ops and support automation',
        'Product-embedded AI features',
      ],
      techStack: ['OpenAI', 'Gemini', 'Python', 'Next.js', 'Vector DBs'],
      timeline: '6–14 weeks',
      ctaLabel: 'Explore AI Solutions',
      badge: 'Popular' as const,
      icon: 'brain' as const,
    },
    {
      groupId: 'development',
      slug: 'web-application-development',
      title: 'Web Application Development',
      description:
        'Build secure web apps, portals, and dashboards with clean architecture, role-based access, and scalable delivery.',
      useCases: [
        'Customer and partner portals',
        'Internal operations tools',
        'Multi-tenant SaaS products',
      ],
      techStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
      timeline: '6–16 weeks',
      ctaLabel: 'Explore Web Apps',
      badge: 'Recommended' as const,
      icon: 'code' as const,
    },
    {
      groupId: 'digital-growth',
      slug: 'performance-optimization',
      title: 'Performance Optimization',
      description:
        'Improve Core Web Vitals, load times, and conversion paths so your marketing and product sites feel premium and fast.',
      useCases: [
        'Slow marketing websites',
        'Checkout and funnel friction',
        'SEO-impacting performance debt',
      ],
      techStack: ['Next.js', 'CDN', 'Lighthouse', 'Caching', 'Image ops'],
      timeline: '1–4 weeks',
      ctaLabel: 'Explore Performance',
      badge: 'Recommended' as const,
      icon: 'trending-up' as const,
    },
  ],
  comparison: [
    {
      id: 'website',
      title: 'Website',
      bestFor: 'Marketing & conversion sites',
      timeline: '2–6 weeks',
      outcome: 'Fast, SEO-ready presence',
      href: '/services/website-development',
      icon: 'globe' as const,
    },
    {
      id: 'web-app',
      title: 'Web App',
      bestFor: 'Portals, dashboards, tools',
      timeline: '6–16 weeks',
      outcome: 'Secure product workflows',
      href: '/services/web-application-development',
      icon: 'code' as const,
    },
    {
      id: 'crm',
      title: 'CRM',
      bestFor: 'Sales & relationship systems',
      timeline: '6–14 weeks',
      outcome: 'Pipeline visibility & automation',
      href: '/solutions/crm',
      icon: 'message' as const,
    },
    {
      id: 'erp',
      title: 'ERP',
      bestFor: 'Operations across teams',
      timeline: '10–24 weeks',
      outcome: 'Unified business operations',
      href: '/solutions/erp',
      icon: 'workflow' as const,
    },
    {
      id: 'saas',
      title: 'SaaS',
      bestFor: 'Multi-tenant products',
      timeline: '10–20 weeks',
      outcome: 'Scalable product platform',
      href: '/solutions/saas-platforms',
      icon: 'rocket' as const,
    },
    {
      id: 'ai',
      title: 'AI',
      bestFor: 'Automation & assistants',
      timeline: '4–14 weeks',
      outcome: 'Measurable ops leverage',
      href: '/services/ai-solutions',
      icon: 'brain' as const,
    },
  ],
  listingFaqs: [
    {
      id: 'which-service',
      question: 'How do I know which service is right for my project?',
      answer:
        'Start with the outcome: a marketing website, an internal tool, a CRM/ERP system, a SaaS product, or AI automation. Use the comparison section above, or book a free consultation — we’ll recommend a clear scope and timeline.',
    },
    {
      id: 'timeline',
      question: 'What are typical timelines for Bitcraftly services?',
      answer:
        'Websites often ship in 2–6 weeks. Web apps and custom software usually take 6–16+ weeks depending on integrations. AI automation and LLM integrations commonly land in 4–14 weeks. Every engagement includes a written estimate before build.',
    },
    {
      id: 'ai-vs-custom',
      question: 'Do I need AI Solutions or Custom Software Development?',
      answer:
        'Choose AI Solutions when intelligence, assistants, or automation is the core outcome. Choose Custom Software when you need a durable product or operations system — we can still embed AI where it creates leverage.',
    },
    {
      id: 'engagement',
      question: 'How does engagement and pricing work?',
      answer:
        'We scope milestones, deliver a written proposal, and bill by phase. No black-box retainers required to start. You’ll get founder-led communication, WhatsApp-friendly updates, and a response target within 24 hours.',
    },
    {
      id: 'stack',
      question: 'What technology stack do you use?',
      answer:
        'Primarily React, Next.js, Node.js, TypeScript, Python, PostgreSQL, and modern cloud (AWS). For AI we integrate OpenAI, Gemini, and your preferred model providers with production-minded architecture.',
    },
    {
      id: 'ownership',
      question: 'Who owns the code after delivery?',
      answer:
        'You do. We deliver maintainable code, documentation, and handover so your team (or ours) can operate and extend the system after launch.',
    },
  ] satisfies readonly ServiceFaqItem[],
  groupIntros: [
    {
      id: 'ai-automation',
      label: 'AI & Automation',
      title: 'AI & Automation',
      description:
        'Build intelligent AI systems, LLM integrations, automation workflows, AI assistants, and enterprise-ready agents your operations can trust.',
    },
    {
      id: 'development',
      label: 'Development',
      title: 'Development',
      description:
        'Ship websites, web apps, mobile products, custom software, APIs, and cloud platforms with clean architecture and measurable performance.',
    },
    {
      id: 'digital-growth',
      label: 'Digital Growth',
      title: 'Digital Growth',
      description:
        'Improve conversion and reliability with UI/UX, technical SEO, performance, analytics, maintenance, and security monitoring.',
    },
  ] satisfies readonly ServiceGroupIntro[],
  groupRelated: {
    'ai-automation': {
      caseStudies: [
        {
          label: 'AI case studies',
          href: '/work/case-studies',
          description: 'Outcomes from AI and automation engagements.',
          icon: 'quote' as const,
        },
        {
          label: 'AI solutions work',
          href: '/work/ai-solutions',
          description: 'Selected AI product and ops builds.',
          icon: 'brain' as const,
        },
      ],
      technologies: [
        {
          label: 'OpenAI / Gemini',
          href: '/services/llm-integration',
          description: 'Production LLM wiring and evaluation.',
          icon: 'workflow' as const,
        },
        {
          label: 'Automation stack',
          href: '/services/ai-automation',
          description: 'Workflow automation with human escalation.',
          icon: 'zap' as const,
        },
      ],
      industries: [
        {
          label: 'Startups',
          href: '/industries/startups',
          description: 'Ship AI leverage without enterprise bloat.',
          icon: 'rocket' as const,
        },
        {
          label: 'SaaS',
          href: '/industries/saas',
          description: 'Multi-tenant products with billing-ready architecture.',
          icon: 'cloud' as const,
        },
      ],
      blog: [
        {
          label: 'AI insights',
          href: '/blog',
          description: 'Practical notes on shipping AI systems.',
          icon: 'message' as const,
        },
        {
          label: 'Resources FAQ',
          href: '/resources/faq',
          description: 'Process, timelines, and engagement answers.',
          icon: 'headset' as const,
        },
      ],
    },
    development: {
      caseStudies: [
        {
          label: 'Web applications',
          href: '/work/web-applications',
          description: 'Portals, dashboards, and product apps.',
          icon: 'code' as const,
        },
        {
          label: 'Mobile apps',
          href: '/work/mobile-apps',
          description: 'iOS and Android delivery highlights.',
          icon: 'smartphone' as const,
        },
      ],
      technologies: [
        {
          label: 'Website development',
          href: '/services/website-development',
          description: 'Marketing and product websites that convert.',
          icon: 'globe' as const,
        },
        {
          label: 'Cloud & DevOps',
          href: '/services/cloud-devops',
          description: 'CI/CD, reliability, and cloud architecture.',
          icon: 'cloud' as const,
        },
      ],
      industries: [
        {
          label: 'FinTech',
          href: '/industries/fintech',
          description: 'Secure financial product engineering.',
          icon: 'trending-up' as const,
        },
        {
          label: 'Healthcare',
          href: '/industries/healthcare',
          description: 'Compliant portals and care workflows.',
          icon: 'shield' as const,
        },
      ],
      blog: [
        {
          label: 'Engineering notes',
          href: '/blog',
          description: 'Architecture and delivery practices.',
          icon: 'message' as const,
        },
        {
          label: 'Portfolio',
          href: '/work/portfolio',
          description: 'Browse shipped product and website work.',
          icon: 'layout-grid' as const,
        },
      ],
    },
    'digital-growth': {
      caseStudies: [
        {
          label: 'Website outcomes',
          href: '/work/websites',
          description: 'Conversion and performance-focused sites.',
          icon: 'globe' as const,
        },
        {
          label: 'Featured projects',
          href: '/work/featured-projects',
          description: 'Highlighted growth and product builds.',
          icon: 'star' as const,
        },
      ],
      technologies: [
        {
          label: 'Technical SEO',
          href: '/services/technical-seo',
          description: 'Crawl health, structure, and indexability.',
          icon: 'search' as const,
        },
        {
          label: 'Performance',
          href: '/services/performance-optimization',
          description: 'Core Web Vitals and speed improvements.',
          icon: 'zap' as const,
        },
      ],
      industries: [
        {
          label: 'Retail & Ecommerce',
          href: '/industries/retail-ecommerce',
          description: 'Storefront and funnel optimization.',
          icon: 'sparkles' as const,
        },
        {
          label: 'Education',
          href: '/industries/education',
          description: 'Learning platforms and enrollment sites.',
          icon: 'message' as const,
        },
      ],
      blog: [
        {
          label: 'Growth articles',
          href: '/blog',
          description: 'SEO, UX, and conversion insights.',
          icon: 'trending-up' as const,
        },
        {
          label: 'FAQ',
          href: '/resources/faq',
          description: 'Common questions on process and scope.',
          icon: 'headset' as const,
        },
      ],
    },
  } satisfies Record<string, ServiceGroupRelatedLinks>,
  hubs: [
    {
      href: '/work/portfolio',
      title: 'Portfolio',
      description: 'Selected product and website builds.',
      icon: 'layout-grid' as const,
    },
    {
      href: '/industries',
      title: 'Industries',
      description: 'Healthcare to enterprise verticals.',
      icon: 'globe' as const,
    },
    {
      href: '/work/case-studies',
      title: 'Case Studies',
      description: 'Outcomes, scope, and delivery notes.',
      icon: 'quote' as const,
    },
    {
      href: '/blog',
      title: 'Blog',
      description: 'Practical AI and engineering insights.',
      icon: 'message' as const,
    },
    {
      href: '/pricing',
      title: 'Pricing',
      description: 'Clear engagement models and estimates.',
      icon: 'trending-up' as const,
    },
    {
      href: '/resources/faq',
      title: 'FAQ',
      description: 'Timelines, process, and engagement answers.',
      icon: 'headset' as const,
    },
  ] satisfies readonly ServiceHubCard[],
  cta: {
    heading: 'Ready to scope your next build?',
    description:
      'Book a consultation, message us on WhatsApp, or schedule a discovery call — response within 24 hours, no obligation.',
    trust: ['Response within 24 hours', 'No obligation', 'Written estimate'] as const,
  },
} as const;
