'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

import { isFeatureEnabled } from '@/config/features';

const CHAT_HREF = '/portfolio/clinic-healthcare-showcase/ai/health-chat';

/** Bottom-right Ask AI FAB — opens the health assistant demo when chat is enabled. */
export default function ClinicAskAiFab() {
  if (!isFeatureEnabled('chatAssistant')) return null;

  return (
    <div className="cl-ask-ai-fab-wrap">
      <Link
        href={CHAT_HREF}
        className="cl-ask-ai-fab"
        aria-label="Ask AI — open Clinic & Healthcare AI health assistant"
      >
        <span className="cl-ask-ai-fab__glow" aria-hidden />
        <span className="cl-ask-ai-fab__icon" aria-hidden>
          <Sparkles className="h-5 w-5" />
        </span>
        <span className="cl-ask-ai-fab__label">Ask AI</span>
      </Link>
    </div>
  );
}
