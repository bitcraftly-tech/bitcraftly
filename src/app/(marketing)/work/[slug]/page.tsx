import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { Text } from "@/components/ui/typography";
import {
  getRelatedServicesForWork,
  getWorkPageBySlug,
  WORK_STATIC_SLUGS,
} from "@/constants/navigation";
import { buildWorkBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

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
  const item = getWorkPageBySlug(slug);

  if (!item) {
    notFound();
  }

  const relatedServices = getRelatedServicesForWork(slug);
  const breadcrumbs = buildWorkBreadcrumbs([{ label: item.label }]);

  return (
    <MarketingPageShell
      title={item.label}
      description={item.description}
      headingId={`work-${item.slug}-heading`}
      breadcrumbs={<MarketingBreadcrumbs items={breadcrumbs} />}
    >
      <div className="mt-[var(--space-5)]">
        <Text as="p" size="sm" muted>
          Category content coming soon.
        </Text>
        {relatedServices.length > 0 ? (
          <div className="mt-[var(--space-4)]">
            <Text as="p" className="text-[13px] font-semibold text-foreground">
              Related services
            </Text>
            <ul className="mt-[8px] flex flex-col gap-[6px]">
              {relatedServices.map((href) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] font-medium text-primary no-underline hover:underline"
                  >
                    {href}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="mt-[var(--space-4)]">
          <Link
            href="/contact"
            className="text-[13px] font-semibold text-primary no-underline hover:underline"
          >
            Book Consultation →
          </Link>
        </div>
      </div>
    </MarketingPageShell>
  );
}
