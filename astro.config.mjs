import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import { SITE } from './src/config.mjs';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import compress from 'astro-compress';

// Fonts
import '@fontsource/besley';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  integrations: [
    tailwind(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    compress({
      css: true,
      html: {
        removeAttributeQuotes: false,
      },
      img: false,
      js: true,
      svg: false,

      logger: 1,
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
