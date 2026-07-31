#!/usr/bin/env node
/**
 * Bitcraftly Lighthouse CI runner (filesystem reports + score gates).
 * Requires a production build; always starts `next start` (never reuses `next dev`).
 */
import { spawn } from 'node:child_process';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

/** Dedicated port avoids colliding with `next dev` on 3000. */
const PORT = Number(process.env.LHCI_PORT ?? 3099);
const HOST = '127.0.0.1';
const BASE = `http://${HOST}:${PORT}`;
const OUT_DIR = path.resolve('.lighthouseci');
const BUILD_ID_PATH = path.resolve('.next/BUILD_ID');

const URLS = [
  { id: 'home', url: `${BASE}/` },
  { id: 'services', url: `${BASE}/services` },
  { id: 'pricing', url: `${BASE}/pricing` },
  { id: 'contact', url: `${BASE}/contact` },
];

/** Hard gates — warn-level categories are reported but do not fail. */
const GATES = {
  accessibility: { min: 0.85, level: 'error' },
  seo: { min: 0.85, level: 'error' },
  performance: { min: 0.5, level: 'warn' },
  'best-practices': { min: 0.7, level: 'warn' },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureProductionBuild() {
  try {
    await access(BUILD_ID_PATH);
  } catch {
    throw new Error(
      'Production build not found. Run `npm run build` before `npm run lighthouse:ci`.',
    );
  }
}

async function waitForServer(url, timeoutMs = 180_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url, { redirect: 'manual' });
      if (response.status >= 200 && response.status < 400) {
        return;
      }
      if (response.status >= 500) {
        const body = await response.text();
        if (body.includes('environment validation failed')) {
          throw new Error(
            'Production server failed env validation. Set SKIP_ENV_VALIDATION=true for Lighthouse CI ' +
              '(CI workflow already does this) or provide required .env values.',
          );
        }
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('env validation')) {
        throw error;
      }
      // retry transient errors
    }
    await sleep(1000);
  }
  throw new Error(`Server not ready at ${url} within ${timeoutMs}ms`);
}

/**
 * Reject dev-server responses (e.g. webpack HMR, unversioned dev chunks).
 * @param {string} base
 */
async function assertProductionServer(base) {
  const response = await fetch(`${base}/`, { redirect: 'manual' });
  const html = await response.text();

  if (!response.ok && response.status !== 304) {
    throw new Error(`Production server check failed: ${base}/ returned HTTP ${response.status}.`);
  }

  const devMarkers = [
    '/_next/webpack-hmr',
    '__NEXT_DEV',
    'next/dist/client/dev',
    'webpack-internal://',
  ];

  for (const marker of devMarkers) {
    if (html.includes(marker)) {
      throw new Error(
        `Refusing to audit ${base}: detected dev server marker "${marker}". ` +
          'Stop `next dev` and run `npm run build` before Lighthouse CI.',
      );
    }
  }

  if (/\/_next\/static\/chunks\/[^"'\\s]+\?v=\d+/.test(html)) {
    throw new Error(
      `Refusing to audit ${base}: HTML references dev-style versioned chunks (?v=). ` +
        'Ensure `next start` is serving a production build.',
    );
  }

  process.stdout.write(`Verified production server at ${base}\n`);
}

async function isPortInUse(port) {
  try {
    const response = await fetch(`http://${HOST}:${port}/`, {
      redirect: 'manual',
      signal: AbortSignal.timeout(1500),
    });
    return response.status > 0;
  } catch {
    return false;
  }
}

function startNextServer() {
  const nextBin = path.resolve('node_modules/next/dist/bin/next');
  const child = spawn(process.execPath, [nextBin, 'start', '-H', HOST, '-p', String(PORT)], {
    shell: false,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: String(PORT),
      /** Lighthouse audits public marketing routes — no owner secrets required. */
      SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION ?? 'true',
    },
  });

  child.stdout?.on('data', (chunk) => {
    process.stdout.write(`[next] ${chunk}`);
  });
  child.stderr?.on('data', (chunk) => {
    process.stderr.write(`[next] ${chunk}`);
  });

  return child;
}

