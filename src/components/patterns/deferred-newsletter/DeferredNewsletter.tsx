'use client';

import dynamic from 'next/dynamic';
import { DeferredMount } from '@/components/patterns/deferred-mount';

function NewsletterUnavailable() {
  return <div className="min-h-[14rem] w-full bg-surface/30" aria-hidden />;
}

const NewsletterSection = dynamic(
  () =>
    import('@/features/homepage/Newsletter/NewsletterSection')
      .then((mod) => mod.NewsletterSection)
      .catch(() => NewsletterUnavailable),
  {
    ssr: false,
    loading: () => <NewsletterUnavailable />,
  },
);

/**
 * Below-fold newsletter — delayed hydration to protect homepage TBT.
 * Markup is non-critical for first paint; form loads after idle.
 */
export function DeferredNewsletter() {
  return (
    <DeferredMount delayMs={2000}>
      <NewsletterSection />
    </DeferredMount>
  );
}
