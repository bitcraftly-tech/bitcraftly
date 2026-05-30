import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const input = join(root, "public/dayal-builders/hero.mp4");
const output = join(root, "public/dayal-builders/hero-mobile.mp4");

if (!ffmpegPath) {
  console.error("ffmpeg-static binary not found.");
  process.exit(1);
}

if (!existsSync(input)) {
  console.error(`Input not found: ${input}`);
  process.exit(1);
}

const args = [
  "-y",
  "-i",
  input,
  "-an",
  "-vf",
  "scale=640:-2",
  "-c:v",
  "libx264",
  "-profile:v",
  "baseline",
  "-level",
  "3.1",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  "-crf",
  "32",
  "-preset",
  "veryfast",
  output,
];

console.log("Encoding mobile hero video (640w, H.264 baseline, faststart)…");
const result = spawnSync(ffmpegPath, args, { stdio: "inherit" });

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log(`Done: ${output}`);
