export type ChatEnv = { OPENAI_API_KEY?: string; OPENAI_MODEL?: string };
export type ChatContext = { clientId?: string; allowedOrigins?: string[] };
export function createChatHandler(options?: {
  fetcher?: typeof fetch;
  now?: () => number;
  timeoutMs?: number;
  getFacts?: (locale: 'fr' | 'en') => string;
}): (request: Request, env?: ChatEnv, context?: ChatContext) => Promise<Response>;
