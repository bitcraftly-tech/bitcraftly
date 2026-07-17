import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
  getCaseStudyHref,
} from "@/content/case-studies";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

/** Older `/work/case-studies/*` slugs → canonical `/work/[slug]` case studies. */
const LEGACY_CASE_STUDY_REDIRECTS: Record<string, string> = {
  "next-gen-saas-platform": "saaspro-analytics-platform",
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

export async function generateMetadata({
  params,
}: LegacyCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = LEGACY_CASE_STUDY_REDIRECTS[slug] ?? slug;
  const study = getCaseStudyBySlug(canonicalSlug);

  if (!study) {
    return createPageMetadata({
      title: "Case Study | Work",
      description: "Bitcraftly case study detail page.",
      path: getCaseStudyHref(canonicalSlug),
    });
  }

  return createPageMetadata({
    title: study.seoTitle ?? `${study.title} | Case Study`,
    description: study.seoDescription ?? study.description,
    path: getCaseStudyHref(study.slug),
    image: study.coverImage,
  });
}

export default async function LegacyWorkCaseStudyPage({
  params,
}: LegacyCaseStudyPageProps) {
  const { slug } = await params;
  const canonicalSlug = LEGACY_CASE_STUDY_REDIRECTS[slug] ?? slug;
  const study = getCaseStudyBySlug(canonicalSlug);

  if (!study) {
    notFound();
  }

  permanentRedirect(getCaseStudyHref(study.slug));
}
