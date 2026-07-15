import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/patterns/marketing-layout";
import {
  getWorkPageBySlug,
  WORK_STATIC_SLUGS,
} from "@/constants/navigation";
import { getWorkHubBySlug, WorkHubPage } from "@/features/work";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";
import "@/features/work/work.css";

interface WorkCategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return WORK_STATIC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const hub = getWorkHubBySlug(slug);
  if (hub) {
    return createPageMetadata({
      title: hub.seoTitle,
      description: hub.seoDescription,
      path: `/work/${hub.slug}`,
    });
  }

  const item = getWorkPageBySlug(slug);
  if (!item) {
    return createPageMetadata({
      title: "Work",
      description: "Bitcraftly work and project showcase.",
      path: `/work/${slug}`,
    });
  }

  return createPageMetadata({
    title: `${item.label} | Work`,
    description: item.description,
    path: item.href,
  });
}

export default async function WorkCategoryPage({
  params,
}: WorkCategoryPageProps) {
  const { slug } = await params;
  const hub = getWorkHubBySlug(slug);
  if (hub) {
    return (
      <PageShell className="work-page">
        <WorkHubPage title={hub.title} description={hub.description} />
      </PageShell>
    );
  }

  const item = getWorkPageBySlug(slug);
  if (!item) {
    notFound();
  }

  return (
    <PageShell className="work-page">
      <WorkHubPage title={item.label} description={item.description} />
    </PageShell>
  );
}
