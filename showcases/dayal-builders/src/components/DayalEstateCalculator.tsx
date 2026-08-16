'use client';

import { IndianRupee, Percent, CalendarDays, Wallet } from 'lucide-react';
import { useId, useMemo, useState } from 'react';

import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import DayalSectionLink from '@bitcraftly/showcase-dayal-builders/components/DayalSectionLink';
import {
  EMI_DEFAULTS,
  calculateEmi,
  formatLakh,
  formatRupees,
} from '@bitcraftly/showcase-dayal-builders/lib/estate';

export default function DayalEstateCalculator() {
  const fieldId = useId();
  const [price, setPrice] = useState<number>(EMI_DEFAULTS.price);
  const [downPct, setDownPct] = useState<number>(EMI_DEFAULTS.downPaymentPct);
  const [rate, setRate] = useState<number>(EMI_DEFAULTS.rate);
  const [tenure, setTenure] = useState<number>(EMI_DEFAULTS.tenure);

  const summary = useMemo(() => {
    const downPayment = (price * downPct) / 100;
    const loan = Math.max(price - downPayment, 0);
    const emi = calculateEmi(loan, rate, tenure);
    const totalPayable = emi * tenure * 12;
    const interest = Math.max(totalPayable - loan, 0);
    const principalShare = totalPayable > 0 ? (loan / totalPayable) * 100 : 0;
    return { downPayment, loan, emi, totalPayable, interest, principalShare };
  }, [price, downPct, rate, tenure]);

  return (
    <section
      id="emi"
      className="dre-anchor bg-[#0b1633] py-9 text-white sm:py-11 lg:py-14"
      aria-label="Home loan EMI calculator"
    >
      <div className="dayal-container">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12">
          <DayalReveal className="min-w-0">
            <p className="dre-eyebrow">Affordability</p>
            <h2 className="dre-title dre-title--light mt-3">Work out your monthly EMI</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
              Move the sliders to see how price, down payment and tenure change your monthly outgo.
              Our team can share bank tie-up options for every ongoing project.
            </p>

            <div className="mt-7 space-y-6">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor={`${fieldId}-price`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/65"
                  >
                    <IndianRupee className="h-3.5 w-3.5 text-[#c8a46b]" aria-hidden />
                    Property price
                  </label>
                  <output className="text-sm font-bold tabular-nums">{formatLakh(price)}</output>
                </div>
                <input
                  id={`${fieldId}-price`}
                  type="range"
                  className="dre-range dre-range--on-dark mt-3"
                  min={EMI_DEFAULTS.minPrice}
                  max={EMI_DEFAULTS.maxPrice}
                  step={EMI_DEFAULTS.priceStep}
                  value={price}
                  onChange={(event) => setPrice(Number(event.target.value))}
                />
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor={`${fieldId}-down`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/65"
                  >
                    <Wallet className="h-3.5 w-3.5 text-[#c8a46b]" aria-hidden />
                    Down payment
                  </label>
                  <output className="text-sm font-bold tabular-nums">
                    {downPct}% · {formatLakh(summary.downPayment)}
                  </output>
                </div>
                <input
                  id={`${fieldId}-down`}
                  type="range"
                  className="dre-range dre-range--on-dark mt-3"
                  min={10}
                  max={60}
                  step={1}
                  value={downPct}
                  onChange={(event) => setDownPct(Number(event.target.value))}
                />
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor={`${fieldId}-rate`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/65"
                  >
                    <Percent className="h-3.5 w-3.5 text-[#c8a46b]" aria-hidden />
                    Interest rate
                  </label>
                  <output className="text-sm font-bold tabular-nums">
                    {rate.toFixed(1)}% p.a.
                  </output>
                </div>
                <input
                  id={`${fieldId}-rate`}
                  type="range"
                  className="dre-range dre-range--on-dark mt-3"
                  min={EMI_DEFAULTS.minRate}
                  max={EMI_DEFAULTS.maxRate}
                  step={EMI_DEFAULTS.rateStep}
                  value={rate}
                  onChange={(event) => setRate(Number(event.target.value))}
                />
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor={`${fieldId}-tenure`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/65"
                  >
                    <CalendarDays className="h-3.5 w-3.5 text-[#c8a46b]" aria-hidden />
                    Tenure
                  </label>
                  <output className="text-sm font-bold tabular-nums">{tenure} years</output>
                </div>
                <input
                  id={`${fieldId}-tenure`}
                  type="range"
                  className="dre-range dre-range--on-dark mt-3"
                  min={EMI_DEFAULTS.minTenure}
                  max={EMI_DEFAULTS.maxTenure}
                  step={1}
                  value={tenure}
                  onChange={(event) => setTenure(Number(event.target.value))}
                />
              </div>
            </div>
          </DayalReveal>

          <DayalReveal
            delay={0.08}
            className="min-w-0 rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Monthly EMI
            </p>
            <p
              className="dayal-serif mt-1 text-4xl font-semibold tabular-nums text-[#e0c48f] sm:text-5xl"
              aria-live="polite"
            >
              {formatRupees(summary.emi)}
            </p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                <dt className="text-white/65">Loan amount</dt>
                <dd className="font-semibold tabular-nums">{formatRupees(summary.loan)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                <dt className="text-white/65">Down payment</dt>
                <dd className="font-semibold tabular-nums">{formatRupees(summary.downPayment)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                <dt className="text-white/65">Total interest</dt>
                <dd className="font-semibold tabular-nums">{formatRupees(summary.interest)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-white/65">Total payable</dt>
                <dd className="font-semibold tabular-nums">{formatRupees(summary.totalPayable)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <div className="dre-emi__split" aria-hidden>
                <i style={{ width: `${summary.principalShare}%`, background: '#c8a46b' }} />
                <i
                  style={{
                    width: `${100 - summary.principalShare}%`,
                    background: 'rgba(255,255,255,0.32)',
                  }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[0.7rem] font-semibold text-white/60">
                <span>Principal {Math.round(summary.principalShare)}%</span>
                <span>Interest {Math.round(100 - summary.principalShare)}%</span>
              </div>
            </div>

            <DayalSectionLink
              href="#contact"
              className="mt-6 flex w-full items-center justify-center rounded-lg bg-[#c8a46b] px-4 py-2.5 text-sm font-bold text-[#0b1633] transition hover:bg-[#d4b57d]"
            >
              Talk to a home-loan desk
            </DayalSectionLink>

            <p className="mt-3 text-[0.7rem] leading-relaxed text-white/50">
              Indicative calculation on reducing balance. Actual rates, processing fees and
              eligibility depend on your lender.
            </p>
          </DayalReveal>
        </div>
      </div>
    </section>
  );
}
