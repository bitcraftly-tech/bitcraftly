"use client";

import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useTheme } from "@/components/providers/ThemeProvider";

export default function FloatingThemeTumbler() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (pathname?.startsWith("/portfolio")) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="group flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-border-primary/80 bg-bg-card py-0 pl-2.5 pr-1 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.12)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_4px_20px_-6px_rgba(0,0,0,0.18)] active:scale-[0.98] dark:border-dark-border-primary/80 dark:bg-dark-bg-card dark:shadow-[0_2px_16px_-4px_rgba(0,0,0,0.4)] sm:bg-bg-card/90 sm:backdrop-blur-md sm:dark:bg-dark-bg-card/90"
      >
        <span className="text-[10px] font-medium leading-none tracking-wide text-text-secondary dark:text-dark-text-secondary">
          Theme
        </span>

        <span
          className={`relative flex h-5 w-10 shrink-0 items-center rounded-full p-[2px] transition-colors duration-300 ease-out ${
            isDark
              ? "bg-gradient-to-r from-zinc-700 to-zinc-600"
              : "bg-gradient-to-r from-zinc-200 to-zinc-300"
          }`}
        >
          <span
            className="flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out dark:bg-zinc-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
            style={{ transform: isDark ? "translateX(20px)" : "translateX(0)" }}
          >
            {isDark ? (
              <Moon size={11} className="text-indigo-500" strokeWidth={2.5} aria-hidden />
            ) : (
              <Sun size={11} className="text-amber-500" strokeWidth={2.5} aria-hidden />
            )}
          </span>
        </span>
      </button>
    </div>
  );
}
