import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { APP_KEYS } from './data/apps';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // App key from the central catalog. New apps automatically accepted.
    // `general` is reserved for cross-app pages (style guide, indexes).
    app: z.enum([APP_KEYS[0], ...APP_KEYS.slice(1), 'general']).default('general'),
    section: z.enum(['getting-started', 'api', 'pricing', 'faq', 'changelog', 'guides']).default('getting-started'),
    order: z.number().default(0),
    lang: z.enum(['en', 'es']).default('en'),
    updated: z.date().optional(),
  }),
});

export const collections = { docs };
