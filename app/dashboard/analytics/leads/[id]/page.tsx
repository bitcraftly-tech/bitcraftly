"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import PageHeader from "@/components/dashboard/PageHeader";
import { useAnalyticsLeadQuery, useUpdateLeadStatusMutation } from "@/hooks/useAnalyticsDashboard";
import type { LeadStatus } from "@/lib/analytics-dashboard/types";

const STATUSES: LeadStatus[] = ["new", "contacted", "proposal_sent", "won", "lost"];

export default function AnalyticsLeadDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data, isLoading } = useAnalyticsLeadQuery(id);
  const updateStatus = useUpdateLeadStatusMutation();
  const lead = data?.lead;

  return (
    <div>
      <PageHeader
        title="Lead details"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Analytics", href: "/dashboard/analytics" },
          { label: lead?.name ?? id },
        ]}
      />

      {isLoading ? <p className="mt-6 text-sm text-text-secondary">Loading lead…</p> : null}

      {lead ? (
        <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
              {lead.name ?? "Unnamed lead"}
            </h2>
            <select
              value={lead.status}
              onChange={(e) => updateStatus.mutate({ id: lead.id, status: e.target.value as LeadStatus })}
              className="rounded border border-border-primary bg-transparent px-3 py-1.5 text-sm dark:border-dark-border-primary"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-text-tertiary">Type</dt>
              <dd className="font-medium">{lead.type}</dd>
            </div>
            <div>
              <dt className="text-text-tertiary">Phone</dt>
              <dd className="font-medium">{lead.phone ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-text-tertiary">Email</dt>
              <dd className="font-medium">{lead.email ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-text-tertiary">Business</dt>
              <dd className="font-medium">{lead.businessName ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-text-tertiary">Source</dt>
              <dd className="font-medium">{lead.source ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-text-tertiary">Page</dt>
              <dd className="font-medium">{lead.pagePath ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-text-tertiary">Service</dt>
              <dd className="font-medium">{lead.service ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-text-tertiary">Created</dt>
              <dd className="font-medium">{new Date(lead.createdAt).toLocaleString()}</dd>
            </div>
          </dl>

          {lead.message ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">Message</p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-text-secondary dark:text-dark-text-secondary">
                {lead.message}
              </p>
            </div>
          ) : null}

          <Link href="/dashboard/analytics" className="inline-flex text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            ← Back to analytics
          </Link>
        </div>
      ) : null}
    </div>
  );
}
