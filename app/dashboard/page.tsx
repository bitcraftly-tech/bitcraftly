"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import StatCard from "@/components/dashboard/StatCard";
import {
  useLeadsQuery,
  useQrContactsQuery,
  useTemplatesQuery,
} from "@/hooks/useDashboardQueries";

export default function DashboardOverviewPage() {
  const leadsQuery = useLeadsQuery();
  const qrQuery = useQrContactsQuery();
  const templatesQuery = useTemplatesQuery();

  const leads = leadsQuery.data ?? [];
  const qrContacts = qrQuery.data ?? [];
  const templates = templatesQuery.data ?? [];
  const loading = leadsQuery.isLoading || qrQuery.isLoading || templatesQuery.isLoading;

  return (
    <div>
      <PageHeader
        title="Overview"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Overview" }]}
        action={{ label: "+ Add Lead", href: "/dashboard/leads" }}
      />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard label="Total Leads" value={loading ? "..." : leads.length} />
        <StatCard label="Total QR Codes" value={loading ? "..." : qrContacts.length} />
        <StatCard label="Total Templates" value={loading ? "..." : templates.length} />
      </div>

      <div className="mt-6">
        <SectionCard title="Recent Activity" description="Quick health checks for your sales flow">
          <ul className="space-y-2 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>Leads captured: {leads.length}</li>
            <li>QR contact links: {qrContacts.length}</li>
            <li>WhatsApp templates: {templates.length}</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
