'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { seoLearningPillars } from '../lib/seo-learning';
import { seoLessons } from '../lib/seo-lessons';
import { SeoLessonScene } from './SeoLessonScene';

const sceneLabels = ['On observe', 'On comprend', 'Le pilier'];
const SCENE_DURATION = 8000;
const pillarLabels = ['Stratégie', 'Contenu', 'Liens internes', 'Backlinks', 'Technique', 'Mesure'];

export function SeoPillarExplorer() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [motionPaused, setMotionPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [run, setRun] = useState(0);
  const canvas = useRef<HTMLDivElement>(null);
  const narration = useRef<HTMLDivElement>(null);
  const id = useId();
  const lesson = seoLessons[active];
  const detail = seoLearningPillars.find(pillar => pillar.id === lesson.id)!;
  const scene = lesson.scenes[phase];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    function update() {
      setReducedMotion(preference.matches);
      if (preference.matches) setPlaying(false);
    }
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    let canvasVisible = false;
    let narrationVisible = false;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === canvas.current) canvasVisible = entry.isIntersecting && entry.intersectionRatio >= .6;
        if (entry.target === narration.current) narrationVisible = entry.isIntersecting && entry.intersectionRatio >= .2;
      }
      setVisible(canvasVisible && narrationVisible);
    }, { threshold: [0, .2, .6] });
    if (canvas.current) observer.observe(canvas.current);
    if (narration.current) observer.observe(narration.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible || reducedMotion) return;
    const timer = window.setTimeout(() => {
      if (phase < 2) setPhase(previous => Math.min(previous + 1, 2));
      else setPlaying(false);
    }, SCENE_DURATION);
    return () => window.clearTimeout(timer);
  }, [active, phase, playing, visible, reducedMotion, run]);

  function selectLesson(next: number) {
    setActive(next);
    setPhase(0);
    setPlaying(!reducedMotion);
    setMotionPaused(false);
    setRun(previous => previous + 1);
  }

  function selectPhase(next: number) {
    setPhase(next);
    setPlaying(false);
    setMotionPaused(false);
  }

  function togglePlayback() {
    if (playing) { setPlaying(false); setMotionPaused(true); return; }
    if (phase === 2) { setPhase(0); setRun(previous => previous + 1); }
    setPlaying(true);
    setMotionPaused(false);
  }

  return <>
    <div className="seo-pillar-map" role="group" aria-label="Les six piliers du SEO : choisissez une démonstration">{seoLessons.map((item, index) => <button key={item.id} type="button" aria-pressed={active === index} aria-controls="seo-demonstration" onClick={() => selectLesson(index)}><span>0{index + 1}</span>{pillarLabels[index]}</button>)}</div>
    <div className="seo-lesson" id="seo-demonstration">
      <div className="lesson-selector">
        <div className="lesson-current"><span>0{active + 1} / 06</span><strong>{lesson.label}</strong></div><button type="button" className="lesson-previous" aria-label="Pilier précédent" disabled={active === 0} onClick={() => selectLesson(active - 1)}>←</button>
      </div>
      <div className="lesson-phase-nav" role="group" aria-label="Les trois temps de la démonstration">{sceneLabels.map((label, index) => <button type="button" key={label} aria-pressed={phase === index} aria-controls={`${id}-scene`} onClick={() => selectPhase(index)}><span>{index + 1}</span>{label}</button>)}</div>
      <div className="lesson-canvas" ref={canvas} id={`${id}-scene`} data-running={!motionPaused && visible && !reducedMotion} data-visible={visible}>
        <SeoLessonScene key={`${lesson.id}-${run}`} kind={lesson.id} phase={phase} />
      </div>
      <div className="lesson-narration" ref={narration} aria-live={playing ? 'off' : 'polite'} aria-atomic="true"><h3>{scene.title}</h3><p>{scene.explanation}</p></div>
      <div className="lesson-player-controls">
        {reducedMotion ? <span className="lesson-manual-note">Lecture à votre rythme</span> : <button type="button" className="lesson-play" onClick={togglePlayback} aria-label={playing ? 'Mettre la démonstration en pause' : phase === 2 ? 'Rejouer cette démonstration' : 'Lire la démonstration'}><span aria-hidden="true">{playing ? 'Ⅱ' : phase === 2 ? '↻' : '▶'}</span>{playing ? 'Pause' : phase === 2 ? 'Revoir' : 'Lire'}</button>}
        <span className="lesson-phase-counter">{phase + 1} / 3</span>
        {phase < 2 ? <button type="button" className="lesson-next" onClick={() => selectPhase(phase + 1)}>Voir la suite <span aria-hidden="true">→</span></button> : active < seoLessons.length - 1 ? <button type="button" className="lesson-next" onClick={() => selectLesson(active + 1)}>Pilier suivant <span aria-hidden="true">→</span></button> : <a className="lesson-next" href="#reprendre-ameliorer">Comparer les cliniques <span aria-hidden="true">→</span></a>}
      </div>
    </div>
    <div className="lesson-followup"><div className="lesson-source"><span>{lesson.source.status}</span><a href={lesson.source.href} target="_blank" rel="noreferrer">{lesson.source.label} <span aria-hidden="true">↗</span></a></div><span>Schémas simplifiés de la lecture des sources. La première position et la cause exacte du classement ne sont pas établies par ces observations.</span><details key={lesson.id} onToggle={event => { if (event.currentTarget.open) { setPlaying(false); setMotionPaused(true); } }}><summary>Et pour votre clinique : le travail et le livrable <span aria-hidden="true">+</span></summary><div className="lesson-work-detail"><p><strong>{lesson.term}.</strong> {detail.definition}</p><dl><div><dt>Pourquoi</dt><dd>{detail.why}</dd></div><div><dt>Comment</dt><dd>{detail.how}</dd></div><div><dt>Votre livrable</dt><dd>{detail.delivery}</dd></div><div><dt>La valeur pour vous</dt><dd>{detail.takeaway}</dd></div></dl></div></details></div>
    <noscript><style>{'.seo-pillar-map,.seo-lesson,.lesson-followup{display:none}'}</style><div className="method-nojs">{seoLessons.map(lesson => { const pillar = seoLearningPillars.find(item => item.id === lesson.id)!; return <article key={pillar.id}><h3>{pillar.name}</h3>{lesson.scenes.map(scene => <p key={scene.title}><strong>{scene.title} </strong>{scene.explanation}</p>)}<p><a href={lesson.source.href}>{lesson.source.label}</a> — {lesson.source.status}. La première position n’est pas établie par cette lecture.</p><p>{pillar.definition}</p><p><strong>Pourquoi : </strong>{pillar.why}</p><p><strong>Comment : </strong>{pillar.how}</p><p><strong>Vous recevez : </strong>{pillar.delivery}</p><p><strong>La valeur : </strong>{pillar.takeaway}</p></article>; })}</div></noscript>
  </>;
}
