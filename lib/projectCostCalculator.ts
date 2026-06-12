/** Project cost calculator — pricing logic (aligned with Bitcraftly packages) */

export type CustomerType = "personal" | "business";

export type PersonalProjectType = "portfolio" | "blog" | "personal-brand";
export type BusinessProjectType = "startup" | "company" | "institute" | "ecommerce";
export type ProjectType = PersonalProjectType | BusinessProjectType;

export type FeatureId = "admin-panel" | "blog" | "ai-chatbot" | "payment-gateway" | "android-app" | "ios-app";

export type HostingChoice = "already-have" | "setup-for-me";

export type CalculatorState = {
  customerType: CustomerType | null;
  projectType: ProjectType | null;
  features: FeatureId[];
  hostingChoice: HostingChoice | null;
};

export type PriceLine = {
  id: string;
  label: string;
  amount: number;
  recurring?: boolean;
};

export type CostBreakdown = {
  lines: PriceLine[];
  firstYearTotal: number;
  annualRenewal: number;
  projectLabel: string;
  hostingLabel: string;
};

export const DOMAIN_PRICE = 1200;
export const HOSTING_ANNUAL = 3000;

export const CUSTOMER_TYPES: { id: CustomerType; label: string; description: string; icon: string }[] = [
  { id: "personal", label: "Personal", description: "Portfolio, blog, or personal brand", icon: "👤" },
  { id: "business", label: "Business", description: "Startup, company, institute, or store", icon: "🏢" },
];

export const PERSONAL_PROJECTS: { id: PersonalProjectType; label: string; description: string; icon: string }[] = [
  { id: "portfolio", label: "Portfolio Website", description: "Showcase work, projects & contact", icon: "🎨" },
  { id: "blog", label: "Blog Website", description: "Articles, categories & newsletter ready", icon: "✍️" },
  { id: "personal-brand", label: "Personal Brand Website", description: "Authority site with offers & leads", icon: "⭐" },
];

export const BUSINESS_PROJECTS: { id: BusinessProjectType; label: string; description: string; icon: string }[] = [
  { id: "startup", label: "Startup Website", description: "MVP landing, product story & sign-ups", icon: "🚀" },
  { id: "company", label: "Company Website", description: "Multi-page corporate presence", icon: "🌐" },
  { id: "institute", label: "Institute Website", description: "Courses, admissions & trust pages", icon: "🎓" },
  { id: "ecommerce", label: "Ecommerce Website", description: "Catalog, cart & online payments", icon: "🛒" },
];

export const FEATURE_OPTIONS: { id: FeatureId; label: string; price: number; icon: string }[] = [
  { id: "admin-panel", label: "Admin Panel", price: 10000, icon: "⚙️" },
  { id: "blog", label: "Blog", price: 3000, icon: "📝" },
  { id: "ai-chatbot", label: "AI Chatbot", price: 10000, icon: "✨" },
  { id: "payment-gateway", label: "Payment Gateway", price: 8000, icon: "💳" },
  { id: "android-app", label: "Android App", price: 45000, icon: "🤖" },
  { id: "ios-app", label: "iOS App", price: 45000, icon: "📱" },
];

export const HOSTING_OPTIONS: { id: HostingChoice; label: string; description: string; icon: string }[] = [
  { id: "already-have", label: "I already have Domain & Hosting", description: "You manage DNS & hosting", icon: "✅" },
  { id: "setup-for-me", label: "Setup Everything For Me", description: `Domain ₹${DOMAIN_PRICE.toLocaleString("en-IN")} + hosting ₹${HOSTING_ANNUAL.toLocaleString("en-IN")}/yr`, icon: "🛠️" },
];

const WEBSITE_BASE_PRICES: Record<ProjectType, number> = {
  portfolio: 12000,
  blog: 9999,
  "personal-brand": 14999,
  startup: 15000,
  company: 18000,
  institute: 16000,
  ecommerce: 35000,
};

const WEBSITE_LABELS: Record<ProjectType, string> = {
  portfolio: "Portfolio Website",
  blog: "Blog Website",
  "personal-brand": "Personal Brand Website",
  startup: "Startup Website",
  company: "Company Website",
  institute: "Institute Website",
  ecommerce: "Ecommerce Website",
};

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getProjectsForCustomer(customerType: CustomerType) {
  return customerType === "personal" ? PERSONAL_PROJECTS : BUSINESS_PROJECTS;
}

export function calculateProjectCost(state: CalculatorState): CostBreakdown | null {
  if (!state.projectType) return null;

  const lines: PriceLine[] = [
    {
      id: "website",
      label: WEBSITE_LABELS[state.projectType],
      amount: WEBSITE_BASE_PRICES[state.projectType],
    },
  ];

  for (const featureId of state.features) {
    const feature = FEATURE_OPTIONS.find((f) => f.id === featureId);
    if (feature) {
      lines.push({ id: feature.id, label: feature.label, amount: feature.price });
    }
  }

  if (state.hostingChoice === "setup-for-me") {
    lines.push({ id: "domain", label: "Domain", amount: DOMAIN_PRICE, recurring: true });
    lines.push({ id: "hosting", label: "Hosting", amount: HOSTING_ANNUAL, recurring: true });
  }

  const firstYearTotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const annualRenewal =
    state.hostingChoice === "setup-for-me" ? DOMAIN_PRICE + HOSTING_ANNUAL : 0;

  return {
    lines,
    firstYearTotal,
    annualRenewal,
    projectLabel: WEBSITE_LABELS[state.projectType],
    hostingLabel: !state.hostingChoice
      ? "Select domain & hosting option"
      : state.hostingChoice === "setup-for-me"
        ? "Domain + hosting included"
        : "Domain & hosting on your side",
  };
}

export function isCalculatorComplete(state: CalculatorState): boolean {
  return Boolean(state.customerType && state.projectType && state.hostingChoice);
}

export function buildCalculatorContactUrl(state: CalculatorState, breakdown: CostBreakdown): string {
  const budget =
    breakdown.firstYearTotal <= 15000
      ? "Under ₹15,000"
      : breakdown.firstYearTotal <= 30000
        ? "₹15,000–₹30,000"
        : breakdown.firstYearTotal <= 60000
          ? "₹30,000–₹60,000"
          : "₹60,000+";

  const featureList = state.features.length ? state.features.join(", ") : "none";
  const message = [
    `Cost calculator estimate: ${formatInr(breakdown.firstYearTotal)} (first year)`,
    `Customer: ${state.customerType}`,
    `Project: ${breakdown.projectLabel}`,
    `Features: ${featureList}`,
    `Hosting: ${state.hostingChoice}`,
    `Annual renewal: ${formatInr(breakdown.annualRenewal)}`,
  ].join(" | ");

  const params = new URLSearchParams({
    service: breakdown.projectLabel,
    intent: "quote",
    source: "project-cost-calculator",
    budget,
    message,
  });

  return `/contact?${params.toString()}`;
}

export const STEPS = ["Customer", "Project", "Features", "Hosting"] as const;
