"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { ATS_PIPELINE_STAGES, computeMatchScore, normalizeStage } from "@/lib/ats/stages";
import type { JobApplication } from "@/hooks/useDashboardQueries";

type AtsKanbanBoardProps = {
  applications: JobApplication[];
  onSelect: (app: JobApplication) => void;
  isLoading?: boolean;
};

function KanbanCard({ app, onSelect }: { app: JobApplication; onSelect: () => void }) {
  const match = computeMatchScore(app.skills, app.role_applied);
  return (
    <motion.button
      type="button"
      layout
      onClick={onSelect}
      whileHover={{ y: -2 }}
      className="w-full rounded-xl border border-[#e2e8f0] bg-white p-3 text-left shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-dark-border-primary dark:bg-dark-bg-card"
    >
      <p className="text-sm font-semibold text-[#0f172a] dark:text-dark-text-primary">{app.full_name}</p>
      <p className="mt-0.5 truncate text-xs text-[#64748b]">{app.role_applied}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
          {match}% match
        </span>
        <span className="text-[10px] text-[#94a3b8]">{new Date(app.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
      </div>
    </motion.button>
  );
}

export default function AtsKanbanBoard({ applications, onSelect, isLoading }: AtsKanbanBoardProps) {
  const byStage = useMemo(() => {
    const map: Record<string, JobApplication[]> = {};
    for (const s of ATS_PIPELINE_STAGES) map[s.id] = [];
    for (const app of applications) {
      const key = normalizeStage(app.stage);
      map[key]?.push(app);
    }
    return map;
  }, [applications]);

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {ATS_PIPELINE_STAGES.map((s) => (
          <div key={s.id} className="min-w-[260px] flex-1 animate-pulse rounded-2xl bg-[#f1f5f9] h-64 dark:bg-dark-bg-secondary" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {ATS_PIPELINE_STAGES.map((stage) => {
        const cards = byStage[stage.id] ?? [];
        return (
          <div
            key={stage.id}
            className="flex min-w-[260px] max-w-[280px] flex-1 flex-col rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] dark:border-dark-border-primary dark:bg-dark-bg-secondary"
          >
            <div
              className="flex items-center justify-between border-b border-[#e2e8f0] px-4 py-3 dark:border-dark-border-primary"
              style={{ borderTopColor: stage.color, borderTopWidth: 3 }}
            >
              <span className="text-xs font-bold uppercase tracking-wide text-[#64748b]">{stage.label}</span>
              <span
                className="flex size-6 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ backgroundColor: stage.color }}
              >
                {cards.length}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-3 min-h-[120px]">
              {cards.length === 0 ? (
                <p className="py-6 text-center text-xs text-[#94a3b8]">No candidates</p>
              ) : (
                cards.map((app) => <KanbanCard key={app.id} app={app} onSelect={() => onSelect(app)} />)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
