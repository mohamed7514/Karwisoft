'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import { chatText } from '../lib/i18n/dict-chat';
import { localizeHref, parsePath, type Locale } from '../lib/i18n/config';
import { EMAIL } from '../lib/i18n/dict-company';
import { sendLead } from '../lib/send-lead';
import { guidedReply, languageOf, topicOf, type ChatAction, type Topic } from '../lib/chat/guided';
import '../app/styles/chat.css';

type Lead = { need: keyof typeof chatText.fr.needs; clinic: string; summary: string };
type Message = { id: number; role: 'user' | 'assistant'; text: string; actions?: ChatAction[]; chips?: boolean };
type Reply = { text: string; actions?: ChatAction[]; lead?: Lead };
type TimeKey = 'past' | 'present' | 'future';

const redact = (text: string) => text
  .replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi, '[email]')
  .replace(/(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}/g, '[phone]');

const isChipQuestion = (text: string) => [chatText.fr, chatText.en].some(c => Object.values(c.questions).includes(text) || Object.values(c.questionsTime).includes(text) || Object.values(c.questionsContext).includes(text));

const MUTE_KEY = 'kw-chat-mute';
const MUTE_MS = 10 * 60 * 1000;
const isMuted = () => { try { return Number(window.localStorage.getItem(MUTE_KEY)) > Date.now(); } catch { return false; } };
const mute = () => { try { window.localStorage.setItem(MUTE_KEY, String(Date.now() + MUTE_MS)); } catch { /* private mode */ } };

