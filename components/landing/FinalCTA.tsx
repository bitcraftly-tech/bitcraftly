"use client";

import { CONTAINER } from "@/lib/constants";

export default function FinalCTA() {
  const scrollToSection = (targetId: string) => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-text-primary py-14 dark:bg-dark-bg-secondary">
      <div className={`${CONTAINER} text-center`}>
        <h2 className="font-[var(--font-playfair)] text-3xl text-white sm:text-4xl">Aapki business, digital ho jaaye</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/75 sm:text-base">
          Bitcraftly ke saath fast setup, clear pricing aur strong support ke through online growth predictable banayein.
        </p>

        <button
          type="button"
          onClick={() => scrollToSection("pricing")}
          className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-text-primary transition hover:bg-white/90 dark:bg-dark-bg-card dark:text-dark-text-primary dark:hover:bg-dark-bg-primary"
        >
          Start Free Trial Today
        </button>

        <div className="mt-5">
          <a
            href="https://wa.me/919667710954"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/85 underline-offset-4 transition hover:underline dark:text-dark-text-secondary"
          >
            WhatsApp pe baat karein →
          </a>
        </div>
      </div>
    </section>
  );
}
