"use client";

import { motion } from "framer-motion";
import { Building2, Home, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";

import DayalReveal from "@/components/dayal/DayalReveal";
import { PROJECTS } from "@/lib/dayal/data";

const STATUS_STYLES: Record<string, string> = {
  "Ready to Move": "bg-emerald-600/90 text-white",
  "Under Construction": "bg-amber-500/90 text-white",
  "Premium Launch": "bg-[#c8a46b] text-[#0b1633]",
  Upcoming: "bg-white/90 text-[#0b1633]",
};

export default function DayalProjects() {
  return (
    <section id="projects" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DayalReveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
            Our Premium Projects
          </p>
          <h2 className="dayal-serif mt-3 text-3xl font-semibold text-[#0b1633] sm:text-4xl">
            Crafting Spaces, Creating Lifestyles
          </h2>
        </DayalReveal>

        <div className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin lg:grid lg:grid-cols-5 lg:overflow-visible">
          {PROJECTS.map((project, i) => (
            <DayalReveal
              key={project.id}
              delay={i * 0.06}
              className="w-[min(280px,78vw)] shrink-0 snap-start lg:w-auto"
            >
              <motion.article
                className="group overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-[#0b1633]/5"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="220px"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_STYLES[project.status] ?? ""}`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="dayal-serif text-lg font-semibold text-[#0b1633]">{project.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-[#5c6478]">
                    <MapPin className="h-3 w-3 text-[#c8a46b]" />
                    {project.location}
                  </p>
                  <div className="mt-3 flex items-center gap-4 border-t border-[#0b1633]/8 pt-3 text-[10px] font-medium text-[#5c6478]">
                    <span className="flex items-center gap-1">
                      <Home className="h-3.5 w-3.5 text-[#c8a46b]" />
                      {project.bhk}
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-[#c8a46b]" />
                      {project.amenity}
                    </span>
                  </div>
                  <a
                    href="#contact"
                    className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#0b1633] hover:text-[#c8a46b]"
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    Enquire Now
                  </a>
                </div>
              </motion.article>
            </DayalReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
