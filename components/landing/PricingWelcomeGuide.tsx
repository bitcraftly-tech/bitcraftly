"use client";

import { useEffect, useState } from "react";
import {
  Calculator,
  GitCompare,
  HelpCircle,
  Layers,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

import { CONTAINER } from "@/lib/constants";
import {
  PRICING_GUIDE_STORAGE,
  PRICING_WELCOME_STEPS,
  type PricingGuideStep,
} from "@/lib/pricingWelcomeGuide";

const STEP_ICONS = [GitCompare, Zap, Layers, Calculator] as const;

function readHidePermanently(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(PRICING_GUIDE_STORAGE.hidePermanently) === "1";
  } catch {
    return false;
  }
}

function readSessionDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(PRICING_GUIDE_STORAGE.sessionDismissed) === "1";
  } catch {
    return false;
  }
}

function GuideStepCard({ step }: { step: PricingGuideStep }) {
  const Icon = STEP_ICONS[step.step - 1] ?? Sparkles;

  return (
    <a
      href={`#${step.anchorId}`}
      className="group flex gap-3 rounded-xl border border-border-primary/80 bg-bg-primary/60 p-3 transition hover:border-indigo-500/40 hover:bg-indigo-600/5 dark:border-dark-border-primary dark:bg-dark-bg-primary/40 dark:hover:border-indigo-400/35 dark:hover:bg-indigo-400/5 sm:p-3.5"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-indigo-600/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300">
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-600 dark:text-indigo-400">
            Step {step.step}
          </span>
          <span className="text-[10px] font-medium text-text-tertiary dark:text-dark-text-tertiary">{step.timeLabel}</span>
        </span>
        <span className="mt-0.5 block text-sm font-semibold text-text-primary transition group-hover:text-indigo-700 dark:text-dark-text-primary dark:group-hover:text-indigo-300">
          {step.title}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">{step.hint}</span>
      </span>
    </a>
  );
}

export default function PricingWelcomeGuide() {
  const [mounted, setMounted] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);

  useEffect(() => {
    const permanent = readHidePermanently();
    const sessionDismissed = readSessionDismissed();
    setPanelOpen(!permanent && !sessionDismissed);
    setMounted(true);
  }, []);

  const dismissForSession = () => {
    try {
      window.sessionStorage.setItem(PRICING_GUIDE_STORAGE.sessionDismissed, "1");
    } catch {
      /* ignore */
    }
    setPanelOpen(false);
  };

  const dismissPermanently = () => {
    try {
      window.localStorage.setItem(PRICING_GUIDE_STORAGE.hidePermanently, "1");
      window.sessionStorage.setItem(PRICING_GUIDE_STORAGE.sessionDismissed, "1");
    } catch {
      /* ignore */
    }
    setPanelOpen(false);
  };

  const reopenGuide = () => {
    setPanelOpen(true);
    try {
      window.sessionStorage.removeItem(PRICING_GUIDE_STORAGE.sessionDismissed);
    } catch {
      /* ignore */
    }
  };

  if (!mounted) return null;

  return (
    <>
      {panelOpen ? (
        <section
          aria-label="Pricing page quick start guide"
          className={`${CONTAINER} scroll-mt-24 pb-2 pt-4 md:pt-5`}
        >
          <div className="relative overflow-hidden rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-indigo-50/90 via-bg-card to-bg-card shadow-[0_16px_40px_rgba(79,70,229,0.1)] dark:from-indigo-950/50 dark:via-dark-bg-card dark:to-dark-bg-card">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.22] dark:opacity-[0.18]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
              aria-hidden
            />
            <div className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/15" aria-hidden />

            <div className="relative p-4 sm:p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-[0_8px_20px_rgba(79,70,229,0.35)]">
                    <Sparkles className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-600 dark:text-indigo-400">
                      Welcome · Quick start
                    </p>
                    <h2 className="mt-1 font-[var(--font-playfair)] text-lg text-text-primary dark:text-dark-text-primary sm:text-xl">
                      Pricing page — 2 minute guide
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                      Naya ho? Neeche steps follow karo — compare, package choose, ya calculator se estimate. Final quote
                      written scope ke baad hi.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={dismissForSession}
                  className="shrink-0 rounded-full border border-border-primary p-2 text-text-tertiary transition hover:border-border-secondary hover:text-text-primary dark:border-dark-border-primary dark:text-dark-text-tertiary dark:hover:text-dark-text-primary"
                  aria-label="Hide guide for now"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
                {PRICING_WELCOME_STEPS.map((step) => (
                  <GuideStepCard key={step.anchorId} step={step} />
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border-primary/70 pt-4 dark:border-dark-border-primary/70">
                <a
                  href="#pricing-compare"
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Start with compare →
                </a>
                <button
                  type="button"
                  onClick={dismissForSession}
                  className="inline-flex items-center justify-center rounded-full border border-border-secondary px-4 py-2 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
                >
                  Got it
                </button>
                <button
                  type="button"
                  onClick={dismissPermanently}
                  className="text-xs font-medium text-text-tertiary underline-offset-2 transition hover:text-text-secondary hover:underline dark:text-dark-text-tertiary dark:hover:text-dark-text-secondary"
                >
                  Don&apos;t show again
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {!panelOpen ? (
        <button
          type="button"
          onClick={reopenGuide}
          className="fixed bottom-6 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-bg-card/95 px-3.5 py-2.5 text-sm font-semibold text-indigo-700 shadow-[0_12px_32px_rgba(79,70,229,0.2)] backdrop-blur-md transition hover:border-indigo-500/50 hover:bg-indigo-50 dark:border-indigo-400/30 dark:bg-dark-bg-card/95 dark:text-indigo-300 dark:hover:bg-indigo-950/80 sm:bottom-8 sm:right-6"
          aria-label="Open pricing page guide"
        >
          <HelpCircle className="size-4 shrink-0" aria-hidden />
          <span>Guide</span>
        </button>
      ) : null}
    </>
  );
}
