'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { seoPyramidLevels, seoReferenceSearch, seoReferenceEvidence, type SeoSignalId } from '../lib/seo-pyramid';
import { SeoMethodIcon } from './SeoMethodIcon';

export function pyramidTierStyle(index: number, color: string): CSSProperties {
  return { '--tier-width': `${40 + index * 12}%`, '--tier-inset': `${6 / (.4 + index * .12)}%`, '--signal-color': color } as CSSProperties;
}

export function SeoSignalPyramid() {
  const [active, setActive] = useState<SeoSignalId>('pertinence');
  const [buildState, setBuildState] = useState<'static' | 'waiting' | 'building' | 'complete'>('static');
  const [buildKey, setBuildKey] = useState(0);
  const [canAnimate, setCanAnimate] = useState(false);
  const rowsRef = useRef<HTMLOListElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasStarted = useRef(false);
  const activeSignal = seoPyramidLevels.find(signal => signal.id === active)!;

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    function updateMotion() {
      setCanAnimate(!media.matches);
      if (media.matches) {
        hasStarted.current = true;
        observerRef.current?.disconnect();
        setBuildState('complete');
      }
    }
    updateMotion();
    const rows = rowsRef.current;
    let resize: ResizeObserver | null = null;
    let observe = () => {};
    if (!media.matches && rows && 'IntersectionObserver' in window) {
      setBuildState('waiting');
      observe = () => {
        if (hasStarted.current || media.matches) return;
        observerRef.current?.disconnect();
        const available = Math.max(1, window.innerHeight - 164);
        const threshold = Math.max(.1, Math.min(.9, available / Math.max(1, rows.offsetHeight) * .8));
        const observer = new IntersectionObserver(entries => {
          if (hasStarted.current || !entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= threshold)) return;
          hasStarted.current = true;
          setBuildState('building');
          observer.disconnect();
        }, { threshold, rootMargin: '-140px 0px -24px 0px' });
        observerRef.current = observer;
        observer.observe(rows);
      };
      observe();
      resize = new ResizeObserver(observe);
      resize.observe(rows);
      window.addEventListener('resize', observe);
    } else setBuildState('complete');
    media.addEventListener('change', updateMotion);
    return () => { observerRef.current?.disconnect(); resize?.disconnect(); window.removeEventListener('resize', observe); media.removeEventListener('change', updateMotion); };
  }, []);

  function finishBuild() {
    hasStarted.current = true;
    observerRef.current?.disconnect();
    setBuildState('complete');
  }
  function replayBuild() {
    if (!canAnimate || buildState !== 'complete') return;
    setBuildKey(previous => previous + 1);
    setBuildState('building');
  }

  return <figure className="seo-signal-pyramid seo-reference-pyramid" data-pyramid-build={buildState} aria-label="Comprendre les six dimensions du SEO sur la recherche implants dentaires Gatineau">
    <div className="seo-pyramid-search-case"><div className="seo-pyramid-query"><span>Un patient cherche</span><div><SeoMethodIcon kind="search" /><strong>{seoReferenceSearch.query}</strong></div></div><div className="seo-pyramid-reference"><span>La page étudiée</span><a href={seoReferenceSearch.href} target="_blank" rel="noreferrer">{seoReferenceSearch.clinic} <span aria-hidden="true">↗</span></a></div></div>
    <div className="seo-pyramid-heading"><span>Son avance possible, étage par étage</span><h3>Pourquoi cette clinique peut-elle passer devant vous ?</h3>{canAnimate && <button type="button" className="seo-pyramid-replay" disabled={buildState !== 'complete'} onClick={replayBuild}><span aria-hidden="true">↻</span> Rejouer l’animation</button>}</div>
    <p className="seo-pyramid-mobile-hint">Touchez un étage pour voir ce qu’elle fait et pourquoi cela compte.</p>
    <ol className="seo-pyramid-rows" ref={rowsRef} onFocusCapture={finishBuild} reversed>{seoPyramidLevels.map((signal, index) => {
      const evidence = seoReferenceEvidence[signal.id];
      return <li className="seo-pyramid-row" key={`${signal.id}-${buildKey}`} style={{ ...pyramidTierStyle(index, signal.color), '--tier-delay': `${(seoPyramidLevels.length - 1 - index) * 1200}ms` } as CSSProperties}>
      <div className="seo-pyramid-cell" onAnimationEnd={event => { if (index === 0 && event.animationName === 'seo-pyramid-tier-fall') finishBuild(); }}><button type="button" className="seo-pyramid-tier" aria-pressed={active === signal.id} aria-controls="seo-pyramid-mobile-evidence" onClick={() => setActive(signal.id)}><span className="seo-pyramid-number">0{seoPyramidLevels.length - index}</span><strong className="seo-pyramid-name">{signal.name}</strong></button><noscript><span className="seo-pyramid-tier"><span className="seo-pyramid-number">0{seoPyramidLevels.length - index}</span><strong className="seo-pyramid-name">{signal.name}</strong></span></noscript><span className="seo-pyramid-arrow" aria-hidden="true" /></div>
      <div className="seo-pyramid-meaning"><strong>{signal.name}</strong><EvidenceText evidence={evidence} /></div>
    </li>; })}</ol>
    <div className="seo-pyramid-mobile-evidence" id="seo-pyramid-mobile-evidence" role="region" aria-label="Ce que cet étage apporte à la clinique" aria-live="polite" style={{ '--signal-color': activeSignal.color } as CSSProperties}><h4><span aria-hidden="true">↳</span> {activeSignal.name}</h4><EvidenceText evidence={seoReferenceEvidence[active]} /></div>
    <figcaption>Page réelle étudiée ; aucun relevé daté n’établit ici sa première place. L’ordre sert à mémoriser ; l’importance des signaux varie selon la recherche. <a href="https://www.google.com/intl/en_uk/search/howsearchworks/how-search-works/ranking-results/" target="_blank" rel="noreferrer">Comprendre avec Google <span aria-hidden="true">↗</span></a></figcaption>
    <noscript><style>{'.seo-reference-pyramid .seo-pyramid-meaning { display: block !important; } .seo-pyramid-mobile-evidence, .seo-pyramid-mobile-hint, .seo-pyramid-cell > button { display: none !important; } .seo-pyramid-cell > noscript { display: contents; }'}</style></noscript>
  </figure>;
}

function EvidenceText({ evidence }: { evidence: typeof seoReferenceEvidence[SeoSignalId] }) {
  return <><p><b>{evidence.fact}</b> {evidence.benefit}</p><div className="seo-pyramid-proof"><a href={evidence.source.href} target="_blank" rel="noreferrer" aria-label={`${evidence.source.label} (nouvel onglet)`}>{evidence.source.label} <span aria-hidden="true">↗</span></a>{evidence.explanationSource && <a href={evidence.explanationSource.href} target="_blank" rel="noreferrer" aria-label={`${evidence.explanationSource.label} (nouvel onglet)`}>{evidence.explanationSource.label} <span aria-hidden="true">↗</span></a>}{evidence.check && <span>{evidence.check}</span>}</div></>;
}
