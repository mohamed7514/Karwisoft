import { define } from './define';

export const shell = define(
  {
    skip: 'Aller au contenu',
    brandAria: 'Karwisoft Marketing, accueil',
    menu: 'Menu', close: 'Fermer', nav: 'Navigation principale',
    services: 'Services', pricing: 'Tarifs', about: 'À propos', contact: 'Contact', presentation: 'Mode présentation', presentationTitle: 'Ouvrir le mode présentation',
    contactCta: 'Parlons de votre projet',
    footerNav: 'Navigation de pied de page', home: 'Accueil',
    languageAria: 'Choisir la langue',
    heroTitle: 'Nous construisons dès aujourd’hui', heroEm: 'le futur de votre marketing.',
    heroPast: 'Peinture imaginaire dorée : un dentiste d’autrefois examine un patient. À droite, des villageois découvrent une sphère lumineuse devant eux.',
    heroFuture: 'Vision illustrée du marketing dentaire : des personnages historiques découvrent la recherche Google, les réponses de l’IA et la dentisterie de demain.',
    pause: 'Pause', resume: 'Reprendre', pauseAria: 'Mettre l’animation de la bulle en pause', resumeAria: 'Reprendre l’animation de la bulle',
    rights: '© 2026 Karwisoft Marketing',
    notFoundTitle: 'Cette page est introuvable.', notFoundBack: 'Retour à l’accueil',
  },
  {
    skip: 'Skip to content',
    brandAria: 'Karwisoft Marketing, home',
    menu: 'Menu', close: 'Close', nav: 'Main navigation',
    services: 'Services', pricing: 'Pricing', about: 'About', contact: 'Contact', presentation: 'Presentation mode', presentationTitle: 'Open presentation mode',
    contactCta: 'Let’s talk about your project',
    footerNav: 'Footer navigation', home: 'Home',
    languageAria: 'Choose language',
    heroTitle: 'We are building today', heroEm: 'the future of your marketing.',
    heroPast: 'Imaginary golden painting: a historical dentist examines a patient. On the right, villagers discover a luminous sphere in front of them.',
    heroFuture: 'An illustrated vision of dental marketing: historical characters discover Google search, AI answers and the dentistry of tomorrow.',
    pause: 'Pause', resume: 'Resume', pauseAria: 'Pause the bubble animation', resumeAria: 'Resume the bubble animation',
    rights: '© 2026 Karwisoft Marketing',
    notFoundTitle: 'This page could not be found.', notFoundBack: 'Back to home',
  },
);

