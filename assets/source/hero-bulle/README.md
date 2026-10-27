# Hero bulle — Karwisoft

**Version actuelle :** le tableau doré fourni par le client reste fixe. Une seule scène panoramique autour d’une table défile lentement dans la bulle, avec les écrans orientés vers les personnages qui les utilisent. Sources et animation dans [epic/README.md](epic/README.md), prompt final dans [epic/prompt-panorama.md](epic/prompt-panorama.md), dimensions et poids dans [epic/manifest.json](epic/manifest.json). La composition mobile place le portail face aux observateurs de droite, à hauteur de leur regard. Les sections ci-dessous conservent la provenance et la validation des versions précédentes.

Création le 26 octobre 2026 avec l’outil intégré **image_gen**. Aucun script de génération par API et aucune clé API n’ont été utilisés.

L’utilisateur a délégué le choix des variantes et demandé que le passé soit clairement lié au métier de dentiste. La sélection finale associe la **variante passé 3 retravaillée** en consultation dentaire calme et la **variante futur 2**, avec une dentiste en clinique contemporaine et un patient souriant. Le cadrage mobile a été généré puis ajusté séparément pour dégager la zone de la bulle.

## Livraison définitive

Les trois WebP sont exportés avec Sharp à **qualité 85**, effort 6 et sous-échantillonnage intelligent, sans filtre de flou. Chaque WebP contient une seule image, sans animation intégrée. Les PNG natifs et les PNG aux dimensions demandées restent conservés.

| Fichier | Dimensions | Poids |
|---|---:|---:|
| `public/assets/hero-passe.webp` | 2560 × 1440 | 275,4 Ko (275378 octets) |
| `public/assets/hero-passe-mobile.webp` | 1440 × 2560 | 275,3 Ko (275346 octets) |
| `public/assets/hero-futur.webp` | 1536 × 1536 | 287,3 Ko (287348 octets) |
| `assets/source/hero-bulle/originaux/hero-passe-selection.png` | 1672 × 941 | 2,05 Mo (2048658 octets) |
| `assets/source/hero-bulle/hero-passe-selection.png` | 2560 × 1440 | 6,70 Mo (6701874 octets) |
| `assets/source/hero-bulle/originaux/reference-passe-mobile.png` | 941 × 1672 | 2,12 Mo (2119537 octets) |
| `assets/source/hero-bulle/originaux/hero-passe-mobile-selection.png` | 941 × 1672 | 2,00 Mo (1998979 octets) |
| `assets/source/hero-bulle/hero-passe-mobile-selection.png` | 1440 × 2560 | 6,00 Mo (6001529 octets) |

## Principe d’animation pour l’intégration

- Le tableau du passé constitue un fond **fixe** : aucun panoramique, zoom, parallaxe ni déplacement de ce calque.
- Seule la **bulle circulaire** doit se déplacer et s’ouvrir pour révéler `hero-futur.webp`, la vision moderne : visibilité en recherche, rendez-vous et parcours patient.
- Sur ordinateur, le centre de référence est à 50 % en x et 42 % en y, diamètre d’environ 38 % de la largeur.
- Sur mobile, le centre de référence est à 50 % en x et 38 % en y, diamètre d’environ 55 % de la largeur. Le bas reste sombre pour le titre et les actions.
- Le hero est maintenant intégré à l’accueil dans `components/VisionHero.tsx` et `app/styles/hero-bulle.css`. La bulle s’ouvre en 2,4 secondes, puis flotte doucement sur un cycle de 14 secondes. Le tableau, les textes et les autres éléments du hero ne sont pas animés.
- La lecture peut être mise en pause au clavier ou à la souris. Elle s’arrête hors écran et lorsque l’onglet est masqué. Le mode mouvement réduit affiche immédiatement la scène du futur sans animation.
- Le mode présentation conserve les trois scènes initiales et ses 18 diapositives. `components/StoryIntro.tsx` sélectionne la nouvelle introduction pour l’accueil normal; `lib/landing-animations.mjs` accepte l’absence de l’ancienne séquence sur cette page.

## Vérification de l’intégration

Aperçu local : `http://127.0.0.1:3100/`. Contrôle Chrome depuis `C:/Dev/dentist` : `node tools/vision-hero-preview.mjs`. Les captures et mesures sont conservées dans `C:/Dev/dentist/preview/hero-bulle/`.

