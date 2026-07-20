import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getSolutionBySlug,
  getSolutionHref,
  SOLUTION_SLUGS,
} from "@/constants/navigation";
import {
  getSolutionPageContent,
  SolutionDetailPage,
} from "@/features/solutions";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";
import { createNoIndexMetadata } from "@/lib/seo/noindex-metadata";

interface SolutionSlugPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SOLUTION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SolutionSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getSolutionPageContent(slug);
  const solution = getSolutionBySlug(slug);

  if (!content || !solution) {
    return createNoIndexMetadata();
  }

  return createPageMetadata({
    title: content.label,
    description: content.metaDescription,
    path: getSolutionHref(slug),
    keywords: content.keywords,
  });
}

export default async function SolutionSlugPage({
  params,
}: SolutionSlugPageProps) {
  const { slug } = await params;
  const content = getSolutionPageContent(slug);

  if (!content) {
    notFound();
  }

  return <SolutionDetailPage content={content} />;
}
