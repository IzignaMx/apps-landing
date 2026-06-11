# apps.izignamx.com — Agent Instructions

## Commands

```bash
bun install         # install deps
bun run dev         # astro dev server (http://localhost:4321)
bun run build       # static build to dist/
bun run preview     # preview production build locally
```

## Stack

- **Astro 6** (SSG) + **Tailwind CSS 4** (via `@tailwindcss/vite` plugin)
- Static output only — no SSR, no database
- Deployed to **GitHub Pages** with CNAME `apps.izignamx.com`
- GitHub Actions workflow: `.github/workflows/deploy.yml`

## Design System

Follows the IzignaMx design system exactly. Reference:
- Design doc: `D:\MEGA\IzignaMx - docs\DESIGN.md`
- Tokens: `D:\MEGA\IzignaMx - docs\tokens.json`

All design tokens are defined as Tailwind `@theme` variables in `src/styles/global.css`. Custom CSS classes: `.btn-primary`, `.btn-secondary`, `.accent-bar`, `.dot-grid`, `.gradient-orb-blue`, `.gradient-orb-purple`, `.cover-gradient`.

### Key rules

- Background: `#0f0f0f`. Cards: `#151515`. Footer: `#0a0a0a`.
- Primary: `#2E96FF`. CTA hover shifts blue → violet.
- Logo: "Izigna" in white + "Mx" in `#2E96FF`. Always `IzignaMx`, never with spaces/hyphens.
- Font display: ADAM.CG PRO (titles/logo only, preloaded WOFF2). Body: Inter. Mono: JetBrains Mono.
- Accent bar (4px bottom) on every card with service-specific color.
- Transitions: `300ms ease-out` on all interactive elements.
- Icons: outline/stroke style only, 2px stroke, rendered white via CSS filter.

## i18n

Bilingual ES/EN. Default: ES.
- Translations: `src/i18n/es.json`, `src/i18n/en.json`
- Helper: `src/i18n/index.ts` — `getLocaleFromUrl()`, `getTranslations(locale)`
- Language toggle via `?lang=en` or `?lang=es` query parameter
- Every component receives `locale` as a prop from the page

## Architecture

Single-page landing (`src/pages/index.astro`):
```
Layout.astro (meta, fonts, JSON-LD)
  Header.astro (sticky nav, lang toggle)
  Hero.astro (tagline, CTAs, gradient orbs)
  FeaturedApp.astro (OmniSync detailed card with pricing)
  AppCatalog.astro → AppCard.astro (grid of all apps)
  TrustSection.astro (IzignaMx agency info, stats)
  Footer.astro (links, WhatsApp, copyright)
```

### Adding a new app

1. Add entries to `src/i18n/es.json` and `src/i18n/en.json` under `apps`
2. Add the app object to the `apps` array in `AppCatalog.astro`
3. If it needs a dedicated page, create `src/pages/{app-slug}.astro`

### Adding new translation keys

1. Add to both `es.json` and `en.json` (must stay in sync)
2. Use `t.section.key` pattern in components via `getTranslations(locale)`
