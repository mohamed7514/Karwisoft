export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

// French is served at the root; English lives under /en/ with translated slugs where it matters.
const enSlugs: Record<string, string> = {
  '/tarifs/': '/pricing/',
  '/services/site-web/': '/services/website/',
  '/services/seo-ia/': '/services/seo-ai/',
  '/a-propos/': '/about/',
};
const frSlugs = Object.fromEntries(Object.entries(enSlugs).map(([fr, en]) => [en, fr]));

const withoutSuffix = (href: string) => href.match(/^[^?#]*/)![0];
const suffix = (href: string) => href.slice(withoutSuffix(href).length);

export function localizeHref(href: string, locale: Locale) {
  if (!href.startsWith('/') || href.startsWith('/assets') || /\.[a-z0-9]+$/i.test(withoutSuffix(href))) return href;
  const path = withoutSuffix(href);
  return locale === 'fr' ? href : `/en${enSlugs[path] ?? path}${suffix(href)}`;
}

/** Canonical (French) path and locale of a public pathname. */
export function parsePath(pathname: string): { locale: Locale; path: string } {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (normalized === '/en/' || normalized.startsWith('/en/')) {
    const rest = normalized.slice('/en'.length) || '/';
    return { locale: 'en', path: frSlugs[rest] ?? rest };
  }
  return { locale: 'fr', path: normalized };
}

export function alternates(path: string, locale: Locale) {
  return {
    canonical: localizeHref(path, locale),
    languages: { fr: localizeHref(path, 'fr'), en: localizeHref(path, 'en'), 'x-default': localizeHref(path, 'fr') },
  };
}
