import {
  FEATURE_OPTIONS,
  PACKAGE_BANDS,
  PAGE_RANGE_ADDON,
  TIMELINE_OPTIONS,
  WEBSITE_TYPE_BASE,
  WEBSITE_TYPE_OPTIONS,
} from "./pricing-calculator.config";
import type { PricingCalculatorFormValues } from "./pricing-calculator.schema";

export interface PricingEstimateLine {
  readonly id: string;
  readonly label: string;
  readonly amount: number;
}

export interface PricingEstimateResult {
  readonly lines: readonly PricingEstimateLine[];
  readonly subtotal: number;
  readonly estimatedMin: number;
  readonly estimatedMax: number;
  readonly estimatedTotal: number;
  readonly packageName: string;
  readonly packageSummary: string;
  readonly timelineLabel: string;
  readonly budgetAlignment: "within" | "above" | "below" | "unknown";
  readonly isReady: boolean;
}

function budgetBounds(budget: PricingCalculatorFormValues["budget"]): {
  min: number;
  max: number;
} | null {
  switch (budget) {
    case "under-25k":
      return { min: 0, max: 25000 };
    case "25k-50k":
      return { min: 25000, max: 50000 };
    case "50k-1L":
      return { min: 50000, max: 100000 };
    case "1L-2L":
      return { min: 100000, max: 200000 };
    case "2L-plus":
      return { min: 200000, max: Number.POSITIVE_INFINITY };
    default:
      return null;
  }
}

export function calculatePricingEstimate(
  values: Partial<PricingCalculatorFormValues>,
): PricingEstimateResult {
  const websiteType = values.websiteType;
  const pages = values.pages;
  const timeline = values.timeline;
  const features = values.features ?? [];
  const budget = values.budget;

  const isReady = Boolean(websiteType && pages && timeline && budget);

  if (!websiteType || !pages || !timeline) {
    return {
      lines: [],
      subtotal: 0,
      estimatedMin: 0,
      estimatedMax: 0,
      estimatedTotal: 0,
      packageName: "Complete the form",
      packageSummary: "Select website type, pages, and timeline to see an estimate.",
      timelineLabel: "—",
      budgetAlignment: "unknown",
      isReady: false,
    };
  }

  const typeOption = WEBSITE_TYPE_OPTIONS.find((item) => item.id === websiteType);
  const timelineOption = TIMELINE_OPTIONS.find((item) => item.id === timeline);
  const multiplier = timelineOption?.multiplier ?? 1;

  const lines: PricingEstimateLine[] = [];
  const base = WEBSITE_TYPE_BASE[websiteType];
  const pagesAddon = PAGE_RANGE_ADDON[pages];

  lines.push({
    id: "website-type",
    label: typeOption?.label ?? "Website type",
    amount: Math.round(base * multiplier),
  });

  if (pagesAddon > 0) {
    lines.push({
      id: "pages",
      label: "Additional page scope",
      amount: Math.round(pagesAddon * multiplier),
    });
  }

  for (const featureId of features) {
    const feature = FEATURE_OPTIONS.find((item) => item.id === featureId);
    if (!feature) continue;
    lines.push({
      id: `feature-${feature.id}`,
      label: feature.label,
      amount: Math.round(feature.price * multiplier),
    });
  }

  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const estimatedMin = Math.round(subtotal * 0.92);
  const estimatedMax = Math.round(subtotal * 1.08);
  const estimatedTotal = subtotal;

  const band =
    PACKAGE_BANDS.find((item) => estimatedTotal <= item.max) ??
    PACKAGE_BANDS[PACKAGE_BANDS.length - 1];

  let budgetAlignment: PricingEstimateResult["budgetAlignment"] = "unknown";
  if (budget && budget !== "unsure") {
    const bounds = budgetBounds(budget);
    if (bounds) {
      if (estimatedTotal > bounds.max) budgetAlignment = "above";
      else if (estimatedTotal < bounds.min) budgetAlignment = "below";
      else budgetAlignment = "within";
    }
  }

  return {
    lines,
    subtotal,
    estimatedMin,
    estimatedMax,
    estimatedTotal,
    packageName: band.name,
    packageSummary: band.summary,
    timelineLabel: timelineOption?.label ?? "Standard",
    budgetAlignment,
    isReady,
  };
}

export function formatInr(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
