import { NextResponse } from "next/server";

import { createRazorpayOrderRequest } from "@/lib/razorpay-showcase";

const MAX_PAISE = 5_000_000; // ₹50,000 demo cap
const MIN_PAISE = 100;

export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim();
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { configured: false, message: "Razorpay keys not set — use mock checkout in demo." },
      { status: 503 },
    );
  }

  let body: { amount_paise?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ detail: "Invalid JSON body" }, { status: 400 });
  }

  const amountPaise = Math.round(Number(body.amount_paise));
  if (!Number.isFinite(amountPaise) || amountPaise < MIN_PAISE) {
    return NextResponse.json({ detail: "Amount must be at least ₹1" }, { status: 400 });
  }
  if (amountPaise > MAX_PAISE) {
    return NextResponse.json({ detail: "Demo checkout is capped at ₹50,000" }, { status: 400 });
  }

  try {
    const receipt = `sk_${Date.now()}`;
    const order = await createRazorpayOrderRequest(keyId, keySecret, amountPaise, receipt);
    return NextResponse.json({
      configured: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Razorpay order failed";
    return NextResponse.json({ detail: message }, { status: 502 });
  }
}
