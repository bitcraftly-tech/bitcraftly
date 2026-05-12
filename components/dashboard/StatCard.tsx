type StatCardProps = {
  label: string;
  value: number | string;
  /** Shown under the value when count is zero (client-dashboard empty states). */
  emptyHint?: string;
};

export default function StatCard({ label, value, emptyHint }: StatCardProps) {
  const showEmptyHint = Boolean(emptyHint && (value === 0 || value === "0"));
  return (
    <article className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card">
      <p className="text-xs uppercase tracking-wider text-text-tertiary dark:text-dark-text-tertiary">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-text-primary dark:text-dark-text-primary">{value}</p>
      {showEmptyHint ? (
        <p className="mt-2 text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">{emptyHint}</p>
      ) : null}
    </article>
  );
}
