"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  CircleHelp,
  LayoutGrid,
  Mail,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";

import { CONTAINER, SECTION_PY, SECTION_SCROLL_MT } from "@/lib/constants";
import { useMobileStaticEntrance } from "@/hooks/useMobileStaticEntrance";
import { HOME_HUB_LINKS, type HomeHubLink } from "@/lib/marketingRoutes";

const STEP_ICONS: Record<string, LucideIcon> = {
  "/pricing": Calculator,
  "/services": Sparkles,
  "/portfolio": LayoutGrid,
  "/about": User,
  "/faq": CircleHelp,
  "/contact": Mail,
};

function HubLinkCard({ item, index }: { item: HomeHubLink; index: number }) {
  const reduceMotion = useReducedMotion();
  const staticEntrance = useMobileStaticEntrance();
  const skipEntrance = reduceMotion || staticEntrance;
  const Icon = STEP_ICONS[item.href] ?? Sparkles;
  const stepLabel = String(item.step ?? 0).padStart(2, "0");
  const ctaLabel = (item.cta ?? "Learn more").replace(/\s*[→↗]\s*$/, "");

  return (
    <motion.div
      initial={skipEntrance ? false : { opacity: 0, y: 14 }}
      {...(skipEntrance
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.1 } })}
      transition={{ duration: 0.35, delay: Math.min(index * 0.06, 0.28), ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        href={item.href}
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 sm:p-6 dark:bg-dark-bg-card ${
          item.featured
            ? "border-[#8e44ad]/25 shadow-[0_4px_20px_rgba(124,58,237,0.1)] hover:border-[#8e44ad]/35 hover:shadow-[0_16px_40px_rgba(124,58,237,0.14)] dark:border-indigo-400/30"
            : "border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-[#D1D5DB] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] dark:border-dark-border-primary dark:hover:border-indigo-500/30"
        }`}
      >
        {item.featured ? (
          <span
            className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-[#8e44ad]/[0.07] blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-indigo-500/10"
            aria-hidden
          />
        ) : null}

        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#7C3AED] via-[#8e44ad] to-[#7C3AED] transition-transform duration-300 group-hover:scale-x-100"
          aria-hidden
        />

        <span
          className="pointer-events-none absolute right-4 top-2 select-none font-[var(--font-playfair)] text-[3.25rem] font-bold leading-none tracking-tight text-[#111827]/[0.045] sm:text-[3.75rem] dark:text-white/[0.05]"
          aria-hidden
        >
          {stepLabel}
        </span>

        <div className="relative flex items-start justify-between gap-3">
          <div
            className={`flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-[1.04] ${
              item.featured
                ? "bg-gradient-to-br from-[#8e44ad]/15 to-[#7C3AED]/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-[#8e44ad]/20"
                : "bg-[#F9FAFB] ring-1 ring-[#E5E7EB] group-hover:ring-[#D1D5DB] dark:bg-dark-bg-secondary dark:ring-dark-border-primary"
            }`}
          >
            <Icon
              className={`size-5 ${item.featured ? "text-[#7C3AED]" : "text-[#374151] dark:text-dark-text-secondary"}`}
              strokeWidth={1.75}
              aria-hidden
            />
          </div>

          {item.step ? (
            <span
              className={`relative z-[1] shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                item.featured
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#8e44ad] text-white shadow-[0_2px_8px_rgba(124,58,237,0.3)]"
                  : "border border-[#E5E7EB] bg-white/80 text-[#6B7280] backdrop-blur-sm dark:border-dark-border-primary dark:bg-dark-bg-card/80 dark:text-dark-text-secondary"
              }`}
            >
              {item.featured ? "Start here" : `Step ${item.step}`}
            </span>
          ) : null}
        </div>

        <h3 className="relative mt-5 text-[17px] font-bold leading-snug tracking-tight text-[#111827] sm:text-lg dark:text-dark-text-primary">
          {item.title}
        </h3>

        <p className="relative mt-2 flex-1 text-sm leading-[1.65] text-[#6B7280] dark:text-dark-text-secondary">
          {item.description}
        </p>

        <div className="relative mt-5 border-t border-[#F3F4F6] pt-4 dark:border-dark-border-primary/80">
          <span
            className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-250 ${
              item.featured
                ? "bg-gradient-to-r from-[#7C3AED] to-[#8e44ad] text-white shadow-[0_2px_10px_rgba(124,58,237,0.28)] group-hover:-translate-y-px group-hover:shadow-[0_4px_16px_rgba(124,58,237,0.36)]"
                : "border border-[#E5E7EB] bg-[#FAFAFA] text-[#374151] group-hover:border-[#D1D5DB] group-hover:bg-white dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:group-hover:bg-dark-bg-card"
            }`}
          >
            {ctaLabel}
            {item.href === "/contact" || item.cta?.includes("↗") ? (
              <ArrowUpRight
                className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            ) : (
              <ArrowRight
                className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            )}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HomePageHub() {
  return (
    <section className={`${CONTAINER} ${SECTION_SCROLL_MT} ${SECTION_PY}`}>
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280] shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-secondary">
          <span className="size-1.5 rounded-full bg-[#8e44ad]" aria-hidden />
          Explore Bitcraftly
        </span>

        <h2 className="mt-4 font-[var(--font-playfair)] text-3xl font-semibold tracking-tight text-[#111827] dark:text-dark-text-primary sm:text-4xl">
          Find what you need in one click
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-[#6B7280] dark:text-dark-text-secondary sm:text-[15px]">
          Recommended path: pricing → services → portfolio → FAQ → contact. Numbers below show the easiest order for
          new website projects.
        </p>
      </div>

      <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {HOME_HUB_LINKS.map((item, index) => (
          <HubLinkCard key={item.href} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
