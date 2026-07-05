"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

import { apiClient } from "@/lib/api-client";
import { showErrorAlert, showSuccessAlert } from "@/lib/sweetAlert";

type CreateOrderResponse = {
  order_id: string;
  amount: number;
  currency: string;
  key_id: string;
};

type PaymentRecord = {
  id: number;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  amount_paise: number;
  currency: string;
  status: string;
  created_at: string;
};

type RazorpaySuccess = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void; on: (e: string, fn: (err: unknown) => void) => void };
  }
}

const PRESETS_INR = [499, 999, 2499, 4999];

function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Razorpay checkout"));
    document.body.appendChild(s);
  });
}

export default function BillingClient() {
  const { data: session, status } = useSession();
  const [rupees, setRupees] = useState("999");
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<PaymentRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const loadPayments = useCallback(async () => {
    if (status !== "authenticated" || !session?.accessToken) return;
    setHistoryLoading(true);
    try {
      const { data } = await apiClient.get<PaymentRecord[]>("/api/payments/me", { params: { limit: 30 } });
      setHistory(Array.isArray(data) ? data : []);
    } catch {
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  }, [session?.accessToken, status]);

  useEffect(() => {
    void loadPayments();
  }, [loadPayments]);

  const pay = useCallback(async () => {
    if (status !== "authenticated" || !session?.accessToken) {
      void showErrorAlert("Please sign in again to pay.");
      return;
    }
    const num = Number.parseFloat(rupees.replace(/,/g, "").trim());
    if (!Number.isFinite(num) || num < 1) {
      void showErrorAlert("Enter an amount of at least ₹1.");
      return;
    }
    const amountPaise = Math.round(num * 100);
    if (amountPaise < 100) {
      void showErrorAlert("Amount too small.");
      return;
    }

    setBusy(true);
    try {
      await loadRazorpayScript();
      const { data: order } = await apiClient.post<CreateOrderResponse>("/api/payments/razorpay/order", {
        amount_paise: amountPaise,
        currency: "INR",
      });

      const options: Record<string, unknown> = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
        name: "Bitcraftly",
        description: "Service payment",
        theme: { color: "#2B5CE6" },
        prefill: {
          email: session.user?.email ?? "",
          name: session.user?.name ?? "",
        },
        handler: async (response: RazorpaySuccess) => {
          try {
            await apiClient.post("/api/payments/razorpay/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            void showSuccessAlert("Payment verified successfully.");
            void loadPayments();
          } catch {
            void showErrorAlert("Verification failed. Save your payment ID and contact support.");
          } finally {
            setBusy(false);
          }
        },
        modal: {
          ondismiss: () => setBusy(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        void showErrorAlert("Payment failed or was cancelled.");
        setBusy(false);
      });
      rzp.open();
    } catch (e: unknown) {
      const ax = e && typeof e === "object" && "response" in e ? (e as { response?: { data?: { detail?: unknown } } }).response?.data?.detail : null;
      const msg =
        typeof ax === "string"
          ? ax
          : Array.isArray(ax)
            ? ax.map((x: { msg?: string }) => x.msg).join(", ")
            : null;
      void showErrorAlert(msg ?? "Could not start payment. Check Razorpay keys on the API server.");
      setBusy(false);
    }
  }, [loadPayments, rupees, session, status]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">Pay with Razorpay</p>
        <p className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">
          Uses Razorpay Checkout (India). On the API server set <code className="rounded bg-bg-secondary px-1 dark:bg-dark-bg-secondary">RAZORPAY_KEY_ID</code>,{" "}
          <code className="rounded bg-bg-secondary px-1 dark:bg-dark-bg-secondary">RAZORPAY_KEY_SECRET</code>, and for webhooks{" "}
          <code className="rounded bg-bg-secondary px-1 dark:bg-dark-bg-secondary">RAZORPAY_WEBHOOK_SECRET</code>.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS_INR.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => setRupees(String(amt))}
            className="rounded-lg border border-border-primary px-3 py-1.5 text-xs font-medium text-text-secondary transition hover:bg-bg-secondary dark:border-dark-border-primary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary"
          >
            ₹{amt.toLocaleString("en-IN")}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="block flex-1">
          <span className="text-xs font-medium uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">Amount (INR)</span>
          <input
            type="text"
            inputMode="decimal"
            value={rupees}
            onChange={(e) => setRupees(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border-primary bg-bg-primary px-3 py-2 text-sm text-text-primary dark:border-dark-border-primary dark:bg-dark-bg-primary dark:text-dark-text-primary"
            placeholder="999"
          />
        </label>
        <button
          type="button"
          disabled={busy || status !== "authenticated"}
          onClick={() => void pay()}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#2B5CE6] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e47c4] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#4068ff]"
        >
          {busy ? "Opening…" : "Pay now"}
        </button>
      </div>

      {status === "loading" ? <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Checking session…</p> : null}

      <div className="border-t border-border-primary pt-6 dark:border-dark-border-primary">
        <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">Recent payments</p>
        <p className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">
          Stored after checkout (and updated when Razorpay sends webhooks).
        </p>
        {historyLoading ? (
          <p className="mt-3 text-xs text-text-tertiary dark:text-dark-text-tertiary">Loading…</p>
        ) : history.length === 0 ? (
          <p className="mt-3 text-xs text-text-tertiary dark:text-dark-text-tertiary">No payments yet.</p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-lg border border-border-primary dark:border-dark-border-primary">
            <table className="min-w-full text-left text-xs">
              <thead className="border-b border-border-primary bg-bg-secondary dark:border-dark-border-primary dark:bg-dark-bg-secondary">
                <tr>
                  <th className="px-3 py-2 font-medium text-text-secondary dark:text-dark-text-secondary">When</th>
                  <th className="px-3 py-2 font-medium text-text-secondary dark:text-dark-text-secondary">Amount</th>
                  <th className="px-3 py-2 font-medium text-text-secondary dark:text-dark-text-secondary">Status</th>
                  <th className="px-3 py-2 font-medium text-text-secondary dark:text-dark-text-secondary">Order</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row) => (
                  <tr key={row.id} className="border-b border-border-primary last:border-0 dark:border-dark-border-primary">
                    <td className="px-3 py-2 text-text-primary dark:text-dark-text-primary">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-text-primary dark:text-dark-text-primary">
                      {(row.amount_paise / 100).toLocaleString("en-IN", { style: "currency", currency: row.currency || "INR" })}
                    </td>
                    <td className="px-3 py-2 capitalize text-text-primary dark:text-dark-text-primary">{row.status}</td>
                    <td className="max-w-[140px] truncate px-3 py-2 font-mono text-text-secondary dark:text-dark-text-secondary" title={row.razorpay_order_id}>
                      {row.razorpay_order_id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
