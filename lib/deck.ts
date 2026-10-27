import { getGifts, getSitePlans, money, PROMO } from './pricing';

// Sales presentation (/presentation/). ONE lesson, three leaks, one close.
// Lesson: « Vous perdez des patients que vous ne verrez jamais, à trois endroits. »
// Leak 1: he does not find you        -> visibility (Google Ads, SEO, GEO)
// Leak 2: he enters but does not trust -> the site as a second reception
// Leak 3: he compares and does not choose you -> the site as a second reception
// Method: Challenger commercial teaching (hook, reframe, new way, solution) + SPIN questions.
export type Visual = 'search' | 'leaks' | 'doors' | 'doubts' | 'clones' | 'compare' | 'questions' | 'offer';

export type Slide = {
  id: string;
  step: string;
  visual: Visual;
  kicker?: string;
  title: string;
  accent?: string;
  sub?: string;
  notes: { say: string[]; ask?: string[]; tip?: string };
};

export const slides: Slide[] = [
  {
    id: 'hook', step: 'L’accroche', visual: 'search',
    kicker: 'Ce soir, un patient cherche un implant',
    title: 'Pourquoi choisirait-il votre clinique', accent: 'plutôt qu’une autre ?',
    notes: {
      say: [
        'Ce soir, quelque part dans votre ville, un patient a une dent à remplacer. Il sort son téléphone et tape : « implant dentaire près de moi ». Il voit trois ou quatre cliniques. Il en appelle une, peut-être.',
        'Ma question : pourquoi ce patient choisirait-il votre clinique plutôt qu’une autre ?',
      ],
      tip: 'Pause. Ne réponds pas : c’est lui qui doit y penser. Tu enchaînes en disant que tu vas lui apprendre une seule chose.',
    },
  },
  {
    id: 'lecon', step: 'La leçon', visual: 'leaks',
    title: 'Vous perdez des patients que vous ne verrez jamais.', accent: 'À trois endroits.',
    notes: {
      say: [
        'Je vous donne une seule chose à retenir aujourd’hui.',
        'Un patient perdu ne laisse aucune trace : pas d’appel manqué, pas de courriel, rien. Il a simplement choisi quelqu’un d’autre, ou il ne vous a jamais vu.',
        'Ça arrive à trois endroits : il ne vous trouve pas, il entre sur votre site sans avoir confiance, ou il compare et ne vous choisit pas.',
      ],
      ask: ['SPIN, situation : « Aujourd’hui, comment vos nouveaux patients vous trouvent-ils, et qu’est-ce qui les fait choisir votre clinique ? »'],
      tip: 'C’est LA phrase. Dis-la lentement, puis laisse le silence. Tu la répéteras à la toute fin.',
    },
  },
  {
    id: 'trouve', step: 'Fuite n° 1', visual: 'doors',
    kicker: 'Fuite n° 1', title: 'Il ne vous trouve pas.',
    sub: 'Chez vous, vous êtes premier. Chez lui, pas forcément.',
    notes: {
      say: [
        'Si vous cherchez votre clinique depuis votre bureau, vous apparaissez en premier : Google sait où vous êtes. Mais votre patient ne cherche pas depuis votre bureau. Il cherche de chez lui, de l’autre bout de la ville, avec son téléphone, et il voit autre chose.',
        'Et il y a trois portes, pas une : la publicité, les résultats naturels, et maintenant les réponses d’une IA. Aujourd’hui, il y a trois portes : la publicité, les résultats naturels, et maintenant les réponses d’une IA. Il ne choisit pas d’avance laquelle.',
        'Maintenant : Google Ads. Vous apparaissez en haut, et vous ne payez que le clic.',
        'Durable : le SEO. Vous remontez sans payer chaque clic, et l’effet reste.',
        'Demain : le GEO. Quand il demande à l’IA, c’est vous qu’on cite. Peu de cliniques y pensent encore.',
      ],
      tip: 'Ne fais PAS le test Google ou carte dans son bureau : sa position le favorise et affaiblit ton argument. Montre plutôt une capture prise depuis un autre quartier, préparée avant. Aucune place n’est garantie : personne ne contrôle Google. Dis-le toi-même avant qu’on te le demande : ça te rend crédible. Ce qu’on contrôle, c’est le travail, et on le montre chaque mois. C’est ici que tu vends tes trois services de visibilité.',
    },
  },
  {
    id: 'confiance', step: 'Fuite n° 2', visual: 'doubts',
    kicker: 'Fuite n° 2', title: 'Il entre.', accent: 'Il ne vous fait pas confiance.',
    sub: 'Voici ce qu’il se demande, sans le dire.',
    notes: {
      say: [
        'Admettons qu’il vous ait trouvé et qu’il arrive sur votre site. En quelques secondes, il se pose des questions qu’il ne dira jamais à voix haute : est-ce adapté à mon cas ? va-t-on m’écouter ? qui va m’accueillir ? par quoi commencer ?',
        'Si le site ne répond pas à ces questions, il n’a pas confiance. Et un patient qui n’a pas confiance ne vous appelle pas : il retourne à sa recherche.',
        'Là, ce n’est plus un problème de visibilité : il était là. C’est un problème d’accueil.',
      ],
      ask: ['SPIN, problème : « Votre site répond-il à ces quatre questions ? Un inconnu s’y sent-il accueilli ? »'],
      tip: 'Ne critique pas son site actuel : pose la question et laisse-le répondre. S’il hésite, c’est gagné.',
    },
  },
  {
    id: 'comparaison', step: 'Fuite n° 3', visual: 'clones',
    kicker: 'Fuite n° 3', title: 'Il compare.', accent: 'Il ne vous choisit pas.',
    sub: 'Quand tout se ressemble, c’est ce qui le rassure qui décide.',
    notes: {
      say: [
        'Un patient ne regarde jamais une seule clinique. Il en compare trois ou quatre. Et pour lui, elles se ressemblent : mêmes soins, mêmes promesses, même bouton « prendre rendez-vous ».',
        'Alors qu’est-ce qui décide ? Celle qui l’a le mieux accueilli, qui a répondu à ses questions, qui lui a rendu la prochaine étape facile.',
        'Il ne choisit pas la meilleure clinique. Il choisit celle qui l’a rassuré.',
      ],
      ask: ['SPIN, implication : « Un nouveau patient d’implant, ça représente quoi pour votre clinique ? » (il donne SON chiffre)'],
      tip: 'Ne dis jamais le chiffre à sa place. Laisse-le calculer ce que représente un patient qui choisit la clinique d’à côté.',
    },
  },
  {
    id: 'reception', step: 'La solution', visual: 'compare',
    kicker: 'Fuites n° 2 et n° 3', title: 'Votre site, c’est votre deuxième réception.',
    notes: {
      say: [
        'Pour les deux dernières fuites, la réponse est la même que dans votre bureau. La réception accueille, rassure, répond et oriente : c’est elle qui fait qu’un patient se sent bien dès la porte. Votre site doit faire exactement ça, à toute heure.',
        'Regardez : à gauche, la réception de votre bureau. Au centre, celle de votre site. À droite, ce qui arrive quand il n’y en a aucune : le patient entre, personne ne l’accueille, et il part. C’est le trou noir.',
        'Votre site ne remplace pas votre réception : il fait en sorte qu’aucun patient n’entre sans être accueilli. Il répond, oriente, prépare et prend la demande de rendez-vous, même à 23 h un dimanche.',
        'Ce qu’il fait exactement dépend de la formule.',
      ],
      tip: 'Parcours le tableau ligne par ligne. Puis clique sur « Parler à l’assistant » : une démo en direct vaut mieux que dix phrases. Ne présente pas encore les prix.',
    },
  },
  {
    id: 'questions', step: 'À retenir', visual: 'questions',
    title: 'Trois questions à vous poser', accent: 'ce soir.',
    notes: {
      say: [
        'Voici ce que je vous laisse, même si vous ne travaillez jamais avec moi. Trois questions, une par fuite.',
        'Un : si un patient de l’autre bout de la ville cherche votre soin, est-ce que je suis là ? Demandons-le à une IA, ça ne dépend pas de l’endroit où on est assis. Où êtes-vous ?',
        'Deux : quand un inconnu arrive sur votre site, qui l’accueille et le rassure, en cinq secondes ?',
        'Trois : si je vous place à côté de deux autres cliniques, qu’est-ce qui me fait vous choisir ?',
        'Si l’une de ces trois réponses est « je ne sais pas », vous avez trouvé une fuite.',
      ],
      ask: ['SPIN, bénéfice : « Si ces patients ne se perdaient plus, qu’est-ce que ça changerait pour vous ? »'],
      tip: 'Le test de l’IA est le seul fait en direct : prépare-le AVANT (capture de secours), les réponses varient. Si sa clinique n’apparaît pas, ne commente pas, laisse-le constater. Ne lui fais pas ouvrir son propre site : il le connaît déjà, la question 2 se répond dans sa tête. C’est le moment où tu deviens son mentor : tu lui donnes un outil gratuit.',
    },
  },
  {
    id: 'close', step: 'L’achat', visual: 'offer',
    title: 'Réservez votre place.', accent: 'Le site Premium.',
    notes: {
      say: [
        'Je vous le répète : vous perdez des patients que vous ne verrez jamais, à trois endroits.',
        premiumLine(),
        'Il est à ' + premiumPrice() + ' jusqu’au ' + PROMO.label.fr + ', et il reste ' + PROMO.seatsLeft + ' places.',
        'Avez-vous des questions avant qu’on réserve votre place ?',
      ],
      ask: [
        'SPIN, bénéfice : « Si ces trois fuites étaient bouchées, qu’est-ce que ça changerait pour vous ? »',
        'Puis demande la vente, simplement : « Je vous réserve votre place Premium maintenant ? »',
      ],
      tip: 'Clique sur « Réserver ma place » et laisse-le remplir la commande avec toi. Après avoir demandé, tais-toi : le premier qui parle perd. N’évoque l’urgence que si elle est vraie : mets à jour les places restantes dans lib/pricing.ts. Les prix Google Ads, SEO et GEO : seulement s’il les demande (page Tarifs). S’il hésite : « Qu’est-ce qui vous retient ? », réponds, puis redemande. En dernier recours seulement, propose 30 minutes pour regarder ses trois fuites ensemble.',
    },
  },
];

