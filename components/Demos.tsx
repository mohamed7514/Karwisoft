'use client';

import { useEffect,useRef,useState,type CSSProperties } from 'react';
import { useExperience } from './Experience';

const questions=[
  ['Qu’aimeriez-vous explorer ?',['Implants dentaires','Alignement','Esthétique du sourire']],
  ['Quand souhaitez-vous en parler ?',['Dès que possible','Dans les prochains mois','Je me renseigne']],
  ['Un budget envisagé ?',['À définir avec la clinique','Une fourchette à préciser','Je préfère en parler']],
  ['Quel moment vous conviendrait ?',['Un matin cette semaine','Un après-midi prochainement','Être rappelé pour choisir']],
] as const;

export function IntakeQuiz() {
  const [answers,setAnswers]=useState<string[]>([]);
  const heading=useRef<HTMLHeadingElement>(null);
  const focusAfterAnswer=useRef(false);
  const step=answers.length;
  useEffect(() => { if(focusAfterAnswer.current) heading.current?.focus({ preventScroll: true }); },[step]);
  function update(next: string[]) { focusAfterAnswer.current=true; setAnswers(next); }
  return <>
    <div className="quiz-progress"><span id="quiz-step">{step<4? String(step+1).padStart(2,'0')+' / 04':'DEMANDE PRÉPARÉE'}</span><button className="text-button" type="button" id="quiz-reset" onClick={() => update([])}>Recommencer ↺</button></div>
    <div id="quiz-content" aria-live="polite"><h3 ref={heading} tabIndex={-1}>{step<4? questions[step][0]:'Votre demande est préparée.'}</h3>
      {step<4? <div className="quiz-options">{questions[step][1].map(answer => <button key={answer} type="button" onClick={() => update([...answers,answer])}>{answer} ↗</button>)}</div>:
        <p className="quiz-complete">{answers.join(' · ')}. La réception vérifie la disponibilité et confirme ensuite. Rien n’a été transmis dans cette simulation.</p>}
    </div>
  </>;
}

export function SmileComparison() {
  const [split,setSplit]=useState(50);
  return <>
    <div className="smile-compare" style={{ '--split': split+'%' } as CSSProperties}>
      <img src="/assets/smile-final.webp" alt="Sourire illustratif après transformation" />
      <div className="compare-before"><img src="/assets/smile-before.webp" alt="Sourire illustratif initial" /></div>
      <span className="compare-line" aria-hidden="true">↔</span><span className="compare-label">Illustration</span>
    </div>
    <label className="range-label" htmlFor="smile-range">Comparer les deux illustrations</label>
    <input id="smile-range" type="range" min="0" max="100" value={split} onChange={event => setSplit(Number(event.target.value))} onInput={event => setSplit(Number(event.currentTarget.value))} />
  </>;
}

const hotspots={
  design: ['Le design','Une image immersive et une typographie soignée donnent une première impression cohérente avec une clinique attentive.'],
  message: ['Le message','Le plaisir de sourire, à nouveau. Le titre parle du souhait du patient avant d’expliquer les soins.'],
  confiance: ['La confiance','Une animation illustrative, une limite clairement indiquée et une suite simple : le patient comprend ce qu’il regarde.'],
} as const;

export function HeroHotspots() {
  const [selected,setSelected]=useState<keyof typeof hotspots|null>(null);
  return <><div className="hotspots" aria-label="Pourquoi ce hero ?">{(Object.keys(hotspots) as (keyof typeof hotspots)[]).map((key,index) =>
    <button key={key} type="button" data-hotspot={key} aria-expanded={selected===key} aria-controls="hotspot-detail" onClick={() => setSelected(selected===key? null:key)}>0{index+1} <span>{hotspots[key][0]}</span> +</button>)}</div>
    <p id="hotspot-detail" className="hotspot-detail" aria-live="polite">{selected? hotspots[selected][1]:'Cliquez sur un point pour découvrir l’intention derrière le détail.'}</p></>;
}

export function BranchChoice() {
  const [branch,setBranch]=useState<string|null>(null);
  return <><div className="choice-buttons">
    <button type="button" data-branch="urgence" aria-pressed={branch==='urgence'} onClick={() => setBranch('urgence')}>J’ai une urgence <span>↗</span></button>
    <button type="button" data-branch="consultation" aria-pressed={branch==='consultation'} onClick={() => setBranch('consultation')}>Je prépare une consultation <span>↗</span></button>
  </div><p id="branch-result" aria-live="polite">{branch==='urgence'? 'Urgence → téléphone de la clinique immédiatement accessible. Les photos et le quiz ne bloquent pas le contact.':branch==='consultation'? 'Consultation → photos facultatives, mini-quiz, puis préférence de rendez-vous. Suivez les prochaines diapositives.':'Choisissez un parcours pour voir la suite.'}</p></>;
}

export function ReplaySmile() {
  const { presenting }=useExperience();
  const [reduced,setReduced]=useState(true);
  const [playing,setPlaying]=useState(false);
  const timeline=useRef<gsap.core.Timeline|null>(null);
  const mounted=useRef(false);
  const context=useRef<gsap.Context|null>(null);
  useEffect(() => {
    mounted.current=true;
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const sync=() => setReduced(media.matches);
    sync(); media.addEventListener('change',sync);
    return () => { mounted.current=false; media.removeEventListener('change',sync); timeline.current?.kill(); context.current?.revert(); };
  },[]);
  async function replay() {
    setPlaying(true);
    const { gsap }=await import('gsap');
    if(!mounted.current) return;
    context.current?.revert();
    context.current=gsap.context(() => {
      timeline.current=gsap.timeline({ onComplete: () => { if(mounted.current) setPlaying(false); } })
        .set('.demo-before, .demo-patches',{ opacity: 1 })
        .set('.demo-tooth-left, .demo-tooth-right',{ attr: { height: 0 } })
        .to('.demo-tooth-left',{ attr: { height: 235 },duration: .7,ease: 'power1.inOut' },.35)
        .to('.demo-tooth-right',{ attr: { height: 235 },duration: .7,ease: 'power1.inOut' },.65)
        .to('.demo-before',{ opacity: 0,duration: .8 },1.15)
        .to('.demo-patches',{ opacity: 0,duration: .3 },1.9);
    });
  }
  return presenting&&!reduced? <button type="button" className="replay-smile" disabled={playing} onClick={replay}>Rejouer la transformation illustrative ↻</button>:null;
}
