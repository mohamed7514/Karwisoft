'use client';

import { usePathname } from 'next/navigation';
import { localizeHref, parsePath, type Locale } from '../lib/i18n/config';
import { shell } from '../lib/i18n/dict';

const labels: Record<Locale, string> = { fr: 'Français', en: 'English' };

// Same page in the other language; the language of each link is declared with hreflang/lang.
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const { path } = parsePath(pathname || '/');
  return <div className="language-switcher" role="group" aria-label={shell[locale].languageAria}>
    {(['fr', 'en'] as const).map(target => <a
      key={target}
      href={localizeHref(path, target)}
      hrefLang={target}
      lang={target}
      aria-label={labels[target]}
      aria-current={target === locale ? 'true' : undefined}
    >{target.toUpperCase()}</a>)}
  </div>;
}
