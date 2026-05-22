"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { DAYAL, NAV_LINKS } from "@/lib/dayal/data";

export default function DayalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`dayal-nav fixed inset-x-0 top-0 z-50 ${scrolled ? "dayal-nav-scrolled" : "bg-transparent"}`}
      >
        <div className="dayal-container flex items-center justify-between gap-4 py-4">
          <Link href="#home" className="group flex min-w-0 items-center gap-3">
            <span className="dayal-logo-mark shrink-0">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                <path d="M4 20V9l8-5 8 5v11h-5v-6H9v6H4z" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="dayal-serif block truncate text-sm font-bold tracking-wide sm:text-base">
                {DAYAL.brand.toUpperCase()}
              </span>
              <span className="block truncate text-[10px] dayal-text-muted sm:text-xs">{DAYAL.location}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="dayal-nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className="dayal-btn-primary hidden sm:inline-flex">
              <Calendar className="h-4 w-4" aria-hidden />
              Let&apos;s Connect
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[color:var(--dayal-border)] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-[color:var(--dayal-navy)]/50 backdrop-blur-md"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col border-l border-[color:rgba(201,169,98,0.2)] p-6 shadow-2xl"
              style={{ background: "var(--dayal-cream)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              aria-label="Mobile"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="dayal-serif text-lg font-semibold">{DAYAL.brand}</span>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="dayal-nav-link block py-3"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="dayal-btn-primary mt-8 w-full" onClick={() => setOpen(false)}>
                <Calendar className="h-4 w-4" />
                Let&apos;s Connect
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
