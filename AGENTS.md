# apps.izignamx.com — Agent Instructions

## Commands

```bash
bun install         # install deps
bun run dev         # astro dev server (http://localhost:4321)
bun run build       # astro build + pagefind index generation
bun run preview     # preview production build locally
```

## Stack

- **Astro 6** (SSG) + **Tailwind CSS 4** (via `@tailwindcss/vite` plugin) + **MDX**
- Static output only — no SSR, no database
- Content Collections with Zod schema for docs (`src/content.config.ts`)
- **Pagefind** for client-side docs search (index built post-build)
- Deployed to **GitHub Pages** with CNAME `apps.izignamx.com`
- GitHub Actions workflow: `.github/workflows/deploy.yml`

## Design System

Follows the IzignaMx design system exactly. Reference:
- Design doc: `D:\MEGA\IzignaMx - docs\DESIGN.md`
- Tokens: `D:\MEGA\IzignaMx - docs\tokens.json`

All design tokens are defined as Tailwind `@theme` variables in `src/styles/global.css`. Custom CSS classes: `.btn-primary`, `.btn-secondary`, `.accent-bar`, `.dot-grid`, `.gradient-orb-blue`, `.gradient-orb-purple`. Utility: `.sr-only`.

### Key rules

- Background: `#0f0f0f`. Cards: `#151515`. Footer: `#0a0a0a`.
- Primary: `#2E96FF`. CTA hover shifts blue → violet.
- Logo: "Izigna" in white + "Mx" in `#2E96FF`. Always `IzignaMx`, never with spaces/hyphens.
- Font display: ADAM.CG PRO (titles/logo only, preloaded WOFF2 at `/fonts/adam-cg-pro.woff2`). Body: Inter (weights 400/600/700 only). Mono: JetBrains Mono (400 only).
- Accent bar (4px bottom) on every card with service-specific color.
- Transitions: `300ms ease-out` on all interactive elements.
- Icons: outline/stroke style only, 2px stroke, rendered white via CSS filter.

## i18n

Bilingual ES/EN. Default: EN.
- Translations: `src/i18n/es.json`, `src/i18n/en.json`
- Helper: `src/i18n/index.ts` — `getLocaleFromUrl()`, `getTranslations(locale)`
- Language toggle via `?lang=en` or `?lang=es` query parameter
- Every component receives `locale` as a prop from the page
- Layout reads `<title>` and `<meta description>` from `t.meta.*` keys — do not hardcode
- WhatsApp number: `525533760889` (used in Header + Footer)
- Browser language detection: inline script in Layout detects `navigator.language` and redirects to `?lang=es` on first visit if Spanish. Preference stored in `localStorage('izigna-locale')`.

## Architecture

Landing page (`src/pages/index.astro`) + docs portal (`src/pages/docs/`) + custom 404 (`src/pages/404.astro`):

```
Landing:
  Layout.astro (meta, fonts, JSON-LD)
    Header.astro (sticky nav, lang toggle)
    Hero.astro (tagline, CTAs, gradient orbs)
    FeaturedApp.astro (OmniSync detailed card with pricing)
    AppCatalog.astro → AppCard.astro (grid of all apps)
    TrustSection.astro (IzignaMx agency info, stats)
    Footer.astro (links, WhatsApp, copyright)

Docs:
  DocsLayout.astro (sidebar nav, DocSearch, Footer)
    DocSearch.astro (Pagefind client-side search)
    src/content/docs/omnisync/*.md (6 doc files)
    src/pages/docs/index.astro (docs hub)
    src/pages/docs/omnisync/[...slug].astro (dynamic rendering)
```

### Content Collections

Docs use Astro Content Collections (`src/content.config.ts`). Schema:
```ts
{ title: string, description: string, app: 'omnisync' | 'general',
  section: 'getting-started' | 'api' | 'pricing' | 'faq' | 'changelog' | 'guides',
  order: number, lang: 'en' | 'es', updated?: Date }
```

### Adding a new doc page

1. Create `src/content/docs/{app}/{section}.md` with frontmatter matching the schema
2. The page is automatically available at `/docs/{app}/{section}`

### Adding a new app (landing)

1. Add entries to `src/i18n/es.json` and `src/i18n/en.json` under `apps`
2. Add the app object to the `apps` array in `AppCatalog.astro`
3. If it needs docs, create `src/content/docs/{app-slug}/` and add routes

### Adding new translation keys

1. Add to both `es.json` and `en.json` (must stay in sync)
2. Use `t.section.key` pattern in components via `getTranslations(locale)`

## Accessibility

- Skip-to-content link in Layout (hidden until focused)
- `:focus-visible` outline on all interactive elements (2px solid `--color-izigna`)
- All `target="_blank"` links have `<span class="sr-only"> (opens in new window)</span>`
- Pricing sections use `<ul role="list">` + `<li>` for screen reader structure
- Decorative images: `alt=""` + `aria-hidden="true"`
- Status badges use `role="status"` (not disabled buttons)
- Mobile nav uses `<details>` element (no JS dependency)

## SEO

- Sitemap auto-generated via `@astrojs/sitemap` — referenced in `robots.txt`
- `<link rel="canonical">` on every page (strips query params)
- `hreflang` alternate links for EN/ES
- JSON-LD structured data: Organization + ItemList with all 4 apps + pricing offers
- OG image source: `public/og-image.svg` (1200x630 design). Convert to PNG for production: `public/og-image.png` (replace current 1x1 placeholder manually or via CI).
- `<meta name="robots" content="index, follow">` on all pages
