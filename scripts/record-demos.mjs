import { chromium } from "playwright";
import {
  readFile,
  readdir,
  mkdir,
  writeFile,
  rm,
  stat,
} from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory()
          ? files(path.join(dir, e.name))
          : path.join(dir, e.name),
      ),
    )
  ).flat();
}
const projects = await readFile("content/projects.ts", "utf8");
const targets = new Map();
const only = process.argv.find((arg) => arg.startsWith("--only="))?.slice(7);
for (const block of projects.split(/\n  \{/)) {
  const slug = block.match(/slug: "([^"]+)"/)?.[1];
  const url = block.match(/label: "(?:Live|API)", href: "([^"]+)"/)?.[1];
  if (slug && url) targets.set(url, { slug, url });
}
// Include additional project homepages present in content/src, excluding canonical site.
for (const file of [...(await files("content")), ...(await files("src"))]) {
  const text = await readFile(file, "utf8");
  for (const match of text.matchAll(/https:\/\/[^\s"'<>\\]+/g)) {
    const url = match[0].replace(/[),;]+$/, "");
    if (
      !/\.(vercel\.app|onrender\.com)(\/|$)/.test(url) ||
      /anshul|portfolio/.test(url)
    )
      continue;
    if (
      [...targets.keys()].some((u) => new URL(u).origin === new URL(url).origin)
    )
      continue;
    targets.set(url, { slug: new URL(url).hostname.split(".")[0], url });
  }
}
if (only) {
  for (const [url, target] of targets) {
    if (target.slug !== only) targets.delete(url);
  }
  if (!targets.size) throw new Error("Unknown demo slug: " + only);
}
await mkdir("public/demos", { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
const ffmpeg = process.env.FFMPEG || "ffmpeg";
function convert(args) {
  const r = spawnSync(
    ffmpeg,
    ["-hide_banner", "-loglevel", "error", "-y", ...args],
    { encoding: "utf8" },
  );
  if (r.status !== 0) throw new Error(r.stderr || "ffmpeg failed");
}
for (const { slug, url } of targets.values()) {
  let context;
  try {
    if (slug === "issue-tracker-api") {
      // Warm Render before starting the recording; bound the request to 60 seconds.
      await fetch(url, { signal: AbortSignal.timeout(60000) });
    }
    context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: ".demo-recordings",
        size: { width: 1280, height: 720 },
      },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    if (!response || response.status() >= 400)
      throw new Error("HTTP " + response?.status());
    if (slug === "issue-tracker-api") {
      await page.locator(".swagger-ui .opblock").first().waitFor({ timeout: 60000 });
    }
    await page.waitForTimeout(3500);
    const body = await page.locator("body").innerText();
    if (
      body.length < 60 ||
      /Application error|DEPLOYMENT_NOT_FOUND|This site can.t be reached/.test(
        body,
      )
    )
      throw new Error("unavailable page");
    const base = "public/demos/" + slug;
    await page.screenshot({ path: base + ".jpg", type: "jpeg", quality: 80 });
    for (let i = 0; i < 80; i++) {
      await page.evaluate((y) => window.scrollBy(0, y), i < 45 ? 7 : -7);
      await page.waitForTimeout(100);
    }
    const video = page.video();
    await context.close();
    context = null;
    const raw = await video.path();
    const probe = spawnSync(
      "ffprobe",
      [
        "-v",
        "quiet",
        "-show_entries",
        "format=duration",
        "-of",
        "csv=p=0",
        raw,
      ],
      { encoding: "utf8" },
    );
    const start = Math.max(0, Number(probe.stdout) - 8.1).toFixed(2);
    convert([
      "-ss",
      start,
      "-i",
      raw,
      "-t",
      "8",
      "-an",
      "-vf",
      "fps=20,scale=960:540",
      "-c:v",
      "libvpx-vp9",
      "-b:v",
      "650k",
      "-crf",
      "36",
      base + ".webm",
    ]);
    convert([
      "-ss",
      start,
      "-i",
      raw,
      "-t",
      "8",
      "-an",
      "-vf",
      "fps=20,scale=960:540",
      "-c:v",
      "libx264",
      "-preset",
      "fast",
      "-crf",
      "29",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      base + ".mp4",
    ]);
    for (const ext of [".webm", ".mp4"])
      if ((await stat(base + ext)).size > 1500000)
        throw new Error(ext + " exceeds budget");
    results.push({ slug, url, status: "clip" });
    console.log(slug + ": clip");
  } catch (e) {
    if (context) await context.close();
    await Promise.all(
      ["webm", "mp4", "jpg"].map((ext) =>
        rm("public/demos/" + slug + "." + ext, { force: true }),
      ),
    );
    results.push({
      slug,
      url,
      status: "placeholder",
      reason: String(e.message),
    });
    console.log(slug + ": placeholder — " + e.message);
  }
}
await browser.close();
await writeFile(
  "public/demos/manifest.json",
  JSON.stringify(
    only
      ? [
          ...JSON.parse(await readFile("public/demos/manifest.json", "utf8")).filter(
            (entry) => entry.slug !== only,
          ),
          ...results,
        ]
      : results,
    null,
    2,
  ) + "\n",
);
await rm(".demo-recordings", { recursive: true, force: true });
