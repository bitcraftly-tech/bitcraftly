"use client";

import Image from "next/image";

import { MASCOT } from "@/lib/mascotAssets";

type BitBotAvatarProps = {
  size?: number;
  className?: string;
};

/** Small circular avatar for chat header and message bubbles */
export function BitBotAvatar({ size = 36, className = "" }: BitBotAvatarProps) {
  return (
    <Image
      src={MASCOT.avatar}
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`shrink-0 rounded-full object-cover object-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    />
  );
}

type BitBotChatTriggerProps = {
  className?: string;
};

/** Full Ask BitBot mascot for the floating chat trigger */
export function BitBotChatTrigger({ className = "" }: BitBotChatTriggerProps) {
  return (
    <Image
      src={MASCOT.chat}
      alt="Ask BitBot"
      width={132}
      height={148}
      sizes="(max-width: 767px) 58px, 66px"
      className={`bc-chat-bubble-img ${className}`}
      loading="lazy"
    />
  );
}
