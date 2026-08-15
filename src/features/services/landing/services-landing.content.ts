import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import type {
  ServiceCategory,
  ServicesFaqItem,
  ServicesIndustryItem,
  ServicesLandingCta,
  ServicesProcessStep,
  ServicesTechGroup,
  ServicesWhyItem,
} from './types';

const contactCta = (label = 'Discuss This Service'): ServicesLandingCta => ({
  label,
  href: ROUTES.contact,
});

export const SERVICES_LANDING_HERO = {
  eyebrow: 'Services',
  title: 'What we build for ambitious businesses',
  description:
    'Clear service lines across web, apps, AI, design, and cloud — scoped for outcomes, delivered with enterprise discipline.',
  primaryCta: {
    label: NAV_ACTIONS.bookCall.label,
    href: NAV_ACTIONS.bookCall.href,
  },
  secondaryCta: {
    label: 'Explore services',
    href: '#services-offerings',
  },
  trustItems: ['Founder-led delivery', 'Fixed scope options', 'Measurable outcomes'] as const,
} as const;

export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Marketing sites and portals engineered for conversion, speed, and SEO.',
    offerings: [
      {
        id: 'business-websites',
        title: 'Business Websites',
        description:
          'Conversion-focused websites that present your offer clearly and drive enquiries.',
        bestFor: 'SMBs and growing brands that need a credible web presence',
        startingPrice: '₹15,000',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
        icon: 'globe',
        cta: contactCta('Start My Website'),
      },
      {
        id: 'corporate-websites',
        title: 'Corporate Websites',
        description:
          'Enterprise-ready corporate sites with structured content, branding, and governance.',
        bestFor: 'Companies that need trust, clarity, and multi-page depth',
        startingPrice: '₹35,000',
        technologies: ['Next.js', 'CMS', 'TypeScript', 'SEO'],
        icon: 'layout-grid',
        cta: contactCta(),
      },
      {
        id: 'landing-pages',
        title: 'Landing Pages',
        description: 'High-intent campaign pages designed to convert traffic into qualified leads.',
        bestFor: 'Product launches, ads, and campaign funnels',
        startingPrice: '₹12,000',
        technologies: ['Next.js', 'React', 'Analytics', 'A/B ready'],
        icon: 'rocket',
        cta: contactCta('Build Landing Page'),
      },
      {
        id: 'custom-portals',
        title: 'Custom Portals',
        description: 'Secure client, partner, or internal portals tailored to your workflows.',
        bestFor: 'Teams that need authenticated experiences beyond a brochure site',
        startingPrice: '₹60,000',
        technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Auth'],
        icon: 'shield',
        cta: contactCta(),
      },
    ],
  },
  {
    id: 'web-applications',
    title: 'Web Applications',
    description: 'Operational systems that replace spreadsheets and fragmented tools.',
    offerings: [
      {
        id: 'crm',
        title: 'CRM',
        description: 'Pipeline visibility, follow-ups, and team accountability in one focused CRM.',
        bestFor: 'Sales teams that outgrew spreadsheets',
        startingPrice: '₹75,000',
        technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'APIs'],
        icon: 'trending-up',
        cta: contactCta('Plan My CRM'),
      },
      {
        id: 'erp',
        title: 'ERP',
        description:
          'Inventory, procurement, and operations workflows consolidated into one system.',
        bestFor: 'Businesses needing operational control across teams',
        startingPrice: '₹1,50,000',
        technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
        icon: 'database',
        cta: contactCta(),
      },
      {
        id: 'inventory',
        title: 'Inventory',
        description:
          'Stock tracking, alerts, and movement history designed for day-to-day accuracy.',
        bestFor: 'Retail, warehouse, and multi-location operations',
        startingPrice: '₹60,000',
        technologies: ['Next.js', 'Node.js', 'PostgreSQL'],
        icon: 'layout-grid',
        cta: contactCta(),
      },
      {
        id: 'booking',
        title: 'Booking',
        description:
          'Appointment and reservation systems with schedules, reminders, and admin control.',
        bestFor: 'Clinics, salons, consultants, and service businesses',
        startingPrice: '₹45,000',
        technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'SMS'],
        icon: 'calendar',
        cta: contactCta('Build Booking System'),
      },
      {
        id: 'dashboard',
        title: 'Dashboard',
        description: 'Decision-ready dashboards that surface KPIs, trends, and operational health.',
        bestFor: 'Founders and managers who need live business visibility',
        startingPrice: '₹50,000',
        technologies: ['Next.js', 'React', 'APIs', 'Charts'],
        icon: 'trending-up',
        cta: contactCta(),
      },
      {
        id: 'marketplace',
        title: 'Marketplace',
        description:
          'Two-sided platforms connecting buyers and providers with trust and workflows.',
        bestFor: 'Startups and brands launching multi-sided products',
        startingPrice: '₹1,25,000',
        technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Search'],
        icon: 'globe',
        cta: contactCta(),
      },
    ],
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    description: 'Practical AI products grounded in your data, workflows, and business goals.',
    offerings: [
      {
        id: 'ai-chatbots',
        title: 'AI Chatbots',
        description: 'Conversational assistants for support and sales with clear human escalation.',
        bestFor: 'Teams that want 24/7 first response without losing quality',
        startingPrice: '₹40,000',
        technologies: ['LLMs', 'Next.js', 'RAG', 'WhatsApp'],
        icon: 'bot',
        cta: contactCta('Add AI Chatbot'),
      },
      {
        id: 'ai-automation',
        title: 'AI Automation',
        description: 'Automate repetitive workflows across leads, documents, and internal tools.',
        bestFor: 'Ops teams drowning in manual handoffs',
        startingPrice: '₹55,000',
        technologies: ['Python', 'LLMs', 'APIs', 'Workflows'],
        icon: 'zap',
        cta: contactCta(),
      },
      {
        id: 'ai-agents',
        title: 'AI Agents',
        description: 'Task-oriented agents that research, draft, and execute multi-step work.',
        bestFor: 'Teams ready for guided autonomy with oversight',
        startingPrice: '₹80,000',
        technologies: ['Agents', 'LLMs', 'Tools', 'Guardrails'],
        icon: 'sparkles',
        cta: contactCta(),
      },
      {
        id: 'ai-search',
        title: 'AI Search',
        description: 'Semantic search across docs, products, and knowledge bases with citations.',
        bestFor: 'Knowledge-heavy products and internal knowledge systems',
        startingPrice: '₹65,000',
        technologies: ['Vector Search', 'Embeddings', 'Next.js', 'APIs'],
        icon: 'search',
        cta: contactCta(),
      },
      {
        id: 'ai-recommendation',
        title: 'AI Recommendation',
        description: 'Personalization engines that recommend products, content, or next actions.',
        bestFor: 'Commerce and content platforms seeking relevance lifts',
        startingPrice: '₹70,000',
        technologies: ['ML', 'APIs', 'PostgreSQL', 'Analytics'],
        icon: 'brain',
        cta: contactCta(),
      },
      {
        id: 'ai-analytics',
        title: 'AI Analytics',
        description: 'Insight layers that summarize metrics and surface actionable anomalies.',
        bestFor: 'Leaders who want narrative insights from raw data',
        startingPrice: '₹60,000',
        technologies: ['LLMs', 'SQL', 'Dashboards', 'APIs'],
        icon: 'trending-up',
        cta: contactCta(),
      },
    ],
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Native and cross-platform apps built for performance and maintainability.',
    offerings: [
      {
        id: 'ios',
        title: 'iOS',
        description: 'Polished iOS experiences aligned with Apple platform conventions.',
        bestFor: 'Products prioritizing iPhone and iPad users',
        startingPrice: '₹1,20,000',
        technologies: ['Swift', 'API Integration', 'App Store'],
        icon: 'smartphone',
        cta: contactCta(),
      },
      {
        id: 'android',
        title: 'Android',
        description: 'Reliable Android apps designed for scale across devices and versions.',
        bestFor: 'Products with broad Android reach requirements',
        startingPrice: '₹1,20,000',
        technologies: ['Kotlin', 'API Integration', 'Play Store'],
        icon: 'smartphone',
        cta: contactCta(),
      },
      {
        id: 'cross-platform',
        title: 'Cross Platform',
        description: 'One codebase strategy for faster delivery across iOS and Android.',
        bestFor: 'Teams that need speed without sacrificing quality',
        startingPrice: '₹1,00,000',
        technologies: ['React Native', 'TypeScript', 'APIs'],
        icon: 'rocket',
        cta: contactCta('Plan Mobile App'),
      },
      {
        id: 'react-native',
        title: 'React Native',
        description: 'Production React Native apps with shared logic and native feel.',
        bestFor: 'Product teams already invested in React',
        startingPrice: '₹1,00,000',
        technologies: ['React Native', 'TypeScript', 'Node.js'],
        icon: 'code',
        cta: contactCta(),
      },
    ],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX',
    description: 'Product design that reduces friction and strengthens brand clarity.',
    offerings: [
      {
        id: 'product-design',
        title: 'Product Design',
        description: 'End-to-end product UX from flows and wireframes to polished interfaces.',
        bestFor: 'Founders validating or refining product experience',
        startingPrice: '₹35,000',
        technologies: ['Figma', 'User Flows', 'Prototypes'],
        icon: 'sparkles',
        cta: contactCta(),
      },
      {
        id: 'design-systems',
        title: 'Design Systems',
        description: 'Reusable component libraries that keep product UI consistent at scale.',
        bestFor: 'Teams shipping multiple surfaces with one visual language',
        startingPrice: '₹55,000',
        technologies: ['Figma', 'Tokens', 'Components'],
        icon: 'layout-grid',
        cta: contactCta(),
      },
      {
        id: 'prototyping',
        title: 'Prototyping',
        description: 'Interactive prototypes that align stakeholders before engineering starts.',
        bestFor: 'Teams that need clarity before build investment',
        startingPrice: '₹25,000',
        technologies: ['Figma', 'Interactive Proto', 'Testing'],
        icon: 'play',
        cta: contactCta(),
      },
      {
        id: 'figma-to-code',
        title: 'Figma to Code',
        description:
          'Pixel-faithful, accessible implementation of approved designs in production code.',
        bestFor: 'Design-led teams ready for engineering handoff',
        startingPrice: '₹40,000',
        technologies: ['Next.js', 'React', 'Tailwind CSS'],
        icon: 'code',
        cta: contactCta('Convert Figma'),
      },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description: 'Reliable delivery pipelines and infrastructure for products that must stay up.',
    offerings: [
      {
        id: 'deployment',
        title: 'Deployment',
        description:
          'Production-ready deployments with environments, rollbacks, and clear ownership.',
        bestFor: 'Teams launching or migrating production apps',
        startingPrice: '₹25,000',
        technologies: ['Vercel', 'AWS', 'Docker', 'DNS'],
        icon: 'rocket',
        cta: contactCta(),
      },
      {
        id: 'ci-cd',
        title: 'CI/CD',
        description: 'Automated build, test, and release pipelines that reduce deployment risk.',
        bestFor: 'Engineering teams shipping frequently',
        startingPrice: '₹35,000',
        technologies: ['GitHub Actions', 'Testing', 'Preview Deploys'],
        icon: 'workflow',
        cta: contactCta(),
      },
      {
        id: 'monitoring',
        title: 'Monitoring',
        description: 'Observability for uptime, errors, and performance with actionable alerts.',
        bestFor: 'Products that need early warning before users complain',
        startingPrice: '₹30,000',
        technologies: ['Logging', 'Alerts', 'APM', 'Uptime'],
        icon: 'shield',
        cta: contactCta(),
      },
      {
        id: 'cloud-infrastructure',
        title: 'Cloud Infrastructure',
        description:
          'Secure, scalable cloud foundations tailored to your application architecture.',
        bestFor: 'Growing products that need durable infrastructure',
        startingPrice: '₹50,000',
        technologies: ['AWS', 'PostgreSQL', 'CDN', 'Security'],
        icon: 'cloud',
        cta: contactCta('Review Infrastructure'),
      },
    ],
  },
] as const;

