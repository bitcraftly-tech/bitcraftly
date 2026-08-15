'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@/components/ui/icon';
import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { AnimatedCurrency } from './AnimatedCurrency';
import {
  BUDGET_OPTIONS,
  FEATURE_OPTIONS,
  PAGE_RANGE_OPTIONS,
  TIMELINE_OPTIONS,
  WEBSITE_TYPE_OPTIONS,
} from './pricing-calculator.config';
import { calculatePricingEstimate, formatInr } from './pricing-calculator.engine';
import {
  pricingCalculatorSchema,
  type PricingCalculatorFormValues,
} from './pricing-calculator.schema';
import {
  ECOMMERCE_QUOTE_PRESET,
  ECOMMERCE_REQUIRED_FEATURES,
  formatFeatureWiseQuotation,
} from './pricing-quotation';
import './pricing-calculator.css';

const DEFAULT_VALUES: PricingCalculatorFormValues = {
  websiteType: 'business',
  pages: '6-10',
  features: ['seo'],
  timeline: 'standard',
  budget: '50k-1L',
};

export interface PricingCalculatorProps {
  className?: string;
  /** Optional heading override for reuse across pages. */
  headingId?: string;
}

function OptionButton({
  selected,
  label,
  description,
  onSelect,
  type = 'radio',
}: {
  selected: boolean;
  label: string;
  description: string;
  onSelect: () => void;
  type?: 'radio' | 'checkbox';
}) {
  return (
    <button
      type="button"
      role={type === 'checkbox' ? 'checkbox' : 'radio'}
      aria-checked={selected}
      onClick={onSelect}
      className={cn('pricing-calc__option', selected && 'pricing-calc__option--selected')}
    >
      <span className="pricing-calc__option-label">{label}</span>
      <span className="pricing-calc__option-desc">{description}</span>
    </button>
  );
}

/**
 * Enterprise pricing calculator — RHF + Zod, reusable across marketing pages.
 */
