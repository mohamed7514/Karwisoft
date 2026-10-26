'use client';

import { useId, useState } from 'react';

const steps = [
  {
    label: 'Observer', title: 'Ce qu’on reprend du premier.',
    explanation: 'On reprend le principe : une page par soin, des questions utiles et des liens pour y accéder.',
    decision: 'À reprendre : le bon sujet, une structure claire et des chemins vers la page.',
    proof: 'Un comparatif annoté : recherche étudiée, pages observées, différences et sources. Le contenu présenté ici est une maquette, sans constat sur une clinique réelle.',
  },
  {
    label: 'Reproduire', title: 'Les mêmes bases. Votre propre réponse.',
    explanation: 'On construit votre version : vos textes validés, vos visuels et vos liens. Puis on vérifie la lecture par Google.',
    decision: 'À produire : vos textes, vos visuels, vos liens et des corrections vérifiées.',
    proof: 'Un brief, des contenus validés, la page publiée, les liens ajoutés et les contrôles techniques. Les pages et volumes sont définis avant le sprint.',
  },
  {
    label: 'Ajouter', title: 'Ce qu’on ajoute pour viser mieux.',
    explanation: 'On répond à « Que préparer pour la visite ? », ajoute un schéma validé et propose la ressource à des éditeurs.',
    decision: 'En plus des bases : réponses originales, diffusion et suivi des résultats.',
    proof: 'Les ajouts validés et publiés, les propositions éditoriales et les liens obtenus. Le suivi des recherches, visites et contacts sert à décider de la suite. Un éditeur reste libre de publier.',
  },
] as const;

/** An illustrative worked example, never a fabricated audit or ranking forecast. */
export function SeoCompetitiveLab() {
  const [active, setActive] = useState(0);
  const id = useId();
  const step = steps[active];

  return <>
    <div className="seo-lab" data-step={active}>
      <div className="seo-lab-nav" role="group" aria-label="Du concurrent au plan d’action">
        {steps.map((item, index) => <button type="button" key={item.label} aria-pressed={active === index} aria-controls={`${id}-example`} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.label}</button>)}
      </div>
      <div className="seo-lab-query"><span>Une même recherche</span><strong>implants dentaires Gatineau</strong></div>
      <div className="seo-lab-stage" id={`${id}-example`}>
        <div className="seo-lab-pages">
          <figure className="seo-lab-reference">
            <figcaption>La référence à étudier</figcaption>
            <div className="seo-lab-page">
              <div className="seo-lab-browser" aria-hidden="true"><i /><i /><i /></div>
              <img src="/assets/consultation-800.webp" alt="" width="800" height="533" loading="lazy" />
              <div className="seo-lab-page-body"><strong className="seo-lab-page-title">Implants dentaires</strong><ul><li>Le soin expliqué</li><li>Les étapes</li><li>Le contact</li></ul><span className="seo-lab-page-link">Les soins → Implants</span></div>
            </div>
          </figure>
          <span className="seo-lab-transfer" aria-hidden="true">→</span>
          <figure className="seo-lab-own">
            <figcaption>{active === 0 ? 'Votre point de départ' : active === 1 ? 'Votre page se construit' : 'Votre page enrichie'}</figcaption>
            <div className="seo-lab-page">
              <div className="seo-lab-browser" aria-hidden="true"><i /><i /><i /></div>
              <img src="/assets/dentist-800.webp" alt="" width="800" height="533" loading="lazy" />
              <div className="seo-lab-page-body"><strong className="seo-lab-page-title">{active === 0 ? 'Tous nos soins' : 'Implants dentaires'}</strong>
                <ul key={active} className="seo-lab-work">
                  {active === 0 ? <><li>Nos soins de qualité</li><li className="seo-lab-missing">Peu d’explications</li><li className="seo-lab-missing">Page peu reliée</li></> : active === 1 ? <><li>Vos explications</li><li>Vos étapes</li><li>Votre consultation</li></> : <><li>Préparer la visite</li><li className="seo-lab-original">Schéma de visite <span className="seo-lab-schema" aria-hidden="true"><i /><i /><i /></span></li><li>Validé par l’équipe</li></>}
                </ul>
                <span className="seo-lab-page-link">{active === 0 ? 'Des chemins à créer' : 'Vos soins → Implants'}</span>
              </div>
            </div>
          </figure>
        </div>
        <div className="seo-lab-diffusion" data-visible={active === 2} aria-hidden={active !== 2}><span>Votre ressource</span><span className="seo-lab-pitch" aria-hidden="true">→</span><span>Proposition à un éditeur</span></div>
      </div>
      <div className="seo-lab-comment" aria-live="polite" aria-atomic="true"><h3>{step.title}</h3><p>{step.explanation}</p><p className="seo-lab-decision">{step.decision}</p></div>
      <div className="seo-lab-controls"><button type="button" aria-label="Décision précédente" disabled={active === 0} onClick={() => setActive(active - 1)}>←</button><span>{active + 1} / 3</span>{active < 2 ? <button type="button" className="seo-lab-next" onClick={() => setActive(active + 1)}>{active === 0 ? 'Construire notre version' : 'Ajouter un avantage'} <span aria-hidden="true">→</span></button> : <a className="seo-lab-next" href="#plan-seo">Organiser les sprints <span aria-hidden="true">→</span></a>}</div>
    </div>
    <div className="seo-lab-caption"><p>Maquettes et photos d’illustration. Des ajouts utiles créent des pistes de travail ; ils ne garantissent pas de dépasser un concurrent.</p><details key={active} className="seo-lab-proof"><summary>Ce que vous recevez à ce stade <span aria-hidden="true">+</span></summary><p>{step.proof}</p></details></div>
    <noscript><style>{'.seo-lab,.seo-lab-caption{display:none}'}</style><ol className="method-nojs">{steps.map(item => <li key={item.label}><h3>{item.title}</h3><p>{item.explanation}</p><p>{item.decision}</p><p>Livrable : {item.proof}</p></li>)}</ol></noscript>
  </>;
}
