type MetricCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  dataSource?: string;
};

export default function MetricCard({ label, value, hint, dataSource }: MetricCardProps) {
  return (
    <article className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-text-primary dark:text-dark-text-primary">{value}</p>
      {hint ? <p className="mt-1 text-xs text-text-secondary dark:text-dark-text-secondary">{hint}</p> : null}
      {dataSource ? (
        <p className="mt-2 text-[10px] uppercase tracking-wide text-indigo-600 dark:text-indigo-400">{dataSource}</p>
      ) : null}
    </article>
  );
}
