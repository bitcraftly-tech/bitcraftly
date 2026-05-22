import Link from "next/link";

import BitcraftlyLogoMark from "@/components/brand/BitcraftlyLogoMark";

export function ContactLogoMark({ className = "" }: { className?: string }) {
  return <BitcraftlyLogoMark size="sm" className={className} />;
}

export default function ContactBrandHeader() {
  return (
    <Link href="/" className="flex items-center gap-3 transition opacity-90 hover:opacity-100">
      <ContactLogoMark />
      <div>
        <p className="text-base font-bold text-[#111827]">Bitcraftly</p>
        <p className="text-xs text-[#6B7280]">Digital Solutions for Modern Businesses</p>
      </div>
    </Link>
  );
}
