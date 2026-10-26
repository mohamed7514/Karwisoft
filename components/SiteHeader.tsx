import { LandingChrome } from './Experience';
import { SiteNavigation } from './SiteNavigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { localizeHref, type Locale } from '../lib/i18n/config';
import { shell } from '../lib/i18n/dict';

export function SiteHeader({ services = false, locale = 'fr' }: { services?: boolean; locale?: Locale }) {
  const t = shell[locale];
  const home = localizeHref('/', locale);
  const content = <>
    <a className="brand" href={services ? home : '#accueil'} aria-label={t.brandAria}>
      karwisoft<span>marketing<span className="brand-dot">®</span></span>
    </a>
    <LanguageSwitcher locale={locale} />
    <SiteNavigation services={services} locale={locale} />
  </>;
  return <>
    <a className="skip" href="#main">{t.skip}</a>
    {services ? <header className="header">{content}</header> : <LandingChrome className="header" as="header">{content}</LandingChrome>}
  </>;
}
