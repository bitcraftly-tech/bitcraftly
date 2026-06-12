"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

import { CONTAINER, whatsappUrl } from "@/lib/constants";
import {
  buildCalculatorContactUrl,
  BUSINESS_PROJECTS,
  calculateProjectCost,
  isCalculatorComplete,
  CUSTOMER_TYPES,
  FEATURE_OPTIONS,
  formatInr,
  getProjectsForCustomer,
  HOSTING_OPTIONS,
  PERSONAL_PROJECTS,
  STEPS,
  type CalculatorState,
  type CustomerType,
  type FeatureId,
  type HostingChoice,
  type ProjectType,
} from "@/lib/projectCostCalculator";

const INITIAL_STATE: CalculatorState = {
  customerType: null,
  projectType: null,
  features: [],
  hostingChoice: null,
};

const stepMotion = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

function StepCard({
  active,
  onClick,
  title,
  description,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`flex h-full w-full flex-col rounded-2xl border p-4 text-left transition-shadow sm:p-5 ${
        active
          ? "border-indigo-500 bg-indigo-50/80 shadow-[0_12px_28px_rgba(79,70,229,0.15)] ring-1 ring-indigo-500/25 dark:border-indigo-400 dark:bg-indigo-950/30"
          : "border-border-primary bg-bg-card hover:border-border-secondary hover:shadow-[0_8px_20px_rgba(2,6,23,0.08)] dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:border-dark-border-secondary"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="mt-3 text-base font-semibold text-text-primary dark:text-dark-text-primary">{title}</span>
      <span className="mt-1 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{description}</span>
    </motion.button>
  );
}

function FeatureChip({
  active,
  label,
  price,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  price: number;
  icon: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition ${
        active
          ? "border-indigo-500 bg-indigo-600 text-white shadow-md"
          : "border-border-primary bg-bg-secondary text-text-secondary hover:border-indigo-300 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-secondary"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
      <span className={active ? "text-indigo-100" : "text-text-tertiary dark:text-dark-text-tertiary"}>
        {formatInr(price)}
      </span>
    </motion.button>
  );
}

export default function ProjectCostCalculator() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE);

  const projects = state.customerType ? getProjectsForCustomer(state.customerType) : [];

  const breakdown = useMemo(() => calculateProjectCost(state), [state]);
  const complete = isCalculatorComplete(state);
  const contactUrl =
    breakdown && complete ? buildCalculatorContactUrl(state, breakdown) : "/contact?intent=quote&source=project-cost-calculator";

  const whatsappMessage = breakdown
    ? `Hi Sanjay — I used the project cost calculator.\n\nFirst year: ${formatInr(breakdown.firstYearTotal)}\nProject: ${breakdown.projectLabel}\nAnnual renewal: ${formatInr(breakdown.annualRenewal)}\n\nPlease share a written scope.`
    : "Hi Sanjay — I'd like a website cost estimate from Bitcraftly.";

  const canGoNext =
    (step === 0 && state.customerType) ||
    (step === 1 && state.projectType) ||
    step === 2 ||
    (step === 3 && state.hostingChoice);

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const selectCustomer = (customerType: CustomerType) => {
    setState((prev) => ({
      ...prev,
      customerType,
      projectType: null,
    }));
    setStep(1);
  };

  const selectProject = (projectType: ProjectType) => {
    setState((prev) => ({ ...prev, projectType }));
    setStep(2);
  };

  const toggleFeature = (id: FeatureId) => {
    setState((prev) => ({
      ...prev,
      features: prev.features.includes(id) ? prev.features.filter((f) => f !== id) : [...prev.features, id],
    }));
  };

  const selectHosting = (hostingChoice: HostingChoice) => {
    setState((prev) => ({ ...prev, hostingChoice }));
  };

  const MotionWrap = reduceMotion ? "div" : motion.div;

  return (
    <section
      id="project-cost-calculator"
      className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-7 dark:border-dark-border-primary md:py-10`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
        Project cost calculator
      </p>
      <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
        Kitna padega? — step-by-step estimate
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
        Customer type, project, features aur hosting choose karo — live breakdown dikhega. Final quote written scope ke
        baad confirm hota hai.
      </p>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card sm:p-6">
          <div className="mb-6 flex flex-wrap gap-2">
            {STEPS.map((label, index) => {
              const done = index < step || (index === 0 && state.customerType) || (index === 1 && state.projectType) || (index === 3 && state.hostingChoice);
              const current = index === step;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => index <= step && setStep(index)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                    current
                      ? "bg-indigo-600 text-white"
                      : done
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                        : "bg-bg-secondary text-text-tertiary dark:bg-dark-bg-secondary dark:text-dark-text-tertiary"
                  }`}
                >
                  {index + 1}. {label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 ? (
              <MotionWrap key="step-0" {...(reduceMotion ? {} : stepMotion)} className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">Select customer type</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {CUSTOMER_TYPES.map((option) => (
                    <StepCard
                      key={option.id}
                      active={state.customerType === option.id}
                      onClick={() => selectCustomer(option.id)}
                      title={option.label}
                      description={option.description}
                      icon={option.icon}
                    />
                  ))}
                </div>
              </MotionWrap>
            ) : null}

            {step === 1 && state.customerType ? (
              <MotionWrap key="step-1" {...(reduceMotion ? {} : stepMotion)} className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">Select project type</h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  {state.customerType === "personal" ? "Personal" : "Business"} projects
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {projects.map((option) => (
                    <StepCard
                      key={option.id}
                      active={state.projectType === option.id}
                      onClick={() => selectProject(option.id)}
                      title={option.label}
                      description={option.description}
                      icon={option.icon}
                    />
                  ))}
                </div>
              </MotionWrap>
            ) : null}

            {step === 2 ? (
              <MotionWrap key="step-2" {...(reduceMotion ? {} : stepMotion)} className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">Additional features</h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Optional — jitna chahiye select karo</p>
                <div className="flex flex-wrap gap-2">
                  {FEATURE_OPTIONS.map((feature) => (
                    <FeatureChip
                      key={feature.id}
                      active={state.features.includes(feature.id)}
                      label={feature.label}
                      price={feature.price}
                      icon={feature.icon}
                      onClick={() => toggleFeature(feature.id)}
                    />
                  ))}
                </div>
              </MotionWrap>
            ) : null}

            {step === 3 ? (
              <MotionWrap key="step-3" {...(reduceMotion ? {} : stepMotion)} className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">Domain &amp; hosting</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {HOSTING_OPTIONS.map((option) => (
                    <StepCard
                      key={option.id}
                      active={state.hostingChoice === option.id}
                      onClick={() => selectHosting(option.id)}
                      title={option.label}
                      description={option.description}
                      icon={option.icon}
                    />
                  ))}
                </div>
              </MotionWrap>
            ) : null}
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-border-primary pt-5 dark:border-dark-border-primary">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="rounded-full border border-border-primary px-4 py-2 text-sm font-semibold text-text-secondary disabled:opacity-40 dark:border-dark-border-primary dark:text-dark-text-secondary"
            >
              Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!canGoNext}
                className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-40"
              >
                Next
              </button>
            ) : null}
          </div>
        </div>

        <motion.aside
          layout={!reduceMotion}
          className="flex h-full flex-col rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-indigo-50/90 via-bg-card to-bg-card p-5 shadow-[0_16px_40px_rgba(79,70,229,0.12)] dark:from-indigo-950/40 dark:via-dark-bg-card dark:to-dark-bg-card sm:p-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-600 dark:text-indigo-400">
            Live price breakdown
          </p>

          {breakdown ? (
            <>
              <ul className="mt-5 space-y-3">
                {breakdown.lines.map((line) => (
                  <motion.li
                    key={line.id}
                    layout={!reduceMotion}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border-primary/70 bg-bg-primary/70 px-3 py-2.5 dark:border-dark-border-primary dark:bg-dark-bg-primary/50"
                  >
                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">{line.label}</span>
                    <span className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{formatInr(line.amount)}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl border border-indigo-500/20 bg-indigo-600/5 p-4 dark:bg-indigo-400/5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">
                  {complete ? "Total first year cost" : "Running total"}
                </p>
                <p className="mt-1 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary">
                  {formatInr(breakdown.firstYearTotal)}
                </p>
              </div>

              <div className="mt-3 rounded-xl border border-border-primary bg-bg-primary/60 p-4 dark:border-dark-border-primary dark:bg-dark-bg-primary/40">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">
                  Annual renewal cost
                </p>
                <p className="mt-1 text-2xl font-semibold text-text-primary dark:text-dark-text-primary">
                  {formatInr(breakdown.annualRenewal)}
                </p>
                <p className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">{breakdown.hostingLabel}</p>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">
                Estimate only · 50% advance · written scope before payment · GST as applicable
              </p>

              <div className="mt-auto space-y-2 pt-6">
                <Link
                  href={contactUrl}
                  className={`inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-white transition ${
                    complete ? "bg-indigo-600 hover:bg-indigo-700" : "pointer-events-none bg-indigo-400 opacity-70"
                  }`}
                  aria-disabled={!complete}
                  tabIndex={complete ? 0 : -1}
                >
                  {complete ? "Get written quote →" : "Complete all steps for quote"}
                </Link>
                <a
                  href={whatsappUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-border-primary bg-bg-card px-4 py-3 text-sm font-semibold text-text-primary transition hover:border-border-secondary dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-primary"
                >
                  WhatsApp this estimate
                </a>
              </div>
            </>
          ) : (
            <div className="mt-6 flex flex-1 flex-col justify-center rounded-xl border border-dashed border-border-primary p-6 text-center dark:border-dark-border-primary">
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                Steps complete karo — yahan live breakdown dikhega
              </p>
              <p className="mt-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                Example: Website ₹15,000 + Admin ₹10,000 + Hosting ₹3,000
              </p>
            </div>
          )}
        </motion.aside>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[...PERSONAL_PROJECTS, ...BUSINESS_PROJECTS].map((project) => (
          <div
            key={project.id}
            className="rounded-xl border border-border-primary bg-bg-card px-4 py-3 dark:border-dark-border-primary dark:bg-dark-bg-card"
          >
            <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
              {project.icon} {project.label}
            </p>
            <p className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">From calculator base tier</p>
          </div>
        ))}
      </div>
    </section>
  );
}
