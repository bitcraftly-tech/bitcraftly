import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import AiDemoShell from '@/modules/ai/shared/components/AiDemoShell';
import { requireAiModule } from '@/modules/ai/shared/requireAiModule';

const TelemedicineDemo = dynamic(
  () => import('@/modules/ai/telemedicine/components/TelemedicineDemo'),
  { loading: () => <p className="cl-small">Loading telemedicine…</p> },
);

export const metadata: Metadata = {
  title: 'Telemedicine AI',
  description: 'Video consultation matching with doctor availability — Clinic & Healthcare demo.',
  openGraph: {
    title: 'Telemedicine AI | Clinic & Healthcare',
    description: 'Secure video consult booking demo for modern clinics.',
    type: 'website',
  },
};

export default function TelemedicinePage() {
  const module = requireAiModule('telemedicine');
  if (!module.enabled) notFound();

  return (
    <AiDemoShell title={module.title} description={module.description}>
      <TelemedicineDemo />
    </AiDemoShell>
  );
}