export const home = define(
  {
    introTitle: 'Du premier clic au premier rendez-vous.', introSub: 'Le marketing des cliniques dentaires.',
    introLead: 'Une suite de services pour chaque étape : être trouvé sur Google et dans les réponses de l’IA, convaincre avec un site clair, et transformer les visites en rendez-vous.',
    servicesAria: 'Nos services',
    cards: [
      { n: '01', href: '/services/site-web/', title: 'Site web', text: 'Un site rapide, clair, pensé pour que le visiteur prenne rendez-vous.' },
      { n: '02', href: '/services/google-ads/', title: 'Google Ads', text: 'Des annonces qui apparaissent quand on cherche un dentiste près de chez vous.' },
      { n: '03', href: '/services/seo/', title: 'SEO', text: 'Être trouvé dans les résultats Google, sans payer chaque clic.' },
      { n: '04', href: '/services/seo-ia/', title: 'SEO + IA', text: 'Être cité quand les patients posent la question à une IA.' },
    ],
    offerPill: 'Offre', offerTitle: 'Le site Premium, à prix réduit.',
    offerBody: 'Visuels sur mesure, prise de rendez-vous en ligne et assistant d’intelligence artificielle.',
    seePricing: 'Voir les tarifs', discoverSite: 'Découvrir le site web',
    faq: [
      ['Par où commencer si je ne sais pas ce dont j’ai besoin ?', 'Par un appel. Nous regardons votre situation actuelle et nous vous disons honnêtement ce qui a du sens pour votre clinique, et ce qui n’en a pas.'],
      ['Puis-je combiner plusieurs services ?', 'Oui. Le site web, Google Ads et le SEO se complètent : le site convertit les visites que les deux autres apportent.'],
      ['Le budget publicitaire est-il inclus ?', 'Non. Le budget Google Ads est payé directement à Google par la clinique. Nos frais de gestion sont distincts et affichés sur la page Tarifs.'],
      ['Que se passe-t-il après les 3 mois de SEO et de GEO offerts ?', 'Nous vous remettons une soumission sur mesure. Vous restez libre de continuer ou non.'],
      ['Jusqu’à quand dure l’offre Premium ?', 'Jusqu’au 31 décembre 2026, dans la limite des places disponibles.'],
    ] as [string, string][],
    contactPill: 'Contact', contactTitle: 'Parlons de votre clinique.', contactBtn: 'Commencer la conversation',
    mailSubject: 'Projet pour ma clinique dentaire',
  },
  {
    introTitle: 'From the first click to the first appointment.', introSub: 'Marketing for dental clinics.',
    introLead: 'A suite of services for every step: be found on Google and in AI answers, convince with a clear website, and turn visits into appointments.',
    servicesAria: 'Our services',
    cards: [
      { n: '01', href: '/services/site-web/', title: 'Website', text: 'A fast, clear site designed so visitors book an appointment.' },
      { n: '02', href: '/services/google-ads/', title: 'Google Ads', text: 'Ads that appear when someone searches for a dentist near them.' },
      { n: '03', href: '/services/seo/', title: 'SEO', text: 'Be found in Google results without paying for every click.' },
      { n: '04', href: '/services/seo-ia/', title: 'SEO + AI', text: 'Be cited when patients ask an AI assistant.' },
    ],
    offerPill: 'Offer', offerTitle: 'The Premium website, at a reduced price.',
    offerBody: 'Custom visuals, online appointment booking and an artificial intelligence assistant.',
    seePricing: 'See pricing', discoverSite: 'Discover the website',
    faq: [
      ['Where do I start if I’m not sure what I need?', 'With a call. We look at your current situation and tell you honestly what makes sense for your clinic, and what doesn’t.'],
      ['Can I combine several services?', 'Yes. The website, Google Ads and SEO complement each other: the website converts the visits the other two bring in.'],
      ['Is the advertising budget included?', 'No. The Google Ads budget is paid directly to Google by the clinic. Our management fees are separate and listed on the Pricing page.'],
      ['What happens after the 3 free months of SEO and GEO?', 'We send you a tailored quote. You are free to continue or not.'],
      ['How long does the Premium offer last?', 'Until December 31, 2026, while places last.'],
    ] as [string, string][],
    contactPill: 'Contact', contactTitle: 'Let’s talk about your clinic.', contactBtn: 'Start the conversation',
    mailSubject: 'Project for my dental clinic',
  },
);

export const promo = define(
  { paid: 'Paiement unique', save: 'économisez', regularAria: 'Prix habituel', until: 'Jusqu’au', seats: 'places restantes', best: 'Meilleure offre', includedFree: 'Inclus gratuitement', giftsAria: 'Inclus gratuitement avec l’offre Premium', offered: 'Offert' },
  { paid: 'One-time payment', save: 'save', regularAria: 'Regular price', until: 'Until', seats: 'places left', best: 'Best offer', includedFree: 'Included free', giftsAria: 'Included free with the Premium offer', offered: 'Free' },
);

