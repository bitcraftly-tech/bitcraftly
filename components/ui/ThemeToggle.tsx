"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { FOCUS_RING } from "@/lib/constants";

type ThemeToggleProps = {
  /** Desktop header — match adjacent 36×36 action buttons (e.g. Chat). */
  compact?: boolean;
};

const COMPACT_BTN =
  "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#374151] transition hover:border-[#D1D5DB] hover:bg-[#F9FAFB] active:scale-[0.97] dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary";

const DEFAULT_BTN =
  "flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-border-primary bg-bg-card transition-colors hover:bg-bg-secondary active:scale-[0.97] dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:bg-dark-bg-secondary";

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const placeholderClass = compact
    ? "size-9 shrink-0 rounded-lg border border-[#E5E7EB] dark:border-dark-border-primary"
    : "h-11 w-11 rounded-lg border border-border-primary dark:border-dark-border-primary";

  if (!mounted) {
    return <div className={placeholderClass} />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={`${compact ? COMPACT_BTN : DEFAULT_BTN} ${FOCUS_RING}`}
      aria-label="Toggle theme"
      type="button"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-[17px] shrink-0 text-text-secondary dark:text-dark-text-secondary" />
      ) : (
        <Moon className="size-[17px] shrink-0 text-text-secondary dark:text-dark-text-secondary" />
      )}
    </button>
  );
}
