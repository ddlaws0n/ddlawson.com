/**
 * Generate OG images locally using Playwright.
 *
 * Spins up the Astro preview server, screenshots each /og/* page,
 * and saves PNGs to public/og/. No external APIs needed.
 *
 * Prerequisites:
 *   - Run `pnpm build` first (needs dist/ to exist)
 *   - Playwright chromium installed (`npx playwright install chromium`)
 *
 * Usage:
 *   bun scripts/generate-og-images.ts          # generate missing images
 *   bun scripts/generate-og-images.ts --force   # regenerate all
 */

import { type ChildProcess, spawn } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const OUTPUT_DIR = "public/og";
const POSTS_DIR = "src/content/blog";
const PREVIEW_PORT = 4322;
const BASE_URL = `http://localhost:${PREVIEW_PORT}`;

interface Post {
	slug: string;
	draft: boolean;
}

function getFrontmatterField(content: string, field: string): string | null {
	const match = content.match(new RegExp(`^${field}:\\s*"?([^"\\n]+)"?`, "m"));
	return match ? match[1].trim() : null;
}

function readPosts(): Post[] {
	if (!existsSync(POSTS_DIR)) return [];
	return readdirSync(POSTS_DIR)
		.filter((f) => f.endsWith(".md"))
		.map((file) => {
			const raw = readFileSync(join(POSTS_DIR, file), "utf-8");
			const slug = file.replace(/\.md$/, "");
			const draft = getFrontmatterField(raw, "draft");
			return { slug, draft: draft === "true" };
		})
		.filter((p) => !p.draft);
}

function startPreviewServer(): Promise<ChildProcess> {
	return new Promise((resolve, reject) => {
		const proc = spawn(
			"pnpm",
			["exec", "astro", "preview", "--port", String(PREVIEW_PORT)],
			{
				stdio: ["ignore", "pipe", "pipe"],
				cwd: process.cwd(),
			},
		);

		const timeout = setTimeout(() => {
			reject(new Error("Preview server failed to start within 10s"));
		}, 10_000);

		proc.stdout?.on("data", (data: Buffer) => {
			if (data.toString().includes(String(PREVIEW_PORT))) {
				clearTimeout(timeout);
				resolve(proc);
			}
		});

		proc.stderr?.on("data", (data: Buffer) => {
			const msg = data.toString();
			if (msg.includes("Error")) {
				clearTimeout(timeout);
				reject(new Error(`Preview server error: ${msg}`));
			}
		});

		proc.on("error", (err) => {
			clearTimeout(timeout);
			reject(err);
		});
	});
}

async function main() {
	if (!existsSync("dist")) {
		console.error("Error: dist/ not found. Run `pnpm build` first.");
		process.exit(1);
	}

	const force = process.argv.includes("--force");
	const posts = readPosts();
	const pages = [...posts.map((p) => p.slug), "default"];

	console.log(
		`Found ${pages.length} pages to process (${posts.length} posts + default)\n`,
	);

	mkdirSync(OUTPUT_DIR, { recursive: true });

	// Start preview server
	console.log("Starting preview server...");
	const server = await startPreviewServer();
	console.log(`Preview server running on port ${PREVIEW_PORT}\n`);

	const browser = await chromium.launch();
	const context = await browser.newContext({
		viewport: { width: 1200, height: 630 },
	});

	let generated = 0;
	let skipped = 0;

	try {
		for (let i = 0; i < pages.length; i++) {
			const slug = pages[i];
			const outPath = join(OUTPUT_DIR, `${slug}.png`);
			const label = `[${i + 1}/${pages.length}]`;

			if (!force && existsSync(outPath)) {
				console.log(`${label} ${slug}.png — skipped (exists)`);
				skipped++;
				continue;
			}

			const url = `${BASE_URL}/og/${slug}`;

			try {
				const page = await context.newPage();
				await page.goto(url, { waitUntil: "networkidle" });
				await page.screenshot({ path: outPath, type: "png" });
				await page.close();
				console.log(`${label} ${slug}.png — done`);
				generated++;
			} catch (err) {
				console.error(`${label} ${slug}.png — failed:`, err);
			}
		}
	} finally {
		await browser.close();
		server.kill();
	}

	console.log(`\nDone. Generated: ${generated}, Skipped: ${skipped}`);
}

main();
