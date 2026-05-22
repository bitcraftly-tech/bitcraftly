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
    accent: "from-[#1877F2]/20 to-transparent",
    hoverGlow: "group-hover:shadow-[0_0_28px_rgba(24,119,242,0.35)]",
  },
  {
    name: "Instagram",
    href: DAYAL.instagram,
    Icon: InstagramIcon,
    accent: "from-[#E4405F]/20 via-[#C8A46B]/15 to-transparent",
    hoverGlow: "group-hover:shadow-[0_0_28px_rgba(228,64,95,0.3)]",
  },
] as const;

export default function DayalFollowUs() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#c8a46b]">
        Follow Us
      </p>
      <p className="mt-2 text-sm text-white/55">
        Join our community for project updates &amp; virtual tours.
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-[#c8a46b]/25 bg-gradient-to-br from-white/[0.06] to-transparent p-1 backdrop-blur-sm">
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
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8a46b]/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c8a46b]/30 bg-[#0b1633] text-[#c8a46b] shadow-inner transition duration-300 group-hover:scale-110 group-hover:border-[#c8a46b] group-hover:bg-[#c8a46b] group-hover:text-[#0b1633] group-hover:shadow-[0_0_24px_rgba(200,164,107,0.45)]">
                <item.Icon className="h-6 w-6" />
              </span>

              <span className="relative mt-4 text-sm font-semibold text-white/90 transition group-hover:text-[#c8a46b]">
                {item.name}
              </span>

              <span className="relative mt-1 inline-flex items-center gap-0.5 text-[10px] font-medium uppercase tracking-wider text-white/45 transition group-hover:text-white/70">
                Visit
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="h-px w-8 bg-[#c8a46b]/40" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Stay connected</span>
        <span className="h-px w-8 bg-[#c8a46b]/40" />
      </div>
    </div>
  );
}
