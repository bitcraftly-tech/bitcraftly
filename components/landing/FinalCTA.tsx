import Link from "next/link";
import { CONTAINER } from "@/lib/constants";

export default function FinalCTA() {
  return (
    <section id="contact-cta" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-10 dark:border-dark-border-primary md:py-14`}>
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border-primary bg-bg-card px-6 py-10 text-center dark:border-dark-border-primary dark:bg-dark-bg-card sm:px-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
        <div className="relative">
          <h2 className="font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Ready to Grow Your Business Online?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
            Let&apos;s build a modern digital presence for your business. Tell us what you sell, who you serve, and we&apos;ll
            suggest the fastest path to launch.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+919667710954"
              className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Call Now
            </a>
            <Link
              href="https://wa.me/919667710954"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-border-secondary px-6 py-3 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary dark:hover:border-dark-border-primary"
            >
              WhatsApp Us
            </Link>
          </div>
          <p className="mt-6 text-xs text-text-tertiary dark:text-dark-text-tertiary">
            Prefer email?{" "}
            <Link href="/contact" className="font-semibold text-indigo-500 hover:text-indigo-400 dark:text-indigo-400">
              Open contact form
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
