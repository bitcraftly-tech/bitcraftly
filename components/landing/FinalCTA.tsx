import Link from "next/link";
import { CONTAINER } from "@/lib/constants";

export default function FinalCTA() {
  return (
    <section id="contact-cta" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-10 dark:border-dark-border-primary md:py-14`}>
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border-primary bg-bg-card px-6 py-10 text-center dark:border-dark-border-primary dark:bg-dark-bg-card sm:px-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
        <div className="relative">
          <h2 className="font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary sm:text-3xl md:text-4xl">
            Need help choosing the right website package?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
            Talk directly on WhatsApp for quick questions — or book a free consultation so we can match scope to your business.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="https://wa.me/919667710954"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Message on WhatsApp
            </Link>
            <Link
              href="/contact?intent=consultation&source=bottom-cta"
              className="rounded-xl border border-border-secondary px-6 py-3 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary dark:hover:border-dark-border-primary"
            >
              Free consultation
            </Link>
          </div>
          <p className="mt-6 text-xs text-text-tertiary dark:text-dark-text-tertiary">
            Prefer a call?{" "}
            <a href="tel:+919667710954" className="font-semibold text-indigo-500 hover:text-indigo-400 dark:text-indigo-400">
              +91 96677 10954
            </a>
            {" · "}
            <Link href="/contact" className="font-semibold text-indigo-500 hover:text-indigo-400 dark:text-indigo-400">
              Contact form
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
