'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { sendLead } from '../lib/send-lead';
import { adsPlans, getSitePlans, money, PROMO } from '../lib/pricing';
import { orderPage } from '../lib/i18n/dict-order';
import { EMAIL } from '../lib/i18n/dict-company';
import type { Locale } from '../lib/i18n/config';

// Optional Stripe Payment Links (or any hosted checkout), one per site offer. Without them the order goes out by email.
const PAY: Record<string, string | undefined> = {
  essentiel: process.env.NEXT_PUBLIC_PAY_ESSENTIEL,
  croissance: process.env.NEXT_PUBLIC_PAY_CROISSANCE,
  premium: process.env.NEXT_PUBLIC_PAY_PREMIUM,
};

export function OrderForm({ locale }: { locale: Locale }) {
  const t = orderPage[locale];
  const plans = getSitePlans(locale);
  const [planId, setPlanId] = useState('premium');
  const [adsId, setAdsId] = useState('none');
  const [live, setLive] = useState(true);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [draft, setDraft] = useState('');

  useEffect(() => {
    setLive(Date.now() <= new Date(PROMO.deadline).getTime());
    const params = new URLSearchParams(window.location.search);
    const plan = params.get('plan');
    const ads = params.get('ads');
    if (plan && plans.some(item => item.id === plan)) setPlanId(plan);
    if (ads && adsPlans.some(item => item.id === ads)) setAdsId(ads);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const plan = plans.find(item => item.id === planId)!;
  const price = plan.regularPrice && !live ? plan.regularPrice : plan.price;
  const ads = adsPlans.find(item => item.id === adsId);
  const link = PAY[plan.id];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? '').trim();
    if (link) {
      const url = new URL(link);
      if (get('email')) url.searchParams.set('prefilled_email', get('email'));
      window.location.href = url.toString();
      return;
    }
    const lines = [
      `${t.lines.plan}: ${plan.name} (${money(price, locale)})`,
      `${t.lines.ads}: ${ads ? `${money(ads.fee, locale)} ${t.perMonth} (${t.budget} ${ads.budget[locale]})` : t.adsNone}`,
      `${t.lines.total}: ${money(price, locale)}`,
      '',
      `${t.lines.clinic}: ${get('clinic')}`,
      `${t.lines.name}: ${get('name')}`,
      `${t.lines.email}: ${get('email')}`,
      ...(get('phone') ? [`${t.lines.phone}: ${get('phone')}`] : []),
      ...(get('message') ? ['', `${t.lines.message}: ${get('message')}`] : []),
    ];
    const message = lines.join('\n');
    setDraft(message);
    setState('sending');
    const ok = await sendLead({ kind: 'order', name: get('name'), clinic: get('clinic'), email: get('email'), phone: get('phone'), message, subject: t.subject(plan.name) + ' — ' + get('clinic'), locale, website: get('website') });
    setState(ok ? 'sent' : 'error');
  }

  if (state === 'sent') return <div className="cf-done" role="status">
    <h3>{t.sentTitle}</h3>
    <p>{t.sentText}</p>
  </div>;

  return <form className="od" onSubmit={submit}>
    <fieldset>
      <legend>{t.siteLegend}</legend>
      {plans.map(item => {
        const itemPrice = item.regularPrice && !live ? item.regularPrice : item.price;
        return <label key={item.id} className={`od-opt${planId === item.id ? ' on' : ''}${item.featured ? ' main' : ''}`}>
          <input type="radio" name="plan" value={item.id} checked={planId === item.id} onChange={() => setPlanId(item.id)} />
          <span><b>{item.name}</b><small>{item.tagline}</small></span>
          <em>{item.regularPrice && live && <s>{money(item.regularPrice, locale)}</s>}{money(itemPrice, locale)}</em>
        </label>;
      })}
      {plan.featured && live && <p className="od-promo">{t.promo(PROMO.label[locale], PROMO.seatsLeft)} · {t.included}</p>}
    </fieldset>

    <fieldset>
      <legend>{t.adsLegend}</legend>
      <label className={`od-opt${adsId === 'none' ? ' on' : ''}`}>
        <input type="radio" name="ads" value="none" checked={adsId === 'none'} onChange={() => setAdsId('none')} />
        <span><b>{t.adsNone}</b></span><em>{t.none}</em>
      </label>
      {adsPlans.map(item => <label key={item.id} className={`od-opt${adsId === item.id ? ' on' : ''}`}>
        <input type="radio" name="ads" value={item.id} checked={adsId === item.id} onChange={() => setAdsId(item.id)} />
        <span><b>{t.budget} {item.budget[locale]}</b></span><em>{money(item.fee, locale)} <small>{t.perMonth}</small></em>
      </label>)}
      {ads && <p className="od-note">{t.adsNote}</p>}
    </fieldset>

    <div className="od-fields">
      <label><span>{t.clinic}</span><input name="clinic" required autoComplete="organization" /></label>
      <label><span>{t.name}</span><input name="name" required autoComplete="name" /></label>
      <label><span>{t.email}</span><input name="email" type="email" required autoComplete="email" /></label>
      <label><span>{t.phone}</span><input name="phone" type="tel" autoComplete="tel" /></label>
      <label className="od-wide"><span>{t.message}</span><textarea name="message" rows={3} /></label>
      <input className="cf-hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    </div>

    <div className="od-summary">
      <p>{t.summary}</p>
      <div><span>{t.today}</span><b>{money(price, locale)}</b></div>
      <div><span>{t.monthly}</span><b>{ads ? money(ads.fee, locale) : t.none}</b></div>
      <button type="submit" className="bd-btn" disabled={state === 'sending'}>{state === 'sending' ? t.sending : link ? t.pay(money(price, locale)) : t.send}</button>
      <small>{link ? t.notePay : t.noteSend}</small>
      {state === 'error' && <small className="od-error" role="alert">{t.error} <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(t.subject(plan.name))}&body=${encodeURIComponent(draft)}`}>{t.errorMail}</a></small>}
    </div>
  </form>;
}
