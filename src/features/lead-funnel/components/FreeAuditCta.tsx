"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { trackLeadEvent } from "../analytics";
import { LEAD_FUNNEL_CONFIG } from "../lead-funnel.config";
import { cn } from "@/lib/cn";

interface FreeAuditCtaProps {
  href?: string;
  label?: string;
  source?: string;
  className?: string;
  preferWhatsApp?: boolean;
  onNavigate?: () => void;
}

export function FreeAuditCta({
  href,
  label = "Get a free website audit",
  source = "free-audit-cta",
  className,
  preferWhatsApp = false,
  onNavigate,
}: FreeAuditCtaProps) {
  const destination =
    href ??
    (preferWhatsApp
      ? LEAD_FUNNEL_CONFIG.whatsappAuditHref
      : LEAD_FUNNEL_CONFIG.auditHref);

  const external = destination.startsWith("http");

  return (
    <Link
      href={destination}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        "lead-funnel__channel-btn lead-funnel__channel-btn--primary",
        className,
      )}
      onClick={() => {
        trackLeadEvent("audit_cta_click", {
          source,
          channel: preferWhatsApp ? "whatsapp" : "contact",
        });
        onNavigate?.();
      }}
    >
      <Icon name="search" size="sm" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}
