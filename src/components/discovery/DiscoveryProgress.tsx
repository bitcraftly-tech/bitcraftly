interface DiscoveryProgressProps {
  readonly current: number;
  readonly total: number;
}

export function DiscoveryProgress({ current, total }: DiscoveryProgressProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="df-progress" aria-label={`Question ${current} of ${total}`}>
      <div className="df-progress__meta">
        <span>
          Step {current} / {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div
        className="df-progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div className="df-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
