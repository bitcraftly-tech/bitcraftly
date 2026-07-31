import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import AiDemoShell from '@/modules/ai/shared/components/AiDemoShell';
import { requireAiModule } from '@/modules/ai/shared/requireAiModule';

const SymptomCheckerDemo = dynamic(
  () => import('@/modules/ai/symptom-checker/components/SymptomCheckerDemo'),
  { loading: () => <p className="cl-small">Loading symptom checker…</p> },
);

export const metadata: Metadata = {
  title: 'AI Symptom Checker',
  description:
    'Describe symptoms and receive educational AI guidance with possible conditions, department and urgency — Clinic & Healthcare demo.',
  openGraph: {
    title: 'AI Symptom Checker | Clinic & Healthcare',
    description: 'Interactive symptom triage demo for healthcare experience platforms.',
    type: 'website',
  },
};

export default function SymptomCheckerPage() {
  const module = requireAiModule('symptom-checker');
  if (!module.enabled) notFound();

  return (
    <AiDemoShell title={module.title} description={module.description}>
      <SymptomCheckerDemo />
    </AiDemoShell>
  );
}
