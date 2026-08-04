import type { KeyboardEvent } from 'react';
import { bcButtonClassName } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ESTIMATOR_COPY } from './estimator.content';

interface EstimatorComposerProps {
  readonly inputId: string;
  readonly value: string;
  readonly error: string | null;
  readonly hasEstimate: boolean;
  readonly disabled: boolean;
  readonly compact?: boolean;
  readonly onChange: (value: string) => void;
  readonly onSubmit: () => void;
  readonly onEnhance: () => void;
  readonly onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const enhanceClassName = bcButtonClassName({
  variant: 'outline',
  size: 'md',
  className: 'h-[42px] w-full',
});

const generateClassName = bcButtonClassName({
  variant: 'primary',
  size: 'md',
  className: 'h-[42px] w-full',
});

export function EstimatorComposer({
  inputId,
  value,
  error,
  hasEstimate,
  disabled,
  compact = false,
  onChange,
  onSubmit,
  onEnhance,
  onKeyDown,
}: EstimatorComposerProps) {
  return (
    <div className="pp-estimator__composer">
      {error ? (
        <p className="ae-error" role="alert">
          {error}
        </p>
      ) : null}

      <label className="pp-estimator__label" htmlFor={inputId}>
        Your message
      </label>
      <textarea
        id={inputId}
        className="pp-estimator__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder={ESTIMATOR_COPY.placeholder}
        rows={compact ? 3 : 4}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error ? (
        <span id={`${inputId}-error`} className="sr-only">
          {error}
        </span>
      ) : null}

      <div className="pp-estimator__actions">
        <button type="button" className={enhanceClassName} onClick={onEnhance} disabled={disabled}>
          <Icon name="sparkles" size="sm" aria-hidden className="h-[14px] w-[14px]" />
          {ESTIMATOR_COPY.enhanceLabel}
        </button>
        <button
          type="button"
          className={generateClassName}
          onClick={onSubmit}
          disabled={disabled}
          aria-busy={disabled}
        >
          {hasEstimate ? ESTIMATOR_COPY.reviseLabel : ESTIMATOR_COPY.generateLabel}
        </button>
      </div>

      {!hasEstimate ? (
        <ul className="pp-estimator__badges">
          {ESTIMATOR_COPY.badges.map((badge) => (
            <li key={badge}>{badge}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
