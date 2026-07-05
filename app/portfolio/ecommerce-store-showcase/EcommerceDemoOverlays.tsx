"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";

import ShowcaseLink from "@/components/portfolio/ShowcaseLink";
import { formatInr, discountPct, PINCODES } from "./ecommerce-demo-data";
import { useEcommerceDemo } from "./EcommerceDemoContext";
import { EcommerceProductImage } from "./EcommerceProductImage";

export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cart,
    cartSubtotal,
    updateQty,
    removeFromCart,
    checkoutBusy,
    startRazorpayCheckout,
  } = useEcommerceDemo();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button type="button" className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} aria-label="Close cart" />
      <div className="relative flex h-full w-full max-w-md flex-col ec-bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b ec-border border px-4 py-3">
          <h2 className="text-lg font-bold ec-text">Shopping Cart</h2>
          <button type="button" onClick={() => setCartOpen(false)} className="rounded p-1 ec-hover-surface" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-sm ec-text-muted">Your cart is empty. Add items from search results or deals.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3 border-b ec-border-soft border pb-4">
                  <EcommerceProductImage product={product} className="h-20 w-20 shrink-0 rounded-sm" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm ec-text">{product.title}</p>
                    <p className="mt-1 text-sm font-bold">{formatInr(product.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(product.id, qty - 1)}
                        className="rounded border ec-border border p-1 ec-hover-surface"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-medium">{qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(product.id, qty + 1)}
                        className="rounded border ec-border border p-1 ec-hover-surface"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="ml-auto text-xs ec-link hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 ? (
          <div className="border-t ec-border border p-4">
            <p className="flex justify-between text-base font-bold">
              <span>Subtotal</span>
              <span>{formatInr(cartSubtotal)}</span>
            </p>
            <button
              type="button"
              disabled={checkoutBusy}
              onClick={() => void startRazorpayCheckout()}
              className="ec-btn-cart mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checkoutBusy ? (
                "Opening Razorpay…"
              ) : (
                <>
                  <span className="font-semibold">Pay with Razorpay</span>
                  <span className="opacity-90">· {formatInr(cartSubtotal)}</span>
                </>
              )}
            </button>
            <p className="ec-text-muted mt-2 text-center text-[10px]">
              Secured by Razorpay · test keys or demo checkout
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function AccountModal() {
  const { accountOpen, setAccountOpen, signedInAs, signIn, signOut } = useEcommerceDemo();
  const [name, setName] = useState("");

  if (!accountOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-black/50" onClick={() => setAccountOpen(false)} aria-label="Close" />
      <div className="relative w-full max-w-sm rounded-sm ec-bg-surface p-6 shadow-xl">
        <button type="button" onClick={() => setAccountOpen(false)} className="absolute right-3 top-3 p-1" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold">{signedInAs ? `Hello, ${signedInAs}` : "Sign in"}</h2>
        {signedInAs ? (
          <div className="mt-4 space-y-3">
            <p className="text-sm ec-text-muted">Demo account — orders & lists are illustrative only.</p>
            <button type="button" onClick={signOut} className="w-full rounded-sm border ec-border border py-2 text-sm font-medium ec-hover-surface">
              Sign out
            </button>
          </div>
        ) : (
          <form
            className="mt-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              signIn(name);
            }}
          >
            <label className="block text-sm font-medium">
              Your name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya"
                className="mt-1 w-full rounded-sm border ec-border border px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
              />
            </label>
            <button type="submit" className="ec-btn-cart w-full rounded-lg py-2 text-sm font-medium">
              Sign in · demo
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function PincodeModal() {
  const { pincodeOpen, setPincodeOpen, pincode, setPincode, showToast } = useEcommerceDemo();

  if (!pincodeOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-black/50" onClick={() => setPincodeOpen(false)} aria-label="Close" />
      <div className="relative w-full max-w-sm rounded-sm ec-bg-surface p-6 shadow-xl">
        <h2 className="text-lg font-bold">Choose delivery location</h2>
        <ul className="mt-4 space-y-2">
          {PINCODES.map((p) => (
            <li key={p}>
              <button
                type="button"
                onClick={() => {
                  setPincode(p);
                  setPincodeOpen(false);
                  showToast(`Delivering to ${p}`);
                }}
                className={`w-full rounded-sm border px-3 py-2 text-left text-sm hover:border-[#e77600] ${
                  pincode === p ? "border-[#e77600] ec-highlight font-semibold" : "ec-border border"
                }`}
              >
                {p}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function OrdersPanel() {
  const { ordersOpen, setOrdersOpen, demoOrders } = useEcommerceDemo();

  if (!ordersOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-black/50" onClick={() => setOrdersOpen(false)} aria-label="Close" />
      <div className="relative max-h-[80vh] w-full max-w-md overflow-y-auto rounded-sm ec-bg-surface p-6 shadow-xl">
        <button type="button" onClick={() => setOrdersOpen(false)} className="absolute right-3 top-3" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold ec-text">Your orders</h2>
        {demoOrders.length === 0 ? (
          <p className="mt-4 text-sm ec-text-muted">No orders yet. Pay with Razorpay from the cart to place a demo order.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {demoOrders.map((order) => (
              <li key={order.id} className="rounded-sm border ec-border border p-3 text-sm">
                <p className="font-semibold ec-link">
                  Paid · {formatInr(order.total)}
                  <span className="ec-text-muted ml-1 text-xs font-normal">
                    · {order.mode === "razorpay" ? "Razorpay" : order.mode === "mock-upi" ? "UPI demo" : "Card demo"}
                  </span>
                </p>
                <p className="ec-text-muted mt-1 font-mono text-[10px]">{order.paymentId}</p>
                {order.items.map((l) => (
                  <p key={l.product.id} className="mt-1 ec-text-muted">
                    {l.qty}× {l.product.title.slice(0, 40)}…
                  </p>
                ))}
              </li>
            ))}
          </ul>
        )}
        <ShowcaseLink href="/contact?intent=ecommerce&source=showcase-orders" className="mt-4 inline-block text-sm ec-link hover:underline">
          Need a real store? Talk to Bitcraftly →
        </ShowcaseLink>
      </div>
    </div>
  );
}

export function ProductModal() {
  const { productModal, setProductModal, addToCart, checkoutBusy, startRazorpayCheckout } = useEcommerceDemo();

  if (!productModal) return null;

  const pct = discountPct(productModal.price, productModal.list);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-black/50" onClick={() => setProductModal(null)} aria-label="Close" />
      <div className="relative grid w-full max-w-2xl gap-4 rounded-sm ec-bg-surface p-6 shadow-xl md:grid-cols-2">
        <button type="button" onClick={() => setProductModal(null)} className="absolute right-3 top-3" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <EcommerceProductImage product={productModal} eager className="aspect-square rounded-sm" />
        <div>
          <h2 className="pr-8 text-lg font-medium leading-snug">{productModal.title}</h2>
          <p className="mt-3 text-2xl font-normal">{formatInr(productModal.price)}</p>
          <p className="text-sm ec-text-muted">
            M.R.P. <span className="line-through">{formatInr(productModal.list)}</span>
            {pct > 0 ? <span className="ec-sale-text"> ({pct}% off)</span> : null}
          </p>
          <p className="mt-2 text-sm ec-link">{productModal.delivery}</p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                addToCart(productModal);
                setProductModal(null);
              }}
              className="ec-btn-cart flex-1 rounded-lg py-2 text-sm font-medium"
            >
              Add to Cart
            </button>
            <button
              type="button"
              disabled={checkoutBusy}
              onClick={() => {
                setProductModal(null);
                void startRazorpayCheckout({ addProduct: productModal });
              }}
              className="ec-btn-secondary flex-1 rounded-lg py-2 text-sm font-medium disabled:opacity-60"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
