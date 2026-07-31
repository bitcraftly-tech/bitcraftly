import type { IconName } from '@/components/ui/icon';

export interface SolutionFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SolutionProcessStep {
  title: string;
  description: string;
  icon?: IconName;
}

/** CMS-ready long-form content for a single solution page. */
export interface SolutionPageContent {
  slug: string;
  label: string;
  icon: IconName;
  groupId: string;
  groupTitle: string;
  summary: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  intro: string;
  highlights: readonly string[];
  outcomes: readonly string[];
  process: readonly SolutionProcessStep[];
  faqs: readonly SolutionFaqItem[];
  relatedSolutionSlugs: readonly string[];
  /** Absolute paths to related services or hubs */
  relatedServiceHrefs: readonly string[];
  keywords: readonly string[];
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
}

/** Featured landing cards — image media or label fallback (discriminated). */
export type SolutionsFeaturedItem =
  | {
      slug: string;
      title: string;
      description: string;
      imageLabel: string;
      imageSrc: string;
      features: readonly string[];
      benefits: readonly string[];
      ctaLabel: string;
    }
  | {
      slug: string;
      title: string;
      description: string;
      imageLabel: string;
      imageSrc?: undefined;
      features: readonly string[];
      benefits: readonly string[];
      ctaLabel: string;
    };

export interface SolutionCardModel {
  slug: string;
  title: string;
  description: string;
  href: string;
  icon: IconName;
  ctaLabel: string;
  badge?: 'Popular' | 'Enterprise' | 'Recommended' | 'New';
}

export interface RelatedLink {
  label: string;
  href: string;
}
