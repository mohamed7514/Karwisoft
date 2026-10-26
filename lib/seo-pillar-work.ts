import type { SeoLearningPillarId } from './seo-learning';

/** Public-facing work descriptions; observed outputs do not establish a competitor's internal process. */
export const seoPillarWork = [
  {
    id: 'recherches', name: 'Stratégie SEO & mots-clés',
    work: 'Rechercher les mots-clés pertinents, comprendre l’intention du patient, analyser les pages concurrentes et décider quelles pages créer ou améliorer pour chaque soin et chaque secteur.',
    tasks: [
      { task: 'Rechercher les mots-clés pertinents', why: 'Pour cibler les recherches liées aux soins que votre clinique propose.', how: 'Nous comparons des expressions comme « implants dentaires Gatineau », leur demande estimée et leur pertinence pour vos soins.' },
      { task: 'Comprendre l’intention du patient', why: 'Pour apporter la réponse que le patient attend derrière sa recherche.', how: 'Nous examinons les résultats affichés : recherche-t-il un prix, une explication du soin ou une clinique à proximité ?' },
      { task: 'Analyser les pages concurrentes', why: 'Pour repérer les réponses déjà disponibles et les besoins moins bien couverts.', how: 'Nous ouvrons les pages visibles sur les recherches retenues et relevons leurs sujets, titres, questions traitées et liens utiles.' },
      { task: 'Choisir les pages à créer ou améliorer', why: 'Pour que chaque groupe de besoins trouve une réponse adaptée sur votre site.', how: 'Nous associons les recherches à une page cible et décidons de compléter une page existante ou d’en créer une.' },
    ],
    why: 'Concentrer le travail sur les recherches utiles pour votre clinique.',
    observed: 'Une page est dédiée aux implants et mentionne Gatineau : le soin et la ville recherchés sont traités ensemble.',
    tools: 'Ahrefs · Google Keyword Planner · Search Console',
    terms: 'L’intention de recherche est le besoin derrière les mots tapés : comprendre un soin, comparer des cliniques ou prendre contact. Les volumes estimés et la difficulté sont des indications à confronter aux résultats réellement visibles.',
  },
  {
    id: 'contenu', name: 'Contenu & SEO on-page',
    work: 'Rédiger un contenu original et fiable. Optimiser le title (titre pour Google), les H1/H2 (titres et sous-titres), la FAQ et les images. Identifier l’auteur et les sources ; faire valider les informations médicales.',
    tasks: [
      { task: 'Rédiger un contenu original et fiable', why: 'Pour donner des réponses utiles qui reflètent la pratique de votre clinique.', how: 'Nous recueillons les explications de votre équipe, rédigeons la page et vérifions les informations auprès des sources retenues.' },
      { task: 'Optimiser le title, proposé à Google', why: 'Pour annoncer clairement le sujet de la page dans les résultats de recherche.', how: 'Nous rédigeons un titre précis qui correspond au soin, au contenu et au secteur concerné. Google peut ensuite reformuler son affichage.' },
      { task: 'Définir le H1, titre principal visible', why: 'Pour que le lecteur identifie immédiatement le sujet de la page.', how: 'Nous plaçons en tête de page un titre principal clair, cohérent avec le soin et le besoin ciblé.' },
      { task: 'Organiser les sous-titres H2', why: 'Pour rendre les explications faciles à parcourir et à comprendre.', how: 'Nous répartissons les réponses en rubriques et donnons à chacune un sous-titre qui décrit son contenu.' },
      { task: 'Répondre aux questions fréquentes : la FAQ', why: 'Pour répondre aux interrogations qui peuvent précéder une prise de contact.', how: 'Nous recueillons les questions des patients et rédigeons des réponses précises, confirmées par votre équipe.' },
      { task: 'Préparer les images et leur description', why: 'Pour faciliter la compréhension et rendre les illustrations accessibles.', how: 'Nous préparons les visuels utiles et leurs textes alternatifs, qui décrivent ce qu’ils montrent et leur rôle dans la page.' },
      { task: 'Identifier l’auteur ou le relecteur', why: 'Pour permettre au lecteur de savoir qui porte les informations publiées.', how: 'Nous indiquons le professionnel ayant réellement rédigé ou revu la page, avec ses qualifications vérifiables.' },
      { task: 'Indiquer les sources utilisées', why: 'Pour que les informations importantes puissent être vérifiées.', how: 'Nous citons les références professionnelles effectivement consultées et consignons leur date de vérification.' },
      { task: 'Faire valider les informations médicales', why: 'Pour vérifier leur exactitude et leur adéquation avec votre pratique.', how: 'Nous soumettons les textes et questions fréquentes à votre équipe clinique et recueillons sa validation avant publication.' },
    ],
    why: 'Répondre aux questions du patient et rendre le sujet de la page clair.',
    observed: 'Sa page comporte une définition, des avantages et une présentation de la procédure, organisés en rubriques.',
    tools: 'Search Console · Ahrefs',
    terms: 'L’optimisation on-page concerne les éléments de la page elle-même. E-E-A-T désigne l’expérience, l’expertise, l’autorité et la fiabilité : des repères pour évaluer la qualité, pas un score SEO à acheter. La FAQ répond aux questions fréquentes.',
  },
  {
    id: 'maillage', name: 'Architecture & maillage interne',
    work: 'Organiser les pages par soin, ajouter des liens contextuels dans les textes et corriger les pages orphelines (sans lien interne entrant). Vérifier les destinations et les mots cliquables.',
    tasks: [
      { task: 'Organiser les pages par soin', why: 'Pour donner une structure logique aux informations de votre site.', how: 'Nous cartographions les pages et regroupons les soins et leurs explications dans une organisation cohérente.' },
      { task: 'Ajouter des liens contextuels', why: 'Pour aider le lecteur à poursuivre sa recherche et Google à découvrir les pages liées.', how: 'Nous ajoutons des liens dans les passages où une autre page apporte une explication complémentaire pertinente.' },
      { task: 'Corriger les pages orphelines', why: 'Pour éviter qu’une page utile reste sans chemin depuis le reste du site.', how: 'Nous repérons les pages sans lien interne entrant et les relions depuis des pages pertinentes.' },
      { task: 'Vérifier les destinations des liens', why: 'Pour éviter les erreurs et les arrivées sur une page sans rapport avec le lien.', how: 'Nous contrôlons les adresses liées, leur réponse et leur contenu, puis corrigeons les destinations défectueuses.' },
      { task: 'Choisir des mots cliquables compréhensibles', why: 'Pour annoncer ce que le lecteur trouvera après le clic.', how: 'Nous utilisons un texte cliquable naturel qui décrit la page de destination dans le contexte de la phrase.' },
    ],
    why: 'Aider les patients et Google à découvrir les pages et leurs relations.',
    observed: 'Son accueil et son menu comportent un lien vers la page des implants : cette page dispose de chemins d’accès.',
    tools: 'Screaming Frog · Ahrefs Site Audit',
    terms: 'Un lien contextuel apparaît dans une explication pertinente. Un lien interne reste sur le même site. L’organisation et les liens aident à comprendre les relations entre les pages ; leur utilité ne se résume pas à multiplier les liens.',
  },
  {
    id: 'backlinks', name: 'SEO off-page & backlinks',
    work: 'Analyser les sources de liens des concurrents, créer des ressources utiles et les proposer aux médias et partenaires pertinents : les relations presse numériques, ou Digital PR. Suivre les démarches et vérifier les backlinks obtenus.',
    tasks: [
      { task: 'Analyser les sources de liens concurrentes', why: 'Pour identifier les sources pertinentes et les occasions de citation à étudier.', how: 'Nous relevons les sites qui citent les concurrents et évaluons leur sujet, leur public et le contexte du lien.' },
      { task: 'Créer une ressource utile à citer', why: 'Pour donner à une publication une raison de présenter votre expertise.', how: 'Nous préparons avec votre équipe une ressource originale, adaptée aux questions du public et validée avant publication.' },
      { task: 'Proposer la ressource aux bonnes sources', why: 'Pour la faire découvrir à des publications dont les lecteurs pourraient en bénéficier.', how: 'Nous sélectionnons les sources pertinentes et adressons une proposition adaptée. Chaque éditeur décide librement de publier et de créer un lien.' },
      { task: 'Suivre les démarches éditoriales', why: 'Pour savoir ce qui a été entrepris et quelles réponses ont été obtenues.', how: 'Nous consignons les contacts, propositions, dates et réponses dans un registre, en distinguant les démarches des liens publiés.' },
      { task: 'Vérifier les backlinks obtenus', why: 'Pour confirmer les liens annoncés et contrôler leur destination.', how: 'Nous ouvrons chaque page source, vérifions le lien et ses attributs, puis enregistrons la destination et la date de contrôle.' },
    ],
    why: 'Faire découvrir votre expertise et développer les occasions de citations pertinentes.',
    observed: 'Sa fiche hellodent contient un lien vers son site. C’est un backlink d’annuaire à examiner dans son contexte.',
    tools: 'Ahrefs Site Explorer · Link Intersect',
    terms: 'Un backlink est un lien depuis un autre site vers le vôtre. L’analyse compare notamment les domaines sources, leur pertinence et les pages citées. Un lien d’annuaire ne prouve pas une campagne de relations presse. Les éditeurs décident librement de publier et de faire un lien.',
  },
  {
    id: 'technique', name: 'SEO technique & performance',
    work: 'Vérifier l’exploration, l’indexation, les canoniques (URL de référence), les redirections, le rendu JavaScript et les données structurées. Mesurer et améliorer les Core Web Vitals : chargement, réactivité et stabilité visuelle.',
    tasks: [
      { task: 'Vérifier l’exploration : Google peut-il visiter ?', why: 'Pour repérer les obstacles qui empêchent le moteur de visiter les pages utiles.', how: 'Nous contrôlons les consignes d’exploration, l’accès aux adresses et les liens permettant de les découvrir.' },
      { task: 'Vérifier l’indexation : la page est-elle enregistrée ?', why: 'Pour savoir si une page peut être proposée dans les résultats de recherche.', how: 'Nous examinons son état dans Search Console, les consignes noindex et les motifs d’exclusion, puis traitons les problèmes identifiés.' },
      { task: 'Choisir les canoniques : la version de référence', why: 'Pour indiquer la version souhaitée lorsque plusieurs adresses présentent un contenu similaire.', how: 'Nous identifions les versions en double et alignons les indications canoniques, les liens et le sitemap sur la version retenue.' },
      { task: 'Contrôler les redirections', why: 'Pour conduire les visiteurs et les moteurs vers la bonne adresse après un changement.', how: 'Nous vérifions les anciennes adresses, leur destination et les chaînes de redirections, puis corrigeons les parcours inutiles ou défectueux.' },
      { task: 'Vérifier le rendu JavaScript', why: 'Pour contrôler que les contenus utiles restent lisibles après l’exécution des scripts.', how: 'Nous examinons la page rendue dans les outils d’inspection et vérifions la présence des textes et des liens importants.' },
      { task: 'Contrôler les données structurées', why: 'Pour décrire clairement le contenu aux moteurs avec des informations cohérentes.', how: 'Nous vérifions les balises pertinentes, leur validité et leur correspondance avec les informations réellement affichées sur la page.' },
      { task: 'Améliorer le chargement : LCP', why: 'Pour réduire l’attente avant l’affichage du plus grand élément visible.', how: 'Nous mesurons le chargement, identifions ses causes de lenteur, optimisons les ressources concernées et mesurons à nouveau.' },
      { task: 'Améliorer la réactivité : INP', why: 'Pour que les interactions du patient obtiennent une réponse rapide.', how: 'Nous mesurons la réaction aux interactions, repérons les scripts bloquants et vérifions les améliorations après correction.' },
      { task: 'Limiter les déplacements visuels : CLS', why: 'Pour éviter que le contenu ou les boutons bougent pendant la lecture.', how: 'Nous repérons les éléments qui déplacent la mise en page et réservons leur espace avant le chargement.' },
    ],
    why: 'Permettre la lecture des bonnes pages et faciliter l’utilisation du site.',
    observed: 'Sa page publique est consultable. L’exploration, l’indexation et les performances restent à auditer avant de conclure.',
    tools: 'Screaming Frog · PageSpeed Insights · Search Console',
    terms: 'Explorer : visiter les pages. Indexer : les enregistrer dans le répertoire du moteur. Une canonique indique la version de référence ; une redirection conduit vers une autre adresse. Le rendu JavaScript concerne le contenu produit par les scripts. Les données structurées décrivent le contenu aux moteurs. Les tests simulés et les mesures d’usage réel sont distingués.',
  },
  {
    id: 'mesure', name: 'Mesure, reporting & optimisation',
    work: 'Suivre impressions, positions, clics et demandes mesurées. Comparer au point de départ pour prioriser les améliorations. Relier rendez-vous confirmés et revenus au SEO lorsque les données le permettent.',
    tasks: [
      { task: 'Suivre les impressions : les apparitions dans Google', why: 'Pour savoir sur quelles recherches et à quelle fréquence vos pages apparaissent.', how: 'Nous suivons les impressions par recherche et par page dans Search Console, sur des périodes définies.' },
      { task: 'Suivre les positions', why: 'Pour observer l’évolution de votre visibilité sur les recherches ciblées.', how: 'Nous comparons les positions moyennes avec les mêmes filtres et précisons que les résultats varient selon le contexte de recherche.' },
      { task: 'Suivre les clics', why: 'Pour distinguer les apparitions dans Google des clics vers votre site.', how: 'Nous relevons les clics par recherche et par page, puis les rapprochons des impressions sur la même période.' },
      { task: 'Mesurer les demandes de contact', why: 'Pour savoir si le parcours mène à des demandes effectivement mesurées.', how: 'Nous définissons les événements utiles, testons leur déclenchement et suivons les demandes sans transmettre les informations personnelles ou médicales.' },
      { task: 'Comparer au point de départ', why: 'Pour évaluer les évolutions par rapport à une situation initiale documentée.', how: 'Nous comparons les mêmes pages et recherches sur des périodes précisées, en tenant compte des changements et de la saisonnalité.' },
      { task: 'Prioriser les prochaines améliorations', why: 'Pour consacrer le prochain sprint aux problèmes et occasions les mieux étayés.', how: 'Nous examinons les écarts observés, leur utilité attendue, l’effort et les dépendances, puis justifions l’ordre des actions.' },
      { task: 'Distinguer les rendez-vous confirmés', why: 'Pour ne pas confondre une demande de contact avec un rendez-vous obtenu.', how: 'Avec votre équipe et les données disponibles, nous rapprochons les demandes mesurées des rendez-vous confirmés selon une méthode convenue.' },
      { task: 'Rapprocher les revenus lorsque c’est possible', why: 'Pour apprécier la contribution commerciale du SEO avec des données exploitables.', how: 'Lorsque le rapprochement est fiable et convenu, nous relions les rendez-vous attribuables au SEO aux revenus enregistrés et expliquons les limites.' },
    ],
    why: 'Choisir le prochain travail selon les résultats observés pour votre clinique.',
    observed: 'Un bouton de rendez-vous est visible sur sa page. Ses clics, contacts et rendez-vous réels ne sont pas publics.',
    tools: 'Search Console · GA4 · GTM · Looker Studio',
    terms: 'Une impression est une apparition dans les résultats. Un clic sur le site, un clic sur le téléphone, un appel mesuré et un rendez-vous confirmé sont des événements différents. La mesure doit être vérifiée et ses limites expliquées ; aucune donnée personnelle ou médicale n’est envoyée aux outils de mesure.',
  },
] as const satisfies readonly {
  id: SeoLearningPillarId;
  name: string;
  work: string;
  tasks: readonly { task: string; why: string; how: string }[];
  why: string;
  observed: string;
  tools: string;
  terms: string;
}[];
