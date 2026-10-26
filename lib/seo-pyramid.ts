import type { SeoQuizQuestion } from './seo-quiz';

export type SeoSignalId = 'technique' | 'pertinence' | 'qualite' | 'autorite' | 'local' | 'reputation';
type SeoSignal = {
  id: SeoSignalId; name: string; icon: string; color: string;
  definition: string; title: string; why: string; how: string;
  observed: string; source: { href: string; label: string };
  correction: string; question: SeoQuizQuestion;
};
const implants = 'https://www.gatineaudentiste.ca/site/services-dentaires-esthetiques-gatineau/implants-dentaires';

/** A memory model, ordered from its foundation upwards, not Google's factor weights. */
export const seoSignals = [
  {
    id: 'technique', name: 'Technique', icon: 'technical', color: '#375b4b',
    definition: 'Google peut découvrir et lire les pages ; le patient peut les utiliser.',
    title: 'Ouvrir la porte à Google et aux patients',
    why: 'Pour rendre les pages accessibles et éviter un parcours lent ou défectueux.',
    how: 'Nous vérifions exploration, indexation, liens, redirections et chargement, puis contrôlons les corrections.',
    observed: 'Sa page s’affiche sur mobile et présente un accès au rendez-vous. Sa vitesse et son indexation restent à vérifier.',
    source: { href: implants, label: 'Consulter sa page publique' },
    correction: 'La base représente l’accès : Google doit pouvoir découvrir et lire les pages utiles.',
    question: { prompt: 'Une page indexée est-elle forcément première ?', options: ['Oui, automatiquement', 'Non : être enregistrée ne garantit pas son classement', 'Oui, si elle charge vite'], correct: 1, explanation: 'L’indexation permet de figurer dans les résultats. La technique soutient aussi les autres dimensions.' },
  },
  {
    id: 'pertinence', name: 'Pertinence', icon: 'search', color: '#38657d',
    definition: 'La page répond au besoin derrière la recherche du patient.',
    title: 'Répondre à la bonne recherche',
    why: 'Pour rejoindre les patients qui cherchent les soins que vous proposez.',
    how: 'Nous étudions mots-clés, intention du patient et résultats concurrents, puis choisissons la page adaptée.',
    observed: 'Sa page associe les implants dentaires et Gatineau : le soin et la ville recherchés.',
    source: { href: implants, label: 'Voir le soin et la localisation' },
    correction: 'Après l’accès vient la réponse au besoin : une page pertinente correspond à la recherche.',
    question: { prompt: 'Quels mots-clés choisir ?', options: ['Seulement les plus populaires', 'Tous ceux du concurrent', 'Ceux liés à vos soins et aux besoins des patients'], correct: 2, explanation: 'Une recherche utile correspond à vos soins et à une réponse adaptée. Le volume seul ne suffit pas.' },
  },
  {
    id: 'qualite', name: 'Qualité', icon: 'content', color: '#705b85',
    definition: 'Les informations sont utiles, fiables et vérifiables.',
    title: 'Donner une réponse fiable',
    why: 'Pour aider le patient avec des explications exactes et propres à votre pratique.',
    how: 'Nous rédigeons un contenu original, structurons les réponses, citons les sources et faisons valider les informations médicales.',
    observed: 'Sa page présente définition, avantages et procédure. Son processus interne de validation n’est pas connu.',
    source: { href: implants, label: 'Voir les rubriques de sa page' },
    correction: 'La réponse doit ensuite être fiable : contenu original, sources et validation clinique.',
    question: { prompt: 'Qui doit valider les informations médicales ?', options: ['Votre équipe clinique', 'Uniquement le rédacteur SEO', 'Personne si le texte est long'], correct: 0, explanation: 'Votre équipe vérifie l’exactitude des explications et leur correspondance avec votre pratique avant publication.' },
  },
  {
    id: 'autorite', name: 'Autorité', icon: 'links', color: '#a05538',
    definition: 'Des sites pertinents citent votre site, notamment avec des backlinks.',
    title: 'Obtenir des citations pertinentes',
    why: 'Pour faire découvrir votre expertise à travers d’autres sources.',
    how: 'Nous analysons les liens concurrents, préparons une ressource utile et la proposons à des publications pertinentes.',
    observed: 'Sa fiche hellodent contient un lien vers son site : un backlink d’annuaire.',
    source: { href: 'https://www.hellodent.com/site/dentist-office/clinique-dentaire-gatineau', label: 'Voir la source du backlink' },
    correction: 'L’autorité ajoute les citations externes : un backlink vient d’un autre site vers le vôtre.',
    question: { prompt: 'Qu’est-ce qu’un backlink ?', options: ['Un bouton de votre menu', 'Un lien d’un autre site vers le vôtre', 'Un avis sur Google'], correct: 1, explanation: 'Le contexte et la pertinence de la source comptent. Chaque éditeur décide librement de publier un lien.' },
  },
  {
    id: 'local', name: 'Contexte local', icon: 'local', color: '#2f7375',
    definition: 'La recherche dépend aussi du lieu et de la proximité du patient.',
    title: 'Situer la clinique dans son secteur',
    why: 'Pour présenter des informations locales exactes aux patients qui cherchent à proximité.',
    how: 'Nous vérifions fiche Google, catégories, services, adresse et horaires. Nous observons les résultats depuis des lieux définis.',
    observed: 'Sa page situe la clinique à Gatineau. Sa fiche Google reste à examiner séparément.',
    source: { href: implants, label: 'Voir la localisation sur sa page' },
    correction: 'Le contexte local ajoute le lieu : pertinence, distance et notoriété se combinent dans les résultats locaux.',
    question: { prompt: 'Peut-on effacer la distance avec le patient grâce à un texte ?', options: ['Oui, en répétant Gatineau', 'Oui, avec davantage de pages', 'Non : la position du patient compte aussi'], correct: 2, explanation: 'Des informations locales exactes aident Google. La distance dépend aussi du lieu depuis lequel le patient cherche.' },
  },
  {
    id: 'reputation', name: 'Réputation', icon: 'authority', color: '#8b692f',
    definition: 'La clinique est connue et reçoit des avis authentiques.',
    title: 'Construire une réputation authentique',
    why: 'Pour aider les patients à évaluer votre clinique et soutenir sa présence locale.',
    how: 'Nous préparons une demande d’avis honnête et suivons les avis et réponses. Les avis positifs ne sont ni achetés ni imposés.',
    observed: 'Des avis de patients sont visibles sur sa fiche hellodent. Une analyse complète de sa réputation reste à réaliser.',
    source: { href: 'https://www.hellodent.com/site/dentist-office/clinique-dentaire-gatineau', label: 'Voir les avis affichés sur sa fiche' },
    correction: 'Le sommet rappelle la réputation : avis authentiques et notoriété, avec un rôle particulier dans la recherche locale.',
    question: { prompt: 'Quelle démarche renforce une réputation authentique ?', options: ['Inviter honnêtement les patients à donner leur avis', 'Acheter des avis positifs', 'Ne solliciter que les avis cinq étoiles'], correct: 0, explanation: 'L’avis doit refléter une expérience réelle. La réputation complète les autres dimensions ; elle ne remplace pas leur travail.' },
  },
] as const satisfies readonly SeoSignal[];

