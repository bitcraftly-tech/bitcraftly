/** Mobile viewport — skip fullscreen loader to protect LCP/FCP on PageSpeed. */
export const LOADER_MOBILE_MAX_WIDTH_PX = 768;

export const LOADER_SKIP_ON_MOBILE = process.env.NEXT_PUBLIC_LOADER_SKIP_MOBILE !== "false";
