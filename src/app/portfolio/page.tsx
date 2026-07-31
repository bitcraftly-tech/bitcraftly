import { permanentRedirect } from 'next/navigation';

/**
 * Legacy `/portfolio` hub → Work catalog.
 * Interactive demos remain at `/portfolio/*-showcase` routes.
 */
export default function PortfolioIndexPage() {
  permanentRedirect('/work');
}
