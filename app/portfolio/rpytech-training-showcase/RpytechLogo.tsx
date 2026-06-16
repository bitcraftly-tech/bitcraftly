import Image from "next/image";

import { RPYTECH } from "@/lib/rpytechShowcaseData";

type RpytechLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "nav" | "footer";
};

const VARIANT_CLASS = {
  nav: "h-11 w-11 sm:h-12 sm:w-12",
  footer: "h-12 w-12",
} as const;

export default function RpytechLogo({
  className,
  priority,
  variant = "nav",
}: RpytechLogoProps) {
  return (
    <Image
      src={RPYTECH.logoUrl}
      alt={`${RPYTECH.brand} — Technical & Training Services`}
      width={500}
      height={500}
      sizes="48px"
      className={`shrink-0 rounded-md object-contain object-center ${VARIANT_CLASS[variant]}${className ? ` ${className}` : ""}`}
      priority={priority}
    />
  );
}
