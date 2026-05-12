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

  const leadsCount = loading ? "..." : leads.length;
  const qrCount = loading ? "..." : qrContacts.length;
  const templatesCount = loading ? "..." : templates.length;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Home" }]}
        action={{ label: "+ New inquiry", href: "/dashboard/leads" }}
      />

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
        Your digital workspace for websites, apps and business growth — websites, apps &amp; digital solutions from
        Jamshedpur.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard
          label="Recent inquiries"
          value={leadsCount}
          emptyHint={'No active projects yet. Start building your next website with Bitcraftly.'}
        />
        <StatCard
          label="Website touchpoints"
          value={qrCount}
          emptyHint={'No QR or web touchpoints yet — add links when your site goes live.'}
        />
        <StatCard
          label="Message templates"
          value={templatesCount}
          emptyHint={'No templates yet. Create WhatsApp templates when you are ready to broadcast updates.'}
        />
      </div>

      <div className="mt-6">
        <SectionCard
          title="Activity overview"
          description="Pending tasks, inquiries and performance signals — a calm view for client work."
        >
          <ul className="space-y-3 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li className="rounded-lg border border-border-primary border-dashed bg-bg-secondary/40 px-4 py-3 dark:border-dark-border-primary dark:bg-dark-bg-secondary/30">
              <span className="font-medium text-text-primary dark:text-dark-text-primary">Pending tasks</span>
              <span className="mt-1 block text-xs text-text-tertiary dark:text-dark-text-tertiary">
                {loading ? "Loading…" : leads.length === 0 ? "No pending tasks. New enquiries will appear here." : `${leads.length} open item(s) in your pipeline.`}
              </span>
            </li>
            <li>
              Client inquiries captured: {loading ? "…" : leads.length}
              {!loading && leads.length === 0 ? (
                <span className="mt-1 block text-xs text-text-tertiary dark:text-dark-text-tertiary">
                  No active projects yet.
                </span>
              ) : null}
            </li>
            <li>
              Website &amp; QR touchpoints: {loading ? "…" : qrContacts.length}
              {!loading && qrContacts.length === 0 ? (
                <span className="mt-1 block text-xs text-text-tertiary dark:text-dark-text-tertiary">
                  Connect QR and web assets as projects go live.
                </span>
              ) : null}
            </li>
            <li>
              WhatsApp templates ready: {loading ? "…" : templates.length}
              {!loading && templates.length === 0 ? (
                <span className="mt-1 block text-xs text-text-tertiary dark:text-dark-text-tertiary">
                  Templates help you respond faster to customer messages.
                </span>
              ) : null}
            </li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
