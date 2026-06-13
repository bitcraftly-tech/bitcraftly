import { createHmac } from "crypto";

export type RazorpayCheckoutSuccess = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type ShowcaseRazorpayOrder = {
  order_id: string;
  amount: number;
  currency: string;
  key_id: string;
};

export function loadRazorpayCheckoutScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Razorpay) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout"));
    document.body.appendChild(script);
  });
}

export function verifyCheckoutSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  keySecret: string,
): boolean {
  const expected = createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return expected === signature;
}

export async function createRazorpayOrderRequest(
  keyId: string,
  keySecret: string,
  amountPaise: number,
  receipt: string,
): Promise<{ id: string; amount: number; currency: string }> {
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountPaise,
      currency: "INR",
      receipt: receipt.slice(0, 40),
      notes: { source: "shopkart-showcase" },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Razorpay order failed: ${text}`);
  }

  const data = (await res.json()) as { id?: string; amount?: number; currency?: string };
  if (!data.id) throw new Error("Invalid Razorpay order response");
  return {
    id: data.id,
    amount: data.amount ?? amountPaise,
    currency: data.currency ?? "INR",
  };
}
