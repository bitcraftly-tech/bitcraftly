"use client";

import axios from "axios";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { showErrorAlert, showSuccessAlert } from "@/lib/sweetAlert";

type DemoCreateResponse = {
  success: boolean;
  demo_url: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export default function DemoGeneratorPage() {
  const [businessName, setBusinessName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DemoCreateResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const isDisabled = useMemo(
    () => isSubmitting || businessName.trim().length < 2,
    [businessName, isSubmitting],
  );

  useEffect(() => {
    if (!result?.demo_url) return;
    const timer = window.setTimeout(() => {
      window.location.href = result.demo_url;
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [result]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setResult(null);
    setCopied(false);
    setIsSubmitting(true);

    try {
      const response = await axios.post<DemoCreateResponse>(`${API_BASE_URL}/api/demo/create`, {
        business_name: businessName.trim(),
      });
      setResult(response.data);
      setBusinessName("");
      await showSuccessAlert("Demo URL generated successfully.");
    } catch (submitError) {
      const message = axios.isAxiosError(submitError)
        ? (submitError.response?.data?.detail as string | undefined) ?? "Failed to generate demo URL."
        : "Unexpected error. Please try again.";
      setError(message);
      await showErrorAlert(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onCopyUrl() {
    if (!result?.demo_url) return;
    await navigator.clipboard.writeText(result.demo_url);
    setCopied(true);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-6">
      <section className="mx-auto w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Website preview
        </p>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">See How Your Business Website Can Look</h1>
        <p className="mt-2 text-sm text-slate-600">
          Modern website previews for restaurants, gyms, schools and local businesses. Enter your business name to open a
          tailored preview link.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
            placeholder="Enter your business name"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="submit"
            disabled={isDisabled}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Generating...
              </>
            ) : (
              "Open preview"
            )}
          </button>
        </form>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {result ? (
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4">
            <p className="text-sm font-medium text-emerald-800">Your demo is ready:</p>
            <a
              href={result.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block break-all text-sm font-semibold text-emerald-700 underline underline-offset-2"
            >
              {result.demo_url}
            </a>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onCopyUrl}
                className="inline-flex items-center justify-center rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                {copied ? "Copied" : "Copy URL"}
              </button>
              <span className="text-xs text-emerald-700">Redirecting in 2 seconds...</span>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
