import type { ReactNode } from 'react';

import '@/styles/portfolio-showcase-tokens.css';
import '@/styles/portfolio-showcase-demos.css';

/**
 * Isolates interactive demo CSS (tech-v2 parity) to /portfolio routes.
 * Per-demo sheets (ecommerce/gym/school) are imported by their layouts.
 * `.portfolio-demo-shell` restores default Tailwind spacing for demos.
 */
export default function PortfolioLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="portfolio-demo-shell flex min-h-full flex-1 flex-col">{children}</div>;
}
