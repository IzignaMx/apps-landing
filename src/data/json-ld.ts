import { APP_CATALOG, getPlansFor, type AppCatalogEntry } from './apps';
import { getTranslations, getAppTranslation } from '../i18n';

/**
 * Builds the JSON-LD ItemList for the landing page from the catalog data.
 * Replaces the hardcoded inline JSON-LD in Layout.astro so the structured
 * data is always in sync with the catalog grid.
 */

interface JsonLdOffer {
  '@type': 'Offer';
  price: string;
  priceCurrency: string;
  name?: string;
  description?: string;
}

interface JsonLdApp {
  '@type': 'SoftwareApplication';
  position: number;
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  status?: string;
  offers?: JsonLdOffer[];
}

export interface JsonLdOrganization {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  parentOrganization: {
    '@type': string;
    name: string;
    url: string;
  };
  owns: {
    '@type': string;
    name: string;
    numberOfItems: number;
    itemListElement: JsonLdApp[];
  };
}

function statusForSchema(app: AppCatalogEntry): string | undefined {
  if (app.status === 'active') return undefined; // published — omit status
  if (app.status === 'coming') return 'Planned';
  if (app.status === 'planned') return 'Planned';
  return undefined;
}

function offersFor(app: AppCatalogEntry): JsonLdOffer[] | undefined {
  if (app.plans.length === 0) return undefined;
  return app.plans.map((plan) => ({
    '@type': 'Offer' as const,
    price: plan.priceUsd === null ? '0' : String(plan.priceUsd),
    priceCurrency: 'USD',
    name: plan.name,
    description: plan.detail,
  }));
}

export function buildOrganizationJsonLd(args: {
  description: string;
  locale: 'en' | 'es';
}): JsonLdOrganization {
  const t = getTranslations(args.locale);
  const itemListElement: JsonLdApp[] = APP_CATALOG.map((app, idx) => {
    const entry: JsonLdApp = {
      '@type': 'SoftwareApplication',
      position: idx + 1,
      name: getAppTranslation(t, app.translationKey)?.name ?? app.key,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
    };
    const status = statusForSchema(app);
    if (status) entry.status = status;
    const offers = offersFor(app);
    if (offers && offers.length > 0) entry.offers = offers;
    return entry;
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'IzignaMx Apps',
    url: 'https://apps.izignamx.com',
    logo: 'https://apps.izignamx.com/images/isotipo.png',
    description: args.description,
    parentOrganization: {
      '@type': 'Organization',
      name: 'IzignaMx',
      url: 'https://izignamx.com',
    },
    owns: {
      '@type': 'ItemList',
      name: 'IzignaMx Apps',
      numberOfItems: APP_CATALOG.length,
      itemListElement,
    },
  };
}

/**
 * Builds a SoftwareApplication JSON-LD for an individual app — useful for
 * per-app detail pages or structured data on the featured section.
 */
export function buildAppJsonLd(app: AppCatalogEntry, locale: 'en' | 'es'): Record<string, unknown> {
  const t = getTranslations(locale);
  const offers = offersFor(app);
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: getAppTranslation(t, app.translationKey)?.name ?? app.key,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    ...(offers && offers.length > 0 ? { offers } : {}),
    ...(app.status !== 'active' ? { status: 'Planned' } : {}),
    publisher: {
      '@type': 'Organization',
      name: 'IzignaMx',
      url: 'https://izignamx.com',
    },
  };
}

// Re-export so consumers can fetch plans without circular imports
export { getPlansFor };
