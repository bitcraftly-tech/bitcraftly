type CTAProps = {
  whatsappUrl: string;
};

export default function CTA({ whatsappUrl }: CTAProps) {
  return (
    <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6 text-center sm:p-10">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Get your own website like this
      </h2>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
      >
        Contact on WhatsApp
      </a>
    </section>
  );
}
