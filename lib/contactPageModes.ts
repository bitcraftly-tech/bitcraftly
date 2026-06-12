export type ContactPageMode = "default" | "quote" | "audit" | "consultation";

export function getContactPageMode(intent: string | null, service: string | null): ContactPageMode {
  const i = (intent || "").toLowerCase();
  if (i === "quote" && service?.trim()) return "quote";
  if (i === "audit") return "audit";
  if (i === "consultation") return "consultation";
  return "default";
}

type ModeCopy = {
  headline: string;
  subheadline: string;
  timeline: readonly string[];
  formEyebrow: string;
  formTitle: string;
  formSubheadline: string;
};

export function getContactModeCopy(mode: ContactPageMode, service?: string): ModeCopy {
  if (mode === "quote" && service) {
    return {
      headline: `Written quote — ${service}`,
      subheadline:
        "Aapne package choose kar liya. Bas details bharo — same day reply, written scope ke saath. Form ya WhatsApp, jo aasaan lage.",
      timeline: [
        "Form submit karo (2 min)",
        "Same day WhatsApp / call reply",
        "Written quote + timeline confirm",
      ],
      formEyebrow: "Quick quote form",
      formTitle: "4 fields — 1 minute",
      formSubheadline: "Package select ho chuka hai. Naam, phone, business — bas itna. Baaki hum likh ke bhejenge.",
    };
  }

  if (mode === "audit") {
    return {
      headline: "Free website audit",
      subheadline: "Apni site URL share karo — practical checklist milega, koi obligation nahi.",
      timeline: [
        "Audit request bhejo",
        "Checklist WhatsApp / email par",
        "Optional call agar rebuild chahiye ho",
      ],
      formEyebrow: "Audit request",
      formTitle: "Request free audit",
      formSubheadline: "URL aur main problem likho — founder review karta hai.",
    };
  }

  if (mode === "consultation") {
    return {
      headline: "Free 15-minute consultation",
      subheadline: "Scope, stack aur ballpark estimate — founder se direct, no sales team.",
      timeline: [
        "Short form ya WhatsApp",
        "Same day slot fix",
        "15-min call + written summary",
      ],
      formEyebrow: "Book consultation",
      formTitle: "Tell us briefly",
      formSubheadline: "2 minute form — hum call/WhatsApp par connect karenge.",
    };
  }

  return {
    headline: "Get your free consultation or website audit",
    subheadline: "Form takes about 2 minutes. We reply same day on WhatsApp or call.",
    timeline: [
      "Fill the form (about 2 min)",
      "We reply on call/WhatsApp (same day)",
      "Free 15-min consultation with the founder",
      "Written scope + timeline before kickoff",
    ],
    formEyebrow: "Written enquiry",
    formTitle: "Tell us about your project",
    formSubheadline: "Form takes about 2 minutes. We reply same day on WhatsApp or call.",
  };
}
