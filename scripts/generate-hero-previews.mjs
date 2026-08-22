/**
 * Generate responsive AVIF/WebP hero frames from public/products covers.
 * Output: public/products/hero/{slug}-{480|720|960|1280}.{avif,webp}
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const productsDir = path.join(root, 'public', 'products');
const outDir = path.join(productsDir, 'hero');
const WIDTHS = [480, 720, 960, 1280];

/** slug → source PNG under public/products */
const SOURCES = [
  ['shrishti-cloud-kitchen', 'shrishti-cloud-kitchen.png'],
  ['swastik-makhana', 'swastik-makhana.png'],
  ['kunwar-dairy', 'dairy-farm.png'],
  ['next-gen-saas-platform', 'next-gen-saas-platform.png'],
  ['clinic-healthcare', 'clinic-healthcare.png'],
  ['school-website', 'school-website.png'],
  ['gym-website', 'gym-website.png'],
  ['restaurant-ai-chatbot', 'ai-chatbot-for-restaurant.png'],
  ['ecommerce-store', 'ecommerce-store.png'],
  ['playnest-toy-store', 'playnest-toy-store.png'],
  ['builder-website', 'builder-website.png'],
  ['society-portal', 'society-portal.png'],
  ['rpy-training-institute', 'rpy-training-institute.png'],
  ['local-services-lead-site', 'local-services-lead-site.png'],
  ['online-crockery-shop', 'online-crockery-shop.png'],
];

const dimensions = {};

for (const [slug, fileName] of SOURCES) {
  const input = path.join(productsDir, fileName);
  const meta = await sharp(input).metadata();
  dimensions[slug] = [meta.width ?? 1280, meta.height ?? 960];

  for (const width of WIDTHS) {
    const pipeline = () =>
      sharp(input).resize({
        width,
        withoutEnlargement: true,
      });

    await pipeline()
      .webp({ quality: 72, effort: 4 })
      .toFile(path.join(outDir, `${slug}-${width}.webp`));
    await pipeline()
      .avif({ quality: 48, effort: 2 })
      .toFile(path.join(outDir, `${slug}-${width}.avif`));
  }

  console.log(`${slug} ${dimensions[slug][0]}x${dimensions[slug][1]}`);
}

console.log('HERO_OPTIMIZED_DIMENSIONS =');
console.log(
  JSON.stringify(dimensions, null, 2)
    .replaceAll('[\n    ', '[')
    .replaceAll('\n  ]', ']'),
);
