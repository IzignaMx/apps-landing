/**
 * Single source of truth for the IzignaMx apps catalog.
 *
 * This module drives:
 *   - the AppCatalog grid on the home page
 *   - the FeaturedApp section (loops over apps with `featured: true`)
 *   - the JSON-LD ItemList in Layout.astro
 *   - the Footer "Apps" column
 *   - the docs collection schema (`app` enum is widened via AppKey)
 *   - the per-app docs routes (/docs/[app]/[slug])
 *   - the per-app docs sidebar in DocsLayout
 *
 * Adding a new app = add ONE entry here + a `t.apps.<key>` translation block
 * in src/i18n/{en,es}.json. Nothing else changes.
 *
 * Do NOT import from Astro components into this file — it must be importable
 * from plain TypeScript (for the JSON-LD builder, tests, etc.).
 */

export type AppStatus = 'active' | 'coming' | 'planned';
export type AppPlatform =
  | 'Shopify'
  | 'BigCommerce'
  | 'WordPress / WooCommerce'
  | 'Odoo'
  | string;

export interface AppPlan {
  name: string;
  detail: string;
  /** Display price string, e.g. "$9.99/mo" or "$0". Already localized. */
  price: string;
  popular?: boolean;
  /** Numeric USD price used in JSON-LD structured data. `null` for free / custom. */
  priceUsd: number | null;
}

export interface AppCatalogEntry {
  /** Stable URL-safe slug. Also used as the docs collection app key. */
  key: string;
  /** Translation key under `t.apps.<key>`. */
  translationKey: string;
  platform: AppPlatform;
  status: AppStatus;
  /** Whether the app gets the "featured" hero section on the landing. */
  featured: boolean;
  /** Tailwind class for accent color (matches `--color-service-*` tokens). */
  accentClass: string;
  /** Raw hex accent for inline styles / JSON-LD. */
  accentHex: string;
  /** Inline SVG markup for the card icon. */
  iconSvg: string;
  /** Anchor id on the home page (#omnisync etc.). Used by catalog CTAs. */
  anchorId: string;
  /**
   * Where the "Install" CTA points. When status === 'active' and installUrl
   * is set, the card renders a real link; otherwise it scrolls to the
   * featured section anchor.
   */
  installUrl?: string;
  /** Plans used in the featured section + JSON-LD offers. */
  plans: AppPlan[];
  /** Path to per-app docs home (computed from key). */
  docsBasePath: string;
}

// ─── Icon SVGs (kept inline so the catalog is self-contained) ────────────────
const SYNC_ICON = '<svg class="w-6 h-6" style="filter: brightness(0) invert(1) opacity(0.9);" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>';
const ERP_ICON = '<svg class="w-6 h-6" style="filter: brightness(0) invert(1) opacity(0.9);" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>';
const CART_ICON = '<svg class="w-6 h-6" style="filter: brightness(0) invert(1) opacity(0.9);" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>';
const WP_ICON = '<svg class="w-6 h-6" style="filter: brightness(0) invert(1) opacity(0.9);" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>';

// ─── Shared plans (kept consistent across apps where possible) ───────────────
const OMNISYNC_PLANS: AppPlan[] = [
  { name: 'Free Trial', detail: '14 days', price: '$0', priceUsd: 0 },
  { name: 'Starter', detail: 'ML • 100 products', price: '$9.99/mo', priceUsd: 9.99 },
  { name: 'Growth', detail: 'ML+WA+IG • 1K products', price: '$24.99/mo', priceUsd: 24.99, popular: true },
  { name: 'Pro', detail: '4 channels • 5K prod', price: '$44.99/mo', priceUsd: 44.99 },
  { name: 'Enterprise', detail: 'All + AI • ∞', price: '$59.99/mo', priceUsd: 59.99 },
];

const OMNISYNC_PLANS_ES: AppPlan[] = [
  { name: 'Free Trial', detail: '14 días', price: '$0', priceUsd: 0 },
  { name: 'Starter', detail: 'ML • 100 productos', price: '$9.99/mes', priceUsd: 9.99 },
  { name: 'Growth', detail: 'ML+WA+IG • 1K productos', price: '$24.99/mes', priceUsd: 24.99, popular: true },
  { name: 'Pro', detail: '4 canales • 5K prod', price: '$44.99/mes', priceUsd: 44.99 },
  { name: 'Enterprise', detail: 'Todo + IA • ∞', price: '$59.99/mes', priceUsd: 59.99 },
];

