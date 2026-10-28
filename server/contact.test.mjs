import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEmail, createContactHandler } from './contact.mjs';

const ENV = { RESEND_API_KEY: 're_test', CONTACT_TO: 'owner@karwisoft.com', CONTACT_FROM: 'Karwisoft <no-reply@karwisoft.com>' };
const ok = async () => new Response(JSON.stringify({ id: 'x' }), { status: 200 });
const valid = { kind: 'contact', name: 'Jean', clinic: 'Sourire', email: 'jean@clinique.ca', message: 'Bonjour, je veux un site.', locale: 'fr' };

function post(body, { fetcher = ok, env = ENV, headers = {}, handler, clientId = 'a' } = {}) {
  const handle = handler ?? createContactHandler({ fetcher });
  return handle(new Request('https://site.test/api/contact', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://site.test', ...headers }, body: JSON.stringify(body) }), env, { clientId });
}

test('a valid request is emailed to the owner with reply-to set to the visitor', async () => {
  let sent;
  const response = await post(valid, { fetcher: async (url, init) => { sent = { url, body: JSON.parse(init.body), auth: init.headers.Authorization }; return ok(); } });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(sent.url, 'https://api.resend.com/emails');
  assert.equal(sent.auth, 'Bearer re_test');
  assert.deepEqual(sent.body.to, ['owner@karwisoft.com']);
  assert.equal(sent.body.reply_to, 'jean@clinique.ca');
  assert.equal(sent.body.from, 'Karwisoft <no-reply@karwisoft.com>');
  assert.match(sent.body.text, /Jean/);
  assert.match(sent.body.text, /je veux un site/);
});

test('missing configuration is reported, never silently dropped', async () => {
  assert.equal((await post(valid, { env: {} })).status, 503);
});

test('bad input is rejected', async () => {
  assert.equal((await post({ ...valid, email: 'not-an-email' })).status, 422);
  assert.equal((await post({ ...valid, name: '' })).status, 422);
  assert.equal((await post({ ...valid, message: '' })).status, 422);
  assert.equal((await post({ ...valid, kind: 'order', message: '' })).status, 200);
});

test('cross-origin posts and wrong content types are rejected', async () => {
  assert.equal((await post(valid, { headers: { origin: 'https://evil.test' } })).status, 403);
  assert.equal((await post(valid, { headers: { 'content-type': 'text/plain' } })).status, 415);
});

test('the honeypot field answers success without sending anything', async () => {
  let called = false;
  const response = await post({ ...valid, website: 'http://spam' }, { fetcher: async () => { called = true; return ok(); } });
  assert.equal(response.status, 200);
  assert.equal(called, false);
});

test('provider failures surface as an error so the page can fall back', async () => {
  assert.equal((await post(valid, { fetcher: async () => new Response('{}', { status: 500 }) })).status, 502);
  assert.equal((await post(valid, { fetcher: async () => { throw new Error('network'); } })).status, 502);
});

test('header injection is neutralised and the visitor is rate limited', async () => {
  const email = buildEmail({ ...valid, subject: 'Hi\r\nBcc: attacker@evil.test' }, ENV);
  assert.doesNotMatch(email.subject, /[\r\n]/);
  const handler = createContactHandler({ fetcher: ok });
  const codes = [];
  for (let i = 0; i < 6; i++) codes.push((await post(valid, { handler })).status);
  assert.deepEqual(codes, [200, 200, 200, 200, 200, 429]);
});
