import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const writingCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('David D Lawson'),
    authorAvatar: z.string().optional(),
    category: z.string().default('Writing'),
    publishDate: z.string().transform((str) => new Date(str)),
    lastUpdatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    draft: z.boolean().default(true),
  }),
});

export const collections = {
  writing: writingCollection,
};
