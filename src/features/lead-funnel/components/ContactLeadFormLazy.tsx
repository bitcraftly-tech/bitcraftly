"use client";

import { MountWhenVisible } from "@/components/patterns/mount-when-visible";
import type { LeadFunnelDefaults } from "../types";

interface ContactLeadFormLazyProps {
  defaults?: LeadFunnelDefaults;
}

const loadContactLeadForm = (defaults?: LeadFunnelDefaults) =>
  import("./ContactLeadForm").then((mod) => {
    const Form = mod.ContactLeadForm;
    function BoundContactLeadForm() {
      return <Form defaults={defaults} />;
    }
    return BoundContactLeadForm;
  });

/** Defers lead form bundle until the contact section enters the viewport. */
export function ContactLeadFormLazy({ defaults }: ContactLeadFormLazyProps) {
  return (
    <MountWhenVisible
      load={() => loadContactLeadForm(defaults)}
      fallback={
        <div
          className="min-h-[24rem] w-full rounded-[var(--token-radius-lg)] bg-background/60"
          aria-hidden
        />
      }
    />
  );
}
