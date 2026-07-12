import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import {
  getIndustryBySlug,
  getIndustryHref,
  INDUSTRY_SLUGS,
} from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

interface IndustrySlugPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: IndustrySlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return createPageMetadata({
      title: "Industry",
      description: "Bitcraftly industry solutions.",
      path: getIndustryHref(slug),
    });
  }

  return createPageMetadata({
    title: industry.label,
    description: industry.description,
    path: getIndustryHref(slug),
  });
}

export default async function IndustrySlugPage({
  params,
}: IndustrySlugPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  return (
    <MarketingPageShell
      title={industry.label}
      description={industry.description}
      headingId={`${industry.slug}-page-heading`}
    />
  );
}
