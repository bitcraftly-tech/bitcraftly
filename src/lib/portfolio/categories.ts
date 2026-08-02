import type { PortfolioItem } from '@/lib/portfolioItems';

/** Showcase filter categories — 8 skill areas + all */
export type PortfolioCategoryId =
  | 'all'
  | 'react-projects'
  | 'nextjs-projects'
  | 'ai-powered'
  | 'business-websites'
  | 'dashboard-admin'
  | 'landing-pages'
  | 'startup-mvp'
  | 'ui-systems';

export type PortfolioCategoryMeta = {
  id: PortfolioCategoryId;
  label: string;
  shortLabel: string;
  icon: string;
};

export const PORTFOLIO_CATEGORIES: PortfolioCategoryMeta[] = [
  { id: 'all', label: 'All Projects', shortLabel: 'All', icon: 'grid' },
  { id: 'react-projects', label: 'React.js', shortLabel: 'React', icon: 'react' },
  { id: 'nextjs-projects', label: 'Next.js', shortLabel: 'Next', icon: 'next' },
  { id: 'ai-powered', label: 'AI Solutions', shortLabel: 'AI', icon: 'ai' },
  { id: 'business-websites', label: 'Websites', shortLabel: 'Web', icon: 'web' },
  { id: 'dashboard-admin', label: 'Dashboards', shortLabel: 'Dash', icon: 'dash' },
  { id: 'landing-pages', label: 'Landing Pages', shortLabel: 'Landing', icon: 'landing' },
  { id: 'startup-mvp', label: 'MVPs', shortLabel: 'MVP', icon: 'mvp' },
  { id: 'ui-systems', label: 'UI Systems', shortLabel: 'UI', icon: 'ui' },
];

const hasTech = (item: PortfolioItem, pattern: RegExp) =>
  item.techStack.some((t) => pattern.test(t));

const matchers: Record<Exclude<PortfolioCategoryId, 'all'>, (item: PortfolioItem) => boolean> = {
  'react-projects': (i) => hasTech(i, /react/i) || i.projectFocus === 'React.js',
  'nextjs-projects': (i) => hasTech(i, /next/i) || i.projectFocus === 'Next.js',
  'ai-powered': (i) =>
    i.categories.includes('ai-powered') ||
    hasTech(i, /ai|chat/i) ||
    i.projectFocus === 'AI-powered',
  'business-websites': (i) =>
    i.categories.includes('business-websites') ||
    i.projectFocus === 'Business website' ||
    i.tag === 'Website',
  'dashboard-admin': (i) =>
    i.categories.includes('dashboard-admin') ||
    i.projectFocus === 'Dashboard / admin' ||
    hasTech(i, /dashboard|admin/i),
  'landing-pages': (i) =>
    hasTech(i, /landing/i) || i.title.toLowerCase().includes('local services'),
  'startup-mvp': (i) =>
    i.categories.includes('startup-saas') ||
    i.projectFocus === 'Startup frontend' ||
    i.tag === 'Product UI',
  'ui-systems': (i) => i.tag === 'Product UI' || hasTech(i, /typescript|component|ui system/i),
};

export function filterPortfolioByCategory(
  items: PortfolioItem[],
  category: PortfolioCategoryId,
): PortfolioItem[] {
  if (category === 'all') return items;
  const match = matchers[category];
  return items.filter(match);
}

export function countByCategory(items: PortfolioItem[], category: PortfolioCategoryId): number {
  return filterPortfolioByCategory(items, category).length;
}
