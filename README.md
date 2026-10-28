# Karwisoft — landing page et présentation

Site Karwisoft en **Next.js 16.4.3, React 19 et TypeScript**, avec App Router et export statique. La landing page et les 19 diapositives partagent les mêmes composants et contenus. Le site patient Épure reste dans `../site-patient`.

La page `/services/` présente les quatre expertises Karwisoft : SEO, SEO pour la recherche IA, Google Ads et création de sites web. Son contenu est dans `app/services/page.tsx`, son style dans `app/styles/services.css` et son indicateur de section dans `components/ServicesObserver.tsx`. Les liens et la FAQ fonctionnent sans JavaScript. L’organisation reprend les principes du catalogue de services de [seoplus+](https://seoplus.com/services/), avec une rédaction, des maquettes et une identité Karwisoft originales. La partie recherche IA s’appuie sur la [documentation Google](https://developers.google.com/search/docs/appearance/ai-features?hl=fr) ; aucune citation ou position n’est garantie.

## Utilisation

La page `/services/seo/` suit un parcours pédagogique : question locale illustrative, définition du SEO, six composants expliqués avec schémas animés, comparaison des pratiques, amélioration d’une page, cinq temps de travail et preuves de livraison. `SeoPillarExplorer` explique pour chaque composant la définition, le pourquoi, le comment, le livrable et sa valeur ; son contenu est dans `lib/seo-learning.ts`. `SeoReadingJourney` affiche une progression de **lecture**, jusqu’à 100 % à la section des livrables. `SeoMethodCycle` et `SeoComparison` utilisent `lib/seo-methodology.ts`. Les styles sont isolés dans `seo-methodology.css` et `seo-learning.css`. Les onglets se parcourent au clavier ; les animations respectent la réduction des mouvements et peuvent être rejouées. Les explications restent accessibles sans JavaScript grâce au contenu HTML et aux alternatives `noscript`. Le cadrage et les sources sont dans `docs/seo-parcours-pedagogique.md`.

Les six piliers suivent le cadre du client : stratégie et mots-clés, contenu et optimisation des pages, architecture et maillage interne, réputation et backlinks, technique et performance, mesure et optimisation. Le SEO local complète ce cadre pour les cliniques. Chaque démonstration part de la référence : on observe, on comprend son rôle, puis on nomme le pilier. La page d’implants de la Clinique Dentaire Gatineau, son accueil et une fiche d’annuaire sont liés comme sources ; sa première place, les performances techniques et les résultats privés ne sont pas supposés connus. `lib/seo-lessons.ts` contient la narration et les sources ; `SeoLessonScene` anime les mêmes objets au fil des scènes, et `seo-lesson.css` isole leur style. Le lecteur peut mettre en pause, rejouer ou avancer manuellement. La lecture automatique s’arrête au dernier temps du pilier, attend que l’image et son commentaire soient visibles et respecte la réduction des mouvements. Le travail pour votre clinique reste dans un élément `details`. La comparaison associe contrôle, action et preuve. Les sprints gardent leurs vues courtes, avec prérequis et critères de livraison à la demande ; les contrôles ne déplacent pas la page. Le catalogue d’interventions répété a été retiré.

`SeoCompetitiveLab` applique ensuite les notions à deux maquettes photographiques : observer une référence, construire la version de la clinique et ajouter une ressource originale à faire connaître. Cet exemple manuel remplace les immeubles et les cartes de décisions. Le comparatif détaillé reste dans un `details` ; le cas conduit directement aux sprints. Les photos sont des illustrations réutilisées depuis `public/assets`, et les styles sont dans `seo-case.css`.

L’explication principale des piliers utilise `SeoPillarsWork` et `lib/seo-pillar-work.ts` : 40 tâches dans les six piliers, chacune avec « Pourquoi ? » et « Comment ? » directement visibles. Les éléments observés chez la clinique, leurs sources et les outils possibles restent distincts de la méthode proposée. Les termes et livrables sont détaillés en HTML natif. Les schémas animés restent un complément facultatif dans un panneau initialement fermé. `seo-work.css` contient les styles de cette lecture.

- Node.js 20.9 minimum. Installer les dépendances avec `npm ci`.
- `npm run dev` lance Next.js sur http://127.0.0.1:3100 pour le développement.
- `npm run build` préconstruit les pages et génère `out/`.
- `npm start` sert cet export sur http://127.0.0.1:3100. Exécuter le build au préalable.
- L’adresse principale ouvre la landing : introduction animée, parcours interactif, trois formules Google Ads, bonus de lancement, FAQ et contact.
- Le lien **Présenter** ouvre `?mode=presentation#intro-1` : 19 diapositives, une seule visible à la fois, précédent/suivant, sommaire, plein écran si disponible et retour au site à la section courante. Les diapositives longues restent défilables.
- Les flèches gauche/droite, Page précédente/suivante et Début/Fin naviguent dans la présentation. Les champs, boutons et le comparateur gardent leur fonctionnement au clavier.
- Une ancre ouvre directement une étape, par exemple `?mode=presentation#demande` ou `?mode=presentation#offre`.
- En présentation, la transformation illustrative se rejoue à la demande. En ligne, l’introduction reste animée et épinglée à partir de 1101 × 700 pixels ; en dessous, ses trois scènes se lisent dans le flux pour rester accessibles en paysage et au zoom.
- L’accueil et les services partagent une barre crème opaque, visible au défilement : Services, Le parcours, L’offre, un accès secondaire au mode présentation et le bouton « Parlons de votre projet ». Le menu se replie à 1000 pixels et conserve tous ces accès.
- Sur petit écran, les sections empilent leurs colonnes, les textes restent lisibles et les diapositives longues peuvent défiler verticalement.

Le bouton final ouvre le logiciel de courriel vers **Support@karwisoft.com**. Le choix de formule actualise le résumé et l’objet du courriel. Aucun formulaire n’est envoyé par le site et aucun service de messagerie n’est connecté. La FAQ précise les modèles, le budget publicitaire et le relais de la réception. Aucun prix, témoignage ou résultat chiffré n’est inventé.

## Fichiers

- `app/layout.tsx`, `app/page.tsx`, `app/services/page.tsx` : layout partagé, métadonnées et routes Next.js.
- `components/StoryIntro.tsx`, `PatientJourney.tsx`, `Offer.tsx`, `Closing.tsx` : contenus éditoriaux rendus au build.
- `components/Experience.tsx`, `PresentationControls.tsx` : état React, navigation des 19 diapositives, sommaire, plein écran, clavier et sélection de formule.
- `components/Demos.tsx` : quiz, comparateur de sourire, choix du parcours et explications interactives en React.
- `components/LandingAnimations.tsx`, `lib/landing-animations.mjs` : GSAP chargé à la demande, avec nettoyage des animations et écouteurs à la sortie de la page.
- `app/styles/` : CSS du design existant ; `public/assets/` : visuels WebP.
- `app/styles/responsive.css`, `navigation.css` : tailles fluides, contenu dans le flux, commandes tactiles et menu mobile ; `components/SiteNavigation.tsx` : ouverture/fermeture, Échap et redimensionnement du menu.
- `lib/presentation.ts` : identifiants, titres des diapositives et formules partagés.
- `dist/` : ancienne version HTML conservée comme référence. Modifier désormais `app/`, `components/`, `lib/` et `public/`.

L’export statique est déclaré dans `next.config.ts` et `.openai/hosting.json` pointe vers `out/`. Les contenus sont accessibles dans le HTML préconstruit ; React hydrate les interactions. Aucun serveur Next.js n’est nécessaire pour l’hébergement actuel. GSAP provient du paquet npm, sans injection des anciens scripts HTML.

Sans JavaScript, la lecture en ligne et le lien de courriel restent disponibles. Le mode présentation nécessite JavaScript. La préférence de réduction des animations est respectée.

## Vérification

`npm run check` vérifie TypeScript et la syntaxe du serveur d’aperçu. `npm run build` vérifie également la compilation et la génération des pages.

Après le build, avec `npm start` lancé, `npm run test:browser` exécute les contrôles Chrome de `scripts/browser/` : landing, 19 diapositives, clavier, sommaire, quiz, comparateur, animations, services, FAQ, trois formules et objets de courriel.

Ces contrôles utilisent Chrome installé sur Windows, aux formats 1440×900, 1024×768, 768×1024, 390×844 et 320×568. `CHROME_PATH` permet de choisir un autre exécutable ; `KARWISOFT_TEST_URL` permet de cibler un autre serveur. Captures dans `../preview/next/`.

`scripts/browser/responsive.mjs` complète les contrôles avec 15 formats de 320 à 1920 pixels, les paysages 844×390 et 667×375, une fenêtre équivalente au zoom à 200 %, et le redimensionnement sans rechargement. Il vérifie les limites réelles des titres et widgets, les chevauchements et l’accès à la fin des diapositives au-dessus des commandes. Captures dans `../preview/responsive/`.

`scripts/browser/navigation.mjs` vérifie la barre partagée sur neuf formats, sa lisibilité sur fond opaque, les cibles tactiles, le bouton de contact et sa position après défilement sur les deux pages.

## Démonstration et offre

Les personnes, cliniques et images sont fictives. Origine des images et prompts : `assets/PROMPTS.md`, `assets/journey-images.json`. Les visuels du sourire sont réutilisés depuis le projet patient. GSAP est servi localement avec ses mentions de licence.

La démonstration ne transmet aucune photo ni donnée, ne réserve aucun rendez-vous et n’envoie aucun SMS. L’aperçu de sourire est illustratif. Calendrier, notifications, fiche de réception et avis décrivent un fonctionnement à configurer pour chaque clinique ; aucune connexion au logiciel dentaire n’est active.

Trois formules de gestion exclusivement Google Ads sont présentées : Essentielle, Avancée et Premium. Toutes comprennent les mêmes prestations : objectifs et ciblage, mots-clés, campagnes et annonces, suivi des contacts, gestion et optimisation, rapport mensuel. Seule la tranche de budget publicitaire mensuel géré change. Les seuils des tranches et les honoraires sont à définir au devis ; aucun montant n’est inventé. Le budget publicitaire est payé à Google par la clinique et reste distinct des frais de gestion Karwisoft. La création du site est précisée séparément au devis. Le bonus à l’achat du site comprend la configuration et 30 jours de gestion à compter du lancement des campagnes ; les conditions suivantes sont définies au devis.
