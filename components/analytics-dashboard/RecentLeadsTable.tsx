"use client";

import Link from "next/link";

import type { AnalyticsLead, LeadStatus } from "@/lib/analytics-dashboard/types";

const LEAD_STATUSES: LeadStatus[] = ["new", "contacted", "proposal_sent", "won", "lost"];

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-[#2563EB]/15 text-[#2563EB]",
  contacted: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  proposal_sent: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  won: "bg-[#22C55E]/15 text-[#16A34A]",
  lost: "bg-rose-500/15 text-rose-600",
};

type RecentLeadsTableProps = {
  leads: AnalyticsLead[];
  onStatusChange?: (id: string, status: LeadStatus) => void;
  isUpdating?: boolean;
};

export default function RecentLeadsTable({ leads, onStatusChange, isUpdating }: RecentLeadsTableProps) {
  return (
    <section className="rounded-2xl border border-border-primary bg-bg-card p-5 shadow-sm dark:border-dark-border-primary dark:bg-dark-bg-card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#0F172A] dark:text-dark-text-primary">Recent Leads</h3>
          <p className="mt-0.5 text-xs text-text-tertiary dark:text-dark-text-tertiary">Latest inquiries and conversions</p>
        </div>
        <a
          href="/api/analytics/leads/export"
          className="text-xs font-semibold text-[#2563EB] hover:underline"
        >
          Export CSV
        </a>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border-primary text-xs uppercase tracking-wide text-text-tertiary dark:border-dark-border-primary dark:text-dark-text-tertiary">
              <th className="py-2.5 pr-4 font-semibold">Name</th>
              <th className="py-2.5 pr-4 font-semibold">Source</th>
              <th className="py-2.5 pr-4 font-semibold">Service</th>
              <th className="py-2.5 pr-4 font-semibold">Date</th>
              <th className="py-2.5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-sm text-text-tertiary">
                  No leads yet. Form submissions and WhatsApp clicks will appear here.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-border-primary/60 transition-colors hover:bg-bg-secondary/50 dark:border-dark-border-primary/60 dark:hover:bg-dark-bg-secondary/50"
                >
                  <td className="py-3 pr-4">
                    <Link
                      href={`/dashboard/analytics/leads/${lead.id}`}
                      className="font-medium text-[#2563EB] hover:underline"
                    >
                      {lead.name ?? lead.phone ?? "Unknown"}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-text-secondary dark:text-dark-text-secondary">
                    {lead.source ?? "Direct"}
                  </td>
                  <td className="py-3 pr-4 text-text-secondary dark:text-dark-text-secondary">
                    {lead.service ?? lead.type.replace("_", " ")}
                  </td>
                  <td className="py-3 pr-4 text-xs text-text-tertiary">
                    {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3">
                    {onStatusChange ? (
                      <select
                        value={lead.status}
                        disabled={isUpdating}
                        onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[lead.status]}`}
                      >
                        {LEAD_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[lead.status]}`}>
                        {lead.status.replace("_", " ")}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
