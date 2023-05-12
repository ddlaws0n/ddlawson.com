import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import { SITE } from './src/config';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';
import prefetch from '@astrojs/prefetch';
import svelte from '@astrojs/svelte';

// Fonts
import '@fontsource/gantari';
import '@fontsource/nunito';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  markdown: {
    drafts: true,
    syntaxHighlight: 'prism',
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    prefetch(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    sitemap({
      // customPages: ['https://analytics.ddlawson.com/']
    }),
    compress({
      css: false,
      html: {
        removeAttributeQuotes: false,
      },
      img: true,
      js: true,
      svg: false,
    }),
    svelte(),
  ],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
