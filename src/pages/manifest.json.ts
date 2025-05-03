import type { APIRoute } from 'astro';
import { SITE } from '@/site.config'; // Import SITE

const faviconPngSizes = [192, 512];

export const GET: APIRoute = async ({ url }) => {
  const baseUrl = url.origin;

  const icons = faviconPngSizes.map((size) => ({
    src: `${baseUrl}/favicon.png?width=${size}&height=${size}`,
    type: 'image/png',
    sizes: `${size}x${size}`,
  }));

  const manifest = {
    name: SITE.name, // Use SITE config
    short_name: SITE.name, // Use SITE config (no specific short_name)
    description: SITE.description, // Use SITE config
    start_url: '/',
    theme_color: '#65baf8',
    background_color: '#65baf8',
    display: 'standalone',
    icons,
  };

  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/json' },
  });
};
