import type { ReactElement, SVGProps } from "react";
import { cn } from "@/lib/cn";

type TechLogoProps = SVGProps<SVGSVGElement> & {
  title: string;
};

function TechLogoSvg({ title, className, children, ...props }: TechLogoProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
      {...props}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

const logos: Record<string, (className?: string) => ReactElement> = {
  react: (className) => (
    <TechLogoSvg title="React" className={className}>
      <circle cx="16" cy="16" r="2.2" fill="#61DAFB" />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="4.5"
        stroke="#61DAFB"
        strokeWidth="1.6"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="4.5"
        stroke="#61DAFB"
        strokeWidth="1.6"
        transform="rotate(60 16 16)"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="4.5"
        stroke="#61DAFB"
        strokeWidth="1.6"
        transform="rotate(120 16 16)"
      />
    </TechLogoSvg>
  ),
  nextjs: (className) => (
    <TechLogoSvg title="Next.js" className={className}>
      <circle cx="16" cy="16" r="12" fill="#0F172A" />
      <path
        d="M13 10.5h2.1l5.4 8.2V10.5H22.5V21.5h-2.1L15 13.3v8.2H13V10.5z"
        fill="#fff"
      />
    </TechLogoSvg>
  ),
  typescript: (className) => (
    <TechLogoSvg title="TypeScript" className={className}>
      <rect x="4" y="4" width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M14.2 14.2h-2.8v-1.5H20v1.5h-2.8v8.3h-3V14.2zm7.4 5.2c.3.2.7.3 1.2.3.5 0 .8-.2.8-.5 0-.3-.2-.5-.7-.7l-1-.4c-1.1-.4-1.6-1.1-1.6-2.1 0-1.2 1-2.1 2.6-2.1.8 0 1.5.2 2.1.5l-.7 1.5c-.3-.2-.7-.3-1.2-.3-.5 0-.7.2-.7.5 0 .3.2.5.8.7l1 .4c1.2.5 1.7 1.1 1.7 2.2 0 1.3-1 2.2-2.8 2.2-.9 0-1.7-.2-2.4-.6l.9-1.6z"
        fill="#fff"
      />
    </TechLogoSvg>
  ),
  "tailwind-css": (className) => (
    <TechLogoSvg title="Tailwind CSS" className={className}>
      <path
        fill="#38BDF8"
        d="M16 8c-4 0-6.5 2-7.5 6 1.5-2 3.2-2.8 5.2-2.3 1.1.3 2 1.1 2.9 2.1C18.3 15.7 20 17 23.5 17c4 0 6.5-2 7.5-6-1.5 2-3.2 2.8-5.2 2.3-1.1-.3-2-1.1-2.9-2.1C19.2 9.3 17.5 8 16 8zm-7.5 7c-4 0-6.5 2-7.5 6 1.5-2 3.2-2.8 5.2-2.3 1.1.3 2 1.1 2.9 2.1C10.8 22.7 12.5 24 16 24c4 0 6.5-2 7.5-6-1.5 2-3.2 2.8-5.2 2.3-1.1-.3-2-1.1-2.9-2.1C13.7 16.3 12 15 8.5 15z"
      />
    </TechLogoSvg>
  ),
  vuejs: (className) => (
    <TechLogoSvg title="Vue.js" className={className}>
      <path fill="#41B883" d="M16 25 3 5h6.5L16 15.5 22.5 5H29L16 25z" />
      <path fill="#35495E" d="M16 25 9.5 5H13l3 5.8L19 5h3.5L16 25z" />
    </TechLogoSvg>
  ),
  nodejs: (className) => (
    <TechLogoSvg title="Node.js" className={className}>
      <path
        fill="#339933"
        d="M15.4 4.3a1.4 1.4 0 0 1 1.2 0l9.2 5.3c.4.2.6.6.6 1v10.7c0 .4-.2.8-.6 1l-9.2 5.3a1.4 1.4 0 0 1-1.2 0l-9.2-5.3a1.2 1.2 0 0 1-.6-1V10.6c0-.4.2-.8.6-1l9.2-5.3z"
      />
      <path
        fill="#fff"
        d="M18.2 18.8c0 1.4-.9 2.3-2.5 2.3-1.1 0-1.9-.4-2.4-1.1l1.3-.8c.3.4.7.7 1.2.7.6 0 1-.3 1-.9v-4.7h1.4v4.5zm2.1 2.2c-1.3 0-2.1-.6-2.5-1.3l1.3-.7c.2.4.6.7 1.2.7.5 0 .8-.2.8-.5 0-.3-.2-.5-.9-.7l-.7-.3c-1.1-.4-1.8-1.1-1.8-2.2 0-1.2 1-2.1 2.4-2.1.9 0 1.6.3 2.1.9l-1.2.8c-.3-.3-.6-.5-1-.5-.4 0-.7.2-.7.5 0 .3.2.5.9.7l.7.3c1.2.5 1.8 1.1 1.8 2.3 0 1.3-1 2.1-2.4 2.1z"
      />
    </TechLogoSvg>
  ),
  python: (className) => (
    <TechLogoSvg title="Python" className={className}>
      <path
        fill="#3776AB"
        d="M16 5c-5 0-4.7 2.2-4.7 2.2v2.3h4.8v.7H9.2S6 10 6 15.2s2.7 5 2.7 5h1.6v-2.4s-.1-2.7 2.7-2.7h4.6s2.6.1 2.6-2.6V7.4S20.9 5 16 5zm-2.6 1.6a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"
      />
      <path
        fill="#FFD43B"
        d="M16 27c5 0 4.7-2.2 4.7-2.2v-2.3h-4.8v-.7h7c0 0 3.1.2 3.1-5S23.3 12 23.3 12h-1.6v2.4s.1 2.7-2.7 2.7h-4.6s-2.6-.1-2.6 2.6v4.5S11.1 27 16 27zm2.6-1.6a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z"
      />
    </TechLogoSvg>
  ),
  nestjs: (className) => (
    <TechLogoSvg title="NestJS" className={className}>
      <path
        fill="#E0234E"
        d="M16.2 5.2c.3-.2.7-.2 1 0 2.8 1.7 7.6 5.4 8.6 10.2.6 2.8-.2 5.5-2.2 7.3-1.7 1.5-3.9 2.1-6.2 1.6-.4-.1-.7-.5-.6-.9.1-.4.5-.7.9-.6 1.8.4 3.5-.1 4.8-1.3 1.5-1.3 2.1-3.4 1.6-5.5-.8-3.7-4.7-6.9-7.1-8.4L9.8 13.6v7.1c0 .4-.3.8-.8.8s-.8-.3-.8-.8V12.5c0-.3.1-.5.3-.7l7.7-6.6z"
      />
      <path
        fill="#E0234E"
        d="M14.8 10.2c.4 0 .8.3.8.8v9.4c0 2.2-1.4 3.6-3.5 3.6S8.6 22.6 8.6 20.4c0-.4.3-.8.8-.8s.8.3.8.8c0 1.3.7 2.1 1.9 2.1s1.9-.8 1.9-2.1v-9.4c0-.4.3-.8.8-.8z"
      />
    </TechLogoSvg>
  ),
  express: (className) => (
    <TechLogoSvg title="Express" className={className}>
      <rect x="4" y="4" width="24" height="24" rx="5" fill="#0F172A" />
      <path
        fill="#fff"
        d="M8.5 18.5 12 13l3.5 5.5h-2.1l-1.4-2.3-1.4 2.3H8.5zm8.2 0V11h1.8v6.1h3.4v1.4h-5.2z"
      />
    </TechLogoSvg>
  ),
  fastapi: (className) => (
    <TechLogoSvg title="FastAPI" className={className}>
      <circle cx="16" cy="16" r="12" fill="#009688" />
      <path
        fill="#fff"
        d="M15.2 8.5h1.6v6.2l4.4 4.4-1.1 1.1-4.9-4.9V8.5z"
      />
    </TechLogoSvg>
  ),
  mongodb: (className) => (
    <TechLogoSvg title="MongoDB" className={className}>
      <path
        fill="#10AA50"
        d="M16.4 5s.4 3.2 0 5.4c-.5 2.6-1.9 3.4-1.9 5.5 0 2.7 1.5 3.6 1.5 3.6s1.6-1 1.6-3.7c0-2.1-1.4-3-1.9-5.5-.3-2 .7-5.3.7-5.3z"
      />
      <path
        fill="#B8C4C2"
        d="M15.8 25.5s.1-1.8.3-2.5c.1-.4.4-.3.4 0 .1.7.3 2.5.3 2.5l-.5.7-.5-.7z"
      />
    </TechLogoSvg>
  ),
  postgresql: (className) => (
    <TechLogoSvg title="PostgreSQL" className={className}>
      <path
        fill="#336791"
        d="M21.8 8.4c-.6-.8-1.9-1.1-3.1-.9-.4-1.1-1.2-2-2.4-2.5-1.4-.5-2.9-.3-3.9.6-.8-.4-1.8-.4-2.6 0-.9.5-1.4 1.4-1.4 2.4v.4c-1.3.4-2.1 1.3-2.2 2.5-.1 1.1.4 2.1 1.3 2.7-.2.5-.2 1.1 0 1.6.4 1 1.4 1.6 2.5 1.6h.2c.2.8.7 1.5 1.4 1.9-.1.9.1 1.9.8 2.6.6.6 1.5.9 2.4.8.3 1.1 1.3 1.8 2.5 1.8h.4c1.3 0 2.4-.9 2.7-2.1.9.1 1.8-.2 2.4-.9.6-.7.8-1.6.6-2.5 1-.3 1.7-1.1 1.9-2.1.2-1.1-.2-2.2-1.1-2.8.2-.6.2-1.2 0-1.8.4-.6.4-1.4.1-2.1z"
      />
      <circle cx="13.2" cy="13.2" r="1.1" fill="#fff" />
      <circle cx="18.8" cy="13.2" r="1.1" fill="#fff" />
    </TechLogoSvg>
  ),
  mysql: (className) => (
    <TechLogoSvg title="MySQL" className={className}>
      <path
        fill="#00758F"
        d="M8.2 20.5c.4.1 1 .2 1.4.2 1.1 0 1.7-.4 2.2-1.5l2.4-5.6.3-.6c-1.7 1.3-3.2 3.3-3.8 5.1-.2.6-.4 1-.7 1.2-.3.2-.8.3-1.4.2l-.4 1zm8.1-9.7c-.7 0-1.3.1-1.7.3l-.3-1.4h-2l.1.6c-.6.3-1.3 1.1-1.7 2l-2.9 6.9h2.1l.8-2h2.9c.2.6.3 1.2.4 1.6l.1.4h2.2c-.3-1.1-.8-3.1-1.6-5.3-.5-1.4-.9-2.5-.9-3.1 0-.6.3-.9 1.1-.9.2 0 .5 0 .8.1l.5-1.5c-.6-.2-1.2-.3-1.9-.3zm1.8-.2 1.8 5.5c.4 1.3.8 2.5 1 3.4h2.1c-.3-1.1-.8-2.6-1.4-4.2l-1.6-4.7h-1.9z"
      />
      <path
        fill="#F29111"
        d="M24.5 10.8c-1.6 0-2.8.8-3.4 1.5l.9 1.1c.5-.5 1.3-1 2.1-.9.8.1 1.2.6 1.2 1.2 0 .5-.3.9-1.3 1.5l-.7.4c-1.5.9-2.1 1.8-2.1 3.1 0 1.8 1.3 3 3.3 3 1.1 0 2-.3 2.7-.8l-.8-1.2c-.6.4-1.3.6-2 .6-.9 0-1.4-.5-1.4-1.2 0-.5.3-1 1.3-1.6l.7-.4c1.6-.9 2.3-1.8 2.3-3.2 0-1.9-1.4-3.1-3.8-3.1z"
      />
    </TechLogoSvg>
  ),
  redis: (className) => (
    <TechLogoSvg title="Redis" className={className}>
      <path
        fill="#DC382D"
        d="M6.5 12.2 16 8.5l9.5 3.7-9.5 3.7-9.5-3.7z"
      />
      <path
        fill="#A41E11"
        d="M6.5 12.2v4.2L16 20.1l9.5-3.7v-4.2L16 15.9 6.5 12.2z"
      />
      <path
        fill="#DC382D"
        d="M6.5 16.4v4.2L16 24.3l9.5-3.7v-4.2L16 20.1 6.5 16.4z"
      />
    </TechLogoSvg>
  ),
  firebase: (className) => (
    <TechLogoSvg title="Firebase" className={className}>
      <path fill="#FFA000" d="m8.5 22.5 3.2-15.2L15 14.2l-6.5 8.3z" />
      <path fill="#F57C00" d="m8.5 22.5 12.2-4.2-5.7-4.1-6.5 8.3z" />
      <path fill="#FFCA28" d="m11.7 7.3 3.3 6.9 5.7 4.1L11.7 7.3z" />
    </TechLogoSvg>
  ),
  aws: (className) => (
    <TechLogoSvg title="AWS" className={className}>
      <path
        fill="#232F3E"
        d="M10.5 18.2c0 .5.1.8.2 1 .1.3.3.5.5.6l-.6.6c-.1-.1-.2-.2-.3-.3-.3-.4-.4-1-.4-1.8 0-1.2.3-2.1 1-2.7.6-.6 1.4-.9 2.3-.9.8 0 1.4.2 1.9.5.5.3.7.9.7 1.5 0 .5-.1 1-.4 1.7l-1.5 3.7h-1.1l.5-1.2c-.3.2-.7.3-1 .3-.8 0-1.2-.5-1.2-1.4zm1.1-.1c0 .5.3.8.7.8.3 0 .5-.1.8-.3l.9-2.4c.1-.4.2-.7.2-.9 0-.5-.3-.7-.7-.7-.5 0-1 .4-1.3 1.1-.1.4-.3.9-.3 1.4.1.3.1.3 0 .3.1 0 .1 0-.3.7z"
      />
      <path
        fill="#FF9900"
        d="M21.2 21.2c-2 1.5-5 2.3-7.6 2.3-3.6 0-6.8-1.3-9.2-3.5-.2-.2 0-.4.2-.3 2.7 1.6 6 2.5 9.4 2.5 2.3 0 4.9-.5 7.2-1.5.3-.1.6.3.6.4.1.1.1.1-.6.1z"
      />
    </TechLogoSvg>
  ),
  azure: (className) => (
    <TechLogoSvg title="Azure" className={className}>
      <path
        fill="#0078D4"
        d="m14.2 6.5 7.6 19H27L16.8 6.5h-2.6zm-1.5 4.2L7 20.8h4.6l1.9-4.2 3.4 8.9h2.6l-6.8-15z"
      />
    </TechLogoSvg>
  ),
  "google-cloud": (className) => (
    <TechLogoSvg title="Google Cloud" className={className}>
      <path
        fill="#4285F4"
        d="M22.5 18.5h-7.2c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h7.2c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"
      />
      <path
        fill="#EA4335"
        d="M12.2 13.2a4.8 4.8 0 0 1 7.2-1.4l2.1-2.1A7.7 7.7 0 0 0 9.4 12l2.8 1.2z"
      />
      <path
        fill="#FBBC05"
        d="M9.4 12a7.7 7.7 0 0 0-.1 2.2l3.1.1A4.8 4.8 0 0 1 12.2 13l-2.8-1z"
      />
      <path
        fill="#34A853"
        d="M16.8 22.5a7.7 7.7 0 0 0 6.7-4H16.8v3.2c0 .3 0 .5 0 .8z"
      />
    </TechLogoSvg>
  ),
  docker: (className) => (
    <TechLogoSvg title="Docker" className={className}>
      <path
        fill="#2496ED"
        d="M18.8 14.2h-2.1v-2h2.1v2zm-2.4 0h-2.1v-2h2.1v2zm-2.4 0H12v-2h2.1v2zm-2.3 0H9.6v-2h2.1v2zm4.7-2.3h-2.1v-2h2.1v2zm-2.4 0h-2.1v-2h2.1v2zm-2.3 0H9.6v-2h2.1v2zm9.1 3.5c-.2-.1-.5-.1-.8 0-.1-1.1-.7-2-1.6-2.5l-.3.7c.7.3 1.1.9 1.2 1.6H8.2c0 .1 0 .2-.1.3-.5 2.1.3 4.3 2.1 5.5 1.4.9 3.2 1.2 5 .9 1.4-.3 2.7-1 3.6-2.1 1-.1 2.1-.5 2.8-1.3.6-.6.6-1.4.3-1.7-.1-.1-.3-.2-.5-.4z"
      />
    </TechLogoSvg>
  ),
  kubernetes: (className) => (
    <TechLogoSvg title="Kubernetes" className={className}>
      <circle cx="16" cy="16" r="11" fill="#326CE5" />
      <path
        fill="#fff"
        d="M16 8.2 17.4 12l3.9.3-3 2.5 1 3.8L16 16.6 12.7 18.6l1-3.8-3-2.5 3.9-.3L16 8.2z"
      />
    </TechLogoSvg>
  ),
  openai: (className) => (
    <TechLogoSvg title="OpenAI" className={className}>
      <path
        fill="#0F172A"
        d="M19.4 8.8a4.2 4.2 0 0 0-6.8-1.5 4.2 4.2 0 0 0-6.3 4.4 4.2 4.2 0 0 0 1.5 7.5 4.2 4.2 0 0 0 6.8 1.5 4.2 4.2 0 0 0 6.3-4.4 4.2 4.2 0 0 0-1.5-7.5zm-2.3 10.2a3.1 3.1 0 0 1-2-.7l.1-.1 3.3-1.9v-3.7l1.4.8v3.8a3.1 3.1 0 0 1-2.8 1.8zm-6.1-.6a3.1 3.1 0 0 1-1.1-4.2l.1.1 3.3 1.9v3.8l-1.4.8a3.1 3.1 0 0 1-.9-2.4zm-.8-6.6 1.4-.8 3.3 1.9v3.8l-1.4.8-3.3-1.9v-3.8zm9.8 2.1-3.3-1.9 1.4-.8 3.3 1.9v3.8l-1.4.8v-3.8zm-3.4-3.6-3.3 1.9-3.3-1.9 1.4-.8 1.9 1.1 1.9-1.1 1.4.8zm-5.9 7.4v-3.8l3.3 1.9v3.8l-1.9 1.1-1.4-.8z"
      />
    </TechLogoSvg>
  ),
  gemini: (className) => (
    <TechLogoSvg title="Gemini" className={className}>
      <path
        fill="url(#gemini-grad)"
        d="M16 5c1.2 4.4 2.6 5.8 7 7-4.4 1.2-5.8 2.6-7 7-1.2-4.4-2.6-5.8-7-7 4.4-1.2 5.8-2.6 7-7z"
      />
      <defs>
        <linearGradient id="gemini-grad" x1="9" y1="5" x2="23" y2="27">
          <stop stopColor="#4B8BFF" />
          <stop offset="0.5" stopColor="#9B6BFF" />
          <stop offset="1" stopColor="#FF6BCB" />
        </linearGradient>
      </defs>
    </TechLogoSvg>
  ),
  claude: (className) => (
    <TechLogoSvg title="Claude" className={className}>
      <path
        fill="#D97757"
        d="M18.8 6.5h-2.2L12.8 16l-1.5-3.8H9.2L13.6 25h2.1l3.8-9.7 1.6 4.1h2.2L18.8 6.5z"
      />
    </TechLogoSvg>
  ),
  langchain: (className) => (
    <TechLogoSvg title="LangChain" className={className}>
      <path
        fill="#1C3C3C"
        d="M8.5 10.5h3.2v11H8.5v-11zm5.9 0h3.2v11h-3.2v-11zm5.9 0H23v11h-2.7v-11z"
      />
      <circle cx="10.1" cy="8.2" r="1.5" fill="#1C3C3C" />
      <circle cx="16" cy="8.2" r="1.5" fill="#1C3C3C" />
      <circle cx="21.9" cy="8.2" r="1.5" fill="#1C3C3C" />
    </TechLogoSvg>
  ),
  pinecone: (className) => (
    <TechLogoSvg title="Pinecone" className={className}>
      <path
        fill="#000"
        d="M16 5.5c-2.4 3.2-4.8 5.1-4.8 9.2 0 2.9 2.1 5.3 4.8 5.3s4.8-2.4 4.8-5.3c0-4.1-2.4-6-4.8-9.2z"
      />
      <path
        fill="#00DC82"
        d="M16 21.5c-1.4 0-2.5-1-2.5-2.3h5c0 1.3-1.1 2.3-2.5 2.3z"
      />
    </TechLogoSvg>
  ),
  "react-native": (className) => (
    <TechLogoSvg title="React Native" className={className}>
      <circle cx="16" cy="16" r="2.2" fill="#61DAFB" />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="4.5"
        stroke="#61DAFB"
        strokeWidth="1.6"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="4.5"
        stroke="#61DAFB"
        strokeWidth="1.6"
        transform="rotate(60 16 16)"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="4.5"
        stroke="#61DAFB"
        strokeWidth="1.6"
        transform="rotate(120 16 16)"
      />
      <rect x="22" y="7" width="5" height="8" rx="1.2" fill="#61DAFB" />
    </TechLogoSvg>
  ),
  flutter: (className) => (
    <TechLogoSvg title="Flutter" className={className}>
      <path fill="#0553B1" d="m8 17.5 5.5-5.5 9.5 9.5h-5.5L8 17.5z" />
      <path fill="#027DFD" d="m8 17.5 5.5 5.5H19l-5.5-5.5H8z" />
      <path fill="#45D1FD" d="M13.5 12 19 6.5h5.5L13.5 17.5 8 12h5.5z" />
    </TechLogoSvg>
  ),
};

export function TechnologyLogo({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const render = logos[id];
  if (!render) {
    return (
      <TechLogoSvg title={id} className={className}>
        <rect x="4" y="4" width="24" height="24" rx="6" fill="#EEF2FF" />
        <circle cx="16" cy="16" r="5" fill="#2563EB" />
      </TechLogoSvg>
    );
  }
  return render(className);
}
