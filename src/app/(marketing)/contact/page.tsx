import type { Metadata } from 'next';
import { ContactLandingPage, CONTACT_LANDING_META } from '@/features/contact';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: CONTACT_LANDING_META.title,
  description: CONTACT_LANDING_META.description,
  path: CONTACT_LANDING_META.path,
});

interface ContactPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  return <ContactLandingPage searchParams={params} />;
}
