'use client';

import type { ReactNode } from 'react';
import { useExperience } from './Experience';
import { PremiumPromo } from './PremiumPromo';
import { getSitePlans } from '../lib/pricing';
import { home } from '../lib/i18n/dict';
import { localizeHref, type Locale } from '../lib/i18n/config';
import { Gifts } from './Gifts';
import { BdMotion } from './BdMotion';
import { Split } from './Split';
import '../app/styles/home-bolder.css';

export function HomeBody({ children, locale }: { children: ReactNode; locale: Locale }) {
  const { presenting } = useExperience();
  return presenting ? children : <HomeSections locale={locale} />;
}

function HomeSections({ locale }: { locale: Locale }) {
  const t = home[locale];
  const premium = getSitePlans(locale).find(plan => plan.featured)!;
  const link = (href: string) => localizeHref(href, locale);
  return <div className="bd">
    <BdMotion />
    <section className="bd-intro" id="approche" aria-labelledby="bd-intro-title">
      <div>
        <h2 id="bd-intro-title" className="bd-h"><Split text={t.introTitle} /></h2>
        <p className="bd-sub">{t.introSub}</p>
      </div>
      <p className="bd-lead">{t.introLead}</p>
    </section>

    <section className="bd-cards" aria-label={t.servicesAria}>
      {t.cards.map(service => <a key={service.n} className="bd-card" href={link(service.href)}>
        <span className="bd-dot" aria-hidden="true" />
        <span className="bd-num">{service.n}</span>
        <span className="bd-card-body">
          <strong>{service.title}</strong>
          <span>{service.text}</span>
        </span>
      </a>)}
    </section>

    <section className="bd-split" id="offre" aria-labelledby="bd-offer-title">
      <p className="bd-pill"><i aria-hidden="true" />{t.offerPill}</p>
      <div>
        <h2 id="bd-offer-title" className="bd-h"><Split text={t.offerTitle} /></h2>
        <p className="bd-body">{t.offerBody}</p>
        <div className="bd-offer-box">
          {premium.regularPrice && <PremiumPromo price={premium.price} regularPrice={premium.regularPrice} locale={locale} />}
        </div>
        <Gifts locale={locale} />
        <div className="bd-actions">
          <a className="bd-btn" href={link('/tarifs/')}>{t.seePricing}</a>
          <a className="bd-link" href={link('/services/site-web/')}>{t.discoverSite}</a>
        </div>
      </div>
    </section>

    <section className="bd-split" id="questions" aria-labelledby="bd-faq-title">
      <p className="bd-pill"><i aria-hidden="true" /><span id="bd-faq-title">FAQ</span></p>
      <div className="bd-faq">
        {t.faq.map(([question, answer]) => <details key={question}>
          <summary>{question}<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m3 6 5 5 5-5" /></svg></summary>
          <p>{answer}</p>
        </details>)}
      </div>
    </section>

    <section className="bd-split bd-final" id="contact" aria-labelledby="bd-contact-title">
      <p className="bd-pill"><i aria-hidden="true" />{t.contactPill}</p>
      <div>
        <h2 id="bd-contact-title" className="bd-h"><Split text={t.contactTitle} /></h2>
        <a className="bd-btn" href={`mailto:Support@karwisoft.com?subject=${encodeURIComponent(t.mailSubject)}`}>{t.contactBtn}</a>
      </div>
    </section>
  </div>;
}
