"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Calendar, ImageIcon, MessageCircle, Sparkles, Wallet } from "lucide-react";

import { BitBotAvatar } from "@/components/chat/BitBotMascot";
import { whatsappUrl } from "@/lib/constants";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";

const QUICK_ACTIONS = [
  { label: "Website Cost", icon: Wallet, query: "pricing" },
  { label: "Services", icon: Sparkles, query: "services" },
  { label: "Portfolio", icon: ImageIcon, query: "portfolio" },
  { label: "Book Consultation", icon: Calendar, query: "contact" },
] as const;

function openChat(query?: string) {
  window.dispatchEvent(new CustomEvent("bc-open-chat", { detail: { query } }));
}

export default function HeroBitBotPromo() {
  useEffect(() => {
    document.documentElement.setAttribute("data-bc-hero-bitbot", "");
    return () => document.documentElement.removeAttribute("data-bc-hero-bitbot");
  }, []);

  return (
    <aside className="lp-hero-bitbot hidden xl:block" aria-label="BitBot assistant">
      <div className="lp-hero-bitbot__card">
        <div className="lp-hero-bitbot__header">
          <BitBotAvatar size={40} />
          <p className="lp-hero-bitbot__title">Hi! I&apos;m BitBot 👋</p>
        </div>
        <p className="lp-hero-bitbot__subtitle">How can I help you today?</p>

        <div className="lp-hero-bitbot__actions">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                className="lp-hero-bitbot__action"
                onClick={() => openChat(action.query)}
              >
                <span className="lp-hero-bitbot__action-icon">
                  <Icon className="size-4" aria-hidden />
                </span>
                {action.label}
              </button>
            );
          })}
        </div>

        <Link
          href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
          target="_blank"
          rel="noreferrer"
          className="lp-hero-bitbot__whatsapp"
        >
          <MessageCircle className="size-4" aria-hidden />
          Chat on WhatsApp
        </Link>
      </div>
    </aside>
  );
}
