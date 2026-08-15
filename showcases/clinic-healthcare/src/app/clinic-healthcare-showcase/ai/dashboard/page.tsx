import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import AiDemoShell from '@/modules/ai/shared/components/AiDemoShell';
import { requireAiModule } from '@/modules/ai/shared/requireAiModule';

const HealthDashboardDemo = dynamic(
  () => import('@/modules/ai/dashboard/components/HealthDashboardDemo'),
  { loading: () => <p className="cl-small">Loading health dashboard…</p> },
);

export const metadata: Metadata = {
  title: 'AI Health Dashboard',
  description:
    'Health score, vitals, appointments and weekly trends in one AI dashboard — Clinic & Healthcare demo.',
  openGraph: {
    title: 'AI Health Dashboard | Clinic & Healthcare',
    description: 'Patient vitals and appointment overview demo for healthcare SaaS.',
    type: 'website',
  },
};

export default function HealthDashboardPage() {
  const module = requireAiModule('dashboard');
  if (!module.enabled) notFound();

  return (
    <AiDemoShell title={module.title} description={module.description}>
      <HealthDashboardDemo />
    </AiDemoShell>
  );
}
