#!/usr/bin/env node
/**
 * Homepage Lighthouse audit — desktop + mobile against production `next start`.
 * Outputs actionable findings only (scores below targets + failed audits).
 */
import { spawn } from 'node:child_process';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const PORT = Number(process.env.LHCI_PORT ?? 3099);
const HOST = '127.0.0.1';
const BASE = `http://${HOST}:${PORT}`;
const OUT_DIR = path.resolve('.lighthouseci');
const BUILD_ID_PATH = path.resolve('.next/BUILD_ID');
const TARGET_URL = `${BASE}/`;

const TARGETS = {
  performance: 95,
  accessibility: 100,
  'best-practices': 100,
  seo: 100,
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureProductionBuild() {
  try {
    await access(BUILD_ID_PATH);
  } catch {
    throw new Error('Production build not found. Run `npm run build` first.');
  }
}

async function waitForServer(url, timeoutMs = 180_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url, { redirect: 'manual' });
      if (response.status >= 200 && response.status < 500) return;
    } catch {
      // retry
    }
    await sleep(1000);
  }
  throw new Error(`Server not ready at ${url}`);
}

function startNextServer() {
  const nextBin = path.resolve('node_modules/next/dist/bin/next');
  return spawn(process.execPath, [nextBin, 'start', '-H', HOST, '-p', String(PORT)], {
    shell: false,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: String(PORT),
      SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION ?? 'true',
    },
  });
}

function metric(lhr, id) {
  const a = lhr.audits[id];
  if (!a) return null;
  return {
    id,
    title: a.title,
    score: a.score,
    displayValue: a.displayValue ?? null,
    numericValue: a.numericValue ?? null,
  };
}

function failedAudits(lhr, categoryId) {
  const cat = lhr.categories[categoryId];
  if (!cat) return [];
  return cat.auditRefs
    .filter((ref) => ref.weight > 0 || categoryId !== 'performance')
    .map((ref) => {
      const a = lhr.audits[ref.id];
      if (!a) return null;
      if (a.score === null) return null;
      if (a.score >= 1) return null;
      // For perf, only surface meaningful failures / opportunities
      if (categoryId === 'performance' && a.score === null) return null;
      return {
        id: ref.id,
        title: a.title,
        score: Math.round((a.score ?? 0) * 100),
        displayValue: a.displayValue ?? null,
        description: (a.description ?? '').split('[')[0].trim(),
        detailsType: a.details?.type ?? null,
        items: summarizeItems(a),
      };
    })
    .filter(Boolean);
}

function opportunities(lhr) {
  return Object.values(lhr.audits)
    .filter((a) => a.details?.type === 'opportunity' && (a.numericValue ?? 0) > 0)
    .sort((a, b) => (b.numericValue ?? 0) - (a.numericValue ?? 0))
    .slice(0, 12)
    .map((a) => ({
      id: a.id,
      title: a.title,
      displayValue: a.displayValue,
      savingsMs: a.numericValue,
      items: summarizeItems(a).slice(0, 8),
    }));
}

function summarizeItems(audit) {
  const items = audit.details?.items;
  if (!Array.isArray(items)) return [];
  return items.slice(0, 10).map((item) => {
    if (typeof item === 'string') return { label: item };
    const url = item.url ?? item.source ?? item.node?.snippet ?? null;
    const label =
      item.label ??
      item.name ??
      item.text ??
      item.node?.selector ??
      (typeof url === 'string' ? url.replace(BASE, '') : null) ??
      audit.title;
    const transferSize = item.transferSize ?? item.totalBytes ?? item.wastedBytes ?? null;
    const wastedMs = item.wastedMs ?? null;
    return {
      label: typeof label === 'string' ? label.slice(0, 180) : String(label),
      transferSize,
      wastedMs,
      wastedBytes: item.wastedBytes ?? null,
    };
  });
}

function largestAssets(lhr) {
  const network = lhr.audits['network-requests']?.details?.items;
  if (!Array.isArray(network)) return [];
  return [...network]
    .filter((i) => typeof i.transferSize === 'number')
    .sort((a, b) => b.transferSize - a.transferSize)
    .slice(0, 15)
    .map((i) => ({
      url: String(i.url ?? '').replace(BASE, '') || i.url,
      resourceType: i.resourceType,
      transferSize: i.transferSize,
      mimeType: i.mimeType,
    }));
}

function renderBlocking(lhr) {
  return summarizeItems(lhr.audits['render-blocking-resources'] ?? {});
}

function unusedJavascript(lhr) {
  return summarizeItems(lhr.audits['unused-javascript'] ?? {});
}

function unusedCss(lhr) {
  return summarizeItems(lhr.audits['unused-css-rules'] ?? {});
}

function imageIssues(lhr) {
  const ids = [
    'uses-optimized-images',
    'uses-responsive-images',
    'modern-image-formats',
    'offscreen-images',
    'unsized-images',
    'prioritize-lcp-image',
  ];
  return ids
    .map((id) => {
      const a = lhr.audits[id];
      if (!a || a.score === null || a.score >= 1) return null;
      return {
        id,
        title: a.title,
        displayValue: a.displayValue ?? null,
        items: summarizeItems(a).slice(0, 6),
      };
    })
    .filter(Boolean);
}

function fontIssues(lhr) {
  const ids = ['font-display', 'preload-fonts'];
  return ids
    .map((id) => {
      const a = lhr.audits[id];
      if (!a || a.score === null || a.score >= 1) return null;
      return {
        id,
        title: a.title,
        displayValue: a.displayValue ?? null,
        items: summarizeItems(a).slice(0, 6),
      };
    })
    .filter(Boolean);
}

