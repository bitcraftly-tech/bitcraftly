import {
  ALL_SOLUTIONS,
  getSolutionBySlug,
  getSolutionHref,
  SOLUTION_GROUPS,
} from '@/constants/solutions';
import { getServiceHref } from '@/constants/services';
import type {
  RelatedLink,
  SolutionCardModel,
  SolutionPageContent,
  SolutionsFeaturedItem,
} from './solutions.types';

const DEFAULT_PROCESS = [
  {
    title: 'Discover',
    description:
      'Map current workflows, stakeholders, and success metrics before we design anything.',
    icon: 'search' as const,
  },
  {
    title: 'Design the system',
    description: 'Architecture, UX, integrations, and a written rollout plan with clear ownership.',
    icon: 'layout-grid' as const,
  },
  {
    title: 'Build & validate',
    description: 'Founder-led delivery with staged releases and real-user feedback loops.',
    icon: 'code' as const,
  },
  {
    title: 'Operate & improve',
    description: 'Launch, train teams, monitor adoption, and iterate on measurable outcomes.',
    icon: 'trending-up' as const,
  },
] as const;

type SolutionOverride = Partial<
  Omit<SolutionPageContent, 'slug' | 'label' | 'icon' | 'groupId' | 'groupTitle' | 'summary'>
> & {
  relatedSolutionSlugs: readonly string[];
};

