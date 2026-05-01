"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function FloatingThemeTumbler() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed bottom-5 right-5 z-40 rounded-full border border-border-primary bg-bg-card/95 px-3 py-2 shadow-lg backdrop-blur dark:border-dark-border-primary dark:bg-dark-bg-card/95">
      <button
        type="button"
        aria-label="Toggle theme tumbler"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="group flex cursor-pointer items-center gap-2"
      >
        <span className="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary">Theme</span>
        <span className="relative inline-flex h-7 w-14 items-center rounded-full bg-bg-secondary transition dark:bg-dark-bg-secondary">
          <Sun size={13} className="absolute left-2 text-amber-500/80" />
          <Moon size={13} className="absolute right-2 text-indigo-400/80" />
          <span
            className={`absolute z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transition-transform dark:bg-dark-bg-card ${
              isDark ? "translate-x-7" : "translate-x-0.5"
            }`}
          >
            {isDark ? (
              <Moon size={13} className="text-indigo-500" />
            ) : (
              <Sun size={13} className="text-amber-500" />
            )}
          </span>
        </span>
      </button>
    </div>
  );
}
