// Single source of truth for the pricing page. Update the figures here only.
import type { Locale } from './i18n/config';
export { money } from './i18n/format';

export const PROMO = {
  deadline: '2026-12-31T23:59:59-05:00',
  seatsLeft: 5,
  label: { fr: '31 décembre 2026', en: 'December 31, 2026' } as Record<Locale, string>,
};

export type SitePlan = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  regularPrice?: number;
  featured?: boolean;
  features: string[];
  cta: string;
};

const plans: Record<Locale, SitePlan[]> = {
  fr: [
    { id: 'essentiel', name: 'Essentiel', tagline: 'L’essentiel pour être présent en ligne.', price: 2490, features: ['Jusqu’à 4 pages : accueil, soins, à propos, contact', 'Design adapté au mobile', 'Formulaire de contact', 'Bases techniques du référencement'], cta: 'Choisir Essentiel' },
    { id: 'croissance', name: 'Croissance', tagline: 'Un site plus complet pour mieux convaincre.', price: 2990, features: ['Jusqu’à 7 pages, dont une page par soin principal', 'Design adapté au mobile', 'Formulaire de contact et appel direct', 'Bases techniques du référencement'], cta: 'Choisir Croissance' },
    { id: 'premium', name: 'Premium', tagline: 'Le site complet, conçu pour transformer les visites en rendez-vous.', price: 3499, regularPrice: 4990, featured: true, features: ['Jusqu’à 10 pages', 'Visuels sur mesure pour votre clinique', 'Prise de rendez-vous en ligne', 'Assistant d’intelligence artificielle'], cta: 'Profiter de l’offre Premium' },
  ],
  en: [
    { id: 'essentiel', name: 'Essential', tagline: 'The essentials to be present online.', price: 2490, features: ['Up to 4 pages: home, treatments, about, contact', 'Mobile-friendly design', 'Contact form', 'Technical SEO basics'], cta: 'Choose Essential' },
    { id: 'croissance', name: 'Growth', tagline: 'A fuller site to convince more visitors.', price: 2990, features: ['Up to 7 pages, including one page per main treatment', 'Mobile-friendly design', 'Contact form and click-to-call', 'Technical SEO basics'], cta: 'Choose Growth' },
    { id: 'premium', name: 'Premium', tagline: 'The complete site, built to turn visits into appointments.', price: 3499, regularPrice: 4990, featured: true, features: ['Up to 10 pages', 'Custom visuals for your clinic', 'Online appointment booking', 'Artificial intelligence assistant'], cta: 'Get the Premium offer' },
  ],
};
export const getSitePlans = (locale: Locale) => plans[locale];

const gifts: Record<Locale, { id: string; months: string; name: string; text: string }[]> = {
  fr: [
    { id: 'seo', months: '3 mois', name: 'de SEO', text: 'Soyez visible dans les résultats Google.' },
    { id: 'geo', months: '3 mois', name: 'de GEO', text: 'Soyez cité dans les réponses de l’IA.' },
  ],
  en: [
    { id: 'seo', months: '3 months', name: 'of SEO', text: 'Be visible in Google results.' },
    { id: 'geo', months: '3 months', name: 'of GEO', text: 'Be cited in AI answers.' },
  ],
};
export const getGifts = (locale: Locale) => gifts[locale];

export const adsPlans = [
  { id: 'ads-1', budget: { fr: '1 000 $ à 4 999 $', en: '$1,000 to $4,999' } as Record<Locale, string>, fee: 999 },
  { id: 'ads-2', budget: { fr: '5 000 $ à 9 000 $', en: '$5,000 to $9,000' } as Record<Locale, string>, fee: 1499 },
];
