import { createChatHandler } from '../../../server/chat.mjs';
import { chatFacts } from '../../../lib/chat/facts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const handle = createChatHandler({ getFacts: locale => chatFacts(locale) });

// The OpenAI key is read from the server environment only (.env.local / Vercel project settings).
export async function POST(request: Request) {
  const clientId = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'shared';
  return handle(request, { OPENAI_API_KEY: process.env.OPENAI_API_KEY, OPENAI_MODEL: process.env.OPENAI_MODEL, CHAT_DAILY_LIMIT: process.env.CHAT_DAILY_LIMIT } as never, { clientId, allowedOrigins: (process.env.CHAT_ALLOWED_ORIGINS || '').split(',').filter(Boolean) });
}
