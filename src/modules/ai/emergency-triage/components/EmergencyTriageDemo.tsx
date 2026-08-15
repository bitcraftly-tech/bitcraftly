'use client';

import { useId, useState } from 'react';
import { Ambulance, PhoneCall, ShieldAlert } from 'lucide-react';

import { CLINIC_BRAND } from '@bitcraftly/showcase-clinic-healthcare/app/clinic-healthcare-showcase/clinic-data';
import AiProcessing from '@/modules/ai/shared/components/AiProcessing';
import { useFakeAiDelay } from '@/modules/ai/shared/hooks/useFakeAiDelay';
import { assessEmergency, type TriageResult } from '@/modules/ai/emergency-triage/data/triage';

const STYLES = {
  normal: { color: '#0f766e', bg: '#ccfbf1', label: 'Normal' },
  urgent: { color: '#c2410c', bg: '#ffedd5', label: 'Urgent' },
  emergency: { color: '#be123c', bg: '#ffe4e6', label: 'Emergency' },
} as const;

export default function EmergencyTriageDemo() {
  const uid = useId();
  const { busy, run } = useFakeAiDelay(1200);
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<TriageResult | null>(null);
  const [error, setError] = useState('');

  async function handleAssess() {
    const trimmed = symptoms.trim();
    if (trimmed.length < 10) {
      setError('Describe what is happening in at least one clear sentence.');
      return;
    }
    setError('');
    const next = await run(() => assessEmergency(trimmed));
    setResult(next);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="cl-card p-6 sm:p-8">
        <h2 className="cl-h3" id={`${uid}-title`}>
          Emergency AI triage
        </h2>
        <p className="cl-small mt-2">
          Showcase urgency routing â€” for real emergencies always call local emergency services.
        </p>
        <label className="cl-label mt-5" htmlFor={`${uid}-symptoms`}>
          Current symptoms
        </label>
        <textarea
          id={`${uid}-symptoms`}
          className="cl-field min-h-[9rem] resize-y"
          placeholder="Example: Sudden crushing chest pain radiating to the left armâ€¦"
          value={symptoms}
          onChange={(event) => setSymptoms(event.target.value)}
          aria-invalid={error ? true : undefined}
        />
        {error ? (
          <p className="mt-2 text-sm" style={{ color: 'var(--cl-danger)' }}>
            {error}
          </p>
        ) : null}
        <button
          type="button"
          className="cl-btn cl-btn--primary mt-4"
          onClick={handleAssess}
          disabled={busy}
          aria-busy={busy}
        >
          <ShieldAlert className="h-4 w-4" aria-hidden />
          {busy ? 'Assessingâ€¦' : 'Assess Urgency'}
        </button>
        {busy ? (
          <div className="mt-4">
            <AiProcessing label="Running triage rulesâ€¦" />
          </div>
        ) : null}
      </section>

      <section aria-live="polite">
        {result ? (
          <div className="cl-card space-y-4 p-6 sm:p-8">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
              style={{ color: STYLES[result.urgency].color, background: STYLES[result.urgency].bg }}
            >
              <Ambulance className="h-3.5 w-3.5" aria-hidden />
              {STYLES[result.urgency].label}
            </span>
            <h3 className="cl-h3">{result.title}</h3>
            <p className="cl-body">{result.summary}</p>
            <ul className="space-y-2">
              {result.actions.map((action) => (
                <li key={action} className="cl-small">
                  â€¢ {action}
                </li>
              ))}
            </ul>
            {result.urgency !== 'normal' ? (
              <a
                href={`tel:${CLINIC_BRAND.emergency.replace(/\s/g, '')}`}
                className="cl-btn cl-btn--primary"
              >
                <PhoneCall className="h-4 w-4" aria-hidden />
                Call {CLINIC_BRAND.emergency}
              </a>
            ) : null}
          </div>
        ) : (
          <div
            className="flex h-full min-h-[16rem] items-center justify-center rounded-2xl border border-dashed p-6 text-center"
            style={{ borderColor: 'var(--cl-border)' }}
          >
            <p className="cl-small max-w-sm">
              Urgency classification (Emergency / Urgent / Normal) will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
