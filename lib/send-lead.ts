export type LeadPayload = {
  kind: 'contact' | 'order' | 'chat';
  name: string;
  email: string;
  clinic?: string;
  phone?: string;
  topic?: string;
  message?: string;
  subject?: string;
  locale: 'fr' | 'en';
  website?: string; // honeypot
};

/** Posts a request to /api/contact, which emails it to the site owner. Resolves true only when the server confirms. */
export async function sendLead(payload: LeadPayload): Promise<boolean> {
  try {
    const response = await fetch('/api/contact/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) return false;
    const data = await response.json();
    return data?.ok === true;
  } catch {
    return false;
  }
}
