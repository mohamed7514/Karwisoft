'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { seoQuickLessons, SEO_QUICK_COUNT, SEO_QUICK_DURATION_MS } from '../lib/seo-five-minute';
import { useSeoLearning } from './SeoLearningProvider';
import { SeoSignalPyramid } from './SeoSignalPyramid';

export function formatSeoTime(milliseconds: number) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}

export function SeoLearningTimer() {
  const { started, elapsedMs, complete } = useSeoLearning();
  if (!started) return null;
  const overBudget = elapsedMs >= SEO_QUICK_DURATION_MS;
  return <span className="seo-learning-timer" role="timer" aria-live="off" aria-label={complete ? overBudget ? 'Parcours terminé après les cinq minutes' : 'Durée du parcours' : 'Temps restant pour le parcours'}><span>{complete ? overBudget ? 'Terminé' : 'Terminé en' : 'Temps restant'}</span><strong>{complete && overBudget ? '5 min +' : formatSeoTime(complete ? elapsedMs : SEO_QUICK_DURATION_MS - elapsedMs)}</strong></span>;
}

export function SeoJourneyGate({ children }: { children: ReactNode }) {
  const { ready, started, start, answers, complete } = useSeoLearning();
  const [declined, setDeclined] = useState(false);
  const [moveToLesson, setMoveToLesson] = useState(false);

  useEffect(() => {
    if (!started || !moveToLesson) return;
    const lesson = seoQuickLessons[Math.min(answers.length, SEO_QUICK_COUNT - 1)];
    const target = document.getElementById(complete ? 'seo-learning-finished' : answers.length === SEO_QUICK_COUNT ? 'seo-pyramid-game' : `seo-quick-${lesson.id}`);
    target?.focus({ preventScroll: true });
    (target?.closest('.seo-guided-pillar') ?? target)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    setMoveToLesson(false);
  }, [started, moveToLesson, answers.length, complete]);

  function begin() {
    setMoveToLesson(true);
    start();
  }

  return <div className="seo-five-minute-path" data-ready={ready} data-started={started}>
    <section className="seo-ready-section" id="comprendre-seo" aria-labelledby="seo-ready-title">
      <div className="wrap">
        {!started ? <div className="seo-ready-card seo-ready-pyramid-card">
          <div className="seo-ready-copy"><p className="method-kicker">Observer → Comprendre → Reconstruire</p><h2 id="seo-ready-title"><em>5 minutes suffisent</em><br />pour comprendre le SEO.</h2><p>Le SEO aide les patients à trouver votre clinique dans les résultats non payants de Google. Partons d’une recherche réelle : que possède cette clinique et pourquoi cela peut-il l’aider à être trouvée ?</p></div>
          <SeoSignalPyramid />
          <div className="seo-ready-bottom"><p className="seo-ready-instruction">Prêt ? Le chronomètre couvre les questions et le jeu final.</p><div className="seo-ready-actions"><button id="seo-ready-button" type="button" className="sv-btn-primary" disabled={!ready} onClick={begin}>{!ready ? 'Un instant…' : 'Prêt, on commence'} <span aria-hidden="true">→</span></button><button type="button" className="seo-not-ready" onClick={() => setDeclined(true)}>Pas maintenant</button></div><p className="seo-ready-reassurance" role="status">{declined ? 'Aucun souci. Le chronomètre attend : commencez quand vous êtes prêt.' : 'Chaque réponse ouvre la suite avec une explication. Si vous actualisez la page, le parcours repart de zéro.'}</p></div>
        </div> : <h2 className="seo-visually-hidden" id="seo-ready-title">Comprendre le SEO en cinq minutes</h2>}
      </div>
    </section>
    <div className="seo-gated-content" hidden={!started}>{children}</div>
    <noscript><style>{'.seo-ready-bottom { display: none !important; } .seo-gated-content[hidden] { display: block !important; }'}</style></noscript>
  </div>;
}