La comparaison de deux captures confirme que les pixels du tableau restent identiques pendant le mouvement de la bulle. La pause, la reprise au clavier, la pause hors écran et le mode mouvement réduit ont été vérifiés. Le cadrage et les liens passent sur 11 formats entre 320 × 568 et 1920 × 1080, dont un mobile en paysage. Le menu mobile, le CTA, les 18 diapositives, le retour à l’accueil et la page des services ont aussi été contrôlés sans erreur JavaScript.

## Prompts de la sélection définitive — image_gen intégré

### Passé retenu : consultation dentaire

Entrée : `hero-passe-v3.png`.
Sortie originale : `originaux/hero-passe-selection.png`.

Use case: precise-object-edit.
Edit target: the supplied seventeenth-century golden Dutch oil painting, selected as the desktop past background of a website hero.
Output: a 16:9 landscape PNG, preferably 2560x1440 or higher.
Preserve the exact beautiful painterly direction: warm amber / burnt sienna / deep brown / antique gold, visible brushstrokes, soft candlelit chiaroscuro, vaulted stone room, fictional dentist's distinctive dark broad-brimmed hat and dark coat at the far left, villagers at the far right, warm dark lower-third vignette.
PRIMARY CHANGE: make it immediately clear that the man at the far left is a VILLAGE DENTIST, not just an ordinary gentleman. Replace the leftmost young observer with a calm adult male patient seated in a plain period wooden chair at the very far left. The patient gently raises his chin toward the dentist and slightly opens his mouth for a peaceful examination, with a relaxed expression. The dentist turns a little toward the patient and holds a very small rounded polished inspection mirror delicately near the patient's mouth. This is a quiet reassuring consultation, not extraction or surgery. Keep this entire interaction confined to the far-left 25% of the frame. Hands must be natural and anatomically plausible, the mirror small and unobtrusive, no dramatic forceps or scary tools.
Place one small ivory-colored educational MOLAR TOOTH MODEL on a modest wooden pedestal at the far-left end of the table (around x=18%,y=74%), illuminated enough to clearly signal dentistry. It is a carved teaching object, not a real extracted tooth, no roots with tissue.
CRITICAL: keep the entire circular future-overlay area EMPTY. Center x=50%, y=42%, diameter 38% of the full WIDTH. Approximate protected bounds x=31%..69%, y=8%..76%. Only softly illuminated low-contrast amber stone inside; no person, hand, tool, chair, tooth model, candle, painted circle or portal inside this area. Keep all right-side villagers turned inward toward the center, quietly curious and mildly skeptical. No actual bubble in this background.
Keep the bottom third dark and quiet for future white typography. No visible writing or lettering of any kind, no numerals, signature, logo, watermark, brand or decorative frame. Entirely fictional people. Absolutely no blood, pain, suffering, scary treatment, injury, gore or frightening instruments. One coherent museum-quality oil painting.

### Mobile : recomposition verticale

Entrée : `originaux/hero-passe-selection.png`.
Étude originale : `originaux/reference-passe-mobile.png`.

Use case: precise-object-edit / recomposition.
Input image is the selected desktop painting: the definitive fictional seventeenth-century village dentist scene. Recompose this SAME world for a VERTICAL MOBILE HERO.
Output one vertical 9:16 PNG, 1440x2560 pixels if supported. Not a landscape crop, not a collage.
Keep the EXACT same museum-quality Dutch Golden Age oil-painting art direction, warm amber, burnt sienna, deep brown and antique gold, visible brushstrokes, soft candlelit chiaroscuro, vaulted stone and dignified subtle humor. Keep the distinctive fictional dentist's face, dark broad-brimmed hat, modest white collar and dark period coat from the reference.
COMPOSITION FOR PHONE: the dentist is the ONE main figure at the upper LEFT, head around x=13%,y=18%, body kept at the outer-left edge. He turns inward toward the center. Two or three villagers stand or sit close to the outer RIGHT edge, heads around x=88%,y=22%, x=90%,y=45% and optionally x=88%,y=56%, looking toward the future opening with quiet wonder and mild skepticism. One right-edge villager can be the calm patient in a plain period wooden dental chair, preserving the village dentistry context without any active procedure crossing the center.
Make the DENTAL PROFESSION readable: a small ivory molar teaching model on a modest wooden pedestal rests on the table at the far-left edge near x=15%,y=59%; a folded linen cloth and one tiny rounded inspection mirror remain discreetly beside it. Not a real extracted tooth, no frightening tool close-up.
CRITICAL EMPTY CIRCULAR AREA: center x=50%,y=38%, diameter 55% of the full WIDTH. Approximate protected bounds x=22.5%..77.5%, y=22.5%..53.5%. This entire central disk must contain ONLY warm softly illuminated low-contrast stone and atmosphere. No face, arm, hand, tool, furniture, model tooth, candle or painted portal inside it. Keep figures clustered at the outer edges, never intruding into the reserved circular space. Do NOT draw the bubble or a circle; it will be animated separately over this STATIC background.
Keep the bottom 35% of the image gradually very dark warm brown, elegantly vignetted and quiet for future white heading and buttons, with no important person or object there.
All people fictional. Absolutely no text, letters, numbers, signatures, logos, watermarks or brands. No blood, pain, suffering, extraction, scary treatment, gore or injury. One coherent elegant oil painting in a true vertical composition.

