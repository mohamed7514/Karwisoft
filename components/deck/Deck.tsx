'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { slides } from '../../lib/deck';
import { DeckVisual } from './DeckVisuals';
import '../../app/styles/deck.css';

const CHANNEL = 'kw-deck';

function Words({ text }: { text: string }) {
  // French typography: keep ? ! : ; and » attached to the previous word.
  return <>{text.replace(/ ([?!:;»])/g, ' $1').split(' ').map((word, index, all) => <span key={index}><span className="dk-w"><span style={{ ['--i' as string]: index }}>{word}</span></span>{index < all.length - 1 ? ' ' : null}</span>)}</>;
}

export function Deck() {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const channel = useRef<BroadcastChannel | null>(null);
  const touch = useRef<number | null>(null);
  const indexRef = useRef(0);
  const last = slides.length - 1;

  const go = useCallback((target: number) => setIndex(Math.max(0, Math.min(last, target))), [last]);
  const step = useCallback((delta: number) => setIndex(current => Math.max(0, Math.min(last, current + delta))), [last]);

  // Slide number lives in the hash so a reload (or the notes window) lands on the same slide.
  useEffect(() => {
    const fromHash = () => { const n = Number(location.hash.slice(1)); if (Number.isInteger(n) && n >= 1 && n <= slides.length) setIndex(n - 1); };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    document.documentElement.classList.add('kw-deck');
    return () => { window.removeEventListener('hashchange', fromHash); document.documentElement.classList.remove('kw-deck'); };
  }, []);
  useEffect(() => {
    indexRef.current = index;
    history.replaceState(null, '', `#${index + 1}`);
    try { channel.current?.postMessage({ type: 'slide', index }); } catch { /* channel closing */ }
  }, [index]);

  // Presenter window (/presentation/notes/) follows and can drive this one.
  useEffect(() => {
    if (!('BroadcastChannel' in window)) return;
    const bus = new BroadcastChannel(CHANNEL);
    channel.current = bus;
    bus.onmessage = event => {
      if (event.data?.type === 'go' && Number.isInteger(event.data.index)) setIndex(Math.max(0, Math.min(last, event.data.index)));
      if (event.data?.type === 'hello') bus.postMessage({ type: 'slide', index: indexRef.current });
    };
    return () => { channel.current = null; bus.close(); };
  }, [last]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (target instanceof Element && target.closest('input, textarea, select')) return;
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(event.key) && !(target instanceof Element && target.closest('a, button'))) { event.preventDefault(); step(1); }
      else if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); step(1); }
      else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(event.key)) { event.preventDefault(); step(-1); }
      else if (event.key === 'Home') go(0);
      else if (event.key === 'End') go(last);
      else if (event.key.toLowerCase() === 'f') void toggleFullscreen();
    };
    window.addEventListener('keydown', onKey);
    const onFs = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('fullscreenchange', onFs); };
  }, [step, go, last]);

  async function toggleFullscreen() {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); } catch { /* not allowed */ }
  }

  const slide = slides[index];
  return <div className="dk" onTouchStart={event => { touch.current = event.touches[0].clientX; }} onTouchEnd={event => {
    if (touch.current === null) return;
    const delta = event.changedTouches[0].clientX - touch.current;
    touch.current = null;
    if (Math.abs(delta) > 60) step(delta < 0 ? 1 : -1);
  }}>
    <div className="dk-progress" aria-hidden="true"><i style={{ width: `${((index + 1) / slides.length) * 100}%` }} /></div>
    <a className="dk-brand" href="/" aria-label="Quitter la présentation">karwisoft<span>marketing</span></a>
    <p className="dk-step">{slide.step}</p>

    <main className="dk-stage" id="main">
      <section key={slide.id} className={`dk-slide dk-${slide.visual}`} aria-roledescription="diapositive" aria-label={`${index + 1} sur ${slides.length}`}>
        <div className="dk-copy">
          {slide.kicker && <p className="dk-kicker">{slide.kicker}</p>}
          <h1><Words text={slide.title} />{slide.accent && <> <em><Words text={slide.accent} /></em></>}</h1>
          {slide.sub && <p className="dk-sub">{slide.sub}</p>}
        </div>
        <div className="dk-visual"><DeckVisual kind={slide.visual} /></div>
      </section>
    </main>

    <nav className="dk-controls" aria-label="Navigation de la présentation">
      <button type="button" onClick={() => step(-1)} disabled={index === 0} aria-label="Diapositive précédente">←</button>
      <span>{String(index + 1).padStart(2, '0')} / {slides.length}</span>
      <button type="button" onClick={() => void toggleFullscreen()} aria-pressed={fullscreen} aria-label="Plein écran (F)">⛶</button>
      <button type="button" onClick={() => step(1)} disabled={index === last} aria-label="Diapositive suivante">→</button>
    </nav>
  </div>;
}
