import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';

import { SITE } from './src/config.mjs';

import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  integrations: [tailwind(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  })],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});