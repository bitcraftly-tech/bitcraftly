import Image from "next/image";

export type BitcraftlyLogoMarkImageSize = "xs" | "nav" | "sm" | "md";

type BitcraftlyLogoMarkImageProps = {
  className?: string;
  size?: BitcraftlyLogoMarkImageSize;
  priority?: boolean;
};

const SIZES_PX: Record<BitcraftlyLogoMarkImageSize, number> = {
  xs: 28,
  nav: 32,
  sm: 40,
  md: 72,
};

const LOGO_SRC = "/brand/bitcraftly-mark.png";

/** Static logo mark — no client JS / motion (navbar, SSR-critical paths). */
export default function BitcraftlyLogoMarkImage({
  className = "",
  size = "nav",
  priority = false,
}: BitcraftlyLogoMarkImageProps) {
  const px = SIZES_PX[size];

  return (
    <Image
      src={LOGO_SRC}
      alt=""
      width={px}
      height={px}
      className={`block shrink-0 ${className}`}
      style={{ width: px, height: px }}
      priority={priority || size === "nav"}
      aria-hidden
    />
  );
}
