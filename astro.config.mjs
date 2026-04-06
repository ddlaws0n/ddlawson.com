// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
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
});
