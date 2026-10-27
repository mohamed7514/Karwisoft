# Hero doré — sources et composition

Les cinq PNG paysage ont été fournis par le client le 26 octobre 2026. Ils restent archivés sans retouche : `hero-passe.png`, `hero-futur.png`, `hero-vision-ia.png`, `hero-vision-sourire.png`, `hero-vision-evolution.png`. Ce sont des illustrations imaginaires, pas des captures de résultats ni des témoignages de cliniques.

`hero-passe-mobile.png` est une recomposition verticale créée avec l’outil intégré image_gen, à partir du tableau paysage fourni. Aucun appel API avec une clé. Original natif : 941 × 1672. Export : 1440 × 2560, rééchantillonnage Lanczos3. L’export desktop 2560 × 1440 est rééchantillonné depuis le PNG fourni (1672 × 941). Le rééchantillonnage ne crée pas de détail natif supplémentaire.

Tous les WebP dans `public/assets/` sont des images fixes, qualité 85. Dimensions et tailles exactes dans `manifest.json`.

## Correction demandée : le regard

La sphère doit être devant les observateurs de droite, à hauteur de leur regard. La première proposition mobile plaçait les personnages au-dessus de la sphère : elle est conservée uniquement en archive (`hero-passe-mobile-rejected.png`) et n’est pas utilisée sur le site. La nouvelle composition les place face au portail.

Le cadrage mobile conserve toute la largeur du tableau. Les coordonnées de l’ouverture unique suivent le cercle peint : centre mobile x51,33 %, y35,23 % de l’image ; centre desktop x51,6 %, y44,95 %. Elles sont recalculées quand la surface change. Le tableau ne reçoit aucune animation ou transformation.

## Animation

Depuis la correction du 27 octobre 2026, l’intérieur utilise une seule scène continue autour d’une table, `hero-table-panorama.png`. Les personnages sont vus par-dessus leurs épaules : les écrans leur font face, avec les claviers entre les personnages et les écrans. La caméra découvre successivement la recherche de cliniques, la conversation sur les implants, le sourire et l’évolution dentaire. Aucun changement de photo ni fondu entre plusieurs scènes.

Le travelling dure 42 secondes dans un sens, puis revient doucement dans l’autre sens (84 secondes pour un aller-retour), avec accélération et décélération progressives aux extrémités. Il utilise Web Animations et une transformation uniquement dans la bulle, sans boucle de rendu JavaScript. La pause fige la position ; la reprise la continue. Arrêt hors écran et onglet masqué ; vue centrale fixe avec la préférence de mouvement réduit ou sans JavaScript. Une seule ouverture, avec un cadre doré aligné sur le cercle peint et des reflets légers donnant du volume. Le cadrage à hauteur des regards, le fond fixe et le mode présentation sont conservés.

Le panorama a été généré avec l’outil intégré image_gen, sans appel API ni clé. Original PNG natif : 2172 × 724, 2 860 081 octets. WebP qualité 85 : mêmes dimensions natives, 406 086 octets, sans agrandissement. Les cinq images fournies restent archivées, mais les quatre anciennes scènes indépendantes ne sont plus utilisées par le hero.

Le [prompt final du panorama](prompt-panorama.md) précise la perspective depuis l’arrière des personnages et les contraintes d’orientation des écrans.

## Vérification du panorama continu

Compilation de production et TypeScript réussis dans une copie isolée sans fichiers d’environnement. Vérification Chrome à 1440 × 900, 390 × 844, 320 × 568 et 1024 × 1366 : une seule image dans la bulle, travelling continu, pause et reprise, fond pixel pour pixel fixe, position à hauteur des regards, préférence de mouvement réduit et arrêt hors écran. Version anglaise vérifiée. Aucune erreur JavaScript. Captures `table-camera-*.png` et rapport `table-camera-results.json` dans `C:/Dev/dentist/preview/hero-bulle/`. Les vues de chaque zone du panorama ont été inspectées pour vérifier l’orientation des écrans. Aucun déploiement public.

