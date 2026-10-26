'use client';

import { useEffect, useState } from 'react';
import { PROMO, money } from '../lib/pricing';
import { promo } from '../lib/i18n/dict';
import type { Locale } from '../lib/i18n/config';

type Props = { price: number; regularPrice: number; locale: Locale };

export function PremiumPromo({ price, regularPrice, locale }: Props) {
  const t = promo[locale];
  const [expired, setExpired] = useState(false);
  useEffect(() => { setExpired(Date.now() > new Date(PROMO.deadline).getTime()); }, []);
  const percent = Math.round((1 - price / regularPrice) * 100);

  if (expired) return <div className="tf-price"><strong>{money(regularPrice, locale)}</strong><span>{t.paid}</span></div>;
  return <>
    <div className="tf-price">
      <s aria-label={`${t.regularAria} ${money(regularPrice, locale)}`}>{money(regularPrice, locale)}</s>
      <strong>{money(price, locale)}</strong>
      <span>{t.paid} · {t.save} {money(regularPrice - price, locale)} (−{percent}&nbsp;%)</span>
    </div>
    <p className="tf-urgency"><span aria-hidden="true" />{t.until} {PROMO.label[locale]} · <b>{PROMO.seatsLeft} {t.seats}</b></p>
  </>;
}
