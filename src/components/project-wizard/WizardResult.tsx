import Link from 'next/link';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { WIZARD_FINAL_ACTIONS, WIZARD_NAV, WIZARD_RESULT_META } from './wizard.content';
import type { WizardRecommendation } from './types';

interface WizardResultProps {
  readonly recommendation: WizardRecommendation;
  readonly onRestart: () => void;
}

export function WizardResult({ recommendation, onRestart }: WizardResultProps) {
  return (
    <div className="pw-card">
      <p className="pw-eyebrow">{WIZARD_RESULT_META.eyebrow}</p>
      <h2 className="pw-title">{WIZARD_RESULT_META.title}</h2>
      <p className="pw-desc">{WIZARD_RESULT_META.description}</p>

      <div className="pw-result__grid">
        <div className="pw-result__block pw-result__block--wide">
          <p className="pw-result__label">Recommended solution</p>
          <p className="pw-result__value">{recommendation.solutionName}</p>
          <p className="pw-result__text">{recommendation.solutionSummary}</p>
        </div>

        <div className="pw-result__block">
          <p className="pw-result__label">Best package</p>
          <p className="pw-result__value">{recommendation.bestPackage}</p>
          <p className="pw-result__text">{recommendation.packageSummary}</p>
        </div>

        <div className="pw-result__block">
          <p className="pw-result__label">Estimated timeline</p>
          <p className="pw-result__value">{recommendation.estimatedTimeline}</p>
        </div>

        <div className="pw-result__block">
          <p className="pw-result__label">Estimated cost</p>
          <p className="pw-result__value">{recommendation.estimatedCost}</p>
        </div>

        <div className="pw-result__block">
          <p className="pw-result__label">Suggested technology</p>
          <ul className="pw-chips">
            {recommendation.suggestedTechnology.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className="pw-result__block">
          <p className="pw-result__label">Recommended add-ons</p>
          {recommendation.recommendedAddOns.length > 0 ? (
            <ul className="pw-chips">
              {recommendation.recommendedAddOns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="pw-result__text">No add-ons required for this scope.</p>
          )}
        </div>

        <div className="pw-result__block pw-result__block--wide">
          <p className="pw-result__label">AI opportunities</p>
          <ul className="pw-list">
            {recommendation.aiOpportunities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="pw-result__block pw-result__block--wide">
          <p className="pw-result__label">Development phases</p>
          <ol className="pw-phases">
            {recommendation.developmentPhases.map((phase) => (
              <li key={phase.id} className="pw-phase">
                <p className="pw-phase__meta">{phase.duration}</p>
                <h3 className="pw-phase__title">{phase.title}</h3>
                <p className="pw-phase__desc">{phase.description}</p>
              </li>
            ))}
          </ol>
        </div>

        {recommendation.why.length > 0 ? (
          <div className="pw-result__block pw-result__block--wide">
            <p className="pw-result__label">Why this path</p>
            <ul className="pw-list">
              {recommendation.why.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="pw-final-actions">
        {WIZARD_FINAL_ACTIONS.map((action) => {
          const className = bcButtonClassName({
            variant: action.variant,
            size: 'lg',
            className:
              action.variant === 'primary'
                ? 'group h-[50px] w-full justify-center px-[22px]'
                : 'h-[50px] w-full justify-center px-[22px]',
          });

          return (
            <Link key={action.id} href={action.href} className={className}>
              <span>{action.label}</span>
              {action.variant === 'primary' ? <ButtonArrow className="text-[15px]" /> : null}
            </Link>
          );
        })}
      </div>

      <div className="pw-actions">
        <button
          type="button"
          className={bcButtonClassName({
            variant: 'ghost',
            size: 'md',
            className: 'h-[44px] px-[16px]',
          })}
          onClick={onRestart}
        >
          {WIZARD_NAV.restartLabel}
        </button>
      </div>
    </div>
  );
}
