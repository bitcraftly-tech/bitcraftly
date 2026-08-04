import { bcButtonClassName } from '@/components/ui/button';
import { WIZARD_NAV } from './wizard.content';
import { WizardOptionChip } from './WizardOptionChip';
import { WizardProgress } from './WizardProgress';
import type { WizardOption } from './types';

const backClassName = bcButtonClassName({
  variant: 'outline',
  size: 'md',
  className: 'h-[44px] px-[18px]',
});

const continueClassName = bcButtonClassName({
  variant: 'primary',
  size: 'md',
  className: 'h-[44px] px-[18px]',
});

interface WizardStepProps<T extends string> {
  readonly stepIndex: number;
  readonly totalSteps: number;
  readonly prompt: string;
  readonly helper: string;
  readonly options: readonly WizardOption<T>[];
  readonly multi?: boolean;
  readonly selectedId?: T | null;
  readonly selectedIds?: readonly T[];
  readonly onSelect: (id: T) => void;
  readonly onBack: () => void;
  readonly onContinueMulti?: () => void;
  readonly onSkipMulti?: () => void;
}

export function WizardStep<T extends string>({
  stepIndex,
  totalSteps,
  prompt,
  helper,
  options,
  multi = false,
  selectedId = null,
  selectedIds = [],
  onSelect,
  onBack,
  onContinueMulti,
  onSkipMulti,
}: WizardStepProps<T>) {
  const useGrid = options.length > 4;

  return (
    <div className="pw-card">
      <WizardProgress current={stepIndex} total={totalSteps} />
      <h2 className="pw-prompt">{prompt}</h2>
      <p className="pw-helper">{helper}</p>

      <div
        className={['pw-options', useGrid ? 'pw-options--grid' : ''].filter(Boolean).join(' ')}
        role={multi ? 'group' : 'radiogroup'}
        aria-label={prompt}
      >
        {options.map((option) => {
          const pressed = multi
            ? selectedIds.includes(option.id)
            : selectedId === option.id;

          return (
            <WizardOptionChip
              key={option.id}
              label={option.label}
              description={option.description}
              pressed={pressed}
              onSelect={() => onSelect(option.id)}
            />
          );
        })}
      </div>

      <div className="pw-actions">
        <button type="button" className={backClassName} onClick={onBack}>
          {WIZARD_NAV.backLabel}
        </button>

        {multi ? (
          <>
            <button type="button" className={backClassName} onClick={onSkipMulti}>
              {WIZARD_NAV.skipGoalsLabel}
            </button>
            <button type="button" className={continueClassName} onClick={onContinueMulti}>
              {WIZARD_NAV.continueLabel}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
