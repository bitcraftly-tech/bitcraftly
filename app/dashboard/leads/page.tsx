"use client";

import { useMemo, useState } from "react";

import LeadsTable from "@/components/dashboard/LeadsTable";
import PageHeader from "@/components/dashboard/PageHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import { useLeadsQuery } from "@/hooks/useDashboardQueries";

export default function DashboardLeadsPage() {
  const [search, setSearch] = useState("");
  const leadsQuery = useLeadsQuery();

  const leads = useMemo(() => {
    const records = leadsQuery.data ?? [];
    const keyword = search.trim().toLowerCase();
    if (!keyword) return records;
    return records.filter(
      (lead) =>
        lead.name.toLowerCase().includes(keyword) ||
        lead.phone.toLowerCase().includes(keyword) ||
        (lead.business_type ?? "").toLowerCase().includes(keyword),
    );
  }, [leadsQuery.data, search]);

  return (
    <div>
      <PageHeader
        title="Leads"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Leads" }]}
        action={{ label: "+ Add Lead", href: "/dashboard" }}
      />

      <div className="mt-8">
        <SectionCard title="Lead List" description="Latest leads appear first">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, phone, business type"
            className="mb-4 w-full rounded-xl border border-border-primary bg-bg-card px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent-primary/40 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary"
          />

          {leadsQuery.isLoading ? (
            <div className="space-y-2">
              <div className="h-10 animate-pulse rounded-lg bg-border-primary dark:bg-dark-border-primary" />
              <div className="h-10 animate-pulse rounded-lg bg-border-primary dark:bg-dark-border-primary" />
              <div className="h-10 animate-pulse rounded-lg bg-border-primary dark:bg-dark-border-primary" />
            </div>
          ) : (
            <LeadsTable leads={leads} />
          )}
        </SectionCard>
      </div>
    </div>
  );
}
