import type { Metadata } from 'next';
import Link from 'next/link';

import { createNoIndexMetadata } from '@/lib/seo/noindex-metadata';

export const metadata: Metadata = createNoIndexMetadata({
  title: 'Page not found',
  description: 'The requested page could not be found on Bitcraftly.',
});

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-[50vh] flex-col items-center justify-center px-[var(--space-4)] py-[var(--space-8)] text-center"
    >
      <h1 className="font-sans text-2xl font-semibold text-foreground">Page not found</h1>
      <p className="mt-[var(--space-2)] max-w-md font-sans text-sm text-muted-foreground">
        The page you requested does not exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-[var(--space-4)] font-sans text-sm font-semibold text-primary underline underline-offset-4"
      >
        Return home
      </Link>
    </main>
  );
}
