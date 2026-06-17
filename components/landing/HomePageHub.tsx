import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import LandingSectionEyebrow from "@/components/landing/LandingSectionEyebrow";
import { CONTAINER } from "@/lib/constants";
import { HOME_HUB_LINKS } from "@/lib/marketingRoutes";

export default function HomePageHub() {
  return (
    <section className={`${CONTAINER} scroll-mt-24 border-t border-[#eef2f7] bg-white py-12 md:py-14`}>
      <LandingSectionEyebrow>Explore Bitcraftly</LandingSectionEyebrow>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#2c3e50] sm:text-4xl">
        Find what you need in one click
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_HUB_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative flex min-h-[156px] flex-col overflow-hidden rounded-[18px] border border-[#e8ecef] bg-white p-5 shadow-[0_4px_24px_rgba(44,62,80,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(79,70,229,0.1)]"
          >
            <h3 className="pr-20 text-lg font-bold text-[#2c3e50] transition group-hover:text-[#4f46e5]">{item.title}</h3>
            <p className="mt-2 max-w-[82%] flex-1 text-sm leading-relaxed text-[#7f8c8d]">{item.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#4f46e5]">
              {item.cta ?? "Learn more"}
              <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </span>
            <span className="pointer-events-none absolute bottom-4 right-4 text-[2.75rem] leading-none opacity-95" aria-hidden>
              {item.icon}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
