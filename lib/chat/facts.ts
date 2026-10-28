import { adsPlans, getGifts, getSitePlans, money, PROMO } from '../pricing';
import { servicesPage } from '../i18n/dict';
import { EMAIL } from '../i18n/dict-company';
import type { Locale } from '../i18n/config';

// Everything the assistant may state as fact, generated from the same data as the site so it cannot drift.
export function chatFacts(locale: Locale, at = Date.now()): string {
  const t = servicesPage[locale];
  const plans = getSitePlans(locale);
  const promoLive = at <= new Date(PROMO.deadline).getTime();
  const gifts = getGifts(locale).map(gift => `${gift.months} ${gift.name}`).join(' + ');
  const lines: string[] = [];
  if (locale === 'en') {
    lines.push('- Karwisoft Marketing works for dental clinics only. Services: website, Google Ads management, SEO, SEO + AI (GEO: being cited by AI assistants).');
    for (const card of t.cards) lines.push(`- ${card.title}: ${card.text}`);
    for (const plan of plans) {
      const promo = plan.featured && plan.regularPrice && promoLive ? ` (regular ${money(plan.regularPrice, locale)}, discounted until ${PROMO.label[locale]}, ${PROMO.seatsLeft} places left)` : '';
      lines.push(`- Website offer ${plan.name}: ${money(plan.price, locale)} one-time${promo}. ${plan.features.join('; ')}.`);
    }
    lines.push(`- The Premium website includes ${gifts} free (SEO and GEO). After that, SEO and GEO are priced by quote and the clinic is free to stop.`);
    for (const plan of adsPlans) lines.push(`- Google Ads management: ${money(plan.fee, locale)} per month for an advertising budget of ${plan.budget[locale]}. Above $9,000 per month: by quote.`);
    lines.push('- The advertising budget is paid directly to Google by the clinic; Karwisoft’s management fee is separate. The website price does not include Google Ads management.');
    lines.push('- SEO and GEO: by quote, tailored to the clinic’s market. No ranking, patient count or result is guaranteed.');
    lines.push(`- Getting started: the visitor leaves their details (the chat has a form that sends their request to the team) or orders the Premium website on the order page; for SEO, GEO and larger needs the team sends a clear quote. A monthly report explains the work. Contact: the Contact page of the site or ${EMAIL}. No response time is promised.`);
    lines.push('- Not known (say so and suggest a call): delivery time, number of clients, past results, contract length, specific integrations, a clinic’s exact price beyond the listed ones.');
  } else {
    lines.push('- Karwisoft Marketing travaille uniquement pour des cliniques dentaires. Services : site web, gestion Google Ads, SEO, SEO + IA (GEO : être cité par les assistants IA).');
    for (const card of t.cards) lines.push(`- ${card.title} : ${card.text}`);
    for (const plan of plans) {
      const promo = plan.featured && plan.regularPrice && promoLive ? ` (prix habituel ${money(plan.regularPrice, locale)}, à prix réduit jusqu’au ${PROMO.label[locale]}, ${PROMO.seatsLeft} places restantes)` : '';
      lines.push(`- Offre de site web ${plan.name} : ${money(plan.price, locale)} paiement unique${promo}. ${plan.features.join(' ; ')}.`);
    }
    lines.push(`- Le site Premium inclut ${gifts} offerts (SEO et GEO). Ensuite, le SEO et le GEO sont sur devis et la clinique est libre d’arrêter.`);
    for (const plan of adsPlans) lines.push(`- Gestion Google Ads : ${money(plan.fee, locale)} par mois pour un budget publicitaire de ${plan.budget[locale]}. Au-delà de 9 000 $ par mois : sur devis.`);
    lines.push('- Le budget publicitaire est payé directement à Google par la clinique ; les frais de gestion Karwisoft sont distincts. Le prix du site n’inclut pas la gestion Google Ads.');
    lines.push('- SEO et GEO : sur devis, selon le marché de la clinique. Aucun classement, nombre de patients ni résultat n’est garanti.');
    lines.push(`- Pour commencer : le visiteur laisse ses coordonnées (le chat a un formulaire qui transmet sa demande à l’équipe) ou commande le site Premium sur la page de commande ; pour le SEO, le GEO et les besoins plus larges, l’équipe envoie un devis clair. Un rapport mensuel explique le travail. Contact : la page Contact du site ou ${EMAIL}. Aucun délai de réponse n’est promis.`);
    lines.push('- Inconnu (le dire et proposer un appel) : délai de livraison, nombre de clients, résultats passés, durée de contrat, intégrations précises, prix exact au-delà de ceux listés.');
  }
  return lines.join('\n');
}
