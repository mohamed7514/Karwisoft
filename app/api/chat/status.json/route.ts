import { createChatHandler } from '../../../../server/chat.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const handle = createChatHandler();

export async function GET(request: Request) {
  return handle(request, { OPENAI_API_KEY: process.env.OPENAI_API_KEY }, {});
}
