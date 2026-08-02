import type { IconName } from '@/components/ui/icon';

export type WorkAccent = 'teal' | 'indigo' | 'amber' | 'rose' | 'sky' | 'emerald';

/** Portfolio category taxonomy (Sprint 5). */
export type WorkCategoryId =
  | 'web-applications'
  | 'enterprise-software'
  | 'crm'
  | 'erp'
  | 'ai-automation'
  | 'saas'
  | 'mobile-apps'
  | 'dashboards'
  | 'cloud';

export type WorkFilterId = 'all' | 'featured' | WorkCategoryId | (string & {});

export interface WorkMetric {
  id: string;
  value: string;
  label: string;
}

export interface WorkProject {
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
  /** Accessible alt for portfolio screenshots. */
  coverImageAlt?: string;
  /** Browser chrome hostname hint. */
  previewHost?: string;
  industry: string;
  industrySlug?: string;
  businessGoal: string;
  services: readonly string[];
  techStack: readonly string[];
  categories: readonly WorkCategoryId[];
  filterIds: readonly WorkFilterId[];
  duration: string;
  timeline?: string;
  result: string;
  outcome: string;
  problem: string;
  solution: string;
  metrics: readonly WorkMetric[];
  featured?: boolean;
  /** Live shipped work vs upcoming / in-progress showcase. */
  status?: 'live' | 'future';
  /** Label on media (Live client / Interactive demo / Future). */
  badge?: string;
  /** Public live demo or production URL. */
  liveUrl?: string;
  liveExternal?: boolean;
  year?: number;
  accent: WorkAccent;
  gallery?: readonly string[];
  caseStudySlug?: string;
  testimonialId?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface WorkCategory {
  id: WorkCategoryId;
  label: string;
  description: string;
  href: string;
  icon: IconName;
}

export interface WorkResultKpi {
  id: string;
  value: string;
  label: string;
  hint?: string;
  icon: IconName;
  tone: 'primary' | 'accent' | 'emerald' | 'amber' | 'sky';
  /** Visual treatment on the KPI card (CSS-only micro chart). */
  chart: 'ring' | 'sparkline' | 'bars' | 'trend';
  /** 0–100 progress for ring charts / relative bar strength. */
  progress: number;
  trend?: 'up' | 'down';
}

export interface WorkResultHighlight {
  id: string;
  value: string;
  label: string;
}

export interface WorkProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
  items: readonly string[];
  icon: IconName;
  tone: 'primary' | 'accent' | 'emerald' | 'amber' | 'sky';
}

export interface WorkProcessTrustItem {
  id: string;
  label: string;
  icon: IconName;
}

export interface WorkTechGroup {
  id: string;
  category: 'Frontend' | 'Backend' | 'Cloud' | 'AI' | 'Automation' | 'Database';
  icon: IconName;
  tone: 'primary' | 'accent' | 'emerald' | 'amber' | 'sky' | 'rose';
  items: readonly string[];
}

export interface WorkTestimonial {
  id: string;
  quote: string;
  attribution: string;
  role: string;
  industry?: string;
  projectSlug?: string;
  /** When false, UI must show empty/placeholder state — never invent quotes. */
  approved: boolean;
}

export interface WorkTrustPillar {
  id: string;
  title: string;
  items: readonly string[];
  icon: IconName;
  tone: 'primary' | 'accent' | 'emerald' | 'amber' | 'sky';
}

export interface WorkTrustFallbackTopic {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface WorkTrustBandItem {
  id: string;
  label: string;
}

export interface WorkFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface WorkRelatedService {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: IconName;
  ctaLabel: string;
}

export interface WorkCaseStudy {
  slug: string;
  projectSlug: string;
  title: string;
  description: string;
  challenge: string;
  approach: string;
  results: string;
  metrics: readonly WorkMetric[];
}

export interface WorkHubContent {
  slug: string;
  title: string;
  description: string;
  filterPreset: WorkFilterId;
  seoTitle: string;
  seoDescription: string;
}

export interface WorkLandingSectionMeta {
  id: string;
  title: string;
  description: string;
}
