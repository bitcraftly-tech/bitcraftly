"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import DayalLogo from "@/components/dayal/DayalLogo";
import { NAV_LINKS } from "@/lib/dayal/data";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

export default function DayalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = (href: string, mobile = false) => {
    const isActive = active === href;
    if (mobile) {
      return `dayal-serif block rounded-lg px-3 py-3 text-base transition ${
        isActive ? "font-semibold text-[#c0392b]" : "font-medium text-[#0b1633] hover:bg-[#c8a46b]/10"
      }`;
    }
    return `dayal-serif rounded-md px-2.5 py-2 text-[15px] tracking-wide transition xl:px-3 ${
      isActive
        ? "font-semibold text-[#c0392b]"
        : "font-medium text-[#282626] hover:text-[#c0392b]"
    }`;
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-[#0b1633]/12 bg-[#fffdf9]/95 shadow-sm backdrop-blur-xl"
            : "border-[#0b1633]/6 bg-[#fffdf9]/80 backdrop-blur-sm"
        }`}
      >
        <div className="dayal-container flex items-center justify-between gap-3 py-3">
          <DayalLogo priority className="min-w-0" />

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a href="#contact" className="dayal-btn-primary hidden text-sm sm:inline-flex">
              <Calendar className="h-4 w-4" aria-hidden />
              Let&apos;s Connect
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#0b1633]/15 text-[#0b1633] lg:hidden"
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
              className="absolute inset-0 bg-[#0b1633]/40 backdrop-blur-sm"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-[#fffdf9] p-6 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              aria-label="Mobile"
            >
              <div className="mb-8 flex items-center justify-between">
                <DayalLogo className="min-w-0" />
                <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={linkClass(link.href, true)}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="dayal-btn-primary mt-8 w-full"
                onClick={() => setOpen(false)}
              >
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
