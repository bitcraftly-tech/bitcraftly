"use client";

import { FormEvent, use, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type PageProps = {
  params: Promise<{ code: string }>;
};

type PublicQRContact = {
  code: string;
  owner_name?: string | null;
  masked_phone: string;
  call_path: string;
  vehicle_number?: string | null;
  issue?: string | null;
};

const ISSUE_TYPES = ["Wrong parking / blocked exit", "Lights left on", "Vehicle alarm issue", "Other"];

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export default function ParkingReportPage({ params }: PageProps) {
  const { code } = use(params);
  const [details, setDetails] = useState<PublicQRContact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [issueType, setIssueType] = useState(ISSUE_TYPES[0]);
  const [notes, setNotes] = useState("");
  const [reporterPhone, setReporterPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadDetails() {
      if (!isMounted) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/api/qr/public/${code}`, { cache: "no-store" });
        const payload = (await response.json().catch(() => null)) as PublicQRContact | { detail?: string } | null;
        if (!response.ok) {
          setError((payload as { detail?: string } | null)?.detail ?? "Invalid or expired parking barcode.");
          setDetails(null);
          return;
        }
        setDetails(payload as PublicQRContact);
      } catch {
        setError("Unable to load parking barcode details right now.");
        setDetails(null);
      } finally {
        setLoading(false);
      }
    }
    void loadDetails();

    return () => {
      isMounted = false;
    };
  }, [code]);

  const callHref = useMemo(() => `${API_BASE}${details?.call_path ?? ""}`, [details?.call_path]);

  const handleReport = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!code) return;
    setSubmitting(true);
    setSuccessMessage(null);
    try {
      const response = await fetch(`${API_BASE}/api/qr/public/${code}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          issue_type: issueType,
          notes: notes.trim() || null,
          reporter_phone: reporterPhone.trim() || null,
        }),
      });
      const payload = (await response.json().catch(() => null)) as { message?: string; detail?: string } | null;
      if (!response.ok) {
        setError(payload?.detail ?? "Unable to submit parking report.");
        return;
      }
      setSuccessMessage(payload?.message ?? "Parking issue reported successfully.");
      setNotes("");
      setReporterPhone("");
    } catch {
      setError("Unable to submit parking report.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#dcebe8] px-4 py-10">
      <div className="mx-auto w-full max-w-4xl rounded-[28px] border border-[#cfd7d5] bg-[#f4f5f3] p-5 sm:p-8">
        <div className="rounded-[20px] border border-[#cfd7d5] bg-[#ececea] p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-[18px] font-semibold text-[#0f172a]">Illegal Parking Report</p>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Verified</span>
          </div>

          {loading ? <p className="text-sm text-[#475569]">Loading barcode details...</p> : null}
          {error && !loading ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

          {details ? (
            <>
              <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4">
                <div className="flex gap-1.5">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <span key={idx} className="h-14 w-1.5 rounded-sm bg-emerald-400/80" />
                  ))}
                </div>
                <p className="mt-2 text-sm text-[#64748b]">Scan parking barcode</p>
              </div>

              <div className="mt-6 space-y-2 text-sm sm:text-base">
                <div className="flex items-center justify-between">
                  <span className="text-[#334155]">Vehicle</span>
                  <span className="font-mono text-[#0f172a]">{details.vehicle_number || "-"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#334155]">Owner</span>
                  <span className="text-emerald-700">{details.masked_phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#334155]">Issue</span>
                  <span className="text-[#0f172a]">{details.issue || issueType}</span>
                </div>
              </div>

              <a
                href={callHref}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-lg font-semibold text-white transition hover:bg-emerald-700"
              >
                Call Car Owner
              </a>
              <p className="mt-2 text-xs text-[#64748b]">
                Privacy safe: owner number remains masked. Call is routed via secure barcode relay.
              </p>

              <form onSubmit={handleReport} className="mt-6 space-y-3 rounded-xl border border-[#d8d8d8] bg-white p-4">
                <p className="text-sm font-semibold text-[#0f172a]">Report this issue to parking admin</p>
                <select
                  value={issueType}
                  onChange={(event) => setIssueType(event.target.value)}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm outline-none focus:border-[#2b5ce6]"
                >
                  {ISSUE_TYPES.map((issue) => (
                    <option key={issue} value={issue}>
                      {issue}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={reporterPhone}
                  onChange={(event) => setReporterPhone(event.target.value)}
                  placeholder="Your phone (optional)"
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm outline-none focus:border-[#2b5ce6]"
                />
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Additional notes (optional)"
                  className="min-h-20 w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm outline-none focus:border-[#2b5ce6]"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex rounded-lg bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Submitting..." : "Submit Parking Report"}
                </button>
                {successMessage ? <p className="text-sm text-emerald-700">{successMessage}</p> : null}
              </form>
            </>
          ) : null}
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm font-semibold text-[#2b5ce6] hover:underline">
            Back to Bitcraftly
          </Link>
        </div>
      </div>
    </main>
  );
}
