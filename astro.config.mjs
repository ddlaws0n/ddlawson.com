import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import { SITE } from './src/config.mjs';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';

// Fonts
import '@fontsource/gantari';
import '@fontsource/nunito';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    sitemap({
      // customPages: ['https://analytics.ddlawson.com/']
    }),
    compress({
      css: true,
      html: {
        removeAttributeQuotes: false,
      },
      img: true,
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
