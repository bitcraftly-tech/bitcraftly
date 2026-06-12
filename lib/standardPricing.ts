export type StandardPricingPlan = {
  service: string;
  icon: string;
  accentClass: string;
  buttonClass: string;
  price: string;
  period: string;
  subtleLine?: string;
  isMonthly?: boolean;
  whatsIncluded: string[];
  cta: string;
  highlight?: boolean;
  compareGroup: "standard";
  bestFor: string;
  timeline: string;
};

export const STANDARD_PRICING_PLANS: StandardPricingPlan[] = [
  {
    service: "Starter Business Website",
    icon: "🌐",
    accentClass: "text-indigo-500",
    buttonClass: "bg-indigo-600 text-white hover:bg-indigo-700",
    price: "₹7,999",
    period: "one-time · scope confirmed in writing",
    subtleLine: "Best for new local businesses",
    bestFor: "New local shops & solo brands",
    timeline: "1–2 weeks",
    whatsIncluded: ["Responsive website", "WhatsApp integration", "Basic SEO setup", "Contact form", "Mobile optimized"],
    cta: "Get Quote",
    compareGroup: "standard",
  },
  {
    service: "Professional Business Website",
    icon: "⭐",
    accentClass: "text-violet-500",
    buttonClass: "bg-violet-600 text-white hover:bg-violet-700",
    price: "₹14,999",
    period: "one-time · scope confirmed in writing",
    subtleLine: "Most chosen for growing brands",
    bestFor: "Growing businesses",
    timeline: "1–2 weeks",
    highlight: true,
    whatsIncluded: [
      "Premium responsive design",
      "Multi-page website",
      "SEO optimization",
      "Speed optimization",
      "WhatsApp & social integration",
      "Admin panel / basic CMS",
    ],
    cta: "Get Quote",
    compareGroup: "standard",
  },
  {
    service: "Premium React/Next.js Website",
    icon: "⚛️",
    accentClass: "text-purple-500",
    buttonClass: "bg-purple-600 text-white hover:bg-purple-700",
    price: "₹29,999+",
    period: "custom quote after discovery",
    subtleLine: "Startups & scalable products",
    bestFor: "Startups & SaaS",
    timeline: "2–4 weeks",
    whatsIncluded: [
      "React.js or Next.js development",
      "Modern UI/UX",
      "Performance optimization",
      "API integration",
      "Scalable architecture",
      "AI-ready setup",
    ],
    cta: "Book Discovery",
    compareGroup: "standard",
  },
  {
    service: "Website Redesign Service",
    icon: "🎨",
    accentClass: "text-rose-500",
    buttonClass: "bg-rose-600 text-white hover:bg-rose-700",
    price: "₹12,999+",
    period: "depends on current site size",
    bestFor: "Outdated sites",
    timeline: "1–2 weeks",
    whatsIncluded: ["Modern redesign", "Mobile optimization", "Speed improvement", "UI enhancement", "SEO improvements"],
    cta: "Get Quote",
    compareGroup: "standard",
  },
  {
    service: "AI-Powered Website Solutions",
    icon: "✨",
    accentClass: "text-indigo-600 dark:text-indigo-400",
    buttonClass: "bg-indigo-600 text-white hover:bg-indigo-700",
    price: "₹19,999+",
    period: "scoped after AI workflow review",
    bestFor: "AI chat & automation",
    timeline: "2–3 weeks",
    whatsIncluded: [
      "AI chatbot integration",
      "AI-assisted workflows",
      "Smart lead forms",
      "AI content assistance",
      "Automation-ready architecture",
    ],
    cta: "Discuss AI Scope",
    compareGroup: "standard",
  },
  {
    service: "Monthly Website Maintenance",
    icon: "🔧",
    accentClass: "text-teal-500",
    buttonClass: "bg-teal-600 text-white hover:bg-teal-700",
    price: "₹2,999",
    period: "per month · recurring support",
    isMonthly: true,
    bestFor: "Post-launch care",
    timeline: "Monthly",
    whatsIncluded: ["Website updates", "Bug fixing", "Technical support", "Performance monitoring", "Content updates"],
    cta: "Discuss Plan",
    compareGroup: "standard",
  },
];
