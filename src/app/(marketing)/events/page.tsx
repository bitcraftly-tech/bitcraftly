import type { Metadata } from 'next';
import { MarketingPageShell } from '@/components/patterns/marketing-page-shell';
import { ROUTES } from '@/constants/navigation';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Events',
  description: 'Talks, webinars, and community events from Bitcraftly.',
  path: ROUTES.events,
});

export default function EventsPage() {
  return (
    <MarketingPageShell
      title="Events"
      description="Talks, webinars, and community events from Bitcraftly."
      headingId="events-page-heading"
    />
  );
}
