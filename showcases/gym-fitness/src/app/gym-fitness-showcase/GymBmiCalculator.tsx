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
    <div id="bmi" className={`gym-bmi-card scroll-mt-28 ${className}`.trim()}>
      <p className="gym-bmi-card__eyebrow">Wellness tool</p>
      <h3 className="gym-bmi-card__title">BMI calculator</h3>
      <p className="gym-bmi-card__note">Demo widget · not medical advice.</p>

      <div className="gym-bmi-card__fields">
        <div className="gym-field-group">
          <label className="gym-label" htmlFor="gym-bmi-weight">
            Weight (kg)
          </label>
          <input
            id="gym-bmi-weight"
            type="number"
            inputMode="decimal"
            min={35}
            max={250}
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            className="gym-field"
          />
        </div>
        <div className="gym-field-group">
          <label className="gym-label" htmlFor="gym-bmi-height">
            Height (cm)
          </label>
          <input
            id="gym-bmi-height"
            type="number"
            inputMode="decimal"
            min={120}
            max={230}
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            className="gym-field"
          />
        </div>
      </div>

      <div className="gym-bmi-card__result-wrap">
        <div className="gym-bmi-card__result" aria-live="polite">
          {result ? (
            <>
              <p className="gym-bmi-card__value">{result.bmi}</p>
              <p className="gym-bmi-card__band">{result.band}</p>
            </>
          ) : (
            <p className="gym-bmi-card__empty">Enter valid height & weight.</p>
          )}
          <div
            className="gym-bmi-card__meter"
            role="meter"
            aria-valuemin={15}
            aria-valuemax={40}
            aria-valuenow={result?.bmi ?? 15}
            aria-label="BMI range indicator"
          >
            <div
              className="gym-bmi-card__meter-fill"
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
