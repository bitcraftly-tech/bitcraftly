"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingScrollButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 right-5 z-40 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-bg-card/95 shadow-lg backdrop-blur transition hover:bg-bg-secondary max-md:bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] dark:border-dark-border-primary dark:bg-dark-bg-card/95 dark:hover:bg-dark-bg-secondary"
    >
      <ArrowUp size={18} className="text-text-secondary dark:text-dark-text-secondary" />
    </button>
  );
}
