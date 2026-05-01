type HeroProps = {
  restaurantName: string;
  whatsappUrl: string;
  demoUrl: string;
};

export default function Hero({ restaurantName, whatsappUrl, demoUrl }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_45%)]" />
      <div className="relative">
        <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-600">
          Restaurant Demo
        </p>
        <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
          {restaurantName}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
          Order directly without commission
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Order on WhatsApp
          </a>
          <a
            href={demoUrl}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Get Free Demo
          </a>
        </div>
      </div>
    </section>
  );
}