export const SERVICES_WHY: readonly ServicesWhyItem[] = [
  {
    id: 'clarity',
    title: 'Scope written before build',
    description: 'You get clear deliverables, timelines, and ownership — not vague retainers.',
    icon: 'check',
  },
  {
    id: 'founder',
    title: 'Founder-led engineering',
    description: 'Senior attention on architecture and quality, not endless junior handoffs.',
    icon: 'rocket',
  },
  {
    id: 'outcomes',
    title: 'Business outcomes first',
    description: 'We design for bookings, conversion, ops speed, and measurable ROI.',
    icon: 'trending-up',
  },
  {
    id: 'stack',
    title: 'Modern, maintainable stack',
    description: 'Next.js, React, Node, and cloud patterns built for long-term ownership.',
    icon: 'code',
  },
] as const;

export const SERVICES_WHY_META = {
  eyebrow: 'Why Bitcraftly',
  title: 'Why businesses choose Bitcraftly',
  description:
    'Premium delivery with practical communication — enterprise quality without enterprise bureaucracy.',
} as const;

export const SERVICES_PROCESS: readonly ServicesProcessStep[] = [
  {
    id: 'discover',
    step: '01',
    title: 'Discovery',
    description:
      'Goals, constraints, users, and success metrics — documented before engineering starts.',
  },
  {
    id: 'design',
    step: '02',
    title: 'Solution design',
    description: 'Architecture, UX direction, timeline, and a written estimate in plain language.',
  },
  {
    id: 'build',
    step: '03',
    title: 'Build & iterate',
    description: 'Milestone delivery with demos on real progress — not slide decks.',
  },
  {
    id: 'launch',
    step: '04',
    title: 'Launch & support',
    description: 'Go-live checklist, handoff, and optional ongoing care after launch.',
  },
] as const;

