"use client";

import {
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { trackCostCalculatorEvent } from "./analytics";
import type {
  CalculatorCustomerId,
  CalculatorFeatureId,
  CalculatorHostingId,
  CalculatorMaintenanceId,
  CalculatorProjectTypeId,
  CalculatorSelections,
  CalculatorTimelineId,
  CostCalculatorCmsContent,
} from "./cost-calculator.types";
import {
  buildQuoteHref,
  calculatePricingEstimate,
  formatInr,
} from "./estimate-engine";
import { LivePricePanel } from "./LivePricePanel";

interface PricingCalculatorWizardProps {
  content: CostCalculatorCmsContent;
}

function OptionCard({
  active,
  title,
  description,
  icon,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  icon: IconName;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn("pricing-option-card", active && "is-active")}
      aria-pressed={active}
      onClick={onClick}
    >
      <span className="pricing-option-heading">
        <span className="pricing-option-icon" aria-hidden>
          <Icon name={icon} size="md" aria-hidden className="h-[22px] w-[22px]" />
        </span>
        <span className="pricing-option-title">{title}</span>
      </span>
      <span className="pricing-option-desc">{description}</span>
    </button>
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
  icon: IconName;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn("pricing-feature-chip", active && "is-active")}
      aria-pressed={active}
      onClick={onClick}
    >
      <Icon name={icon} size="sm" aria-hidden className="h-[14px] w-[14px]" />
      <span>{label}</span>
      <span className="pricing-feature-price">{formatInr(price)}</span>
    </button>
  );
}

