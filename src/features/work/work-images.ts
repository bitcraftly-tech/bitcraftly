/** Portfolio screenshots served from `public/products` (kebab-case filenames). */

/** Product screenshot path — same-origin static asset (no URI encoding). */
export function workProductImage(fileName: string): string {
  return `/products/${fileName}`;
}

export const WORK_WHATSAPP_HREF =
  'https://wa.me/919667710954?text=' +
  encodeURIComponent(
    'Hi Sanjay — I saw your portfolio on Bitcraftly and want something similar.\n\nMy industry: \nReference project I liked: \nBudget (approx): \nTimeline: ',
  );
