'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Minus, Plus, ShieldCheck, Tag, Truck, X } from 'lucide-react';

import ShowcaseLink from '@/components/portfolio/ShowcaseLink';
import { formatInr, discountPct, PINCODES } from './ecommerce-demo-data';
import { useEcommerceDemo } from './EcommerceDemoContext';
import { EcommerceProductImage } from './EcommerceProductImage';

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

  const [rendered, setRendered] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (cartOpen) {
      setRendered(true);
      const frame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setEntered(true));
      });
      return () => window.cancelAnimationFrame(frame);
    }

    setEntered(false);
    const timer = window.setTimeout(() => setRendered(false), 300);
    return () => window.clearTimeout(timer);
  }, [cartOpen]);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen]);

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cartOpen, setCartOpen]);

  if (!rendered) return null;

  return (
    <div
      className={`ec-cart-drawer fixed inset-0 z-[70] flex justify-end${entered ? ' ec-cart-drawer--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <button
        type="button"
        className="ec-cart-drawer__backdrop absolute inset-0"
        onClick={() => setCartOpen(false)}
        aria-label="Close cart"
      />
      <div className="ec-cart-drawer__panel relative flex h-full w-full max-w-[min(100%,340px)] flex-col ec-bg-surface shadow-2xl sm:max-w-[360px]">
        <div className="flex items-center justify-between border-b ec-border border px-4 py-3">
          <h2 className="text-lg font-bold ec-text">Shopping Cart</h2>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="rounded p-1 ec-hover-surface"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-sm ec-text-muted">
              Your cart is empty. Add items from search results or deals.
            </p>
          ) : (
            <ul className="space-y-4">
              {cart.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3 border-b ec-border-soft border pb-4">
                  <EcommerceProductImage
                    product={product}
                    className="h-20 w-20 shrink-0 rounded-sm"
                  />
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
                'Opening Razorpay…'
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
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);
  const [entered, setEntered] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (accountOpen) {
      setRendered(true);
      const frame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setEntered(true));
      });
      return () => window.cancelAnimationFrame(frame);
    }
    setEntered(false);
    const timer = window.setTimeout(() => setRendered(false), 280);
    return () => window.clearTimeout(timer);
  }, [accountOpen]);

  useEffect(() => {
    if (!accountOpen) return;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(t);
    };
  }, [accountOpen, signedInAs]);

  useEffect(() => {
    if (!accountOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAccountOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [accountOpen, setAccountOpen]);

  useEffect(() => {
    if (!accountOpen) {
      setError(null);
      setPassword('');
    }
  }, [accountOpen]);

  if (!rendered) return null;

  const submitLogin = (e: FormEvent) => {
    e.preventDefault();
    const value = identifier.trim();
    if (!value) {
      setError(mode === 'email' ? 'Enter your email to continue.' : 'Enter your mobile number.');
      return;
    }
    if (mode === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Enter a valid email address.');
      return;
    }
    if (mode === 'phone' && value.replace(/\D/g, '').length < 10) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    if (!password.trim()) {
      setError('Enter your password (any demo password works).');
      return;
    }

    const displayName =
      mode === 'email'
        ? value.split('@')[0]?.replace(/[._-]+/g, ' ') || 'Shopper'
        : `Shopper ${value.replace(/\D/g, '').slice(-4)}`;

    setError(null);
    signIn(displayName.replace(/\b\w/g, (c) => c.toUpperCase()));
  };

  return (
    <div
      className={`ec-auth-modal fixed inset-0 z-[70] overflow-y-auto overscroll-contain${entered ? ' ec-auth-modal--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ec-auth-title"
    >
      <button
        type="button"
        className="ec-auth-modal__backdrop"
        onClick={() => setAccountOpen(false)}
        aria-label="Close sign in"
      />

      <div className="ec-auth-modal__frame">
        <div className="ec-auth-card relative w-full">
          <div className="ec-auth-card__banner">
            <button
              type="button"
              onClick={() => setAccountOpen(false)}
              className="ec-auth-card__close"
              aria-label="Close"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
            <p className="ec-auth-card__brand">
              Ecommerce <span className="ec-brand-accent">Store</span>
            </p>
            <p className="ec-auth-card__banner-title">
              {signedInAs ? 'Your account' : 'Welcome back'}
            </p>
            <p className="ec-auth-card__banner-lead">
              {signedInAs
                ? 'Manage orders, lists, and checkout preferences in this demo.'
                : 'Sign in for faster checkout, order tracking, and festival deals.'}
            </p>
          </div>

          <div className="ec-auth-card__body">
            <h2 id="ec-auth-title" className="ec-auth-card__heading">
              {signedInAs ? `Hello, ${signedInAs}` : 'Sign in to Ecommerce Store'}
            </h2>

            {signedInAs ? (
              <div className="ec-auth-signed">
                <ul className="ec-auth-benefits" aria-label="Account perks">
                  <li>
                    <ShieldCheck className="h-4 w-4" aria-hidden />
                    Secure demo checkout
                  </li>
                  <li>
                    <Truck className="h-4 w-4" aria-hidden />
                    Saved delivery preferences
                  </li>
                  <li>
                    <Tag className="h-4 w-4" aria-hidden />
                    Festival offers unlocked
                  </li>
                </ul>
                <button type="button" onClick={signOut} className="ec-auth-btn ec-auth-btn--ghost">
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <div className="ec-auth-tabs" role="tablist" aria-label="Sign in method">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'email'}
                    className={`ec-auth-tab${mode === 'email' ? ' ec-auth-tab--active' : ''}`}
                    onClick={() => {
                      setMode('email');
                      setError(null);
                    }}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'phone'}
                    className={`ec-auth-tab${mode === 'phone' ? ' ec-auth-tab--active' : ''}`}
                    onClick={() => {
                      setMode('phone');
                      setError(null);
                    }}
                  >
                    Mobile
                  </button>
                </div>

                <form className="ec-auth-form" onSubmit={submitLogin} noValidate>
                  <label className="ec-auth-field">
                    <span>{mode === 'email' ? 'Email address' : 'Mobile number'}</span>
                    <input
                      ref={firstFieldRef}
                      type={mode === 'email' ? 'email' : 'tel'}
                      inputMode={mode === 'email' ? 'email' : 'numeric'}
                      autoComplete={mode === 'email' ? 'email' : 'tel'}
                      value={identifier}
                      onChange={(e) => {
                        setIdentifier(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder={mode === 'email' ? 'you@example.com' : '10-digit mobile'}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? 'ec-auth-error' : undefined}
                    />
                  </label>

                  <label className="ec-auth-field">
                    <span>Password</span>
                    <span className="ec-auth-password">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (error) setError(null);
                        }}
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        className="ec-auth-password__toggle"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </span>
                  </label>

                  <div className="ec-auth-row">
                    <label className="ec-auth-remember">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                      />
                      Keep me signed in
                    </label>
                    <button
                      type="button"
                      className="ec-auth-link"
                      onClick={() => setError('Demo only — password reset is illustrative.')}
                    >
                      Forgot password?
                    </button>
                  </div>

                  {error ? (
                    <p id="ec-auth-error" className="ec-auth-error" role="alert">
                      {error}
                    </p>
                  ) : null}

                  <button type="submit" className="ec-auth-btn ec-auth-btn--primary">
                    Continue
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </form>

                <div className="ec-auth-divider" aria-hidden>
                  <span>or continue with</span>
                </div>

                <div className="ec-auth-social">
                  <button
                    type="button"
                    className="ec-auth-social__btn"
                    onClick={() => signIn('Google Shopper')}
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    className="ec-auth-social__btn"
                    onClick={() => signIn('Apple Shopper')}
                  >
                    Apple
                  </button>
                </div>

                <p className="ec-auth-footnote">
                  New to Ecommerce Store?{' '}
                  <button
                    type="button"
                    className="ec-auth-link"
                    onClick={() => signIn('New Shopper')}
                  >
                    Create an account
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PincodeModal() {
  const { pincodeOpen, setPincodeOpen, pincode, setPincode, showToast } = useEcommerceDemo();

  if (!pincodeOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="fixed inset-0 bg-black/50"
        onClick={() => setPincodeOpen(false)}
        aria-label="Close"
      />
      <div className="relative mx-auto my-auto flex min-h-[calc(100dvh-1.5rem)] items-center justify-center">
        <div className="relative w-full max-w-sm rounded-lg ec-bg-surface p-5 shadow-xl sm:p-6">
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
                    pincode === p
                      ? 'border-[#e77600] ec-highlight font-semibold'
                      : 'ec-border border'
                  }`}
                >
                  {p}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function OrdersPanel() {
  const { ordersOpen, setOrdersOpen, demoOrders } = useEcommerceDemo();

  if (!ordersOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="fixed inset-0 bg-black/50"
        onClick={() => setOrdersOpen(false)}
        aria-label="Close"
      />
      <div className="relative mx-auto flex min-h-[calc(100dvh-1.5rem)] items-center justify-center py-2">
        <div className="relative max-h-[min(80vh,100%)] w-full max-w-md overflow-y-auto rounded-lg ec-bg-surface p-5 shadow-xl sm:p-6">
          <button
            type="button"
            onClick={() => setOrdersOpen(false)}
            className="absolute right-3 top-3"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-bold ec-text">Your orders</h2>
          {demoOrders.length === 0 ? (
            <p className="mt-4 text-sm ec-text-muted">
              No orders yet. Pay with Razorpay from the cart to place a demo order.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {demoOrders.map((order) => (
                <li key={order.id} className="rounded-sm border ec-border border p-3 text-sm">
                  <p className="font-semibold ec-link">
                    Paid · {formatInr(order.total)}
                    <span className="ec-text-muted ml-1 text-xs font-normal">
                      ·{' '}
                      {order.mode === 'razorpay'
                        ? 'Razorpay'
                        : order.mode === 'mock-upi'
                          ? 'UPI demo'
                          : 'Card demo'}
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
          <ShowcaseLink
            href="/contact?intent=ecommerce&source=showcase-orders"
            className="mt-4 inline-block text-sm ec-link hover:underline"
          >
            Need a real store? Talk to Bitcraftly →
          </ShowcaseLink>
        </div>
      </div>
    </div>
  );
}

export function ProductModal() {
  const { productModal, setProductModal, addToCart, checkoutBusy, startRazorpayCheckout } =
    useEcommerceDemo();

  if (!productModal) return null;

  const pct = discountPct(productModal.price, productModal.list);

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="fixed inset-0 bg-black/50"
        onClick={() => setProductModal(null)}
        aria-label="Close"
      />
      <div className="relative mx-auto flex min-h-[calc(100dvh-1.5rem)] items-center justify-center py-2">
        <div className="relative grid w-full max-w-2xl gap-4 rounded-lg ec-bg-surface p-4 shadow-xl sm:p-6 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setProductModal(null)}
            className="absolute right-3 top-3 z-10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <EcommerceProductImage
            product={productModal}
            eager
            className="aspect-square rounded-sm"
          />
          <div>
            <h2 className="pr-8 text-base font-medium leading-snug sm:text-lg">
              {productModal.title}
            </h2>
            <p className="mt-3 text-xl font-normal sm:text-2xl">{formatInr(productModal.price)}</p>
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
    </div>
  );
}