export const pricingPage = define(
  {
    metaTitle: 'Tarifs — Karwisoft | Site web et Google Ads pour cliniques dentaires',
    metaDescription: 'Trois offres de site web pour cliniques dentaires, dont une offre Premium à prix réduit avec 3 mois de SEO et 3 mois de GEO offerts. Gestion Google Ads dès 999 $ par mois.',
    title: 'Des tarifs clairs.', sub: 'Le prix affiché est le prix.',
    lead: 'Trois offres de site web, une gestion Google Ads au forfait, et le SEO et le GEO sur devis.',
    sitePill: 'Site web', siteTitle: 'Choisissez votre site.',
    adsPill: 'Google Ads', adsTitle: 'Une gestion au forfait, selon votre budget.',
    adsBody: 'Frais de gestion Karwisoft, par mois. Le budget publicitaire est payé directement à Google par la clinique.',
    monthlyBudget: 'Budget mensuel', perMonth: 'par mois', start: 'Démarrer', over: 'Budget supérieur à 9 000 $ par mois : sur devis.',
    seoPill: 'SEO et GEO', seoTitle: 'Sur devis, adapté à votre marché.',
    seoBody: 'Chaque clinique a des concurrents et des soins à mettre de l’avant qui lui sont propres. Avec l’offre Premium, les 3 premiers mois de SEO et de GEO sont offerts.',
    quote: 'Demander une soumission',
    faq: [
      ['Le prix du site inclut-il la gestion Google Ads ?', 'Non. Ce sont deux services distincts : le site est un paiement unique, la gestion Google Ads est un forfait mensuel.'],
      ['Qui paie le budget publicitaire ?', 'La clinique, directement à Google. Nos frais de gestion s’y ajoutent et sont indiqués ci-dessus.'],
      ['Que se passe-t-il après les 3 mois de SEO et de GEO offerts ?', 'Nous vous remettons une soumission sur mesure. Vous restez libre de continuer ou non.'],
      ['Jusqu’à quand dure l’offre Premium ?', 'Jusqu’au 31 décembre 2026, dans la limite des places disponibles.'],
    ] as [string, string][],
    contactPill: 'Contact', contactTitle: 'Une question avant de choisir ?', contactBtn: 'Commencer la conversation',
    mailSite: (name: string) => `Offre ${name} — site web`, mailAds: (budget: string) => `Gestion Google Ads — budget ${budget}`, mailSeo: 'Soumission SEO et GEO', mailQuestion: 'Question sur les tarifs',
  },
  {
    metaTitle: 'Pricing — Karwisoft | Websites and Google Ads for dental clinics',
    metaDescription: 'Three website offers for dental clinics, including a discounted Premium offer with 3 free months of SEO and 3 free months of GEO. Google Ads management from $999 per month.',
    title: 'Clear pricing.', sub: 'The price shown is the price.',
    lead: 'Three website offers, flat-fee Google Ads management, and SEO and GEO by quote.',
    sitePill: 'Website', siteTitle: 'Choose your website.',
    adsPill: 'Google Ads', adsTitle: 'Flat-fee management, based on your budget.',
    adsBody: 'Karwisoft management fee, per month. The advertising budget is paid directly to Google by the clinic.',
    monthlyBudget: 'Monthly budget', perMonth: 'per month', start: 'Get started', over: 'Budget above $9,000 per month: by quote.',
    seoPill: 'SEO and GEO', seoTitle: 'By quote, tailored to your market.',
    seoBody: 'Every clinic has its own competitors and treatments to highlight. With the Premium offer, the first 3 months of SEO and GEO are free.',
    quote: 'Request a quote',
    faq: [
      ['Does the website price include Google Ads management?', 'No. They are two separate services: the website is a one-time payment, Google Ads management is a monthly fee.'],
      ['Who pays the advertising budget?', 'The clinic, directly to Google. Our management fees are added on top and listed above.'],
      ['What happens after the 3 free months of SEO and GEO?', 'We send you a tailored quote. You are free to continue or not.'],
      ['How long does the Premium offer last?', 'Until December 31, 2026, while places last.'],
    ] as [string, string][],
    contactPill: 'Contact', contactTitle: 'A question before you choose?', contactBtn: 'Start the conversation',
    mailSite: (name: string) => `${name} offer — website`, mailAds: (budget: string) => `Google Ads management — budget ${budget}`, mailSeo: 'SEO and GEO quote', mailQuestion: 'Question about pricing',
  },
);

