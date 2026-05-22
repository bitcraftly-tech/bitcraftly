"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, Search } from "lucide-react";

import AtsKanbanBoard from "@/components/ats/dashboard/AtsKanbanBoard";
import AtsStatsRow from "@/components/ats/dashboard/AtsStatsRow";
import CandidateDetailModal from "@/components/ats/dashboard/CandidateDetailModal";
import PageHeader from "@/components/dashboard/PageHeader";
import { useJobApplicationsQuery, type JobApplication } from "@/hooks/useDashboardQueries";
import { ATS_PIPELINE_STAGES } from "@/lib/ats/stages";

export default function DashboardApplicationsPage() {
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [stageFilter, setStageFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<JobApplication | null>(null);
  const query = useJobApplicationsQuery(stageFilter === "all" ? undefined : stageFilter);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const rows = query.data?.applications ?? [];
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.full_name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.role_applied.toLowerCase().includes(q) ||
        (r.phone ?? "").includes(q),
    );
  }, [query.data?.applications, search]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hiring · ATS"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Applications" }]}
        action={{ label: "Careers page", href: "/careers" }}
      />

      <AtsStatsRow applications={filtered} />

      <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-sm dark:border-dark-border-primary dark:bg-dark-bg-card md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#94a3b8]" aria-hidden />
            <input
              type="search"
              placeholder="Search candidates…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pl-10 pr-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/15 dark:border-dark-border-primary dark:bg-dark-bg-secondary"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="h-10 rounded-xl border border-[#e2e8f0] bg-white px-3 text-sm dark:border-dark-border-primary dark:bg-dark-bg-card"
            >
              <option value="all">All stages</option>
              {ATS_PIPELINE_STAGES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <div className="flex rounded-xl border border-[#e2e8f0] p-0.5 dark:border-dark-border-primary">
              <button
                type="button"
                onClick={() => setView("kanban")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  view === "kanban" ? "bg-indigo-600 text-white" : "text-[#64748b]"
                }`}
              >
                <LayoutGrid className="size-3.5" aria-hidden />
                Board
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  view === "list" ? "bg-indigo-600 text-white" : "text-[#64748b]"
                }`}
              >
                <List className="size-3.5" aria-hidden />
                List
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5">
          {query.isError ? (
            <p className="text-sm text-red-600">Could not load applications. Is the API running?</p>
          ) : view === "kanban" ? (
            <AtsKanbanBoard applications={filtered} onSelect={setSelected} isLoading={query.isLoading} />
          ) : (
            <div className="overflow-x-auto">
              {query.isLoading ? (
                <p className="text-sm text-[#64748b]">Loading…</p>
              ) : filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#e2e8f0] py-16 text-center dark:border-dark-border-primary">
                  <p className="text-sm font-medium text-[#64748b]">No applications yet</p>
                  <p className="mt-1 text-xs text-[#94a3b8]">Candidates appear here after applying at /careers/apply</p>
                </div>
              ) : (
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#f1f5f9] text-xs uppercase tracking-wide text-[#94a3b8] dark:border-dark-border-primary">
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Role</th>
                      <th className="px-3 py-2">Stage</th>
                      <th className="px-3 py-2">Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row) => (
                      <tr
                        key={row.id}
                        className="cursor-pointer border-b border-[#f1f5f9] transition hover:bg-indigo-50/50 dark:border-dark-border-primary dark:hover:bg-indigo-500/5"
                        onClick={() => setSelected(row)}
                      >
                        <td className="px-3 py-3 font-semibold text-[#0f172a] dark:text-dark-text-primary">{row.full_name}</td>
                        <td className="px-3 py-3 text-[#64748b]">{row.role_applied}</td>
                        <td className="px-3 py-3 capitalize text-[#64748b]">{row.stage}</td>
                        <td className="px-3 py-3 text-xs text-[#94a3b8]">
                          {new Date(row.created_at).toLocaleDateString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      <CandidateDetailModal candidate={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
