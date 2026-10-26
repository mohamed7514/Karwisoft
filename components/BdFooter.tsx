import { localizeHref, type Locale } from '../lib/i18n/config';
import { shell } from '../lib/i18n/dict';

export function BdFooter({ locale }: { locale: Locale }) {
  const t = shell[locale];
  const link = (href: string) => localizeHref(href, locale);
  return <footer className="bd bd-footer">
    <a className="brand" href={link('/')}>karwisoft<span>marketing</span></a>
    <nav aria-label={t.footerNav}><a href={link('/services/')}>{t.services}</a><a href={link('/tarifs/')}>{t.pricing}</a><a href={link('/a-propos/')}>{t.about}</a><a href={link('/contact/')}>{t.contact}</a><a href={link('/')}>{t.home}</a></nav>
    <span>{t.rights}</span>
  </footer>;
}
