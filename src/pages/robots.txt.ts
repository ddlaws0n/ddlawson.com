import type { APIRoute } from 'astro';
import { SITE } from '@/config';

export const GET: APIRoute = async () => {
  return new Response(
    `
# Hello, robots! here's my instructions for ddlawson.com
# For more info: https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt

User-agent: *
Disallow: /admin

Sitemap: ${SITE.origin}/sitemap.xml
    `.trim(),
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
};
