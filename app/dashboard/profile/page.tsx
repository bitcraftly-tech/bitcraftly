import PageHeader from "@/components/dashboard/PageHeader";

export default function DashboardProfilePage() {
  return (
    <div>
      <PageHeader
        title="Profile"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Profile" }]}
      />
      <div className="mt-8 rounded-lg border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card">
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Profile details will appear here.</p>
      </div>
    </div>
  );
}
