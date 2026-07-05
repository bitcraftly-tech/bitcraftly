export type ContactStage = "new" | "in_progress" | "closed";

export type ContactCreateInput = {
  name: string;
  business_name: string;
  business_type: string;
  phone: string;
  email?: string | null;
  message?: string | null;
  source?: string | null;
};

export type ContactValidationError = {
  field: string;
  message: string;
};

const STAGES = new Set<ContactStage>(["new", "in_progress", "closed"]);

function stripOptional(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const cleaned = String(value).trim();
  return cleaned || null;
}

function normalizePhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 10) return null;
  return digits;
}

function normalizeEmail(value: string | null): string | null {
  if (!value) return null;
  const cleaned = value.trim().toLowerCase();
  if (!cleaned.includes("@")) return null;
  return cleaned;
}

export function mapLegacyContactBody(body: Record<string, unknown>): Record<string, unknown> {
  const mapped = { ...body };
  if (mapped.name === undefined && mapped.fullName !== undefined) mapped.name = mapped.fullName;
  if (mapped.business_name === undefined && mapped.businessName !== undefined) {
    mapped.business_name = mapped.businessName;
  }
  if (mapped.business_type === undefined && mapped.businessType !== undefined) {
    mapped.business_type = mapped.businessType;
  }
  return mapped;
}

export function validateContactCreate(body: unknown):
  | { ok: true; value: ContactCreateInput }
  | { ok: false; errors: ContactValidationError[] } {
  if (!body || typeof body !== "object") {
    return { ok: false, errors: [{ field: "body", message: "Invalid request body" }] };
  }

  const record = mapLegacyContactBody(body as Record<string, unknown>);
  const errors: ContactValidationError[] = [];

  const name = stripOptional(record.name);
  if (!name || name.length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters" });
  }

  const business_name = stripOptional(record.business_name);
  if (!business_name) {
    errors.push({ field: "business_name", message: "Business name is required" });
  }

  const business_type = stripOptional(record.business_type);
  if (!business_type) {
    errors.push({ field: "business_type", message: "Business type is required" });
  }

  const phoneRaw = stripOptional(record.phone);
  const phone = phoneRaw ? normalizePhone(phoneRaw) : null;
  if (!phone) {
    errors.push({ field: "phone", message: "Phone must be 10 digits" });
  }

  const emailRaw = stripOptional(record.email);
  const email = emailRaw ? normalizeEmail(emailRaw) : null;
  if (emailRaw && !email) {
    errors.push({ field: "email", message: "Invalid email address" });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      name: name!,
      business_name: business_name!,
      business_type: business_type!,
      phone: phone!,
      email,
      message: stripOptional(record.message),
      source: stripOptional(record.source),
    },
  };
}

export function validateContactStage(stage: unknown): ContactStage | null {
  const cleaned = `${stage ?? ""}`.trim().toLowerCase();
  return STAGES.has(cleaned as ContactStage) ? (cleaned as ContactStage) : null;
}

export function validateNotes(notes: unknown): string {
  return `${notes ?? ""}`.slice(0, 10_000);
}
