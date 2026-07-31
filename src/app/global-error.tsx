'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { reportClientError } from '@/lib/observability/report-client-error';

interface GlobalErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    reportClientError(error, { boundary: 'global' });
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center px-[var(--space-4)] py-[var(--space-8)] text-center">
          <h1 className="font-sans text-2xl font-semibold">Application error</h1>
          <p className="mt-[var(--space-2)] max-w-md font-sans text-sm text-muted-foreground">
            A critical error occurred. Please try again or return to the homepage.
          </p>
          <div className="mt-[var(--space-4)] flex flex-wrap items-center justify-center gap-[var(--space-3)]">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-[var(--token-radius-md)] bg-primary px-[var(--space-4)] py-[var(--space-2)] font-sans text-sm font-semibold text-primary-foreground"
            >
              Try again
            </button>
            <Link
              href="/"
              className="font-sans text-sm font-semibold text-primary underline underline-offset-4"
            >
              Return home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
