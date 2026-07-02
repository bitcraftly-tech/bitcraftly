"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const SCROLL_THRESHOLD_PX = 280;

export default function FloatingScrollButton() {
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

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      }}
      className={`bc-float-scroll inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-bg-card/95 shadow-card backdrop-blur-sm transition-[opacity,visibility,border-color,background-color,box-shadow] duration-250 ease-out hover:border-border-secondary hover:bg-bg-secondary hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary dark:border-dark-border-primary dark:bg-dark-bg-card/95 dark:hover:border-dark-border-secondary dark:hover:bg-dark-bg-secondary ${
        visible ? "bc-float-scroll--visible" : "bc-float-scroll--hidden"
      }`}
    >
      <ArrowUp size={18} strokeWidth={2} className="text-text-secondary dark:text-dark-text-secondary" />
    </button>
  );
}