### Mobile : ajustement de l’espace réservé

Entrée : `originaux/reference-passe-mobile.png`.
Sortie originale finale : `originaux/hero-passe-mobile-selection.png`.

Use case: precise-object-edit.
Edit target: supplied vertical mobile oil painting of a seventeenth-century village dentist.
Keep the same 9:16 canvas, museum-quality oil brushwork, amber / brown / burnt-sienna / gold colors, candle lighting, dentist and patient's fictional faces, calm dental examination, right-edge villagers, molar teaching model and dark bottom 35%.
ONE TARGETED CORRECTION: make the central area more open for a moving circular overlay. Recompose the LEFT dentist-and-patient consultation group a little smaller and closer to the LEFT border. In the middle-height band y=25%..52%, the rightmost silhouette of the dentist's torso, coat, sleeves and hands must end at or BEFORE x=21% of the width. The dentist's hat and head may remain upper-left above this band, naturally connected to his body. Keep correct anatomy and a relaxed dental consultation, no distorted or stretched people. The patient stays calm at the far left; slightly cropping peripheral chair or clothing at the left edge is acceptable. Keep the important faces and the gentle mirror examination readable.
The circular overlay will be centered at x=50%,y=38%, diameter 55% of image WIDTH. Reserve the entire empty circle, especially its left edge around x=22.5% at mid-height. Replace any intruding dark coat / sleeve pixels in this protected area with natural softly illuminated amber stone matching the surrounding wall. NO body, hand, chair, candle or object inside the circle. Do NOT paint the circle, bubble, border or portal itself.
Keep the right villagers close to x=82%..98% at relevant heights, with inward curious gazes. Keep the lower 35% very dark for typography. Do not add new figures or objects. No text, letters, numbers, signature, logo, watermark, blood, pain, scary tools, injury or gore. Single coherent vertical oil painting. Output 1440x2560 if available.

Le futur retenu utilise le prompt **Futur — variante 2** reproduit plus bas, sans nouvelle modification de cette image.

## Fichiers et résolutions

- Le dossier `originaux/` contient les PNG natifs de l’outil, conservés tels quels.
- L’outil a produit les paysages en **1672 × 941** et les carrés en **1254 × 1254**, malgré les dimensions demandées dans les prompts.
- Les PNG à la racine de ce dossier sont des versions **redimensionnées** en 2560 × 1440 pour le passé et en 1536 × 1536 pour le futur, avec Sharp et le noyau Lanczos3, sans réinterprétation de la scène. Ce redimensionnement n’ajoute pas de détails natifs. Le très léger écart de ratio des paysages est ajusté par un recadrage centré marginal.
- `originaux/reference-futur.png` est l’étude intermédiaire utilisée comme référence picturale pour les trois variantes finales du futur; elle ne fait pas partie des trois variantes à sélectionner.
- Les fichiers d’intégration du hero sont listés dans la section précédente. La génération d’images a été réalisée avec l’outil intégré; la mise en mouvement utilise le code du site.

| PNG | Dimensions | Poids |
|---|---:|---:|
| [hero-passe-v1.png](hero-passe-v1.png) | 2560 × 1440 | 6,72 Mo (6721103 octets) |
| [originaux/hero-passe-v1.png](originaux/hero-passe-v1.png) | 1672 × 941 | 2,07 Mo (2071772 octets) |
| [hero-passe-v2.png](hero-passe-v2.png) | 2560 × 1440 | 7,03 Mo (7026196 octets) |
| [originaux/hero-passe-v2.png](originaux/hero-passe-v2.png) | 1672 × 941 | 2,16 Mo (2162387 octets) |
| [hero-passe-v3.png](hero-passe-v3.png) | 2560 × 1440 | 7,03 Mo (7028751 octets) |
| [originaux/hero-passe-v3.png](originaux/hero-passe-v3.png) | 1672 × 941 | 2,15 Mo (2153508 octets) |
| [hero-futur-v1.png](hero-futur-v1.png) | 1536 × 1536 | 5,89 Mo (5886836 octets) |
| [originaux/hero-futur-v1.png](originaux/hero-futur-v1.png) | 1254 × 1254 | 2,37 Mo (2366503 octets) |
| [hero-futur-v2.png](hero-futur-v2.png) | 1536 × 1536 | 6,12 Mo (6118012 octets) |
| [originaux/hero-futur-v2.png](originaux/hero-futur-v2.png) | 1254 × 1254 | 2,52 Mo (2523354 octets) |
| [hero-futur-v3.png](hero-futur-v3.png) | 1536 × 1536 | 6,17 Mo (6169274 octets) |
| [originaux/hero-futur-v3.png](originaux/hero-futur-v3.png) | 1254 × 1254 | 2,45 Mo (2449646 octets) |
| [originaux/reference-futur.png](originaux/reference-futur.png) | 1254 × 1254 | 2,54 Mo (2535918 octets) |

