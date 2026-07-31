'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarCheck, Star } from 'lucide-react';

import AiProcessing from '@/modules/ai/shared/components/AiProcessing';
import { useFakeAiDelay } from '@/modules/ai/shared/hooks/useFakeAiDelay';
import type { AiDoctorMatch } from '@/modules/ai/shared/types';
import { recommendDoctor } from '@/modules/ai/doctor-recommendation/data/matches';

export default function DoctorRecommendationDemo() {
  const uid = useId();
  const { busy, run } = useFakeAiDelay(1400);
  const [input, setInput] = useState('');
  const [match, setMatch] = useState<AiDoctorMatch | null>(null);
  const [error, setError] = useState('');

  async function handleFind() {
    const trimmed = input.trim();
    if (trimmed.length < 8) {
      setError('Describe your concern in a short sentence.');
      return;
    }
    setError('');
    const next = await run(() => recommendDoctor(trimmed));
    setMatch(next);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="cl-card p-6 sm:p-8" aria-labelledby={`${uid}-form`}>
        <h2 id={`${uid}-form`} className="cl-h3">
          What brings you in?
        </h2>
        <p className="cl-small mt-2">
          AI matches you to a Clinic & Healthcare consultant based on your description.
        </p>
        <label className="cl-label mt-5" htmlFor={`${uid}-concern`}>
          Symptoms or concern
        </label>
        <textarea
          id={`${uid}-concern`}
          className="cl-field min-h-[8rem] resize-y"
          placeholder="Example: Chest tightness after climbing stairs, occasional palpitations…"
          value={input}
          onChange={(event) => setInput(event.target.value)}
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
          onClick={handleFind}
          disabled={busy}
          aria-busy={busy}
        >
          {busy ? 'Matching…' : 'Find Doctor'}
        </button>
        {busy ? (
          <div className="mt-4">
            <AiProcessing label="Matching specialists…" />
          </div>
        ) : null}
      </section>

      <section aria-live="polite">
        {match ? (
          <article className="cl-card overflow-hidden">
            <div className="cl-media relative aspect-[16/10]">
              <Image
                src={match.image}
                alt={match.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 92vw, 40vw"
              />
            </div>
            <div className="p-6">
              <h3 className="cl-h3">{match.name}</h3>
              <p className="mt-1 text-sm font-medium" style={{ color: 'var(--cl-primary)' }}>
                {match.speciality}
              </p>
              <p className="cl-small mt-1">{match.experience} experience</p>
              <p className="mt-3 flex items-center gap-1.5 text-sm">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                {match.rating.toFixed(1)}
              </p>
              <p className="cl-body mt-4">{match.reason}</p>
              <Link
                href="/portfolio/clinic-healthcare-showcase#appointment"
                className="cl-btn cl-btn--primary mt-5"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden />
                Book Now
              </Link>
            </div>
          </article>
        ) : (
          <div
            className="flex h-full min-h-[16rem] items-center justify-center rounded-2xl border border-dashed p-6 text-center"
            style={{ borderColor: 'var(--cl-border)' }}
          >
            <p className="cl-small max-w-xs">
              Your recommended consultant card will appear here after matching.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