function PricingCalculatorWizardComponent({
  content,
}: PricingCalculatorWizardProps) {
  const reactId = useId();
  const panelAnchorId = `${reactId}-estimate`;
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [selections, setSelections] = useState<CalculatorSelections>(
    content.defaultSelections,
  );
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const stepRegionRef = useRef<HTMLDivElement>(null);
  const lastEstimateKey = useRef("");

  useEffect(() => {
    // Drop any previous visit so Calculate Cost always opens on a clean Customer step.
    try {
      window.localStorage.removeItem(content.calculator.storageKey);
    } catch {
      // Private mode — ignore
    }
  }, [content.calculator.storageKey]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        content.calculator.storageKey,
        JSON.stringify({ selections, stepIndex }),
      );
    } catch {
      // Private mode / quota — ignore
    }
  }, [content.calculator.storageKey, selections, stepIndex]);

  const estimate = useMemo(
    () => calculatePricingEstimate(content, selections),
    [content, selections],
  );

  useEffect(() => {
    if (!estimate.lines.length) return;
    const key = `${estimate.estimatedTotal}-${selections.projectTypeId}-${selections.featureIds.join(",")}-${selections.hostingId}-${selections.timelineId}`;
    if (key === lastEstimateKey.current) return;
    lastEstimateKey.current = key;
    trackCostCalculatorEvent("estimate_generated", {
      total: estimate.estimatedTotal,
      complete: estimate.isComplete,
      projectTypeId: selections.projectTypeId ?? undefined,
    });
  }, [estimate, selections]);

  const projectsForCustomer = useMemo(() => {
    const customerId = selections.customerTypeId;
    if (!customerId) return [];
    return content.projectTypes.filter((project) =>
      project.customerIds.includes(customerId),
    );
  }, [content.projectTypes, selections.customerTypeId]);

  const quoteHref = useMemo(
    () =>
      buildQuoteHref(
        content.actions.requestQuoteHref,
        estimate,
        selections,
      ),
    [content.actions.requestQuoteHref, estimate, selections],
  );

  const canProceed = useMemo(() => {
    switch (content.steps[stepIndex]?.id) {
      case "customer":
        return Boolean(selections.customerTypeId);
      case "project":
        return Boolean(selections.projectTypeId);
      case "features":
        return true;
      case "hosting":
        return Boolean(selections.hostingId);
      case "timeline":
        return Boolean(selections.timelineId);
      case "summary":
        return true;
      default:
        return false;
    }
  }, [content.steps, selections, stepIndex]);

  const goToStep = useCallback(
    (nextIndex: number, dir: "forward" | "back") => {
      if (nextIndex < 0 || nextIndex >= content.steps.length) return;
      if (nextIndex > stepIndex + 1) return;
      setDirection(dir);
      setStepIndex(nextIndex);
    },
    [content.steps.length, stepIndex],
  );

  useEffect(() => {
    stepRegionRef.current?.focus({ preventScroll: true });
  }, [stepIndex]);

  function selectCustomer(id: CalculatorCustomerId) {
    setSelections((current) => ({
      ...current,
      customerTypeId: id,
      projectTypeId: null,
    }));
    setDirection("forward");
    setStepIndex(1);
  }

  function selectProject(id: CalculatorProjectTypeId) {
    setSelections((current) => ({ ...current, projectTypeId: id }));
    setDirection("forward");
    setStepIndex(2);
  }

  function toggleFeature(id: CalculatorFeatureId) {
    setSelections((current) => ({
      ...current,
      featureIds: current.featureIds.includes(id)
        ? current.featureIds.filter((item) => item !== id)
        : [...current.featureIds, id],
    }));
  }

  function selectHosting(id: CalculatorHostingId) {
    setSelections((current) => ({ ...current, hostingId: id }));
  }

  function selectMaintenance(id: CalculatorMaintenanceId) {
    setSelections((current) => ({ ...current, maintenanceId: id }));
  }

  function selectTimeline(id: CalculatorTimelineId) {
    setSelections((current) => ({ ...current, timelineId: id }));
  }

  const step = content.steps[stepIndex];
  const customerLabel =
    content.customers.find((item) => item.id === selections.customerTypeId)
      ?.label ?? "—";
  const projectLabel =
    content.projectTypes.find((item) => item.id === selections.projectTypeId)
      ?.label ?? "—";

  return (
    <div className="pricing-wizard">
      <header className="pricing-wizard-header">
        <p className="pricing-wizard-eyebrow">{content.calculator.eyebrow}</p>
        <h3 className="pricing-wizard-heading">{content.calculator.heading}</h3>
        <p className="pricing-wizard-copy">{content.calculator.description}</p>
      </header>

      <div className="pricing-wizard-layout">
        <div className="pricing-wizard-left">
          <div
            className="pricing-step-pills"
            role="tablist"
            aria-label="Calculator steps"
          >
            {content.steps.map((item, index) => {
              const completed = index < stepIndex;
              const active = index === stepIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "pricing-step-pill",
                    active && "is-active",
                    completed && "is-completed",
                  )}
                  onClick={() => {
                    if (index <= stepIndex) goToStep(index, "back");
                  }}
                >
                  {index + 1}. {item.label}
                </button>
              );
            })}
          </div>

          <div
            className="pricing-step-tip"
            role="note"
            aria-live="polite"
          >
            <span className="pricing-step-tip-label" aria-hidden>
              Tip
            </span>
            <span>{step?.tip}</span>
          </div>

          <div
            ref={stepRegionRef}
            className={cn(
              "pricing-step-region",
              direction === "forward"
                ? "is-enter-forward"
                : "is-enter-back",
            )}
            role="tabpanel"
            tabIndex={-1}
            aria-label={step?.label}
            key={step?.id}
          >
            {step?.id === "customer" ? (
              <div className="pricing-step-body">
                <h4 className="pricing-step-title">Select customer type</h4>
                <div className="pricing-option-grid pricing-option-grid-2">
                  {content.customers.map((customer) => (
                    <OptionCard
                      key={customer.id}
                      active={selections.customerTypeId === customer.id}
                      title={customer.label}
                      description={customer.description}
                      icon={customer.icon}
                      onClick={() => selectCustomer(customer.id)}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {step?.id === "project" && selections.customerTypeId ? (
              <div className="pricing-step-body">
                <h4 className="pricing-step-title">Select project type</h4>
                <p className="pricing-step-subtitle">
                  {customerLabel} projects
                </p>
                <div className="pricing-option-grid pricing-option-grid-2">
                  {projectsForCustomer.map((project) => (
                    <OptionCard
                      key={project.id}
                      active={selections.projectTypeId === project.id}
                      title={project.label}
                      description={project.description}
                      icon={project.icon}
                      onClick={() => selectProject(project.id)}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {step?.id === "features" ? (
              <div className="pricing-step-body">
                <h4 className="pricing-step-title">Additional features</h4>
                <p className="pricing-step-subtitle">
                  Optional — jitna chahiye select karo
                </p>
                <div className="pricing-feature-row">
                  {content.features.map((feature) => (
                    <FeatureChip
                      key={feature.id}
                      active={selections.featureIds.includes(feature.id)}
                      label={feature.label}
                      price={feature.price}
                      icon={feature.icon}
                      onClick={() => toggleFeature(feature.id)}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {step?.id === "hosting" ? (
              <div className="pricing-step-body">
                <h4 className="pricing-step-title">Domain & hosting</h4>
                <div className="pricing-option-grid pricing-option-grid-2">
                  {content.hostingOptions.map((option) => (
                    <OptionCard
                      key={option.id}
                      active={selections.hostingId === option.id}
                      title={option.label}
                      description={option.description}
                      icon={option.icon}
                      onClick={() => selectHosting(option.id)}
                    />
                  ))}
                </div>
                <h4 className="pricing-step-title pricing-step-title-spaced">
                  Maintenance
                </h4>
                <div className="pricing-option-grid pricing-option-grid-2">
                  {content.maintenanceOptions.map((option) => (
                    <OptionCard
                      key={option.id}
                      active={selections.maintenanceId === option.id}
                      title={option.label}
                      description={
                        option.monthlyPrice > 0
                          ? `${option.description} · ${formatInr(option.monthlyPrice)}/mo`
                          : option.description
                      }
                      icon={option.icon}
                      onClick={() => selectMaintenance(option.id)}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {step?.id === "timeline" ? (
              <div className="pricing-step-body">
                <h4 className="pricing-step-title">Choose timeline</h4>
                <div className="pricing-option-grid pricing-option-grid-3">
                  {content.timelines.map((timeline) => (
                    <OptionCard
                      key={timeline.id}
                      active={selections.timelineId === timeline.id}
                      title={timeline.label}
                      description={timeline.description}
                      icon={timeline.icon}
                      onClick={() => selectTimeline(timeline.id)}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {step?.id === "summary" ? (
              <div className="pricing-step-body">
                <h4 className="pricing-step-title">Summary</h4>
                <dl className="pricing-summary-list">
                  <div>
                    <dt>Customer</dt>
                    <dd>{customerLabel}</dd>
                  </div>
                  <div>
                    <dt>Project</dt>
                    <dd>{projectLabel}</dd>
                  </div>
                  <div>
                    <dt>Features</dt>
                    <dd>
                      {selections.featureIds.length
                        ? selections.featureIds
                            .map(
                              (id) =>
                                content.features.find((item) => item.id === id)
                                  ?.label,
                            )
                            .filter(Boolean)
                            .join(", ")
                        : "None"}
                    </dd>
                  </div>
                  <div>
                    <dt>Hosting</dt>
                    <dd>
                      {content.hostingOptions.find(
                        (item) => item.id === selections.hostingId,
                      )?.label ?? "—"}
                    </dd>
                  </div>
                  <div>
                    <dt>Maintenance</dt>
                    <dd>
                      {content.maintenanceOptions.find(
                        (item) => item.id === selections.maintenanceId,
                      )?.label ?? "—"}
                    </dd>
                  </div>
                  <div>
                    <dt>Timeline</dt>
                    <dd>
                      {content.timelines.find(
                        (item) => item.id === selections.timelineId,
                      )?.label ?? "—"}
                    </dd>
                  </div>
                </dl>
              </div>
            ) : null}
          </div>

          <div className="pricing-wizard-nav">
            <button
              type="button"
              className="pricing-nav-back"
              disabled={stepIndex === 0}
              onClick={() => goToStep(stepIndex - 1, "back")}
            >
              {content.calculator.backLabel}
            </button>
            {stepIndex < content.steps.length - 1 ? (
              <button
                type="button"
                className="pricing-nav-next"
                disabled={!canProceed}
                onClick={() => goToStep(stepIndex + 1, "forward")}
              >
                {content.calculator.nextLabel}
              </button>
            ) : null}
          </div>
        </div>

        <div
          id={panelAnchorId}
          className={cn(
            "pricing-wizard-right",
            mobilePanelOpen && "is-mobile-open",
          )}
        >
          <LivePricePanel
            content={content}
            estimate={estimate}
            selections={selections}
            quoteHref={quoteHref}
            consultationHref={content.actions.bookConsultationHref}
          />
        </div>
      </div>

      <div className="pricing-sticky-estimate">
        <button
          type="button"
          className="pricing-sticky-estimate-btn"
          onClick={() => {
            setMobilePanelOpen(true);
            const prefersReducedMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;
            document.getElementById(panelAnchorId)?.scrollIntoView({
              behavior: prefersReducedMotion ? "auto" : "smooth",
              block: "start",
            });
          }}
        >
          <span>{content.calculator.stickyEstimateLabel}</span>
          <strong>
            {estimate.lines.length
              ? formatInr(estimate.estimatedTotal)
              : "—"}
          </strong>
        </button>
      </div>
    </div>
  );
}

export const PricingCalculatorWizard = memo(PricingCalculatorWizardComponent);
