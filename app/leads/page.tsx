import LeadCaptureForm from "@/components/LeadCaptureForm";

export default function LeadsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-5 text-zinc-100 sm:px-6">
      <section className="mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-zinc-900/80 p-6 shadow-xl shadow-black/20 sm:p-8">
        <p className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
          Lead Form
        </p>
        <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">Connect With Us</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Share your details and we will contact you quickly.
        </p>

        <div className="mt-6">
          <LeadCaptureForm />
        </div>
      </section>
    </main>
  );
}
