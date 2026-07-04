"use client";

import DayalSectionLink from "@/components/dayal/DayalSectionLink";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Calendar, ChevronUp, MessageCircle, Phone } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { DAYAL } from "@/lib/dayal/data";

type Props = {
  onOpenChat: () => void;
  chatOpen: boolean;
};

/** Desktop rail — fixed 44×44px so every action matches */
const RAIL_BTN =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-lg transition";

export default function DayalActionDock({ onOpenChat, chatOpen }: Props) {
  const reduceMotion = useReducedMotion();
  const [showScroll, setShowScroll] = useState(false);

  const waUrl = `https://wa.me/${DAYAL.whatsapp}?text=${encodeURIComponent(
    "Hi, I'd like to enquire about Dayal Builders projects."
  )}`;

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, []);

  if (chatOpen) return null;

  return (
    <>
      {/* Desktop — slim action rail */}
      <aside
        className="fixed bottom-6 right-4 z-40 hidden flex-col items-center gap-2.5 lg:flex"
        aria-label="Quick contact"
      >
        <AnimatePresence>
          {showScroll ? (
            <motion.button
              type="button"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              onClick={scrollToTop}
              className={`${RAIL_BTN} border border-[#c8a46b]/50 bg-white text-[#0b1633] hover:bg-[#f8f6f2]`}
              aria-label="Scroll to top"
            >
              <ChevronUp className="h-5 w-5 text-[#c8a46b]" strokeWidth={2.5} />
            </motion.button>
          ) : null}
        </AnimatePresence>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${RAIL_BTN} bg-[#25D366] text-white hover:brightness-105`}
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        <a
          href={`tel:${DAYAL.phones[0].tel}`}
          className={`${RAIL_BTN} bg-[#c8a46b] text-[#0b1633] hover:bg-[#d4b57d]`}
          aria-label="Call"
        >
          <Phone className="h-5 w-5" />
        </a>
        <button
          type="button"
          onClick={onOpenChat}
          className={`${RAIL_BTN} relative bg-[#0b1633] text-white hover:bg-[#152a52]`}
          aria-label="Open AI chat"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b1633] bg-[#22c55e]" />
        </button>
      </aside>

      {/* Mobile — single bottom dock */}
      <nav
        className="dayal-dock fixed inset-x-0 bottom-0 z-40 border-t border-[#0b1633]/10 bg-[#fffdf9]/96 backdrop-blur-md lg:hidden"
        aria-label="Contact shortcuts"
      >
        <div className="mx-auto grid max-w-lg grid-cols-4">
          <DayalSectionLink href="#contact" className="dayal-dock__item">
            <span className="dayal-dock__icon dayal-dock__icon--navy">
              <Calendar className="h-5 w-5" />
            </span>
            <span className="dayal-dock__label">Visit</span>
          </DayalSectionLink>
          <a href={`tel:${DAYAL.phones[0].tel}`} className="dayal-dock__item">
            <span className="dayal-dock__icon dayal-dock__icon--gold">
              <Phone className="h-5 w-5" />
            </span>
            <span className="dayal-dock__label">Call</span>
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="dayal-dock__item"
          >
            <span className="dayal-dock__icon dayal-dock__icon--wa">
              <MessageCircle className="h-5 w-5" />
            </span>
            <span className="dayal-dock__label">WhatsApp</span>
          </a>
          <button type="button" onClick={onOpenChat} className="dayal-dock__item">
            <span className="dayal-dock__icon dayal-dock__icon--navy relative">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#22c55e] ring-1 ring-white" />
            </span>
            <span className="dayal-dock__label">AI Chat</span>
          </button>
        </div>
      </nav>
    </>
  );
}
