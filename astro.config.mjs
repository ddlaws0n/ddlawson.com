import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, fontProviders } from 'astro/config';

// Core configs
import { SITE } from './src/config';

// Integrations
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import compress from 'astro-compress';
import icon from 'astro-icon';
import Sonda from 'sonda/astro';
import vtbot from 'astro-vtbot';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Site Configuration
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',

  // Build Configuration
  output: 'server',
  prefetch: true,

  // Adapter Configuration
  adapter: vercel({
    webAnalytics: {
      enabled: true,
      imageService: true,
      devImageService: 'squoosh',
    },
  }),

  // Markdown Configuration
  markdown: {
    drafts: true,
    syntaxHighlight: 'prism',
  },

  // Font Configuration
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

  // Integrations
  integrations: [
    icon({ iconDir: 'src/assets/icons' }),
    sitemap({
      customPages: ['https://analytics.lawson.dev/'],
    }),
    mdx(),
    Sonda({
      server: true,
    }),
    compress({
      css: false,
      html: {
        removeAttributeQuotes: false,
      },
      img: false,
      js: true,
      svg: false,
    }),
    vtbot(),
  ],

  // Vite Configuration
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      sourcemap: true,
    },
    plugins: [tailwindcss()],
  },
});
