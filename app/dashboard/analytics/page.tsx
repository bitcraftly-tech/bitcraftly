import PageHeader from "@/components/dashboard/PageHeader";

export default function DashboardAnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Reports"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Reports" }]}
      />

      <p className="mt-4 max-w-2xl text-sm text-text-secondary dark:text-dark-text-secondary">
        High-level signals for enquiries and ops — not a full analytics suite.
      </p>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <article className="rounded-lg border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <p className="text-sm uppercase tracking-wider text-text-tertiary dark:text-dark-text-tertiary">Lead conversion</p>
          <p className="mt-3 text-3xl font-bold text-text-primary dark:text-dark-text-primary">24.8%</p>
          <p className="mt-2 text-xs text-green-600">+3.1% vs last week</p>
        </article>

        <article className="rounded-lg border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <p className="text-sm uppercase tracking-wider text-text-tertiary dark:text-dark-text-tertiary">Avg. Response Time</p>
          <p className="mt-3 text-3xl font-bold text-text-primary dark:text-dark-text-primary">11m</p>
          <p className="mt-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">Across WhatsApp inquiries</p>
        </article>

        <article className="rounded-lg border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <p className="text-sm uppercase tracking-wider text-text-tertiary dark:text-dark-text-tertiary">Billing snapshot</p>
          <p className="mt-3 text-3xl font-bold text-text-primary dark:text-dark-text-primary">Rs 2.1L</p>
          <p className="mt-2 text-xs text-green-600">+11% month over month</p>
        </article>
      </section>
    </div>
  );
}
