import PageHeader from "@/components/dashboard/PageHeader";

export default function DashboardBillingPage() {
  return (
    <div>
      <PageHeader
        title="Billing"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Billing" }]}
      />
      <div className="mt-8 rounded-lg border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card">
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Billing information and invoices will appear here.</p>
      </div>
    </div>
  );
}
