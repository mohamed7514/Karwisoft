# Karwisoft — landing page et présentation

Une page pour présenter l’offre aux cliniques dentaires, avec deux modes qui partagent les mêmes contenus. Le site patient Épure reste dans `../site-patient`.

La page `/services/` présente les quatre expertises Karwisoft : SEO, SEO pour la recherche IA, Google Ads et création de sites web. Elle est reliée au menu de l’accueil, au mode présentation et au contact par courriel. Son contenu est dans `dist/services/index.html`, sa mise en page dans `dist/services.css` et son indicateur de section dans `dist/services.js`. Les liens et la FAQ fonctionnent sans JavaScript. L’organisation reprend les principes du catalogue de services de [seoplus+](https://seoplus.com/services/), avec une rédaction, des maquettes et une identité Karwisoft originales. La partie recherche IA s’appuie sur la [documentation Google](https://developers.google.com/search/docs/appearance/ai-features?hl=fr) ; aucune citation ou position n’est garantie.

## Utilisation

- `npm start` sert le site sur http://127.0.0.1:3100 sans dépendance à installer.
- L’adresse principale ouvre la landing : introduction animée, parcours interactif, trois formules Google Ads, bonus de lancement, FAQ et contact.
- Le lien **Présenter** ouvre `?mode=presentation#intro-1` : 19 diapositives, une seule visible à la fois, précédent/suivant, sommaire, plein écran si disponible et retour au site à la section courante. Les diapositives longues restent défilables.
- Les flèches gauche/droite, Page précédente/suivante et Début/Fin naviguent dans la présentation. Les champs, boutons et le comparateur gardent leur fonctionnement au clavier.
- Une ancre ouvre directement une étape, par exemple `?mode=presentation#demande` ou `?mode=presentation#offre`.
- En présentation, la transformation illustrative se rejoue à la demande. En ligne, les animations GSAP au défilement sont conservées.

Le bouton final ouvre le logiciel de courriel vers **Contact@Karwisoft.com**. Le choix de formule actualise le résumé et l’objet du courriel. Aucun formulaire n’est envoyé par le site et aucun service de messagerie n’est connecté. La FAQ précise les modèles, le budget publicitaire et le relais de la réception. Aucun prix, témoignage ou résultat chiffré n’est inventé.

## Fichiers

- `dist/index.html` : contenu commun, FAQ, contact et commandes de présentation.
- `dist/styles.css`, `dist/presentation.css`, `dist/journey.css` : identité et animations existantes.
- `dist/modes.css`, `dist/modes.js` : présentation sur tablette, sommaire, plein écran et mises en page adaptées.
- `dist/app.js` : démonstrations, choix de formule et navigation du parcours en ligne.
- `dist/presentation.js`, `dist/journey.js` : animations de la landing, désactivées en présentation pour éviter de bloquer la navigation par diapositives.
- `dist/assets/` et `dist/vendor/` : visuels WebP et GSAP local.

Sans JavaScript, la lecture en ligne et le lien de courriel restent disponibles. Le mode présentation nécessite JavaScript. La préférence de réduction des animations est respectée.

## Vérification

`npm run check` vérifie la syntaxe des scripts du site et du serveur d’aperçu.

Le contrôle ciblé des formules est disponible depuis le dossier parent : `node tools/budget-check.mjs`, avec le serveur lancé. Il vérifie les trois choix, les prestations communes, le récapitulatif et l’objet du courriel dans la landing et le mode présentation, sur cinq formats, ainsi que la cohérence de la page Services.

Depuis le dossier parent, avec le serveur lancé : `node tools/dual-check.mjs`. Ce contrôle utilise Chrome installé sur Windows, aux formats 1440×900, 1024×768, 768×1024, 390×844 et 320×568. Il vérifie les 19 diapositives, les ancres, le sommaire, le quiz, le comparateur, le clavier, les choix de formule, l’adresse de contact, les animations et les erreurs JavaScript. Captures dans `../preview/next/dual-*.png`.

## Démonstration et offre

Les personnes, cliniques et images sont fictives. Origine des images et prompts : `assets/PROMPTS.md`, `assets/journey-images.json`. Les visuels du sourire sont réutilisés depuis le projet patient. GSAP est servi localement avec ses mentions de licence.

La démonstration ne transmet aucune photo ni donnée, ne réserve aucun rendez-vous et n’envoie aucun SMS. L’aperçu de sourire est illustratif. Calendrier, notifications, fiche de réception et avis décrivent un fonctionnement à configurer pour chaque clinique ; aucune connexion au logiciel dentaire n’est active.

Trois formules de gestion exclusivement Google Ads sont présentées : Essentielle, Avancée et Premium. Toutes comprennent les mêmes prestations : objectifs et ciblage, mots-clés, campagnes et annonces, suivi des contacts, gestion et optimisation, rapport mensuel. Seule la tranche de budget publicitaire mensuel géré change. Les seuils des tranches et les honoraires sont à définir au devis ; aucun montant n’est inventé. Le budget publicitaire est payé à Google par la clinique et reste distinct des frais de gestion Karwisoft. La création du site est précisée séparément au devis. Le bonus à l’achat du site comprend la configuration et 30 jours de gestion à compter du lancement des campagnes ; les conditions suivantes sont définies au devis.
