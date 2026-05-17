"use client";

import { ArrowUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { useSchoolDemo } from "./SchoolDemoContext";

export function SchoolFloatingActions() {
  const { openWhatsApp, scrollToTop } = useSchoolDemo();
  const [mounted, setMounted] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 right-4 z-[60] flex flex-col gap-2 sm:right-6">
      <button
        type="button"
        onClick={openWhatsApp}
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" aria-hidden />
      </button>
      {showTop ? (
        <button
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border school-border bg-white text-[var(--school-navy)] shadow-lg transition hover:bg-[var(--school-surface)]"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
