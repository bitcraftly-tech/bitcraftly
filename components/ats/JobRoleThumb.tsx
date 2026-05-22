import { Code2, Palette, Sparkles } from "lucide-react";

import type { JobDepartment } from "@/lib/ats/jobs";
import { PS_THUMB } from "@/lib/portfolioShowcaseTheme";

const DEPT_STYLES: Record<
  JobDepartment,
  { gradient: string; Icon: typeof Code2 }
> = {
  engineering: {
    gradient: "from-[#d6eaf8] via-[#aed6f1] to-[#85c1e9]",
    Icon: Code2,
  },
  design: {
    gradient: "from-[#fdebd0] via-[#f5b7b1] to-[#f1948a]",
    Icon: Palette,
  },
  product: {
    gradient: "from-[#e8daef] via-[#d7bde2] to-[#bb8fce]",
    Icon: Sparkles,
  },
};

export default function JobRoleThumb({ department }: { department: JobDepartment }) {
  const { gradient, Icon } = DEPT_STYLES[department];
  return (
    <div
      className={`${PS_THUMB} flex size-[88px] shrink-0 items-center justify-center sm:size-[96px] bg-gradient-to-br ${gradient}`}
      aria-hidden
    >
      <Icon className="size-9 text-[#8e44ad]/80 sm:size-10" strokeWidth={1.5} />
    </div>
  );
}
