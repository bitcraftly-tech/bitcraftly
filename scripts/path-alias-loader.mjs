import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");

function resolveMapped(specifier) {
  const mapped = path.join(ROOT, specifier.slice(2));
  if (fs.existsSync(mapped)) return mapped;
  if (fs.existsSync(`${mapped}.ts`)) return `${mapped}.ts`;
  if (fs.existsSync(`${mapped}.tsx`)) return `${mapped}.tsx`;
  if (fs.existsSync(path.join(mapped, "index.ts"))) return path.join(mapped, "index.ts");
  return mapped;
}

/** Resolves `@/*` imports when running TypeScript scripts with Node directly. */
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    return nextResolve(pathToFileURL(resolveMapped(specifier)).href, context);
  }
  return nextResolve(specifier, context);
}
