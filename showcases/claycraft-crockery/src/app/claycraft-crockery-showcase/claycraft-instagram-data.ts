export type ClayCraftInstagramPost = {
  id: string;
  image: string;
  alt: string;
  href: string;
};

export const CLAYCRAFT_INSTAGRAM_HANDLE = '@crockery.tableware';
export const CLAYCRAFT_INSTAGRAM_URL = 'https://www.instagram.com/';

const IG = '/claycraft/instagram';

export const CLAYCRAFT_INSTAGRAM_POSTS: readonly ClayCraftInstagramPost[] = [
  {
    id: 'ig-1',
    image: `${IG}/ig-1-stacked-plates.png`,
    alt: 'Stacked speckled plates and cups styled with dried flowers on a linen table',
    href: CLAYCRAFT_INSTAGRAM_URL,
  },
  {
    id: 'ig-2',
    image: `${IG}/ig-2-mug-jug.png`,
    alt: 'Speckled ceramic mug and milk jug beside white tulips',
    href: CLAYCRAFT_INSTAGRAM_URL,
  },
  {
    id: 'ig-3',
    image: `${IG}/ig-3-cup-blossoms.png`,
    alt: 'Gold rimmed tea cup and saucer next to a vase of white blossoms',
    href: CLAYCRAFT_INSTAGRAM_URL,
  },
  {
    id: 'ig-4',
    image: `${IG}/ig-4-nested-bowls.png`,
    alt: 'Nested stoneware bowls on a serving plate with a brass spoon',
    href: CLAYCRAFT_INSTAGRAM_URL,
  },
  {
    id: 'ig-5',
    image: `${IG}/ig-5-table-setting.png`,
    alt: 'Dining table set with speckled bowls, mugs, and brass cutlery',
    href: CLAYCRAFT_INSTAGRAM_URL,
  },
  {
    id: 'ig-6',
    image: `${IG}/ig-6-shelf-studio.png`,
    alt: 'Wooden shelf styled with handmade ceramic teapots, plates, and mugs',
    href: CLAYCRAFT_INSTAGRAM_URL,
  },
  {
    id: 'ig-7',
    image: `${IG}/ig-7-roses-cup.png`,
    alt: 'White roses in a ceramic vase beside a gold rimmed cup and plate',
    href: CLAYCRAFT_INSTAGRAM_URL,
  },
] as const;