## Références utilisées

La direction artistique et le placement de la bulle suivent la description de l’utilisateur : palette ambre, brun, sienne brûlée et or, texture de pinceau et lumière chaude. Les personnages sont fictifs. Les interfaces sont abstraites, sans texte, chiffres, logo ni marque.

La variante passé 1 sert de référence de peinture pour passé 2, passé 3 et l’étude intermédiaire du futur. L’étude intermédiaire sert ensuite d’entrée aux trois variantes finales du futur, avec une consigne explicite de moderniser la clinique et les vêtements tout en gardant la peinture à l’huile.

## Prompts finaux utilisés

## Passé — variante 1

Use case: historical-scene.
Asset type: desktop website hero BACKGROUND for a dental-clinic web and search advertising agency.
Output: one landscape 16:9 PNG, native 2560x1440 pixels or larger (prefer 3840x2160 if available), no montage.
Shared art direction: a museum-quality seventeenth-century Dutch Golden Age oil painting with cinematic realism, visible fine brushwork and restrained impasto, warm amber, deep umber, burnt sienna and mellow antique gold. Strong but soft-edged chiaroscuro, gentle candlelight, naturally painted skin and textiles, sophisticated atmosphere and subtle wit. All people are wholly fictional, with no resemblance to any real person. No text, letters, numerals, writing, logos, brands, watermarks, signatures or decorative picture frame. No blood, pain, distress, gore, frightening dental tools, or tools in the foreground.
Scene: a seventeenth-century village dentist / tooth-drawer, a calm self-assured man in a dark wool coat, broad-brimmed hat and modest pale collar, stands beside a wooden table in a vaulted stone chamber lit by candles. Villagers of different ages gather in a loose semicircle at the FAR LEFT and FAR RIGHT. Their heads and eyes all turn inward toward the same point at x=50%, y=42%, expressing quiet wonder and mild skepticism. Elegant and gently ironic, never grotesque.
CRITICAL COMPOSITION: reserve a large EMPTY area for a future animated circular overlay: center x=50%, y=42%, diameter 38% of the full image WIDTH. The whole future circle must remain unoccupied: approximately x=31%..69% and y=8%..76%. Paint only softly illuminated amber stone, subtle atmospheric light and low-contrast brush texture inside this region. Put NO people, faces, hands, tools, candles, furniture or focal objects across it. This is a natural empty interior, not a drawn circle, portal, hole, spotlight disc or luminous orb. Do NOT paint the bubble itself.
Place the dentist clearly on the left edge around x=15%..25%, and village observers along x=3%..25% and x=76%..97%. Keep their inward gazes readable. A low wooden tabletop can occupy the lower margin below y=76%, with only harmless folded linen or a closed plain box at its outer ends.
The bottom THIRD gradually darkens into a deep warm brown vignette, providing quiet negative space for a later white headline. No headline is actually painted. Maintain an immersive wide composition, believable hands and faces, complete breathing room around the empty center.
Variant P1: a solemn vaulted village chamber with one broad shadowed arch in the rear, softly glowing honey-colored stone at the center; the dentist stands at the left with relaxed hands close to his own torso. Two villagers at the far left and three at the far right, including one younger and one older observer. Balanced theatrical placement with understated amused expressions; richest amber glow from a candle at the left outside the reserved central region.

## Passé — variante 2