export function PricingCalculator({
  className,
  headingId = 'pricing-calculator-heading',
}: PricingCalculatorProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<PricingCalculatorFormValues>({
    resolver: zodResolver(pricingCalculatorSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  const values = useWatch({ control });
  const estimate = useMemo(() => calculatePricingEstimate(values), [values]);

  // Ecommerce store builds always include Razorpay payment gateway.
  useEffect(() => {
    if (values.websiteType !== 'ecommerce') {
      return;
    }

    const current = values.features ?? [];
    const missing = ECOMMERCE_REQUIRED_FEATURES.filter((id) => !current.includes(id));
    if (missing.length === 0) {
      return;
    }

    setValue('features', [...current, ...missing], { shouldValidate: true });
  }, [values.websiteType, values.features, setValue]);

  const quotationText = useMemo(
    () =>
      formatFeatureWiseQuotation({
        values,
        estimate,
        siteOrigin:
          typeof window !== 'undefined' ? window.location.origin : 'https://bitcraftly.com',
      }),
    [values, estimate],
  );

  const budgetMessage =
    estimate.budgetAlignment === 'above'
      ? 'Estimate is above your selected budget — we can phase delivery.'
      : estimate.budgetAlignment === 'below'
        ? 'Estimate sits under your budget range — room for stronger features.'
        : estimate.budgetAlignment === 'within'
          ? 'Estimate aligns with your selected budget band.'
          : 'Share a budget preference for a tighter recommendation.';

  function applyEcommercePreset() {
    reset(ECOMMERCE_QUOTE_PRESET);
    setCopyState('idle');
  }

  async function copyQuotation() {
    if (!estimate.isReady) {
      return;
    }

    try {
      await navigator.clipboard.writeText(quotationText);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 2500);
    } catch {
      setCopyState('error');
      window.setTimeout(() => setCopyState('idle'), 2500);
    }
  }

  function onSubmit() {
    const href = new URL(NAV_ACTIONS.freeConsultation.href, 'https://bitcraftly.local');
    href.searchParams.set('intent', 'quote');
    href.searchParams.set('source', 'pricing-calculator');
    href.searchParams.set('service', estimate.packageName);
    href.searchParams.set(
      'budget',
      `${formatInr(estimate.estimatedMin)}–${formatInr(estimate.estimatedMax)}`,
    );
    window.location.assign(`${href.pathname}?${href.searchParams.toString()}`);
  }

  return (
    <div className={cn('pricing-calc', className)}>
      <div className="pricing-calc__intro">
        <p className="pricing-calc__eyebrow">Pricing calculator</p>
        <h2 id={headingId} className="pricing-calc__title">
          Build a transparent project estimate
        </h2>
        <p className="pricing-calc__description">
          Choose website type, pages, features, timeline, and budget. Get a live feature-wise cost
          breakdown — copy a client-ready quotation in one click.
        </p>
        <div className="pricing-calc__presets">
          <button type="button" className="pricing-calc__preset" onClick={applyEcommercePreset}>
            E-commerce quote preset
            <Icon name="arrow-right" size="sm" aria-hidden />
          </button>
          <p className="pricing-calc__preset-hint">
            Loads store + Razorpay gateway + admin + SEO + analytics (typical client ask).
          </p>
        </div>
      </div>

      <form
        className="pricing-calc__layout"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-labelledby={headingId}
      >
        <div className="pricing-calc__fields">
          <fieldset className="pricing-calc__fieldset">
            <legend className="pricing-calc__legend">Website type</legend>
            {errors.websiteType ? (
              <p className="pricing-calc__error" role="alert">
                {errors.websiteType.message}
              </p>
            ) : null}
            <Controller
              name="websiteType"
              control={control}
              render={({ field }) => (
                <div className="pricing-calc__options" role="radiogroup" aria-label="Website type">
                  {WEBSITE_TYPE_OPTIONS.map((option) => (
                    <OptionButton
                      key={option.id}
                      selected={field.value === option.id}
                      label={option.label}
                      description={option.description}
                      onSelect={() => field.onChange(option.id)}
                    />
                  ))}
                </div>
              )}
            />
          </fieldset>

          <fieldset className="pricing-calc__fieldset">
            <legend className="pricing-calc__legend">Pages</legend>
            {errors.pages ? (
              <p className="pricing-calc__error" role="alert">
                {errors.pages.message}
              </p>
            ) : null}
            <Controller
              name="pages"
              control={control}
              render={({ field }) => (
                <div
                  className="pricing-calc__options pricing-calc__options--compact"
                  role="radiogroup"
                  aria-label="Approximate page count"
                >
                  {PAGE_RANGE_OPTIONS.map((option) => (
                    <OptionButton
                      key={option.id}
                      selected={field.value === option.id}
                      label={option.label}
                      description={option.description}
                      onSelect={() => field.onChange(option.id)}
                    />
                  ))}
                </div>
              )}
            />
          </fieldset>

          <fieldset className="pricing-calc__fieldset">
            <legend className="pricing-calc__legend">Features</legend>
            <p className="pricing-calc__hint" id="pricing-features-hint">
              Feature-wise add-ons with prices. For ecommerce, Payment Gateway (Razorpay) stays
              selected.
            </p>
            <Controller
              name="features"
              control={control}
              render={({ field }) => (
                <div
                  className="pricing-calc__options"
                  role="group"
                  aria-describedby="pricing-features-hint"
                >
                  {FEATURE_OPTIONS.map((option) => {
                    const selected = field.value.includes(option.id);
                    const isEcommerceRequired =
                      values.websiteType === 'ecommerce' &&
                      ECOMMERCE_REQUIRED_FEATURES.includes(
                        option.id as (typeof ECOMMERCE_REQUIRED_FEATURES)[number],
                      );
                    return (
                      <OptionButton
                        key={option.id}
                        type="checkbox"
                        selected={selected}
                        label={`${option.label} · ${formatInr(option.price)}`}
                        description={
                          isEcommerceRequired
                            ? `${option.description} · Required for ecommerce`
                            : option.description
                        }
                        onSelect={() => {
                          if (isEcommerceRequired && selected) {
                            return;
                          }
                          const next = selected
                            ? field.value.filter((id) => id !== option.id)
                            : [...field.value, option.id];
                          field.onChange(next);
                          setValue('features', next, { shouldValidate: true });
                        }}
                      />
                    );
                  })}
                </div>
              )}
            />
          </fieldset>

          <fieldset className="pricing-calc__fieldset">
            <legend className="pricing-calc__legend">Timeline</legend>
            {errors.timeline ? (
              <p className="pricing-calc__error" role="alert">
                {errors.timeline.message}
              </p>
            ) : null}
            <Controller
              name="timeline"
              control={control}
              render={({ field }) => (
                <div
                  className="pricing-calc__options pricing-calc__options--compact"
                  role="radiogroup"
                  aria-label="Preferred timeline"
                >
                  {TIMELINE_OPTIONS.map((option) => (
                    <OptionButton
                      key={option.id}
                      selected={field.value === option.id}
                      label={option.label}
                      description={option.description}
                      onSelect={() => field.onChange(option.id)}
                    />
                  ))}
                </div>
              )}
            />
          </fieldset>

          <fieldset className="pricing-calc__fieldset">
            <legend className="pricing-calc__legend">Budget</legend>
            {errors.budget ? (
              <p className="pricing-calc__error" role="alert">
                {errors.budget.message}
              </p>
            ) : null}
            <Controller
              name="budget"
              control={control}
              render={({ field }) => (
                <div
                  className="pricing-calc__options pricing-calc__options--compact"
                  role="radiogroup"
                  aria-label="Budget range"
                >
                  {BUDGET_OPTIONS.map((option) => (
                    <OptionButton
                      key={option.id}
                      selected={field.value === option.id}
                      label={option.label}
                      description={option.description}
                      onSelect={() => field.onChange(option.id)}
                    />
                  ))}
                </div>
              )}
            />
          </fieldset>
        </div>

        <aside className="pricing-calc__estimate" aria-live="polite" aria-atomic="true">
          <div className="pricing-calc__estimate-card pricing-calc__estimate-card--enter">
            <p className="pricing-calc__estimate-label">Cost estimate</p>
            <p className="pricing-calc__estimate-range">
              <AnimatedCurrency
                value={estimate.estimatedMin}
                format={formatInr}
                className="pricing-calc__estimate-value"
              />
              <span className="pricing-calc__estimate-sep" aria-hidden>
                –
              </span>
              <AnimatedCurrency
                value={estimate.estimatedMax}
                format={formatInr}
                className="pricing-calc__estimate-value"
              />
            </p>
            <p className="pricing-calc__estimate-note">
              Indicative range · GST extra · final quote after scope
            </p>

            <div className="pricing-calc__package">
              <p className="pricing-calc__package-label">Recommended package</p>
              <p className="pricing-calc__package-name">{estimate.packageName}</p>
              <p className="pricing-calc__package-summary">{estimate.packageSummary}</p>
            </div>

            <dl className="pricing-calc__meta">
              <div>
                <dt>Timeline preference</dt>
                <dd>{estimate.timelineLabel}</dd>
              </div>
              <div>
                <dt>Budget fit</dt>
                <dd>{budgetMessage}</dd>
              </div>
            </dl>

            {estimate.lines.length > 0 ? (
              <ul className="pricing-calc__lines">
                {estimate.lines.map((line) => (
                  <li key={line.id}>
                    <span>{line.label}</span>
                    <span>{formatInr(line.amount)}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="pricing-calc__actions">
              <button
                type="button"
                className="pricing-calc__copy"
                disabled={!estimate.isReady}
                onClick={() => {
                  void copyQuotation();
                }}
                aria-describedby="pricing-copy-status"
              >
                {copyState === 'copied'
                  ? 'Copied — paste to WhatsApp / email'
                  : 'Copy feature-wise quotation'}
                <Icon
                  name={copyState === 'copied' ? 'check' : 'arrow-up-right'}
                  size="sm"
                  aria-hidden
                />
              </button>
              <p id="pricing-copy-status" className="pricing-calc__copy-status" role="status">
                {copyState === 'error'
                  ? 'Copy failed — try again or copy the breakdown manually.'
                  : 'For you: copy and send to the client as a feature-wise price list.'}
              </p>
              <button
                type="submit"
                className="pricing-calc__primary"
                disabled={isSubmitting || !estimate.isReady}
              >
                Book consultation with this estimate
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </button>
              <Link href={ROUTES.contact} className="pricing-calc__secondary">
                Talk to us first
              </Link>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
