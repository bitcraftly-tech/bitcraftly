import type { Metadata } from 'next';
import { AdminBlogPage } from '@/features/admin';

export const metadata: Metadata = {
  title: 'Blog',
};

export default function AdminBlogRoutePage() {
  return <AdminBlogPage />;
}
