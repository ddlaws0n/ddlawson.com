import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, fontProviders } from 'astro/config';
import { SITE } from './src/config';
import vercel from '@astrojs/vercel/serverless';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// Fonts
import '@fontsource-variable/noto-sans';
import '@fontsource-variable/open-sans';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  output: 'server',
  prefetch: true,
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
  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: 'Switzer',
        display: 'swap',
        weights: ['400', '500', '600', '700'],
        cssVariable: '--font-switzer',
      },
    ],
  },
  integrations: [
    tailwindcss(),
    icon(),
    sitemap({
      customPages: ['https://analytics.lawson.dev/'],
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
