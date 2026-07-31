import type { IconName } from '@/components/ui/icon';
import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';

export const RESOURCES_LANDING = {
  eyebrow: 'Resources',
  title: 'Practical resources for',
  titleHighlight: 'AI-powered products',
  description:
    'Guides, FAQs, case studies, and company pages to help you plan, build, and scale with Bitcraftly.',
  primaryCta: {
    label: NAV_ACTIONS.freeConsultation.label,
    href: `${ROUTES.contact}?source=resources`,
  },
  secondaryCta: {
    label: 'Browse guides',
    href: '/resources/guides',
  },
} as const;

export const RESOURCES_CTA_COPY = {
  heading: 'Ready to turn insights into a build plan?',
  description:
    'Book a free consultation — we’ll map scope, stack, and next steps for your product.',
  primaryCta: {
    label: NAV_ACTIONS.freeConsultation.label,
    href: `${ROUTES.contact}?source=resources`,
  },
  tertiaryCta: {
    label: 'View services',
    href: ROUTES.services,
  },
  trust: ['Free discovery session', 'Written next steps', 'Response within 24 hours'],
} as const;

export interface ResourceTopicItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  href?: string;
  tags?: readonly string[];
}

export interface ResourceTopicSection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: readonly ResourceTopicItem[];
}

export interface ResourceTopicPageContent {
  slug: 'guides' | 'documentation';
  eyebrow: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  primaryCtaLabel: string;
  sections: readonly ResourceTopicSection[];
}

export const RESOURCES_GUIDES: ResourceTopicPageContent = {
  slug: 'guides',
  eyebrow: 'Guides',
  title: 'Practical playbooks for product teams',
  description:
    'Step-by-step guides for scoping, shipping, and scaling AI-powered digital products with Bitcraftly.',
  seoTitle: 'Guides | Resources',
  seoDescription: 'Practical playbooks for product and engineering teams building with Bitcraftly.',
  primaryCtaLabel: 'Discuss your roadmap',
  sections: [
    {
      id: 'product',
      eyebrow: 'Product',
      title: 'From idea to scoped delivery',
      description:
        'Use these playbooks before you write a line of code — so scope, stack, and success metrics stay clear.',
      items: [
        {
          id: 'mvp-scope',
          title: 'MVP scoping checklist',
          description:
            'Define must-have flows, cut noise, and leave room for learning after launch.',
          icon: 'sparkles',
          tags: ['Discovery', 'Scope'],
        },
        {
          id: 'ai-readiness',
          title: 'AI readiness guide',
          description:
            'Decide where AI creates leverage — and where deterministic workflows still win.',
          icon: 'brain',
          tags: ['AI', 'Strategy'],
        },
        {
          id: 'build-vs-buy',
          title: 'Build vs buy for operators',
          description:
            'A practical framework for portals, automation, and SaaS when speed matters.',
          icon: 'layout-grid',
          tags: ['Architecture'],
        },
      ],
    },
    {
      id: 'delivery',
      eyebrow: 'Delivery',
      title: 'How strong teams ship',
      description:
        'Delivery patterns we reuse across client work — reviews, handoff, and post-launch ownership.',
      items: [
        {
          id: 'sprint-cadence',
          title: 'Sprint cadence that stays honest',
          description: 'Keep demos useful, blockers visible, and scope changes intentional.',
          icon: 'zap',
          tags: ['Process'],
        },
        {
          id: 'handoff',
          title: 'Handoff & documentation pack',
          description: 'What to leave behind so your team can operate and extend the product.',
          icon: 'check',
          tags: ['Ops'],
        },
        {
          id: 'launch-checklist',
          title: 'Launch checklist',
          description: 'SEO, analytics, access, monitoring, and support paths before go-live.',
          icon: 'rocket',
          tags: ['Launch'],
        },
      ],
    },
  ],
};

export const RESOURCES_DOCUMENTATION: ResourceTopicPageContent = {
  slug: 'documentation',
  eyebrow: 'Documentation',
  title: 'Technical references and implementation notes',
  description:
    'Architecture notes, stack conventions, and implementation guidance from Bitcraftly delivery work.',
  seoTitle: 'Documentation | Resources',
  seoDescription: 'Technical references and implementation notes from Bitcraftly.',
  primaryCtaLabel: 'Talk to an engineer',
  sections: [
    {
      id: 'stack',
      eyebrow: 'Stack',
      title: 'Reference architecture notes',
      description: 'Opinionated starting points for Next.js, FastAPI, and PostgreSQL products.',
      items: [
        {
          id: 'next-app-router',
          title: 'Next.js App Router patterns',
          description: 'Server Components first, thin routes, and feature-owned UI modules.',
          icon: 'globe',
          tags: ['Frontend'],
        },
        {
          id: 'fastapi-apis',
          title: 'FastAPI service layout',
          description: 'Auth, validation, and module boundaries for maintainable backends.',
          icon: 'database',
          tags: ['Backend'],
        },
        {
          id: 'data-model',
          title: 'PostgreSQL modeling basics',
          description: 'Practical schema choices for multi-tenant and operator products.',
          icon: 'code',
          tags: ['Data'],
        },
      ],
    },
    {
      id: 'quality',
      eyebrow: 'Quality',
      title: 'Shipping with confidence',
      description:
        'Accessibility, performance, and SEO baselines we treat as default — not extras.',
      items: [
        {
          id: 'a11y',
          title: 'Accessibility checklist',
          description: 'WCAG-oriented defaults for keyboard, focus, semantics, and motion.',
          icon: 'shield',
          tags: ['A11y'],
        },
        {
          id: 'perf',
          title: 'Performance budget notes',
          description: 'Image, bundle, and rendering choices that keep marketing pages fast.',
          icon: 'zap',
          tags: ['Performance'],
        },
        {
          id: 'seo',
          title: 'SEO metadata conventions',
          description: 'Titles, canonicals, breadcrumbs, and JSON-LD patterns we reuse.',
          icon: 'trending-up',
          tags: ['SEO'],
        },
      ],
    },
  ],
};

export const RESOURCES_FAQ_COPY = {
  eyebrow: 'FAQ',
  title: 'Frequently asked questions',
  description:
    'Answers to common questions about working with Bitcraftly — from discovery and delivery to support.',
} as const;

export function getResourceTopicBySlug(slug: string): ResourceTopicPageContent | undefined {
  if (slug === 'guides') return RESOURCES_GUIDES;
  if (slug === 'documentation') return RESOURCES_DOCUMENTATION;
  return undefined;
}