// Spoken Premium pitch, built from lib/pricing.ts so it can never disagree with the pricing page.
function premiumLine() {
  const premium = getSitePlans('fr').find(plan => plan.featured)!;
  const gifts = getGifts('fr').map(gift => gift.months + ' ' + gift.name).join(' et ');
  const f = premium.features.map(feature => feature.toLowerCase());
  return 'Le site Premium répond aux trois : ' + gifts + ' offerts pour qu’il vous trouve, ' + f[0] + ' et ' + f[1] + ' pour qu’il ait confiance, ' + f[2] + ' et ' + f[3] + ' pour qu’il vous choisisse.';
}
function premiumPrice() {
  const premium = getSitePlans('fr').find(plan => plan.featured)!;
  return money(premium.price, 'fr') + ' au lieu de ' + money(premium.regularPrice ?? premium.price, 'fr');
}

export const objections: [string, string][] = [
  ['« J’ai déjà un site / un webmestre. »', 'Parfait, je ne remplace rien d’office. Regardons si votre site accueille et rassure un inconnu en quelques secondes.'],
  ['« J’ai déjà essayé Google Ads, ça n’a pas marché. »', 'Qu’est-ce qui s’est passé exactement ? (Souvent : le patient arrive, mais la page ne le rassure pas : la fuite n° 2.)'],
  ['« Je n’ai pas le temps. »', 'Votre rôle est de valider et de répondre. Les 30 minutes de l’appel sont la seule chose à bloquer.'],
  ['« C’est cher / je compare. »', 'Les prix sont affichés, sans surprise. Qu’est-ce que vous comparez ? (C’est justement ce que fait votre patient.)'],
  ['« Je dois en parler à mon associé. »', 'Bien sûr. Je vous envoie le récapitulatif pour qu’il le voie. La place Premium reste réservable jusqu’à la date de fin de l’offre.'],
  ['« Je veux y penser. »', 'Bien sûr. Qu’est-ce qui vous retient exactement ? (Réponds, puis redemande.) En dernier recours : 30 minutes pour regarder vos trois fuites ensemble.'],
  ['« Et la confidentialité des patients ? »', 'Réponse précise et honnête sur ce qui est stocké et où. À valider avec un professionnel avant de rien promettre.'],
  ['« Garantissez-vous des résultats ? »', 'Non, et personne ne le peut : Google décide seul. On contrôle le travail et on vous le montre chaque mois.'],
];
