import type { PortfolioItem, PortfolioProjectBadge } from "@/lib/portfolioItems";
import type { PortfolioFocusType } from "@/lib/portfolioContent";

/** Live vs interactive demo badge */
export function projectBadgeClasses(badge: PortfolioProjectBadge): string {
  return badge === "Live client"
    ? "border-[#2ecc71]/40 bg-[#2ecc71]/12 text-[#27ae60] dark:border-[#27ae60]/45 dark:bg-[#27ae60]/15 dark:text-[#58d68d]"
    : "border-[#9b59b6]/35 bg-[#9b59b6]/10 text-[#8e44ad] dark:border-[#8e44ad]/40 dark:bg-[#8e44ad]/12 dark:text-[#c39bd3]";
}

/** Build type pill on cards */
export function projectFocusClasses(focus: PortfolioFocusType): string {
  switch (focus) {
    case "React.js":
      return "border-[#3498db]/35 bg-[#3498db]/10 text-[#2980b9] dark:text-[#85c1e9]";
    case "Next.js":
      return "border-[#2980b9]/40 bg-[#2980b9]/10 text-[#2980b9] dark:text-[#5dade2]";
    case "AI-powered":
      return "border-[#8e44ad]/40 bg-[#9b59b6]/10 text-[#8e44ad] dark:text-[#c39bd3]";
    case "Startup frontend":
      return "border-[#34495e]/40 bg-[#34495e]/8 text-[#34495e] dark:border-[#bdc3c7]/30 dark:bg-[#34495e]/25 dark:text-[#bdc3c7]";
    case "Dashboard / admin":
      return "border-[#16a085]/35 bg-[#1abc9c]/8 text-[#16a085] dark:text-[#48c9b0]";
    case "Business website":
    default:
      return "border-[#95a5a6]/45 bg-[#ecf0f1]/80 text-[#7f8c8d] dark:border-[#7f8c8d]/45 dark:bg-[#34495e]/30 dark:text-[#bdc3c7]";
  }
}

/** Tech stack chips — React, Next.js, AI, default */
export function techStackBadgeClasses(tech: string): string {
  const t = tech.toLowerCase();
  if (t.includes("next")) {
    return "border-[#2980b9]/40 bg-[#3498db]/10 text-[#2980b9] dark:border-[#2980b9]/45 dark:bg-[#2980b9]/15 dark:text-[#5dade2]";
  }
  if (t.includes("react")) {
    return "border-[#3498db]/35 bg-[#3498db]/8 text-[#2980b9] dark:border-[#3498db]/40 dark:bg-[#3498db]/12 dark:text-[#85c1e9]";
  }
  if (t.includes("ai") || t.includes("chat") || t.includes("automation")) {
    return "border-[#8e44ad]/38 bg-[#9b59b6]/10 text-[#8e44ad] dark:border-[#8e44ad]/42 dark:bg-[#8e44ad]/14 dark:text-[#d2b4de]";
  }
  if (t.includes("typescript") || t.includes("ts")) {
    return "border-[#2980b9]/45 bg-[#34495e]/10 text-[#34495e] dark:border-[#3498db]/35 dark:bg-[#34495e]/30 dark:text-[#bdc3c7]";
  }
  if (t.includes("tailwind")) {
    return "border-[#1abc9c]/35 bg-[#1abc9c]/10 text-[#16a085] dark:text-[#48c9b0]";
  }
  if (t.includes("node")) {
    return "border-[#27ae60]/35 bg-[#2ecc71]/8 text-[#27ae60] dark:text-[#58d68d]";
  }
  if (t.includes("redux")) {
    return "border-[#8e44ad]/35 bg-[#9b59b6]/10 text-[#8e44ad] dark:text-[#c39bd3]";
  }
  if (t.includes("scss") || t.includes("sass")) {
    return "border-[#e67e22]/35 bg-[#e67e22]/10 text-[#d35400] dark:text-[#f0b27a]";
  }
  if (t.includes("rest") || t.includes("api")) {
    return "border-[#3498db]/30 bg-[#3498db]/6 text-[#2980b9] dark:text-[#85c1e9]";
  }
  if (t.includes("seo") || t.includes("mobile") || t.includes("whatsapp") || t.includes("performance")) {
    return "border-[#1abc9c]/32 bg-[#1abc9c]/8 text-[#16a085] dark:border-[#16a085]/38 dark:bg-[#16a085]/12 dark:text-[#76d7c4]";
  }
  return "border-[#bdc3c7]/55 bg-[#ecf0f1]/60 text-[#7f8c8d] dark:border-[#34495e]/55 dark:bg-[#34495e]/25 dark:text-[#bdc3c7]";
}

/** Card mockup header wash — Flat UI tint over existing gradient */
export function cardPreviewAccent(item: PortfolioItem): string {
  const focus = item.projectFocus;
  if (focus === "AI-powered") return "from-[#9b59b6]/18 via-transparent to-[#8e44ad]/12";
  if (focus === "Next.js") return "from-[#3498db]/20 via-transparent to-[#2980b9]/14";
  if (focus === "React.js" || focus === "Startup frontend") return "from-[#3498db]/16 via-transparent to-[#34495e]/10";
  if (item.badge === "Live client") return "from-[#2ecc71]/14 via-transparent to-[#27ae60]/8";
  return "from-[#95a5a6]/12 via-transparent to-[#ecf0f1]/8 dark:from-[#34495e]/20 dark:to-transparent";
}

export const PORTFOLIO_CHECK_ICON = "text-[#27ae60] dark:text-[#58d68d]";
