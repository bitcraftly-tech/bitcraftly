"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import LeadsTable from "@/components/dashboard/LeadsTable";
import PageHeader from "@/components/dashboard/PageHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import {
  useContactSubmissionsQuery,
  useLeadsQuery,
  useMarkContactedMutation,
  useUpdateContactMetaMutation,
  useUpdateContactNotesMutation,
} from "@/hooks/useDashboardQueries";

type LeadRequestRow = {
  rowId: string;
  id: number | string;
  channel: "contact" | "lead";
  name: string;
  phone: string;
  email?: string | null;
  businessName?: string | null;
  businessType?: string | null;
  message?: string | null;
  source?: string | null;
  notes?: string | null;
  isContacted: boolean;
  stage: "new" | "in_progress" | "closed";
  assignee?: string | null;
  createdAt: string;
  updatedAt?: string | null;
};

type LeadMeta = {
  stage: "new" | "in_progress" | "closed";
  assignee: string;
};

export default function DashboardLeadsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "pending" | "contacted">("all");
  const [selectedLead, setSelectedLead] = useState<LeadRequestRow | null>(null);
  const [metaByRowId, setMetaByRowId] = useState<Record<string, LeadMeta>>({});
  const leadsQuery = useLeadsQuery();
  const contactSubmissionsQuery = useContactSubmissionsQuery();
  const markContactedMutation = useMarkContactedMutation();
  const updateMetaMutation = useUpdateContactMetaMutation();
  const updateNotesMutation = useUpdateContactNotesMutation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem("dashboard_lead_meta");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Record<string, LeadMeta>;
      setMetaByRowId(parsed);
    } catch {
      // ignore malformed local storage
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("dashboard_lead_meta", JSON.stringify(metaByRowId));
  }, [metaByRowId]);

  const leads = useMemo<LeadRequestRow[]>(() => {
    const leadRows: LeadRequestRow[] = (leadsQuery.data ?? []).map((lead) => ({
      rowId: `lead-${lead.id}`,
      id: lead.id,
      channel: "lead",
      name: lead.name,
      phone: lead.phone,
      email: null,
      businessName: null,
      businessType: lead.business_type ?? null,
      message: lead.message ?? null,
      source: "Lead API",
      notes: null,
      isContacted: false,
      stage: metaByRowId[`lead-${lead.id}`]?.stage ?? "new",
      assignee: metaByRowId[`lead-${lead.id}`]?.assignee ?? "",
      createdAt: lead.created_at,
      updatedAt: null,
    }));

    const contactRows: LeadRequestRow[] = (contactSubmissionsQuery.data?.submissions ?? []).map((item) => ({
      rowId: `contact-${item.id}`,
      id: item.id,
      channel: "contact",
      name: item.name,
      phone: item.phone,
      email: item.email ?? null,
      businessName: item.business_name ?? null,
      businessType: item.business_type ?? null,
      message: item.message ?? null,
      source: item.source ?? "Contact Form",
      notes: item.notes ?? null,
      isContacted: item.is_contacted,
      stage: item.stage ?? (item.is_contacted ? "closed" : "new"),
      assignee: item.assigned_to ?? "",
      createdAt: item.created_at,
      updatedAt: item.updated_at ?? null,
    }));

    const records = [...contactRows, ...leadRows].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const statusFiltered =
      status === "all"
        ? records
        : records.filter((row) => (status === "pending" ? !row.isContacted : row.isContacted));

    const keyword = search.trim().toLowerCase();
    if (!keyword) return statusFiltered;
    return statusFiltered.filter(
      (lead) =>
        lead.name.toLowerCase().includes(keyword) ||
        lead.phone.toLowerCase().includes(keyword) ||
        (lead.businessType ?? "").toLowerCase().includes(keyword) ||
        (lead.businessName ?? "").toLowerCase().includes(keyword) ||
        (lead.email ?? "").toLowerCase().includes(keyword) ||
        (lead.message ?? "").toLowerCase().includes(keyword) ||
        (lead.source ?? "").toLowerCase().includes(keyword),
    );
  }, [contactSubmissionsQuery.data?.submissions, leadsQuery.data, metaByRowId, search, status]);

  return (
    <div>
      <PageHeader
        title="Projects"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Projects" }]}
        action={{ label: "Refresh", href: "/dashboard/leads" }}
      />

      <div className="mt-8">
        <SectionCard
          title="Requests & inquiries"
          description="Contact submissions and leads — track what needs follow-up."
        >
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, phone, email, business, message, source"
            className="mb-4 w-full rounded-xl border border-border-primary bg-bg-card px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent-primary/40 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary"
          />

          <div className="mb-4 flex flex-wrap gap-2">
            {(["all", "pending", "contacted"] as const).map((item) => (
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

          {leadsQuery.isLoading || contactSubmissionsQuery.isLoading ? (
            <div className="space-y-2">
              <div className="h-10 animate-pulse rounded-lg bg-border-primary dark:bg-dark-border-primary" />
              <div className="h-10 animate-pulse rounded-lg bg-border-primary dark:bg-dark-border-primary" />
              <div className="h-10 animate-pulse rounded-lg bg-border-primary dark:bg-dark-border-primary" />
            </div>
          ) : (
            <LeadsTable
              leads={leads}
              onViewDetails={(lead) => setSelectedLead(lead)}
              onStageChange={(rowId, stageValue) => {
                if (rowId.startsWith("contact-")) {
                  const contactId = rowId.replace("contact-", "");
                  const row = leads.find((item) => item.rowId === rowId);
                  updateMetaMutation.mutate(
                    {
                      contactId,
                      stage: stageValue,
                      assignedTo: row?.assignee ?? "",
                    },
                    {
                      onSuccess: () => toast.success("Stage updated."),
                      onError: () => toast.error("Failed to update stage."),
                    },
                  );
                  return;
                }
                setMetaByRowId((prev) => ({
                  ...prev,
                  [rowId]: { stage: stageValue, assignee: prev[rowId]?.assignee ?? "" },
                }));
              }}
              onAssigneeChange={(rowId, assignee) => {
                if (rowId.startsWith("contact-")) {
                  const contactId = rowId.replace("contact-", "");
                  const row = leads.find((item) => item.rowId === rowId);
                  updateMetaMutation.mutate(
                    {
                      contactId,
                      stage: row?.stage ?? "new",
                      assignedTo: assignee,
                    },
                    {
                      onSuccess: () => toast.success("Assignee updated."),
                      onError: () => toast.error("Failed to update assignee."),
                    },
                  );
                  return;
                }
                setMetaByRowId((prev) => ({
                  ...prev,
                  [rowId]: {
                    stage: prev[rowId]?.stage ?? "new",
                    assignee: assignee.trim(),
                  },
                }));
              }}
              markingContactId={markContactedMutation.isPending ? markContactedMutation.variables ?? null : null}
              savingNotesContactId={
                updateNotesMutation.isPending ? updateNotesMutation.variables?.contactId ?? null : null
              }
              onMarkContacted={(contactId) => {
                markContactedMutation.mutate(contactId, {
                  onSuccess: () => toast.success("Marked as contacted."),
                  onError: () => toast.error("Failed to update request status."),
                });
              }}
              onSaveNotes={(contactId, notes) => {
                updateNotesMutation.mutate(
                  { contactId, notes },
                  {
                    onSuccess: () => toast.success("Notes updated."),
                    onError: () => toast.error("Failed to update notes."),
                  },
                );
              }}
            />
          )}
        </SectionCard>
      </div>

      {selectedLead ? (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close details"
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedLead(null)}
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-border-primary bg-bg-card p-5 shadow-xl dark:border-dark-border-primary dark:bg-dark-bg-card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-text-primary dark:text-dark-text-primary">Follow-up History</h3>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="rounded-md border border-border-primary px-2 py-1 text-xs text-text-secondary dark:border-dark-border-primary dark:text-dark-text-secondary"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="rounded-lg border border-border-primary p-3 dark:border-dark-border-primary">
                <p className="font-semibold text-text-primary dark:text-dark-text-primary">{selectedLead.name}</p>
                <p className="text-text-secondary dark:text-dark-text-secondary">{selectedLead.phone}</p>
                {selectedLead.email ? (
                  <p className="text-text-secondary dark:text-dark-text-secondary">{selectedLead.email}</p>
                ) : null}
              </div>

              <div className="space-y-2 rounded-lg border border-border-primary p-3 dark:border-dark-border-primary">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">
                  Timeline
                </p>
                <div className="rounded-md bg-bg-secondary p-2 dark:bg-dark-bg-secondary">
                  <p className="font-medium text-text-primary dark:text-dark-text-primary">Request Created</p>
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                    {new Date(selectedLead.createdAt).toLocaleString()}
                  </p>
                </div>
                {selectedLead.updatedAt ? (
                  <div className="rounded-md bg-bg-secondary p-2 dark:bg-dark-bg-secondary">
                    <p className="font-medium text-text-primary dark:text-dark-text-primary">Last Updated</p>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                      {new Date(selectedLead.updatedAt).toLocaleString()}
                    </p>
                  </div>
                ) : null}
                <div className="rounded-md bg-bg-secondary p-2 dark:bg-dark-bg-secondary">
                  <p className="font-medium text-text-primary dark:text-dark-text-primary">Status</p>
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                    {selectedLead.isContacted ? "Contacted" : "Pending"}
                  </p>
                </div>
                <div className="rounded-md bg-bg-secondary p-2 dark:bg-dark-bg-secondary">
                  <p className="font-medium text-text-primary dark:text-dark-text-primary">Pipeline Stage</p>
                  <p className="text-xs capitalize text-text-secondary dark:text-dark-text-secondary">
                    {selectedLead.stage.replace("_", " ")}
                  </p>
                </div>
                <div className="rounded-md bg-bg-secondary p-2 dark:bg-dark-bg-secondary">
                  <p className="font-medium text-text-primary dark:text-dark-text-primary">Assigned To</p>
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                    {selectedLead.assignee || "-"}
                  </p>
                </div>
              </div>

              <div className="space-y-2 rounded-lg border border-border-primary p-3 dark:border-dark-border-primary">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">
                  Request Details
                </p>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  <span className="font-medium text-text-primary dark:text-dark-text-primary">Type:</span>{" "}
                  {selectedLead.channel === "contact" ? "Contact Form" : "Lead"}
                </p>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  <span className="font-medium text-text-primary dark:text-dark-text-primary">Business:</span>{" "}
                  {selectedLead.businessName || "-"}
                </p>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  <span className="font-medium text-text-primary dark:text-dark-text-primary">Business Type:</span>{" "}
                  {selectedLead.businessType || "-"}
                </p>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  <span className="font-medium text-text-primary dark:text-dark-text-primary">Source:</span>{" "}
                  {selectedLead.source || "-"}
                </p>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  <span className="font-medium text-text-primary dark:text-dark-text-primary">Message:</span>{" "}
                  {selectedLead.message || "-"}
                </p>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  <span className="font-medium text-text-primary dark:text-dark-text-primary">Notes:</span>{" "}
                  {selectedLead.notes || "-"}
                </p>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
