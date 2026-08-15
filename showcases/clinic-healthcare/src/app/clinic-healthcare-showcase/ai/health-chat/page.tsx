import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import AiDemoShell from '@/modules/ai/shared/components/AiDemoShell';
import { requireAiModule } from '@/modules/ai/shared/requireAiModule';

const HealthChatDemo = dynamic(() => import('@/modules/ai/health-chat/components/HealthChatDemo'), {
  loading: () => <p className="cl-small">Loading health assistant…</p>,
});

export const metadata: Metadata = {
  title: 'AI Health Assistant',
  description:
    '24×7 AI chat for appointments, departments and care guidance — Clinic & Healthcare demo.',
  openGraph: {
    title: 'AI Health Assistant | Clinic & Healthcare',
    description: 'Modern medical chat UI with suggested questions and typing states.',
    type: 'website',
  },
};

export default function HealthChatPage() {
  const module = requireAiModule('health-chat');
  if (!module.enabled) notFound();

  return (
    <AiDemoShell title={module.title} description={module.description}>
      <HealthChatDemo />
    </AiDemoShell>
  );
}
