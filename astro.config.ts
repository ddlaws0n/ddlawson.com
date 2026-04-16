// astro.config.ts
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";
import favicons from "astro-favicons";
import icon from "astro-icon";
import { rehypeFigure } from "./src/lib/rehype-figure.ts";
import { conf } from "./src/site.config.ts";

const twPlugin = tailwindcss();

export default defineConfig({
	site: conf.site.origin,
	base: conf.site.basePathname,
	trailingSlash: conf.site.trailingSlash === "always" ? "always" : "never",

	output: "static",
	build: { format: "file" },

	markdown: {
		rehypePlugins: [rehypeFigure],
	},

	vite: {
		// @ts-expect-error — Vite plugin type mismatch between @tailwindcss/vite (Vite 8) and Astro (Vite 7)
		plugins: [twPlugin],
	},

	env: {
		schema: {
			UMAMI_ID: envField.string({
				context: "client",
				access: "public",
				optional: true,
			}),
		},
	},

	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "Bricolage Grotesque",
			cssVariable: "--font-display",
			fallbacks: ["system-ui", "sans-serif"],
			weights: ["200 800"],
			styles: ["normal"],
			subsets: ["latin"],
		},
		{
			provider: fontProviders.fontsource(),
			name: "Outfit",
			cssVariable: "--font-body",
			fallbacks: ["system-ui", "sans-serif"],
			weights: ["200 600"],
			styles: ["normal"],
			subsets: ["latin"],
		},
	],

	integrations: [
		sitemap({
			filter: (page) => !page.includes("/og/") && !page.includes("/404"),
		}),
		icon({ iconDir: "src/assets/svg" }),
		favicons({
			name: conf.site.name,
			input: "src/assets/svg/dl_dot_favicon.svg",
			short_name: "DL",
			background: "#1e1b2e",
			themes: ["#1e1b2e", "#1e1b2e"],
			icons: {
				favicons: true,
				android: true,
				appleIcon: true,
				appleStartup: false,
				windows: true,
				yandex: true,
			},
		}),
	],
	experimental: {
		rustCompiler: true,
	},
});
