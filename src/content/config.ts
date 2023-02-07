import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string().default('David D Lawson'),
    description: z.string(),
    publishDate: z.string().transform((str) => new Date(str)),
    // tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