export const servicesPage = define(
  {
    metaTitle: 'Services — Karwisoft | Marketing pour cliniques dentaires',
    metaDescription: 'Site web, Google Ads, SEO et référencement pour l’IA : les quatre services Karwisoft pour aider les patients à trouver votre clinique dentaire.',
    title: 'Ce que nous faisons.', sub: 'Quatre services, une seule équipe.',
    lead: 'Pour qu’un patient qui cherche un dentiste vous trouve, vous choisisse et prenne rendez-vous.',
    cards: [
      { n: '01', title: 'Site web', href: '/services/site-web/', text: 'Un site rapide, lisible sur téléphone, bâti pour que le visiteur prenne rendez-vous plutôt que de simplement regarder.', points: ['Clé en main : vous répondez à nos questions une fois', 'Compatible mobile et connecté à Google dès la mise en ligne', 'Prise de rendez-vous en ligne avec l’offre Premium'] },
      { n: '02', title: 'Google Ads', href: '/services/google-ads/', text: 'Votre clinique apparaît en haut de Google quand quelqu’un cherche un dentiste dans votre secteur. Vous ne payez que lorsqu’on clique.', points: ['Ciblage des patients de votre secteur', 'Votre budget reste entre vos mains', 'Un rapport mensuel qui explique les résultats'] },
      { n: '03', title: 'SEO', href: '/services/seo/', text: 'Votre clinique remonte dans les résultats naturels de Google pour les soins que vous offrez, sans payer pour chaque clic.', points: ['Des visites de patients qui cherchent vos soins', 'Une présence durable : l’effet grandit avec le temps', 'Un suivi clair de ce qui progresse'] },
      { n: '04', title: 'SEO + IA', href: '/services/seo-ia/', text: 'De plus en plus de patients posent leurs questions à une IA. Un contenu clair et bien structuré aide l’IA à citer votre clinique.', points: ['Votre expertise présentée comme une référence', 'Un contenu pensé pour les moteurs et pour les IA', 'Un complément naturel au SEO'] },
    ],
    seeService: 'Voir le service',
    whyPill: 'Approche', whyTitle: 'Pourquoi Karwisoft.',
    reasons: [
      ['Une spécialité', 'Nous travaillons pour les cliniques dentaires. Nous connaissons vos soins et ce que cherchent vos futurs patients.'],
      ['Des résultats expliqués', 'Chaque mois, un rapport simple : ce qui a été fait, ce qui a changé, ce que nous ajustons. Pas de boîte noire.'],
      ['Un interlocuteur', 'Une personne qui connaît votre clinique, répond à vos questions et explique chaque décision.'],
    ] as [string, string][],
    startPill: 'Démarrage', startTitle: 'Comment on démarre ensemble.',
    steps: [
      ['On se parle', 'Un appel de 30 minutes pour comprendre votre clinique et vos objectifs. Sans engagement.'],
      ['On vous propose un plan', 'Un devis clair : ce que nous ferons, pourquoi, et combien cela coûte. Vous choisissez ce qui a du sens.'],
      ['On travaille, vous soignez', 'Nous nous occupons du reste. Votre rôle : répondre aux nouveaux patients qui vous contactent.'],
    ] as [string, string][],
    contactPill: 'Contact', contactTitle: 'Parlons de votre clinique.', contactBtn: 'Commencer la conversation', seePricing: 'Voir les tarifs',
    mailSubject: 'Projet pour ma clinique dentaire',
  },
  {
    metaTitle: 'Services — Karwisoft | Marketing for dental clinics',
    metaDescription: 'Website, Google Ads, SEO and AI search visibility: the four Karwisoft services that help patients find your dental clinic.',
    title: 'What we do.', sub: 'Four services, one team.',
    lead: 'So that a patient looking for a dentist finds you, chooses you and books an appointment.',
    cards: [
      { n: '01', title: 'Website', href: '/services/site-web/', text: 'A fast site, easy to read on a phone, built so visitors book an appointment instead of just browsing.', points: ['Turnkey: you answer our questions once', 'Mobile-friendly and connected to Google from launch', 'Online booking with the Premium offer'] },
      { n: '02', title: 'Google Ads', href: '/services/google-ads/', text: 'Your clinic appears at the top of Google when someone looks for a dentist in your area. You only pay when someone clicks.', points: ['Targeting patients in your area', 'Your budget stays in your hands', 'A monthly report that explains the results'] },
      { n: '03', title: 'SEO', href: '/services/seo/', text: 'Your clinic climbs Google’s organic results for the treatments you offer, without paying for every click.', points: ['Visits from patients searching for your treatments', 'A lasting presence: the effect grows over time', 'Clear tracking of what is improving'] },
      { n: '04', title: 'SEO + AI', href: '/services/seo-ia/', text: 'More and more patients ask an AI their questions. Clear, well-structured content helps AI cite your clinic.', points: ['Your expertise presented as a reference', 'Content built for search engines and for AI', 'A natural complement to SEO'] },
    ],
    seeService: 'View the service',
    whyPill: 'Approach', whyTitle: 'Why Karwisoft.',
    reasons: [
      ['A specialty', 'We work for dental clinics. We know your treatments and what your future patients are looking for.'],
      ['Results explained', 'Every month, a simple report: what was done, what changed, what we are adjusting. No black box.'],
      ['One contact', 'A person who knows your clinic, answers your questions and explains every decision.'],
    ] as [string, string][],
    startPill: 'Getting started', startTitle: 'How we start together.',
    steps: [
      ['We talk', 'A 30-minute call to understand your clinic and your goals. No commitment.'],
      ['We propose a plan', 'A clear quote: what we will do, why, and how much it costs. You choose what makes sense.'],
      ['We work, you treat', 'We take care of the rest. Your role: answer the new patients who contact you.'],
    ] as [string, string][],
    contactPill: 'Contact', contactTitle: 'Let’s talk about your clinic.', contactBtn: 'Start the conversation', seePricing: 'See pricing',
    mailSubject: 'Project for my dental clinic',
  },
);

