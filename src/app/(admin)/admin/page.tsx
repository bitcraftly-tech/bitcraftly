import type { Metadata } from 'next';
import { AdminDashboardPage } from '@/features/admin';

export const metadata: Metadata = {
  title: 'Overview',
};

export default function AdminRootPage() {
  return <AdminDashboardPage />;
}
