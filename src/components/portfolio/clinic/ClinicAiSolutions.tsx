'use client';

import Link from 'next/link';
import {
  Activity,
  Bot,
  ClipboardPlus,
  FileScan,
  Salad,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';

import { getHomeAiModules, type AiModuleId } from '@/modules/ai/shared/data/catalog';

import ClinicReveal from './ClinicReveal';
import ClinicSectionHeading from './ClinicSectionHeading';

const ICONS: Partial<Record<AiModuleId, LucideIcon>> = {
  'symptom-checker': ClipboardPlus,
  'report-analyzer': FileScan,
  'doctor-recommendation': Stethoscope,
  'health-chat': Bot,
  dashboard: Activity,
  'diet-planner': Salad,
};

const AI_HUB = '/portfolio/clinic-healthcare-showcase/ai';

/** Homepage “AI Healthcare Solutions” — six enabled product demos after Services. */
export default function ClinicAiSolutions() {
  const modules = getHomeAiModules();
  if (modules.length === 0) return null;

  return (
    <section id="ai-solutions" className="cl-bg-surface" aria-labelledby="clinic-ai-heading">
      <div className="cl-container cl-section">
        <ClinicSectionHeading
          id="clinic-ai-heading"
          title="AI Healthcare Solutions"
          subtitle="Production-shaped AI modules your clinic can enable — symptom guidance, reports, matching, chat, insights and nutrition."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((module, index) => {
            const Icon = ICONS[module.id] ?? Sparkles;
            return (
              <ClinicReveal
                as="li"
                key={module.id}
                delay={Math.min(index, 5) * 0.06}
                className="h-full"
              >
                <article className="cl-card cl-card--lift cl-ai-card group flex h-full flex-col p-6">
                  <span className="cl-icon-tile">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p
                    className="mt-4 text-[0.6875rem] font-bold tracking-wide uppercase"
                    style={{ color: 'var(--cl-primary)' }}
                  >
                    {module.accent}
                  </p>
                  <h3 className="cl-h3 mt-1">{module.title}</h3>
                  <p className="cl-small mt-2 flex-1">{module.description}</p>
                  <Link
                    href={module.href}
                    className="cl-btn cl-btn--primary cl-btn--sm mt-5 self-start"
                    aria-label={`${module.cta} — ${module.title}`}
                  >
                    {module.cta}
                  </Link>
                </article>
              </ClinicReveal>
            );
          })}
        </ul>

        <ClinicReveal className="mt-10 flex justify-center" delay={0.2}>
          <Link href={AI_HUB} className="cl-btn cl-btn--outline">
            <Sparkles className="h-4 w-4" aria-hidden />
            View All AI Features
          </Link>
        </ClinicReveal>
      </div>
    </section>
  );
}
