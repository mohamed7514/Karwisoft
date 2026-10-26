import { define } from './define';

// Place shown on the map (Google Maps listing "Karwisoft AI").
export const MAP = {
  lat: 45.4096858,
  lng: -75.7280263,
  link: 'https://www.google.com/maps/place/Karwisoft+AI/@45.4096895,-75.7306012,17z/data=!3m1!4b1!4m6!3m5!1s0x4cce053706cf55c1:0x8ec4003ef19b68c!8m2!3d45.4096858!4d-75.7280263!16s%2Fg%2F11vkhd2glm',
};
export const EMAIL = 'Contact@Karwisoft.com';

export const aboutPage = define(
  {
    metaTitle: 'À propos — Karwisoft | Marketing pour cliniques dentaires',
    metaDescription: 'Karwisoft accompagne les cliniques dentaires avec un site web, Google Ads et du référencement : une spécialité, des résultats expliqués, un seul interlocuteur.',
    title: 'Un partenaire marketing, spécialisé en dentisterie.',
    lead: 'Karwisoft aide les cliniques dentaires à être trouvées, choisies et contactées par les patients qui cherchent un dentiste, sur Google comme dans les réponses de l’IA.',
    storyPill: 'Qui nous sommes', storyTitle: 'Nous travaillons pour les cliniques dentaires, et seulement elles.',
    story: [
      'Un patient qui cherche un dentiste compare quelques cliniques en quelques minutes. Il regarde les résultats de Google, visite un site, puis appelle. Notre travail est de faire en sorte que votre clinique soit présente, claire et rassurante à chacune de ces étapes.',
      'Nous réunissons un site web, la gestion de Google Ads et le référencement (SEO et GEO) au même endroit, pour que ces éléments travaillent ensemble plutôt que chacun de leur côté.',
    ],
    expertPill: 'Notre expertise', expertTitle: 'Du développement sur mesure, et de l’IA appliquée à votre clinique.',
    expertLead: 'Nous concevons et programmons nous-mêmes les outils que nous mettons entre vos mains : pas de gabarit générique, pas d’intermédiaire.',
    expertDev: { title: 'Développement', items: ['Sites rapides, conçus pour le mobile et l’accessibilité', 'Prise de rendez-vous en ligne et parcours de contact', 'Sites bilingues français et anglais', 'Mesure, suivi des appels et des formulaires'] },
    expertAi: { title: 'Intelligence artificielle', items: ['Assistant d’accueil qui répond aux questions et oriente vers le bon soin', 'Guidage de prise de photos sur téléphone', 'Contenu structuré pour être cité par les assistants IA', 'Des garde-fous : aucun diagnostic, aucune promesse de résultat'] },
    expertNote: 'Ces outils existent déjà dans nos sites de démonstration : nous les montrons avant que vous ne décidiez.',
    valuesPill: 'Nos principes', valuesTitle: 'Une façon de travailler simple et honnête.',
    values: [
      ['Transparence', 'Chaque mois, un rapport clair : ce qui a été fait, ce qui a changé, ce que nous ajustons. Pas de boîte noire.'],
      ['Aucune promesse irréaliste', 'Personne ne contrôle Google. Nous ne garantissons ni classement ni résultat chiffré : nous travaillons ce que nous contrôlons et nous le documentons.'],
      ['Votre temps compte', 'Vous répondez à nos questions, vous validez, vous soignez vos patients. Nous nous occupons du reste.'],
    ] as [string, string][],
    doPill: 'Ce que nous faisons', doTitle: 'Quatre services qui se complètent.',
    services: [
      ['Site web', '/services/site-web/'], ['Google Ads', '/services/google-ads/'], ['SEO', '/services/seo/'], ['SEO + IA', '/services/seo-ia/'],
    ] as [string, string][],
    howPill: 'Comment on commence', howTitle: 'Un appel, un plan, puis le travail.',
    steps: [
      ['On se parle', 'Un appel de 30 minutes pour comprendre votre clinique. Sans engagement.'],
      ['On vous propose un plan', 'Un devis clair, avec ce que nous ferons et combien cela coûte.'],
      ['On travaille, vous soignez', 'Nous nous occupons du reste et vous tenons informé chaque mois.'],
    ] as [string, string][],
    ctaPill: 'Contact', ctaTitle: 'Voyons si nous sommes un bon match.', ctaBtn: 'Nous contacter', seeServices: 'Voir les services',
  },
  {
    metaTitle: 'About — Karwisoft | Marketing for dental clinics',
    metaDescription: 'Karwisoft supports dental clinics with a website, Google Ads and SEO: one specialty, results explained, one point of contact.',
    title: 'A marketing partner specialized in dentistry.',
    lead: 'Karwisoft helps dental clinics get found, chosen and contacted by patients looking for a dentist, on Google as well as in AI answers.',
    storyPill: 'Who we are', storyTitle: 'We work for dental clinics, and only them.',
    story: [
      'A patient looking for a dentist compares a few clinics within minutes. They check Google’s results, visit a website, then call. Our job is to make your clinic present, clear and reassuring at each of those steps.',
      'We bring a website, Google Ads management and search visibility (SEO and GEO) together, so these pieces work with each other instead of separately.',
    ],
    expertPill: 'Our expertise', expertTitle: 'Custom development, and AI applied to your clinic.',
    expertLead: 'We design and code the tools we put in your hands ourselves: no generic template, no middleman.',
    expertDev: { title: 'Development', items: ['Fast sites, built for mobile and accessibility', 'Online appointment booking and contact flows', 'Bilingual French and English sites', 'Measurement, call and form tracking'] },
    expertAi: { title: 'Artificial intelligence', items: ['A front-desk assistant that answers questions and points to the right treatment', 'Guided photo capture on a phone', 'Content structured to be cited by AI assistants', 'Guardrails: no diagnosis, no promise of results'] },
    expertNote: 'These tools already exist in our demo sites: we show them to you before you decide.',
    valuesPill: 'Our principles', valuesTitle: 'A simple, honest way of working.',
    values: [
      ['Transparency', 'Every month, a clear report: what was done, what changed, what we are adjusting. No black box.'],
      ['No unrealistic promises', 'Nobody controls Google. We guarantee neither a ranking nor a specific result: we work on what we control and document it.'],
      ['Your time matters', 'You answer our questions, you approve, you treat your patients. We handle the rest.'],
    ] as [string, string][],
    doPill: 'What we do', doTitle: 'Four services that complement each other.',
    services: [
      ['Website', '/services/site-web/'], ['Google Ads', '/services/google-ads/'], ['SEO', '/services/seo/'], ['SEO + AI', '/services/seo-ia/'],
    ] as [string, string][],
    howPill: 'How we start', howTitle: 'A call, a plan, then the work.',
    steps: [
      ['We talk', 'A 30-minute call to understand your clinic. No commitment.'],
      ['We propose a plan', 'A clear quote, with what we will do and how much it costs.'],
      ['We work, you treat', 'We take care of the rest and keep you informed every month.'],
    ] as [string, string][],
    ctaPill: 'Contact', ctaTitle: 'Let’s see if we are a good match.', ctaBtn: 'Contact us', seeServices: 'View the services',
  },
);

