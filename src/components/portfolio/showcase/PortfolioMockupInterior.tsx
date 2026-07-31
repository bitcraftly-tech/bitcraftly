import type { PortfolioMockup } from '@/lib/portfolioItems';

type PortfolioMockupInteriorProps = {
  variant: PortfolioMockup;
};

/** Neutral wireframe preview — no brand gradients (SaaS card thumbnail) */
export default function PortfolioMockupInterior({ variant }: PortfolioMockupInteriorProps) {
  switch (variant) {
    case 'restaurant':
      return (
        <div className="flex h-full flex-col gap-1.5 p-2 text-[8px] leading-tight text-[#6B7280]">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-1">
            <span className="h-2 w-10 rounded bg-[#E5E7EB]" />
            <span className="flex gap-0.5">
              <span className="h-2 w-6 rounded bg-[#F3F4F6]" />
              <span className="h-2 w-6 rounded bg-[#F3F4F6]" />
            </span>
          </div>
          <span className="h-6 rounded bg-[#F3F4F6]" />
          <div className="space-y-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between gap-2">
                <span className="h-1.5 flex-1 rounded bg-[#E5E7EB]" />
                <span className="h-1.5 w-6 rounded bg-[#F3F4F6]" />
              </div>
            ))}
          </div>
        </div>
      );
    case 'ecommerce':
      return (
        <div className="grid h-full grid-cols-2 gap-1.5 p-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded border border-[#E5E7EB] bg-[#FAFAFA] p-1">
              <span className="block h-5 rounded bg-[#E5E7EB]" />
              <span className="mt-1 block h-1 w-2/3 rounded bg-[#F3F4F6]" />
            </div>
          ))}
        </div>
      );
    case 'school':
      return (
        <div className="flex h-full flex-col gap-1.5 p-2">
          <span className="h-4 rounded bg-[#374151]" />
          <span className="h-4 rounded bg-[#F3F4F6]" />
          <div className="grid flex-1 grid-cols-2 gap-1">
            <span className="rounded border border-[#E5E7EB] bg-[#FAFAFA]" />
            <span className="rounded border border-[#E5E7EB] bg-[#FAFAFA]" />
          </div>
        </div>
      );
    case 'gym':
      return (
        <div className="flex h-full flex-col gap-1.5 p-2">
          <span className="h-4 rounded bg-[#374151]" />
          <div className="grid grid-cols-3 gap-1">
            <span className="col-span-2 rounded border border-[#E5E7EB] bg-[#FAFAFA]" />
            <span className="rounded bg-[#F3F4F6]" />
          </div>
        </div>
      );
    case 'chatbot':
      return (
        <div className="flex h-full flex-col justify-end gap-1 p-2">
          <span className="ml-0 mr-auto max-w-[75%] rounded-lg rounded-bl-sm border border-[#E5E7EB] bg-[#F9FAFB] px-1.5 py-1 text-[7px]">
            Hi there
          </span>
          <span className="ml-auto max-w-[75%] rounded-lg rounded-br-sm bg-[#374151] px-1.5 py-1 text-[7px] text-white">
            How can I help?
          </span>
        </div>
      );
    case 'clinic':
      return (
        <div className="grid h-full grid-cols-2 gap-1.5 p-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded border border-[#E5E7EB] bg-[#FAFAFA] p-1"
            >
              <span className="size-5 rounded-full bg-[#E5E7EB]" />
              <span className="mt-1 h-1 w-8 rounded bg-[#F3F4F6]" />
            </div>
          ))}
        </div>
      );
    case 'local':
      return (
        <div className="flex h-full flex-col gap-1.5 p-2">
          <span className="flex items-center gap-1 rounded bg-[#F3F4F6] p-1">
            <span className="size-3 rounded-full bg-[#E5E7EB]" />
            <span className="h-1.5 flex-1 rounded bg-[#E5E7EB]" />
          </span>
          {[1, 2, 3].map((i) => (
            <span key={i} className="h-1.5 rounded bg-[#E5E7EB]" />
          ))}
        </div>
      );
    case 'generic':
      return (
        <div className="flex h-full flex-col gap-1.5 p-2.5">
          <span className="h-2 w-2/5 rounded bg-[#D1D5DB]" />
          <span className="h-1.5 w-3/5 rounded bg-[#E5E7EB]" />
          <div className="mt-auto grid grid-cols-2 gap-1.5">
            <span className="h-8 rounded border border-[#E5E7EB] bg-[#FAFAFA]" />
            <span className="h-8 rounded border border-[#E5E7EB] bg-[#FAFAFA]" />
          </div>
        </div>
      );
  }
}
