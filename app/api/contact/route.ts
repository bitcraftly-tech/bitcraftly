import { NextRequest, NextResponse } from "next/server";

import { isContactRateLimited, rejectOversizedContactRequest } from "@/lib/contact/contactAbuseGuard";
import { validateContactCreate } from "@/lib/contact/contactValidation";
import { persistContactSubmission } from "@/lib/contact/persistContactSubmission";

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

  const authorization = req.headers.get("authorization");

  try {
    const created = await persistContactSubmission(validated.value, authorization);

    if (!created) {
      return NextResponse.json({ detail: "Database error. Please try again." }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: created.message,
        id: created.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "contact_persist_unhandled",
      error instanceof Error ? error.message : "unknown",
    );
    return NextResponse.json({ detail: "Database error. Please try again." }, { status: 500 });
  }
}
