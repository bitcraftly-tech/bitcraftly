import { bcButtonClassName } from '@/components/ui/button';
import { DISCOVERY_NAV } from './discovery.content';
import { DiscoveryOptionChip } from './DiscoveryOptionChip';
import { DiscoveryProgress } from './DiscoveryProgress';
import type { DiscoveryOption } from './types';

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

interface DiscoveryQuestionProps<T extends string> {
  readonly stepIndex: number;
  readonly totalSteps: number;
  readonly prompt: string;
  readonly helper: string;
  readonly options: readonly DiscoveryOption<T>[];
  readonly multi?: boolean;
  readonly selectedId?: T | null;
  readonly selectedIds?: readonly T[];
  readonly onSelect: (id: T) => void;
  readonly onBack: () => void;
  readonly onContinueMulti?: () => void;
  readonly onSkipMulti?: () => void;
}

export function DiscoveryQuestion<T extends string>({
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
}: DiscoveryQuestionProps<T>) {
  const useGrid = options.length > 4;

  return (
    <div className="df-card">
      <DiscoveryProgress current={stepIndex} total={totalSteps} />
      <h2 className="df-prompt">{prompt}</h2>
      <p className="df-helper">{helper}</p>

      <div
        className={['df-options', useGrid ? 'df-options--grid' : ''].filter(Boolean).join(' ')}
        role={multi ? 'group' : 'radiogroup'}
        aria-label={prompt}
      >
        {options.map((option) => {
          const pressed = multi
            ? selectedIds.includes(option.id)
            : selectedId === option.id;

          return (
            <DiscoveryOptionChip
              key={option.id}
              label={option.label}
              description={option.description}
              pressed={pressed}
              onSelect={() => onSelect(option.id)}
            />
          );
        })}
      </div>

      <div className="df-actions">
        <button type="button" className={backClassName} onClick={onBack}>
          {DISCOVERY_NAV.backLabel}
        </button>

        {multi ? (
          <>
            <button type="button" className={backClassName} onClick={onSkipMulti}>
              {DISCOVERY_NAV.skipFeaturesLabel}
            </button>
            <button type="button" className={continueClassName} onClick={onContinueMulti}>
              {DISCOVERY_NAV.continueFeaturesLabel}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
