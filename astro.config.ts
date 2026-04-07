// astro.config.ts
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";
import favicons from "astro-favicons";
import icon from "astro-icon";
import { conf } from "./src/site.config.ts";

const twPlugin = tailwindcss();

export default defineConfig({
	vite: {
		// @ts-expect-error — Vite plugin type mismatch between @tailwindcss/vite (Vite 8) and Astro (Vite 7)
		plugins: [twPlugin],
	},

	env: {
		schema: {
			API_URL: envField.string({
				context: "client",
				access: "public",
				optional: true,
			}),
			PORT: envField.number({
				context: "server",
				access: "public",
				default: 4321,
			}),
			API_SECRET: envField.string({
				context: "server",
				access: "secret",
			}),
		},
	},

	fonts: [
		{
			provider: fontProviders.google(),
			name: "Bricolage Grotesque",
			cssVariable: "--font-display",
			weights: [200, 300, 400, 500, 600, 700, 800],
			styles: ["normal"],
			subsets: ["latin"],
			fallbacks: ["system-ui", "sans-serif"],
			options: {
				experimental: {
					variableAxis: {
						opsz: [["12", "96"]],
					},
				},
			},
		},
		{
			provider: fontProviders.google(),
			name: "Outfit",
			cssVariable: "--font-body",
			weights: [200, 300, 400, 500, 600],
			styles: ["normal"],
			subsets: ["latin"],
			fallbacks: ["system-ui", "sans-serif"],
		},
	],

	integrations: [
		icon({ iconDir: "src/assets/svg" }),
		favicons({
			name: conf.name,
			input: "src/assets/svg/dl_dot.svg",
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
});
