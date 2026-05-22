import { Mail, MapPin, MessageCircle } from "lucide-react";

import { PRIMARY_LOCATION, whatsappUrl, WHATSAPP_HOURS } from "@/lib/constants";
import { CP_CARD } from "@/lib/contactPageTheme";

type ContactMethodCardsProps = {
  whatsappMessage: string;
};

export default function ContactMethodCards({ whatsappMessage }: ContactMethodCardsProps) {
  return (
    <div className="space-y-3">
      <a
        href={whatsappUrl(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${CP_CARD} flex items-start gap-3 p-4 transition hover:border-[#25D366]/40`}
      >
        <span className="flex size-10 shrink-0 items-center justify-center bg-[#25D366]/12 text-[#25D366]">
          <MessageCircle className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9CA3AF]">WhatsApp</p>
          <p className="mt-0.5 text-sm font-semibold text-[#111827]">+91 96677 10954 — Message Sanjay</p>
          <p className="mt-0.5 text-xs text-[#6B7280]">{WHATSAPP_HOURS}</p>
        </div>
      </a>

      <a
        href="mailto:hello@bitcraftly.com"
        className={`${CP_CARD} flex items-start gap-3 p-4 transition hover:border-[#4F46E5]/30 hover:shadow-md`}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#4F46E5]">
          <Mail className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9CA3AF]">Email</p>
          <p className="mt-0.5 text-sm font-semibold text-[#111827]">hello@bitcraftly.com</p>
        </div>
      </a>

      <div className={`${CP_CARD} flex items-start gap-3 p-4`}>
        <span className="flex size-10 shrink-0 items-center justify-center bg-[#EEF2FF] text-[#4F46E5]">
          <MapPin className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9CA3AF]">Location</p>
          <p className="mt-0.5 text-sm font-semibold text-[#111827]">{PRIMARY_LOCATION}</p>
        </div>
      </div>
    </div>
  );
}
