"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import PageHeader from "@/components/dashboard/PageHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import { useParkingReportsQuery, useResolveParkingReportMutation } from "@/hooks/useDashboardQueries";

export default function DashboardParkingReportsPage() {
  const [status, setStatus] = useState<"all" | "open" | "resolved">("all");
  const [search, setSearch] = useState("");
  const reportsQuery = useParkingReportsQuery(status);
  const resolveMutation = useResolveParkingReportMutation();

  const rows = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    const items = reportsQuery.data?.items ?? [];
    if (!keyword) return items;
    return items.filter(
      (item) =>
        (item.vehicle_number ?? "").toLowerCase().includes(keyword) ||
        (item.owner_name ?? "").toLowerCase().includes(keyword) ||
        (item.destination_phone ?? "").toLowerCase().includes(keyword) ||
        item.issue_type.toLowerCase().includes(keyword) ||
        (item.notes ?? "").toLowerCase().includes(keyword),
    );
  }, [reportsQuery.data?.items, search]);

  return (
    <div>
      <PageHeader
        title="Apps"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Apps" }]}
      />

      <div className="mt-8">
        <SectionCard title="Smart Parking reports" description="Operational reports from parking barcode scans">
          <div className="mb-4 flex flex-wrap gap-2">
            {(["all", "open", "resolved"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStatus(item)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${
                  status === item
                    ? "bg-accent-primary text-white"
                    : "border border-border-primary text-text-secondary hover:border-border-secondary dark:border-dark-border-primary dark:text-dark-text-secondary dark:hover:border-dark-border-secondary"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search vehicle, owner, phone, issue, notes"
            className="mb-4 w-full rounded-xl border border-border-primary bg-bg-card px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent-primary/40 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary"
          />

          {reportsQuery.isLoading ? (
            <div className="space-y-2">
              <div className="h-10 animate-pulse rounded-lg bg-border-primary dark:bg-dark-border-primary" />
              <div className="h-10 animate-pulse rounded-lg bg-border-primary dark:bg-dark-border-primary" />
              <div className="h-10 animate-pulse rounded-lg bg-border-primary dark:bg-dark-border-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[940px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border-primary text-text-tertiary dark:border-dark-border-primary dark:text-dark-text-tertiary">
                    <th className="py-2 pr-4 font-medium">Vehicle</th>
                    <th className="py-2 pr-4 font-medium">Owner</th>
                    <th className="py-2 pr-4 font-medium">Issue</th>
                    <th className="py-2 pr-4 font-medium">Reporter</th>
                    <th className="py-2 pr-4 font-medium">Status</th>
                    <th className="py-2 pr-4 font-medium">Created</th>
                    <th className="py-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-border-primary text-text-primary transition hover:bg-bg-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:bg-dark-bg-secondary"
                    >
                      <td className="py-3 pr-4 font-mono">{row.vehicle_number || "-"}</td>
                      <td className="py-3 pr-4">
                        <p>{row.owner_name || "-"}</p>
                        <p className="text-xs text-emerald-700 dark:text-emerald-400">{row.destination_phone || "-"}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <p>{row.issue_type}</p>
                        {row.notes ? (
                          <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">{row.notes}</p>
                        ) : null}
                      </td>
                      <td className="py-3 pr-4">{row.reporter_phone || "-"}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            row.status === "resolved"
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                              : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4">{new Date(row.created_at).toLocaleString()}</td>
                      <td className="py-3">
                        {row.status === "resolved" ? (
                          <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Resolved</span>
                        ) : (
                          <button
                            type="button"
                            disabled={resolveMutation.isPending && resolveMutation.variables === row.id}
                            onClick={() => {
                              resolveMutation.mutate(row.id, {
                                onSuccess: () => toast.success("Parking report marked resolved."),
                                onError: () => toast.error("Failed to update report."),
                              });
                            }}
                            className="rounded-md border border-accent-primary/35 bg-accent-primary/10 px-3 py-1 text-xs font-semibold text-accent-primary transition hover:bg-accent-primary/15 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {resolveMutation.isPending && resolveMutation.variables === row.id ? "Saving..." : "Mark Resolved"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {!rows.length ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-sm text-text-secondary dark:text-dark-text-secondary">
                        No parking reports found.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
