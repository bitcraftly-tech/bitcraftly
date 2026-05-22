"use client";

import { motion } from "framer-motion";
import { Code2, LayoutGrid, Palette, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { PS_FILTER_ACTIVE, PS_FILTER_IDLE } from "@/lib/ats/careersShowcaseTheme";
import type { JobDepartment } from "@/lib/ats/jobs";

export const DEPARTMENT_TABS = [
  { id: "all" as const, label: "All teams", shortLabel: "All", icon: LayoutGrid },
  { id: "engineering" as const, label: "Engineering", shortLabel: "Eng", icon: Code2 },
  { id: "design" as const, label: "Design", icon: Palette },
  { id: "product" as const, label: "Product", icon: Sparkles },
];

export const LEVEL_TABS = [
  { id: "all" as const, label: "All levels", shortLabel: "All" },
  { id: "mid" as const, label: "Mid", shortLabel: "Mid" },
  { id: "senior" as const, label: "Senior", shortLabel: "Sr" },
  { id: "lead" as const, label: "Lead", shortLabel: "Lead" },
];

type DeptId = JobDepartment | "all";

type CareersRolesFilterPanelProps = {
  search: string;
  onSearchChange: (value: string) => void;
  department: DeptId;
  onDepartmentChange: (id: DeptId) => void;
  level: string;
  onLevelChange: (id: string) => void;
  deptCounts: Record<DeptId, number>;
  levelCounts: Record<string, number>;
  resultCount: number;
  totalCount: number;
};

function TeamTab({
  active,
  onClick,
  label,
  shortLabel,
  icon: Icon,
  count,
  layoutId,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  count: number;
  layoutId: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`relative shrink-0 rounded-full border px-3.5 py-2.5 text-xs font-semibold transition-colors sm:px-4 ${
        active ? PS_FILTER_ACTIVE : PS_FILTER_IDLE
      }`}
    >
      {active ? (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-full bg-[#8e44ad]"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      ) : null}
      <span className={`relative flex items-center gap-2 ${active ? "text-white" : "text-[#2c3e50]"}`}>
        <Icon className="size-3.5 shrink-0 opacity-90" aria-hidden />
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden">{shortLabel}</span>
        <span
          className={`min-w-[1.25rem] rounded-full px-1.5 py-0.5 text-center text-[10px] font-bold tabular-nums ${
            active ? "bg-white/20 text-white" : "bg-[#ecf0f1] text-[#7f8c8d]"
          }`}
        >
          {count}
        </span>
      </span>
    </button>
  );
}

function LevelSegment({
  active,
  onClick,
  label,
  shortLabel,
  count,
  layoutId,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  shortLabel: string;
  count: number;
  layoutId: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className="relative flex-1 rounded-full px-3 py-2 text-xs font-semibold text-[#7f8c8d] transition-colors sm:flex-none sm:px-4"
    >
      {active ? (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-[#e8ecef]"
          transition={{ type: "spring", stiffness: 400, damping: 34 }}
        />
      ) : null}
      <span className={`relative flex items-center justify-center gap-1.5 ${active ? "text-[#8e44ad]" : ""}`}>
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden">{shortLabel}</span>
        {count > 0 ? (
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
              active ? "bg-[#9b59b6]/10 text-[#8e44ad]" : "bg-[#dfe6e9] text-[#95a5a6]"
            }`}
          >
            {count}
          </span>
        ) : null}
      </span>
    </button>
  );
}

export default function CareersRolesFilterPanel({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  level,
  onLevelChange,
  deptCounts,
  levelCounts,
  resultCount,
  totalCount,
}: CareersRolesFilterPanelProps) {
  const hasFilters = department !== "all" || level !== "all" || search.trim().length > 0;

  const clearAll = () => {
    onSearchChange("");
    onDepartmentChange("all");
    onLevelChange("all");
  };

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#e8ecef] bg-white shadow-[0_4px_24px_rgba(44,62,80,0.06)]">
      {/* Search */}
      <div className="border-b border-[#ecf0f1] p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[#95a5a6]"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search roles or skills…"
              className="h-12 w-full rounded-full border border-[#e8ecef] bg-[#fafbfc] pl-11 pr-10 text-sm text-[#2c3e50] outline-none transition placeholder:text-[#95a5a6] focus:border-[rgba(142,68,173,0.4)] focus:bg-white focus:ring-2 focus:ring-[#9b59b6]/12"
            />
            {search ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-[#95a5a6] transition hover:bg-[#ecf0f1] hover:text-[#2c3e50]"
                aria-label="Clear search"
              >
                <X className="size-4" aria-hidden />
              </button>
            ) : null}
          </div>
          <p className="shrink-0 text-xs font-medium text-[#95a5a6] sm:text-right">
            <span className="font-bold text-[#8e44ad]">{resultCount}</span>
            <span className="text-[#bdc3c7]"> / </span>
            {totalCount} roles
          </p>
        </div>
      </div>

      {/* Team filters */}
      <div className="border-b border-[#ecf0f1] px-4 py-4 sm:px-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8e44ad]">
            <SlidersHorizontal className="size-3.5" aria-hidden />
            Team
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearAll}
              className="text-[11px] font-semibold text-[#7f8c8d] underline-offset-2 transition hover:text-[#8e44ad] hover:underline"
            >
              Clear filters
            </button>
          ) : null}
        </div>
        <div
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin sm:flex-wrap"
          role="tablist"
          aria-label="Filter by team"
        >
          {DEPARTMENT_TABS.map((tab) => (
            <TeamTab
              key={tab.id}
              active={department === tab.id}
              onClick={() => onDepartmentChange(tab.id)}
              label={tab.label}
              shortLabel={tab.shortLabel}
              icon={tab.icon}
              count={deptCounts[tab.id] ?? 0}
              layoutId="careers-team-pill"
            />
          ))}
        </div>
      </div>

      {/* Level — segmented (no second full purple row) */}
      <div className="bg-[#fafbfc] px-4 py-4 sm:px-5">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#95a5a6]">Experience level</p>
        <div
          className="flex rounded-full bg-[#ecf0f1]/90 p-1 ring-1 ring-[#e8ecef]/80"
          role="tablist"
          aria-label="Filter by experience level"
        >
          {LEVEL_TABS.map((tab) => (
            <LevelSegment
              key={tab.id}
              active={level === tab.id}
              onClick={() => onLevelChange(tab.id)}
              label={tab.label}
              shortLabel={tab.shortLabel}
              count={levelCounts[tab.id] ?? 0}
              layoutId="careers-level-segment"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
