import { SiteHeader } from '../SiteHeader';
import { BdMotion } from '../BdMotion';
import { BdFooter } from '../BdFooter';
import { Split } from '../Split';
import { servicesPage } from '../../lib/i18n/dict';
import { localizeHref, type Locale } from '../../lib/i18n/config';
import '../../app/styles/home-bolder.css';
import '../../app/styles/tarifs.css';
import '../../app/styles/services-bolder.css';

const Pill = ({ children }: { children: string }) => <p className="bd-pill"><i aria-hidden="true" />{children}</p>;

export function ServicesPage({ locale }: { locale: Locale }) {
  const t = servicesPage[locale];
  const link = (href: string) => localizeHref(href, locale);
  return (
    <>
      <SiteHeader services locale={locale} />
      <main id="main" className="bd tf sx">
        <BdMotion />
        <section className="bd-intro" aria-labelledby="sx-title">
          <div>
            <h1 id="sx-title" className="bd-h"><Split text={t.title} /></h1>
            <p className="bd-sub">{t.sub}</p>
          </div>
          <p className="bd-lead">{t.lead}</p>
        </section>

        <div className="sx-list">
          {t.cards.map(service => (
            <article key={service.n} className="sx-row">
              <div className="sx-head">
                <span className="bd-dot" aria-hidden="true" />
                <span className="sx-num">{service.n}</span>
                <h2>{service.title}</h2>
              </div>
              <div className="sx-body">
                <p>{service.text}</p>
                <ul>{service.points.map(point => <li key={point}>{point}</li>)}</ul>
                <a className="bd-link" href={link(service.href)}>{t.seeService}</a>
              </div>
            </article>
          ))}
        </div>

        <section className="bd-split" aria-labelledby="sx-why">
          <Pill>{t.whyPill}</Pill>
          <div>
            <h2 id="sx-why" className="bd-h"><Split text={t.whyTitle} /></h2>
            <div className="sx-cols">
              {t.reasons.map(([title, text]) => <div key={title} className="sx-step"><strong>{title}</strong><p>{text}</p></div>)}
            </div>
          </div>
        </section>

        <section className="bd-split" aria-labelledby="sx-how">
          <Pill>{t.startPill}</Pill>
          <div>
            <h2 id="sx-how" className="bd-h"><Split text={t.startTitle} /></h2>
            <ol className="sx-steps">
              {t.steps.map(([title, text], index) => <li key={title} className="sx-step"><span>0{index + 1}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section id="contact" className="bd-split bd-final" aria-labelledby="sx-contact">
          <Pill>{t.contactPill}</Pill>
          <div>
            <h2 id="sx-contact" className="bd-h"><Split text={t.contactTitle} /></h2>
            <div className="bd-actions">
              <a className="bd-btn" href={`mailto:Contact@Karwisoft.com?subject=${encodeURIComponent(t.mailSubject)}`}>{t.contactBtn}</a>
              <a className="bd-link" href={link('/tarifs/')}>{t.seePricing}</a>
            </div>
          </div>
        </section>
      </main>
      <BdFooter locale={locale} />
    </>
  );
}
