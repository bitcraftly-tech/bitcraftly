import type { Metadata } from 'next';

import { ToyShowcaseLayout } from './ToyShowcaseLayout';
import { TOY_BASE } from './toy-paths';

export const metadata: Metadata = {
  title: {
    default: 'PlayNest Premium Toy Store',
    template: '%s | PlayNest',
  },
  description:
    'Premium toy ecommerce demo — age filters, safety trust, and calm cart UX. Portfolio showcase by Bitcraftly.',
  openGraph: {
    title: 'PlayNest Premium Toy Store',
    description: 'Thoughtful toys ecommerce showcase engineered by Bitcraftly.',
    url: TOY_BASE,
    siteName: 'PlayNest',
    type: 'website',
  },
};

export default function ToyShowcaseRootLayout({ children }: { children: React.ReactNode }) {
  return <ToyShowcaseLayout>{children}</ToyShowcaseLayout>;
}
