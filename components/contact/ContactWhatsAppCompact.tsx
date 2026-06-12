import { MessageCircle } from "lucide-react";

import { whatsappUrl } from "@/lib/constants";
import { CP_CARD } from "@/lib/contactPageTheme";

type ContactWhatsAppCompactProps = {
  message: string;
  service?: string;
};

export default function ContactWhatsAppCompact({ message, service }: ContactWhatsAppCompactProps) {
  return (
    <div className={`${CP_CARD} p-5 sm:p-6`}>
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#128C7E]">Prefer WhatsApp?</p>
      <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
        Form ki jagah seedha message bhejo — package{service ? ` (${service})` : ""} message mein pre-filled rahega. Edit karke
        send karna.
      </p>
      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
      >
        <MessageCircle className="size-4" aria-hidden />
        Open WhatsApp
      </a>
      <p className="mt-2 text-center text-xs text-[#9CA3AF]">Usually same-day reply · 10 AM – 9 PM IST</p>
    </div>
  );
}
