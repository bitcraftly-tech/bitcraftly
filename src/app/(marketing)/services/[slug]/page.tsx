import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getServiceBySlug,
  getServiceHref,
  SERVICE_SLUGS,
} from "@/constants/navigation";
import {
  getServicePageContent,
  ServiceDetailPage,
} from "@/features/services";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";
import { createNoIndexMetadata } from "@/lib/seo/noindex-metadata";

interface ServiceSlugPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServiceSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getServicePageContent(slug);
  const service = getServiceBySlug(slug);

  if (!content || !service) {
    return createNoIndexMetadata();
  }

  return createPageMetadata({
    title: content.label,
    description: content.metaDescription,
    path: getServiceHref(slug),
    keywords: content.keywords,
  });
}

export default async function ServiceSlugPage({ params }: ServiceSlugPageProps) {
  const { slug } = await params;
  const content = getServicePageContent(slug);

  if (!content) {
    notFound();
  }

  return <ServiceDetailPage content={content} />;
}
