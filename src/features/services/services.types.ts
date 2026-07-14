import type { IconName } from "@/components/ui/icon";

export interface ServiceFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

/** CMS-ready long-form content for a single service page. */
export interface ServicePageContent {
  slug: string;
  label: string;
  icon: IconName;
  groupId: string;
  groupTitle: string;
  /** Short nav/card blurb */
  summary: string;
  /** SEO meta description */
  metaDescription: string;
  /** Page H1 support line / hero eyebrow */
  eyebrow: string;
  /** Hero headline (can match label or be richer) */
  headline: string;
  /** Lead paragraph under H1 */
  intro: string;
  highlights: readonly string[];
  outcomes: readonly string[];
  process: readonly ServiceProcessStep[];
  faqs: readonly ServiceFaqItem[];
  relatedServiceSlugs: readonly string[];
  keywords: readonly string[];
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
}

export type ServiceCardBadge =
  | "Popular"
  | "Enterprise"
  | "Recommended"
  | "New";

export interface ServiceCardModel {
  slug: string;
  title: string;
  description: string;
  href: string;
  icon: IconName;
  ctaLabel: string;
  badge?: ServiceCardBadge;
  /** Extra tokens for search/filter matching */
  tags?: readonly string[];
  bestFor?: string;
  timeline?: string;
}

export interface RelatedLink {
  label: string;
  href: string;
  description?: string;
  icon?: IconName;
}

export interface ServiceGroupIntro {
  id: string;
  label: string;
  title: string;
  description: string;
}

export interface ServiceHubCard {
  href: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface ServiceGroupRelatedLinks {
  caseStudies: readonly RelatedLink[];
  technologies: readonly RelatedLink[];
  industries: readonly RelatedLink[];
  blog: readonly RelatedLink[];
}

export interface FeaturedServiceBlock {
  groupId: string;
  slug: string;
  title: string;
  description: string;
  useCases: readonly string[];
  techStack: readonly string[];
  timeline: string;
  ctaLabel: string;
  badge?: ServiceCardBadge;
  icon: IconName;
}

export interface ServiceComparisonOption {
  id: string;
  title: string;
  bestFor: string;
  timeline: string;
  outcome: string;
  href: string;
  icon: IconName;
}
