import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/patterns/marketing-layout";
import { ROUTES } from "@/constants/navigation";
import {
  getWorkCaseStudyBySlug,
  WORK_CASE_STUDIES,
  WorkHubPage,
} from "@/features/work";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";
import "@/features/work/work.css";

interface WorkCaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return WORK_CASE_STUDIES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: WorkCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getWorkCaseStudyBySlug(slug);

  return createPageMetadata({
    title: study ? `${study.title} | Case Study` : "Case Study | Work",
    description: study?.description ?? "Bitcraftly case study detail page.",
    path: `${ROUTES.workCaseStudies}/${slug}`,
  });
}

export default async function WorkCaseStudyPage({
  params,
}: WorkCaseStudyPageProps) {
  const { slug } = await params;
  const study = getWorkCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <PageShell className="work-page">
      <WorkHubPage title={study.title} description={study.description} />
    </PageShell>
  );
}