const CONTENT_OVERRIDES: Record<string, SolutionOverride> = {
  crm: {
    metaDescription:
      'Bitcraftly CRM solutions include lead pipelines, WhatsApp and email follow-ups, and conversion reporting — shaped around how you sell, not a generic CRM dump.',
    eyebrow: 'Business Solutions',
    headline: 'CRM that your sales team actually uses',
    intro:
      'Pipelines, follow-ups, and automation shaped around how you sell — WhatsApp, calls, and dashboards included — not a generic CRM dump.',
    highlights: [
      'Lead and deal pipelines with clear stages',
      'WhatsApp and email follow-up automation',
      'Role-based views for founders and sales',
      'Reporting that tracks conversion, not vanity',
      'Integrations with forms, ads, and calendars',
    ],
    outcomes: [
      'Fewer lost leads in the inbox',
      'Faster response times',
      'A single source of truth for relationships',
    ],
    relatedSolutionSlugs: ['erp', 'ai-assistants', 'ai-automation'],
    relatedServiceHrefs: [
      getServiceHref('custom-software-development'),
      getServiceHref('web-application-development'),
      getServiceHref('ai-automation'),
    ],
    keywords: ['CRM solutions', 'sales CRM India', 'pipeline automation'],
  },
  erp: {
    metaDescription:
      'Bitcraftly ERP solutions connect finance, inventory, and teams into one operating system — modular enough to start focused and grow without a rewrite.',
    eyebrow: 'Business Solutions',
    headline: 'ERP for how your business really runs',
    intro:
      'Connect finance, inventory, and teams into one operating system — modular enough to start focused and grow without a rewrite.',
    highlights: [
      'Modular modules for finance, inventory, and ops',
      'Permissions and audit trails by role',
      'Inventory and order visibility',
      'Reporting dashboards for owners',
      'API hooks for existing tools',
    ],
    outcomes: [
      'Less spreadsheet chaos',
      'Clearer inventory and cash visibility',
      'Processes your team can follow daily',
    ],
    relatedSolutionSlugs: ['crm', 'internal-business-tools', 'enterprise-portals'],
    relatedServiceHrefs: [
      getServiceHref('custom-software-development'),
      getServiceHref('api-integration'),
      getServiceHref('cloud-devops'),
    ],
    keywords: ['ERP solutions', 'operations software', 'inventory ERP'],
  },
  cms: {
    metaDescription:
      'Bitcraftly CMS solutions give marketing and product teams structured, SEO-ready content systems that ship fast and stay safe for non-engineers to publish.',
    eyebrow: 'Business Solutions',
    headline: 'CMS platforms built for content velocity',
    intro:
      'Give marketing and product teams a content system that ships fast — structured, SEO-ready, and safe for non-engineers to publish.',
    highlights: [
      'Structured content models for pages and campaigns',
      'Preview workflows and role-based publishing',
      'SEO fields and internal linking support',
      'Media management and localization hooks',
      'Headless or hybrid delivery with Next.js',
    ],
    outcomes: [
      'Faster campaign launches',
      'Fewer emergency engineer tickets for copy changes',
      'Consistent brand pages at scale',
    ],
    relatedSolutionSlugs: ['saas-platforms', 'enterprise-portals', 'knowledge-base-ai'],
    relatedServiceHrefs: [
      getServiceHref('website-development'),
      getServiceHref('web-application-development'),
      getServiceHref('technical-seo'),
    ],
    keywords: ['CMS solutions', 'headless CMS', 'content platform'],
  },
  'saas-platforms': {
    metaDescription:
      'Bitcraftly SaaS platforms include multi-tenant shells with auth, billing-ready UI, admin, and analytics — engineered for launch, not just demos.',
    eyebrow: 'Business Solutions',
    headline: 'SaaS platforms ready for real tenants',
    intro:
      'Multi-tenant product shells with auth, billing-ready UI, admin, and analytics — engineered for launch, not just demos.',
    highlights: [
      'Multi-tenant architecture patterns',
      'Auth, roles, and workspace isolation',
      'Billing-ready product surfaces',
      'Admin and customer dashboards',
      'Observability and release discipline',
    ],
    outcomes: [
      'Investor-ready product walkthroughs',
      'A foundation you can grow into',
      'Clear path from MVP to scale',
    ],
    relatedSolutionSlugs: ['crm', 'ai-analytics', 'enterprise-portals'],
    relatedServiceHrefs: [
      getServiceHref('web-application-development'),
      getServiceHref('cloud-devops'),
      getServiceHref('ui-ux-design'),
    ],
    keywords: ['SaaS platforms', 'multi-tenant SaaS', 'SaaS product development'],
  },
  'internal-business-tools': {
    metaDescription:
      'Bitcraftly internal business tools cover approvals, trackers, and team dashboards — custom ops software for workflows your off-the-shelf stack cannot handle.',
    eyebrow: 'Business Solutions',
    headline: 'Internal tools that remove busywork',
    intro:
      'Custom ops tools for the workflows your off-the-shelf stack can’t handle — approvals, trackers, and team dashboards.',
    highlights: [
      'Workflow apps for approvals and handoffs',
      'Role-based internal dashboards',
      'Integrations with CRM, sheets, and WhatsApp',
      'Audit logs for sensitive actions',
      'Training and handoff for your operators',
    ],
    outcomes: ['Hours saved every week', 'Fewer manual errors', 'Tools shaped around your process'],
    relatedSolutionSlugs: ['erp', 'crm', 'ai-workflows'],
    relatedServiceHrefs: [
      getServiceHref('custom-software-development'),
      getServiceHref('api-integration'),
      getServiceHref('web-application-development'),
    ],
    keywords: ['internal tools', 'ops software', 'business workflow apps'],
  },
  'enterprise-portals': {
    metaDescription:
      'Bitcraftly enterprise portals give partners, staff, and customers secure auth, clear roles, and self-serve flows that feel premium on every device.',
    eyebrow: 'Business Solutions',
    headline: 'Secure portals for every stakeholder',
    intro:
      'Partner, staff, and customer portals with strong auth, clear roles, and experiences that feel premium on every device.',
    highlights: [
      'Secure auth and role-based access',
      'Partner and customer self-serve flows',
      'Document and status visibility',
      'Branded UI consistent with your product',
      'Monitoring and support handoff',
    ],
    outcomes: [
      'Less support load on your team',
      'Better partner and customer experience',
      'Controlled access to sensitive data',
    ],
    relatedSolutionSlugs: ['saas-platforms', 'cms', 'knowledge-base-ai'],
    relatedServiceHrefs: [
      getServiceHref('web-application-development'),
      getServiceHref('security-monitoring'),
      getServiceHref('ui-ux-design'),
    ],
    keywords: ['enterprise portals', 'partner portal', 'customer portal'],
  },
  'ai-assistants': {
    metaDescription:
      'Bitcraftly AI assistants support teams and customers with content-grounded answers and WhatsApp or chat handoff when a human should take over.',
    eyebrow: 'AI Solutions',
    headline: 'AI assistants that stay useful',
    intro:
      'Assistants for support and internal teams — grounded in your content, with WhatsApp or chat handoff when a human should take over.',
    highlights: [
      'Customer and internal assistant experiences',
      'Knowledge grounding from your docs and FAQs',
      'Human escalation paths',
      'Analytics on intents and outcomes',
      'Guardrails for brand-safe answers',
    ],
    outcomes: [
      'Faster first responses',
      'Higher-quality handoffs to humans',
      'Less repetitive FAQ work',
    ],
    relatedSolutionSlugs: ['ai-automation', 'knowledge-base-ai', 'ai-workflows'],
    relatedServiceHrefs: [
      getServiceHref('ai-chatbots'),
      getServiceHref('ai-solutions'),
      getServiceHref('llm-integration'),
    ],
    keywords: ['AI assistants', 'support AI', 'internal AI assistant'],
  },
  'ai-automation': {
    metaDescription:
      'Bitcraftly AI automation runs repetitive business workflows with monitoring and human review — so operations scale without chaos.',
    eyebrow: 'AI Solutions',
    headline: 'AI automation across your workflows',
    intro:
      'Automate repetitive business workflows with monitoring and human review — so ops scale without chaos.',
    highlights: [
      'Trigger → process → notify pipelines',
      'CRM and ops tool automation',
      'Document and lead routing',
      'Error handling and retries',
      'Dashboards for throughput and failures',
    ],
    outcomes: [
      'Hours returned to your team',
      'Consistent process quality',
      'Fewer manual handoffs',
    ],
    relatedSolutionSlugs: ['ai-workflows', 'ai-assistants', 'crm'],
    relatedServiceHrefs: [
      getServiceHref('ai-automation'),
      getServiceHref('api-integration'),
      getServiceHref('document-ai'),
    ],
    keywords: ['AI automation', 'workflow automation', 'business AI'],
  },
  'ai-analytics': {
    metaDescription:
      'Bitcraftly AI analytics turns product and business data into decision-ready insights — dashboards leaders trust and predictions you can act on.',
    eyebrow: 'AI Solutions',
    headline: 'AI analytics for clearer decisions',
    intro:
      'Turn product and business data into decision-ready insights — dashboards leaders trust and predictions you can act on.',
    highlights: [
      'KPI frameworks with stakeholders',
      'Product and revenue analytics views',
      'Anomaly and trend surfacing',
      'Role-based dashboards and exports',
      'Instrumentation guidance for clean data',
    ],
    outcomes: [
      'Faster weekly operating reviews',
      'One source of truth for leadership',
      'Less spreadsheet archaeology',
    ],
    relatedSolutionSlugs: ['saas-platforms', 'ai-workflows', 'erp'],
    relatedServiceHrefs: [
      getServiceHref('analytics-dashboard'),
      getServiceHref('ai-solutions'),
      getServiceHref('web-application-development'),
    ],
    keywords: ['AI analytics', 'business intelligence', 'predictive analytics'],
  },
  'ai-workflows': {
    metaDescription:
      'Bitcraftly AI workflows connect multi-step AI processes across tools — with checkpoints, logging, and approval gates for sensitive actions.',
    eyebrow: 'AI Solutions',
    headline: 'Orchestrated AI workflows',
    intro:
      'Connect multi-step AI processes across tools — with checkpoints, logging, and approval gates for sensitive actions.',
    highlights: [
      'Multi-step AI orchestration',
      'Tool and API connectivity',
      'Human approval gates',
      'Audit logs for every run',
      'Reusable playbooks for your team',
    ],
    outcomes: [
      'Complex work completed more consistently',
      'Safer automation with clear limits',
      'Playbooks you can reuse',
    ],
    relatedSolutionSlugs: ['ai-automation', 'ai-assistants', 'internal-business-tools'],
    relatedServiceHrefs: [
      getServiceHref('ai-agents'),
      getServiceHref('llm-integration'),
      getServiceHref('api-integration'),
    ],
    keywords: ['AI workflows', 'agentic workflows', 'AI orchestration'],
  },
  'knowledge-base-ai': {
    metaDescription:
      'Bitcraftly Knowledge Base AI delivers searchable, grounded answers from your docs, policies, and product content — with citations and safe fallbacks.',
    eyebrow: 'AI Solutions',
    headline: 'Knowledge Base AI your team can trust',
    intro:
      'Searchable, grounded answers from your docs, policies, and product content — with citations and safe fallbacks.',
    highlights: [
      'Ingestion from docs, FAQs, and CMS',
      'Grounded answers with source references',
      'Access controls by team or role',
      'Feedback loops to improve quality',
      'Embeddable search and chat surfaces',
    ],
    outcomes: [
      'Faster internal answers',
      'Fewer repeated support questions',
      'Knowledge that stays up to date',
    ],
    relatedSolutionSlugs: ['ai-assistants', 'cms', 'enterprise-portals'],
    relatedServiceHrefs: [
      getServiceHref('document-ai'),
      getServiceHref('llm-integration'),
      getServiceHref('ai-solutions'),
    ],
    keywords: ['knowledge base AI', 'RAG knowledge base', 'enterprise search AI'],
  },
};

