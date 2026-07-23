import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ROUTES } from "@/constants/navigation";
import {
  WorkTestimonialDetailPage,
  type WorkTestimonialDetail,
} from "@/features/work";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";
import "@/features/work/work.css";

interface WorkTestimonialPageProps {
  params: Promise<{ slug: string }>;
}

const TESTIMONIALS: readonly WorkTestimonialDetail[] = [
  {
    slug: "northstar-health",
    label: "Northstar Health",
    description: "Client perspective on Bitcraftly delivery and partnership.",
    industry: "Healthcare",
    role: "Operations lead",
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

  return <WorkTestimonialDetailPage item={item} />;
}
