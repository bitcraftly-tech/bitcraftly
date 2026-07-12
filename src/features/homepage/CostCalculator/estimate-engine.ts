import type {
  CalculatorEstimateResult,
  CalculatorSelections,
  CostCalculatorCmsContent,
} from "./cost-calculator.types";

/**
 * Pure estimate engine — CMS-data driven, UI-agnostic.
 */
export function calculatePricingEstimate(
  content: CostCalculatorCmsContent,
  selections: CalculatorSelections,
): CalculatorEstimateResult {
  const project = content.projectTypes.find(
    (item) => item.id === selections.projectTypeId,
  );
  const timeline = content.timelines.find(
    (item) => item.id === selections.timelineId,
  );
  const hosting = content.hostingOptions.find(
    (item) => item.id === selections.hostingId,
  );
  const maintenance =
    content.maintenanceOptions.find(
      (item) => item.id === selections.maintenanceId,
    ) ?? content.maintenanceOptions[0];

  const multiplier = timeline?.multiplier ?? 1;
  const lines: CalculatorEstimateResult["lines"] = [];

  let projectTotal = 0;
  if (project) {
    projectTotal = Math.round(project.basePrice * multiplier);
    lines.push({
      id: `project-${project.id}`,
      label: project.label,
      amount: projectTotal,
      category: "project",
    });
  }

  let featuresTotal = 0;
  for (const featureId of selections.featureIds) {
    const feature = content.features.find((item) => item.id === featureId);
    if (!feature) continue;
    const amount = Math.round(feature.price * multiplier);
    featuresTotal += amount;
    lines.push({
      id: `feature-${feature.id}`,
      label: feature.label,
      amount,
      category: "feature",
    });
  }

  let hostingTotal = 0;
  if (hosting && hosting.price > 0) {
    if (hosting.id === "setup-for-me") {
      lines.push({
        id: "domain",
        label: "Domain",
        amount: 1200,
        category: "hosting",
        recurring: true,
      });
      lines.push({
        id: "hosting",
        label: "Hosting",
        amount: 3000,
        category: "hosting",
        recurring: true,
      });
      hostingTotal = 4200;
    } else {
      hostingTotal = hosting.price;
      lines.push({
        id: `hosting-${hosting.id}`,
        label: hosting.label,
        amount: hostingTotal,
        category: "hosting",
      });
    }
  }

  const maintenanceMonthly = maintenance?.monthlyPrice ?? 0;
  if (maintenanceMonthly > 0) {
    lines.push({
      id: "maintenance",
      label: "Maintenance (monthly)",
      amount: maintenanceMonthly,
      category: "maintenance",
      recurring: true,
    });
  }

  let discountTotal = 0;
  if (content.discount.enabled && content.discount.amount > 0) {
    discountTotal = content.discount.amount;
    lines.push({
      id: "discount",
      label: content.discount.label,
      amount: -discountTotal,
      category: "discount",
    });
  }

  const subtotal = Math.max(
    0,
    projectTotal + featuresTotal + hostingTotal - discountTotal,
  );

  let taxTotal = 0;
  if (content.tax.enabled && content.tax.ratePercent > 0) {
    taxTotal = Math.round(subtotal * (content.tax.ratePercent / 100));
    lines.push({
      id: "tax",
      label: content.tax.label,
      amount: taxTotal,
      category: "tax",
    });
  }

  const estimatedTotal = subtotal + taxTotal;
  const isComplete = Boolean(
    selections.customerTypeId &&
      selections.projectTypeId &&
      selections.hostingId &&
      selections.timelineId,
  );

  let weeksMin = project?.timelineWeeksMin ?? 0;
  let weeksMax = project?.timelineWeeksMax ?? 0;
  if (timeline?.id === "rush" && project) {
    weeksMin = Math.max(1, Math.round(weeksMin / 1.35));
    weeksMax = Math.max(weeksMin, Math.round(weeksMax / 1.35));
  } else if (timeline?.id === "fast" && project) {
    weeksMax = Math.max(weeksMin, Math.round(weeksMax / 1.15));
  }

  const timelineLabel = project
    ? weeksMin === weeksMax
      ? `${weeksMin} week${weeksMin > 1 ? "s" : ""}`
      : `${weeksMin}–${weeksMax} weeks`
    : "Select a project";

  return {
    lines,
    projectTotal,
    featuresTotal,
    hostingTotal,
    maintenanceMonthly,
    discountTotal,
    taxTotal,
    estimatedTotal,
    annualRenewal: hosting?.annualRenewal ?? 0,
    timelineLabel,
    suggestedPackage: project?.suggestedPackage ?? "Custom quote",
    recommendedStack: project?.recommendedStack ?? [],
    hostingLabel: hosting
      ? hosting.id === "setup-for-me"
        ? "Domain + hosting included"
        : "Domain & hosting on your side"
      : "Select domain & hosting option",
    isComplete,
  };
}

export function formatInr(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function buildQuoteHref(
  baseHref: string,
  estimate: CalculatorEstimateResult,
  selections: CalculatorSelections,
): string {
  if (!estimate.isComplete || !selections.projectTypeId) {
    return baseHref;
  }

  const url = new URL(baseHref, "https://bitcraftly.local");
  url.searchParams.set("service", estimate.suggestedPackage);
  url.searchParams.set("intent", "quote");
  url.searchParams.set("source", "project-cost-calculator");
  url.searchParams.set(
    "budget",
    estimate.estimatedTotal <= 15000
      ? "Under ₹15,000"
      : estimate.estimatedTotal <= 30000
        ? "₹15,000–₹30,000"
        : estimate.estimatedTotal <= 60000
          ? "₹30,000–₹60,000"
          : "₹60,000+",
  );
  url.searchParams.set(
    "message",
    `Cost calculator estimate: ${formatInr(estimate.estimatedTotal)} | Customer: ${selections.customerTypeId} | Project: ${estimate.suggestedPackage} | Features: ${selections.featureIds.join(", ") || "none"} | Hosting: ${selections.hostingId} | Timeline: ${selections.timelineId}`,
  );

  return `${url.pathname}?${url.searchParams.toString()}`;
}
