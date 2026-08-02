'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { reportClientError } from '@/lib/observability/report-client-error';

type Props = {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
};

/** Keeps clinic chrome visible when an AI/demo page throws. */
export default function ClinicShowcaseError({ error, reset }: Props) {
  useEffect(() => {
    reportClientError(error, { boundary: 'route' });
  }, [error]);

  return (
    <div className="cl-container cl-section text-center">
      <h1 className="cl-h2">This demo could not load</h1>
      <p className="cl-body mx-auto mt-3 max-w-lg">
        Something went wrong while opening this Clinic & Healthcare view. You can retry or return to
        the showcase homepage.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button type="button" className="cl-btn cl-btn--primary" onClick={() => reset()}>
          Try again
        </button>
        <Link href="/portfolio/clinic-healthcare-showcase" className="cl-btn cl-btn--outline">
          Back to clinic homepage
        </Link>
      </div>
    </div>
  );
}
