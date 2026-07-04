"use client";

import { useMemo, useState } from "react";
import { FileText, Lock, Shield, Sparkles } from "lucide-react";

import DocumentsGrid from "@/components/documents/DocumentsGrid";
import PageHeader from "@/components/dashboard/PageHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import { filterDocuments, getAllCategories, getDocumentStats } from "@/lib/documents/registry";
import type { DocumentVisibility } from "@/types/documents";

const VISIBILITY_OPTIONS: Array<{ value: "all" | DocumentVisibility; label: string }> = [
  { value: "all", label: "All visibility" },
  { value: "PUBLIC", label: "Public" },
  { value: "INTERNAL", label: "Internal" },
  { value: "FUTURE_PUBLIC", label: "Future public" },
];

export default function DashboardDocumentsPage() {
  const stats = getDocumentStats();
  const categories = getAllCategories();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [visibility, setVisibility] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const documents = useMemo(
    () => filterDocuments({ search, category, visibility, status }),
    [search, category, visibility, status],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Documents" },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FileText} label="Total documents" value={stats.total} />
        <StatCard icon={Shield} label="Public" value={stats.public} />
        <StatCard icon={Lock} label="Internal" value={stats.internal} />
        <StatCard icon={Sparkles} label="Future public" value={stats.futurePublic} />
      </div>

      <SectionCard
        title="Official document registry"
        description={`${stats.categories} categories · Bitcraftly BDS standards library`}
      >
        <div className="grid gap-3 lg:grid-cols-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="rounded-lg border border-border-primary bg-white px-3 py-2 text-sm text-text-primary outline-none ring-indigo-500/30 focus:ring-2 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary lg:col-span-2"
            aria-label="Search documents"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-border-primary bg-white px-3 py-2 text-sm dark:border-dark-border-primary dark:bg-dark-bg-secondary"
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="rounded-lg border border-border-primary bg-white px-3 py-2 text-sm dark:border-dark-border-primary dark:bg-dark-bg-secondary"
            aria-label="Filter by visibility"
          >
            {VISIBILITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-border-primary bg-white px-3 py-2 text-sm dark:border-dark-border-primary dark:bg-dark-bg-secondary"
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
            Showing {documents.length} of {stats.total}
          </p>
        </div>

        <div className="mt-5">
          <DocumentsGrid documents={documents} canDownload />
        </div>
      </SectionCard>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FileText;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card">
      <div className="flex items-center gap-2 text-text-tertiary dark:text-dark-text-tertiary">
        <Icon className="size-4" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold text-text-primary dark:text-dark-text-primary">{value}</p>
    </div>
  );
}
