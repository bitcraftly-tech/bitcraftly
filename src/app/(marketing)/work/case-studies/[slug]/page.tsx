import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { Text } from "@/components/ui/typography";
import { ROUTES } from "@/constants/navigation";
import { buildWorkBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

interface WorkCaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

const CASE_STUDIES = [
  {
    slug: "fintech-onboarding-platform",
    label: "FinTech Onboarding Platform",
    description: "Faster customer onboarding with compliant digital workflows.",
  },
] as const;

export function generateStaticParams() {
  return CASE_STUDIES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: WorkCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((item) => item.slug === slug);

  return createPageMetadata({
    title: study ? `${study.label} | Case Study` : "Case Study | Work",
    description: study?.description ?? "Bitcraftly case study detail page.",
    path: `${ROUTES.workCaseStudies}/${slug}`,
  });
}

export default async function WorkCaseStudyPage({
  params,
}: WorkCaseStudyPageProps) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  const breadcrumbs = buildWorkBreadcrumbs([
    { label: "Case Studies", href: ROUTES.workCaseStudies },
    { label: study.label },
  ]);

  return (
    <MarketingPageShell
      title={study.label}
      description={study.description}
      headingId={`work-case-study-${study.slug}-heading`}
      breadcrumbs={<MarketingBreadcrumbs items={breadcrumbs} />}
    >
      <div className="mt-[var(--space-5)] space-y-[12px]">
        <Text as="p" size="sm" muted>
          Case study content coming soon.
        </Text>
        <Link
          href="/contact"
          className="block text-[13px] font-semibold text-primary no-underline hover:underline"
        >
          Book Consultation →
        </Link>
      </div>
    </MarketingPageShell>
  );
}
