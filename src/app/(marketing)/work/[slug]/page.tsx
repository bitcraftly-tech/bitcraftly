import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/patterns/marketing-layout";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
  getCaseStudyHref,
} from "@/content/case-studies";
import {
  getWorkPageBySlug,
  WORK_STATIC_SLUGS,
} from "@/constants/navigation";
import { CaseStudyDetailPage } from "@/features/case-studies";
import { getWorkHubBySlug, WorkHubPage } from "@/features/work";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";
import "@/features/work/work.css";

interface WorkSlugPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const hubSlugs = WORK_STATIC_SLUGS.map((slug) => ({ slug }));
  const caseStudySlugs = getAllCaseStudySlugs().map((slug) => ({ slug }));

  const seen = new Set<string>();
  const params: { slug: string }[] = [];

  for (const entry of [...caseStudySlugs, ...hubSlugs]) {
    if (seen.has(entry.slug)) continue;
    seen.add(entry.slug);
    params.push(entry);
  }

  return params;
}

export async function generateMetadata({
  params,
}: WorkSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (study) {
    const base = createPageMetadata({
      title: study.seoTitle ?? `${study.title} | Case Study`,
      description: study.seoDescription ?? study.description,
      path: getCaseStudyHref(study.slug),
      keywords: [...study.tags],
      image: study.coverImage,
    });

    return {
      ...base,
      openGraph: {
        ...base.openGraph,
        type: "article",
      },
    };
  }

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

export default async function WorkSlugPage({ params }: WorkSlugPageProps) {
  const { slug } = await params;

  const study = getCaseStudyBySlug(slug);
  if (study) {
    return <CaseStudyDetailPage study={study} />;
  }

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