function getGroupForSlug(slug: string): { id: string; title: string } {
  for (const group of SOLUTION_GROUPS) {
    if (group.items.some((item) => item.slug === slug)) {
      return { id: group.id, title: group.title };
    }
  }
  return { id: 'solutions', title: 'Solutions' };
}

function buildDefaultFaqs(label: string): SolutionPageContent['faqs'] {
  return [
    {
      id: 'fit',
      question: `Is ${label} a product or a custom build?`,
      answer:
        'Most engagements are tailored builds on proven patterns — scoped to your workflows, with a written estimate before kickoff.',
    },
    {
      id: 'timeline',
      question: 'How long does delivery usually take?',
      answer:
        'Depends on modules and integrations. After discovery we share milestones and a written timeline — no surprise mid-project invoices.',
    },
  ];
}

export function getSolutionPageContent(slug: string): SolutionPageContent | undefined {
  const nav = getSolutionBySlug(slug);
  if (!nav) return undefined;

  const group = getGroupForSlug(slug);
  const override = CONTENT_OVERRIDES[slug];
  const related =
    override?.relatedSolutionSlugs ??
    ALL_SOLUTIONS.filter((s) => s.slug !== slug)
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
      `${nav.description} Founder-led delivery with clear scope and measurable outcomes.`,
    highlights: override?.highlights ?? [
      'Clear written scope before kickoff',
      'Founder-led architecture and reviews',
      'Integrations with your existing tools',
      'Dashboards for adoption and ROI',
      'Handoff documentation your team can own',
    ],
    outcomes: override?.outcomes ?? [
      'A production-ready solution',
      'Transparent progress and communication',
      'A path to iterate after launch',
    ],
    process: override?.process ?? DEFAULT_PROCESS,
    faqs: override?.faqs ?? buildDefaultFaqs(nav.label),
    relatedSolutionSlugs: related,
    relatedServiceHrefs: override?.relatedServiceHrefs ?? [
      getServiceHref('custom-software-development'),
      getServiceHref('web-application-development'),
      '/services',
    ],
    keywords: override?.keywords ?? [nav.label, 'Bitcraftly', group.title],
    ctaPrimaryLabel: override?.ctaPrimaryLabel ?? 'Book Free Consultation',
    ctaSecondaryLabel: override?.ctaSecondaryLabel ?? 'View All Solutions',
  };
}

