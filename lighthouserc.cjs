/**
 * Legacy LHCI config kept for reference.
 * Active runner: `npm run lighthouse:ci` → scripts/lighthouse-ci.mjs
 * (requires `npm run build`; uses port 3099 by default; never reuses `next dev`)
 */
module.exports = {
  ci: {
    collect: {
      startServerCommand: "npx next start -H 127.0.0.1 -p 3099",
      startServerReadyPattern: "Ready",
      url: [
        "http://127.0.0.1:3000/",
        "http://127.0.0.1:3000/pricing",
        "http://127.0.0.1:3000/contact",
      ],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.35 }],
        "categories:accessibility": ["error", { minScore: 0.85 }],
        "categories:best-practices": ["warn", { minScore: 0.7 }],
        "categories:seo": ["error", { minScore: 0.85 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
