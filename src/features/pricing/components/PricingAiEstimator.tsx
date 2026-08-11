'use client';

import { useEffect, useId, useRef, useState, useTransition, type KeyboardEvent } from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import {
  ESTIMATOR_LOADING_STEPS,
  mockEstimateFromPrompt,
  type MockEstimate,
} from '../pricing-estimator.mock';
import {
  EstimatorComposer,
  EstimatorGreeting,
  EstimatorLoading,
  EstimatorResultCard,
  ESTIMATOR_COPY,
} from './estimator';
import './estimator/estimator.css';

interface PricingAiEstimatorProps {
  compact?: boolean;
  className?: string;
}

export function PricingAiEstimator({ compact = false, className }: PricingAiEstimatorProps) {
  const inputId = useId();
  const threadRef = useRef<HTMLDivElement | null>(null);
  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<MockEstimate | null>(null);
  const [phase, setPhase] = useState<'idle' | 'loading' | 'result'>('idle');
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (phase !== 'loading') {
      return;
    }

    setLoadingStep(0);
    const timer = window.setInterval(() => {
      setLoadingStep((current) =>
        current < ESTIMATOR_LOADING_STEPS.length - 1 ? current + 1 : current,
      );
    }, 480);

    return () => window.clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    const node = threadRef.current;
    if (!node) {
      return;
    }
    node.scrollTop = node.scrollHeight;
  }, [phase, loadingStep, estimate, submittedPrompt, error]);

  function enhancePrompt() {
    setError(null);
    if (!prompt.trim()) {
      setPrompt(
        'I need a modern business website with service pages, lead capture, and basic SEO — mobile-first and fast.',
      );
      return;
    }
    setPrompt((current) =>
      current.includes('admin') || current.includes('payments')
        ? current
        : `${current.trim()} Include admin access and a clear proposal.`,
    );
  }

  function generateEstimate(rawValue = prompt) {
    const value = rawValue.trim();
    if (!value) {
      setError(ESTIMATOR_COPY.emptyError);
      return;
    }

    setError(null);
    setSubmittedPrompt(value);
    setEstimate(null);
    setPhase('loading');

    startTransition(() => {
      window.setTimeout(() => {
        setEstimate(mockEstimateFromPrompt(value));
        setPhase('result');
        setPrompt('');
      }, 2600);
    });
  }

  function onComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      generateEstimate();
    }
  }

  const isBusy = phase === 'loading' || isPending;

  return (
    <div
      id="pricing-estimator"
      className={cn('pp-estimator', compact && 'pp-estimator--compact', className)}
      aria-label={ESTIMATOR_COPY.title}
    >
      <div className="pp-estimator__shine" aria-hidden="true" />

      <div className="pp-estimator__head">
        <div className="pp-estimator__title-wrap">
          <span className="pp-estimator__title-icon" aria-hidden>
            <Icon name="sparkles" size="sm" className="h-[15px] w-[15px]" />
          </span>
          <p className="pp-estimator__title">{ESTIMATOR_COPY.title}</p>
        </div>
        <span className="pp-estimator__live">
          <span className="pp-estimator__live-dot" aria-hidden="true" />
          {ESTIMATOR_COPY.liveLabel}
        </span>
      </div>

      <div className="pp-estimator__body">
        <div
          ref={threadRef}
          className={cn('pp-estimator__thread', compact && 'is-compact')}
          aria-live="polite"
        >
          <EstimatorGreeting
            showSuggestions={phase === 'idle' && !submittedPrompt}
            onSuggestion={(value) => {
              setPrompt(value);
              generateEstimate(value);
            }}
          />

          {submittedPrompt ? (
            <div className="pp-msg pp-msg--user">
              <div className="pp-msg__bubble">
                <p>{submittedPrompt}</p>
              </div>
            </div>
          ) : null}

          {phase === 'loading' ? <EstimatorLoading activeStep={loadingStep} /> : null}

          {phase === 'result' && estimate ? <EstimatorResultCard estimate={estimate} /> : null}
        </div>

        {!isBusy ? (
          <EstimatorComposer
            inputId={inputId}
            value={prompt}
            error={error}
            hasEstimate={phase === 'result'}
            disabled={isBusy}
            compact={compact}
            onChange={(value) => {
              setPrompt(value);
              if (error) {
                setError(null);
              }
            }}
            onSubmit={() => generateEstimate()}
            onEnhance={enhancePrompt}
            onKeyDown={onComposerKeyDown}
          />
        ) : null}
      </div>
    </div>
  );
}
