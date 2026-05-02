import BillingClient from "@/components/dashboard/BillingClient";
import PageHeader from "@/components/dashboard/PageHeader";

export default function DashboardBillingPage() {
  return (
    <div>
      <PageHeader title="Billing" breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Billing" }]} />
      <div className="mt-6 rounded-lg border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card">
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
          Pay invoices or deposits securely. Successful payments are verified on the server before being treated as final.
        </p>
        <div className="mt-6 border-t border-border-primary pt-6 dark:border-dark-border-primary">
          <BillingClient />
        </div>
      </div>
    </div>
  );
}