Use case: historical-scene.
Asset type: desktop website hero BACKGROUND for a dental-clinic web and search advertising agency.
Output: one landscape 16:9 PNG, native 2560x1440 pixels or larger (prefer 3840x2160 if available), no montage.
Shared art direction: a museum-quality seventeenth-century Dutch Golden Age oil painting with cinematic realism, visible fine brushwork and restrained impasto, warm amber, deep umber, burnt sienna and mellow antique gold. Strong but soft-edged chiaroscuro, gentle candlelight, naturally painted skin and textiles, sophisticated atmosphere and subtle wit. All people are wholly fictional, with no resemblance to any real person. No text, letters, numerals, writing, logos, brands, watermarks, signatures or decorative picture frame. No blood, pain, distress, gore, frightening dental tools, or tools in the foreground.
Scene: a seventeenth-century village dentist / tooth-drawer, a calm self-assured man in a dark wool coat, broad-brimmed hat and modest pale collar, stands beside a wooden table in a vaulted stone chamber lit by candles. Villagers of different ages gather in a loose semicircle at the FAR LEFT and FAR RIGHT. Their heads and eyes all turn inward toward the same point at x=50%, y=42%, expressing quiet wonder and mild skepticism. Elegant and gently ironic, never grotesque.
CRITICAL COMPOSITION: reserve a large EMPTY area for a future animated circular overlay: center x=50%, y=42%, diameter 38% of the full image WIDTH. The whole future circle must remain unoccupied: approximately x=31%..69% and y=8%..76%. Paint only softly illuminated amber stone, subtle atmospheric light and low-contrast brush texture inside this region. Put NO people, faces, hands, tools, candles, furniture or focal objects across it. This is a natural empty interior, not a drawn circle, portal, hole, spotlight disc or luminous orb. Do NOT paint the bubble itself.
Place the dentist clearly on the left edge around x=15%..25%, and village observers along x=3%..25% and x=76%..97%. Keep their inward gazes readable. A low wooden tabletop can occupy the lower margin below y=76%, with only harmless folded linen or a closed plain box at its outer ends.
The bottom THIRD gradually darkens into a deep warm brown vignette, providing quiet negative space for a later white headline. No headline is actually painted. Maintain an immersive wide composition, believable hands and faces, complete breathing room around the empty center.
Input image 1 is the edit / variation reference. Preserve its exact warm oil-painting direction, reserved central geometry and calm humor. Recompose a distinct second variant P2: an older fictional village dentist with a short gray beard and a dark broad-brimmed hat stands at the far left, an elderly woman and young apprentice just behind him. At the far right, a middle-aged woman, a farmer and a quietly amused adolescent lean inward in a loose semicircle. A lower, more intimate stone vault and a narrow dim curtain at the far left; candlelight comes from both outer edges, with richer burnt-sienna shadows and the same empty honey-gold central area. Keep every face and hand out of the central reserved circle. No pain, tools, labels, modern objects or drawn circle.

## Passé — variante 3

Use case: historical-scene.
Asset type: desktop website hero BACKGROUND for a dental-clinic web and search advertising agency.
Output: one landscape 16:9 PNG, native 2560x1440 pixels or larger (prefer 3840x2160 if available), no montage.
Shared art direction: a museum-quality seventeenth-century Dutch Golden Age oil painting with cinematic realism, visible fine brushwork and restrained impasto, warm amber, deep umber, burnt sienna and mellow antique gold. Strong but soft-edged chiaroscuro, gentle candlelight, naturally painted skin and textiles, sophisticated atmosphere and subtle wit. All people are wholly fictional, with no resemblance to any real person. No text, letters, numerals, writing, logos, brands, watermarks, signatures or decorative picture frame. No blood, pain, distress, gore, frightening dental tools, or tools in the foreground.
Scene: a seventeenth-century village dentist / tooth-drawer, a calm self-assured man in a dark wool coat, broad-brimmed hat and modest pale collar, stands beside a wooden table in a vaulted stone chamber lit by candles. Villagers of different ages gather in a loose semicircle at the FAR LEFT and FAR RIGHT. Their heads and eyes all turn inward toward the same point at x=50%, y=42%, expressing quiet wonder and mild skepticism. Elegant and gently ironic, never grotesque.
CRITICAL COMPOSITION: reserve a large EMPTY area for a future animated circular overlay: center x=50%, y=42%, diameter 38% of the full image WIDTH. The whole future circle must remain unoccupied: approximately x=31%..69% and y=8%..76%. Paint only softly illuminated amber stone, subtle atmospheric light and low-contrast brush texture inside this region. Put NO people, faces, hands, tools, candles, furniture or focal objects across it. This is a natural empty interior, not a drawn circle, portal, hole, spotlight disc or luminous orb. Do NOT paint the bubble itself.
Place the dentist clearly on the left edge around x=15%..25%, and village observers along x=3%..25% and x=76%..97%. Keep their inward gazes readable. A low wooden tabletop can occupy the lower margin below y=76%, with only harmless folded linen or a closed plain box at its outer ends.
The bottom THIRD gradually darkens into a deep warm brown vignette, providing quiet negative space for a later white headline. No headline is actually painted. Maintain an immersive wide composition, believable hands and faces, complete breathing room around the empty center.
Input image 1 is the edit / variation reference. Preserve its exact warm oil-painting direction, reserved central geometry and calm humor. Recompose a distinct third variant P3: a fictional middle-aged village dentist in a charcoal cloak and broad-brimmed hat stands at the far left in three-quarter profile looking to the exact empty center, with one older woman behind his left shoulder. At the far right, four villagers of varied ages form a shallow semicircle, an older observer smiling with mild skepticism and a younger observer quietly intrigued. A taller rough-hewn vault, an unlit arched niche at the right and broad pools of low candlelight illuminate the stone with antique gold. Softer smoke-like brush atmosphere, solemn but lightly ironic expressions. Keep the central bubble space genuinely empty and the lower third dark. No horror, pain, blood, tools, text or actual portal.