export function getSolutionCardModels(): readonly SolutionCardModel[] {
  const badges: Partial<Record<string, SolutionCardModel['badge']>> = {
    crm: 'Popular',
    erp: 'Enterprise',
    'saas-platforms': 'Recommended',
    'ai-automation': 'Popular',
    'ai-assistants': 'New',
    'enterprise-portals': 'Enterprise',
    'ai-analytics': 'Recommended',
    'knowledge-base-ai': 'New',
  };

  return ALL_SOLUTIONS.map((solution) => ({
    slug: solution.slug,
    title: solution.label,
    description: solution.description,
    href: getSolutionHref(solution.slug),
    icon: solution.icon,
    ctaLabel: `Explore ${solution.label}`,
    badge: badges[solution.slug],
  }));
}

export function getRelatedSolutions(slug: string, limit = 4): readonly SolutionCardModel[] {
  const content = getSolutionPageContent(slug);
  const slugs =
    content?.relatedSolutionSlugs ??
    ALL_SOLUTIONS.filter((s) => s.slug !== slug)
      .slice(0, limit)
      .map((s) => s.slug);

  return slugs
    .map((relatedSlug) => {
      const solution = getSolutionBySlug(relatedSlug);
      if (!solution) return null;
      return {
        slug: solution.slug,
        title: solution.label,
        description: solution.description,
        href: getSolutionHref(solution.slug),
        icon: solution.icon,
        ctaLabel: `Explore ${solution.label}`,
      } satisfies SolutionCardModel;
    })
    .filter((item): item is SolutionCardModel => item !== null)
    .slice(0, limit);
}

