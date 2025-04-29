import type { APIRoute } from 'astro';

const faviconPngSizes = [192, 512];

export const GET: APIRoute = async ({ url }) => {
  const baseUrl = url.origin;

  const icons = faviconPngSizes.map((size) => ({
    src: `${baseUrl}/favicon/png?width=${size}&height=${size}`,
    type: 'image/png',
    sizes: `${size}x${size}`,
  }));

  const manifest = {
    name: 'David D Lawson',
    short_name: 'D Lawson',
    description: 'My little slice of the web',
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
