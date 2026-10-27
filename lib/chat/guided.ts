import { adsPlans, getGifts, getSitePlans, money, PROMO } from '../pricing';
import { chatText } from '../i18n/dict-chat';
import { EMAIL } from '../i18n/dict-company';
import type { Locale } from '../i18n/config';

export type Topic = 'pricing' | 'services' | 'seoAi' | 'call' | 'past' | 'present' | 'future'
  | 'greet' | 'thanks' | 'premium' | 'ads' | 'seo' | 'website' | 'guarantee' | 'delay' | 'contact' | 'about' | 'language';
export type ChatAction = 'book_call' | 'see_pricing' | 'see_services' | 'email_summary';

const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Offline routing used when the model is unavailable. Order matters: specific intents before generic ones.
const rules: [Topic, RegExp][] = [
  ['thanks', /\b(merci|thanks?|thank you|parfait|super|great|cool)\b/],
  ['guarantee', /garanti|garantie|promet|assure|guarantee|promise|first place|premiere place|resultat|results?/],
  ['delay', /delai|combien de temps|duree|quand|how long|timeline|delivery|when will|how fast|how soon/],
  ['premium', /premium|promo|rabais|reduction|discount|offre speciale|places? restantes?|special offer/],
  ['seoAi', /\b(seo\s*\+?\s*(ia|ai)|geo|chatgpt|gemini|intelligence artificielle|artificial intelligence|\bia\b)/],
  ['ads', /google ads|adwords|publicite|annonce|campagne|advert|campaign|\bppc\b|budget pub/],
  ['seo', /\bseo\b|referencement|reference naturel|organic|search ranking|classement/],
  ['website', /site web|site internet|website|web site|refonte|redesign/],
  ['pricing', /prix|tarif|cout|combien|forfait|price|pricing|cost|how much|fee|\bcher\b|expensive/],
  ['language', /anglais|francais|english|french|bilingue|bilingual|langue|language/],
  ['contact', /courriel|email|e-mail|adresse|telephone|numero|joindre|ecrire|reach you|your address|phone|where are you|ou etes|localisation|location/],
  ['about', /vous etes qui|etes-vous|qui etes|qui es-tu|c'est quoi karwisoft|about you|who are you|what is karwisoft|votre agence|your agency|experience|expertise/],
  ['call', /rendez-vous|appel|rappel|reserver|planifier|parler|rencontre|book|call|appointment|schedule|talk|meeting|demo/],
  ['greet', /^(bonjour|salut|allo|hello|hi|hey|bonsoir)\b/],
  ['services', /service|que faites|what do you do|offer|help me|aide|clinique|clinic|dentist|dentiste/],
];

/** Language of a typed message, so an English visitor on the French page still gets English. */
export function languageOf(text: string, fallback: Locale): Locale {
  const t = normalize(text);
  const en = (t.match(/\b(the|you|your|how|what|do|does|is|are|can|could|i|my|me|please|price|prices|hello|hi|speak|reach|want|need|about|have)\b/g) ?? []).length;
  const fr = (t.match(/\b(le|la|les|vous|votre|est|que|quel|quelle|combien|je|mon|ma|bonjour|merci|pour|une|des|avez|faites|etes)\b/g) ?? []).length;
  return en > fr ? 'en' : fr > en ? 'fr' : fallback;
}

export function topicOf(text: string): Topic | null {
  const t = normalize(text.trim());
  for (const [topic, pattern] of rules) if (pattern.test(t)) return topic;
  return null;
}

type Reply = { text: string; actions: ChatAction[] };

export function guidedReply(topic: Topic | null, locale: Locale): Reply {
  const copy = chatText[locale].guided;
  const plans = getSitePlans(locale);
  const premium = plans.find(plan => plan.featured)!;
  const promoLive = Date.now() <= new Date(PROMO.deadline).getTime();
  const sites = plans.map(plan => `${plan.name} ${money(plan.price, locale)}`).join(', ');
  const fr = locale === 'fr';
  const ads = adsPlans.map(plan => `${money(plan.fee, locale)}${fr ? ' par mois' : '/month'} (${plan.budget[locale]})`).join(fr ? ' ou ' : ' or ');
  const gifts = getGifts(locale).map(gift => `${gift.months} ${gift.name}`).join(' + ');
  switch (topic) {
    case 'pricing': return { text: copy.pricing(sites, ads), actions: ['see_pricing', 'book_call'] };
    case 'services': return { text: copy.services, actions: ['see_services'] };
    case 'seoAi': return { text: copy.seoAi, actions: ['see_services', 'book_call'] };
    case 'past': return { text: copy.past, actions: [] };
    case 'present': return { text: copy.present, actions: ['see_services'] };
    case 'future': return { text: copy.future, actions: ['see_services', 'book_call'] };
    case 'call': return { text: copy.call, actions: ['book_call'] };
    case 'greet': return { text: copy.greet, actions: [] };
    case 'thanks': return { text: copy.thanks, actions: ['book_call'] };
    case 'premium': return {
      text: promoLive && premium.regularPrice
        ? (fr
          ? `Le site Premium est à ${money(premium.price, locale)} au lieu de ${money(premium.regularPrice, locale)} jusqu’au ${PROMO.label[locale]} (${PROMO.seatsLeft} places restantes). Il inclut les visuels sur mesure, la prise de rendez-vous en ligne, l’assistant IA et ${gifts} offerts.`
          : `The Premium website is ${money(premium.price, locale)} instead of ${money(premium.regularPrice, locale)} until ${PROMO.label[locale]} (${PROMO.seatsLeft} places left). It includes custom visuals, online booking, the AI assistant and ${gifts} free.`)
        : (fr ? `Le site Premium est à ${money(premium.regularPrice ?? premium.price, locale)} et inclut les visuels sur mesure, la prise de rendez-vous en ligne et l’assistant IA.` : `The Premium website is ${money(premium.regularPrice ?? premium.price, locale)} and includes custom visuals, online booking and the AI assistant.`),
      actions: ['see_pricing', 'book_call'],
    };
    case 'ads': return { text: fr ? `Nous gérons vos campagnes Google Ads : ${ads}. Le budget publicitaire est payé directement à Google par la clinique, et vous gardez le contrôle de votre compte.` : `We manage your Google Ads campaigns: ${ads}. The advertising budget is paid directly to Google by the clinic, and you keep control of your account.`, actions: ['see_pricing', 'book_call'] };
    case 'seo': return { text: fr ? 'Le SEO fait remonter votre clinique dans les résultats naturels de Google pour les soins que vous offrez, sans payer pour chaque clic. Le SEO et le GEO se font sur devis, et les 3 premiers mois sont offerts avec le site Premium.' : 'SEO moves your clinic up Google’s organic results for the treatments you offer, without paying per click. SEO and GEO are by quote, and the first 3 months are free with the Premium website.', actions: ['see_services', 'book_call'] };
    case 'website': return { text: fr ? `Nous créons des sites rapides, lisibles sur téléphone, bâtis pour que le visiteur prenne rendez-vous. Trois offres à prix fixe : ${sites}.` : `We build fast sites that read well on a phone, designed so visitors book an appointment. Three fixed-price offers: ${sites}.`, actions: ['see_pricing', 'see_services'] };
    case 'guarantee': return { text: copy.guarantee, actions: ['book_call'] };
    case 'delay': return { text: copy.delay, actions: ['book_call'] };
    case 'contact': return { text: copy.contact(EMAIL), actions: ['book_call'] };
    case 'about': return { text: copy.about, actions: ['see_services', 'book_call'] };
    case 'language': return { text: copy.language, actions: [] };
    default: return { text: copy.fallback, actions: ['book_call'] };
  }
}
