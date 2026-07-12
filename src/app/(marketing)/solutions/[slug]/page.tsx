import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import {
  getSolutionBySlug,
  getSolutionHref,
  SOLUTION_SLUGS,
} from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

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
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return createPageMetadata({
      title: "Solution",
      description: "Bitcraftly business and AI solutions.",
      path: getSolutionHref(slug),
    });
  }

  return createPageMetadata({
    title: solution.label,
    description: solution.description,
    path: getSolutionHref(slug),
  });
}

export default async function SolutionSlugPage({
  params,
}: SolutionSlugPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return (
    <MarketingPageShell
      title={solution.label}
      description={solution.description}
      headingId={`${solution.slug}-page-heading`}
    />
  );
}
