// Fetch-compatible handler that emails a contact request, order or chat lead to the site owner via Resend.
// Never import this module into client code: it reads the API key.
const KINDS = ['contact', 'order', 'chat'];
const MAX = { name: 120, clinic: 160, email: 200, phone: 60, topic: 120, message: 4000, subject: 200 };

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff', ...extra } });
}
const clean = (value, max) => (typeof value === 'string' ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim().slice(0, max) : '');
const validEmail = value => /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/.test(value);
// Header values must never carry a line break.
const oneLine = value => value.replace(/[\r\n]+/g, ' ');

async function readBody(request) {
  if (Number(request.headers.get('content-length')) > 20000) throw new Error('size');
  const text = await request.text();
  if (text.length > 20000) throw new Error('size');
  return JSON.parse(text);
}

export function buildEmail(input, env) {
  const kind = input.kind;
  const label = { contact: 'Contact', order: 'Commande', chat: 'Chatbot' }[kind];
  const lines = [
    `Type : ${label}`,
    `Nom : ${input.name}`,
    ...(input.clinic ? [`Clinique : ${input.clinic}`] : []),
    `Courriel : ${input.email}`,
    ...(input.phone ? [`Téléphone : ${input.phone}`] : []),
    ...(input.topic ? [`Sujet : ${input.topic}`] : []),
    ...(input.locale ? [`Langue du site : ${input.locale}`] : []),
    '',
    input.message || '(aucun message)',
  ];
  const subject = oneLine(input.subject || `[Karwisoft] ${label} — ${input.clinic || input.name}`).slice(0, MAX.subject);
  return {
    from: env.CONTACT_FROM || 'Karwisoft <onboarding@resend.dev>',
    to: (env.CONTACT_TO || 'Support@karwisoft.com').split(',').map(item => item.trim()).filter(Boolean),
    reply_to: input.email,
    subject,
    text: lines.join('\n'),
  };
}

export function createContactHandler({ fetcher = fetch, now = Date.now, timeoutMs = 15000 } = {}) {
  const limits = new Map();
  return async function handle(request, env = {}, context = {}) {
    const url = new URL(request.url);
    if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, { Allow: 'POST' });
    const origin = request.headers.get('origin');
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || url.host;
    let sameSite = !origin;
    if (origin) { try { sameSite = new URL(origin).host === host || origin === url.origin; } catch { sameSite = false; } }
    if ((!sameSite && !(context.allowedOrigins || []).includes(origin)) || request.headers.get('sec-fetch-site') === 'cross-site') return json({ error: 'origin_rejected' }, 403);
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return json({ error: 'json_required' }, 415);

    let body;
    try { body = await readBody(request); } catch (error) { return json({ error: error.message === 'size' ? 'request_too_large' : 'invalid_json' }, error.message === 'size' ? 413 : 400); }
    if (!body || typeof body !== 'object') return json({ error: 'invalid_json' }, 400);

    // Honeypot: real visitors never fill the hidden "website" field. Pretend success so bots learn nothing.
    if (typeof body.website === 'string' && body.website.trim()) return json({ ok: true });

    const input = {
      kind: KINDS.includes(body.kind) ? body.kind : 'contact',
      name: clean(body.name, MAX.name),
      clinic: clean(body.clinic, MAX.clinic),
      email: clean(body.email, MAX.email),
      phone: clean(body.phone, MAX.phone),
      topic: clean(body.topic, MAX.topic),
      message: clean(body.message, MAX.message),
      subject: clean(body.subject, MAX.subject),
      locale: body.locale === 'en' ? 'en' : 'fr',
    };
    if (!input.name || !validEmail(input.email)) return json({ error: 'invalid_fields' }, 422);
    if (input.kind !== 'order' && input.message.length < 2) return json({ error: 'invalid_fields' }, 422);

    const time = now();
    const identity = context.clientId || 'shared';
    const hits = (limits.get(identity) || []).filter(stamp => time - stamp < 10 * 60 * 1000);
    if (hits.length >= 5) return json({ error: 'rate_limited' }, 429, { 'Retry-After': '600' });
    if (limits.size > 2000) limits.clear();

    if (typeof env.RESEND_API_KEY !== 'string' || !env.RESEND_API_KEY.trim()) return json({ error: 'email_not_configured' }, 503);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const upstream = await fetcher('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify(buildEmail(input, env)),
      });
      if (!upstream.ok) return json({ error: 'email_failed' }, 502);
      hits.push(time);
      limits.set(identity, hits);
      return json({ ok: true });
    } catch {
      return json({ error: controller.signal.aborted ? 'email_timeout' : 'email_failed' }, 502);
    } finally { clearTimeout(timer); }
  };
}
