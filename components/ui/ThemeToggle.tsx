"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { FOCUS_RING } from "@/lib/constants";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-11 w-11 rounded-lg border border-border-primary dark:border-dark-border-primary" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-border-primary bg-bg-card transition-colors hover:bg-bg-secondary active:scale-[0.97] dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:bg-dark-bg-secondary ${FOCUS_RING}`}
      aria-label="Toggle theme"
      type="button"
    >
      {resolvedTheme === "dark" ? (
        <Sun size={18} className="text-text-secondary dark:text-dark-text-secondary" />
      ) : (
        <Moon size={18} className="text-text-secondary dark:text-dark-text-secondary" />
      )}
    </button>
  );
}
