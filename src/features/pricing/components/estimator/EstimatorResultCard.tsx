import type { MockEstimate } from '../../pricing-estimator.mock';
import {
  RecommendationActions,
  RecommendationChips,
  RecommendationField,
  RecommendationWhy,
} from '../recommendation';
import { Icon } from '@/components/ui/icon';
import { ESTIMATOR_COPY } from './estimator.content';

interface EstimatorResultCardProps {
  readonly estimate: MockEstimate;
}

export function EstimatorResultCard({ estimate }: EstimatorResultCardProps) {
  const packageQuery = encodeURIComponent(estimate.packageName);
  const investmentLabel =
    estimate.maxLabel === 'Custom'
      ? `${estimate.minLabel}+`
      : `${estimate.minLabel} – ${estimate.maxLabel}`;

  return (
    <div className="pp-msg pp-msg--ai ae-result">
      <span className="pp-msg__avatar" aria-hidden>
        <Icon name="sparkles" size="sm" className="h-[12px] w-[12px]" />
      </span>
      <div className="pp-msg__bubble pp-msg__bubble--result">
        <p className="pp-msg__reply">{estimate.reply}</p>

        <article className="ae-result-card" aria-label={ESTIMATOR_COPY.resultEyebrow}>
          <p className="ae-result-card__eyebrow">{ESTIMATOR_COPY.resultEyebrow}</p>

          <div className="ae-result-card__grid">
            <RecommendationField
              label={ESTIMATOR_COPY.projectTypeLabel}
              value={estimate.projectType}
              icon="layout-grid"
            />
            <RecommendationField
              label={ESTIMATOR_COPY.categoryLabel}
              value={estimate.businessCategory}
              icon="globe"
            />
            <RecommendationField
              label={ESTIMATOR_COPY.packageLabel}
              value={estimate.packageName}
              icon="star"
            />
            <RecommendationField
              label={ESTIMATOR_COPY.timelineLabel}
              value={estimate.timeline}
              icon="calendar"
            />
            <RecommendationField
              label={ESTIMATOR_COPY.investmentLabel}
              value={investmentLabel}
              icon="zap"
              emphasize
              fullWidth
            />
            <RecommendationChips
              label={ESTIMATOR_COPY.stackLabel}
              icon="code"
              items={estimate.techStack}
            />
            <RecommendationChips
              label={ESTIMATOR_COPY.addOnsLabel}
              icon="sparkles"
              items={estimate.addOns}
            />
          </div>

          <RecommendationWhy title={ESTIMATOR_COPY.whyTitle} body={estimate.whyPackage} />

          <p className="ae-result-card__note">{ESTIMATOR_COPY.resultNote}</p>

          <RecommendationActions
            actions={[
              {
                label: ESTIMATOR_COPY.primaryCta.label,
                href: `${ESTIMATOR_COPY.primaryCta.href}&package=${packageQuery}`,
                primary: true,
              },
              {
                label: ESTIMATOR_COPY.secondaryCta.label,
                href: `${ESTIMATOR_COPY.secondaryCta.href}&package=${packageQuery}`,
              },
              {
                label: ESTIMATOR_COPY.tertiaryCta.label,
                href: `${ESTIMATOR_COPY.tertiaryCta.href}&package=${packageQuery}`,
              },
            ]}
          />
        </article>
      </div>
    </div>
  );
}
