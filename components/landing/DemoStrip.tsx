"use client";

import { FormEvent, useState } from "react";

import { CONTAINER } from "@/lib/constants";
import { showErrorAlert, showSuccessAlert } from "@/lib/sweetAlert";

const categories = ["Restaurant", "Salon", "Clinic", "Gym", "Shop"] as const;
type Category = (typeof categories)[number];

type PreviewResponse = {
  preview_url: string;
};

export default function DemoStrip() {
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState<Category>("Restaurant");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!businessName.trim()) {
      setError("Business name daalna zaroori hai");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/demo/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business_name: businessName.trim(),
          category,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate preview");
      }

      const data: PreviewResponse = await response.json();
      if (!data.preview_url) {
        throw new Error("Missing preview URL");
      }

      await showSuccessAlert("Demo preview generated successfully.");
      window.open(data.preview_url, "_blank", "noopener,noreferrer");
    } catch (_err) {
      setError("Something went wrong, please try again.");
      await showErrorAlert("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="demo" className="bg-text-primary py-10 dark:bg-dark-bg-secondary">
      <div className={CONTAINER}>
        <h2 className="text-center font-[var(--font-playfair)] text-2xl text-white sm:text-3xl">
          Apne restaurant ki website 10 second mein dekhein
        </h2>

        <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-3xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              placeholder="Business name daalo..."
              className="h-12 flex-1 rounded-full border border-white/20 bg-white px-5 text-sm text-text-primary outline-none transition focus:border-accent-primary dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="h-12 rounded-full bg-[#2B5CE6] px-6 text-sm font-semibold text-white transition hover:bg-[#2B5CE6]/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Generating..." : "Live Preview Generate Karo →"}
            </button>
          </div>

          {error ? <p className="mt-3 text-sm text-red-200 dark:text-red-300">{error}</p> : null}

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition ${
                  category === item
                    ? "border-white bg-white text-[#1A1916]"
                    : "border-white/30 text-white/85 hover:border-white/60"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}
