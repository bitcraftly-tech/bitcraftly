import { PORTFOLIO } from '@/lib/portfolioContent';
import { PORTFOLIO_STRUCTURE_STEP } from '@/lib/portfolioPalette';

const TRUST_STATS = [
  { value: '20+', label: 'Years frontend delivery' },
  { value: 'React', label: '& Next.js specialist' },
  { value: 'Founder', label: 'Led by Sanjay Kr. Singh' },
  { value: 'Written', label: 'Scope before payment' },
] as const;

export default function PortfolioTrustStrip() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {TRUST_STATS.map((stat) => (
          <div key={stat.label} className={`${PORTFOLIO_STRUCTURE_STEP} text-center`}>
            <p className="font-[var(--font-playfair)] text-xl font-semibold text-[#2980b9] dark:text-[#5dade2]">
              {stat.value}
            </p>
            <p className="mt-1 text-[11px] font-medium text-text-secondary dark:text-dark-text-secondary">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <p className="max-w-3xl text-sm italic leading-relaxed text-text-secondary dark:text-dark-text-secondary">
        {PORTFOLIO.trustStoryline}
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PORTFOLIO.structureSteps.map((step) => (
          <article key={step.step} className={PORTFOLIO_STRUCTURE_STEP}>
            <p className="text-[10px] font-bold text-[#2980b9] dark:text-[#5dade2]">{step.step}</p>
            <p className="mt-1 text-xs font-semibold text-text-primary dark:text-dark-text-primary">
              {step.title}
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-text-secondary dark:text-dark-text-secondary">
              {step.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
