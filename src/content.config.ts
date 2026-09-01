import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const artigos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artigos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tema: z.string(),
    draft: z.boolean().default(true),
    ogImage: z.string().default('/img/og-bruna-faria.png'),
  }),
});

export const collections = { artigos };
