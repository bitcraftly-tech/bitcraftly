export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-28 rounded-2xl bg-slate-200 dark:bg-dark-bg-secondary" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 rounded-2xl bg-slate-200 dark:bg-dark-bg-secondary" />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-80 rounded-2xl bg-slate-200 dark:bg-dark-bg-secondary" />
        <div className="h-80 rounded-2xl bg-slate-200 dark:bg-dark-bg-secondary" />
      </div>
      <div className="h-64 rounded-2xl bg-slate-200 dark:bg-dark-bg-secondary" />
    </div>
  );
}
