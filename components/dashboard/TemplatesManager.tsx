"use client";

import { useEffect, useMemo, useState } from "react";

import {
  useAutoReplyMutation,
  useSaveTemplateMutation,
  useTemplatesQuery,
} from "@/hooks/useDashboardQueries";
import { useTenant } from "@/hooks/useTenant";

const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_PUBLIC_BASE_URL ?? "https://bitcraftly.com";

const TYPES: Array<"intro" | "demo" | "price"> = ["intro", "demo", "price"];

function tenantSlug(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )tenant_slug=([^;]*)/);
  return match ? decodeURIComponent(match[1]).trim().toLowerCase() : null;
}

function previewContent(
  content: string,
  vars: { name: string; demo_link: string; business_name: string; phone: string },
): string {
  return content
    .replace(/\{name\}/g, vars.name)
    .replace(/\{demo_link\}/g, vars.demo_link)
    .replace(/\{business_name\}/g, vars.business_name)
    .replace(/\{phone\}/g, vars.phone);
}

function publicHostname(): string {
  try {
    return new URL(PUBLIC_BASE_URL).hostname;
  } catch {
    return "bitcraftly.com";
  }
}

export default function TemplatesManager() {
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const [leadName, setLeadName] = useState("");
  const [savingType, setSavingType] = useState<string | null>(null);
  const [sendingType, setSendingType] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [simulated, setSimulated] = useState<{ type: string; message: string } | null>(null);

  const templatesQuery = useTemplatesQuery();
  const saveTemplateMutation = useSaveTemplateMutation();
  const autoReplyMutation = useAutoReplyMutation();
  const { tenant } = useTenant();
  const slug = useMemo(() => tenantSlug(), []);

  const previewVars = useMemo(() => {
    const sub = tenant?.subdomain ?? slug ?? "tenant";
    return {
      name: leadName.trim() || "Sir",
      demo_link: `https://${sub}.${publicHostname()}`,
      business_name: tenant?.name ?? "Your business",
      phone: phone.replace(/\D/g, "") || "919000000000",
    };
  }, [tenant, slug, leadName, phone]);

  useEffect(() => {
    if (!templatesQuery.data) return;
    const next: Record<string, string> = {};
    for (const t of templatesQuery.data) {
      next[t.type] = t.content;
    }
    setDrafts(next);
  }, [templatesQuery.data]);

  async function saveType(templateType: string) {
    setSavingType(templateType);
    setError(null);
    setSuccess(null);
    try {
      await saveTemplateMutation.mutateAsync({
        type: templateType as "intro" | "demo" | "price",
        content: drafts[templateType] ?? "",
      });
      setSuccess(`Saved “${templateType}” template.`);
      window.setTimeout(() => setSuccess(null), 2500);
    } catch {
      setError("Save failed");
    } finally {
      setSavingType(null);
    }
  }

  async function copyType(templateType: string) {
    const text = drafts[templateType] ?? "";
    await navigator.clipboard.writeText(text);
    setCopiedType(templateType);
    window.setTimeout(() => setCopiedType(null), 1500);
  }

  async function sendSimulated(templateType: "intro" | "demo" | "price") {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7) {
      setError("Enter a valid phone (min 7 digits) for simulation.");
      return;
    }
    setSendingType(templateType);
    setError(null);
    setSimulated(null);
    try {
      const res = await autoReplyMutation.mutateAsync({
        phone: digits,
        type: templateType,
        name: leadName.trim() || undefined,
      });
      setSimulated({ type: templateType, message: res.message });
      setSuccess(`Simulated send for “${templateType}”.`);
      window.setTimeout(() => setSuccess(null), 2500);
    } catch {
      setError("Send failed");
    } finally {
      setSendingType(null);
    }
  }

  if (templatesQuery.isLoading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-[#1A1916]/10 bg-[#F8F8F8] py-16">
        <div className="flex items-center gap-3 text-sm text-[#1A1916]/75">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#1A1916]/20 border-t-[#2B5CE6]" />
          Loading templates…
        </div>
      </div>
    );
  }

  if (templatesQuery.isError) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
        Failed to load templates.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#1A1916]/10 bg-white p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-[#1A1916]">Simulation & variables</h2>
        <p className="mt-1 text-xs text-[#1A1916]/60">
          Preview uses <code className="text-[#1A1916]/80">{"{name}"}</code>,{" "}
          <code className="text-[#1A1916]/80">{"{demo_link}"}</code>,{" "}
          <code className="text-[#1A1916]/80">{"{business_name}"}</code>,{" "}
          <code className="text-[#1A1916]/80">{"{phone}"}</code>.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-[#1A1916]/70">Lead phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="919667710954"
              className="mt-1 w-full rounded-xl border border-[#1A1916]/15 bg-white px-3 py-2.5 text-sm text-[#1A1916] outline-none focus:border-blue-500/40"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[#1A1916]/70">Lead name (optional)</label>
            <input
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              placeholder="Rahul"
              className="mt-1 w-full rounded-xl border border-[#1A1916]/15 bg-white px-3 py-2.5 text-sm text-[#1A1916] outline-none focus:border-blue-500/40"
            />
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}
      {success ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          {TYPES.map((templateType) => (
            <article
              key={templateType}
              className="rounded-2xl border border-[#1A1916]/10 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-blue-500/12 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  {templateType}
                </span>
              </div>
              <textarea
                value={drafts[templateType] ?? ""}
                onChange={(e) => setDrafts((d) => ({ ...d, [templateType]: e.target.value }))}
                rows={6}
                className="mt-4 w-full resize-y rounded-xl border border-[#1A1916]/15 bg-white px-3 py-3 text-sm text-[#1A1916] outline-none focus:border-violet-500/40"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={savingType === templateType}
                  onClick={() => void saveType(templateType)}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
                >
                  {savingType === templateType ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => void copyType(templateType)}
                  className="rounded-xl border border-[#1A1916]/20 bg-white px-4 py-2 text-xs font-semibold text-[#1A1916] hover:bg-[#F4F3F0]"
                >
                  {copiedType === templateType ? "Copied" : "Copy"}
                </button>
                <button
                  type="button"
                  disabled={sendingType === templateType}
                  onClick={() => void sendSimulated(templateType)}
                  className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-500/20 disabled:opacity-50"
                >
                  {sendingType === templateType ? "Sending…" : "Send (sim)"}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-[#1A1916]/10 bg-white p-5">
            <h3 className="text-sm font-semibold text-[#1A1916]">Preview</h3>
            <p className="mt-1 text-xs text-[#1A1916]/60">Rendered with current drafts and simulation fields.</p>
            <div className="mt-4 space-y-4">
              {TYPES.map((templateType) => (
                <div key={`p-${templateType}`} className="rounded-xl border border-[#1A1916]/10 bg-[#F8F8F8] p-4">
                  <p className="text-xs font-semibold uppercase text-[#1A1916]/60">{templateType}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-[#1A1916]/85">
                    {previewContent(drafts[templateType] ?? "", previewVars)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {simulated ? (
            <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5">
              <h3 className="text-sm font-semibold text-violet-700">Simulated message ({simulated.type})</h3>
              <p className="mt-3 whitespace-pre-wrap text-sm text-violet-900/85">{simulated.message}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
