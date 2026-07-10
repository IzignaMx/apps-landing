import es from './es.json';
import en from './en.json';

export type Locale = 'es' | 'en';
export type TranslationKeys = typeof en;

const translations: Record<Locale, TranslationKeys> = { es, en };

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale] || translations.en;
}

export interface AppTranslation {
  name: string;
  shortDesc: string;
}

/** Typed accessor for app translations — replaces scattered `as Record` assertions. */
export function getAppTranslation(t: TranslationKeys, key: string): AppTranslation | undefined {
  return (t.apps as Record<string, AppTranslation> | undefined)?.[key];
}

export function getLocaleFromUrl(url: URL): Locale {
  return getLocaleFromPathname(url.pathname);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.replace(/^\//, '').split('/');
  if (segments[0] === 'es') return 'es';
  return 'en';
}

export function localePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : '/' + path;
  if (locale === 'es') {
    const stripped = stripLocale(clean);
    return '/es' + (stripped === '/' ? '/' : stripped);
  }
  return stripLocale(clean);
}

export function stripLocale(path: string): string {
  return path.replace(/^\/es(?:\/|$)/, '/') || '/';
}

export function getAlternateUrl(url: URL, targetLocale: Locale): string {
  const stripped = stripLocale(url.pathname);
  return localePath(stripped === '/' ? '/' : stripped, targetLocale);
}
