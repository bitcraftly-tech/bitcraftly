import type { IconName } from '@/components/ui/icon';
import { getIndustryHref, SECTION_IDS } from '@/constants/navigation';

export const BROWSE_INDUSTRY_ID = SECTION_IDS.industries;
export const BROWSE_INDUSTRY_HEADING_ID = 'browse-by-industry-heading';

export const BROWSE_INDUSTRY_LABEL = 'Browse by Industry';
export const BROWSE_INDUSTRY_HEADING = 'Choose your industry. Explore premium website systems.';
export const BROWSE_INDUSTRY_DESCRIPTION =
  'Industry-ready designs with AI features, dashboards, and plug-and-play modules — built to feel premium from the first click.';

export const BROWSE_INDUSTRY_DESIGNS_LABEL = '5 Premium Designs';

export interface BrowseIndustryCard {
  id: string;
  slug: string;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  accent: string;
  icon: IconName;
}

export const BROWSE_INDUSTRY_CARDS: readonly BrowseIndustryCard[] = [
  {
    id: 'healthcare',
    slug: 'healthcare',
    name: 'Healthcare',
    href: getIndustryHref('healthcare'),
    imageSrc:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Healthcare professionals in a modern clinic',
    accent: 'care',
    icon: 'shield',
  },
  {
    id: 'education',
    slug: 'education',
    name: 'Education',
    href: getIndustryHref('education'),
    imageSrc:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Students collaborating in a modern learning space',
    accent: 'learn',
    icon: 'message',
  },
  {
    id: 'fintech',
    slug: 'fintech',
    name: 'FinTech',
    href: getIndustryHref('fintech'),
    imageSrc:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Fintech dashboard and mobile payments',
    accent: 'finance',
    icon: 'trending-up',
  },
  {
    id: 'retail-ecommerce',
    slug: 'retail-ecommerce',
    name: 'Retail & Ecommerce',
    href: getIndustryHref('retail-ecommerce'),
    imageSrc:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Premium retail storefront experience',
    accent: 'shop',
    icon: 'sparkles',
  },
  {
    id: 'real-estate',
    slug: 'real-estate',
    name: 'Real Estate',
    href: getIndustryHref('real-estate'),
    imageSrc:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern real estate property exterior',
    accent: 'property',
    icon: 'globe',
  },
  {
    id: 'saas',
    slug: 'saas',
    name: 'SaaS',
    href: getIndustryHref('saas'),
    imageSrc:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'SaaS product analytics on a laptop',
    accent: 'saas',
    icon: 'cloud',
  },
] as const;

export const BROWSE_INDUSTRY_DEFAULT_ACTIVE = BROWSE_INDUSTRY_CARDS[0].id;
