'use client';

import { Activity, CalendarDays, Droplets, Heart, Scale } from 'lucide-react';

import type { AiVital } from '@/modules/ai/shared/types';

const VITALS: readonly AiVital[] = [
  { label: 'Heart Rate', value: '72', unit: 'bpm', trend: 'steady', status: 'Good' },
  { label: 'Blood Pressure', value: '118/76', unit: 'mmHg', trend: 'down', status: 'Good' },
  { label: 'BMI', value: '23.4', unit: 'kg/m²', trend: 'steady', status: 'Good' },
  { label: 'SpO₂', value: '98', unit: '%', trend: 'up', status: 'Good' },
];

const APPOINTMENTS = [
  { when: 'Today · 4:30 PM', title: 'General Medicine follow-up', doctor: 'Dr. Ananya Mehta' },
  { when: 'Fri · 11:00 AM', title: 'CBC review', doctor: 'Diagnostics desk' },
] as const;

const WEEK = [62, 70, 68, 74, 71, 69, 72] as const;

export default function HealthDashboardDemo() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          className="cl-card relative overflow-hidden p-5 sm:col-span-2"
          style={{
            background:
              'linear-gradient(135deg, var(--cl-primary-strong), var(--cl-primary) 50%, var(--cl-accent))',
            color: 'var(--cl-on-primary)',
            border: 'none',
          }}
        >
          <p className="text-sm font-medium text-white/80">AI Health Score</p>
          <p className="mt-2 text-5xl font-bold tabular-nums">86</p>
          <p className="mt-2 text-sm text-white/85">
            Strong recovery trend this week — keep hydration and evening walks consistent.
          </p>
        </div>
        {VITALS.map((vital) => (
          <div key={vital.label} className="cl-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium" style={{ color: 'var(--cl-muted)' }}>
                {vital.label}
              </p>
              {vital.label === 'Heart Rate' ? (
                <Heart className="h-4 w-4" style={{ color: 'var(--cl-primary)' }} aria-hidden />
              ) : vital.label === 'Blood Pressure' ? (
                <Droplets className="h-4 w-4" style={{ color: 'var(--cl-primary)' }} aria-hidden />
              ) : vital.label === 'BMI' ? (
                <Scale className="h-4 w-4" style={{ color: 'var(--cl-primary)' }} aria-hidden />
              ) : (
                <Activity className="h-4 w-4" style={{ color: 'var(--cl-primary)' }} aria-hidden />
              )}
            </div>
            <p className="mt-3 text-2xl font-bold tabular-nums">
              {vital.value}
              <span className="ml-1 text-sm font-medium" style={{ color: 'var(--cl-faint)' }}>
                {vital.unit}
              </span>
            </p>
            <p className="cl-small mt-1">{vital.status}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="cl-card p-6" aria-labelledby="ai-hr-chart">
          <h2 id="ai-hr-chart" className="cl-h3">
            Heart rate · 7 days
          </h2>
          <div
            className="mt-6 flex h-40 items-end gap-2"
            role="img"
            aria-label="Weekly heart rate chart"
          >
            {WEEK.map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg"
                  style={{
                    height: `${(value / 90) * 100}%`,
                    background: 'linear-gradient(180deg, var(--cl-accent), var(--cl-primary))',
                  }}
                />
                <span className="text-[0.65rem]" style={{ color: 'var(--cl-faint)' }}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="cl-card p-6" aria-labelledby="ai-appts">
          <h2 id="ai-appts" className="cl-h3">
            Upcoming appointments
          </h2>
          <ul className="mt-4 space-y-3">
            {APPOINTMENTS.map((item) => (
              <li
                key={item.title}
                className="flex gap-3 rounded-xl border px-3 py-3"
                style={{ borderColor: 'var(--cl-border)' }}
              >
                <CalendarDays
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: 'var(--cl-primary)' }}
                  aria-hidden
                />
                <span>
                  <span className="block text-sm font-semibold">{item.title}</span>
                  <span className="cl-small block">{item.when}</span>
                  <span className="cl-small block">{item.doctor}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
