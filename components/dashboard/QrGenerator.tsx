"use client";

import { FormEvent, useState } from "react";
import { useCreateQrMutation } from "@/hooks/useDashboardQueries";
import { showErrorAlert, showSuccessAlert } from "@/lib/sweetAlert";

export default function QrGenerator() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState<{ qr_url: string; redirect_url: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const createQr = useCreateQrMutation();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setResult(null);
    setCopied(false);
    try {
      const data = await createQr.mutateAsync({ phone: phone.trim() });
      setResult(data);
      setSuccess(true);
      setPhone("");
      await showSuccessAlert("QR generated and saved successfully.");
    } catch {
      setError("Failed to generate QR");
      await showErrorAlert("Failed to generate QR.");
    }
  }

  async function copyRedirectUrl() {
    if (!result?.redirect_url) return;
    await navigator.clipboard.writeText(result.redirect_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function downloadQr() {
    if (!result?.qr_url) return;
    const res = await fetch(result.qr_url);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-contact.png";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-2xl border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card sm:p-6">
      <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">Generate QR</h2>
      <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
        WhatsApp redirect — parking, business, or product contact.
      </p>

      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="qr-phone" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
            Phone number
          </label>
          <input
            id="qr-phone"
            type="text"
            inputMode="tel"
            autoComplete="tel"
            placeholder="919667710954"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border-primary bg-bg-card px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/15 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary"
          />
        </div>
        <button
          type="submit"
          disabled={createQr.isPending || phone.trim().length < 7}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {createQr.isPending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Generating…
            </>
          ) : (
            "Generate QR"
          )}
        </button>
      </form>

      {error ? (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {success && result ? (
        <div className="mt-5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-4">
          <p className="text-sm font-medium text-emerald-700">QR ready — scan to open WhatsApp.</p>
          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <img
              src={result.qr_url}
              alt="Generated QR code"
              className="h-48 w-48 rounded-lg border border-white/10 bg-white p-2"
            />
            <div className="w-full min-w-0 flex-1 space-y-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-text-tertiary dark:text-dark-text-tertiary">Redirect link</p>
                <a
                  href={result.redirect_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block break-all text-sm text-[#2B5CE6] underline underline-offset-2"
                >
                  {result.redirect_url}
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void copyRedirectUrl()}
                  className="rounded-lg border border-border-primary bg-bg-card px-3 py-2 text-xs font-semibold text-text-primary transition hover:bg-bg-secondary dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-primary dark:hover:bg-dark-bg-secondary"
                >
                  {copied ? "Copied" : "Copy link"}
                </button>
                <button
                  type="button"
                  onClick={() => void downloadQr()}
                  className="rounded-lg border border-border-primary bg-bg-card px-3 py-2 text-xs font-semibold text-text-primary transition hover:bg-bg-secondary dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-primary dark:hover:bg-dark-bg-secondary"
                >
                  Download QR
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
