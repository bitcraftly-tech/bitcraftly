import { Icon } from '@/components/ui/icon';
import { ESTIMATOR_LOADING_STEPS } from '../../pricing-estimator.mock';
import { ESTIMATOR_COPY } from './estimator.content';

interface EstimatorLoadingProps {
  readonly activeStep: number;
}

export function EstimatorLoading({ activeStep }: EstimatorLoadingProps) {
  return (
    <div className="pp-msg pp-msg--ai ae-loading">
      <span className="pp-msg__avatar is-thinking" aria-hidden>
        <Icon name="sparkles" size="sm" className="h-[12px] w-[12px]" />
      </span>
      <div className="pp-msg__bubble pp-msg__bubble--loading">
        <div className="pp-estimator__thinking" role="status" aria-live="polite">
          <span className="pp-estimator__dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="ae-loading__title">{ESTIMATOR_COPY.analyzingLabel}</span>
        </div>
        <ol className="ae-loading__steps">
          {ESTIMATOR_LOADING_STEPS.map((step, index) => {
            const state = index < activeStep ? 'is-done' : index === activeStep ? 'is-active' : '';
            return (
              <li key={step} className={state}>
                <span className="ae-loading__mark" aria-hidden>
                  {index < activeStep ? '✓' : index === activeStep ? '•' : ''}
                </span>
                {step}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
