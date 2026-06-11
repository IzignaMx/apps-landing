import es from './es.json';
import en from './en.json';

export type Locale = 'es' | 'en';
export type TranslationKeys = typeof es;

const translations: Record<Locale, TranslationKeys> = { es, en };

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale] || translations.es;
}

export function getLocaleFromUrl(url: URL): Locale {
  const lang = url.searchParams.get('lang');
  if (lang === 'en' || lang === 'es') return lang;
  return 'es';
}

export function getAlternateUrl(url: URL, locale: Locale): string {
  const newUrl = new URL(url);
  newUrl.searchParams.set('lang', locale);
  return newUrl.pathname + '?' + newUrl.searchParams.toString();
}
