"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import "@/app/dayal-builders/dayal.css";

/** Light-only luxury showcase — no Bitcraftly dark theme */
export default function DayalShowcaseLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div className="dayal-site flex min-h-screen flex-col scroll-smooth pb-20 lg:pb-0">
      {children}
    </div>
  );
}
