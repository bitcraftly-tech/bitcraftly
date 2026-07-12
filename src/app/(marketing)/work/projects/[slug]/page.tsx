import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { Text } from "@/components/ui/typography";
import { ROUTES } from "@/constants/navigation";
import { buildWorkBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

interface WorkProjectPageProps {
  params: Promise<{ slug: string }>;
}

/** Placeholder project catalog — replace with CMS/data source later. */
const PROJECTS = [
  {
    slug: "enterprise-operations-portal",
    label: "Enterprise Operations Portal",
    description: "A secure internal portal for multi-team operations.",
  },
] as const;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: WorkProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  return createPageMetadata({
    title: project ? `${project.label} | Work` : "Project | Work",
    description:
      project?.description ?? "Bitcraftly project case detail page.",
    path: `${ROUTES.workProjects}/${slug}`,
  });
}

export default async function WorkProjectPage({ params }: WorkProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const breadcrumbs = buildWorkBreadcrumbs([
    { label: "Projects", href: ROUTES.workFeaturedProjects },
    { label: project.label },
  ]);

  return (
    <MarketingPageShell
      title={project.label}
      description={project.description}
      headingId={`work-project-${project.slug}-heading`}
      breadcrumbs={<MarketingBreadcrumbs items={breadcrumbs} />}
    >
      <div className="mt-[var(--space-5)] space-y-[12px]">
        <Text as="p" size="sm" muted>
          Project detail content coming soon.
        </Text>
        <Link
          href="/services"
          className="block text-[13px] font-medium text-primary no-underline hover:underline"
        >
          Related services →
        </Link>
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