export const SERVICES_PROCESS_META = {
  eyebrow: 'Process',
  title: 'Development process',
  description: 'A predictable path from idea to production — designed for clarity and control.',
} as const;

export const SERVICES_TECH_STACK: readonly ServicesTechGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    title: 'Backend',
    items: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL'],
  },
  {
    id: 'ai',
    title: 'AI',
    items: ['OpenAI', 'Gemini', 'RAG', 'Agents'],
  },
  {
    id: 'cloud',
    title: 'Cloud',
    items: ['AWS', 'Vercel', 'CI/CD', 'Monitoring'],
  },
] as const;

export const SERVICES_TECH_META = {
  eyebrow: 'Technology',
  title: 'Technology stack',
  description:
    'Proven tools chosen for performance, maintainability, and long-term product ownership.',
} as const;

export const SERVICES_INDUSTRIES: readonly ServicesIndustryItem[] = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Booking, clinics, and care operations platforms.',
    icon: 'calendar',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Storefronts, catalogs, and conversion systems.',
    icon: 'globe',
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Learning platforms, institutes, and enrollment flows.',
    icon: 'sparkles',
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'Project showcases, lead capture, and sales follow-up.',
    icon: 'map-pin',
  },
  {
    id: 'saas',
    title: 'SaaS & CRM',
    description: 'Dashboards, pipelines, and multi-tenant products.',
    icon: 'layout-grid',
  },
  {
    id: 'local',
    title: 'Local Services',
    description: 'Marketplaces and lead engines for service businesses.',
    icon: 'headset',
  },
] as const;