async function auditUrl(chrome, url) {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: 'json',
    logLevel: 'error',
    formFactor: 'desktop',
    screenEmulation: { disabled: true },
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });

  if (!result?.lhr) {
    throw new Error(`Lighthouse returned no result for ${url}`);
  }

  return result.lhr;
}

function evaluateGates(lhr) {
  const failures = [];
  const warnings = [];

  for (const [category, rule] of Object.entries(GATES)) {
    const score = lhr.categories[category]?.score;
    if (typeof score !== 'number') {
      failures.push(`${category}: missing score`);
      continue;
    }
    if (score + 1e-9 < rule.min) {
      const message = `${category}: ${(score * 100).toFixed(0)} < ${(rule.min * 100).toFixed(0)}`;
      if (rule.level === 'error') {
        failures.push(message);
      } else {
        warnings.push(message);
      }
    }
  }

  return { failures, warnings };
}

function fmt(score) {
  return typeof score === 'number' ? `${Math.round(score * 100)}` : 'n/a';
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await ensureProductionBuild();

  const buildId = (await readFile(BUILD_ID_PATH, 'utf8')).trim();
  process.stdout.write(`Using production build ${buildId} on port ${PORT}\n`);

  if (await isPortInUse(PORT)) {
    throw new Error(
      `Port ${PORT} is already in use. Stop the process on that port or set LHCI_PORT to a free port.`,
    );
  }

  /** @type {import('node:child_process').ChildProcess | null} */
  let server = null;
  /** @type {import('chrome-launcher').LaunchedChrome | null} */
  let chrome = null;

  try {
    server = startNextServer();
    await waitForServer(`${BASE}/`);
    await assertProductionServer(BASE);

    chrome = await chromeLauncher.launch({
      chromeFlags: [
        '--headless=new',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-extensions',
        '--disable-component-extensions-with-background-pages',
      ],
    });

    const summary = [];
    let hardFailures = 0;

    for (const target of URLS) {
      process.stdout.write(`Auditing ${target.url}\n`);
      const lhr = await auditUrl(chrome, target.url);
      const reportPath = path.join(OUT_DIR, `${target.id}.report.json`);
      await writeFile(reportPath, JSON.stringify(lhr, null, 2), 'utf8');

      const scores = {
        performance: lhr.categories.performance?.score ?? null,
        accessibility: lhr.categories.accessibility?.score ?? null,
        'best-practices': lhr.categories['best-practices']?.score ?? null,
        seo: lhr.categories.seo?.score ?? null,
      };

      const { failures, warnings } = evaluateGates(lhr);
      hardFailures += failures.length;

      summary.push({
        id: target.id,
        url: target.url,
        buildId,
        scores,
        failures,
        warnings,
      });

      process.stdout.write(
        `  perf=${fmt(scores.performance)} a11y=${fmt(scores.accessibility)} bp=${fmt(scores['best-practices'])} seo=${fmt(scores.seo)}\n`,
      );
      for (const warning of warnings) {
        process.stdout.write(`  WARN ${warning}\n`);
      }
      for (const failure of failures) {
        process.stderr.write(`  FAIL ${failure}\n`);
      }
    }

    const summaryPath = path.join(OUT_DIR, 'summary.json');
    await writeFile(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
    process.stdout.write(`Wrote ${summaryPath}\n`);

    if (hardFailures > 0) {
      process.exitCode = 1;
      process.stderr.write(`Lighthouse CI failed with ${hardFailures} assertion error(s).\n`);
    } else {
      process.stdout.write('Lighthouse CI passed.\n');
    }
  } finally {
    if (chrome) {
      try {
        await chrome.kill();
      } catch (error) {
        process.stderr.write(
          `Chrome cleanup warning: ${error instanceof Error ? error.message : String(error)}\n`,
        );
      }
    }
    if (server && !server.killed) {
      server.kill('SIGTERM');
    }
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exitCode = 1;
});
