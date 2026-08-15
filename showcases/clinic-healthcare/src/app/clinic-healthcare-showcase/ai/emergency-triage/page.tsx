import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import AiDemoShell from '@/modules/ai/shared/components/AiDemoShell';
import { requireAiModule } from '@/modules/ai/shared/requireAiModule';

const EmergencyTriageDemo = dynamic(
  () => import('@/modules/ai/emergency-triage/components/EmergencyTriageDemo'),
  { loading: () => <p className="cl-small">Loading emergency triage…</p> },
);

export const metadata: Metadata = {
  title: 'Emergency AI Triage',
  description:
    'Urgency detection for emergency, urgent or normal care pathways — Clinic & Healthcare demo.',
  openGraph: {
    title: 'Emergency AI Triage | Clinic & Healthcare',
    description: 'Symptom urgency classifier demo with call-to-care CTAs.',
    type: 'website',
  },
};

export default function EmergencyTriagePage() {
  const module = requireAiModule('emergency-triage');
  if (!module.enabled) notFound();

  return (
    <AiDemoShell title={module.title} description={module.description}>
      <EmergencyTriageDemo />
    </AiDemoShell>
  );
}
