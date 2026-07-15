/** Live Bitcraftly portfolio screenshots hosted on bitcraftly.com. */

export const BITCRAFTLY_PRODUCT_ORIGIN = "https://bitcraftly.com";

/** Product screenshot URL — same source as the live portfolio. */
export function workProductImage(fileName: string): string {
  return `${BITCRAFTLY_PRODUCT_ORIGIN}/products/${encodeURIComponent(fileName)}`;
}

export const WORK_WHATSAPP_HREF =
  "https://wa.me/919667710954?text=" +
  encodeURIComponent(
    "Hi Sanjay — I saw your portfolio on Bitcraftly and want something similar.\n\nMy industry: \nReference project I liked: \nBudget (approx): \nTimeline: ",
  );
