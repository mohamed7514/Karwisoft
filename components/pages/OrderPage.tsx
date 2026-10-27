import { SiteHeader } from '../SiteHeader';
import { BdMotion } from '../BdMotion';
import { BdFooter } from '../BdFooter';
import { OrderForm } from '../OrderForm';
import { Split } from '../Split';
import { orderPage } from '../../lib/i18n/dict-order';
import type { Locale } from '../../lib/i18n/config';
import '../../app/styles/home-bolder.css';
import '../../app/styles/tarifs.css';
import '../../app/styles/services-bolder.css';
import '../../app/styles/order.css';

export function OrderPage({ locale }: { locale: Locale }) {
  const t = orderPage[locale];
  return (
    <>
      <SiteHeader services locale={locale} />
      <main id="main" className="bd tf sx">
        <BdMotion />
        <section className="bd-intro" aria-labelledby="od-title">
          <div>
            <h1 id="od-title" className="bd-h"><Split text={t.title} /></h1>
            <p className="bd-sub">{t.sub}</p>
          </div>
          <p className="bd-lead">{t.lead}</p>
        </section>
        <section className="bd-split" aria-label={t.pill}>
          <p className="bd-pill"><i aria-hidden="true" />{t.pill}</p>
          <OrderForm locale={locale} />
        </section>
      </main>
      <BdFooter locale={locale} />
    </>
  );
}
