"use client";

import { MountWhenVisible } from "@/components/patterns/mount-when-visible";
import { submitLeadAction } from "../actions/submit-lead.action";
import type { LeadFunnelDefaults } from "../types";

interface ContactLeadFormLazyProps {
  defaults?: LeadFunnelDefaults;
}

/** Keeps the contact server action in the route's static module graph. */
const registerContactLeadAction = submitLeadAction;
void registerContactLeadAction;

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
          aria-hidden="true"
        />
      }
    />
  );
}
