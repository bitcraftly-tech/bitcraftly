"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import BitcraftlyLogoMark from "@/components/brand/BitcraftlyLogoMark";
import { CONTAINER, FOUNDER_LINKEDIN_URL, PRIMARY_LOCATION, whatsappUrl, WHATSAPP_HOURS } from "@/lib/constants";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";
import { BRAND } from "@/lib/siteContent";

function NavArrowBullet() {
  return (
    <span
      className="relative top-[calc(0.5lh)] inline-flex size-[11px] shrink-0 -translate-y-1/2 text-[#2B5CE6] dark:text-[#7ea0ff]"
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="footer-nav-arrow h-[11px] w-[11px] transition-transform duration-300 ease-out group-hover/navitem:translate-x-0.5"
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </span>
  );
}

export default function Footer() {
  const router = useRouter();

  const goToSection = (targetId: string) => {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("landingTargetSection", targetId);
    }
    router.push("/");
  };

  return (
    <footer className="border-t border-border-primary bg-bg-card py-6 dark:border-dark-border-primary dark:bg-dark-bg-card md:py-8">
      <div className={CONTAINER}>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8 md:items-start lg:gap-12">
          <div className="max-w-sm md:max-w-none">
            <div className="flex items-start gap-3">
              <BitcraftlyLogoMark size="xs" />
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="font-[var(--font-playfair)] text-lg font-semibold text-text-primary dark:text-dark-text-primary">Bitcraftly</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              {BRAND.positioning} Founder-led delivery, clear scope, and long-term support.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span
                className="inline-flex h-9 w-9 cursor-default items-center justify-center rounded-full border border-red-500/20 bg-red-500/[0.08] text-red-600 opacity-60 transition-opacity duration-200 hover:opacity-90 dark:border-red-400/25 dark:bg-red-500/10 dark:text-red-400"
                aria-label="YouTube — coming soon"
                title="Coming soon"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                  <path d="M21.8 8s-.2-1.5-.8-2.2c-.8-.9-1.7-.9-2.1-1C16 4.6 12 4.6 12 4.6h0s-4 0-6.9.2c-.4.1-1.3.1-2.1 1C2.4 6.5 2.2 8 2.2 8S2 9.8 2 11.6v1.7C2 15.1 2.2 17 2.2 17s.2 1.5.8 2.2c.8.9 1.9.9 2.4 1 1.7.2 6.6.2 6.6.2s4 0 6.9-.2c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.2.8-2.2s.2-1.8.2-3.6v-1.7C22 9.8 21.8 8 21.8 8zM9.8 15.3V8.9l6.1 3.2-6.1 3.2z" />
                </svg>
              </span>
              <span
                className="inline-flex h-9 w-9 cursor-default items-center justify-center rounded-full border border-pink-500/20 bg-gradient-to-br from-orange-400/[0.1] via-pink-500/[0.1] to-fuchsia-600/[0.1] text-pink-600 opacity-60 transition-opacity duration-200 hover:opacity-90 dark:border-pink-400/25 dark:text-pink-400"
                aria-label="Instagram — coming soon"
                title="Coming soon"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                  <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.5.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .5 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.5 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.5-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.5-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.5-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.8.5-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.5 1.2-.1 1.6-.1 4.8-.1zm0 1.7c-3.2 0-3.5 0-4.7.1-1.1.1-1.7.2-2 .4-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.2.3-.3.9-.4 2-.1 1.2-.1 1.5-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2 .2.5.4.8.7 1.1.3.3.6.5 1.1.7.3.2.9.3 2 .4 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2-.4.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.2-.3.3-.9.4-2 .1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.3-.2-.9-.3-2-.4-1.2-.1-1.5-.1-4.7-.1zm0 2.9A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8zm0 8.7a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 12 15.5zm6.6-9.1a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2z" />
                </svg>
              </span>
              <span
                className="inline-flex h-9 w-9 cursor-default items-center justify-center rounded-full border border-[#1877F2]/25 bg-[#1877F2]/10 text-[#1877F2] opacity-60 transition-opacity duration-200 hover:opacity-90 dark:bg-[#1877F2]/12 dark:text-[#6eb3ff]"
                aria-label="Facebook — coming soon"
                title="Coming soon"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                  <path d="M13.5 21v-7h2.3l.3-2.7h-2.6V9.6c0-.8.2-1.3 1.4-1.3h1.5V5.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v1.7H8.7V14h2.1v7h2.7z" />
                </svg>
              </span>
              {FOUNDER_LINKEDIN_URL ? (
                <a
                  href={FOUNDER_LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#0A66C2]/25 bg-[#0A66C2]/10 text-[#0A66C2] transition-opacity duration-200 hover:opacity-90 dark:bg-[#0A66C2]/12 dark:text-sky-400"
                  aria-label="LinkedIn — Sanjay Kr. Singh"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-primary dark:text-dark-text-primary">Services</p>
            <ul className="mt-4 space-y-2.5 text-sm text-text-secondary dark:text-dark-text-secondary">
              <li className="group/navitem flex items-start gap-2">
                <NavArrowBullet />
                <button
                  type="button"
                  onClick={() => goToSection("websites")}
                  className="cursor-pointer text-left hover:text-text-primary dark:hover:text-dark-text-primary"
                >
                  Business Website Development
                </button>
              </li>
              <li className="group/navitem flex items-start gap-2">
                <NavArrowBullet />
                <button
                  type="button"
                  onClick={() => goToSection("services")}
                  className="cursor-pointer text-left hover:text-text-primary dark:hover:text-dark-text-primary"
                >
                  Ecommerce Website Development
                </button>
              </li>
              <li className="group/navitem flex items-start gap-2">
                <NavArrowBullet />
                <button
                  type="button"
                  onClick={() => goToSection("mobile-apps")}
                  className="cursor-pointer text-left hover:text-text-primary dark:hover:text-dark-text-primary"
                >
                  Mobile App Development
                </button>
              </li>
              <li className="group/navitem flex items-start gap-2">
                <NavArrowBullet />
                <button
                  type="button"
                  onClick={() => goToSection("services")}
                  className="cursor-pointer text-left hover:text-text-primary dark:hover:text-dark-text-primary"
                >
                  AI integrations
                </button>
              </li>
              <li className="group/navitem flex items-start gap-2">
                <NavArrowBullet />
                <button
                  type="button"
                  onClick={() => goToSection("fast-packages")}
                  className="cursor-pointer text-left hover:text-text-primary dark:hover:text-dark-text-primary"
                >
                  Website Maintenance
                </button>
              </li>
              <li className="group/navitem flex items-start gap-2">
                <NavArrowBullet />
                <button
                  type="button"
                  onClick={() => goToSection("services")}
                  className="cursor-pointer text-left hover:text-text-primary dark:hover:text-dark-text-primary"
                >
                  SEO Services
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-primary dark:text-dark-text-primary">Company</p>
            <ul className="mt-4 space-y-2.5 text-sm text-text-secondary dark:text-dark-text-secondary">
              <li className="group/navitem flex items-start gap-2">
                <NavArrowBullet />
                <button
                  type="button"
                  onClick={() => goToSection("about")}
                  className="cursor-pointer text-left hover:text-text-primary dark:hover:text-dark-text-primary"
                >
                  About Us
                </button>
              </li>
              <li className="group/navitem flex items-start gap-2">
                <NavArrowBullet />
                <Link href="/team" className="text-left hover:text-text-primary dark:hover:text-dark-text-primary">
                  Team
                </Link>
              </li>
              <li className="group/navitem flex items-start gap-2">
                <NavArrowBullet />
                <Link href="/careers" className="text-left hover:text-text-primary dark:hover:text-dark-text-primary">
                  Careers
                </Link>
              </li>
              <li className="group/navitem flex items-start gap-2">
                <NavArrowBullet />
                <Link href="/portfolio" className="text-left hover:text-text-primary dark:hover:text-dark-text-primary">
                  Portfolio
                </Link>
              </li>
              <li className="group/navitem flex items-start gap-2">
                <NavArrowBullet />
                <Link href="/contact" className="text-left hover:text-text-primary dark:hover:text-dark-text-primary">
                  Contact
                </Link>
              </li>
              <li className="group/navitem flex items-start gap-2">
                <NavArrowBullet />
                <Link href="/privacy" className="text-left hover:text-text-primary dark:hover:text-dark-text-primary">
                  Privacy
                </Link>
              </li>
              <li className="group/navitem flex items-start gap-2">
                <NavArrowBullet />
                <Link href="/terms" className="text-left hover:text-text-primary dark:hover:text-dark-text-primary">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-primary dark:text-dark-text-primary">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-text-secondary dark:text-dark-text-secondary">
              <li>
                <a href="tel:+919667710954" className="hover:text-text-primary dark:hover:text-dark-text-primary">
                  +91 96677 10954
                </a>
              </li>
              <li>
                <a href="mailto:hello@bitcraftly.com" className="hover:text-text-primary dark:hover:text-dark-text-primary">
                  hello@bitcraftly.com
                </a>
              </li>
              <li>{PRIMARY_LOCATION}</li>
              <li className="pt-1">
                <Link
                  href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex font-semibold text-indigo-500 hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Chat on WhatsApp →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border-primary pt-8 dark:border-dark-border-primary">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-border-primary bg-bg-secondary/35 px-5 py-5 text-center dark:border-dark-border-primary dark:bg-dark-bg-secondary/25 sm:flex-row sm:justify-center sm:gap-8 sm:px-8 sm:py-5">
            <h3 className="max-w-md font-[var(--font-playfair)] text-lg font-semibold leading-snug text-text-primary dark:text-dark-text-primary sm:text-xl">
              {BRAND.ctaHeadline}
            </h3>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-2.5">
              <Link
                href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-border-secondary px-5 py-2.5 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary dark:hover:border-dark-border-primary"
              >
                WhatsApp Us
              </Link>
              <Link
                href="/contact?intent=quote&source=footer-cta"
                className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border-primary pt-6 text-center dark:border-dark-border-primary">
          <p className="text-xs font-medium leading-relaxed tracking-[0.06em] text-text-secondary dark:text-dark-text-secondary sm:text-[13px]">
            18+ Years Experience · React &amp; Next.js · Founder-Led · Ghaziabad, India
          </p>
          <p className="mt-2 text-[11px] leading-relaxed tracking-[0.04em] text-text-tertiary dark:text-dark-text-tertiary sm:text-xs">
            WhatsApp support · {WHATSAPP_HOURS}
          </p>
        </div>

        <div className="mt-8 border-t border-border-primary pt-6 text-center dark:border-dark-border-primary">
          <p className="text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
            Built with modern web technologies · <span className="whitespace-nowrap">Bitcraftly © 2026</span>
          </p>
          <p className="mt-2 text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary sm:text-sm">
            AI-Powered React &amp; Next.js Frontend Solutions · {BRAND.locationShort}
          </p>
        </div>
      </div>
    </footer>
  );
}
