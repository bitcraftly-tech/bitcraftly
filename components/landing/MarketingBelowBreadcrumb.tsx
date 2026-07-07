import type { ReactNode } from "react";

import { MARKETING_BELOW_BREADCRUMB_PT } from "@/lib/constants";

type MarketingBelowBreadcrumbProps = {
  children: ReactNode;
};

/** Consistent content offset below the marketing breadcrumb bar (portfolio reference). */
export default function MarketingBelowBreadcrumb({ children }: MarketingBelowBreadcrumbProps) {
  return <div className={MARKETING_BELOW_BREADCRUMB_PT}>{children}</div>;
}
