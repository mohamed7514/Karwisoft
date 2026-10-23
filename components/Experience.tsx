'use client';

import { createContext,useCallback,useContext,useEffect,useMemo,useRef,useState,type ComponentPropsWithoutRef,type ReactNode } from 'react';
import { frameIndex,frames,modelLabels,type Model } from '../lib/presentation';

type ExperienceState={
  presenting: boolean;
  index: number;
  goTo: (id: string,focus?: boolean) => void;
  model: Model|null;
  selectModel: (model: Model) => void;
};
const ExperienceContext=createContext<ExperienceState|null>(null);

export function useExperience() {
  const value=useContext(ExperienceContext);
  if(!value) throw new Error('ExperienceProvider is required');
  return value;
}

declare global {
  interface Window { karwisoftPresentation?: { goTo: (id: string) => void; }; }
}

export function ExperienceProvider({ children }: { children: ReactNode; }) {
  const [presenting,setPresenting]=useState(false);
  const [index,setIndex]=useState(0);
  const [model,setModel]=useState<Model|null>(null);
  const focusFrame=useRef<number|null>(null);

  const goTo=useCallback((id: string,focus=true) => {
    const next=frameIndex(id);
    if(next<0) return;
    setIndex(next);
    history.replaceState(history.state,'','?mode=presentation#'+frames[next][0]);
    window.scrollTo({ top: 0,behavior: 'instant' });
    if(focusFrame.current!==null) cancelAnimationFrame(focusFrame.current);
    if(focus) focusFrame.current=requestAnimationFrame(() => {
      const heading=document.getElementById(frames[next][0])?.querySelector<HTMLElement>('h2');
      if(heading) { heading.tabIndex=-1; heading.focus({ preventScroll: true }); }
    });
  },[]);

  useEffect(() => {
    function syncLocation() {
      const enabled=new URLSearchParams(location.search).get('mode')==='presentation';
      setPresenting(enabled);
      document.documentElement.classList.toggle('presenting',enabled);
      if(enabled) goTo(frameIndex(location.hash.slice(1))>=0? location.hash.slice(1):'intro-1',false);
    }
    syncLocation();
    addEventListener('popstate',syncLocation);
    addEventListener('hashchange',syncLocation);
    return () => {
      removeEventListener('popstate',syncLocation);
      removeEventListener('hashchange',syncLocation);
      document.documentElement.classList.remove('presenting');
      if(focusFrame.current!==null) cancelAnimationFrame(focusFrame.current);
    };
  },[goTo]);

  useEffect(() => {
    if(!presenting) return;
    window.karwisoftPresentation={ goTo };
    const abort=new AbortController();
    document.addEventListener('keydown',event => {
      const target=event.target;
      if(document.querySelector('dialog[open]')||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||
        (target instanceof Element&&target.closest('input, textarea, select, button, a, summary, [contenteditable]'))) return;
      const directions: Record<string,number>={ ArrowRight: 1,PageDown: 1,ArrowLeft: -1,PageUp: -1 };
      const next=event.key==='Home'? 0:event.key==='End'? frames.length-1:event.key in directions? Math.max(0,Math.min(frames.length-1,index+directions[event.key])):-1;
      if(next>=0) { event.preventDefault(); goTo(frames[next][0]); }
    },{ signal: abort.signal });
    document.addEventListener('click',event => {
      const anchor=event.target instanceof Element? event.target.closest<HTMLAnchorElement>('a[href^="#"]'):null;
      if(!anchor) return;
      const id=anchor.hash.slice(1);
      if(id==='main') { event.preventDefault(); goTo(frames[index][0]); }
      else if(frameIndex(id)>=0) { event.preventDefault(); goTo(id); }
    },{ signal: abort.signal });
    return () => { abort.abort(); delete window.karwisoftPresentation; };
  },[presenting,index,goTo]);

  const selectModel=useCallback((selected: Model) => {
    setModel(selected);
    if(presenting) goTo('suite');
    else document.getElementById('suite')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches? 'instant':'smooth' });
  },[presenting,goTo]);

  const value=useMemo(() => ({ presenting,index,goTo,model,selectModel }),[presenting,index,goTo,model,selectModel]);
  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

type FrameProps=ComponentPropsWithoutRef<'section'>&{ as?: 'section'|'article'; };
export function SlideFrame({ as: Tag='section',id,...props }: FrameProps) {
  const { presenting,index }=useExperience();
  return <Tag {...props} id={id} hidden={presenting&&frames[index][0]!==id} />;
}

type RegionProps=ComponentPropsWithoutRef<'div'>&{ region: 'story'|'journey'; as?: 'div'|'section'; };
export function ExperienceRegion({ region,as: Tag='div',...props }: RegionProps) {
  const { presenting,index }=useExperience();
  return <Tag {...props} hidden={presenting&&(region==='story'? index>=3:index<4||index>16)} />;
}

type ChromeProps=ComponentPropsWithoutRef<'div'>&{ as?: 'header'|'footer'|'section'|'div'; };
export function LandingChrome({ as: Tag='div',...props }: ChromeProps) {
  const { presenting }=useExperience();
  return <Tag {...props} hidden={presenting} />;
}

export function StoryControls() {
  const { presenting,goTo }=useExperience();
  return <div className="story-controls" role="group" aria-label="Scènes de l’introduction">
    {['il cherche, il compare, pourquoi vous ?','il compare ses options','pourquoi vous choisir'].map((label,index) =>
      <button key={label} type="button" data-story-go={index} aria-label={`Scène ${index+1} : ${label}`} aria-pressed={index===0}
        onClick={() => { if(presenting) goTo(frames[index][0]); }}><span>0{index+1}</span><i aria-hidden="true" /></button>)}
  </div>;
}

export function ModelCard({ model,children }: { model: Model; children: ReactNode; }) {
  const { model: selected }=useExperience();
  return <article className={'offer-card'+(selected===model? ' selected':'')} data-model={model}>{children}</article>;
}

export function ModelButton({ model }: { model: Model; }) {
  const { model: selected,selectModel }=useExperience();
  return <button type="button" className="button light model-button" data-model={model} data-model-label={modelLabels[model]} aria-pressed={selected===model} onClick={() => selectModel(model)}>Choisir cette formule <span aria-hidden="true">↗</span></button>;
}

export function SelectedModel() {
  const { model }=useExperience();
  return <p id="selected-model" aria-live="polite">{model? `Votre choix : formule ${modelLabels[model]} — gestion Google Ads selon votre budget publicitaire. Budget et honoraires à préciser ensemble.`:'Site premium + acquisition Google Ads.'}</p>;
}

export function ContactLink() {
  const { model }=useExperience();
  const subject=model? 'Projet clinique — Google Ads — formule '+modelLabels[model]:'Parlons de ma clinique';
  return <a className="button dark" id="contact-link" href={'mailto:Contact@Karwisoft.com?subject='+encodeURIComponent(subject)}>Parlons de votre clinique <span aria-hidden="true">↗</span></a>;
}
