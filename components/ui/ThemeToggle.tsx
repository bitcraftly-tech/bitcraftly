"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-lg border border-border-primary dark:border-dark-border-primary" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border-primary bg-bg-card transition-colors hover:bg-bg-secondary dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:bg-dark-bg-secondary"
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
