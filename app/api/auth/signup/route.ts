import { NextResponse } from "next/server";

const authApiBaseUrl =
  process.env.AUTH_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(`${authApiBaseUrl}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json(
        { message: data?.message || data?.detail || "Signup failed. Please try again." },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ message: "Unable to process signup request." }, { status: 500 });
  }
}
