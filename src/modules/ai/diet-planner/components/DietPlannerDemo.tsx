'use client';

import { useId, useState } from 'react';
import { Flame, Salad } from 'lucide-react';

import AiProcessing from '@/modules/ai/shared/components/AiProcessing';
import { useFakeAiDelay } from '@/modules/ai/shared/hooks/useFakeAiDelay';
import type { AiMeal } from '@/modules/ai/shared/types';
import { generateDietPlan, type DietGoal } from '@/modules/ai/diet-planner/data/meals';

const GOALS: readonly { value: DietGoal; label: string }[] = [
  { value: 'balanced', label: 'Balanced' },
  { value: 'weight-loss', label: 'Weight loss' },
  { value: 'diabetes-friendly', label: 'Diabetes-friendly' },
  { value: 'heart-healthy', label: 'Heart-healthy' },
];

export default function DietPlannerDemo() {
  const uid = useId();
  const { busy, run } = useFakeAiDelay(1500);
  const [condition, setCondition] = useState('');
  const [age, setAge] = useState('34');
  const [weight, setWeight] = useState('68');
  const [goal, setGoal] = useState<DietGoal>('balanced');
  const [meals, setMeals] = useState<readonly AiMeal[] | null>(null);
  const [note, setNote] = useState('');
  const [calories, setCalories] = useState(0);
  const [error, setError] = useState('');

  async function handleGenerate() {
    const ageNum = Number(age);
    const weightNum = Number(weight);
    if (!Number.isFinite(ageNum) || ageNum < 12 || ageNum > 90) {
      setError('Enter a realistic age between 12 and 90.');
      return;
    }
    if (!Number.isFinite(weightNum) || weightNum < 30 || weightNum > 200) {
      setError('Enter weight in kg between 30 and 200.');
      return;
    }
    setError('');
    const plan = await run(() =>
      generateDietPlan({
        condition: condition.trim() || 'general wellness',
        age: ageNum,
        weightKg: weightNum,
        goal,
      }),
    );
    setMeals(plan.meals);
    setNote(plan.note);
    setCalories(plan.dailyCalories);
  }

  return (
    <div className="space-y-6">
      <section className="cl-card grid gap-4 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-4">
          <h2 className="cl-h3">Generate a personalised day plan</h2>
          <p className="cl-small mt-1">
            Showcase nutrition engine — not a substitute for clinical dietetics.
          </p>
        </div>
        <div>
          <label className="cl-label" htmlFor={`${uid}-condition`}>
            Condition / focus
          </label>
          <input
            id={`${uid}-condition`}
            className="cl-field"
            placeholder="e.g. prediabetes, PCOS, recovery"
            value={condition}
            onChange={(event) => setCondition(event.target.value)}
          />
        </div>
        <div>
          <label className="cl-label" htmlFor={`${uid}-age`}>
            Age
          </label>
          <input
            id={`${uid}-age`}
            className="cl-field"
            type="number"
            min={12}
            max={90}
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <div>
          <label className="cl-label" htmlFor={`${uid}-weight`}>
            Weight (kg)
          </label>
          <input
            id={`${uid}-weight`}
            className="cl-field"
            type="number"
            min={30}
            max={200}
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </div>
        <div>
          <label className="cl-label" htmlFor={`${uid}-goal`}>
            Goal
          </label>
          <select
            id={`${uid}-goal`}
            className="cl-field"
            value={goal}
            onChange={(event) => setGoal(event.target.value as DietGoal)}
          >
            {GOALS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2 lg:col-span-4">
          {error ? (
            <p className="mb-3 text-sm" style={{ color: 'var(--cl-danger)' }}>
              {error}
            </p>
          ) : null}
          <button
            type="button"
            className="cl-btn cl-btn--primary"
            onClick={handleGenerate}
            disabled={busy}
            aria-busy={busy}
          >
            <Salad className="h-4 w-4" aria-hidden />
            {busy ? 'Generating…' : 'Generate Plan'}
          </button>
          {busy ? (
            <div className="mt-4">
              <AiProcessing label="Building meal macros…" />
            </div>
          ) : null}
        </div>
      </section>

      {meals ? (
        <section aria-live="polite">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <p
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold"
              style={{ background: 'var(--cl-primary-soft)', color: 'var(--cl-primary)' }}
            >
              <Flame className="h-4 w-4" aria-hidden />~{calories} kcal / day
            </p>
            <p className="cl-small max-w-2xl">{note}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {meals.map((meal) => (
              <li key={meal.title} className="cl-card p-5">
                <p
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: 'var(--cl-primary)' }}
                >
                  {meal.time}
                </p>
                <h3 className="cl-h3 mt-1">{meal.title}</h3>
                <p className="cl-small mt-1">{meal.calories} kcal</p>
                <ul className="mt-3 space-y-1.5">
                  {meal.items.map((item) => (
                    <li key={item} className="text-sm" style={{ color: 'var(--cl-muted)' }}>
                      • {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
