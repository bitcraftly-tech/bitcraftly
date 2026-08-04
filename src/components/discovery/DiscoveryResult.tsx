import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { DISCOVERY_RESULT_META } from './discovery.content';
import type { DiscoveryRecommendation } from './types';

const continueClassName = bcButtonClassName({
  variant: 'primary',
  size: 'lg',
  className: 'group h-[50px] px-[22px]',
});

interface DiscoveryResultProps {
  readonly recommendation: DiscoveryRecommendation;
  readonly onContinue: () => void;
}

export function DiscoveryResult({ recommendation, onContinue }: DiscoveryResultProps) {
  return (
    <div className="df-card">
      <p className="df-eyebrow">{DISCOVERY_RESULT_META.eyebrow}</p>
      <h2 className="df-title">{DISCOVERY_RESULT_META.title}</h2>
      <p className="df-desc">{DISCOVERY_RESULT_META.description}</p>

      <div className="df-result__grid">
        <div className="df-result__block df-result__block--wide">
          <p className="df-result__label">Recommended package</p>
          <p className="df-result__value">{recommendation.packageName}</p>
          <p className="df-result__text" style={{ marginTop: '0.45rem' }}>
            {recommendation.packageSummary}
          </p>
        </div>

        <div className="df-result__block">
          <p className="df-result__label">Estimated timeline</p>
          <p className="df-result__value">{recommendation.estimatedTimeline}</p>
        </div>

        <div className="df-result__block">
          <p className="df-result__label">Estimated investment</p>
          <p className="df-result__value">{recommendation.estimatedInvestment}</p>
        </div>

        <div className="df-result__block">
          <p className="df-result__label">Recommended tech stack</p>
          <ul className="df-chips">
            {recommendation.techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className="df-result__block">
          <p className="df-result__label">Suggested add-ons</p>
          {recommendation.suggestedAddOns.length > 0 ? (
            <ul className="df-chips">
              {recommendation.suggestedAddOns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="df-result__text">No add-ons required for this scope.</p>
          )}
        </div>

        {recommendation.why.length > 0 ? (
          <div className="df-result__block df-result__block--wide">
            <p className="df-result__label">Why this recommendation</p>
            <ul className="df-why">
              {recommendation.why.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="df-actions">
        <button type="button" className={continueClassName} onClick={onContinue}>
          <span>{DISCOVERY_RESULT_META.continueLabel}</span>
          <ButtonArrow className="text-[15px]" />
        </button>
      </div>
    </div>
  );
}
