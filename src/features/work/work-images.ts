/** Portfolio screenshots served from `public/products`. */

/** Product screenshot path — same-origin static asset. */
export function workProductImage(fileName: string): string {
  return `/products/${encodeURIComponent(fileName)}`;
}

export const WORK_WHATSAPP_HREF =
  'https://wa.me/919667710954?text=' +
  encodeURIComponent(
    'Hi Sanjay — I saw your portfolio on Bitcraftly and want something similar.\n\nMy industry: \nReference project I liked: \nBudget (approx): \nTimeline: ',
  );
