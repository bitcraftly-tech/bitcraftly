"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useTheme } from "@/components/providers/ThemeProvider";

const THUMB_SPRING = { type: "spring" as const, stiffness: 520, damping: 32, mass: 0.6 };
const ICON_TRANSITION = { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const };

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
        className="group flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-border-primary/80 bg-bg-card/90 py-0 pl-2.5 pr-1 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.12)] backdrop-blur-md transition-[box-shadow,transform] duration-300 hover:shadow-[0_4px_20px_-6px_rgba(0,0,0,0.18)] active:scale-[0.98] dark:border-dark-border-primary/80 dark:bg-dark-bg-card/90 dark:shadow-[0_2px_16px_-4px_rgba(0,0,0,0.4)]"
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
          <motion.span
            className="flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] dark:bg-zinc-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
            initial={false}
            animate={{ x: isDark ? 20 : 0 }}
            transition={THUMB_SPRING}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "moon" : "sun"}
                initial={{ opacity: 0, scale: 0.5, rotate: isDark ? 12 : -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: isDark ? -12 : 12 }}
                transition={ICON_TRANSITION}
                className="flex items-center justify-center"
              >
                {isDark ? (
                  <Moon size={11} className="text-indigo-500" strokeWidth={2.5} aria-hidden />
                ) : (
                  <Sun size={11} className="text-amber-500" strokeWidth={2.5} aria-hidden />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </span>
      </button>
    </div>
  );
}
