import { StickyCategoryNav } from "@/components/patterns/sticky-category-nav";
import { SOLUTION_GROUPS } from "@/constants/solutions";

export function SolutionsCategoryNav() {
  return (
    <StickyCategoryNav
      groups={SOLUTION_GROUPS}
      ariaLabel="Solution categories"
    />
  );
}