## Futur — variante 1

Use case: precise-object-edit / style-transfer.
Asset: square illustration of a FUTURE dentist for the circular opening in a website hero. Output one 1:1 square PNG, 1536x1536.
Input image is an EDIT and painterly style reference. Retain its beautiful museum-quality oil brushwork, warm amber / burnt sienna / brown / antique gold palette, softly luminous skin, premium chiaroscuro, tiny cool-blue holographic highlights and gentle golden halo. It must remain recognizably an oil painting, not photography, 3D game art or a flat vector.
MANDATORY CHANGE: this is a TWENTY-FIRST-CENTURY / NEAR-FUTURE MODERN DENTAL CLINIC, with smooth warm-white walls, brushed-gold trim, a contemporary white ergonomic dental chair, modern white cabinetry and a discreet ceiling-mounted LED dental lamp. Replace ALL old stone vaults, old windows, candles, rustic furniture and historical costumes with these contemporary clinic elements. The lighting is softly golden as if candlelit, but actual fixtures and architecture are modern. NO seventeenth-century room or clothing.
The dentist wears a clean contemporary short-sleeved ivory clinical scrub top, simple modern neckline, subtle gold piping, no old coat or tunic. The smiling patient wears modern smart-casual warm beige clothing, no historical dress, ruff, lace, linen apron or old-fashioned bib. Calm confidence, hope, graceful anatomy. Fictional people only, not celebrities or recognizable real people.
Retain / redraw three coherent floating holographic interfaces: a calendar grid with at least 85% of its cells glowing gold to show a FULL appointment book, a luminous educational 3D dental implant with crown / abutment / threaded body, and THREE blank search result cards with the TOP card brightly highlighted gold. The patient holds a naturally gripped smartphone showing a guided camera screen with a facial outline, focus brackets and a shutter circle. Interfaces are purely geometric; absolutely NO text, letters, numerals, dates, pseudo-writing, brands, recognizable corporate icons, signatures or watermarks.
Keep EVERY important face, the full phone screen, the appointment panel, implant and search panel inside a CIRCULAR SAFE AREA of radius 40% of image width centered at x=50%, y=50%. Make interfaces compact enough that none spill into the corners. Outside this safe disk, only softly brushed clinic walls, peripheral furniture, warm halos and fine edge light trails. Do not paint a circle or portal boundary.
No blood, pain, surgery, scary tools, horror or distorted hands. One coherent premium painted scene, no montage.
Final variant F1: preserve the reference's fictional dark-curly-haired male dentist and smiling chestnut-haired female patient, while changing all wardrobe and architecture to modern as described. Recompose them closer together: dentist head around x=35%,y=34%; patient head x=65%,y=42%. Search cards at x=53%,y=26%; calendar panel contained within x=24%..44%,y=55%..73%; compact implant x=51%,y=54%; phone inside x=61%..72%,y=55%..74%. A luminous contemporary white-and-gold clinic, with warm golden dusk illumination, beautifully visible brush texture.

## Futur — variante 2

