'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CalendarCheck, ShieldAlert } from 'lucide-react';

import AiProcessing from '@/modules/ai/shared/components/AiProcessing';
import { useFakeAiDelay } from '@/modules/ai/shared/hooks/useFakeAiDelay';
import type { AiSymptomResult } from '@/modules/ai/shared/types';
import { analyzeSymptoms } from '@/modules/ai/symptom-checker/data/responses';

const URGENCY_STYLES = {
  normal: { label: 'Normal', color: '#0f766e', bg: '#ccfbf1' },
  urgent: { label: 'Urgent', color: '#c2410c', bg: '#ffedd5' },
  emergency: { label: 'Emergency', color: '#be123c', bg: '#ffe4e6' },
} as const;

export default function SymptomCheckerDemo() {
  const uid = useId();
  const { busy, run } = useFakeAiDelay(1600);
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<AiSymptomResult | null>(null);
  const [error, setError] = useState('');

  async function handleAnalyze() {
    const trimmed = symptoms.trim();
    if (trimmed.length < 12) {
      setError('Please describe symptoms in at least a short sentence.');
      return;
    }
    setError('');
    const next = await run(() => analyzeSymptoms(trimmed));
    setResult(next);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="cl-card p-6 sm:p-8" aria-labelledby={`${uid}-form`}>
        <h2 id={`${uid}-form`} className="cl-h3">
          Describe your symptoms
        </h2>
        <p className="cl-small mt-2">
          Showcase demo — guidance is educational and not a medical diagnosis.
        </p>
        <label className="cl-label mt-5" htmlFor={`${uid}-symptoms`}>
          Symptoms
        </label>
        <textarea
          id={`${uid}-symptoms`}
          className="cl-field min-h-[10rem] resize-y"
          placeholder="Example: Mild fever for two days, sore throat, dry cough, no chest pain…"
          value={symptoms}
          onChange={(event) => setSymptoms(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${uid}-error` : undefined}
        />
        {error ? (
          <p id={`${uid}-error`} className="mt-2 text-sm" style={{ color: 'var(--cl-danger)' }}>
            {error}
          </p>
        ) : null}
        <button
          type="button"
          className="cl-btn cl-btn--primary mt-4"
          onClick={handleAnalyze}
          disabled={busy}
          aria-busy={busy}
        >
          {busy ? 'Analysing…' : 'Analyze Symptoms'}
        </button>
        {busy ? (
          <div className="mt-4">
            <AiProcessing />
          </div>
        ) : null}
      </section>

      <section aria-live="polite" aria-atomic="true">
        {result ? (
          <div className="cl-card space-y-5 p-6 sm:p-8">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
              style={{
                color: URGENCY_STYLES[result.urgency].color,
                background: URGENCY_STYLES[result.urgency].bg,
              }}
            >
              {result.urgency === 'emergency' ? (
                <ShieldAlert className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
              )}
              {URGENCY_STYLES[result.urgency].label} priority
            </div>
            <p className="cl-body">{result.summary}</p>
            <div>
              <h3 className="text-sm font-semibold">Possible conditions</h3>
              <ul className="mt-3 space-y-3">
                {result.conditions.map((item) => (
                  <li
                    key={item.name}
                    className="rounded-xl border px-3 py-3"
                    style={{ borderColor: 'var(--cl-border)' }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">{item.name}</span>
                      <span className="cl-small">{item.likelihood}</span>
                    </div>
                    <p className="cl-small mt-1">{item.note}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm">
              <span className="font-semibold">Recommended department:</span> {result.department}
            </p>
            <Link
              href="/portfolio/clinic-healthcare-showcase#appointment"
              className="cl-btn cl-btn--primary"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden />
              Book Appointment
            </Link>
          </div>
        ) : (
          <div
            className="flex h-full min-h-[16rem] items-center justify-center rounded-[1.5rem] border border-dashed p-8 text-center"
            style={{ borderColor: 'var(--cl-border)', color: 'var(--cl-faint)' }}
          >
            AI guidance will appear here after analysis.
          </div>
        )}
      </section>
    </div>
  );
}
