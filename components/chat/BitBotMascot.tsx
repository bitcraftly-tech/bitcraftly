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
      src={MASCOT.hero}
      alt=""
      width={size}
      height={size}
      className={`rounded-full bg-[#eef2ff] object-contain object-center p-0.5 ${className}`}
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
      width={156}
      height={196}
      className={`bc-chat-bubble-img ${className}`}
      priority
    />
  );
}