Use case: precise-object-edit / style-transfer.
Asset: square illustration of a FUTURE dentist for the circular opening in a website hero. Output one 1:1 square PNG, 1536x1536.
Input image is an EDIT and painterly style reference. Retain its beautiful museum-quality oil brushwork, warm amber / burnt sienna / brown / antique gold palette, softly luminous skin, premium chiaroscuro, tiny cool-blue holographic highlights and gentle golden halo. It must remain recognizably an oil painting, not photography, 3D game art or a flat vector.
MANDATORY CHANGE: this is a TWENTY-FIRST-CENTURY / NEAR-FUTURE MODERN DENTAL CLINIC, with smooth warm-white walls, brushed-gold trim, a contemporary white ergonomic dental chair, modern white cabinetry and a discreet ceiling-mounted LED dental lamp. Replace ALL old stone vaults, old windows, candles, rustic furniture and historical costumes with these contemporary clinic elements. The lighting is softly golden as if candlelit, but actual fixtures and architecture are modern. NO seventeenth-century room or clothing.
The dentist wears a clean contemporary short-sleeved ivory clinical scrub top, simple modern neckline, subtle gold piping, no old coat or tunic. The smiling patient wears modern smart-casual warm beige clothing, no historical dress, ruff, lace, linen apron or old-fashioned bib. Calm confidence, hope, graceful anatomy. Fictional people only, not celebrities or recognizable real people.
Retain / redraw three coherent floating holographic interfaces: a calendar grid with at least 85% of its cells glowing gold to show a FULL appointment book, a luminous educational 3D dental implant with crown / abutment / threaded body, and THREE blank search result cards with the TOP card brightly highlighted gold. The patient holds a naturally gripped smartphone showing a guided camera screen with a facial outline, focus brackets and a shutter circle. Interfaces are purely geometric; absolutely NO text, letters, numerals, dates, pseudo-writing, brands, recognizable corporate icons, signatures or watermarks.
Keep EVERY important face, the full phone screen, the appointment panel, implant and search panel inside a CIRCULAR SAFE AREA of radius 40% of image width centered at x=50%, y=50%. Make interfaces compact enough that none spill into the corners. Outside this safe disk, only softly brushed clinic walls, peripheral furniture, warm halos and fine edge light trails. Do not paint a circle or portal boundary.
No blood, pain, surgery, scary tools, horror or distorted hands. One coherent premium painted scene, no montage.
Variant F2: a fictional confident female dentist about forty with short dark hair and contemporary ivory scrubs at x=35%,y=35%, beside a fictional smiling male patient about thirty-five in a warm beige modern knit top at x=65%,y=42%. Patient holds the phone at x=66%,y=64%. Search panel at x=52%,y=25%, full appointment grid compactly at x=36%,y=63%, implant at x=51%,y=53%. A bright premium modern white operatory with delicate gold recessed lighting and smooth white cabinetry. Preserve the same golden oil-painting palette and visible brushstrokes; no historical architecture or clothing.

## Futur — variante 3

Use case: precise-object-edit / style-transfer.
Asset: square illustration of a FUTURE dentist for the circular opening in a website hero. Output one 1:1 square PNG, 1536x1536.
Input image is an EDIT and painterly style reference. Retain its beautiful museum-quality oil brushwork, warm amber / burnt sienna / brown / antique gold palette, softly luminous skin, premium chiaroscuro, tiny cool-blue holographic highlights and gentle golden halo. It must remain recognizably an oil painting, not photography, 3D game art or a flat vector.
MANDATORY CHANGE: this is a TWENTY-FIRST-CENTURY / NEAR-FUTURE MODERN DENTAL CLINIC, with smooth warm-white walls, brushed-gold trim, a contemporary white ergonomic dental chair, modern white cabinetry and a discreet ceiling-mounted LED dental lamp. Replace ALL old stone vaults, old windows, candles, rustic furniture and historical costumes with these contemporary clinic elements. The lighting is softly golden as if candlelit, but actual fixtures and architecture are modern. NO seventeenth-century room or clothing.
The dentist wears a clean contemporary short-sleeved ivory clinical scrub top, simple modern neckline, subtle gold piping, no old coat or tunic. The smiling patient wears modern smart-casual warm beige clothing, no historical dress, ruff, lace, linen apron or old-fashioned bib. Calm confidence, hope, graceful anatomy. Fictional people only, not celebrities or recognizable real people.
Retain / redraw three coherent floating holographic interfaces: a calendar grid with at least 85% of its cells glowing gold to show a FULL appointment book, a luminous educational 3D dental implant with crown / abutment / threaded body, and THREE blank search result cards with the TOP card brightly highlighted gold. The patient holds a naturally gripped smartphone showing a guided camera screen with a facial outline, focus brackets and a shutter circle. Interfaces are purely geometric; absolutely NO text, letters, numerals, dates, pseudo-writing, brands, recognizable corporate icons, signatures or watermarks.
Keep EVERY important face, the full phone screen, the appointment panel, implant and search panel inside a CIRCULAR SAFE AREA of radius 40% of image width centered at x=50%, y=50%. Make interfaces compact enough that none spill into the corners. Outside this safe disk, only softly brushed clinic walls, peripheral furniture, warm halos and fine edge light trails. Do not paint a circle or portal boundary.
No blood, pain, surgery, scary tools, horror or distorted hands. One coherent premium painted scene, no montage.
Variant F3: a fictional calm older male dentist about fifty with short salt-and-pepper hair in contemporary ivory scrubs at x=63%,y=35%, and a fictional smiling female patient about thirty with natural dark curls and a contemporary beige jacket at x=36%,y=43%. Patient holds the guided-camera smartphone at x=35%,y=64%. Search panel at x=50%,y=25%, a nearly full appointment grid compactly at x=64%,y=63%, and luminous implant centered x=51%,y=53%. Modern warm-white clinic walls and elegant restrained gold fixtures with a slightly deeper burnt-sienna chiaroscuro around the periphery. Same premium Dutch-oil brushwork and warm amber universe, unmistakably modern equipment and wardrobe.


