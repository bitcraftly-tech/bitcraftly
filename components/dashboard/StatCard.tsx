type StatCardProps = {
  label: string;
  value: number | string;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <article className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card">
      <p className="text-xs uppercase tracking-wider text-text-tertiary dark:text-dark-text-tertiary">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-text-primary dark:text-dark-text-primary">{value}</p>
    </article>
  );
}
