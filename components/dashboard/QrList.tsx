import { type QRContact } from "@/hooks/useDashboardQueries";

const PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_PUBLIC_BASE_URL ?? "https://bitcraftly.com";

type QrListProps = {
  qrContacts: QRContact[];
};

export default function QrList({ qrContacts }: QrListProps) {
  if (!qrContacts.length) {
    return <p className="text-sm text-text-secondary dark:text-dark-text-secondary">No QR contacts created yet.</p>;
  }

  return (
    <div className="space-y-3">
      {qrContacts.map((qr) => (
        <article key={qr.id} className="rounded-lg border border-border-primary bg-bg-secondary p-4 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
          <p className="text-xs uppercase tracking-wider text-text-tertiary dark:text-dark-text-tertiary">Code</p>
          <p className="mt-1 font-mono text-sm text-[#2B5CE6]">{qr.code}</p>
          <p className="mt-3 text-xs uppercase tracking-wider text-text-tertiary dark:text-dark-text-tertiary">Destination</p>
          <p className="mt-1 text-sm text-text-primary dark:text-dark-text-primary">{qr.destination_phone}</p>
          <a
            href={`${PUBLIC_BASE_URL.replace(/\/$/, "")}/qr/${qr.code}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm text-[#2B5CE6] underline underline-offset-2"
          >
            Open redirect
          </a>
        </article>
      ))}
    </div>
  );
}