## Vérification locale de la version précédente (fondus)

- Compilation de production et TypeScript réussis dans une copie isolée sans fichier d’environnement.
- Chrome : version courante vérifiée à 1440 × 900, 390 × 844, 320 × 568 et 1024 × 1366. Contrôle du cadrage, du titre, du fond fixe et de la position de l’ouverture à hauteur des observateurs.
- Une seule ouverture, aucun canvas, aucun contour ou reflet ajouté. Les quatre photos sont chargées ; les passages Google → ChatGPT → sourire → évolution ont tous été observés et capturés.
- Pause au milieu du fondu : opacité figée puis reprise sans saut. Préférence de mouvement réduit : animation arrêtée. Les pixels du fond restent identiques pendant la séquence complète. Aucune erreur JavaScript.
- Ajustements limités au hero : navigation compacte à 320 px, bouton Pause dégagé du lanceur de chat et message de bienvenue placé au-dessus du titre pendant que le hero est visible.
- Captures et rapport actuels dans `C:/Dev/dentist/preview/hero-bulle/` (`single-circle-*.png`, `single-circle-results.json`, 20 contrôles réussis). Les rapports `epic-*` concernent la version précédente. Aucun déploiement public réalisé.

## Prompt final utilisé pour la version mobile

Edit target: the supplied golden historical dentist painting. Create a VERTICAL 9:16 mobile hero composition in the same warm amber Baroque oil painting style. CRITICAL CORRECTION: the golden portal must be DIRECTLY IN FRONT OF the villagers on the RIGHT, AT THEIR EYE LEVEL, NEVER BELOW THEIR FACES. Visually they are discovering and looking HORIZONTALLY LEFT straight into the portal, not looking down. Spatial layout: empty perfectly circular dark amber portal, thin brilliant golden rim, center x42%, y39% of image, diameter about 64% of image WIDTH. Two fictional amazed Renaissance villagers at RIGHT EDGE, with their EYES at the SAME HEIGHT y35%-43% as portal CENTER. Their bodies extend down the right edge. Their noses and gaze point left directly at the middle of the circle. Keep a recognizable historical dentist examining a calm seated patient at LEFT EDGE, dentist head upper left y22%, patient head left y43%, no blood, pain, gore. The portal occupies the gap BETWEEN the left dentist scene and the right observers, just like the landscape reference. No faces or hands inside the portal. Architectural vault and dramatic shafts of golden light above. Bottom 30% is richly textured deep dark brown vignette for headline. Museum quality, very detailed. NO words, text, logo or watermark. The right-hand people's gaze MUST MEET THE CIRCLE CENTER horizontally, circle must NOT be underneath the group. Deliver just one 1440x2560 vertical painting.

## Première proposition archivée, écartée à la demande du client

Use case: precise scene recomposition for a mobile website background. Edit target: supplied warm golden Baroque dentist painting. Recompose this exact artistic universe into a VERTICAL 9:16 painting, 1440x2560 minimum if possible. Keep the same rich amber and burnt sienna, museum oil painting realism, expressive fictional Renaissance villagers, dramatic golden shafts of sunlight and cloudscape. A clearly identifiable old village dentist gently examining a calm reclining patient's open mouth belongs at upper LEFT edge, visible faces and period clothing, no blood, no pain, no gruesome instruments. Two or three amazed villagers on upper RIGHT edge looking inward. Crucial web composition: leave a fully EMPTY dark amber circular opening centered at exactly x50%,y40%, diameter 78% of canvas WIDTH. Its thin bright GOLDEN circular rim is a PERFECT CIRCLE, not an oval. Do not put any person, hand, object, face or text in this empty circle. Golden backlight radiates around its outside. Entire lower 28% of vertical canvas fades to richly textured dark brown shadow with no important details, for website headline overlay. Keep the dentist scene ABOVE or beside the circle, never inside it. Premium cinematic, extraordinarily detailed painting. No text, letters, logos, watermark. Preserve the source painting's coherent warm color and historical dentistry story.
