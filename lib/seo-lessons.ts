import type { SeoLearningPillarId } from './seo-learning';

type SeoLesson = {
  id: SeoLearningPillarId;
  label: string;
  term: string;
  source: { label: string; href: string; status: string };
  scenes: readonly { title: string; explanation: string }[];
};

const implantPage = 'https://www.gatineaudentiste.ca/site/services-dentaires-esthetiques-gatineau/implants-dentaires';

export const seoLessons = [
  {
    id: 'recherches', label: 'Stratégie et mots-clés', term: 'La stratégie et les mots-clés',
    source: { label: 'Voir sa page sur les implants', href: implantPage, status: 'Page publique étudiée' },
    scenes: [
      { title: 'Elle a une page pour ce soin.', explanation: 'Pour « implants dentaires Gatineau », regardons sa page : elle traite les implants et situe la clinique à Gatineau.' },
      { title: 'La page répond au besoin.', explanation: 'Le patient cherche ce soin dans cette ville. Une page dédiée permet de répondre à ce besoin précis.' },
      { title: 'C’est la stratégie de mots-clés.', explanation: 'Un mot-clé est une recherche de patient. Le travail consiste à choisir les recherches utiles et la page qui répond à chacune.' },
    ],
  },
  {
    id: 'contenu', label: 'Contenu et optimisation des pages', term: 'Le contenu et l’optimisation des pages',
    source: { label: 'Voir les explications de sa page', href: implantPage, status: 'Contenu public étudié' },
    scenes: [
      { title: 'Elle explique le soin.', explanation: 'Sa page présente une définition des implants, leurs avantages et la procédure. Le patient trouve plusieurs explications sur le même sujet.' },
      { title: 'Le sujet devient plus clair.', explanation: 'Les textes et les titres organisent la réponse. Ils aident le patient à comprendre et Google à identifier ce que la page traite.' },
      { title: 'C’est le contenu optimisé.', explanation: 'Ce pilier travaille les explications, les titres et les visuels. Pour votre clinique, les informations médicales seront validées par votre équipe.' },
    ],
  },
  {
    id: 'maillage', label: 'Architecture et liens internes', term: 'L’architecture et le maillage interne',
    source: { label: 'Voir le lien depuis son accueil', href: 'https://www.gatineaudentiste.ca/site/accueil', status: 'Lien interne public étudié' },
    scenes: [
      { title: 'Son accueil mène aux implants.', explanation: 'Sur son accueil, un lien conduit à la page des implants. Cette page est aussi présente dans le menu du site.' },
      { title: 'Un chemin aide à la trouver.', explanation: 'Le visiteur peut rejoindre le soin depuis une autre page. Google utilise aussi les liens pour découvrir les pages et leurs relations.' },
      { title: 'C’est le maillage interne.', explanation: 'Un lien interne relie deux pages du même site. Ce pilier organise les pages et les chemins utiles entre elles.' },
    ],
  },
  {
    id: 'backlinks', label: 'Réputation et backlinks', term: 'La réputation et les backlinks',
    source: { label: 'Voir le lien sur hellodent', href: 'https://www.hellodent.com/site/dentist-office/clinique-dentaire-gatineau', status: 'Un lien externe public étudié' },
    scenes: [
      { title: 'Un autre site renvoie vers elle.', explanation: 'L’annuaire hellodent présente la clinique et contient un lien vers son site. C’est un exemple concret de lien venant d’ailleurs.' },
      { title: 'Un lien peut amener un lecteur.', explanation: 'Le lecteur peut passer de cet annuaire à la clinique. L’effet SEO de ce lien ne se déduit pas de sa seule présence.' },
      { title: 'C’est un backlink.', explanation: 'Ce pilier étudie les sources de liens, leur contexte et les occasions pertinentes. Un seul lien ne suffit pas à expliquer un classement.' },
    ],
  },
  {
    id: 'technique', label: 'Technique et performance', term: 'Le SEO technique et la performance',
    source: { label: 'Ouvrir la page à contrôler', href: implantPage, status: 'Audit technique à compléter' },
    scenes: [
      { title: 'Sa page est accessible à lire.', explanation: 'Nous pouvons consulter sa page publique. Cela ne suffit pas à connaître sa vitesse ou ce que Google peut explorer et indexer.' },
      { title: 'Il faut contrôler les coulisses.', explanation: 'Pour apparaître, une page doit pouvoir être lue par Google. On contrôle cet accès, son indexation et son fonctionnement sur mobile.' },
      { title: 'C’est le SEO technique.', explanation: 'Ce pilier vérifie les obstacles à la lecture et à l’usage du site. Nous ne présentons aucun score technique sans l’avoir mesuré.' },
    ],
  },
  {
    id: 'mesure', label: 'Mesure et optimisation', term: 'La mesure, le reporting et l’optimisation',
    source: { label: 'Voir son parcours de contact', href: implantPage, status: 'Résultats privés, non observés' },
    scenes: [
      { title: 'Elle propose un rendez-vous.', explanation: 'Un bouton de rendez-vous est visible sur sa page. Ses clics et rendez-vous réels restent des données privées.' },
      { title: 'Visible ne veut pas dire rentable.', explanation: 'La position seule ne dit pas combien de patients prennent contact. Pour votre clinique, nous suivrons visibilité, visites et contacts séparément.' },
      { title: 'C’est la mesure et l’optimisation.', explanation: 'Le bilan sert à choisir la suite du travail. Il distingue les actions livrées, les visites, les contacts et les rendez-vous confirmés.' },
    ],
  },
] as const satisfies readonly SeoLesson[];
