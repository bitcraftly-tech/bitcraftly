import type { ReactNode } from "react";

import DayalSiteRoot from "@/components/dayal/DayalSiteRoot";
import { dayalCaudex } from "@/lib/dayal/fonts";

import "./dayal.css";

export default function DayalBuildersLayout({ children }: { children: ReactNode }) {
  return <DayalSiteRoot className={dayalCaudex.variable}>{children}</DayalSiteRoot>;
}
