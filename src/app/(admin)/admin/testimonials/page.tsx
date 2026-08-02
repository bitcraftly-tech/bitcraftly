import type { Metadata } from 'next';
import { AdminTestimonialsPage } from '@/features/admin';

export const metadata: Metadata = {
  title: 'Testimonials',
};

export default function AdminTestimonialsRoutePage() {
  return <AdminTestimonialsPage />;
}
