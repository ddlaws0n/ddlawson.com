import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@/config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(context: { site: any }) {
  const posts = await getCollection('writing');
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/writing/${post.slug}/`,
    })),
  });
}
