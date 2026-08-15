import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import AiDemoShell from '@/modules/ai/shared/components/AiDemoShell';
import { requireAiModule } from '@/modules/ai/shared/requireAiModule';

const DietPlannerDemo = dynamic(
  () => import('@/modules/ai/diet-planner/components/DietPlannerDemo'),
  { loading: () => <p className="cl-small">Loading diet planner…</p> },
);

export const metadata: Metadata = {
  title: 'AI Diet Planner',
  description:
    'Generate meal plans with calories and nutrition targets — Clinic & Healthcare demo.',
  openGraph: {
    title: 'AI Diet Planner | Clinic & Healthcare',
    description: 'Personalised day meal plan generator for clinic nutrition workflows.',
    type: 'website',
  },
};

export default function DietPlannerPage() {
  const module = requireAiModule('diet-planner');
  if (!module.enabled) notFound();

  return (
    <AiDemoShell title={module.title} description={module.description}>
      <DietPlannerDemo />
    </AiDemoShell>
  );
}
