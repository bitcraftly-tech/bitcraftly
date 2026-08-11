import type { Metadata } from 'next';
import { ROUTES } from '@/constants/navigation';
import { EventsLandingPage, EVENTS_LANDING_META } from '@/features/events';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: EVENTS_LANDING_META.title,
  description: EVENTS_LANDING_META.description,
  path: ROUTES.events,
});

export default function EventsPage() {
  return <EventsLandingPage />;
}
