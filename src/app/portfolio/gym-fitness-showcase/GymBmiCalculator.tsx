'use client';

import { useMemo, useState } from 'react';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

type GymBmiCalculatorProps = {
  className?: string;
};

export default function GymBmiCalculator({ className = '' }: GymBmiCalculatorProps) {
  const [heightCm, setHeightCm] = useState('172');
  const [weightKg, setWeightKg] = useState('72');

  const result = useMemo(() => {
    const h = parseFloat(heightCm.replace(',', '.'));
    const w = parseFloat(weightKg.replace(',', '.'));
    if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0) return null;
    const m = h / 100;
    const bmi = w / (m * m);
    if (!Number.isFinite(bmi)) return null;
    const rounded = Math.round(bmi * 10) / 10;
    let band = 'Normal range';
    if (rounded < 18.5) band = 'Underweight';
    else if (rounded < 25) band = 'Healthy weight';
    else if (rounded < 30) band = 'Overweight';
    else band = 'Consult a physician';
    return { bmi: rounded, band };
  }, [heightCm, weightKg]);

  return (
    <div
      id="bmi"
      className={`gym-bg-card flex h-full min-h-[340px] scroll-mt-28 flex-col rounded-2xl border gym-border p-6 md:p-8 ${className}`}
    >
      <p className="text-xs font-bold uppercase tracking-widest gym-brand-text">Wellness tool</p>
      <h3 className="mt-2 text-2xl font-bold leading-tight">BMI calculator</h3>
      <p className="gym-text-muted mt-2 text-xs">Demo widget · not medical advice.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Height (cm)
          <input
            type="number"
            inputMode="decimal"
            min={120}
            max={230}
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            className="gym-border mt-1.5 w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--gym-brand)] focus:ring-2 focus:ring-[var(--gym-brand)]/20"
          />
        </label>
        <label className="block text-sm font-medium">
          Weight (kg)
          <input
            type="number"
            inputMode="decimal"
            min={35}
            max={250}
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            className="gym-border mt-1.5 w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--gym-brand)] focus:ring-2 focus:ring-[var(--gym-brand)]/20"
          />
        </label>
      </div>
      <div className="mt-auto flex flex-1 flex-col justify-end pt-6">
        <div className="flex min-h-[148px] flex-col justify-center rounded-xl bg-[var(--gym-surface)] p-5">
          {result ? (
            <>
              <p className="text-4xl font-extrabold gym-brand-text">{result.bmi}</p>
              <p className="mt-2 text-sm font-medium">{result.band}</p>
            </>
          ) : (
            <p className="gym-text-muted text-sm">Enter valid height & weight.</p>
          )}
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--gym-border)]">
            <div
              className="h-full rounded-full bg-[var(--gym-brand)] transition-[width] duration-300"
              style={{
                width: `${result ? clamp(((result.bmi - 15) / (40 - 15)) * 100, 5, 100) : 5}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
