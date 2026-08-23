import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
  getCaseStudyHref,
  isCaseStudyIndexable,
} from '@/content/case-studies';
import { getWorkPageBySlug, WORK_STATIC_SLUGS } from '@/constants/navigation';
import { WORK_NOINDEX_HUB_SLUGS } from '@/constants/work';
import { CaseStudyDetailPage } from '@/features/case-studies';
import { getWorkHubBySlug, WorkHubFallbackPage, WorkHubPage } from '@/features/work';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';
import { createNoIndexMetadata } from '@/lib/seo/noindex-metadata';
import '@/features/work/work.css';

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

export async function generateMetadata({ params }: WorkSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (study) {
    const base = createPageMetadata({
      title: study.seoTitle ?? `${study.title} | Case Study`,
      description: study.subtitle,
      path: getCaseStudyHref(study.slug),
      keywords: [...study.tags],
      image: study.coverImage,
    });

    const articleMetadata = {
      ...base,
      openGraph: {
        ...base.openGraph,
        type: 'article' as const,
      },
    };

    return isCaseStudyIndexable(study) ? articleMetadata : createNoIndexMetadata(articleMetadata);
  }

  const hub = getWorkHubBySlug(slug);
  if (hub) {
    const hubMetadata = createPageMetadata({
      title: hub.seoTitle,
      description: hub.seoDescription,
      path: `/work/${hub.slug}`,
    });

    return WORK_NOINDEX_HUB_SLUGS.has(hub.slug) ? createNoIndexMetadata(hubMetadata) : hubMetadata;
  }

  const item = getWorkPageBySlug(slug);
  if (!item) {
    return createNoIndexMetadata();
  }

  const itemMetadata = createPageMetadata({
    title: `${item.label} | Work`,
    description: item.description,
    path: item.href,
  });

  return WORK_NOINDEX_HUB_SLUGS.has(item.slug) ? createNoIndexMetadata(itemMetadata) : itemMetadata;
}

export default async function WorkSlugPage({ params }: WorkSlugPageProps) {
  const { slug } = await params;

  const study = getCaseStudyBySlug(slug);
  if (study) {
    return <CaseStudyDetailPage study={study} />;
  }

  const hub = getWorkHubBySlug(slug);
  if (hub) {
    return <WorkHubPage hub={hub} />;
  }

  const item = getWorkPageBySlug(slug);
  if (!item) {
    notFound();
  }

  return <WorkHubFallbackPage slug={item.slug} title={item.label} description={item.description} />;
}
