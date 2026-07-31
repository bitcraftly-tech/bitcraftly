import type { Metadata } from 'next';
import '@/features/admin/admin.css';
import '@/features/owner-crm/owner-crm.css';
import '@/features/owner-auth/owner-auth.css';

export const metadata: Metadata = {
  title: {
    default: 'Owner CRM',
    template: '%s | Bitcraftly Owner',
  },
  description: 'Internal owner dashboard for Bitcraftly lead intelligence.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function OwnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
