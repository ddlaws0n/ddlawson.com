import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import { SITE } from './src/config';
import vercel from '@astrojs/vercel/serverless';
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
      imageService: true,
      devImageService: 'squoosh',
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
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
