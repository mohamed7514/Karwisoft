'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { seoQuickLessons, SEO_QUICK_COUNT, SEO_QUICK_DURATION_MS } from '../lib/seo-five-minute';
import type { SeoQuizQuestion } from '../lib/seo-quiz';
import { SeoMethodIcon } from './SeoMethodIcon';
import { useSeoLearning } from './SeoLearningProvider';
import { SeoPyramidGame } from './SeoPyramidGame';
import { pyramidTierStyle } from './SeoSignalPyramid';

function goToLesson(index: number) {
  const element = document.getElementById(index < SEO_QUICK_COUNT ? `seo-quick-${seoQuickLessons[index].id}` : 'seo-pyramid-game');
  element?.focus({ preventScroll: true });
  (element?.closest('.seo-guided-pillar') ?? element)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
}

function Question({ question, index, onAnswer }: { question: SeoQuizQuestion; index: number; onAnswer: (index: number, choice: number) => void }) {
  const [choice, setChoice] = useState<number | null>(null);
  const { ready, started } = useSeoLearning();
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (ready && started && choice !== null) onAnswer(index, choice);
  }
  return <form className="seo-task-quiz" onSubmit={submit}>
    <fieldset disabled={!ready || !started}>
      <legend><span>À vous</span>{question.prompt}</legend>
      <div className="seo-quiz-options">{question.options.map((option, optionIndex) => <label key={option} data-selected={choice === optionIndex}>
        <input type="radio" name={`seo-question-${index}`} value={optionIndex} checked={choice === optionIndex} onChange={() => setChoice(optionIndex)} /><span>{option}</span>
      </label>)}</div>
    </fieldset>
    <div className="seo-quiz-submit"><button type="submit" disabled={!ready || !started || choice === null}>Répondre et continuer <span aria-hidden="true">→</span></button></div>
  </form>;
}

