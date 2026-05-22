"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { FacebookIcon, InstagramIcon } from "@/components/dayal/DayalSocialIcons";
import { DAYAL } from "@/lib/dayal/data";

const SOCIAL = [
  {
    name: "Facebook",
    href: DAYAL.facebook,
    Icon: FacebookIcon,
    accent: "from-[#1877F2]/25 to-transparent",
    hoverGlow: "group-hover:shadow-[0_0_28px_rgba(24,119,242,0.35)]",
  },
  {
    name: "Instagram",
    href: DAYAL.instagram,
    Icon: InstagramIcon,
    accent: "from-[#E4405F]/25 via-[color:var(--dayal-gold)]/20 to-transparent",
    hoverGlow: "group-hover:shadow-[0_0_28px_rgba(228,64,95,0.3)]",
  },
] as const;

export default function DayalFollowUs() {
  return (
    <div>
      <p className="dayal-eyebrow !text-[var(--dayal-gold-light)] before:bg-[var(--dayal-gold)]">
        Follow Us
      </p>
      <p className="mt-4 text-sm text-white/55">
        Join our community for project updates &amp; virtual tours.
      </p>

      <div
        className="mt-6 overflow-hidden rounded-2xl p-1"
        style={{
          border: "1px solid rgba(201, 169, 98, 0.3)",
          background: "linear-gradient(145deg, rgba(255,255,255,0.08), transparent)",
        }}
      >
        <div className="grid grid-cols-2 gap-1">
          {SOCIAL.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col items-center overflow-hidden rounded-xl px-4 py-6 text-center transition-colors ${item.hoverGlow}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -3 }}
            >
              <span
                className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${item.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <span
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl border shadow-inner transition duration-300 group-hover:scale-110"
                style={{
                  borderColor: "rgba(201, 169, 98, 0.35)",
                  background: "var(--dayal-navy-mid)",
                  color: "var(--dayal-gold)",
                }}
              >
                <item.Icon className="h-6 w-6" />
              </span>

              <span className="relative mt-4 text-sm font-semibold text-white/90 transition group-hover:text-[color:var(--dayal-gold)]">
                {item.name}
              </span>

              <span className="relative mt-1 inline-flex items-center gap-0.5 text-[10px] font-medium uppercase tracking-wider text-white/45">
                Visit
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        <span className="h-px w-8" style={{ background: "rgba(201, 169, 98, 0.4)" }} />
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Stay connected</span>
        <span className="h-px w-8" style={{ background: "rgba(201, 169, 98, 0.4)" }} />
      </div>
    </div>
  );
}
