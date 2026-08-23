import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ROUTES } from '@/constants/navigation';
import {
  getWorkProjectBySlug,
  getWorkProjectCaseStudyHref,
  WORK_PROJECTS,
  WorkProjectDetailPage,
} from '@/features/work';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';
import { createNoIndexMetadata } from '@/lib/seo/noindex-metadata';
import { getAbsoluteUrl } from '@/lib/seo/site';
import '@/features/work/work.css';

interface WorkProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return WORK_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkProjectBySlug(slug);

  if (!project) {
    return createNoIndexMetadata();
  }

  const projectMetadata = createPageMetadata({
    title: project.seoTitle ?? `${project.title} | Work`,
    description:
      project.seoDescription ?? project.summary ?? 'Bitcraftly project case detail page.',
    path: `${ROUTES.workProjects}/${slug}`,
    image: project.coverImage,
  });

  if (project.status === 'future') {
    return createNoIndexMetadata(projectMetadata);
  }

  const caseStudyHref = getWorkProjectCaseStudyHref(project);
  if (caseStudyHref) {
    return {
      ...projectMetadata,
      alternates: {
        ...projectMetadata.alternates,
        canonical: getAbsoluteUrl(caseStudyHref),
      },
    };
  }

  return projectMetadata;
}

export default async function WorkProjectPage({ params }: WorkProjectPageProps) {
  const { slug } = await params;
  const project = getWorkProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <WorkProjectDetailPage project={project} />;
}
