'use client';

import { useState, type FormEvent } from 'react';
import { contactPage, EMAIL } from '../lib/i18n/dict-company';
import { sendLead } from '../lib/send-lead';
import type { Locale } from '../lib/i18n/config';

type State = 'idle' | 'sending' | 'sent' | 'error';

// The request is emailed by the server (/api/contact). If that fails, the visitor sees why and can still write to us directly.
export function ContactForm({ locale }: { locale: Locale }) {
  const t = contactPage[locale];
  const [state, setState] = useState<State>('idle');
  const [draft, setDraft] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? '').trim();
    setState('sending');
    setDraft(`${t.fields.name}: ${get('name')}\n${t.fields.clinic}: ${get('clinic')}\n${t.fields.email}: ${get('email')}\n${t.fields.topic}: ${get('topic')}\n\n${get('message')}`);
    const ok = await sendLead({ kind: 'contact', name: get('name'), clinic: get('clinic'), email: get('email'), phone: get('phone'), topic: get('topic'), message: get('message'), locale, website: get('website') });
    if (ok) { form.reset(); setState('sent'); } else setState('error');
  }

  if (state === 'sent') return <div className="cf-done" role="status">
    <h3>{t.sentTitle}</h3>
    <p>{t.sentText}</p>
    <button type="button" className="bd-link" onClick={() => setState('idle')}>{t.sendAnother}</button>
  </div>;

  return <form className="cf" onSubmit={submit}>
    <label><span>{t.name}</span><input name="name" required autoComplete="name" maxLength={120} /></label>
    <label><span>{t.clinic}</span><input name="clinic" required autoComplete="organization" maxLength={160} /></label>
    <label><span>{t.email}</span><input name="email" type="email" required autoComplete="email" maxLength={200} /></label>
    <label><span>{t.phone}</span><input name="phone" type="tel" autoComplete="tel" maxLength={60} /></label>
    <label className="cf-wide"><span>{t.topic}</span>
      <select name="topic" defaultValue={t.topics[0]}>{t.topics.map(topic => <option key={topic}>{topic}</option>)}</select>
    </label>
    <label className="cf-wide"><span>{t.message}</span><textarea name="message" rows={5} required maxLength={4000} /></label>
    <input className="cf-hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <div className="cf-wide cf-actions">
      <button className="bd-btn" type="submit" disabled={state === 'sending'}>{state === 'sending' ? t.sending : t.send}</button>
      <p>{t.note}</p>
    </div>
    {state === 'error' && <p className="cf-error cf-wide" role="alert">{t.error} <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(draft)}`}>{t.errorMail}</a></p>}
  </form>;
}
