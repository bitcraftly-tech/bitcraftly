/**
 * Migrates portfolio showcases into isolated npm workspace packages under showcases/.
 * Safe to re-run: skips moves when destination already exists.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SHOWCASES = [
  {
    id: 'dayal-builders',
    route: 'dayal-builders-showcase',
    moves: [
      { from: 'src/components/dayal', to: 'components' },
      { from: 'src/lib/dayal', to: 'lib' },
      { from: 'src/app/dayal-builders/dayal.css', to: 'styles/dayal.css' },
    ],
    routeMoves: true,
    extraMoves: [
      { from: 'src/app/api/dayal/chat/route.ts', to: 'api/chat-route.ts', keepStub: true },
    ],
  },
  {
    id: 'clinic-healthcare',
    route: 'clinic-healthcare-showcase',
    moves: [{ from: 'src/components/portfolio/clinic', to: 'components/clinic' }],
    routeMoves: true,
  },
  {
    id: 'gym-fitness',
    route: 'gym-fitness-showcase',
    moves: [{ from: 'src/components/portfolio/gym', to: 'components/gym' }],
    routeMoves: true,
  },
  {
    id: 'school-website',
    route: 'school-website-showcase',
    moves: [{ from: 'src/components/portfolio/school', to: 'components/school' }],
    routeMoves: true,
  },
  {
    id: 'ecommerce-store',
    route: 'ecommerce-store-showcase',
    moves: [{ from: 'src/components/portfolio/ecommerce', to: 'components/ecommerce' }],
    routeMoves: true,
  },
  { id: 'claycraft-crockery', route: 'claycraft-crockery-showcase', moves: [], routeMoves: true },
  { id: 'restaurant-website', route: 'restaurant-website-showcase', moves: [], routeMoves: true },
  {
    id: 'restaurant-ai-chatbot',
    route: 'restaurant-ai-chatbot-showcase',
    moves: [],
    routeMoves: true,
  },
  { id: 'society-management', route: 'society-management-showcase', moves: [], routeMoves: true },
  { id: 'builder-real-estate', route: 'builder-real-estate-showcase', moves: [], routeMoves: true },
  {
    id: 'local-services-leads',
    route: 'local-services-leads-showcase',
    moves: [],
    routeMoves: true,
  },
  { id: 'toy-store', route: 'toy-showcase', moves: [], routeMoves: true },
  { id: 'rpytech-training', route: 'rpytech-training-showcase', moves: [], routeMoves: true },
  { id: 'react-video-demo', route: 'react-video-demo', moves: [], routeMoves: true },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return false;
  ensureDir(path.dirname(dest));
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
  return true;
}

function rmRecursive(target) {
  if (!fs.existsSync(target)) return;
  fs.rmSync(target, { recursive: true, force: true });
}

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else out.push(full);
  }
  return out;
}

function writePackageJson(id) {
  const pkgDir = path.join(root, 'showcases', id);
  ensureDir(pkgDir);
  const pkgPath = path.join(pkgDir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    fs.writeFileSync(
      pkgPath,
      `${JSON.stringify(
        {
          name: `@bitcraftly/showcase-${id}`,
          version: '0.0.0',
          private: true,
          type: 'module',
          exports: {
            '.': './src/index.ts',
            './*': './src/*',
          },
          peerDependencies: {
            next: '>=15',
            react: '>=19',
            'react-dom': '>=19',
          },
          dependencies: {
            '@bitcraftly/showcase-shared': '0.0.0',
          },
        },
        null,
        2,
      )}\n`,
    );
  }
}

function writeSharedPackage() {
  const pkgDir = path.join(root, 'showcases', 'shared');
  ensureDir(path.join(pkgDir, 'src'));
  fs.writeFileSync(
    path.join(pkgDir, 'package.json'),
    `${JSON.stringify(
      {
        name: '@bitcraftly/showcase-shared',
        version: '0.0.0',
        private: true,
        type: 'module',
        exports: {
          '.': './src/index.ts',
          './*': './src/*',
        },
        peerDependencies: {
          next: '>=15',
          react: '>=19',
          'react-dom': '>=19',
        },
      },
      null,
      2,
    )}\n`,
  );

  const sharedFiles = [
    'PortfolioShowcaseFooter.tsx',
    'PortfolioShowcaseLayout.tsx',
    'PortfolioShowcaseNavbar.tsx',
    'ShowcaseAnchor.tsx',
    'ShowcaseLink.tsx',
    'ShowcaseThemeToggle.tsx',
  ];

  for (const file of sharedFiles) {
    const from = path.join(root, 'src/components/portfolio', file);
    const to = path.join(pkgDir, 'src', file);
    if (fs.existsSync(from) && !fs.existsSync(to)) {
      copyRecursive(from, to);
    }
  }

  const indexExports = sharedFiles
    .map((f) => {
      const name = f.replace(/\.tsx?$/, '');
      return `export { default as ${name} } from './${name}';`;
    })
    .join('\n');

  fs.writeFileSync(
    path.join(pkgDir, 'src/index.ts'),
    `${indexExports}\nexport { default } from './PortfolioShowcaseLayout';\n`,
  );
}

function rewriteFileImports(filePath, showcaseId) {
  let text = fs.readFileSync(filePath, 'utf8');
  const original = text;

  // Shared shell
  text = text.replace(
    /@\/components\/portfolio\/(ShowcaseAnchor|ShowcaseLink|ShowcaseThemeToggle|PortfolioShowcaseLayout|PortfolioShowcaseNavbar|PortfolioShowcaseFooter)/g,
    '@bitcraftly/showcase-shared/$1',
  );

  // Dayal-specific
  if (showcaseId === 'dayal-builders') {
    text = text.replace(
      /@\/components\/dayal\//g,
      '@bitcraftly/showcase-dayal-builders/components/',
    );
    text = text.replace(/@\/lib\/dayal\//g, '@bitcraftly/showcase-dayal-builders/lib/');
    text = text.replace(
      /@\/app\/dayal-builders\/dayal\.css/g,
      '@bitcraftly/showcase-dayal-builders/styles/dayal.css',
    );
  }

  // Clinic / gym / school / ecommerce component folders
  text = text.replace(
    /@\/components\/portfolio\/clinic\//g,
    '@bitcraftly/showcase-clinic-healthcare/components/clinic/',
  );
  text = text.replace(
    /@\/components\/portfolio\/gym\//g,
    '@bitcraftly/showcase-gym-fitness/components/gym/',
  );
  text = text.replace(
    /@\/components\/portfolio\/school\//g,
    '@bitcraftly/showcase-school-website/components/school/',
  );
  text = text.replace(
    /@\/components\/portfolio\/ecommerce\//g,
    '@bitcraftly/showcase-ecommerce-store/components/ecommerce/',
  );

  // Same-route relative imports that used to live under app/portfolio/<route>
  // stay as relative after move into package src/app/*

  if (text !== original) fs.writeFileSync(filePath, text);
}

function createIndex(showcaseId, route) {
  const srcDir = path.join(root, 'showcases', showcaseId, 'src');
  ensureDir(srcDir);
  const indexPath = path.join(srcDir, 'index.ts');
  if (fs.existsSync(indexPath)) return;

  // Prefer exporting the main page module if present
  const pageCandidates = [`app/${route}/page.tsx`, 'app/page.tsx'];
  let pageRel = null;
  for (const c of pageCandidates) {
    if (fs.existsSync(path.join(srcDir, c))) {
      pageRel = `./${c.replace(/\.tsx$/, '')}`;
      break;
    }
  }

  const lines = [
    `/** @bitcraftly/showcase-${showcaseId} — isolated portfolio showcase package */`,
    pageRel ? `export { default } from '${pageRel}';` : `export {};`,
  ];

  // metadata re-export when available is handled by thin route importing page directly
  fs.writeFileSync(indexPath, `${lines.join('\n')}\n`);
}

function writeThinRoute(showcaseId, route, keepApiStub) {
  const routeDir = path.join(root, 'src/app/portfolio', route);
  ensureDir(routeDir);

  // Discover page / layout / loading / error in package
  const pkgApp = path.join(root, 'showcases', showcaseId, 'src', 'app', route);
  const files = fs.existsSync(pkgApp) ? fs.readdirSync(pkgApp) : [];

  for (const file of files) {
    if (!/\.(tsx|ts|jsx|js)$/.test(file)) continue;
    // Nested folders (ai/, shop/, etc.) stay only in package — Next needs them under app/
    // For nested routes we keep a note in README; primary page re-export is enough for simple showcases.
    if (
      file === 'page.tsx' ||
      file === 'layout.tsx' ||
      file === 'loading.tsx' ||
      file === 'error.tsx' ||
      file === 'not-found.tsx'
    ) {
      const thin = path.join(routeDir, file);
      const exportName =
        file.startsWith('page') ||
        file.startsWith('layout') ||
        file.startsWith('loading') ||
        file.startsWith('error') ||
        file.startsWith('not-found');
      if (!exportName) continue;
      // Always rewrite thin shell to re-export from package
      const mod = `@bitcraftly/showcase-${showcaseId}/app/${route}/${file.replace(/\.tsx$/, '')}`;
      if (file === 'page.tsx') {
        fs.writeFileSync(thin, `export { default } from '${mod}';\nexport * from '${mod}';\n`);
      } else if (file === 'layout.tsx') {
        fs.writeFileSync(thin, `export { default } from '${mod}';\nexport * from '${mod}';\n`);
      } else if (file === 'error.tsx') {
        fs.writeFileSync(thin, `'use client';\n\nexport { default } from '${mod}';\n`);
      } else {
        fs.writeFileSync(thin, `export { default } from '${mod}';\n`);
      }
    }
  }

  // If package has nested app routes, mirror them as re-exports
  function mirrorNested(relDir) {
    const abs = path.join(pkgApp, relDir);
    if (!fs.existsSync(abs) || !fs.statSync(abs).isDirectory()) return;
    for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
      const rel = path.join(relDir, entry.name);
      if (entry.isDirectory()) {
        mirrorNested(rel);
        continue;
      }
      if (!/^page|layout|loading|error|not-found/.test(entry.name)) continue;
      const dest = path.join(routeDir, rel);
      ensureDir(path.dirname(dest));
      const modPath = `@bitcraftly/showcase-${showcaseId}/app/${route}/${rel.replace(/\\/g, '/').replace(/\.tsx$/, '')}`;
      if (entry.name.startsWith('page') || entry.name.startsWith('layout')) {
        fs.writeFileSync(
          dest,
          `export { default } from '${modPath}';\nexport * from '${modPath}';\n`,
        );
      } else if (entry.name.startsWith('error')) {
        fs.writeFileSync(dest, `'use client';\n\nexport { default } from '${modPath}';\n`);
      } else {
        fs.writeFileSync(dest, `export { default } from '${modPath}';\n`);
      }
    }
  }
  mirrorNested('');

  if (keepApiStub) {
    const apiPath = path.join(root, 'src/app/api/dayal/chat/route.ts');
    ensureDir(path.dirname(apiPath));
    fs.writeFileSync(
      apiPath,
      `export { POST } from '@bitcraftly/showcase-dayal-builders/api/chat-route';\n`,
    );
  }
}

function migrateOne(cfg) {
  writePackageJson(cfg.id);
  const pkgSrc = path.join(root, 'showcases', cfg.id, 'src');
  ensureDir(pkgSrc);

  for (const move of cfg.moves) {
    const from = path.join(root, move.from);
    // move.to is relative to package src/ (e.g. "components", not "src/components")
    const to = path.join(pkgSrc, move.to);
    if (!fs.existsSync(from)) {
      console.warn(`skip missing ${move.from}`);
      continue;
    }
    if (!fs.existsSync(to)) {
      copyRecursive(from, to);
    }
  }

  if (cfg.extraMoves) {
    for (const move of cfg.extraMoves) {
      const from = path.join(root, move.from);
      const to = path.join(pkgSrc, move.to);
      if (fs.existsSync(from) && !fs.existsSync(to)) {
        copyRecursive(from, to);
      }
    }
  }

  if (cfg.routeMoves) {
    const from = path.join(root, 'src/app/portfolio', cfg.route);
    const to = path.join(pkgSrc, 'app', cfg.route);
    if (fs.existsSync(from)) {
      // Copy full route tree into package first
      if (!fs.existsSync(to)) copyRecursive(from, to);
    }
  }

  // Rewrite imports inside package
  for (const file of walkFiles(pkgSrc)) {
    if (!/\.(tsx|ts|jsx|js|css)$/.test(file)) continue;
    if (file.endsWith('.css')) continue;
    rewriteFileImports(file, cfg.id);
  }

  createIndex(cfg.id, cfg.route);
  writeThinRoute(cfg.id, cfg.route, Boolean(cfg.extraMoves?.some((m) => m.keepStub)));

  // Remove originals after successful copy (except we need thin routes)
  for (const move of cfg.moves) {
    const from = path.join(root, move.from);
    if (fs.existsSync(from)) rmRecursive(from);
  }
  if (cfg.extraMoves) {
    for (const move of cfg.extraMoves) {
      // leave stub handled by writeThinRoute
      if (move.keepStub) continue;
      const from = path.join(root, move.from);
      if (fs.existsSync(from)) rmRecursive(from);
    }
  }

  // Remove non-thin files from route dir (keep only re-export shells + nested re-exports)
  const routeDir = path.join(root, 'src/app/portfolio', cfg.route);
  if (fs.existsSync(routeDir)) {
    for (const entry of walkFiles(routeDir)) {
      const rel = path.relative(routeDir, entry).replace(/\\/g, '/');
      const base = path.basename(entry);
      const isRouteFile = /^(page|layout|loading|error|not-found)\.(tsx|ts|jsx|js)$/.test(base);
      if (!isRouteFile) {
        fs.rmSync(entry, { force: true });
      } else {
        // ensure it's a re-export (rewrite again)
        const modPath = `@bitcraftly/showcase-${cfg.id}/app/${cfg.route}/${rel.replace(/\.tsx$/, '').replace(/\.ts$/, '')}`;
        if (base.startsWith('page') || base.startsWith('layout')) {
          fs.writeFileSync(
            entry,
            `export { default } from '${modPath}';\nexport * from '${modPath}';\n`,
          );
        } else if (base.startsWith('error')) {
          fs.writeFileSync(entry, `'use client';\n\nexport { default } from '${modPath}';\n`);
        } else {
          fs.writeFileSync(entry, `export { default } from '${modPath}';\n`);
        }
      }
    }
    // clean empty dirs left behind
  }

  console.log(`migrated ${cfg.id}`);
}

function cleanupEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) cleanupEmptyDirs(path.join(dir, entry.name));
  }
  if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
}

writeSharedPackage();
for (const cfg of SHOWCASES) migrateOne(cfg);

// Remove shared originals from components/portfolio (keep showcase/ marketing gallery)
for (const file of [
  'PortfolioShowcaseFooter.tsx',
  'PortfolioShowcaseLayout.tsx',
  'PortfolioShowcaseNavbar.tsx',
  'ShowcaseAnchor.tsx',
  'ShowcaseLink.tsx',
  'ShowcaseThemeToggle.tsx',
]) {
  const p = path.join(root, 'src/components/portfolio', file);
  if (fs.existsSync(p)) fs.rmSync(p, { force: true });
}

cleanupEmptyDirs(path.join(root, 'src/components/dayal'));
cleanupEmptyDirs(path.join(root, 'src/lib/dayal'));
cleanupEmptyDirs(path.join(root, 'src/app/dayal-builders'));
cleanupEmptyDirs(path.join(root, 'src/components/portfolio/clinic'));
cleanupEmptyDirs(path.join(root, 'src/components/portfolio/gym'));
cleanupEmptyDirs(path.join(root, 'src/components/portfolio/school'));
cleanupEmptyDirs(path.join(root, 'src/components/portfolio/ecommerce'));

console.log('done');
