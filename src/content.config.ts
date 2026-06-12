import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    app: z.enum(['omnisync', 'general']).default('general'),
    section: z.enum(['getting-started', 'api', 'pricing', 'faq', 'changelog', 'guides']).default('getting-started'),
    order: z.number().default(0),
    lang: z.enum(['en', 'es']).default('en'),
    updated: z.date().optional(),
  }),
});

export const collections = { docs };
