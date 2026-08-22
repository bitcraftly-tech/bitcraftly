import type { Metadata } from 'next';
import { PortalLoginPage, PORTAL_LOGIN_META } from '@/features/portal-login';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';
import { createNoIndexMetadata } from '@/lib/seo/noindex-metadata';

export const metadata: Metadata = createNoIndexMetadata(
  createPageMetadata({
    title: PORTAL_LOGIN_META.title,
    description: PORTAL_LOGIN_META.description,
    path: PORTAL_LOGIN_META.path,
  }),
);

interface LoginPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  return <PortalLoginPage searchParams={params} />;
}
