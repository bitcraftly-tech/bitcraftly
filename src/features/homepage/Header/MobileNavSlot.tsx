"use client";

import dynamic from "next/dynamic";
import { Icon } from "@/components/ui/icon";

const MobileNavigation = dynamic(
  () => import("./MobileNavigation").then((mod) => mod.MobileNavigation),
  {
    ssr: false,
    loading: () => (
      <button
        type="button"
        className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[12px] border border-[var(--border)] bg-background text-foreground xl:hidden"
        aria-label="Open navigation menu"
        disabled
      >
        <Icon name="menu" size="sm" aria-hidden />
      </button>
    ),
  },
);

/** Code-splits mobile drawer/accordion out of the critical header path. */
export function MobileNavSlot() {
  return <MobileNavigation />;
}
