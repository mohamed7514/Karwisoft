'use client';

import type { FormEvent } from 'react';
import { contactPage, EMAIL } from '../lib/i18n/dict-company';
import type { Locale } from '../lib/i18n/config';

// Static site: the form composes an email in the visitor's own mail app instead of posting to a server.
export function ContactForm({ locale }: { locale: Locale }) {
  const t = contactPage[locale];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? '').trim();
    const lines = [
      `${t.fields.name}: ${get('name')}`,
      `${t.fields.clinic}: ${get('clinic')}`,
      `${t.fields.email}: ${get('email')}`,
      ...(get('phone') ? [`${t.fields.phone}: ${get('phone')}`] : []),
      `${t.fields.topic}: ${get('topic')}`,
      '',
      get('message'),
    ];
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }

  return <form className="cf" onSubmit={submit}>
    <label><span>{t.name}</span><input name="name" required autoComplete="name" /></label>
    <label><span>{t.clinic}</span><input name="clinic" required autoComplete="organization" /></label>
    <label><span>{t.email}</span><input name="email" type="email" required autoComplete="email" /></label>
    <label><span>{t.phone}</span><input name="phone" type="tel" autoComplete="tel" /></label>
    <label className="cf-wide"><span>{t.topic}</span>
      <select name="topic" defaultValue={t.topics[0]}>{t.topics.map(topic => <option key={topic}>{topic}</option>)}</select>
    </label>
    <label className="cf-wide"><span>{t.message}</span><textarea name="message" rows={5} required /></label>
    <div className="cf-wide cf-actions">
      <button className="bd-btn" type="submit">{t.send}</button>
      <p>{t.note}</p>
    </div>
  </form>;
}
