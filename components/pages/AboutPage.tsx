import { SiteHeader } from '../SiteHeader';
import { BdMotion } from '../BdMotion';
import { BdFooter } from '../BdFooter';
import { Split } from '../Split';
import { aboutPage } from '../../lib/i18n/dict-company';
import { localizeHref, type Locale } from '../../lib/i18n/config';
import '../../app/styles/home-bolder.css';
import '../../app/styles/tarifs.css';
import '../../app/styles/services-bolder.css';

const Pill = ({ children }: { children: string }) => <p className="bd-pill"><i aria-hidden="true" />{children}</p>;

export function AboutPage({ locale }: { locale: Locale }) {
  const t = aboutPage[locale];
  const link = (href: string) => localizeHref(href, locale);
  return (
    <>
      <SiteHeader services locale={locale} />
      <main id="main" className="bd tf sx">
        <BdMotion />
        <section className="bd-intro" aria-labelledby="ab-title">
          <h1 id="ab-title" className="bd-h"><Split text={t.title} /></h1>
          <p className="bd-lead">{t.lead}</p>
        </section>

        <section className="bd-split" aria-labelledby="ab-story">
          <Pill>{t.storyPill}</Pill>
          <div>
            <h2 id="ab-story" className="bd-h"><Split text={t.storyTitle} /></h2>
            {t.story.map(paragraph => <p key={paragraph} className="bd-body">{paragraph}</p>)}
          </div>
        </section>

        <section className="bd-split" aria-labelledby="ab-expert">
          <Pill>{t.expertPill}</Pill>
          <div>
            <h2 id="ab-expert" className="bd-h"><Split text={t.expertTitle} /></h2>
            <p className="bd-body">{t.expertLead}</p>
            <div className="sx-two ab-expert">
              {[t.expertDev, t.expertAi].map(group => <div key={group.title} className="sx-step"><strong>{group.title}</strong><ul className="sx-checks">{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}
            </div>
            <p className="tf-note">{t.expertNote}</p>
          </div>
        </section>

        <section className="bd-split" aria-labelledby="ab-values">
          <Pill>{t.valuesPill}</Pill>
          <div>
            <h2 id="ab-values" className="bd-h"><Split text={t.valuesTitle} /></h2>
            <div className="sx-cols">
              {t.values.map(([title, text]) => <div key={title} className="sx-step"><strong>{title}</strong><p>{text}</p></div>)}
            </div>
          </div>
        </section>

        <section className="bd-split" aria-labelledby="ab-do">
          <Pill>{t.doPill}</Pill>
          <div>
            <h2 id="ab-do" className="bd-h"><Split text={t.doTitle} /></h2>
            <ul className="ab-links">
              {t.services.map(([name, href], index) => <li key={href}><a href={link(href)}><span>0{index + 1}</span>{name}<i aria-hidden="true">↗</i></a></li>)}
            </ul>
          </div>
        </section>

        <section className="bd-split" aria-labelledby="ab-how">
          <Pill>{t.howPill}</Pill>
          <div>
            <h2 id="ab-how" className="bd-h"><Split text={t.howTitle} /></h2>
            <ol className="sx-steps">
              {t.steps.map(([title, text], index) => <li key={title} className="sx-step"><span>0{index + 1}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section className="bd-split bd-final" aria-labelledby="ab-cta">
          <Pill>{t.ctaPill}</Pill>
          <div>
            <h2 id="ab-cta" className="bd-h"><Split text={t.ctaTitle} /></h2>
            <div className="bd-actions">
              <a className="bd-btn" href={link('/contact/')}>{t.ctaBtn}</a>
              <a className="bd-link" href={link('/services/')}>{t.seeServices}</a>
            </div>
          </div>
        </section>
      </main>
      <BdFooter locale={locale} />
    </>
  );
}
