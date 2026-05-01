"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import QrGenerator from "@/components/dashboard/QrGenerator";
import QrList from "@/components/dashboard/QrList";
import SectionCard from "@/components/dashboard/SectionCard";
import { useQrContactsQuery } from "@/hooks/useDashboardQueries";

export default function DashboardQrPage() {
  const qrQuery = useQrContactsQuery();
  const qrContacts = qrQuery.data ?? [];

  return (
    <div>
      <PageHeader
        title="QR Codes"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "QR System" }]}
        action={{ label: "+ Generate QR", href: "/dashboard/qr" }}
      />

      <div className="mt-8 space-y-6">
        <QrGenerator />

        <SectionCard title="Your QR contacts" description="Previously generated codes for this tenant">
          {qrQuery.isLoading ? (
            <div className="space-y-2">
              <div className="h-20 animate-pulse rounded-lg bg-border-primary dark:bg-dark-border-primary" />
              <div className="h-20 animate-pulse rounded-lg bg-border-primary dark:bg-dark-border-primary" />
            </div>
          ) : (
            <QrList qrContacts={qrContacts} />
          )}
        </SectionCard>
      </div>
    </div>
  );
}
