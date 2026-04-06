import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, fontProviders } from 'astro/config';

// Core configs
import { SITE } from './src/site.config';

// Integrations
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import compress from 'astro-compress';
import icon from 'astro-icon';

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
    imageService: true,
  }),

  // Markdown Configuration
  markdown: {
    syntaxHighlight: 'shiki',
  },

  // Font Configuration
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Bricolage Grotesque',
      display: 'swap',
      weights: ['200 800'],
      cssVariable: '--font-display',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Outfit',
      display: 'swap',
      weights: ['300 500'],
      cssVariable: '--font-body',
    },
  ],

  // Integrations
  integrations: [
    icon({ iconDir: 'src/assets/icons' }),
    sitemap({
      customPages: ['https://analytics.lawson.dev/'],
    }),
    mdx(),
    compress({
      CSS: false,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: false,
    }),
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugins: [tailwindcss() as any],
  },
});