/** Slots run from the top of the visible pyramid down to its foundation. */
export const seoPyramidLevels = [...seoSignals].reverse();
export const isSeoSignalId = (value: unknown): value is SeoSignalId => seoSignals.some(signal => signal.id === value);
export const isPyramidCorrect = (placements: readonly (SeoSignalId | null)[]) => placements.length === seoPyramidLevels.length && placements.every((id, index) => id === seoPyramidLevels[index].id);

type ReferenceEvidence = {
  fact: string;
  benefit: string;
  source: { href: string; label: string };
  check?: string;
  explanationSource?: { href: string; label: string };
};

export const seoReferenceSearch = {
  query: 'implants dentaires Gatineau',
  clinic: 'Clinique Dentaire Gatineau',
  href: implants,
};

/** Visible evidence and its practical value; these do not establish a ranking's cause. */
export const seoReferenceEvidence: Record<SeoSignalId, ReferenceEvidence> = {
  technique: {
    fact: 'Sa page d’implants s’affiche sur téléphone et donne accès au rendez-vous.',
    benefit: 'La rapidité facilite la lecture sur mobile. Une page indexée peut être proposée dans les résultats de Google.',
    source: { href: implants, label: 'Voir sa page sur mobile' },
    check: 'Vitesse et indexation à vérifier.',
  },
  pertinence: {
    fact: 'Elle a une page « implants dentaires » qui mentionne Gatineau.',
    benefit: 'Le soin et la ville correspondent précisément à ce que le patient cherche.',
    source: { href: implants, label: 'Voir le soin et la ville' },
  },
  qualite: {
    fact: 'Elle explique les implants, leurs avantages et la procédure.',
    benefit: 'Le patient trouve des réponses concrètes pour comprendre le soin avant de prendre contact.',
    source: { href: implants, label: 'Lire les explications' },
  },
  autorite: {
    fact: 'Un autre site, hellodent, fait un lien vers sa clinique.',
    benefit: 'Comme des citations, les liens de sites reconnus peuvent donner à Google des indices de confiance.',
    source: { href: 'https://www.hellodent.com/site/dentist-office/clinique-dentaire-gatineau', label: 'Voir le lien vers son site' },
    explanationSource: { href: 'https://www.google.com/intl/en_uk/search/howsearchworks/how-search-works/ranking-results/', label: 'Le rôle des liens selon Google' },
  },
  local: {
    fact: 'Sa page indique Gatineau, son adresse et ses horaires.',
    benefit: 'Ces informations situent la clinique pour une recherche locale. La proximité avec le patient compte aussi.',
    source: { href: implants, label: 'Voir ses coordonnées' },
  },
  reputation: {
    fact: 'Des avis de patients sont visibles sur sa fiche hellodent.',
    benefit: 'Ils donnent des repères au patient. Les avis Google jouent aussi un rôle dans le classement local.',
    source: { href: 'https://www.hellodent.com/site/dentist-office/clinique-dentaire-gatineau', label: 'Voir les avis publics' },
    explanationSource: { href: 'https://support.google.com/business/answer/7091?hl=fr', label: 'Le rôle des avis Google' },
  },
};
