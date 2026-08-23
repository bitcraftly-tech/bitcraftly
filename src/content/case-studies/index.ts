import { CS_EDUNEXT } from './projects/edunext-learning-platform';
import { CS_LOCALLEAD } from './projects/locallead-services-engine';
import { CS_MEDANTA } from './projects/medanta-care-ops-portal';
import { CS_RETAILOPS } from './projects/retailops-commerce-suite';
import { CS_SAASPRO } from './projects/saaspro-analytics-platform';
import { CS_SHRISHTI } from './projects/shrishti-cloud-kitchen';
import type { CaseStudy } from './types';

export type {
  CaseStudy,
  CaseStudyArchitectureLayer,
  CaseStudyMetric,
  CaseStudyScreenshot,
  CaseStudyTestimonial,
} from './types';

/** Canonical catalog — featured / newest first. */
export const CASE_STUDIES: readonly CaseStudy[] = [
  CS_SAASPRO,
  CS_SHRISHTI,
  CS_MEDANTA,
  CS_RETAILOPS,
  CS_EDUNEXT,
  CS_LOCALLEAD,
] as const;

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export function getAllCaseStudySlugs(): readonly string[] {
  return CASE_STUDIES.map((study) => study.slug);
}

export function getCaseStudyHref(slug: string): string {
  return `/work/${slug}`;
}

export function hasApprovedCaseStudyQuote(study: CaseStudy): boolean {
  return study.quoteApproved === true && Boolean(study.testimonial?.quote.trim());
}

export function hasApprovedCaseStudyResults(study: CaseStudy): boolean {
  return study.resultsApproved === true && study.results != null;
}

export function isCaseStudyIndexable(study: CaseStudy): boolean {
  return study.indexApproved === true;
}

export function getCaseStudyPublishedAt(study: CaseStudy): string | undefined {
  const value = study.publishedAt?.trim();
  if (!value) {
    return undefined;
  }

  if (!/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/.test(value)) {
    return undefined;
  }

  if (Number.isNaN(Date.parse(value))) {
    return undefined;
  }

  return value;
}

export function getRelatedCaseStudies(study: CaseStudy, limit = 3): readonly CaseStudy[] {
  const related = study.relatedSlugs
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((item): item is CaseStudy => Boolean(item));

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  const fallback = CASE_STUDIES.filter(
    (item) => item.slug !== study.slug && !related.some((entry) => entry.slug === item.slug),
  ).slice(0, limit - related.length);

  return [...related, ...fallback];
}
