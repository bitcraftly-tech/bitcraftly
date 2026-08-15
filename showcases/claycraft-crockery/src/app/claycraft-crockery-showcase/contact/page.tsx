import type { Metadata } from 'next';

import ClayCraftContactPageClient from './ClayCraftContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Crockery Wala — demo contact form.',
};

export default function ClayCraftContactPage() {
  return <ClayCraftContactPageClient />;
}
