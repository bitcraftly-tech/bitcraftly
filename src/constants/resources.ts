import type { NavFeaturedCard, NavGroup, NavLinkItem } from './nav.types';

export const RESOURCE_GROUPS = [
  {
    id: 'learning',
    title: 'Learning',
    items: [
      {
        slug: 'blog',
        label: 'Blog',
        description: 'Product, AI, and engineering insights.',
        icon: 'quote',
        href: '/blog',
      },
      {
        slug: 'case-studies',
        label: 'Case Studies',
        description: 'Outcomes and delivery stories.',
        icon: 'star',
        href: '/case-studies',
      },
      {
        slug: 'documentation',
        label: 'Documentation',
        description: 'Technical references and notes.',
        icon: 'code',
        href: '/resources/documentation',
      },
      {
        slug: 'guides',
        label: 'Guides',
        description: 'Practical playbooks for teams.',
        icon: 'sparkles',
        href: '/resources/guides',
      },
      {
        slug: 'faqs',
        label: 'FAQs',
        description: 'Process, timelines, and engagement.',
        icon: 'message',
        href: '/resources/faq',
      },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    items: [
      {
        slug: 'careers',
        label: 'Careers',
        description: 'Join the Bitcraftly team.',
        icon: 'rocket',
        href: '/careers',
      },
      {
        slug: 'contact',
        label: 'Contact',
        description: 'Book a call or start a project.',
        icon: 'message',
        href: '/contact',
      },
      {
        slug: 'events',
        label: 'Events',
        description: 'Talks, webinars, and community.',
        icon: 'calendar',
        href: '/events',
      },
      {
        slug: 'press',
        label: 'Press',
        description: 'News and media resources.',
        icon: 'trending-up',
        href: '/press',
      },
      {
        slug: 'privacy-policy',
        label: 'Privacy Policy',
        description: 'How we handle your data.',
        icon: 'shield',
        href: '/privacy',
      },
      {
        slug: 'terms',
        label: 'Terms',
        description: 'Terms of use for our services.',
        icon: 'database',
        href: '/terms',
      },
    ],
  },
] as const satisfies readonly NavGroup[];

export const ALL_RESOURCES: readonly NavLinkItem[] = RESOURCE_GROUPS.flatMap((group) => [
  ...group.items,
]);

export function getResourceBySlug(slug: string): NavLinkItem | undefined {
  return ALL_RESOURCES.find((resource) => resource.slug === slug);
}

export const RESOURCES_FEATURED: NavFeaturedCard = {
  eyebrow: 'Featured',
  label: 'Latest Insights',
  description: 'Fresh ideas on AI, product, and digital engineering.',
  href: '/blog',
  icon: 'quote',
  ctaLabel: 'Read Blog',
  badge: 'New',
  highlights: [
    'AI engineering notes',
    'Delivery playbooks',
    'Case study lessons',
    'Product strategy',
  ],
};
