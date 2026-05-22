"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

import { PS_BTN_GHOST, PS_BTN_PRIMARY, PS_EYEBROW, PS_HEADING } from "@/lib/ats/careersShowcaseTheme";
import { CONTAINER } from "@/lib/constants";

export default function CareersCtaSection() {
  return (
    <section className="border-t border-[#e8ecef] bg-[#fafbfc] py-12 md:py-16">
      <div className={CONTAINER}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-[24px] border border-[#e8ecef] bg-white px-6 py-10 text-center shadow-[0_4px_32px_rgba(44,62,80,0.06)] sm:px-10 sm:py-12 md:px-14"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-100"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 0% 0%, rgba(155, 89, 182, 0.08), transparent 55%), radial-gradient(ellipse 60% 70% at 100% 100%, rgba(52, 152, 219, 0.06), transparent 50%)",
            }}
          />
          <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-[#9b59b6]/[0.07] blur-2xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-10 -left-6 size-40 rounded-full bg-[#3498db]/[0.06] blur-2xl" aria-hidden />

          <div className="relative">
            <p className={PS_EYEBROW}>Join the team</p>
            <h2 className={`${PS_HEADING} mt-3 text-3xl md:text-4xl`}>Ready to build with us?</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#7f8c8d]">
              Apply in under five minutes — resume, links, and role fit. Founder reviews every profile personally.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/careers/apply" className={PS_BTN_PRIMARY}>
                Apply now
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/contact" className={`${PS_BTN_GHOST} gap-2`}>
                <MessageCircle className="size-4" aria-hidden />
                Ask a question
              </Link>
            </div>

            <p className="mt-6 text-xs text-[#95a5a6]">
              Prefer email?{" "}
              <a
                href="mailto:hello@bitcraftly.com?subject=Careers%20at%20Bitcraftly"
                className="font-semibold text-[#8e44ad] transition hover:text-[#9b59b6] hover:underline"
              >
                hello@bitcraftly.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
