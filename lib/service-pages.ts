// Content of the four service detail pages. Prices come from lib/pricing.ts, not from here.
export type ServicePage = {
  slug: 'site-web' | 'google-ads' | 'seo' | 'seo-ia';
  n: string;
  name: string;
  title: string;
  metaTitle: string;
  description: string;
  lead: string;
  highlights: [string, string][];
  whyTitle: string;
  why: string[];
  planTitle: string;
  steps: { title: string; text: string; note: string }[];
  yourRole: string[];
  notYours: string[];
  pricing: 'site' | 'ads' | 'quote';
  faq: [string, string][];
  cta: { title: string; text: string; button: string; subject: string };
};

const servicePagesFr: ServicePage[] = [
  {
    slug: 'site-web',
    n: '01',
    name: 'Site web',
    title: 'Un site qui transforme les visites en rendez-vous.',
    metaTitle: 'Site web pour clinique dentaire — Karwisoft',
    description: 'Karwisoft crée des sites web pour cliniques dentaires : rapides, lisibles sur téléphone et conçus pour convaincre le visiteur de prendre rendez-vous. Clé en main.',
    lead: 'Un site conçu pour les cliniques dentaires : lisible sur téléphone, rassurant pour le patient, et bâti pour qu’il prenne rendez-vous plutôt que de simplement regarder.',
    highlights: [['Clé en main', 'Vous répondez à nos questions une fois, nous faisons le reste.'], ['Pensé pour le mobile', 'La plupart des patients arrivent depuis leur téléphone.'], ['Connecté à Google', 'Mis en ligne avec les bases du référencement en place.']],
    whyTitle: 'Pourquoi un patient quitte un site sans appeler.',
    why: [
      'Un patient qui arrive sur votre site se demande une chose : « Cette clinique est-elle faite pour moi ? » Si le site ne répond pas rapidement, il revient en arrière et appelle un concurrent.',
      'Il doit comprendre en quelques secondes qui vous êtes, ce que vous faites, pourquoi vous faire confiance et comment prendre rendez-vous.',
    ],
    planTitle: 'Du premier appel à la mise en ligne.',
    steps: [
      { title: 'Entrevue de découverte', text: 'Un appel pour comprendre votre clinique : vos soins, votre équipe, vos valeurs, ce qui vous différencie.', note: 'Votre seul vrai effort : un appel.' },
      { title: 'Plan du site', text: 'Nous définissons les pages à créer et leur contenu, puis vous présentons un plan simple à valider.', note: 'Vous validez la structure avant le design.' },
      { title: 'Design', text: 'Un design propre, cohérent avec l’image de votre clinique, qui inspire confiance sur téléphone comme sur ordinateur.', note: 'Vous validez la maquette avant le développement.' },
      { title: 'Rédaction du contenu', text: 'Nous rédigons tous les textes en langage clair pour le patient : accueil, soins, équipe, contact.', note: 'Vous relisez avant la publication.' },
      { title: 'Développement et tests', text: 'Nous construisons le site et le testons sur téléphones, tablettes et ordinateurs, dont le formulaire et le bouton de rendez-vous.', note: 'Tests complets avant la mise en ligne.' },
      { title: 'Mise en ligne et formation', text: 'Nous publions le site, le connectons à Google Search Console et vous montrons comment mettre à jour une information simple.', note: 'Site en ligne et courte formation.' },
    ],
    yourRole: ['Participer à l’entrevue de découverte', 'Valider la structure et le design', 'Relire les textes avant publication', 'Donner l’accord final pour la mise en ligne'],
    notYours: ['Écrire le moindre texte', 'Comprendre le design ou le code', 'Coordonner plusieurs prestataires', 'Suivre un chantier technique'],
    pricing: 'site',
    faq: [
      ['Combien ça coûte ?', 'Trois offres à prix fixe sont affichées sur la page Tarifs, avec l’offre Premium à prix réduit jusqu’au 31 décembre 2026.'],
      ['Qui s’occupe du site après la mise en ligne ?', 'Vous pouvez mettre à jour les informations simples vous-même : nous vous montrons comment. Pour des changements plus importants, nous sommes disponibles.'],
      ['Et si je n’ai pas de photos de ma clinique ?', 'Nous pouvons commencer avec des photos professionnelles libres de droits, puis les remplacer par les vôtres. Le contenu ne bloque pas le projet.'],
      ['Mon site actuel est mauvais. Pouvez-vous le refaire ?', 'Oui, c’est souvent la meilleure solution. Nous évaluons cela ensemble lors du premier appel.'],
      ['Faites-vous aussi le SEO ?', 'Les sites que nous créons sont construits avec de bonnes bases de référencement. Un travail SEO continu est un service distinct, qui se combine au site.'],
    ],
    cta: { title: 'Regardons votre site actuel ensemble.', text: 'Un appel de 30 minutes pour voir ce qui manque et si un nouveau site a du sens pour vous. Nous sommes honnêtes si la réponse est non.', button: 'Analyser mon site actuel', subject: 'Nouveau site web pour ma clinique dentaire' },
  },
  {
    slug: 'google-ads',
    n: '02',
    name: 'Google Ads',
    title: 'Votre annonce devant le bon patient, au bon moment.',
    metaTitle: 'Gestion Google Ads pour clinique dentaire — Karwisoft',
    description: 'Karwisoft gère vos campagnes Google Ads pour cliniques dentaires. Vous approuvez le budget et les annonces, nous gérons le reste.',
    lead: 'Votre clinique apparaît en haut de Google quand un patient cherche un soin que vous offrez. Vous ne payez que lorsque quelqu’un clique.',
    highlights: [['Un clic, un intérêt', 'Vous payez uniquement quand on clique sur votre annonce.'], ['Contrôle total', 'Le budget reste entre vos mains et dans votre compte Google.'], ['Rapide à lancer', 'Une solution directe pour remplir un horaire ou promouvoir un soin.']],
    whyTitle: 'Une vitrine immédiate, en complément du SEO.',
    why: [
      'Avec Google Ads, vous payez Google pour afficher votre annonce quand quelqu’un cherche un soin que vous offrez. Le patient voit votre clinique parmi les premiers résultats.',
      'Le SEO construit une présence durable, mais demande du temps. Google Ads agit rapidement, et son effet s’arrête si les campagnes s’arrêtent. Les deux se complètent.',
    ],
    planTitle: 'Du premier appel au rapport mensuel.',
    steps: [
      { title: 'Définir vos objectifs', text: 'Plus de patients en général ? Un soin précis comme les implants ? Un secteur géographique ? Nous adaptons la stratégie à vos priorités.', note: 'Objectifs, soins à promouvoir, secteur.' },
      { title: 'Fixer votre budget', text: 'Le budget payé à Google est séparé de nos frais de gestion. Vous le voyez dans votre compte Google et pouvez l’ajuster ou le suspendre.', note: 'Vous gardez l’accès à votre compte.' },
      { title: 'Créer les annonces', text: 'Nous rédigeons les annonces (titres, descriptions, liens) et vous les soumettons avant le lancement.', note: 'Rien ne part sans votre approbation.' },
      { title: 'Cibler votre secteur', text: 'Nous configurons les campagnes pour joindre les patients de votre ville, de vos quartiers ou d’un rayon autour de la clinique.', note: 'Ciblage géographique, jours et heures.' },
      { title: 'Suivre et optimiser', text: 'Nous surveillons les annonces et les mots-clés qui génèrent des contacts et ajustons les campagnes pour éviter les dépenses inutiles.', note: 'Optimisation régulière.' },
      { title: 'Rapport mensuel', text: 'Chaque mois : clics, appels, coût par contact et ajustements effectués, sans jargon.', note: 'Un rapport clair.' },
    ],
    yourRole: ['Définir votre budget mensuel', 'Approuver les annonces avant le lancement', 'Répondre aux appels et aux demandes', 'Lire le rapport mensuel'],
    notYours: ['Créer ou gérer les campagnes', 'Choisir les mots-clés', 'Surveiller les performances', 'Ajuster les enchères'],
    pricing: 'ads',
    faq: [
      ['Quel budget faut-il prévoir ?', 'Nos forfaits de gestion couvrent les budgets publicitaires de 1 000 $ à 9 000 $ par mois. Nous vous conseillons selon votre marché local, sans pousser à dépenser davantage.'],
      ['Puis-je suspendre mes campagnes ?', 'Oui, à tout moment. Vous gardez le contrôle de votre compte Google Ads.'],
      ['Comment savoir que les appels viennent de Google Ads ?', 'Nous mettons en place un suivi des appels et des formulaires pour mesurer ce que les annonces génèrent.'],
      ['Google Ads peut-il me coûter plus que prévu ?', 'Non. Vous fixez un plafond de budget que Google ne dépasse pas. Si les résultats ne suivent pas, nous ajustons la stratégie.'],
    ],
    cta: { title: 'Analysons votre marché local.', text: 'Un appel de 30 minutes pour évaluer la demande dans votre secteur et voir si Google Ads est la bonne solution pour vous.', button: 'Analyser mon marché local', subject: 'Gestion Google Ads pour ma clinique dentaire' },
  },
  {
    slug: 'seo',
    n: '03',
    name: 'SEO',
    title: 'Être trouvé dans Google, sans payer chaque clic.',
    metaTitle: 'SEO pour clinique dentaire — Karwisoft',
    description: 'Le référencement naturel pour cliniques dentaires : comprendre les écarts avec les cliniques visibles, puis construire un plan avec des livrables vérifiables.',
    lead: 'Quand un patient cherche « implants dentaires » dans votre ville, votre clinique doit apparaître. Le SEO travaille les pages, les liens et la technique pour y arriver, durablement.',
    highlights: [['Une présence durable', 'L’effet s’accumule avec le temps.'], ['Un travail visible', 'Chaque action est documentée et vérifiable.'], ['Des soins ciblés', 'Une page claire pour chaque soin que vous voulez développer.']],
    whyTitle: 'Pourquoi un patient trouve une autre clinique avant vous.',
    why: [
      'Google classe les pages selon leur utilité pour la recherche du patient. La clinique visible en premier a souvent une page dédiée au soin, des liens qui y mènent et une bonne présence locale.',
      'Nous commençons par comprendre ces écarts, puis nous décidons quoi reprendre, quoi construire et quoi ajouter pour viser mieux. Aucun classement n’est garanti.',
    ],
    planTitle: 'Six dimensions, un plan, des livrables.',
    steps: [
      { title: 'Mots-clés', text: 'Partir de ce que le patient tape vraiment pour choisir les soins et les recherches à viser.', note: 'Recherches prioritaires.' },
      { title: 'Contenu', text: 'Répondre vraiment à la question du patient avec une page claire pour chaque soin.', note: 'Pages et textes à valider.' },
      { title: 'Liens internes', text: 'Créer des chemins entre vos pages pour que les visiteurs et Google les découvrent.', note: 'Maillage entre les pages.' },
      { title: 'Liens externes', text: 'Faire connaître votre expertise sur d’autres sites fiables.', note: 'Sources à contacter.' },
      { title: 'Technique', text: 'Permettre à Google de lire votre site : vitesse, structure, blocages à corriger.', note: 'Corrections techniques.' },
      { title: 'Mesure', text: 'Décider à partir de ce qui se passe vraiment : recherches, pages et contacts mesurés.', note: 'Tableau de bord et rapport.' },
    ],
    yourRole: ['Nous parler des soins à développer', 'Valider les contenus avant publication', 'Lire le rapport mensuel'],
    notYours: ['Analyser les concurrents', 'Corriger les aspects techniques', 'Rédiger les pages', 'Suivre les classements'],
    pricing: 'quote',
    faq: [
      ['Pouvez-vous garantir la première place ?', 'Non, et personne ne le peut : Google décide seul. Nous travaillons les facteurs que nous contrôlons et documentons chaque action.'],
      ['En combien de temps voit-on des résultats ?', 'Le SEO prend du temps et dépend de votre secteur, de la concurrence et de l’état de départ du site. Nous vous donnons une estimation honnête après analyse.'],
      ['Quelle différence avec Google Ads ?', 'Google Ads est payant et immédiat. Le SEO construit une présence qui dure sans payer par clic.'],
      ['Combien ça coûte ?', 'Sur devis, selon votre marché. Avec l’offre Premium, les 3 premiers mois de SEO sont offerts.'],
    ],
    cta: { title: 'Qui apparaît avant vous ?', text: 'Parlons des soins que vous voulez développer et de votre secteur. Nous définirons les recherches à examiner et le plan de travail.', button: 'Parlons de votre clinique', subject: 'SEO pour ma clinique dentaire' },
  },
  {
    slug: 'seo-ia',
    n: '04',
    name: 'SEO + IA',
    title: 'Être cité quand les patients interrogent l’IA.',
    metaTitle: 'SEO + IA pour clinique dentaire — Karwisoft',
    description: 'Comment Karwisoft aide votre clinique dentaire à être citée par les assistants d’intelligence artificielle quand les patients posent des questions sur leurs soins.',
    lead: 'De plus en plus de patients posent leurs questions à ChatGPT ou à Google IA. Si votre site contient les bonnes réponses, l’IA peut vous citer comme référence.',
    highlights: [['Un nouveau canal', 'Peu de cliniques y pensent encore.'], ['Une expertise visible', 'Des réponses claires qui renforcent la confiance.'], ['Complémentaire au SEO', 'Le même contenu de qualité sert les deux.']],
    whyTitle: 'Les patients ne cherchent plus seulement sur Google.',
    why: [
      'Beaucoup de gens posent désormais de vraies questions à une IA : « Un implant fait-il mal ? », « Quelle différence entre un pont et un implant ? » L’IA cherche des sources fiables pour répondre.',
      'Si votre site explique clairement ces sujets, il peut être cité : une nouvelle porte d’entrée pour des patients qui cherchent d’abord à comprendre.',
    ],
    planTitle: 'Ce que nous faisons pour que l’IA vous cite.',
    steps: [
      { title: 'Cartographie des questions', text: 'Nous identifions les questions que vos futurs patients posent aux IA sur les soins, les douleurs, les coûts et les comparaisons.', note: 'Liste des questions prioritaires.' },
      { title: 'Contenu adapté à l’IA', text: 'Nous rédigeons des réponses directes, structurées et précises sur votre site, dans le format que les IA privilégient.', note: 'Textes à valider avant publication.' },
      { title: 'Données structurées', text: 'Nous ajoutons des balises techniques invisibles (schema.org) qui aident à comprendre qui vous êtes et ce que vous faites.', note: 'Intégration technique, aucune action de votre part.' },
      { title: 'Mise à jour continue', text: 'Les IA évoluent vite. Nous surveillons les changements et ajoutons de nouvelles réponses.', note: 'Veille et mises à jour.' },
      { title: 'Rapport de visibilité IA', text: 'Nous testons régulièrement comment les IA répondent sur votre domaine et vous montrons où votre clinique est mentionnée.', note: 'Rapport mensuel.' },
    ],
    yourRole: ['Répondre à nos questions sur vos soins', 'Approuver les textes rédigés', 'Lire le rapport mensuel'],
    notYours: ['Comprendre le fonctionnement des IA', 'Écrire du contenu technique', 'Tester les réponses des IA', 'Gérer les données structurées'],
    pricing: 'quote',
    faq: [
      ['L’IA va-t-elle forcément me citer ?', 'Non. Les IA décident seules de ce qu’elles citent. Nous garantissons un contenu dans le format et la qualité qu’elles recherchent, pas le résultat.'],
      ['Quelle différence avec le SEO classique ?', 'Le SEO classique vise la liste de résultats de Google. Le SEO + IA vise les réponses générées par les IA. Les deux s’appuient sur votre site.'],
      ['Mes patients utilisent-ils vraiment l’IA ?', 'De plus en plus, surtout pour comprendre un soin avant de prendre rendez-vous.'],
      ['Puis-je choisir seulement le SEO + IA ?', 'Oui, les deux services sont indépendants. Un site bien optimisé pour Google l’est souvent aussi pour l’IA : nous vous conseillons honnêtement.'],
      ['Combien ça coûte ?', 'Sur devis. Avec l’offre Premium, les 3 premiers mois de GEO sont offerts.'],
    ],
    cta: { title: 'Vos concurrents sont-ils déjà cités ?', text: 'Un appel de 30 minutes pour voir où vous en êtes et ce que cela représente pour votre clinique.', button: 'En discuter avec nous', subject: 'SEO + IA pour ma clinique dentaire' },
  },
];

import type { Locale } from './i18n/config';
import { servicePagesEn } from './service-pages-en';

const byLocale: Record<Locale, ServicePage[]> = { fr: servicePagesFr, en: servicePagesEn };
export const getServicePages = (locale: Locale) => byLocale[locale];
export const servicePage = (slug: string, locale: Locale) => byLocale[locale].find(page => page.slug === slug);
