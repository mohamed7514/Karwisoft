import type { Metadata } from 'next';
import { alternates, type Locale } from './config';

export function pageMeta(locale: Locale, path: string, title: string, description: string): Metadata {
  return { title, description, alternates: alternates(path, locale), openGraph: { title, description, locale: locale === 'en' ? 'en_CA' : 'fr_CA' } };
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3100';
