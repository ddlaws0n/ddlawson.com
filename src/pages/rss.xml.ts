import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@/site.config';

export async function GET(context: { site: string }) {
  const posts = await getCollection('writing');
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/writing/${post.slug}/`,
    })),
    customData: `<?xml-stylesheet href="/rss/styles.xsl" type="text/xsl"?>`,
  });
}
