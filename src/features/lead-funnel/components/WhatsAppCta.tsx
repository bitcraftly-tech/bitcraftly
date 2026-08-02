'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { trackLeadEvent } from '../analytics';
import { LEAD_FUNNEL_CONFIG } from '../lead-funnel.config';
import { cn } from '@/lib/cn';

interface WhatsAppCtaProps {
  href?: string;
  label?: string;
  source?: string;
  className?: string;
  variant?: 'primary' | 'outline';
  onNavigate?: () => void;
}

export function WhatsAppCta({
  href = LEAD_FUNNEL_CONFIG.whatsappConsultationHref,
  label = 'Chat on WhatsApp',
  source = 'whatsapp-cta',
  className,
  variant = 'outline',
  onNavigate,
}: WhatsAppCtaProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'lead-funnel__channel-btn',
        variant === 'primary' && 'lead-funnel__channel-btn--primary',
        className,
      )}
      onClick={() => {
        trackLeadEvent('whatsapp_click', { source, channel: 'whatsapp' });
        onNavigate?.();
      }}
    >
      <Icon name="message" size="sm" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}
