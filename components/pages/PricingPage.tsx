import { SiteHeader } from '../SiteHeader';
import { PremiumPromo } from '../PremiumPromo';
import { Gifts } from '../Gifts';
import { BdMotion } from '../BdMotion';
import { BdFooter } from '../BdFooter';
import { Split } from '../Split';
import { adsPlans, getSitePlans, money } from '../../lib/pricing';
import { pricingPage } from '../../lib/i18n/dict';
import { localizeHref } from '../../lib/i18n/config';
import type { Locale } from '../../lib/i18n/config';
import '../../app/styles/home-bolder.css';
import '../../app/styles/tarifs.css';

const mail = (subject: string) => `mailto:Contact@Karwisoft.com?subject=${encodeURIComponent(subject)}`;
const Pill = ({ children }: { children: string }) => <p className="bd-pill"><i aria-hidden="true" />{children}</p>;

export function PricingPage({ locale }: { locale: Locale }) {
  const t = pricingPage[locale];
  return (
    <>
      <SiteHeader services locale={locale} />
      <main id="main" className="bd tf">
        <BdMotion />
        <section className="bd-intro" aria-labelledby="tf-title">
          <div>
            <h1 id="tf-title" className="bd-h"><Split text={t.title} /></h1>
            <p className="bd-sub">{t.sub}</p>
          </div>
          <p className="bd-lead">{t.lead}</p>
        </section>

        <section className="bd-split tf-first" aria-labelledby="tf-sites">
          <Pill>{t.sitePill}</Pill>
          <h2 id="tf-sites" className="bd-h"><Split text={t.siteTitle} /></h2>
        </section>
        <div className="tf-plans">
          {getSitePlans(locale).map(plan => (
            <article key={plan.id} className={`tf-plan${plan.featured ? ' tf-plan-main' : ''}`}>
              <header>
                <h3>{plan.name}</h3>
                {plan.featured && <span className="tf-tag">{pricingTag(locale)}</span>}
              </header>
              <p className="tf-tagline">{plan.tagline}</p>
              {plan.featured && plan.regularPrice
                ? <PremiumPromo price={plan.price} regularPrice={plan.regularPrice} locale={locale} />
                : <div className="tf-price"><strong>{money(plan.price, locale)}</strong><span>{oneTime(locale)}</span></div>}
              {plan.featured && <Gifts locale={locale} />}
              <ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
              <a className="tf-cta" href={localizeHref(`/commande/?plan=${plan.id}`, locale)}>{plan.cta}</a>
            </article>
          ))}
        </div>

        <section className="bd-split" aria-labelledby="tf-ads">
          <Pill>{t.adsPill}</Pill>
          <div>
            <h2 id="tf-ads" className="bd-h"><Split text={t.adsTitle} /></h2>
            <p className="bd-body">{t.adsBody}</p>
            <div className="tf-rows">
              {adsPlans.map(plan => (
                <div key={plan.id} className="tf-row">
                  <div><span>{t.monthlyBudget}</span><strong>{plan.budget[locale]}</strong></div>
                  <div className="tf-row-fee"><b>{money(plan.fee, locale)}</b><span>{t.perMonth}</span></div>
                  <a className="tf-cta" href={localizeHref(`/commande/?plan=premium&ads=${plan.id}`, locale)}>{t.start}</a>
                </div>
              ))}
            </div>
            <p className="tf-note">{t.over}</p>
          </div>
        </section>

        <section className="bd-split" aria-labelledby="tf-seo">
          <Pill>{t.seoPill}</Pill>
          <div>
            <h2 id="tf-seo" className="bd-h"><Split text={t.seoTitle} /></h2>
            <p className="bd-body">{t.seoBody}</p>
            <div className="bd-actions"><a className="bd-btn" href={mail(t.mailSeo)}>{t.quote}</a></div>
          </div>
        </section>

        <section className="bd-split" aria-labelledby="tf-faq">
          <p className="bd-pill"><i aria-hidden="true" /><span id="tf-faq">FAQ</span></p>
          <div className="bd-faq">
            {t.faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m3 6 5 5 5-5" /></svg></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="bd-split bd-final" aria-labelledby="tf-contact">
          <Pill>{t.contactPill}</Pill>
          <div>
            <h2 id="tf-contact" className="bd-h"><Split text={t.contactTitle} /></h2>
            <a className="bd-btn" href={mail(t.mailQuestion)}>{t.contactBtn}</a>
          </div>
        </section>
      </main>
      <BdFooter locale={locale} />
    </>
  );
}

const pricingTag = (locale: Locale) => (locale === 'en' ? 'Best offer' : 'Meilleure offre');
const oneTime = (locale: Locale) => (locale === 'en' ? 'One-time payment' : 'Paiement unique');
