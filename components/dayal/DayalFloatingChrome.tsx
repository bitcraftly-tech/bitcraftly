"use client";

import { Calendar, FileText, MessageCircle, Phone } from "lucide-react";

import { DAYAL } from "@/lib/dayal/data";

export default function DayalFloatingChrome() {
  const waUrl = `https://wa.me/${DAYAL.whatsapp}?text=${encodeURIComponent(
    "Hi, I'd like to enquire about Dayal Builders projects."
  )}`;

  return (
    <>
      <aside
        className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
        aria-label="Quick actions"
      >
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#25D366] text-white shadow-lg transition hover:scale-105"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        <a
          href={`tel:${DAYAL.phones[0].tel}`}
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0b1633] text-white shadow-lg transition hover:scale-105"
          aria-label="Call us"
        >
          <Phone className="h-5 w-5" />
        </a>
        <a
          href="#contact"
          className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#c8a46b] bg-white text-[#0b1633] shadow-lg transition hover:scale-105"
          aria-label="Brochure"
        >
          <FileText className="h-5 w-5" />
        </a>
      </aside>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl lg:bottom-6 lg:hidden"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#0b1633]/10 bg-[#fffdf9]/95 p-3 backdrop-blur-lg lg:hidden">
        <div className="mx-auto flex max-w-lg gap-2">
          <a href="#contact" className="dayal-btn-primary flex-1 text-center text-sm py-2.5">
            <Calendar className="h-4 w-4" />
            Book Visit
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="dayal-btn-outline flex-1 text-center text-sm py-2.5"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