export function SeoLearningJourney() {
  const { answers, ready, started, elapsedMs, answer, reset, complete, percentage } = useSeoLearning();
  const feedbackToFocus = useRef<number | null>(null);
  const questionsComplete = answers.length === SEO_QUICK_COUNT;

  useEffect(() => {
    if (feedbackToFocus.current === null) return;
    document.getElementById(`seo-feedback-${feedbackToFocus.current}`)?.focus({ preventScroll: true });
    feedbackToFocus.current = null;
  }, [answers.length]);

  function respond(index: number, choice: number) {
    feedbackToFocus.current = index;
    answer(index, choice);
  }
  function restart() {
    reset();
    requestAnimationFrame(() => {
      const button = document.getElementById('seo-ready-button');
      button?.focus({ preventScroll: true });
      document.getElementById('comprendre-seo')?.scrollIntoView({ behavior: 'instant' });
    });
  }

  return <div className="seo-guided-learning" data-ready={ready} aria-busy={!ready}>
    <div className="seo-learning-dashboard">
      <div><p className="seo-learning-counter"><strong>{answers.length}<span> / {SEO_QUICK_COUNT}</span></strong> questions parcourues <span className="seo-learning-percent">{percentage} %</span></p><p>{!ready ? 'Chargement…' : 'Un rafraîchissement remet le parcours à zéro.'}</p></div>
      {ready && answers.length > 0 && !complete && <button type="button" className="seo-resume" onClick={() => goToLesson(answers.length)}>{questionsComplete ? 'Aller à la pyramide' : `Aller à la question ${answers.length + 1}`} <span aria-hidden="true">↓</span></button>}
      {ready && answers.length > 0 && <details className="seo-learning-reset"><summary>Recommencer</summary><p>Votre progression et le chronomètre repartiront de zéro.</p><button type="button" onClick={restart}>Recommencer le parcours</button></details>}
    </div>
    {started && !complete && elapsedMs >= SEO_QUICK_DURATION_MS && <p className="seo-time-elapsed" role="status">Les 5 minutes sont écoulées. Vous pouvez terminer à votre rythme.</p>}
    <div className="seo-work-grid">
      {seoQuickLessons.map((lesson, index) => {
        const unlocked = index <= answers.length;
        const done = index < answers.length;
        const question = lesson.question;
        const correct = done && answers[index] === question.correct;
        return <article className="seo-work-pillar seo-guided-pillar seo-signal-lesson" style={pyramidTierStyle(index, lesson.color)} data-state={done ? 'complete' : unlocked ? 'current' : 'locked'} id={`pilier-${lesson.id}`} key={lesson.id} aria-labelledby={`pilier-${lesson.id}-title`}>
          <header><span className="seo-work-icon"><SeoMethodIcon kind={lesson.icon} /></span><h3 id={`pilier-${lesson.id}-title`}><span>{index + 1}.</span> {lesson.name}</h3><span className="seo-pillar-count">{done ? '✓' : `${index + 1} / ${SEO_QUICK_COUNT}`}<span className="seo-visually-hidden"> {done ? 'Dimension parcourue' : 'Dimensions'}</span></span></header>
          {!unlocked ? <div className="seo-task-locked"><div className="seo-task-blur" aria-hidden="true" inert><strong>{lesson.title}</strong><p><b>Pourquoi ?</b> {lesson.why}</p><p><b>Comment ?</b> {lesson.how}</p></div><p className="seo-task-lock-label"><span aria-hidden="true">◇</span>Répondez au pilier précédent pour découvrir celui-ci.</p></div> : <section className="seo-guided-task" data-state={done ? 'answered' : 'active'} id={`seo-quick-${lesson.id}`} tabIndex={-1} aria-labelledby={`seo-quick-${lesson.id}-title`}>
            <h4 id={`seo-quick-${lesson.id}-title`}>{lesson.title}</h4>
            <dl className="seo-task-explanation"><div><dt>Pourquoi ?</dt><dd>{lesson.why}</dd></div><div><dt>Comment ?</dt><dd>{lesson.how}</dd></div></dl>
            <div className="seo-work-observation"><p><strong>Chez cette clinique :</strong> {lesson.observed} <a href={lesson.source.href} target="_blank" rel="noreferrer" aria-label={`${lesson.source.label} (nouvel onglet)`}>Voir <span aria-hidden="true">↗</span></a></p></div>
            {done ? <div className="seo-answer-feedback" id={`seo-feedback-${index}`} tabIndex={-1}>
              <p className="seo-feedback-heading">{correct ? 'Oui, c’est l’idée.' : 'Le repère à retenir'}</p>
              {!correct && <p className="seo-answer-choice">Votre réponse : {question.options[answers[index]]}.</p>}
              <p><strong>{question.options[question.correct]}.</strong> {question.explanation}</p>
              {index === answers.length - 1 && !complete && <button type="button" className="seo-next-task" onClick={() => goToLesson(index + 1)}>{questionsComplete ? 'Reconstruire la pyramide' : 'Découvrir la dimension suivante'} <span aria-hidden="true">↓</span></button>}
            </div> : <Question key={index} question={question} index={index} onAnswer={respond} />}
          </section>}
        </article>;
      })}
    </div>
    {questionsComplete && <SeoPyramidGame />}
    {complete && <div className="seo-learning-finished" id="seo-learning-finished" tabIndex={-1}><span aria-hidden="true">✓</span><div><h3>Observé. Compris. Reconstruit.</h3><p>Vous avez parcouru les six dimensions et reconstitué le modèle. Passons à votre clinique : quoi reprendre, créer et améliorer ?</p><a href="#reprendre-ameliorer">Passer à la comparaison <span aria-hidden="true">→</span></a></div></div>}
    <span className="seo-visually-hidden" role="status" aria-live="polite">{ready && started && (complete ? 'Mini-leçon terminée. Pyramide reconstruite. 100 %.' : questionsComplete ? 'Six questions parcourues. Le défi de la pyramide est disponible.' : `${answers.length} questions parcourues sur ${SEO_QUICK_COUNT}. Question ${answers.length + 1} disponible.`)}</span>
  </div>;
}
