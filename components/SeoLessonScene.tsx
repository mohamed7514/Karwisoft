import type { SeoLearningPillarId } from '../lib/seo-learning';
import { SeoMethodIcon } from './SeoMethodIcon';

function Connection({ reverse = false, proposal = false }: { reverse?: boolean; proposal?: boolean }) {
  return <div className="lesson-connection" data-reverse={reverse} aria-hidden="true"><span className="lesson-wire" /><span className="lesson-packet">{proposal ? '✉' : '●'}</span><span className="lesson-wire-arrow">{reverse ? '←' : '→'}</span></div>;
}

/** Read a public reference first, explain its role, then name the SEO pillar. */
export function SeoLessonScene({ kind, phase }: { kind: SeoLearningPillarId; phase: number }) {
  if (kind === 'recherches') return <div className="lesson-scene lesson-intent" data-phase={phase} aria-hidden="true">
    <div className="lesson-two-nodes">
      <div className="lesson-node lesson-patient"><span className="lesson-node-label">Le patient cherche</span><SeoMethodIcon kind="search" /><strong>implants dentaires<br />Gatineau</strong></div>
      <Connection />
      <div className="lesson-node lesson-page"><span className="lesson-node-label">La page étudiée</span><strong>Implants dentaires</strong><div className="lesson-page-lines"><i /><i /><i /></div><span className="lesson-node-status">{phase === 0 ? 'Une page dédiée au soin' : phase === 1 ? 'Le soin et la ville' : 'Une recherche → une page'}</span></div>
    </div>
    <span className="lesson-scene-label">{phase === 0 ? 'Ce qu’on observe chez la clinique étudiée' : phase === 1 ? 'La recherche du patient et le sujet de la page correspondent' : 'Choisir les recherches et les pages qui y répondent : la stratégie SEO'}</span>
  </div>;

  if (kind === 'technique') return <div className="lesson-scene lesson-reference-technical" data-phase={phase} aria-hidden="true">
    <div className="lesson-two-nodes">
      <div className="lesson-node lesson-reader"><span className="lesson-node-label">Pour être visible</span><SeoMethodIcon kind="search" /><strong>Google</strong><small>Explorer · Indexer</small></div>
      <Connection />
      <div className="lesson-node lesson-page"><span className="lesson-node-label">La page étudiée</span><strong>Du texte lisible</strong><div className="lesson-page-lines"><i /><i /><i /></div><span className="lesson-scan" /><span className="lesson-node-status">{phase === 0 ? 'Une page publique' : phase === 1 ? 'Des contrôles nécessaires' : 'Audit à compléter'}</span></div>
    </div>
    <span className="lesson-scene-label">{phase === 0 ? 'La page est consultable ; ce n’est pas un audit technique complet' : phase === 1 ? 'Contrôler ce que Google peut lire, puis l’indexation et le mobile' : 'La technique et la performance doivent être vérifiées, sans score inventé'}</span>
  </div>;

  if (kind === 'contenu') return <div className="lesson-scene lesson-reference-content" data-phase={phase} aria-hidden="true">
    <div className="lesson-two-nodes">
      <div className="lesson-node lesson-question-node"><span className="lesson-node-label">La question du patient</span><strong>« Que sont<br />les implants ? »</strong></div>
      <Connection />
      <div className="lesson-node lesson-page"><span className="lesson-node-label">Ce que sa page traite</span><div className="lesson-answers"><span>Définition</span><span>Avantages</span><span>Procédure</span></div><span className="lesson-node-status">{phase === 0 ? 'Des explications publiques' : phase === 1 ? 'Une réponse organisée' : 'Le contenu optimisé'}</span></div>
    </div>
    <span className="lesson-scene-label">{phase === 0 ? 'Trois sujets effectivement traités sur sa page' : phase === 1 ? 'Des titres et des explications pour comprendre le soin' : 'Les textes, les titres et les visuels constituent le contenu de la page'}</span>
  </div>;

  if (kind === 'maillage') return <div className="lesson-scene lesson-internal lesson-reference-internal" data-phase={phase} aria-hidden="true">
    <div className="lesson-site-boundary"><span className="lesson-boundary-label">Deux pages de la clinique étudiée</span><div className="lesson-page-network"><div className="lesson-small-page"><SeoMethodIcon kind="content" /><strong>Accueil</strong></div><span className="lesson-inner-link">→</span><div className="lesson-small-page"><SeoMethodIcon kind="content" /><strong>Implants</strong></div></div><div className="lesson-traveller"><span>Le lecteur</span><i /></div></div>
    <span className="lesson-scene-label">{phase === 0 ? 'Un lien de son accueil mène à la page sur les implants' : phase === 1 ? 'Ce chemin aide à découvrir la page et à poursuivre la lecture' : 'Un lien entre deux pages du même site : le maillage interne'}</span>
  </div>;

  if (kind === 'backlinks') return <div className="lesson-scene lesson-external" data-phase={phase} aria-hidden="true">
    <div className="lesson-two-nodes">
      <div className="lesson-node lesson-publisher"><span className="lesson-node-label">Un autre site</span><SeoMethodIcon kind="content" /><strong>Annuaire<br />dentaire</strong><small>hellodent.com</small></div>
      <Connection />
      <div className="lesson-node lesson-page"><span className="lesson-node-label">Son site</span><SeoMethodIcon kind="content" /><strong>Clinique<br />étudiée</strong><span className="lesson-node-status">{phase === 0 ? 'Un lien est présent' : phase === 1 ? 'Un chemin vers son site' : 'Un backlink'}</span></div>
    </div>
    <span className="lesson-external-tag">{phase === 0 ? 'Un lien observé sur une fiche d’annuaire publique' : phase === 1 ? 'Le lecteur peut passer de l’annuaire au site de la clinique' : 'La valeur SEO d’un lien dépend de son contexte ; aucun effet n’est chiffré ici'}</span>
  </div>;

  return <div className="lesson-scene lesson-measurement" data-phase={phase} aria-hidden="true">
    <div className="lesson-two-nodes">
      <div className="lesson-node lesson-data"><span className="lesson-node-label">Les données à mesurer</span><div className="lesson-metrics"><span><i>{phase === 0 ? '?' : '1'}</i>Vu sur Google</span><span><i>{phase === 0 ? '?' : '2'}</i>Clic vers le site</span><span><i>{phase === 0 ? '?' : '3'}</i>Contact suivi</span></div><small>Ses résultats sont privés</small></div>
      <Connection />
      <div className="lesson-node lesson-page"><span className="lesson-node-label">{phase === 0 ? 'Sur sa page' : phase === 1 ? 'Ce qu’on ignore' : 'Le pilier'}</span><SeoMethodIcon kind="analytics" /><strong>{phase === 0 ? 'Rendez-vous' : phase === 1 ? 'Les résultats' : 'Mesurer'}</strong><span className="lesson-node-status">{phase === 0 ? 'Un bouton de contact' : phase === 1 ? 'Un clic n’est pas un RDV' : 'Pour choisir la suite'}</span></div>
    </div>
    <span className="lesson-scene-label">{phase === 0 ? 'Le bouton est public ; ses résultats ne le sont pas' : phase === 1 ? 'Une position ne renseigne pas le nombre de rendez-vous obtenus' : 'Pour votre clinique, le bilan servira à choisir les prochaines actions'}</span>
  </div>;
}
