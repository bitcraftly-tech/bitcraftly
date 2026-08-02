import type { Metadata } from 'next';
import { OwnerLoginPage } from '@/features/owner-auth';

export const metadata: Metadata = {
  title: 'Sign in',
};

interface OwnerLoginRouteProps {
  searchParams: Promise<{
    next?: string;
  }>;
}

export default async function OwnerLoginRoute({ searchParams }: OwnerLoginRouteProps) {
  const params = await searchParams;
  return <OwnerLoginPage nextPath={params.next} />;
}