export const detail = define(
  {
    services: 'Services', why: 'Pourquoi', plan: 'Notre plan', role: 'Votre rôle', roleTitle: 'Peu d’efforts de votre côté.', youDo: 'Ce que vous faites', youDont: 'Ce que vous n’avez pas à faire',
    price: 'Tarif', priceTitle: 'Ce que ça coûte.', offer: 'Offre', oneTime: 'paiement unique', seeOffers: 'Voir le détail des offres', seePricing: 'Voir les tarifs',
    adsBudget: 'Budget publicitaire mensuel', adsFee: 'gestion par mois', adsNote: 'Le budget publicitaire est payé directement à Google par la clinique.',
    byQuote: 'Sur devis', quoteNote: 'Adapté à votre marché et à vos soins. Les 3 premiers mois sont offerts avec l’offre Premium.',
    contact: 'Contact', next: 'Service suivant :',
  },
  {
    services: 'Services', why: 'Why', plan: 'Our plan', role: 'Your role', roleTitle: 'Little effort on your side.', youDo: 'What you do', youDont: 'What you don’t have to do',
    price: 'Pricing', priceTitle: 'What it costs.', offer: 'Offer', oneTime: 'one-time payment', seeOffers: 'See the offer details', seePricing: 'See pricing',
    adsBudget: 'Monthly advertising budget', adsFee: 'management per month', adsNote: 'The advertising budget is paid directly to Google by the clinic.',
    byQuote: 'By quote', quoteNote: 'Tailored to your market and treatments. The first 3 months are free with the Premium offer.',
    contact: 'Contact', next: 'Next service:',
  },
);
