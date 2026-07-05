import { NextRequest, NextResponse } from "next/server";

import { isContactRateLimited, rejectOversizedContactRequest } from "@/lib/contact/contactAbuseGuard";
import { getContactDataSource } from "@/lib/contact/contactDataSource";
import { proxyContactPost } from "@/lib/contact/fastapiContactProxy";
import { validateContactCreate } from "@/lib/contact/contactValidation";
import { createContactSubmission } from "@/lib/supabase/contacts";
import { SupabaseContactQueryError } from "@/lib/supabase/contactQueries";

export async function POST(req: NextRequest) {
  if (rejectOversizedContactRequest(req)) {
    return NextResponse.json({ detail: "Payload too large" }, { status: 413 });
  }

  if (isContactRateLimited(req)) {
    return NextResponse.json({ detail: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ detail: "Invalid request body" }, { status: 400 });
  }

  const validated = validateContactCreate(body);
  if (validated.ok === false) {
    const detail = validated.errors[0]?.message ?? "Invalid input";
    return NextResponse.json({ detail }, { status: 422 });
  }

  const source = getContactDataSource();
  const authorization = req.headers.get("authorization");

  if (source === "fastapi") {
    const { response, payload } = await proxyContactPost(validated.value, authorization);
    if (!response.ok) {
      const detail =
        (payload as { detail?: string } | null)?.detail ??
        (payload as { message?: string } | null)?.message ??
        "Something went wrong. Please try again.";
      return NextResponse.json({ detail }, { status: response.status });
    }
    return NextResponse.json(payload, { status: response.status });
  }

  try {
    const created = await createContactSubmission(validated.value);
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. We will contact you shortly.",
        id: created.id,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof SupabaseContactQueryError) {
      console.error("contact_create_failed", error.operation, error.sanitized.code, error.sanitized.message);
    } else {
      console.error("contact_create_failed", error instanceof Error ? error.message : "unknown");
    }
    return NextResponse.json({ detail: "Database error. Please try again." }, { status: 500 });
  }
}