/**
 * Master catalog. Order = display order on the landing page.
 *
 * To add a 2nd Shopify app:
 *   1. Append an entry here.
 *   2. Add `t.apps.<key>` to en.json and es.json.
 *   3. Create `src/content/docs/<key>/*.md` for the docs.
 *   4. (Optional) Set `installUrl` once the Shopify listing is live.
 *
 * The catalog grid, FeaturedApp, JSON-LD, Footer, docs routes, and docs
 * sidebar will all pick it up automatically.
 */
export const APP_CATALOG: AppCatalogEntry[] = [
  {
    key: 'omnisync',
    translationKey: 'omnisync',
    platform: 'Shopify',
    status: 'active',
    featured: true,
    accentClass: 'bg-service-webdev',
    accentHex: '#3b82f6',
    iconSvg: SYNC_ICON,
    anchorId: 'omnisync',
    // When the app is approved, set this to the real Shopify install URL:
    //   https://www.shopify.com/admin/oauth/install?client_id=<API_KEY>&...
    // or the App Store listing:
    //   https://apps.shopify.com/omnisync
    // For now we leave it undefined so the CTA renders the "under review"
    // badge and scrolls to #omnisync in the catalog card.
    installUrl: undefined,
    plans: OMNISYNC_PLANS,
    docsBasePath: '/docs/omnisync',
  },
  {
    key: 'odoo-sync',
    translationKey: 'odoo-sync',
    platform: 'Odoo',
    status: 'planned',
    featured: false,
    accentClass: 'bg-service-odoo',
    accentHex: '#10b981',
    iconSvg: ERP_ICON,
    anchorId: 'odoo-sync',
    plans: [],
    docsBasePath: '/docs/odoo-sync',
  },
  {
    key: 'bigcommerce-sync',
    translationKey: 'bigcommerce-sync',
    platform: 'BigCommerce',
    status: 'planned',
    featured: false,
    accentClass: 'bg-service-bigcommerce',
    accentHex: '#ef4444',
    iconSvg: CART_ICON,
    anchorId: 'bigcommerce-sync',
    plans: [],
    docsBasePath: '/docs/bigcommerce-sync',
  },
  {
    key: 'wordpress-sync',
    translationKey: 'wordpress-sync',
    platform: 'WordPress / WooCommerce',
    status: 'planned',
    featured: false,
    accentClass: 'bg-service-wordpress',
    accentHex: '#0284c7',
    iconSvg: WP_ICON,
    anchorId: 'wordpress-sync',
    plans: [],
    docsBasePath: '/docs/wordpress-sync',
  },
];

/**
 * Localized plans for the featured section, keyed by app then locale.
 * Add a key here when you introduce localized plan grids for new apps.
 */
export const APP_PLANS_LOCALIZED: Record<string, Record<'en' | 'es', AppPlan[]>> = {
  'omnisync': {
    en: OMNISYNC_PLANS,
    es: OMNISYNC_PLANS_ES,
  },
};

export function getFeaturedApps(): AppCatalogEntry[] {
  return APP_CATALOG.filter((app) => app.featured);
}

export function getActiveApps(): AppCatalogEntry[] {
  return APP_CATALOG.filter((app) => app.status === 'active');
}

export function getAppByKey(key: string): AppCatalogEntry | undefined {
  return APP_CATALOG.find((app) => app.key === key);
}

export function getPlansFor(appKey: string, locale: 'en' | 'es'): AppPlan[] {
  return APP_PLANS_LOCALIZED[appKey]?.[locale] ?? getAppByKey(appKey)?.plans ?? [];
}

/** All app keys — used to widen the docs content schema enum dynamically. */
export const APP_KEYS = APP_CATALOG.map((a) => a.key) as [
  string,
  ...string[]
];

/** Count of apps that are visible on the landing (active + planned). */
export function getVisibleAppCount(): number {
  return APP_CATALOG.length;
}

/** Count of apps that are actually published. Drives the "Published apps" stat. */
export function getPublishedAppCount(): number {
  return getActiveApps().length;
}