export function SiteChat({ locale }: { locale: Locale }) {
  const t = chatText[locale];
  const pathname = usePathname();
  const page = parsePath(pathname || '/').path;
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const controller = useRef<AbortController | null>(null);
  const serial = useRef(0);
  const welcome = (): Message => ({ id: 0, role: 'assistant', text: t.welcome, chips: true });
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [welcome()]);
  const [question, setQuestion] = useState('');
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [lead, setLead] = useState<Lead | null>(null);
  const [teaser, setTeaser] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadState, setLeadState] = useState<'idle' | 'sending' | 'error'>('idle');

  useEffect(() => {
    const abort = new AbortController();
    fetch('/api/chat/status.json', { signal: abort.signal, cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null)).then(data => setReady(data?.ready === true)).catch(() => {}).finally(() => setChecking(false));
    return () => { abort.abort(); controller.current?.abort(); };
  }, []);

  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight, behavior: 'instant' }); }, [messages, busy, pending]);

  // Phones: full-screen sheet that follows the visible area, so the on-screen keyboard never hides the input.
  useEffect(() => {
    if (!open) return;
    const viewport = window.visualViewport;
    const root = document.documentElement;
    const phone = window.matchMedia('(max-width:700px)');
    const sync = () => {
      if (!viewport || !phone.matches) { root.style.removeProperty('--kw-vh'); root.style.removeProperty('--kw-top'); return; }
      root.style.setProperty('--kw-vh', `${viewport.height}px`);
      root.style.setProperty('--kw-top', `${viewport.offsetTop}px`);
      list.current?.scrollTo({ top: list.current.scrollHeight, behavior: 'instant' });
    };
    sync();
    root.classList.add('kw-chat-open');
    viewport?.addEventListener('resize', sync);
    viewport?.addEventListener('scroll', sync);
    return () => {
      viewport?.removeEventListener('resize', sync);
      viewport?.removeEventListener('scroll', sync);
      root.classList.remove('kw-chat-open');
      root.style.removeProperty('--kw-vh');
      root.style.removeProperty('--kw-top');
    };
  }, [open]);

  useEffect(() => { setMessages(current => (current.length === 1 && current[0].id === 0 ? [welcome()] : current)); }, [locale]); // eslint-disable-line react-hooks/exhaustive-deps

  // The bubble pops out of the black hole 2s after each page load, stays 14s, then comes back every 40s while the chat is closed.
  useEffect(() => {
    if (open) { setTeaser(false); return; }
    const timers: number[] = [];
    const cycle = (delay: number) => {
      timers.push(window.setTimeout(() => {
        if (isMuted()) return;
        setTeaser(true);
        timers.push(window.setTimeout(() => { setTeaser(false); cycle(40000); }, 14000));
      }, delay));
    };
    cycle(2000);
    return () => timers.forEach(timer => window.clearTimeout(timer));
  }, [open, pathname]);

  function show() {
    setTeaser(false);
    dialog.current?.show(); setOpen(true);
    if (!window.matchMedia('(pointer:coarse)').matches) window.setTimeout(() => input.current?.focus({ preventScroll: true }), 350);
  }
  // The presentation deck opens the assistant for a live demo.
  useEffect(() => { const open = () => show(); window.addEventListener('kw:open-chat', open); return () => window.removeEventListener('kw:open-chat', open); }); // eslint-disable-line react-hooks/exhaustive-deps
  function close() { dialog.current?.close(); setOpen(false); launcher.current?.focus({ preventScroll: true }); }
  function reset() { setLeadOpen(false); setLeadState('idle'); serial.current++; controller.current?.abort(); setBusy(false); setLead(null); setMessages([welcome()]); setQuestion(''); setPending(''); setError(''); }

  const hrefFor = (action: ChatAction) => action === 'reserve_spot' ? localizeHref('/commande/?plan=premium', locale) : action === 'see_pricing' ? localizeHref('/tarifs/', locale) : action === 'see_services' ? localizeHref('/services/', locale) : localizeHref('/contact/', locale);
  const transcript = () => messages.filter(m => m.id !== 0).slice(-10).map(m => `${m.role === 'user' ? t.mailYou : t.mailBot}: ${m.text}`).join('\n');

  // Sends the lead and the conversation to the team by email (server-side), then confirms in the chat.
  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? '').trim();
    setLeadState('sending');
    const message = [get('message'), '', lead?.summary ? `${t.mailNeed}: ${t.needs[lead.need]} — ${lead.summary}` : '', '', '--- Conversation ---', transcript()].join('\n');
    const ok = await sendLead({ kind: 'chat', name: get('name'), clinic: get('clinic') || lead?.clinic || '', email: get('email'), phone: get('phone'), message, locale, website: get('website') });
    if (!ok) { setLeadState('error'); return; }
    setLeadOpen(false); setLeadState('idle');
    setMessages(current => [...current.map(m => ({ ...m, chips: false })), { id: ++serial.current * 2, role: 'assistant', text: t.lead.sent }]);
  }

  function addGuided(text: string, topic: Topic | null) {
    const reply = guidedReply(topic, topic && topic !== null && text === text.trim() && isChipQuestion(text) ? locale : languageOf(text, locale));
    const id = ++serial.current;
    const history = messages.map(m => ({ ...m, chips: false }));
    setBusy(true);
    window.setTimeout(() => {
      if (id !== serial.current) return;
      setBusy(false);
      setMessages([...history, { id: id * 2 - 1, role: 'user', text }, { id: id * 2, role: 'assistant', text: reply.text, actions: reply.actions, chips: reply.actions.length === 0 }]);
    }, 650);
    setMessages([...history, { id: id * 2 - 1, role: 'user', text }]);
  }

  async function send(value: string, topic: Topic | null = null, consented = consent) {
    const text = value.trim();
    if (!text || busy) return;
    if (!ready) { setQuestion(''); addGuided(text, topic ?? topicOf(text)); return; }
    if (!consented) { setPending(text); setQuestion(''); setError(''); return; }
    setError(''); setPending(''); setQuestion('');
    const id = ++serial.current;
    const next: Message[] = [...messages.map(m => ({ ...m, chips: false })), { id: id * 2 - 1, role: 'user', text }];
    setMessages(next); setBusy(true);
    const abort = new AbortController();
    controller.current = abort;
    const timer = setTimeout(() => abort.abort(), 25000);
    try {
      const response = await fetch('/api/chat/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: abort.signal,
        body: JSON.stringify({ consent: true, locale, page, messages: next.filter(m => m.id !== 0).slice(-11).map(m => ({ role: m.role, content: redact(m.text) })) }),
      });
      if (!response.ok) throw new Error(response.status === 429 ? t.errorRate : response.status === 503 ? t.errorDown : t.errorReceive);
      const result: Reply = await response.json();
      if (typeof result.text !== 'string' || !result.text.trim()) throw new Error(t.errorIncomplete);
      if (id !== serial.current) return;
      if (result.lead) setLead(result.lead);
      setMessages([...next, { id: id * 2, role: 'assistant', text: result.text, actions: Array.isArray(result.actions) ? result.actions : [] }]);
    } catch (cause) {
      if (id === serial.current) { setError(cause instanceof Error && cause.name !== 'AbortError' ? cause.message : t.errorSlow); setQuestion(text); }
    } finally { clearTimeout(timer); if (id === serial.current) setBusy(false); }
  }

  const last = messages.at(-1);
  const showChips = !busy && !pending && last?.role === 'assistant' && last.chips;
  const context = page.startsWith('/tarifs') ? 'compare' : page.startsWith('/services') ? 'which' : null;
  const teaserText = page.startsWith('/tarifs') ? t.teasers.pricing : page.startsWith('/services') ? t.teasers.services : page.startsWith('/contact') ? t.teasers.contact : t.teaser;
  const timeKeys: TimeKey[] = ['past', 'present', 'future'];
  function submit(event: FormEvent) { event.preventDefault(); void send(question); }

  return <>
    {teaser && !open && <div className="kw-teaser" role="status"><span className="kw-drops" aria-hidden="true"><i /><i /><i /></span><button type="button" className="kw-teaser-open" onClick={show}>{teaserText}</button><button type="button" className="kw-teaser-close" aria-label={t.hide} onClick={() => { setTeaser(false); mute(); }}>×</button></div>}
    <button ref={launcher} type="button" className="kw-launcher" aria-label={t.open} aria-haspopup="dialog" aria-controls="kw-chat" aria-expanded={open} onClick={show}>
      {teaser && !open && <span className="kw-badge" aria-hidden="true">1</span>}<span className="kw-halo" aria-hidden="true" /><span className="kw-lens" aria-hidden="true" /><span className="kw-disk" aria-hidden="true" /><span className="kw-core" aria-hidden="true" />
    </button>
    <dialog ref={dialog} className="kw-chat" id="kw-chat" aria-labelledby="kw-title" onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); close(); } }} onClose={() => setOpen(false)}>
      <div className="kw-glow" aria-hidden="true" />
      <header className="kw-head">
        <div className="kw-id">
          <h2 id="kw-title">{t.title}</h2>
          <p><i data-busy={busy} />{checking ? t.connecting : t.online}</p>
        </div>
        <button type="button" className="kw-icon" aria-label={t.reset} onClick={reset}>↺</button>
        <button type="button" className="kw-icon" aria-label={t.close} onClick={close}>×</button>
      </header>
      <div ref={list} className="kw-messages" role="log" aria-label={t.conversation} aria-live="polite" aria-busy={busy}>
        {messages.map(message => <div key={message.id} className={`kw-row ${message.role}`}>
          <div className={`kw-bubble${message.role === 'assistant' && message.id !== 0 ? ' kw-arrive' : ''}`}>{message.text}</div>
          {message.actions && message.actions.length > 0 && <div className="kw-actions">{message.actions.map((action, i) => action === 'leave_details'
            ? <button key={action} type="button" className={i === 0 ? 'kw-btn primary' : 'kw-btn'} onClick={() => setLeadOpen(true)}>{t.actions[action]}</button>
            : <a key={action} href={hrefFor(action)} className={i === 0 ? 'kw-btn primary' : 'kw-btn'}>{t.actions[action]}</a>)}</div>}
        </div>)}
        {leadOpen && <form className="kw-lead" onSubmit={submitLead}>
          <strong>{t.lead.title}</strong>
          <p>{t.lead.intro}</p>
          <input name="name" placeholder={t.lead.name} required autoComplete="name" maxLength={120} />
          <input name="clinic" placeholder={t.lead.clinic} defaultValue={lead?.clinic ?? ''} autoComplete="organization" maxLength={160} />
          <input name="email" type="email" placeholder={t.lead.email} required autoComplete="email" maxLength={200} />
          <input name="phone" type="tel" placeholder={t.lead.phone} autoComplete="tel" maxLength={60} />
          <textarea name="message" rows={3} placeholder={t.lead.message} defaultValue={t.lead.defaultMessage} required maxLength={1500} />
          <input className="kw-hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <small>{t.lead.consent}</small>
          {leadState === 'error' && <small className="kw-lead-error" role="alert">{t.lead.error} <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(transcript())}`}>{t.lead.errorMail}</a></small>}
          <div className="kw-actions"><button type="submit" className="kw-btn primary" disabled={leadState === 'sending'}>{leadState === 'sending' ? t.lead.sending : t.lead.send}</button><button type="button" className="kw-btn" onClick={() => setLeadOpen(false)}>{t.lead.cancel}</button></div>
        </form>}
        {busy && <div className="kw-row assistant" role="status" aria-label={t.typing}><div className="kw-bubble kw-typing"><i /><i /><i /></div></div>}
        {pending && <div className="kw-row assistant"><div className="kw-bubble">{t.consent}<div className="kw-actions"><button type="button" className="kw-btn primary" onClick={() => { setConsent(true); const text = pending; setPending(''); void send(text, null, true); }}>{t.consentOk}</button><button type="button" className="kw-btn" onClick={() => setPending('')}>{t.cancel}</button></div></div></div>}
        {showChips && <div className="kw-chips">
          <div className="kw-time" role="group" aria-label={t.timeAria}>
            {timeKeys.map(key => <button key={key} type="button" data-era={key} disabled={checking || busy} onClick={() => void send(t.questionsTime[key], key)}>{t.time[key]}</button>)}
          </div>
          <div className="kw-chip-row">
            {context && <button type="button" disabled={checking || busy} onClick={() => void send(t.questionsContext[context], context === 'compare' ? 'pricing' : 'services')}>{t.contextual[context]}</button>}
            <button type="button" disabled={checking || busy} onClick={() => void send(t.questions.pricing, 'pricing')}>{t.chips.pricing}</button>
            <button type="button" disabled={checking || busy} onClick={() => void send(t.questions.services, 'services')}>{t.chips.services}</button>
            <button type="button" className="kw-chip-link" onClick={() => setLeadOpen(true)}>{t.chips.call}</button>
          </div>
        </div>}
      </div>
      {error && <p className="kw-error" role="alert">{error}</p>}
      <form className="kw-form" onSubmit={submit}>
        <label className="kw-sr" htmlFor="kw-question">{t.messageLabel}</label>
        <input ref={input} id="kw-question" value={question} onChange={event => setQuestion(event.target.value)} maxLength={1000} autoComplete="off" placeholder={t.placeholder} disabled={busy || checking} />
        <button type="submit" disabled={!question.trim() || busy || checking} aria-label={t.send}>↑</button>
      </form>
      <p className="kw-foot">{t.foot}</p>
    </dialog>
  </>;
}
