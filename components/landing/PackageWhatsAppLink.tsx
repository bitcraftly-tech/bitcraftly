import type { ReactNode } from "react";

import { whatsappUrl } from "@/lib/constants";
import { resolveWhatsAppMessage } from "@/lib/whatsappFunnel";

type PackageWhatsAppLinkProps = {
  service: string;
  source?: string;
  className?: string;
  children: ReactNode;
};

export default function PackageWhatsAppLink({ service, source = "pricing-package", className, children }: PackageWhatsAppLinkProps) {
  const href = whatsappUrl(resolveWhatsAppMessage({ service, source }));

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
