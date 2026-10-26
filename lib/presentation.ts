export const frames = [
  ['intro-1', 'Il cherche. Pourquoi vous ?'],
  ['intro-2', 'Il compare ses options'],
  ['intro-3', 'Pourquoi vous choisir ?'],
  ['approche', 'Notre approche'],
  ['attirer', 'Être visible'],
  ['ressentir', 'Parler à son besoin'],
  ['convaincre', 'La première impression'],
  ['confiance', 'Inspirer confiance'],
  ['orienter', 'Orienter le patient'],
  ['photos', 'Les photos guidées'],
  ['demande', 'Préparer la demande'],
  ['reception', 'Le relais de la réception'],
  ['rappels', 'Les rappels'],
  ['avis', 'L’après-visite'],
  ['workflow', 'Le parcours complet'],
  ['mesurer', 'Mesurer'],
  ['offre', 'Les formules Google Ads'],
  ['suite', 'Parlons de votre clinique'],
] as const;

export const modelLabels = { essentielle: 'Essentielle', avancee: 'Avancée', premium: 'Premium' };
export type Model = keyof typeof modelLabels;

export function frameIndex(id: string) {
  return frames.findIndex(([frame]) => frame === (id === 'accueil' ? 'intro-1' : id === 'parcours' ? 'attirer' : id));
}