const SERVICE_LABELS: Record<string, string> = {
  '/services': 'All Services',
  [getServiceHref('custom-software-development')]: 'Custom Software',
  [getServiceHref('web-application-development')]: 'Web Applications',
  [getServiceHref('ai-automation')]: 'AI Automation',
  [getServiceHref('ai-solutions')]: 'AI Solutions',
  [getServiceHref('ai-chatbots')]: 'AI Chatbots',
  [getServiceHref('ai-agents')]: 'AI Agents',
  [getServiceHref('llm-integration')]: 'LLM Integration',
  [getServiceHref('document-ai')]: 'Document AI',
  [getServiceHref('api-integration')]: 'API Integration',
  [getServiceHref('cloud-devops')]: 'Cloud & DevOps',
  [getServiceHref('website-development')]: 'Website Development',
  [getServiceHref('technical-seo')]: 'Technical SEO',
  [getServiceHref('ui-ux-design')]: 'UI/UX Design',
  [getServiceHref('analytics-dashboard')]: 'Analytics Dashboard',
  [getServiceHref('security-monitoring')]: 'Security & Monitoring',
};

export function getRelatedServiceLinks(hrefs: readonly string[]): RelatedLink[] {
  return hrefs.map((href) => ({
    href,
    label:
      SERVICE_LABELS[href] ??
      href
        .split('/')
        .filter(Boolean)
        .slice(-1)[0]
        ?.replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()) ??
      href,
  }));
}

