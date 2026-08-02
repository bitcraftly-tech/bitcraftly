import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import AiDemoShell from '@/modules/ai/shared/components/AiDemoShell';
import { requireAiModule } from '@/modules/ai/shared/requireAiModule';

const ReportAnalyzerDemo = dynamic(
  () => import('@/modules/ai/report-analyzer/components/ReportAnalyzerDemo'),
  { loading: () => <p className="cl-small">Loading report analyzer…</p> },
);

export const metadata: Metadata = {
  title: 'AI Report Analyzer',
  description:
    'Upload blood reports, CBC, MRI or X-Ray and get plain-language AI explanations — Clinic & Healthcare demo.',
  openGraph: {
    title: 'AI Report Analyzer | Clinic & Healthcare',
    description: 'Interactive diagnostics report explainer for healthcare platforms.',
    type: 'website',
  },
};

export default function ReportAnalyzerPage() {
  const module = requireAiModule('report-analyzer');
  if (!module.enabled) notFound();

  return (
    <AiDemoShell title={module.title} description={module.description}>
      <ReportAnalyzerDemo />
    </AiDemoShell>
  );
}
