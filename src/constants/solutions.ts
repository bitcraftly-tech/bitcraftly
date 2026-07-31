import type { NavFeaturedCard, NavGroup, NavLinkItem } from './nav.types';

const SOLUTIONS_BASE = '/solutions';

export const SOLUTION_GROUPS = [
  {
    id: 'business-solutions',
    title: 'Business Solutions',
    items: [
      {
        slug: 'crm',
        label: 'CRM Solutions',
        description: 'Pipelines, automation, and relationship systems.',
        icon: 'message',
      },
      {
        slug: 'erp',
        label: 'ERP Solutions',
        description: 'Operations across finance, inventory, and teams.',
        icon: 'workflow',
      },
      {
        slug: 'cms',
        label: 'CMS Solutions',
        description: 'Flexible content platforms for growth teams.',
        icon: 'quote',
      },
      {
        slug: 'saas-platforms',
        label: 'SaaS Platforms',
        description: 'Multi-tenant products built to scale.',
        icon: 'rocket',
      },
      {
        slug: 'internal-business-tools',
        label: 'Internal Business Tools',
        description: 'Custom tools that streamline daily operations.',
        icon: 'database',
      },
      {
        slug: 'enterprise-portals',
        label: 'Enterprise Portals',
        description: 'Secure portals for partners, staff, and customers.',
        icon: 'shield',
      },
    ],
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    items: [
      {
        slug: 'ai-assistants',
        label: 'AI Assistants',
        description: 'Assistants that support teams and customers.',
        icon: 'bot',
      },
      {
        slug: 'ai-automation',
        label: 'AI Automation',
        description: 'Intelligent automation across business workflows.',
        icon: 'zap',
      },
      {
        slug: 'ai-analytics',
        label: 'AI Analytics',
        description: 'Insights and predictions from your data.',
        icon: 'trending-up',
      },
      {
        slug: 'ai-workflows',
        label: 'AI Workflows',
        description: 'Orchestrated AI steps across systems.',
        icon: 'workflow',
      },
      {
        slug: 'knowledge-base-ai',
        label: 'Knowledge Base AI',
        description: 'Searchable knowledge powered by your content.',
        icon: 'sparkles',
      },
    ],
  },
] as const satisfies readonly NavGroup[];

export const ALL_SOLUTIONS: readonly NavLinkItem[] = SOLUTION_GROUPS.flatMap((group) => [
  ...group.items,
]);

export const SOLUTION_SLUGS = ALL_SOLUTIONS.map((solution) => solution.slug);

export function getSolutionBySlug(slug: string): NavLinkItem | undefined {
  return ALL_SOLUTIONS.find((solution) => solution.slug === slug);
}

export function getSolutionHref(slug: string): string {
  return `${SOLUTIONS_BASE}/${slug}`;
}

export const SOLUTIONS_FEATURED: NavFeaturedCard = {
  eyebrow: 'Featured Solution',
  label: 'Digital Transformation',
  description: 'Modernize operations with AI, platforms, and automation.',
  href: getSolutionHref('ai-automation'),
  icon: 'sparkles',
  ctaLabel: 'Learn More',
  badge: 'Popular',
  highlights: [
    'Process modernization',
    'AI-enabled workflows',
    'Platform consolidation',
    'Measurable ROI',
  ],
};
