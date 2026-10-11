# Karwisoft Marketing — gabarit de l’offre

Landing page destinée aux cabinets dentaires. Projet séparé de `../site-patient`.

## Lancer

`npm start` puis http://127.0.0.1:3100. Aucun paquet à installer.

`npm run check` vérifie la syntaxe JavaScript.

## Parcours

1. Hook visuel en trois scènes plein écran : une patiente cherche sur son téléphone → le site de la clinique apparaît → la relation avec l’équipe. « Il cherche un dentiste. Il vous découvre. Pourquoi vous ? » devient trois légendes, une par image. GSAP et ScrollTrigger pilotent la séquence au scroll, avec navigation entre les scènes.
2. Approche : partir de ce que le patient cherche et de ce qu’il ressent.
3. Cinq étapes : visibilité Google Ads, message qui répond à l’émotion, confiance sur le site, parcours guidé, suivi des contacts. Un exemple implants relie recherche, annonce et page. Chaque étape explique le bénéfice pour la clinique.
4. Deux modèles : par lead (appel de 60 secondes minimum ou formulaire), ou gestion mensuelle.
5. Bonus : configuration + 30 jours de gestion Google Ads offerts à l’achat du site, budget média payé par le cabinet.
6. Résumé du modèle choisi et espace réservé à la prise de contact.

## Périmètre de cette version

Présentation responsive avec quatre photographies générées par IA, séquence GSAP en trois actes, transitions au scroll, maquettes HTML/CSS, simulation courte du parcours et sélection de formule. Aucun prix ni résultat chiffré inventé. Aucune collecte de données, aucun appel, aucune demande envoyée et aucune intégration au logiciel dentaire. Le module de prise de contact est explicitement réservé.

Sans JavaScript ou avec la préférence « réduire les animations », les trois scènes restent visibles dans l’ordre, sans immobilisation du scroll. Les boutons du hero fonctionnent au clavier et les scènes masquées sont inertes. Les images sont illustratives : personnes et clinique fictives. Originaux, méthode et prompts : `assets/PROMPTS.md`. Versions WebP de production, 800/1536 pixels : `dist/assets/`. GSAP 3.15.0 est servi localement depuis `dist/vendor/`, avec ses mentions de licence.

La rédaction ne promet aucune position Google et ne présente aucun pourcentage non vérifié d’acquisition. La visibilité publicitaire précède le choix du message et l’expérience du site. Les émotions et l’annonce sont des exemples illustratifs, sans promesse de résultat médical ni de conversion.

Fichiers à modifier : `dist/index.html` (contenu), `dist/styles.css` (base), `dist/presentation.css` (photos et séquence visuelle), `dist/app.js` (interactions), `dist/presentation.js` (GSAP).
