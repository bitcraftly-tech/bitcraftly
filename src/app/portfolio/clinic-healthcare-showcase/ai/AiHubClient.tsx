'use client';

import Link from 'next/link';
import {
  Activity,
  Ambulance,
  Bot,
  ClipboardPlus,
  FileScan,
  Salad,
  Sparkles,
  Stethoscope,
  Video,
  type LucideIcon,
} from 'lucide-react';

import ClinicReveal from '@/components/portfolio/clinic/ClinicReveal';
import { getEnabledAiModules, type AiModuleId } from '@/modules/ai/shared/data/catalog';

const ICONS: Record<AiModuleId, LucideIcon> = {
  'symptom-checker': ClipboardPlus,
  'report-analyzer': FileScan,
  'doctor-recommendation': Stethoscope,
  'health-chat': Bot,
  dashboard: Activity,
  'diet-planner': Salad,
  telemedicine: Video,
  'emergency-triage': Ambulance,
};

export default function AiHubClient() {
  const modules = getEnabledAiModules();

  return (
    <div className="cl-container cl-section">
      <header className="mx-auto max-w-3xl text-center">
        <p className="cl-eyebrow mx-auto">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          AI Healthcare Platform
        </p>
        <h1 className="cl-h2 mt-4">All AI Features</h1>
        <p className="cl-body mt-3">
          Interactive Clinic & Healthcare demos you can enable per client via feature toggles —
          production-shaped modules for symptom guidance, reports, matching, chat and more.
        </p>
        <Link
          href="/portfolio/clinic-healthcare-showcase"
          className="mt-5 inline-flex text-sm font-semibold"
          style={{ color: 'var(--cl-primary)' }}
        >
          ← Back to clinic homepage
        </Link>
      </header>

      {modules.length === 0 ? (
        <p className="cl-body mt-10 text-center">All AI modules are currently disabled.</p>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((module, index) => {
            const Icon = ICONS[module.id] ?? Sparkles;
            return (
              <ClinicReveal
                as="li"
                key={module.id}
                delay={Math.min(index, 5) * 0.05}
                className="h-full"
              >
                <article className="cl-card cl-card--lift cl-ai-card flex h-full flex-col p-6">
                  <span className="cl-icon-tile">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p
                    className="mt-4 text-[0.6875rem] font-bold tracking-wide uppercase"
                    style={{ color: 'var(--cl-primary)' }}
                  >
                    {module.accent}
                  </p>
                  <h2 className="cl-h3 mt-1">{module.title}</h2>
                  <p className="cl-small mt-2 flex-1">{module.description}</p>
                  <Link
                    href={module.href}
                    className="cl-btn cl-btn--primary cl-btn--sm mt-5 self-start"
                  >
                    {module.cta}
                  </Link>
                </article>
              </ClinicReveal>
            );
          })}
        </ul>
      )}
    </div>
  );
}
