'use client';

import { useEffect, useId, useMemo, useState, type ReactNode } from 'react';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import {
  WIZARD_BUDGET_OPTIONS,
  WIZARD_GOAL_OPTIONS,
  WIZARD_INDUSTRY_OPTIONS,
  WIZARD_PRODUCT_OPTIONS,
  WIZARD_QUESTIONS,
  WIZARD_TIMELINE_OPTIONS,
} from './wizard.content';
import { buildWizardRecommendation, EMPTY_WIZARD_ANSWERS } from './wizard.engine';
import { WizardAnalyzing } from './WizardAnalyzing';
import { WizardIntro } from './WizardIntro';
import { WizardResult } from './WizardResult';
import { WizardStep } from './WizardStep';
import type {
  WizardAnswers,
  WizardBudgetId,
  WizardGoalId,
  WizardIndustryId,
  WizardProductId,
  WizardStepId,
  WizardTimelineId,
} from './types';
import './project-wizard.css';

const QUESTION_TOTAL = 5;

export interface ProjectWizardProps {
  readonly className?: string;
  readonly headingId?: string;
}

export function ProjectWizard({
  className,
  headingId = 'project-wizard-heading',
}: ProjectWizardProps) {
  const reactId = useId();
  const [step, setStep] = useState<WizardStepId>('intro');
  const [answers, setAnswers] = useState<WizardAnswers>({
    ...EMPTY_WIZARD_ANSWERS,
    goals: [],
  });

  const recommendation = useMemo(() => {
    if (step === 'result') {
      return buildWizardRecommendation(answers);
    }
    return null;
  }, [answers, step]);

  useEffect(() => {
    if (step !== 'analyzing') {
      return;
    }

    const timer = window.setTimeout(() => {
      setStep('result');
    }, 1700);

    return () => window.clearTimeout(timer);
  }, [step]);

  const goAnalyzing = () => setStep('analyzing');

  const restart = () => {
    setStep('intro');
    setAnswers({
      product: null,
      industry: null,
      goals: [],
      budget: null,
      timeline: null,
    });
  };

  const selectProduct = (id: WizardProductId) => {
    setAnswers((current) => ({ ...current, product: id }));
    setStep('industry');
  };

  const selectIndustry = (id: WizardIndustryId) => {
    setAnswers((current) => ({ ...current, industry: id }));
    setStep('goals');
  };

  const toggleGoal = (id: WizardGoalId) => {
    setAnswers((current) => {
      const exists = current.goals.includes(id);
      return {
        ...current,
        goals: exists ? current.goals.filter((goal) => goal !== id) : [...current.goals, id],
      };
    });
  };

  const selectBudget = (id: WizardBudgetId) => {
    setAnswers((current) => ({ ...current, budget: id }));
    setStep('timeline');
  };

  const selectTimeline = (id: WizardTimelineId) => {
    setAnswers((current) => ({ ...current, timeline: id }));
    goAnalyzing();
  };

  let body: ReactNode = null;

  if (step === 'intro') {
    body = <WizardIntro onStart={() => setStep('product')} />;
  } else if (step === 'product') {
    const config = WIZARD_QUESTIONS[0]!;
    body = (
      <WizardStep
        stepIndex={1}
        totalSteps={QUESTION_TOTAL}
        prompt={config.prompt}
        helper={config.helper}
        options={WIZARD_PRODUCT_OPTIONS}
        selectedId={answers.product}
        onSelect={selectProduct}
        onBack={() => setStep('intro')}
      />
    );
  } else if (step === 'industry') {
    const config = WIZARD_QUESTIONS[1]!;
    body = (
      <WizardStep
        stepIndex={2}
        totalSteps={QUESTION_TOTAL}
        prompt={config.prompt}
        helper={config.helper}
        options={WIZARD_INDUSTRY_OPTIONS}
        selectedId={answers.industry}
        onSelect={selectIndustry}
        onBack={() => setStep('product')}
      />
    );
  } else if (step === 'goals') {
    const config = WIZARD_QUESTIONS[2]!;
    body = (
      <WizardStep
        stepIndex={3}
        totalSteps={QUESTION_TOTAL}
        prompt={config.prompt}
        helper={config.helper}
        options={WIZARD_GOAL_OPTIONS}
        multi
        selectedIds={answers.goals}
        onSelect={toggleGoal}
        onBack={() => setStep('industry')}
        onContinueMulti={() => setStep('budget')}
        onSkipMulti={() => {
          setAnswers((current) => ({ ...current, goals: [] }));
          setStep('budget');
        }}
      />
    );
  } else if (step === 'budget') {
    const config = WIZARD_QUESTIONS[3]!;
    body = (
      <WizardStep
        stepIndex={4}
        totalSteps={QUESTION_TOTAL}
        prompt={config.prompt}
        helper={config.helper}
        options={WIZARD_BUDGET_OPTIONS}
        selectedId={answers.budget}
        onSelect={selectBudget}
        onBack={() => setStep('goals')}
      />
    );
  } else if (step === 'timeline') {
    const config = WIZARD_QUESTIONS[4]!;
    body = (
      <WizardStep
        stepIndex={5}
        totalSteps={QUESTION_TOTAL}
        prompt={config.prompt}
        helper={config.helper}
        options={WIZARD_TIMELINE_OPTIONS}
        selectedId={answers.timeline}
        onSelect={selectTimeline}
        onBack={() => setStep('budget')}
      />
    );
  } else if (step === 'analyzing') {
    body = <WizardAnalyzing />;
  } else if (step === 'result' && recommendation) {
    body = <WizardResult recommendation={recommendation} onRestart={restart} />;
  }

  return (
    <Section
      id="project-wizard"
      spacing="lg"
      aria-labelledby={headingId}
      className={['project-wizard', className].filter(Boolean).join(' ')}
    >
      <Container>
        <div className="pw-shell">
          <h2 id={headingId} className="sr-only">
            AI Project Wizard
          </h2>
          <div key={`${reactId}-${step}`} aria-live="polite">
            {body}
          </div>
        </div>
      </Container>
    </Section>
  );
}
