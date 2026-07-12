import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { Text } from "@/components/ui/typography";
import { ROUTES } from "@/constants/navigation";
import { buildWorkBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

interface WorkTestimonialPageProps {
  params: Promise<{ slug: string }>;
}

const TESTIMONIALS = [
  {
    slug: "northstar-health",
    label: "Northstar Health",
    description: "Client perspective on Bitcraftly delivery and partnership.",
  },
] as const;

export function generateStaticParams() {
  return TESTIMONIALS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: WorkTestimonialPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = TESTIMONIALS.find((entry) => entry.slug === slug);

  return createPageMetadata({
    title: item ? `${item.label} | Testimonial` : "Testimonial | Work",
    description: item?.description ?? "Bitcraftly client testimonial page.",
    path: `${ROUTES.workTestimonials}/${slug}`,
  });
}

export default async function WorkTestimonialPage({
  params,
}: WorkTestimonialPageProps) {
  const { slug } = await params;
  const item = TESTIMONIALS.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  const breadcrumbs = buildWorkBreadcrumbs([
    { label: "Testimonials", href: ROUTES.workTestimonials },
    { label: item.label },
  ]);

  return (
    <MarketingPageShell
      title={item.label}
      description={item.description}
      headingId={`work-testimonial-${item.slug}-heading`}
      breadcrumbs={<MarketingBreadcrumbs items={breadcrumbs} />}
    >
      <div className="mt-[var(--space-5)] space-y-[12px]">
        <Text as="p" size="sm" muted>
          Testimonial detail content coming soon.
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
