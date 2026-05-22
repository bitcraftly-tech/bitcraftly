"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Light-only Dayal shell — strips dark theme on mount */
export default function DayalSiteRoot({ children, className = "" }: Props) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div
      className={`dayal-site flex min-h-screen flex-col scroll-smooth pb-20 lg:pb-0 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
