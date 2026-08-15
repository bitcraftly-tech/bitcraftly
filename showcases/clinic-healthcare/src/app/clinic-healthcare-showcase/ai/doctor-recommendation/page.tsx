import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import AiDemoShell from '@/modules/ai/shared/components/AiDemoShell';
import { requireAiModule } from '@/modules/ai/shared/requireAiModule';

const DoctorRecommendationDemo = dynamic(
  () => import('@/modules/ai/doctor-recommendation/components/DoctorRecommendationDemo'),
  { loading: () => <p className="cl-small">Loading doctor matching…</p> },
);

export const metadata: Metadata = {
  title: 'AI Doctor Recommendation',
  description:
    'Find the right specialist instantly with AI clinician matching — Clinic & Healthcare demo.',
  openGraph: {
    title: 'AI Doctor Recommendation | Clinic & Healthcare',
    description: 'Specialist matching demo for modern clinic websites.',
    type: 'website',
  },
};

export default function DoctorRecommendationPage() {
  const module = requireAiModule('doctor-recommendation');
  if (!module.enabled) notFound();

  return (
    <AiDemoShell title={module.title} description={module.description}>
      <DoctorRecommendationDemo />
    </AiDemoShell>
  );
}
