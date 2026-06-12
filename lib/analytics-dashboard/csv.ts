import type { AnalyticsLead } from "@/lib/analytics-dashboard/types";

function escapeCsv(value: string | undefined): string {
  const safe = value ?? "";
  if (/[",\n]/.test(safe)) return `"${safe.replace(/"/g, '""')}"`;
  return safe;
}

export function leadsToCsv(leads: AnalyticsLead[]): string {
  const headers = [
    "id",
    "type",
    "status",
    "name",
    "email",
    "phone",
    "businessName",
    "businessType",
    "source",
    "pagePath",
    "service",
    "intent",
    "message",
    "createdAt",
    "updatedAt",
  ];

  const rows = leads.map((lead) =>
    [
      lead.id,
      lead.type,
      lead.status,
      lead.name,
      lead.email,
      lead.phone,
      lead.businessName,
      lead.businessType,
      lead.source,
      lead.pagePath,
      lead.service,
      lead.intent,
      lead.message,
      lead.createdAt,
      lead.updatedAt,
    ]
      .map((value) => escapeCsv(value))
      .join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}
