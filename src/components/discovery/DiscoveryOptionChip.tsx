interface DiscoveryOptionChipProps {
  readonly label: string;
  readonly description?: string;
  readonly pressed: boolean;
  readonly onSelect: () => void;
}

export function DiscoveryOptionChip({
  label,
  description,
  pressed,
  onSelect,
}: DiscoveryOptionChipProps) {
  return (
    <button type="button" className="df-option" aria-pressed={pressed} onClick={onSelect}>
      <span className="df-option__label">{label}</span>
      {description ? <span className="df-option__desc">{description}</span> : null}
    </button>
  );
}
