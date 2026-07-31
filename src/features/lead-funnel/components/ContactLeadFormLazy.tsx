'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';
import { submitLeadAction } from '../actions/submit-lead.action';
import type { LeadFunnelDefaults } from '../types';

/** Keeps the contact server action in the route's static module graph. */
const registerContactLeadAction = submitLeadAction;
void registerContactLeadAction;

interface ContactLeadFormLazyProps {
  defaults?: LeadFunnelDefaults;
  /** Bumps when a channel CTA applies an intent so the form can focus/sync. */
  intentFocusToken?: number;
}

type ContactLeadFormComponent = ComponentType<{
  defaults?: LeadFunnelDefaults;
  intentFocusToken?: number;
}>;

/**
 * Defers the lead form bundle until the section is near the viewport,
 * while still forwarding live defaults/intent tokens after mount.
 */
export function ContactLeadFormLazy({ defaults, intentFocusToken = 0 }: ContactLeadFormLazyProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [Form, setForm] = useState<ContactLeadFormComponent | null>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || Form) return;

    let cancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        void import('./ContactLeadForm').then((mod) => {
          if (!cancelled) {
            setForm(() => mod.ContactLeadForm);
          }
        });
      },
      { rootMargin: '280px 0px', threshold: 0.01 },
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [Form]);

  return (
    <div ref={rootRef}>
      {Form ? (
        <Form defaults={defaults} intentFocusToken={intentFocusToken} />
      ) : (
        <div
          className="min-h-[24rem] w-full rounded-[var(--token-radius-lg)] bg-background/60"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
