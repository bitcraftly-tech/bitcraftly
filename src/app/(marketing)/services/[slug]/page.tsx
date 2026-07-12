import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { Text } from "@/components/ui/typography";
import {
  getRelatedWorkForService,
  getServiceBySlug,
  getServiceHref,
  SERVICE_SLUGS,
} from "@/constants/navigation";
import { buildBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

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
  const service = getServiceBySlug(slug);

  if (!service) {
    return createPageMetadata({
      title: "Service",
      description: "Bitcraftly digital engineering services.",
      path: getServiceHref(slug),
    });
  }

  return createPageMetadata({
    title: service.label,
    description: service.description,
    path: getServiceHref(slug),
  });
}

export default async function ServiceSlugPage({ params }: ServiceSlugPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedWork = getRelatedWorkForService(slug);
  const breadcrumbs = buildBreadcrumbs([
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.label },
  ]);

  return (
    <MarketingPageShell
      title={service.label}
      description={service.description}
      headingId={`${service.slug}-page-heading`}
      breadcrumbs={<MarketingBreadcrumbs items={breadcrumbs} />}
    >
      <div className="mt-[var(--space-5)] space-y-[16px]">
        <Text as="p" size="sm" muted>
          Service page content coming soon.
        </Text>
        <div>
          <Text as="p" className="text-[13px] font-semibold text-foreground">
            Related projects
          </Text>
          <ul className="mt-[8px] flex flex-col gap-[6px]">
            {relatedWork.map((href) => (
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
        <Link
          href="/contact"
          className="inline-flex text-[13px] font-semibold text-primary no-underline hover:underline"
        >
          Book Consultation →
        </Link>
      </div>
    </MarketingPageShell>
  );
}
