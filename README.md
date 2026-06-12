# IzignaMx Apps Landing

Landing page and documentation portal for [IzignaMx](https://izignamx.com) Shopify applications, deployed to [apps.izignamx.com](https://apps.izignamx.com).

## Stack

- **Astro 6** with Turbopack
- **Tailwind CSS v4**
- **MDX** for documentation content
- **Pagefind** for client-side search
- **GitHub Pages** deployment

## Commands

```bash
npm install
npm run dev          # dev server at localhost:4321
npm run build        # astro build + pagefind index
npm run preview      # preview production build
```

## Project Structure

```
src/
├── components/     # Header, Footer, FeaturedApp, CatalogSection, etc.
├── content/
│   └── docs/       # MDX documentation files (omnisync/)
├── i18n/           # en.json, es.json translations
├── layouts/        # Layout.astro (landing), DocsLayout.astro (docs)
├── pages/
│   ├── index.astro           # landing page
│   ├── 404.astro             # custom 404
│   └── docs/
│       ├── index.astro       # docs hub
│       └── omnisync/
│           └── [slug].astro  # dynamic doc pages
├── styles/         # global.css (design tokens, prose-docs)
└── content.config.ts  # Zod schema for docs collection
```

## Adding a New Doc Page

1. Create `src/content/docs/omnisync/my-page.md` with frontmatter matching the Zod schema
2. Add a sidebar entry in `DocsLayout.astro` sections array
3. Rebuild — Pagefind auto-indexes pages with `data-pagefind-body`

## License

GNU General Public License v3.0 — see [LICENSE](./LICENSE).
