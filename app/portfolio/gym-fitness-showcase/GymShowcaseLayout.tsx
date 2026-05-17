"use client";

import type { ReactNode } from "react";

import GymFooter from "@/components/portfolio/gym/GymFooter";
import GymNavbar from "@/components/portfolio/gym/GymNavbar";
import { ShowcaseScopedThemeProvider } from "@/components/providers/ShowcaseScopedThemeProvider";

import { GymDemoProvider } from "./GymDemoContext";
import { GymDemoOverlays } from "./GymDemoOverlays";

export default function GymShowcaseLayout({ children }: { children: ReactNode }) {
  return (
    <GymDemoProvider>
      <ShowcaseScopedThemeProvider showcaseId="gym" className="gym-showcase flex min-h-screen flex-col gym-bg-page">
        <div id="top" className="flex min-h-0 flex-1 flex-col">
          <GymNavbar />
          <main className="flex-1">{children}</main>
          <GymFooter />
          <GymDemoOverlays />
        </div>
      </ShowcaseScopedThemeProvider>
    </GymDemoProvider>
  );
}
