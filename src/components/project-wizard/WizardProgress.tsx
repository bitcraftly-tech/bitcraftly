interface WizardProgressProps {
  readonly current: number;
  readonly total: number;
}

export function WizardProgress({ current, total }: WizardProgressProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="pw-progress" aria-label={`Step ${current} of ${total}`}>
      <div className="pw-progress__meta">
        <span>
          Step {current} / {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div
        className="pw-progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div className="pw-progress__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="pw-progress__steps" aria-hidden>
        {Array.from({ length: total }, (_, index) => {
          const step = index + 1;
          const className = [
            'pw-progress__dot',
            step < current ? 'is-done' : '',
            step === current ? 'is-current' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return <span key={step} className={className} />;
        })}
      </div>
    </div>
  );
}