export const contactPage = define(
  {
    metaTitle: 'Contact — Karwisoft | Parlons de votre clinique',
    metaDescription: 'Contactez Karwisoft pour un site web, Google Ads ou du référencement pour votre clinique dentaire. Appel de 30 minutes, sans engagement.',
    title: 'Parlons de votre clinique.', sub: 'Un appel de 30 minutes, sans engagement.',
    lead: 'Dites-nous où vous en êtes. Nous vous répondons et vous disons honnêtement ce qui a du sens pour vous.',
    emailLabel: 'Courriel',
    placeLabel: 'Où nous trouver', placeNote: 'Karwisoft sur Google Maps', openMap: 'Ouvrir dans Google Maps', mapTitle: 'Carte : emplacement de Karwisoft',
    formPill: 'Écrivez-nous', formTitle: 'Votre message.',
    name: 'Nom', clinic: 'Clinique', email: 'Courriel', phone: 'Téléphone (facultatif)', topic: 'Sujet', message: 'Message',
    topics: ['Site web', 'Google Ads', 'SEO', 'SEO + IA', 'Je ne sais pas encore'],
    send: 'Envoyer le message', note: 'Le bouton ouvre votre application de courriel avec le message prêt à envoyer à Karwisoft.',
    subject: 'Demande depuis le site Karwisoft', fields: { name: 'Nom', clinic: 'Clinique', email: 'Courriel', phone: 'Téléphone', topic: 'Sujet' },
    required: 'Ce champ est requis.',
  },
  {
    metaTitle: 'Contact — Karwisoft | Let’s talk about your clinic',
    metaDescription: 'Contact Karwisoft for a website, Google Ads or SEO for your dental clinic. A 30-minute call, no commitment.',
    title: 'Let’s talk about your clinic.', sub: 'A 30-minute call, no commitment.',
    lead: 'Tell us where you are. We will get back to you and tell you honestly what makes sense for you.',
    emailLabel: 'Email',
    placeLabel: 'Where to find us', placeNote: 'Karwisoft on Google Maps', openMap: 'Open in Google Maps', mapTitle: 'Map: Karwisoft location',
    formPill: 'Write to us', formTitle: 'Your message.',
    name: 'Name', clinic: 'Clinic', email: 'Email', phone: 'Phone (optional)', topic: 'Topic', message: 'Message',
    topics: ['Website', 'Google Ads', 'SEO', 'SEO + AI', 'Not sure yet'],
    send: 'Send message', note: 'The button opens your email app with the message ready to send to Karwisoft.',
    subject: 'Request from the Karwisoft website', fields: { name: 'Name', clinic: 'Clinic', email: 'Email', phone: 'Phone', topic: 'Topic' },
    required: 'This field is required.',
  },
);
