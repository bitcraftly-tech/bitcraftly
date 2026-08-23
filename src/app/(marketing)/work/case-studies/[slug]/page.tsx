import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
  getCaseStudyHref,
  isCaseStudyIndexable,
} from '@/content/case-studies';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';
import { createNoIndexMetadata } from '@/lib/seo/noindex-metadata';

/** Older `/work/case-studies/*` slugs → canonical `/work/[slug]` case studies. */
const LEGACY_CASE_STUDY_REDIRECTS: Record<string, string> = {
  'next-gen-saas-platform': 'saaspro-analytics-platform',
};

interface LegacyCaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const contentSlugs = getAllCaseStudySlugs();
  const legacySlugs = Object.keys(LEGACY_CASE_STUDY_REDIRECTS);
  return Array.from(new Set([...contentSlugs, ...legacySlugs])).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: LegacyCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = LEGACY_CASE_STUDY_REDIRECTS[slug] ?? slug;
  const study = getCaseStudyBySlug(canonicalSlug);

  if (!study) {
    return createNoIndexMetadata();
  }

  const pageMetadata = createPageMetadata({
    title: study.seoTitle ?? `${study.title} | Case Study`,
    description: study.subtitle,
    path: getCaseStudyHref(study.slug),
    image: study.coverImage,
  });

  return isCaseStudyIndexable(study) ? pageMetadata : createNoIndexMetadata(pageMetadata);
}

export default async function LegacyWorkCaseStudyPage({ params }: LegacyCaseStudyPageProps) {
  const { slug } = await params;
  const canonicalSlug = LEGACY_CASE_STUDY_REDIRECTS[slug] ?? slug;
  const study = getCaseStudyBySlug(canonicalSlug);

  if (!study) {
    notFound();
  }

  permanentRedirect(getCaseStudyHref(study.slug));
}
