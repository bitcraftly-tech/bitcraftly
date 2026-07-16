export const websiteSchema = {
  "@context": "https://schema.org",

  "@type": "WebSite",

  name: "Bitcraftly",

  url: "https://bitcraftly.com",

  potentialAction: {
    "@type": "SearchAction",

    target: "https://bitcraftly.com/search?q={search_term_string}",

    "query-input": "required name=search_term_string",
  },
};