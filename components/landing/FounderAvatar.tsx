import Image from "next/image";

import { FOUNDER } from "@/lib/siteContent";

type FounderAvatarProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

/** Tuned for /images/founder/sanjay-kr-singh.png — subject sits slightly left, face upper-third */
const FOUNDER_PHOTO_CLASS = "object-cover object-[46%_14%] scale-[1.14]";

const sizeClasses = {
  sm: "h-[4.25rem] w-[4.25rem] rounded-2xl",
  md: "h-20 w-20 rounded-2xl",
  lg: "h-[7.25rem] w-[7.25rem] rounded-[1.35rem] sm:h-36 sm:w-36",
} as const;

const imageSizes = {
  sm: "68px",
  md: "80px",
  lg: "(max-width: 640px) 116px, 144px",
} as const;

export default function FounderAvatar({ size = "lg", className = "" }: FounderAvatarProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden border border-border-primary/80 bg-bg-secondary shadow-[0_4px_16px_rgba(15,23,42,0.08)] dark:border-dark-border-primary/80 dark:bg-dark-bg-secondary ${sizeClasses[size]} ${className}`}
    >
      <Image
        src={FOUNDER.photoSrc}
        alt={FOUNDER.photoAlt}
        fill
        quality={92}
        sizes={imageSizes[size]}
        className={FOUNDER_PHOTO_CLASS}
        priority={size === "lg"}
      />
    </div>
  );
}
