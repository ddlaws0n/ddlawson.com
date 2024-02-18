import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import { SITE } from './src/config';
import vercel from '@astrojs/vercel/serverless';
import Unlighthouse from '@unlighthouse/vite';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// Fonts
import '@fontsource/gantari';
import '@fontsource/nunito';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  markdown: {
    drafts: true,
    syntaxHighlight: 'prism',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
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
  ],
  vite: {
    plugins: [
      Unlighthouse({
        site: 'localhost:3000',
        // SITE.origin,
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