export const SERVICES_INDUSTRIES_META = {
  eyebrow: 'Industries',
  title: 'Industries we serve',
  description: 'Domain-aware delivery across sectors where software must create measurable value.',
} as const;

export const SERVICES_FAQ: readonly ServicesFaqItem[] = [
  {
    id: 'start',
    question: 'How do we start a project?',
    answer:
      'Book a discovery call. We clarify goals, recommend the right service line, and share a written scope with timeline and investment.',
  },
  {
    id: 'pricing',
    question: 'Are starting prices fixed packages?',
    answer:
      'Starting prices indicate entry bands. Final quotes depend on scope, integrations, and complexity — always written before build begins.',
  },
  {
    id: 'timeline',
    question: 'How long does a typical engagement take?',
    answer:
      'Landing pages and business sites often ship in weeks. Custom apps, CRM/ERP, and AI systems follow milestone plans based on discovery.',
  },
  {
    id: 'ownership',
    question: 'Who owns the code and assets?',
    answer:
      'You own the product assets delivered under the engagement. We document handoff so your team or future partners can maintain the system.',
  },
  {
    id: 'ai-fit',
    question: 'Do every project need AI?',
    answer:
      'No. We recommend AI only when it improves speed, conversion, or operations. Otherwise we ship strong UX and reliable workflows first.',
  },
  {
    id: 'support',
    question: 'Do you support after launch?',
    answer:
      'Yes. Optional maintenance and iteration retainers cover updates, monitoring, and continuous improvements after go-live.',
  },
] as const;

export const SERVICES_FAQ_META = {
  eyebrow: 'FAQ',
  title: 'Frequently asked questions',
  description: 'Straight answers on scope, pricing, timelines, and ownership.',
  viewAllLabel: 'View all FAQs',
  viewAllHref: ROUTES.resourcesFaq,
} as const;

export const SERVICES_FINAL_CTA = {
  eyebrow: 'Next step',
  title: 'Ready to build with Bitcraftly?',
  description:
    'Tell us what you need — website, application, AI system, or full product team. We’ll recommend the clearest path forward.',
  primaryCta: {
    label: 'Book Discovery Call',
    href: ROUTES.contact,
  },
  secondaryCta: {
    label: 'View Pricing',
    href: ROUTES.pricing,
  },
  trustItems: ['No obligation discovery', 'Written proposals', 'Founder-led scoping'] as const,
} as const;
