import type { Metadata } from 'next';

import ClayCraftCartPageClient from './ClayCraftCartPageClient';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Your Crockery Wala shopping cart (demo).',
};

export default function ClayCraftCartPage() {
  return <ClayCraftCartPageClient />;
}
