'use client';

import { useEffect,useRef,useState } from 'react';
import { frames } from '../lib/presentation';
import { useExperience } from './Experience';

export function PresentationControls() {
  const { presenting,index,goTo }=useExperience();
  const overview=useRef<HTMLDialogElement>(null);
  const [fullscreenAvailable,setFullscreenAvailable]=useState(false);
  const [fullscreen,setFullscreen]=useState(false);
  useEffect(() => {
    setFullscreenAvailable(typeof document.documentElement.requestFullscreen==='function');
    const update=() => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange',update);
    return () => document.removeEventListener('fullscreenchange',update);
  },[]);

  async function toggleFullscreen() {
    try {
      if(document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch { setFullscreenAvailable(false); }
  }

  return <>
    <div className="present-top" hidden={!presenting}><a className="brand" href="?" aria-label="Karwisoft, retour au site">karwisoft<span>marketing</span></a><span>Le parcours de votre prochain patient</span><a id="leave-presentation" href={'?#'+(index<3? 'accueil':frames[index][0])}>Retour au site ↗</a></div>
    <nav className="present-controls" aria-label="Commandes de présentation" hidden={!presenting}>
      <button id="present-prev" type="button" aria-label="Diapositive précédente" disabled={index===0} onClick={() => goTo(frames[index-1][0])}>←</button>
      <button id="present-overview" type="button" aria-haspopup="dialog" onClick={() => overview.current?.showModal()}>Sommaire</button>
      <span id="present-position" role="status" aria-live="polite">{String(index+1).padStart(2,'0')} / {frames.length}</span>
      <button id="present-fullscreen" type="button" aria-label={fullscreen? 'Quitter le plein écran':'Afficher en plein écran'} hidden={!fullscreenAvailable} onClick={toggleFullscreen}>⛶</button>
      <button id="present-next" type="button" aria-label="Diapositive suivante" disabled={index===frames.length-1} onClick={() => goTo(frames[index+1][0])}>→</button>
    </nav>
    <dialog ref={overview} id="presentation-overview" aria-labelledby="overview-title" onClick={event => {
      if(event.target!==event.currentTarget) return;
      const r=event.currentTarget.getBoundingClientRect();
      if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) overview.current?.close();
    }}>
      <div className="overview-heading"><div><p className="eyebrow">À votre rythme</p><h2 id="overview-title">Le fil de la présentation.</h2></div><button id="overview-close" type="button" aria-label="Fermer le sommaire" onClick={() => overview.current?.close()}>×</button></div>
      <div id="overview-items">{frames.map(([id,label],i) => <button key={id} type="button" data-present-go={i} aria-current={i===index? 'step':'false'} onClick={() => { overview.current?.close(); goTo(id); }}><span>{String(i+1).padStart(2,'0')}</span>{label}</button>)}</div>
    </dialog>
  </>;
}

export function JourneyNavigation() {
  const { presenting }=useExperience();
  const [active,setActive]=useState(0);
  const [visible,setVisible]=useState(false);
  const slides=useRef<HTMLElement[]>([]);
  useEffect(() => {
    if(presenting) return;
    slides.current=[...document.querySelectorAll<HTMLElement>('[data-deck]')];
    let scheduled=0;
    function update() {
      scheduled=0;
      const index=slides.current.findIndex(slide => { const r=slide.getBoundingClientRect(); return r.top<=innerHeight*.45&&r.bottom>innerHeight*.45; });
      if(index>=0) setActive(index);
      setVisible(slides.current[0].getBoundingClientRect().top<innerHeight*.75&&(document.getElementById('offre')?.getBoundingClientRect().top??0)>innerHeight*.25);
    }
    const schedule=() => { if(!scheduled) scheduled=requestAnimationFrame(update); };
    addEventListener('scroll',schedule,{ passive: true });
    addEventListener('resize',schedule);
    update();
    return () => { removeEventListener('scroll',schedule); removeEventListener('resize',schedule); cancelAnimationFrame(scheduled); };
  },[presenting]);
  const go=(direction: number) => slides.current[Math.max(0,Math.min(slides.current.length-1,active+direction))]?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches? 'instant':'smooth' });
  return <nav className={'deck-nav'+(visible&&!presenting? ' is-visible':'')} aria-label="Navigation dans la présentation" hidden={presenting} inert={!visible||presenting}>
    <button type="button" id="deck-prev" aria-label="Diapositive précédente" disabled={active===0} onClick={() => go(-1)}>↑</button>
    <span id="deck-position">{String(active+1).padStart(2,'0')} / 13</span>
    <button type="button" id="deck-next" aria-label="Diapositive suivante" disabled={active===12} onClick={() => go(1)}>↓</button><a href="#offre">L’offre ↗</a>
  </nav>;
}
