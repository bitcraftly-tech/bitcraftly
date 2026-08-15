'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Tag,
  Truck,
  X,
} from 'lucide-react';

import ShowcaseLink from '@bitcraftly/showcase-shared/ShowcaseLink';
import {
  EcommerceWhatsAppGlyph,
  ecommerceWhatsAppUrl,
} from '@bitcraftly/showcase-ecommerce-store/components/ecommerce/EcommerceWhatsAppFab';
import { formatInr, discountPct, formatIndianNumber, PINCODES } from './ecommerce-demo-data';
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
              className="ec-btn-cart ec-btn-cart--solid mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
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
      className={`ec-auth-modal${entered ? ' ec-auth-modal--open' : ''}`}
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
        <div className="ec-auth-card">
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

  useEffect(() => {
    if (!pincodeOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [pincodeOpen]);

  useEffect(() => {
    if (!pincodeOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPincodeOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pincodeOpen, setPincodeOpen]);

  if (!pincodeOpen) return null;

  return (
    <div
      className="ec-overlay-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ec-pincode-title"
    >
      <button
        type="button"
        className="ec-overlay-modal__backdrop"
        onClick={() => setPincodeOpen(false)}
        aria-label="Close delivery location"
      />
      <div className="ec-overlay-modal__frame">
        <div className="ec-overlay-modal__card">
          <button
            type="button"
            className="ec-overlay-modal__close"
            onClick={() => setPincodeOpen(false)}
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          <h2 id="ec-pincode-title" className="ec-overlay-modal__title">
            Choose delivery location
          </h2>
          <ul className="ec-overlay-modal__list">
            {PINCODES.map((p) => (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => {
                    setPincode(p);
                    setPincodeOpen(false);
                    showToast(`Delivering to ${p}`);
                  }}
                  className={`ec-overlay-modal__option${pincode === p ? ' is-selected' : ''}`}
                  aria-pressed={pincode === p}
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

  useEffect(() => {
    if (!ordersOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [ordersOpen]);

  useEffect(() => {
    if (!ordersOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOrdersOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ordersOpen, setOrdersOpen]);

  if (!ordersOpen) return null;

  return (
    <div
      className="ec-overlay-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ec-orders-title"
    >
      <button
        type="button"
        className="ec-overlay-modal__backdrop"
        onClick={() => setOrdersOpen(false)}
        aria-label="Close orders"
      />
      <div className="ec-overlay-modal__frame">
        <div className="ec-overlay-modal__card ec-overlay-modal__card--wide">
          <button
            type="button"
            className="ec-overlay-modal__close"
            onClick={() => setOrdersOpen(false)}
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          <h2 id="ec-orders-title" className="ec-overlay-modal__title">
            Your orders
          </h2>
          {demoOrders.length === 0 ? (
            <p className="mt-4 text-sm ec-text-muted">
              No orders yet. Pay with Razorpay from the cart to place a demo order.
            </p>
          ) : (
            <ul className="mt-4 max-h-[min(50vh,24rem)] space-y-3 overflow-y-auto text-sm">
              {demoOrders.map((order) => (
                <li key={order.id} className="rounded-sm border ec-border border p-3">
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
  const [rendered, setRendered] = useState(false);
  const [entered, setEntered] = useState(false);
  const [activeProduct, setActiveProduct] = useState(productModal);

  useEffect(() => {
    if (productModal) {
      setActiveProduct(productModal);
      setRendered(true);
      const frame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setEntered(true));
      });
      return () => window.cancelAnimationFrame(frame);
    }

    setEntered(false);
    const timer = window.setTimeout(() => {
      setRendered(false);
      setActiveProduct(null);
    }, 280);
    return () => window.clearTimeout(timer);
  }, [productModal]);

  useEffect(() => {
    if (!rendered) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [rendered]);

  useEffect(() => {
    if (!rendered) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProductModal(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [rendered, setProductModal]);

  if (!rendered || !activeProduct) return null;

  const pct = discountPct(activeProduct.price, activeProduct.list);
  const ratingFull = Math.floor(activeProduct.rating);
  const whatsappHref = ecommerceWhatsAppUrl(
    `Hi Ecommerce Store! I have a question about “${activeProduct.title}” (${formatInr(activeProduct.price)}).`,
  );

  return (
    <div
      className={`ec-overlay-modal ec-overlay-modal--product${entered ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ec-product-title"
    >
      <button
        type="button"
        className="ec-overlay-modal__backdrop"
        onClick={() => setProductModal(null)}
        aria-label="Close product"
      />
      <div className="ec-overlay-modal__frame">
        <article className="ec-product-qv">
          <button
            type="button"
            className="ec-product-qv__close"
            onClick={() => setProductModal(null)}
            aria-label="Close"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>

          <div className="ec-product-qv__media">
            <EcommerceProductImage product={activeProduct} eager className="ec-product-qv__image" />
            {pct > 0 ? <span className="ec-product-qv__badge">{pct}% off</span> : null}
          </div>

          <div className="ec-product-qv__body">
            <p className="ec-product-qv__dept">{activeProduct.department}</p>
            <h2 id="ec-product-title" className="ec-product-qv__title">
              {activeProduct.title}
            </h2>

            <div
              className="ec-product-qv__rating"
              aria-label={`${activeProduct.rating.toFixed(1)} out of 5 stars, ${formatIndianNumber(activeProduct.count)} ratings`}
            >
              <span className="ec-product-qv__stars" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`ec-product-qv__star${i < ratingFull ? ' is-filled' : ''}`}
                  />
                ))}
              </span>
              <span className="ec-product-qv__rating-text">
                {activeProduct.rating.toFixed(1)} · {formatIndianNumber(activeProduct.count)}{' '}
                ratings
              </span>
            </div>

            <div className="ec-product-qv__price-block">
              <p className="ec-product-qv__price">{formatInr(activeProduct.price)}</p>
              <p className="ec-product-qv__mrp">
                M.R.P. <span className="line-through">{formatInr(activeProduct.list)}</span>
                {pct > 0 ? <span className="ec-sale-text"> Save {pct}%</span> : null}
              </p>
            </div>

            <p className="ec-product-qv__delivery">
              <Truck className="ec-product-qv__delivery-icon" aria-hidden />
              <span>{activeProduct.delivery}</span>
            </p>

            <ul className="ec-product-qv__perks">
              <li>
                <ShieldCheck aria-hidden />
                Secure checkout
              </li>
              <li>
                <RotateCcw aria-hidden />
                Easy returns
              </li>
              <li>
                <Tag aria-hidden />
                Festival pricing
              </li>
            </ul>

            <div className="ec-product-qv__actions">
              <button
                type="button"
                onClick={() => {
                  addToCart(activeProduct);
                  setProductModal(null);
                }}
                className="ec-product-qv__btn ec-product-qv__btn--cart"
              >
                <ShoppingCart className="h-4 w-4" aria-hidden />
                Add to Cart
              </button>
              <button
                type="button"
                disabled={checkoutBusy}
                onClick={() => {
                  setProductModal(null);
                  void startRazorpayCheckout({ addProduct: activeProduct });
                }}
                className="ec-product-qv__btn ec-product-qv__btn--buy"
              >
                Buy Now
              </button>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ec-product-qv__whatsapp"
            >
              <EcommerceWhatsAppGlyph className="ec-product-qv__whatsapp-icon" />
              <span className="ec-product-qv__whatsapp-label ec-product-qv__whatsapp-label--short">
                WhatsApp enquiry
              </span>
              <span className="ec-product-qv__whatsapp-label ec-product-qv__whatsapp-label--long">
                Ask about this product on WhatsApp
              </span>
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
