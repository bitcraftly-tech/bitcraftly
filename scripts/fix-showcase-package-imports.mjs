/**
 * Rewrite leftover cross-route imports inside showcase packages to package paths.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const ROUTE_TO_PKG = {
  'dayal-builders-showcase': 'dayal-builders',
  'clinic-healthcare-showcase': 'clinic-healthcare',
  'gym-fitness-showcase': 'gym-fitness',
  'school-website-showcase': 'school-website',
  'ecommerce-store-showcase': 'ecommerce-store',
  'claycraft-crockery-showcase': 'claycraft-crockery',
  'restaurant-website-showcase': 'restaurant-website',
  'restaurant-ai-chatbot-showcase': 'restaurant-ai-chatbot',
  'society-management-showcase': 'society-management',
  'builder-real-estate-showcase': 'builder-real-estate',
  'local-services-leads-showcase': 'local-services-leads',
  'toy-showcase': 'toy-store',
  'rpytech-training-showcase': 'rpytech-training',
  'react-video-demo': 'react-video-demo',
};

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

let changed = 0;
for (const file of walk(path.join(root, 'showcases'))) {
  let text = fs.readFileSync(file, 'utf8');
  const original = text;

  for (const [route, id] of Object.entries(ROUTE_TO_PKG)) {
    const pkg = `@bitcraftly/showcase-${id}`;
    text = text.replaceAll(`@/app/portfolio/${route}/`, `${pkg}/app/${route}/`);
    text = text.replaceAll(`@/app/portfolio/${route}'`, `${pkg}/app/${route}'`);
    text = text.replaceAll(`@/app/portfolio/${route}"`, `${pkg}/app/${route}"`);
  }

  // Shared shell leftovers inside packages
  text = text.replace(
    /@\/components\/portfolio\/(ShowcaseAnchor|ShowcaseLink|ShowcaseThemeToggle|PortfolioShowcaseLayout|PortfolioShowcaseNavbar|PortfolioShowcaseFooter)/g,
    '@bitcraftly/showcase-shared/$1',
  );

  if (text !== original) {
    fs.writeFileSync(file, text);
    changed += 1;
  }
}

// Platform provider
const provider = path.join(root, 'src/components/providers/ShowcaseScopedThemeProvider.tsx');
if (fs.existsSync(provider)) {
  let text = fs.readFileSync(provider, 'utf8');
  const next = text.replace(
    "from '@/components/portfolio/ShowcaseThemeToggle'",
    "from '@bitcraftly/showcase-shared/ShowcaseThemeToggle'",
  );
  if (next !== text) {
    fs.writeFileSync(provider, next);
    changed += 1;
  }
}

console.log(`updated ${changed} files`);
