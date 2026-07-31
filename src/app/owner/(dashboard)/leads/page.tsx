import type { Metadata } from 'next';
import { OwnerLeadsPage } from '@/features/owner-crm';

export const metadata: Metadata = {
  title: 'Leads',
};

interface OwnerLeadsRouteProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function OwnerLeadsRoute({ searchParams }: OwnerLeadsRouteProps) {
  const params = await searchParams;
  return <OwnerLeadsPage searchParams={params} />;
}
