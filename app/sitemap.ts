import type { MetadataRoute } from 'next';
import { localizeHref } from '../lib/i18n/config';
import { siteUrl } from '../lib/i18n/meta';

export const dynamic = 'force-static';

const paths = ['/', '/services/', '/services/site-web/', '/services/google-ads/', '/services/seo/', '/services/seo-ia/', '/tarifs/', '/a-propos/', '/contact/', '/commande/'];

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = (path: string) => ({ languages: { fr: siteUrl + localizeHref(path, 'fr'), en: siteUrl + localizeHref(path, 'en') } });
  return (['fr', 'en'] as const).flatMap(locale => paths.map(path => ({ url: siteUrl + localizeHref(path, locale), alternates: alternates(path) })));
}
