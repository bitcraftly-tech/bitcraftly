import { NextResponse } from "next/server";

import { verifyCheckoutSignature } from "@/lib/razorpay-showcase";

export async function POST(request: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();
  if (!keySecret) {
    return NextResponse.json({ detail: "Payments not configured" }, { status: 503 });
  }

  let body: {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ detail: "Invalid JSON body" }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ detail: "Missing payment fields" }, { status: 400 });
  }

  const ok = verifyCheckoutSignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    keySecret,
  );

  if (!ok) {
    return NextResponse.json({ ok: false, message: "Invalid payment signature" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message: "Payment verified · ShopKart demo order",
    order_id: razorpay_order_id,
    payment_id: razorpay_payment_id,
  });
}
