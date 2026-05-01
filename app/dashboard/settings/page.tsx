"use client";

import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { readTenantSlugFromCookie } from "@/hooks/useTenant";

import PageHeader from "@/components/dashboard/PageHeader";
import { showErrorAlert, showSuccessAlert } from "@/lib/sweetAlert";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export default function DashboardSettingsPage() {
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [tenantSlug, setTenantSlug] = useState<string | null>(null);

  useEffect(() => {
    const slug = readTenantSlugFromCookie();
    setTenantSlug(slug);
    if (!slug) return;
    void (async () => {
      try {
        const response = await axios.get<{ name: string; business_phone?: string | null }>(
          `${API_BASE_URL}/api/tenant/${encodeURIComponent(slug)}`,
        );
        setBusinessName(response.data.name ?? "");
        setPhone(response.data.business_phone ?? "");
      } catch {
        // Ignore initial load error for settings form.
      }
    })();
  }, []);

  async function onSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tenantSlug) {
      await showErrorAlert("Tenant not found. Please reload and try again.");
      return;
    }
    setIsSaving(true);
    try {
      await axios.patch(`${API_BASE_URL}/api/tenant/${encodeURIComponent(tenantSlug)}`, {
        name: businessName.trim(),
        business_phone: phone.trim() || null,
      });
      await showSuccessAlert("Settings saved successfully.");
    } catch {
      await showErrorAlert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Settings" }]}
      />

      <form
        onSubmit={onSave}
        className="mt-8 max-w-xl rounded-2xl border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card sm:p-6"
      >
        <div>
          <label className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Business name</label>
          <input
            type="text"
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
            placeholder="Spicy Bite"
            className="mt-1.5 w-full rounded-xl border border-border-primary bg-bg-card px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent-primary/40 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Phone number</label>
          <input
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="919667710954"
            className="mt-1.5 w-full rounded-xl border border-border-primary bg-bg-card px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent-primary/40 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary"
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="mt-5 inline-flex rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save settings"}
        </button>
      </form>
    </div>
  );
}