## Prompt de l’étude intermédiaire de référence

Entrée : `originaux/hero-passe-v1.png`.
Sortie conservée : `originaux/reference-futur.png`.

Use case: style-transfer.
Asset type: square oil-painted future scene for the inside of a circular animated website hero.
Input image 1 is ONLY the shared painting / palette / brushwork reference. Transform the setting into a hopeful future dental clinic, not the historical scene.
Output: one 1:1 SQUARE PNG, 1536x1536 pixels. Do NOT draw a circle or portal outline.
Shared art direction: a museum-quality seventeenth-century Dutch Golden Age oil painting with cinematic realism, visible fine brushwork and restrained impasto, warm amber, deep umber, burnt sienna and mellow antique gold. Strong but soft-edged chiaroscuro, gentle candlelight, naturally painted skin and textiles, sophisticated atmosphere and subtle wit. All people are wholly fictional, with no resemblance to any real person. No text, letters, numerals, writing, logos, brands, watermarks, signatures or decorative picture frame. No blood, pain, distress, gore, frightening dental tools, or tools in the foreground.
A calm confident modern dentist in a premium warm-white and gold dental clinic stands near a smiling adult patient. Contemporary tailored clinical clothing, believable anatomy, relaxed expressions. The future should remain a PAINTED oil painting, with the same amber / umber / burnt sienna / gold brush texture as the historical reference, balanced by luminous warm whites and small amounts of soft icy-blue holographic light. Hopeful, radiant, elegant, cinematic, never sterile, harsh neon or science-fiction armor.
Between the dentist and patient float three refined semi-transparent holographic panels: (1) a grid of small calendar appointment blocks that are nearly all filled with soft golden light, showing a busy appointment book WITHOUT dates, numbers, letters or text; (2) a carefully rendered glowing three-dimensional dental implant with its crown and supporting abutment assembled in a clean educational miniature, NOT a surgical scene; (3) a simple web-search-results panel made only of three blank horizontal cards, with the TOP result clearly highlighted in warm gold and the two lower results subdued. No search brand, word, letter, numeral, pseudo-writing or recognizable corporate icon.
The smiling patient holds a smartphone with its screen facing the viewer. The screen depicts a guided camera: a clean luminous oval facial outline, simple corner focus brackets and an abstract shutter circle, WITHOUT writing or numerals. The phone is naturally held in one hand, correct fingers, no extra limbs.
CRITICAL CIRCULAR SAFE AREA: faces, smartphone screen, calendar blocks, implant and highlighted first search result must all fit INSIDE the central disk of radius 40% of the square, centered at 50% x / 50% y. Keep significant faces and devices around the center rather than in the corners. The four outer corners contain only soft white-and-gold clinic atmosphere, a gentle halo and fine light trails near the edges. A natural harmonious original scene, not a collage of framed illustrations. Crisp enough to read visually inside the bubble, with simplified interfaces and beautiful painterly illumination.
Variant F1: a fictional male dentist in his forties with dark wavy hair at center-left, and a fictional smiling female patient in her thirties at center-right. The patient holds the guided-camera smartphone at chest height near x=64%, y=62%. Calendar panel at x=34%, y=55%, implant at x=50%, y=53%, highlighted-search panel above them near x=52%, y=24%. Dentist and patient faces at x=36%/65%, y=37%, comfortably inside the central circular safe area. Warm-white clinic architecture softly recedes behind them; intimate candle-like golden key light with restrained cool blue edges on the holograms.

