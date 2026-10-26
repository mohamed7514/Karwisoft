import type { Locale } from './config';

export function money(value: number, locale: Locale) {
  return locale === 'en'
    ? `$${value.toLocaleString('en-CA')}`
    : `${value.toLocaleString('fr-CA').replace(/\s/g, ' ')} $`;
}
