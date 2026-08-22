import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ROUTES } from '@/constants/navigation';
import { WorkTestimonialDetailPage } from '@/features/work';
import {
  hasApprovedTestimonialQuote,
  WORK_TESTIMONIAL_DETAILS,
} from '@/features/work/work-testimonials.content';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';
import { createNoIndexMetadata } from '@/lib/seo/noindex-metadata';
import '@/features/work/work.css';

interface WorkTestimonialPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return WORK_TESTIMONIAL_DETAILS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: WorkTestimonialPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = WORK_TESTIMONIAL_DETAILS.find((entry) => entry.slug === slug);

  if (!item) {
    return createNoIndexMetadata();
  }

  const pageMetadata = createPageMetadata({
    title: `${item.label} | Testimonial`,
    description: item.description,
    path: `${ROUTES.workTestimonials}/${slug}`,
  });

  if (!hasApprovedTestimonialQuote(item)) {
    return createNoIndexMetadata(pageMetadata);
  }

  return pageMetadata;
}

export default async function WorkTestimonialPage({ params }: WorkTestimonialPageProps) {
  const { slug } = await params;
  const item = WORK_TESTIMONIAL_DETAILS.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  return <WorkTestimonialDetailPage item={item} />;
}
