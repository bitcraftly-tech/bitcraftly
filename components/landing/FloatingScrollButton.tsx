"use client";

import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { hasMobileStickyCta } from "@/lib/mobileStickyCta";

const SCROLL_THRESHOLD_PX = 280;

export default function FloatingScrollButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const mobileBottomClass = hasMobileStickyCta(pathname)
    ? "max-md:bottom-[calc(5rem+env(safe-area-inset-bottom,0px))]"
    : "max-md:bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))]";

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      }}
      className={`fixed bottom-20 right-5 z-40 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-bg-card shadow-[0_4px_18px_-6px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 hover:border-border-secondary hover:bg-bg-secondary hover:shadow-[0_6px_22px_-6px_rgba(0,0,0,0.22)] active:scale-95 dark:border-dark-border-primary dark:bg-dark-bg-card dark:shadow-[0_4px_18px_-6px_rgba(0,0,0,0.45)] dark:hover:border-dark-border-secondary dark:hover:bg-dark-bg-secondary ${mobileBottomClass} ${
        visible
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-2 scale-95 opacity-0"
      }`}
    >
      <ArrowUp size={18} strokeWidth={2} className="text-text-secondary dark:text-dark-text-secondary" />
    </button>
  );
}
