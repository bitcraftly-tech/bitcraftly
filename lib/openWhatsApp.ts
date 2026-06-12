import { trackWhatsAppClick } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/constants";

type OpenWhatsAppOptions = {
  message: string;
  source: string;
  messageKey?: string;
};

/** Opens WhatsApp in a new tab and records a GA4 `whatsapp_click` event */
export function openWhatsApp({ message, source, messageKey }: OpenWhatsAppOptions): void {
  trackWhatsAppClick({
    source,
    messageKey,
    pagePath: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}
