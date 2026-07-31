'use client';

type Props = {
  label?: string;
};

/** Lightweight processing strip used while fake AI work runs. */
export default function AiProcessing({ label = 'Analysing with Clinic AI…' }: Props) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border px-4 py-3"
      style={{ borderColor: 'var(--cl-border)', background: 'var(--cl-surface-tint)' }}
      role="status"
      aria-live="polite"
    >
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-full"
        style={{ background: 'linear-gradient(135deg, var(--cl-primary), var(--cl-accent))' }}
        aria-hidden
      >
        <span className="cl-ai-spinner h-4 w-4 rounded-full border-2 border-white/30 border-t-white" />
      </span>
      <span className="text-sm font-medium" style={{ color: 'var(--cl-text)' }}>
        {label}
      </span>
    </div>
  );
}
