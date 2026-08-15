interface WizardOptionChipProps {
  readonly label: string;
  readonly description?: string;
  readonly pressed: boolean;
  readonly onSelect: () => void;
}

export function WizardOptionChip({ label, description, pressed, onSelect }: WizardOptionChipProps) {
  return (
    <button type="button" className="pw-option" aria-pressed={pressed} onClick={onSelect}>
      <span className="pw-option__label">{label}</span>
      {description ? <span className="pw-option__desc">{description}</span> : null}
    </button>
  );
}
