import { SiteHeader } from './SiteHeader';
import { BdMotion } from './BdMotion';
import { BdFooter } from './BdFooter';
import { Split } from './Split';
import { adsPlans, getSitePlans, money } from '../lib/pricing';
import { getServicePages, type ServicePage } from '../lib/service-pages';
import { detail } from '../lib/i18n/dict';
import { localizeHref, type Locale } from '../lib/i18n/config';
import '../app/styles/home-bolder.css';
import '../app/styles/tarifs.css';
import '../app/styles/services-bolder.css';

const Pill = ({ children }: { children: string }) => <p className="bd-pill"><i aria-hidden="true" />{children}</p>;
const mail = (subject: string) => `mailto:Support@karwisoft.com?subject=${encodeURIComponent(subject)}`;

function Pricing({ kind, locale }: { kind: ServicePage['pricing']; locale: Locale }) {
  const t = detail[locale];
  const link = (href: string) => localizeHref(href, locale);
  if (kind === 'site') return <div className="sx-price">
    {getSitePlans(locale).map(plan => <div key={plan.id} className="tf-row sx-price-row"><div><span>{t.offer}</span><strong>{plan.name}</strong></div><div className="tf-row-fee"><b>{money(plan.price, locale)}</b><span>{t.oneTime}</span></div></div>)}
    <a className="bd-link" href={link('/tarifs/')}>{t.seeOffers}</a>
  </div>;
  if (kind === 'ads') return <div className="sx-price">
    {adsPlans.map(plan => <div key={plan.id} className="tf-row sx-price-row"><div><span>{t.adsBudget}</span><strong>{plan.budget[locale]}</strong></div><div className="tf-row-fee"><b>{money(plan.fee, locale)}</b><span>{t.adsFee}</span></div></div>)}
    <p className="tf-note">{t.adsNote}</p>
    <a className="bd-link" href={link('/tarifs/')}>{t.seePricing}</a>
  </div>;
  return <div className="sx-price">
    <div className="tf-row sx-price-row"><div><span>{t.price}</span><strong>{t.byQuote}</strong></div></div>
    <p className="tf-note">{t.quoteNote}</p>
    <a className="bd-link" href={link('/tarifs/')}>{t.seePricing}</a>
  </div>;
}

export function ServiceDetail({ page, locale }: { page: ServicePage; locale: Locale }) {
  const t = detail[locale];
  const pages = getServicePages(locale);
  const index = pages.findIndex(item => item.slug === page.slug);
  const next = pages[(index + 1) % pages.length];
  const link = (href: string) => localizeHref(href, locale);
  return <>
    <SiteHeader services locale={locale} />
    <main id="main" className="bd tf sx">
      <BdMotion />
      <section className="bd-intro" aria-labelledby="sd-title">
        <div>
          <p className="sx-crumb"><a href={link('/services/')}>{t.services}</a> / {page.name}</p>
          <h1 id="sd-title" className="bd-h"><Split text={page.title} /></h1>
        </div>
        <p className="bd-lead">{page.lead}</p>
      </section>

      <div className="sx-cols sx-highlights">
        {page.highlights.map(([title, text]) => <div key={title} className="sx-step"><strong>{title}</strong><p>{text}</p></div>)}
      </div>

      <section className="bd-split" aria-labelledby="sd-why">
        <Pill>{t.why}</Pill>
        <div>
          <h2 id="sd-why" className="bd-h"><Split text={page.whyTitle} /></h2>
          {page.why.map(paragraph => <p key={paragraph} className="bd-body">{paragraph}</p>)}
        </div>
      </section>

      <section className="bd-split" aria-labelledby="sd-plan">
        <Pill>{t.plan}</Pill>
        <div>
          <h2 id="sd-plan" className="bd-h"><Split text={page.planTitle} /></h2>
          <ol className="sx-steps sx-plan">
            {page.steps.map((step, i) => <li key={step.title} className="sx-step"><span>{String(i + 1).padStart(2, '0')}</span><div><strong>{step.title}</strong><p>{step.text}</p><em>{step.note}</em></div></li>)}
          </ol>
        </div>
      </section>

      <section className="bd-split" aria-labelledby="sd-role">
        <Pill>{t.role}</Pill>
        <div>
          <h2 id="sd-role" className="bd-h"><Split text={t.roleTitle} /></h2>
          <div className="sx-two">
            <div className="sx-step"><strong>{t.youDo}</strong><ul className="sx-checks">{page.yourRole.map(item => <li key={item}>{item}</li>)}</ul></div>
            <div className="sx-step"><strong>{t.youDont}</strong><ul className="sx-checks sx-no">{page.notYours.map(item => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </div>
      </section>

      <section className="bd-split" aria-labelledby="sd-price">
        <Pill>{t.price}</Pill>
        <div>
          <h2 id="sd-price" className="bd-h"><Split text={t.priceTitle} /></h2>
          <Pricing kind={page.pricing} locale={locale} />
        </div>
      </section>

      <section className="bd-split" aria-labelledby="sd-faq">
        <p className="bd-pill"><i aria-hidden="true" /><span id="sd-faq">FAQ</span></p>
        <div className="bd-faq">
          {page.faq.map(([question, answer]) => <details key={question}>
            <summary>{question}<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m3 6 5 5 5-5" /></svg></summary>
            <p>{answer}</p>
          </details>)}
        </div>
      </section>

      <section id="contact" className="bd-split bd-final" aria-labelledby="sd-cta">
        <Pill>{t.contact}</Pill>
        <div>
          <h2 id="sd-cta" className="bd-h"><Split text={page.cta.title} /></h2>
          <p className="bd-body">{page.cta.text}</p>
          <div className="bd-actions">
            <a className="bd-btn" href={mail(page.cta.subject)}>{page.cta.button}</a>
            <a className="bd-link" href={link(`/services/${next.slug}/`)}>{t.next} {next.name}</a>
          </div>
        </div>
      </section>
    </main>
    <BdFooter locale={locale} />
  </>;
}
