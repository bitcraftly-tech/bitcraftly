"use client";

import axios from "axios";
import { FormEvent, useMemo, useState } from "react";
import { showErrorAlert, showSuccessAlert } from "@/lib/sweetAlert";

type LeadPayload = {
  name: string;
  phone: string;
  business_type: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

const initialState: LeadPayload = {
  name: "",
  phone: "",
  business_type: "",
};

export default function LeadCaptureForm() {
  const [form, setForm] = useState<LeadPayload>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isDisabled = useMemo(
    () =>
      isSubmitting ||
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.business_type.trim(),
    [form.business_type, form.name, form.phone, isSubmitting],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await axios.post(`${API_BASE_URL}/api/leads`, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        business_type: form.business_type.trim(),
      });

      setSuccessMessage("Lead submitted successfully.");
      setForm(initialState);
      await showSuccessAlert("Lead submitted successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const detail =
          (error.response?.data as { detail?: string } | undefined)?.detail ??
          "Failed to submit lead.";
        setErrorMessage(detail);
        await showErrorAlert(detail);
      } else {
        setErrorMessage("Unexpected error occurred. Please try again.");
        await showErrorAlert("Unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium text-zinc-200">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          placeholder="Enter your full name"
          className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/20"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-zinc-200">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          placeholder="+1 555 123 4567"
          className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/20"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="business_type" className="text-sm font-medium text-zinc-200">
          Business Type
        </label>
        <input
          id="business_type"
          type="text"
          value={form.business_type}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, business_type: event.target.value }))
          }
          placeholder="Restaurant, Salon, Gym..."
          className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/20"
        />
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="inline-flex w-full items-center justify-center rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit Lead"}
      </button>

      {successMessage ? (
        <p className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
          {successMessage}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-200">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
