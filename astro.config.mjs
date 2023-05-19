import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import { SITE } from './src/config';
import Unlighthouse from '@unlighthouse/vite';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
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
    mdx(),
    compress({
      css: false,
      html: {
        removeAttributeQuotes: false,
      },
      img: false,
      js: true,
      svg: false,
    }),
    svelte(),
  ],
  vite: {
    plugins: [
      Unlighthouse({
        site: 'localhost:3000', // SITE.origin,
        scanner: {
          samples: 3,
          device: 'desktop',
          throttle: true,
        },
        debug: false,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
