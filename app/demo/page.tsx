"use client";

import Hero from "@/components/Hero";
import MenuCard, { type MenuItem } from "@/components/MenuCard";
import CTA from "@/components/CTA";
import { useTenant } from "@/hooks/useTenant";

const WHATSAPP_URL = "https://wa.me/919667710954?text=I%20want%20to%20order";

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: "₹299",
    image: "https://placehold.co/600x400?text=Margherita+Pizza",
  },
  {
    id: 2,
    name: "Paneer Tikka Wrap",
    price: "₹219",
    image: "https://placehold.co/600x400?text=Paneer+Tikka+Wrap",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    price: "₹349",
    image: "https://placehold.co/600x400?text=Chicken+Biryani",
  },
  {
    id: 4,
    name: "Veg Burger",
    price: "₹179",
    image: "https://placehold.co/600x400?text=Veg+Burger",
  },
  {
    id: 5,
    name: "Cold Coffee",
    price: "₹129",
    image: "https://placehold.co/600x400?text=Cold+Coffee",
  },
  {
    id: 6,
    name: "Chocolate Brownie",
    price: "₹149",
    image: "https://placehold.co/600x400?text=Chocolate+Brownie",
  },
];

export default function DemoPage() {
  const { tenant, slug, isLoading, error } = useTenant();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
          Loading tenant...
        </div>
      </main>
    );
  }

  if (!slug) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Main Landing Page</h1>
          <p className="mt-2 text-sm text-slate-600">
            Open this page from a tenant subdomain to load tenant-specific demo data.
          </p>
        </div>
      </main>
    );
  }

  if (error || !tenant) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-xl rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Tenant not found</h1>
          <p className="mt-2 text-sm text-red-600">{error ?? "Invalid tenant"}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <Hero
          restaurantName={tenant.name}
          whatsappUrl={WHATSAPP_URL}
          demoUrl="#contact-demo"
        />

        <section className="mt-12">
          <div className="mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Menu</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Popular Items</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <div id="contact-demo" className="mt-12">
          <CTA whatsappUrl={WHATSAPP_URL} />
        </div>
      </div>
    </main>
  );
}
