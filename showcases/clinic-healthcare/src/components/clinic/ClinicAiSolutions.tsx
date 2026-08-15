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
    <section
      id="ai-solutions"
      className="cl-ai-solutions cl-bg-surface"
      aria-labelledby="clinic-ai-heading"
    >
      <div className="cl-container cl-section">
        <ClinicSectionHeading
          id="clinic-ai-heading"
          title="AI Healthcare Solutions"
          subtitle="Production-shaped AI modules your clinic can enable — symptom guidance, reports, matching, chat, insights and nutrition."
        />

        <ul className="cl-ai-solutions__grid">
          {modules.map((module, index) => {
            const Icon = ICONS[module.id] ?? Sparkles;
            return (
              <ClinicReveal
                as="li"
                key={module.id}
                delay={Math.min(index, 5) * 0.05}
                className="h-full"
              >
                <article className="cl-card cl-card--lift cl-ai-card">
                  <div className="cl-ai-card__head">
                    <span className="cl-icon-tile cl-ai-card__icon">
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                    </span>
                    <p className="cl-ai-card__accent">{module.accent}</p>
                  </div>

                  <div className="cl-ai-card__body">
                    <h3 className="cl-ai-card__title">{module.title}</h3>
                    <p className="cl-ai-card__copy">{module.description}</p>
                  </div>

                  <Link
                    href={module.href}
                    className="cl-btn cl-btn--primary cl-btn--sm cl-btn--block cl-ai-card__cta"
                    aria-label={`${module.cta} — ${module.title}`}
                  >
                    {module.cta}
                  </Link>
                </article>
              </ClinicReveal>
            );
          })}
        </ul>

        <ClinicReveal className="cl-ai-solutions__cta" delay={0.18}>
          <Link href={AI_HUB} className="cl-btn cl-btn--outline">
            <Sparkles className="h-4 w-4" aria-hidden />
            View All AI Features
          </Link>
        </ClinicReveal>
      </div>
    </section>
  );
}