function cachingIssues(lhr) {
  const a = lhr.audits['uses-long-cache-ttl'];
  if (!a || a.score === null || a.score >= 1) return [];
  return [
    {
      id: a.id,
      title: a.title,
      displayValue: a.displayValue ?? null,
      items: summarizeItems(a).slice(0, 10),
    },
  ];
}

function scorePct(score) {
  return typeof score === 'number' ? Math.round(score * 100) : null;
}

function extractReport(lhr, formFactor) {
  const categories = {
    performance: scorePct(lhr.categories.performance?.score),
    accessibility: scorePct(lhr.categories.accessibility?.score),
    bestPractices: scorePct(lhr.categories['best-practices']?.score),
    seo: scorePct(lhr.categories.seo?.score),
  };

  const cwv = {
    LCP: metric(lhr, 'largest-contentful-paint'),
    CLS: metric(lhr, 'cumulative-layout-shift'),
    INP: metric(lhr, 'interaction-to-next-paint'),
    TBT: metric(lhr, 'total-blocking-time'),
    FCP: metric(lhr, 'first-contentful-paint'),
    SI: metric(lhr, 'speed-index'),
    TTI: metric(lhr, 'interactive'),
  };

  const gaps = [
    ['performance', categories.performance],
    ['accessibility', categories.accessibility],
    ['best-practices', categories.bestPractices],
    ['seo', categories.seo],
  ]
    .filter(([key, value]) => typeof value === 'number' && value < TARGETS[key])
    .map(([key, value]) => ({
      category: key,
      score: value,
      target: TARGETS[key],
      delta: TARGETS[key] - value,
    }));

  return {
    formFactor,
    url: lhr.finalDisplayedUrl ?? lhr.requestedUrl,
    fetchTime: lhr.fetchTime,
    categories,
    targets: TARGETS,
    gaps,
    coreWebVitals: cwv,
    actionable: {
      performanceFailures: failedAudits(lhr, 'performance').filter((a) => a.score < 90),
      accessibilityFailures: failedAudits(lhr, 'accessibility'),
      bestPracticesFailures: failedAudits(lhr, 'best-practices'),
      seoFailures: failedAudits(lhr, 'seo'),
      opportunities: opportunities(lhr),
      largestAssets: largestAssets(lhr),
      renderBlocking: renderBlocking(lhr),
      unusedJavascript: unusedJavascript(lhr),
      unusedCss: unusedCss(lhr),
      images: imageIssues(lhr),
      fonts: fontIssues(lhr),
      caching: cachingIssues(lhr),
    },
  };
}

async function runAudit(chrome, formFactor) {
  const isMobile = formFactor === 'mobile';
  const result = await lighthouse(TARGET_URL, {
    port: chrome.port,
    output: 'json',
    logLevel: 'error',
    formFactor: isMobile ? 'mobile' : 'desktop',
    screenEmulation: isMobile
      ? undefined
      : {
          disabled: true,
        },
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });

  if (!result?.lhr) throw new Error(`No Lighthouse result for ${formFactor}`);
  return result.lhr;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await ensureProductionBuild();
  const buildId = (await readFile(BUILD_ID_PATH, 'utf8')).trim();
  process.stdout.write(`Build ${buildId} → auditing ${TARGET_URL}\n`);

  let server = null;
  let chrome = null;

  try {
    server = startNextServer();
    server.stdout?.on('data', (c) => process.stdout.write(`[next] ${c}`));
    server.stderr?.on('data', (c) => process.stderr.write(`[next] ${c}`));
    await waitForServer(`${BASE}/`);

    chrome = await chromeLauncher.launch({
      chromeFlags: [
        '--headless=new',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-extensions',
      ],
    });

    // Warmup
    await fetch(`${BASE}/`);

    process.stdout.write('Auditing desktop…\n');
    const desktopLhr = await runAudit(chrome, 'desktop');
    await writeFile(
      path.join(OUT_DIR, 'home-desktop.report.json'),
      JSON.stringify(desktopLhr, null, 2),
      'utf8',
    );
    const desktop = extractReport(desktopLhr, 'desktop');

    process.stdout.write('Auditing mobile…\n');
    const mobileLhr = await runAudit(chrome, 'mobile');
    await writeFile(
      path.join(OUT_DIR, 'home-mobile.report.json'),
      JSON.stringify(mobileLhr, null, 2),
      'utf8',
    );
    const mobile = extractReport(mobileLhr, 'mobile');

    const summary = {
      buildId,
      auditedAt: new Date().toISOString(),
      url: TARGET_URL,
      targets: TARGETS,
      desktop,
      mobile,
    };

    const summaryPath = path.join(OUT_DIR, 'homepage-audit-summary.json');
    await writeFile(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
    process.stdout.write(`Wrote ${summaryPath}\n`);
    process.stdout.write(
      `Desktop: perf=${desktop.categories.performance} a11y=${desktop.categories.accessibility} bp=${desktop.categories.bestPractices} seo=${desktop.categories.seo}\n`,
    );
    process.stdout.write(
      `Mobile:  perf=${mobile.categories.performance} a11y=${mobile.categories.accessibility} bp=${mobile.categories.bestPractices} seo=${mobile.categories.seo}\n`,
    );
  } finally {
    if (chrome) {
      try {
        await chrome.kill();
      } catch {
        /* ignore */
      }
    }
    if (server && !server.killed) server.kill('SIGTERM');
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exitCode = 1;
});
