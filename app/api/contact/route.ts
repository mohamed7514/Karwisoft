import { createContactHandler } from '../../../server/contact.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const handle = createContactHandler();

// Keys are read from the server environment only (.env.local / Vercel project settings).
export async function POST(request: Request) {
  const clientId = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'shared';
  return handle(request, { RESEND_API_KEY: process.env.RESEND_API_KEY, CONTACT_TO: process.env.CONTACT_TO, CONTACT_FROM: process.env.CONTACT_FROM }, { clientId, allowedOrigins: (process.env.CHAT_ALLOWED_ORIGINS || '').split(',').filter(Boolean) });
}