export const SOLUTIONS_LANDING = {
  eyebrow: 'Enterprise Solutions',
  title: 'Business & AI Solutions that scale with you',
  titleHighlight: 'AI Solutions',
  description:
    'From CRM and ERP to SaaS platforms and AI workflows — systems designed for measurable outcomes, not guesswork. We build solutions that streamline operations and accelerate growth.',
  supporting:
    'Founder-led delivery with clear scope, written estimates, and production-ready architecture your team can operate.',
  primaryCta: {
    label: 'Book Free Consultation',
    href: '/contact?intent=consultation&source=solutions',
  },
  secondaryCta: {
    label: 'Explore Services',
    href: '/services',
  },
  tertiaryCta: {
    label: 'Schedule Discovery Call',
    href: '/contact?intent=discovery&source=solutions',
  },
  trustIndicators: [
    'Founder-led delivery',
    'Clear scope & timelines',
    'Enterprise-ready architecture',
  ] as const,
  stats: [
    { value: '200+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support Available' },
    { value: '24h', label: 'Avg. Response Time' },
  ] as const,
  techChips: [
    { id: 'crm', label: 'CRM & ERP', icon: 'workflow' as const },
    { id: 'ai', label: 'AI Automation', icon: 'shield' as const },
    { id: 'saas', label: 'SaaS Platforms', icon: 'rocket' as const },
    { id: 'data', label: 'Analytics', icon: 'trending-up' as const },
  ],
  categories: [
    {
      slug: 'erp',
      title: 'ERP',
      description: 'Operations across finance, inventory, and teams.',
      icon: 'workflow' as const,
    },
    {
      slug: 'crm',
      title: 'CRM',
      description: 'Pipelines, automation, and relationship systems.',
      icon: 'message' as const,
    },
    {
      slug: 'cms',
      title: 'CMS',
      description: 'Flexible content platforms for growth teams.',
      icon: 'quote' as const,
    },
    {
      slug: 'ai-automation',
      title: 'AI Automation',
      description: 'Intelligent automation across business workflows.',
      icon: 'zap' as const,
    },
    {
      slug: 'saas-platforms',
      title: 'SaaS Platforms',
      description: 'Multi-tenant products built to scale.',
      icon: 'rocket' as const,
    },
    {
      slug: 'enterprise-portals',
      title: 'Enterprise Dashboards',
      description: 'Secure portals and decision-ready dashboards.',
      icon: 'layout-grid' as const,
    },
    {
      slug: 'ai-analytics',
      title: 'Business Intelligence',
      description: 'Insights and predictions from your data.',
      icon: 'trending-up' as const,
    },
    {
      slug: 'ai-workflows',
      title: 'Workflow Automation',
      description: 'Orchestrated steps across systems and teams.',
      icon: 'workflow' as const,
    },
  ],
  featured: [
    {
      slug: 'crm',
      title: 'CRM Solutions',
      description:
        'Sales pipelines, follow-ups, and WhatsApp-ready workflows your team will actually use.',
      imageLabel: 'CRM',
      imageSrc: '/business-solutions-crm.webp',
      features: ['Lead & deal stages', 'Automated reminders', 'Slack / WhatsApp / calendar'],
      benefits: ['Faster response times', 'One source of truth', 'Conversion-focused reporting'],
      ctaLabel: 'Explore CRM',
    },
    {
      slug: 'saas-platforms',
      title: 'SaaS Platforms',
      description:
        'Multi-tenant products with billing-ready architecture, roles, and scalable delivery.',
      imageLabel: 'SaaS',
      imageSrc: '/business-solutions-saas.webp',
      features: ['Tenant isolation', 'Role-based access', 'API-first integrations'],
      benefits: ['Ship faster with clear phases', 'Maintainable codebase', 'Ready for growth'],
      ctaLabel: 'Explore SaaS',
    },
    {
      slug: 'ai-automation',
      title: 'AI Automation',
      description:
        'Rule + LLM automation that removes repetitive work and routes exceptions to humans.',
      imageLabel: 'AI',
      imageSrc: '/business-solutions-ai.webp',
      features: ['Workflow orchestration', 'Human escalation paths', 'Outcome analytics'],
      benefits: ['Less manual ops', 'Consistent quality', 'Measurable ROI'],
      ctaLabel: 'Explore AI Automation',
    },
  ] as readonly SolutionsFeaturedItem[],
  industries: [
    { slug: 'healthcare', label: 'Healthcare', icon: 'shield' as const },
    { slug: 'education', label: 'Education', icon: 'message' as const },
    { slug: 'retail-ecommerce', label: 'Retail', icon: 'sparkles' as const },
    { slug: 'manufacturing', label: 'Manufacturing', icon: 'database' as const },
    { slug: 'fintech', label: 'Finance', icon: 'trending-up' as const },
    { slug: 'real-estate', label: 'Real Estate', icon: 'globe' as const },
    { slug: 'logistics', label: 'Logistics', icon: 'workflow' as const },
    { slug: 'travel', label: 'Travel', icon: 'rocket' as const },
  ],
  technologies: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'Supabase',
    'AWS',
    'Docker',
    'OpenAI',
  ] as const,
  why: [
    {
      title: 'Performance',
      description: 'Fast loads, clean UX, and Core Web Vitals that support conversion.',
      icon: 'zap' as const,
    },
    {
      title: 'Scalability',
      description: 'Architecture that grows with tenants, data, and team size.',
      icon: 'trending-up' as const,
    },
    {
      title: 'Security',
      description: 'Hardening, access control, and monitoring built into delivery.',
      icon: 'shield' as const,
    },
    {
      title: 'Maintainability',
      description: 'Readable code, clear ownership, and documentation your team can run.',
      icon: 'code' as const,
    },
    {
      title: 'Enterprise Architecture',
      description: 'Integrations, roles, and reliability patterns for complex orgs.',
      icon: 'database' as const,
    },
    {
      title: 'Long-term Partnership',
      description: 'Founder-led continuity after launch — support, iteration, and roadmap.',
      icon: 'headset' as const,
    },
  ],
  process: [
    {
      title: 'Discover',
      description: 'Map workflows, stakeholders, constraints, and success metrics.',
      icon: 'search' as const,
    },
    {
      title: 'Plan',
      description: 'Scope, architecture options, timeline, and a written estimate.',
      icon: 'rocket' as const,
    },
    {
      title: 'Design',
      description: 'UX flows, data model, and integration plan before heavy build.',
      icon: 'layout-grid' as const,
    },
    {
      title: 'Develop',
      description: 'Phased delivery with visible progress — not black-box sprints.',
      icon: 'code' as const,
    },
    {
      title: 'Test',
      description: 'QA, edge cases, and acceptance checks against agreed outcomes.',
      icon: 'check' as const,
    },
    {
      title: 'Deploy',
      description: 'Launch with monitoring, training, and a clear cutover plan.',
      icon: 'cloud' as const,
    },
    {
      title: 'Support',
      description: 'Operate, improve, and extend with a long-term partnership mindset.',
      icon: 'headset' as const,
    },
  ],
  faqs: [
    {
      id: 'product-or-custom',
      question: 'Are these packaged products or custom builds?',
      answer:
        'Custom builds shaped around your workflows. We reuse proven patterns for CRM, ERP, SaaS, and AI — but scope, integrations, and UX are tailored to your business.',
    },
    {
      id: 'timeline',
      question: 'How long does a typical solution delivery take?',
      answer:
        'Most first releases land in 4–12 weeks depending on integrations and complexity. You get a written timeline and phased milestones before build starts.',
    },
    {
      id: 'integrations',
      question: 'Can you integrate with our existing stack?',
      answer:
        'Yes — Slack, WhatsApp, calendars, payment systems, CRMs, ERPs, and custom APIs. We design escalation paths so humans stay in control of exceptions.',
    },
    {
      id: 'ownership',
      question: 'Who owns the code and infrastructure?',
      answer:
        'You do. We deliver maintainable code, documentation, and handover so your team (or ours) can operate and extend the system after launch.',
    },
  ],
  groupIntros: [
    {
      id: 'business-solutions',
      label: 'Business Solutions',
      title: 'Business Solutions',
      description:
        'CRM, ERP, CMS, SaaS platforms, internal tools, and enterprise portals — systems that run the business day to day.',
    },
    {
      id: 'ai-solutions',
      label: 'AI Solutions',
      title: 'AI Solutions',
      description:
        'Assistants, automation, analytics, workflows, and knowledge systems grounded in your data and processes.',
    },
  ],
  cta: {
    heading: 'Ready to scope your next solution?',
    description:
      'Book a free consultation, message us on WhatsApp, or schedule a discovery call — clear next steps, no pressure.',
    trust: [
      'Response within 24 hours',
      'Free consultation',
      'No obligation',
      'Written proposal',
    ] as const,
  },
  hubs: [
    {
      href: '/services',
      title: 'Services',
      description: 'End-to-end engineering capabilities.',
      icon: 'code' as const,
    },
    {
      href: '/industries',
      title: 'Industries',
      description: 'Vertical experience from healthcare to enterprise.',
      icon: 'globe' as const,
    },
    {
      href: '/work/case-studies',
      title: 'Case Studies',
      description: 'Outcomes, scope, and delivery notes.',
      icon: 'quote' as const,
    },
    {
      href: '/work/portfolio',
      title: 'Portfolio',
      description: 'Selected product and website builds.',
      icon: 'layout-grid' as const,
    },
    {
      href: '/resources/faq',
      title: 'FAQ',
      description: 'Process, timelines, and engagement answers.',
      icon: 'headset' as const,
    },
    {
      href: '/contact',
      title: 'Contact',
      description: 'Start a conversation about your roadmap.',
      icon: 'mail' as const,
    },
  ],
} as const;
