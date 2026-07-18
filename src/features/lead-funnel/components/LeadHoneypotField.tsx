interface LeadHoneypotFieldProps {
  readonly id: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/** Hidden bot field — must remain empty on legitimate submissions. */
export function LeadHoneypotField({
  id,
  value,
  onChange,
}: LeadHoneypotFieldProps) {
  return (
    <div className="sr-only" aria-hidden="true">
      <label htmlFor={id}>Leave this field empty</label>
      <input
        id={id}
        name="_honeypot"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
