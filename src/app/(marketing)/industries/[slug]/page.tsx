import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';
import { createNoIndexMetadata } from '@/lib/seo/noindex-metadata';
import { INDUSTRIES_CATALOG, industryDetailHref } from '@/features/industries/industries.content';
import {
  IndustryDetailPage,
  resolveIndustryDetail,
} from '@/features/industries/IndustryDetailPage';

interface IndustrySlugPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INDUSTRIES_CATALOG.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: IndustrySlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = resolveIndustryDetail(slug);

  if (!industry) {
    return createNoIndexMetadata();
  }

  return createPageMetadata({
    title: `${industry.label} Industry Solutions`,
    description: industry.description,
    path: industryDetailHref(industry.slug),
    keywords: [industry.label, 'Bitcraftly', 'industry software', 'digital engineering'],
  });
}

export default async function IndustrySlugPage({ params }: IndustrySlugPageProps) {
  const { slug } = await params;
  const industry = resolveIndustryDetail(slug);

  if (!industry) {
    notFound();
  }

  return <IndustryDetailPage industry={industry} />;
}
