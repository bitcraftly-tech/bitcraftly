import Image from "next/image";

import { FOUNDER } from "@/lib/siteContent";

type FounderAvatarProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "h-14 w-14 rounded-2xl",
  md: "h-20 w-20 rounded-2xl",
  lg: "h-28 w-28 rounded-2xl sm:h-32 sm:w-32",
} as const;

export default function FounderAvatar({ size = "lg", className = "" }: FounderAvatarProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden border border-border-primary bg-bg-secondary shadow-md dark:border-dark-border-primary dark:bg-dark-bg-secondary ${sizeClasses[size]} ${className}`}
    >
      <Image
        src={FOUNDER.photoSrc}
        alt={FOUNDER.photoAlt}
        fill
        sizes={
          size === "lg"
            ? "(max-width: 640px) 112px, 128px"
            : size === "sm"
              ? "56px"
              : "80px"
        }
        className="object-cover object-[center_18%]"
        priority={size === "lg"}
      />
    </div>
  );
}
