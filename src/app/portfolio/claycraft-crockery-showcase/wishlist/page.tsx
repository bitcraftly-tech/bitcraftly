import type { Metadata } from 'next';

import ClayCraftWishlistPageClient from './ClayCraftWishlistPageClient';

export const metadata: Metadata = {
  title: 'Wishlist',
  description: 'Saved Crockery Wala pieces (demo session).',
};

export default function ClayCraftWishlistPage() {
  return <ClayCraftWishlistPageClient />;
}
