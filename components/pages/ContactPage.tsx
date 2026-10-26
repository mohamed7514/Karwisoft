import { SiteHeader } from '../SiteHeader';
import { BdMotion } from '../BdMotion';
import { BdFooter } from '../BdFooter';
import { ContactForm } from '../ContactForm';
import { Split } from '../Split';
import { contactPage, EMAIL, MAP } from '../../lib/i18n/dict-company';
import type { Locale } from '../../lib/i18n/config';
import '../../app/styles/home-bolder.css';
import '../../app/styles/tarifs.css';
import '../../app/styles/services-bolder.css';

const Pill = ({ children }: { children: string }) => <p className="bd-pill"><i aria-hidden="true" />{children}</p>;

export function ContactPage({ locale }: { locale: Locale }) {
  const t = contactPage[locale];
  const embed = `https://www.google.com/maps?q=${MAP.lat},${MAP.lng}&z=16&hl=${locale}&output=embed`;
  return (
    <>
      <SiteHeader services locale={locale} />
      <main id="main" className="bd tf sx">
        <BdMotion />
        <section className="bd-intro" aria-labelledby="ct-title">
          <div>
            <h1 id="ct-title" className="bd-h"><Split text={t.title} /></h1>
            <p className="bd-sub">{t.sub}</p>
          </div>
          <p className="bd-lead">{t.lead}</p>
        </section>

        <section className="bd-split" aria-labelledby="ct-form">
          <Pill>{t.formPill}</Pill>
          <div>
            <h2 id="ct-form" className="bd-h"><Split text={t.formTitle} /></h2>
            <ContactForm locale={locale} />
          </div>
        </section>

        <section className="bd-split" aria-labelledby="ct-place">
          <Pill>{t.placeLabel}</Pill>
          <div>
            <h2 id="ct-place" className="bd-h"><Split text={t.placeNote} /></h2>
            <div className="ct-info">
              <div className="sx-step"><span>{t.emailLabel}</span><a className="bd-link" href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
              <div className="sx-step"><span>Google Maps</span><a className="bd-link" href={MAP.link} target="_blank" rel="noopener noreferrer">{t.openMap}</a></div>
            </div>
            <div className="ct-map">
              <iframe title={t.mapTitle} src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </section>
      </main>
      <BdFooter locale={locale} />
    </>
  );
}
