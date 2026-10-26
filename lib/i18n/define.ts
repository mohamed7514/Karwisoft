import type { Locale } from './config';

/** Both languages must have the same shape: a missing key fails the type check. */
export function define<T>(fr: T, en: T): Record<Locale, T> {
  return { fr, en };
}
