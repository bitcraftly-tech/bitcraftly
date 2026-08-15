'use client';

import { useEffect, useId, useMemo, useState, type ReactNode } from 'react';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import {
  DISCOVERY_BUDGET_OPTIONS,
  DISCOVERY_FEATURE_OPTIONS,
  DISCOVERY_INDUSTRY_OPTIONS,
  DISCOVERY_PRODUCT_OPTIONS,
  DISCOVERY_QUESTIONS,
  DISCOVERY_TIMELINE_OPTIONS,
} from './discovery.content';
import { buildDiscoveryRecommendation, EMPTY_DISCOVERY_ANSWERS } from './discovery.engine';
import { DiscoveryAnalyzing } from './DiscoveryAnalyzing';
import { DiscoveryFinalActions } from './DiscoveryFinalActions';
import { DiscoveryIntro } from './DiscoveryIntro';
import { DiscoveryLeadForm } from './DiscoveryLeadForm';
import { DiscoveryQuestion } from './DiscoveryQuestion';
import { DiscoveryResult } from './DiscoveryResult';
import type {
  DiscoveryAnswers,
  DiscoveryBudgetId,
  DiscoveryFeatureId,
  DiscoveryIndustryId,
  DiscoveryLead,
  DiscoveryProductId,
  DiscoveryStepId,
  DiscoveryTimelineId,
} from './types';
import './discovery-funnel.css';

const QUESTION_TOTAL = 5;

export interface DiscoveryFunnelProps {
  readonly className?: string;
  readonly headingId?: string;
}

export function DiscoveryFunnel({
  className,
  headingId = 'discovery-funnel-heading',
}: DiscoveryFunnelProps) {
  const reactId = useId();
  const [step, setStep] = useState<DiscoveryStepId>('intro');
  const [answers, setAnswers] = useState<DiscoveryAnswers>({
    product: EMPTY_DISCOVERY_ANSWERS.product,
    industry: EMPTY_DISCOVERY_ANSWERS.industry,
    budget: EMPTY_DISCOVERY_ANSWERS.budget,
    timeline: EMPTY_DISCOVERY_ANSWERS.timeline,
    features: [],
  });
  const [lead, setLead] = useState<DiscoveryLead | null>(null);

  const recommendation = useMemo(() => {
    if (step === 'result' || step === 'lead' || step === 'complete') {
      return buildDiscoveryRecommendation(answers);
    }
    return null;
  }, [answers, step]);

  useEffect(() => {
    if (step !== 'analyzing') {
      return;
    }

    const timer = window.setTimeout(() => {
      setStep('result');
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [step]);

  const goAnalyzing = () => setStep('analyzing');

  const restart = () => {
    setStep('intro');
    setAnswers({
      product: null,
      industry: null,
      budget: null,
      timeline: null,
      features: [],
    });
    setLead(null);
  };

  const selectProduct = (id: DiscoveryProductId) => {
    setAnswers((current) => ({ ...current, product: id }));
    setStep('industry');
  };

  const selectIndustry = (id: DiscoveryIndustryId) => {
    setAnswers((current) => ({ ...current, industry: id }));
    setStep('budget');
  };

  const selectBudget = (id: DiscoveryBudgetId) => {
    setAnswers((current) => ({ ...current, budget: id }));
    setStep('timeline');
  };

  const selectTimeline = (id: DiscoveryTimelineId) => {
    setAnswers((current) => ({ ...current, timeline: id }));
    setStep('features');
  };

  const toggleFeature = (id: DiscoveryFeatureId) => {
    setAnswers((current) => {
      const exists = current.features.includes(id);
      return {
        ...current,
        features: exists
          ? current.features.filter((feature) => feature !== id)
          : [...current.features, id],
      };
    });
  };

  let body: ReactNode = null;

  if (step === 'intro') {
    body = <DiscoveryIntro onStart={() => setStep('product')} />;
  } else if (step === 'product') {
    const config = DISCOVERY_QUESTIONS[0]!;
    body = (
      <DiscoveryQuestion
        stepIndex={1}
        totalSteps={QUESTION_TOTAL}
        prompt={config.prompt}
        helper={config.helper}
        options={DISCOVERY_PRODUCT_OPTIONS}
        selectedId={answers.product}
        onSelect={selectProduct}
        onBack={() => setStep('intro')}
      />
    );
  } else if (step === 'industry') {
    const config = DISCOVERY_QUESTIONS[1]!;
    body = (
      <DiscoveryQuestion
        stepIndex={2}
        totalSteps={QUESTION_TOTAL}
        prompt={config.prompt}
        helper={config.helper}
        options={DISCOVERY_INDUSTRY_OPTIONS}
        selectedId={answers.industry}
        onSelect={selectIndustry}
        onBack={() => setStep('product')}
      />
    );
  } else if (step === 'budget') {
    const config = DISCOVERY_QUESTIONS[2]!;
    body = (
      <DiscoveryQuestion
        stepIndex={3}
        totalSteps={QUESTION_TOTAL}
        prompt={config.prompt}
        helper={config.helper}
        options={DISCOVERY_BUDGET_OPTIONS}
        selectedId={answers.budget}
        onSelect={selectBudget}
        onBack={() => setStep('industry')}
      />
    );
  } else if (step === 'timeline') {
    const config = DISCOVERY_QUESTIONS[3]!;
    body = (
      <DiscoveryQuestion
        stepIndex={4}
        totalSteps={QUESTION_TOTAL}
        prompt={config.prompt}
        helper={config.helper}
        options={DISCOVERY_TIMELINE_OPTIONS}
        selectedId={answers.timeline}
        onSelect={selectTimeline}
        onBack={() => setStep('budget')}
      />
    );
  } else if (step === 'features') {
    const config = DISCOVERY_QUESTIONS[4]!;
    body = (
      <DiscoveryQuestion
        stepIndex={5}
        totalSteps={QUESTION_TOTAL}
        prompt={config.prompt}
        helper={config.helper}
        options={DISCOVERY_FEATURE_OPTIONS}
        multi
        selectedIds={answers.features}
        onSelect={toggleFeature}
        onBack={() => setStep('timeline')}
        onContinueMulti={goAnalyzing}
        onSkipMulti={() => {
          setAnswers((current) => ({ ...current, features: [] }));
          goAnalyzing();
        }}
      />
    );
  } else if (step === 'analyzing') {
    body = <DiscoveryAnalyzing />;
  } else if (step === 'result' && recommendation) {
    body = <DiscoveryResult recommendation={recommendation} onContinue={() => setStep('lead')} />;
  } else if (step === 'lead') {
    body = (
      <DiscoveryLeadForm
        onSubmit={(nextLead) => {
          setLead(nextLead);
          setStep('complete');
        }}
      />
    );
  } else if (step === 'complete' && lead && recommendation) {
    body = (
      <DiscoveryFinalActions lead={lead} recommendation={recommendation} onRestart={restart} />
    );
  }

  return (
    <Section
      id="discovery-funnel"
      spacing="lg"
      aria-labelledby={headingId}
      className={['discovery-funnel', className].filter(Boolean).join(' ')}
    >
      <Container>
        <div className="df-shell">
          <h2 id={headingId} className="sr-only">
            AI Discovery Funnel
          </h2>
          <div key={`${reactId}-${step}`} aria-live="polite">
            {body}
          </div>
        </div>
      </Container>
    </Section>
  );
}
