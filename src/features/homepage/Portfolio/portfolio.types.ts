export type PortfolioFilterId =
  'all' | 'ai' | 'saas' | 'healthcare' | 'education' | 'retail' | 'websites' | 'ecommerce';

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  industry: string;
  badge: string;
  filterIds: readonly PortfolioFilterId[];
  technologies: readonly string[];
  imageSrc: string;
  imageAlt: string;
  caseStudyHref: string;
  livePreviewHref: string;
  livePreviewExternal?: boolean;
}

export interface PortfolioFilter {
  id: PortfolioFilterId;
  label: string;
}

export interface PortfolioCta {
  label: string;
  href: string;
}
