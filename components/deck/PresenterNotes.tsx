'use client';

import { useEffect, useRef, useState } from 'react';
import { objections, slides } from '../../lib/deck';
import '../../app/styles/deck.css';

// Second window for the presenter: follows the deck, shows what to say, and can drive it.
export function PresenterNotes() {
  const [index, setIndex] = useState(0);
  const bus = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('kw-deck');
    if (!('BroadcastChannel' in window)) return;
    const channel = new BroadcastChannel('kw-deck');
    bus.current = channel;
    channel.onmessage = event => { if (event.data?.type === 'slide') setIndex(event.data.index); };
    channel.postMessage({ type: 'hello' });
    return () => { channel.close(); document.documentElement.classList.remove('kw-deck'); };
  }, []);

  const go = (target: number) => {
    const next = Math.max(0, Math.min(slides.length - 1, target));
    setIndex(next);
    bus.current?.postMessage({ type: 'go', index: next });
  };
  const slide = slides[index];
  const next = slides[index + 1];

  return <div className="pn">
    <header>
      <a href="/presentation/#1" target="_blank" rel="noopener noreferrer">Ouvrir la présentation ↗</a>
      <div><button type="button" onClick={() => go(index - 1)} disabled={index === 0}>←</button><span>{index + 1} / {slides.length}</span><button type="button" onClick={() => go(index + 1)} disabled={index === slides.length - 1}>→</button></div>
    </header>
    <main>
      <p className="pn-step">{slide.step}</p>
      <h1>{slide.title}{slide.accent ? ` ${slide.accent}` : ''}</h1>
      <h2>Tu dis</h2>
      {slide.notes.say.map(line => <p key={line}>{line}</p>)}
      {slide.notes.ask && <><h2>Tu demandes</h2>{slide.notes.ask.map(line => <p key={line} className="ask">{line}</p>)}</>}
      {slide.notes.tip && <p className="tip">{slide.notes.tip}</p>}
      {next && <p className="pn-next">Ensuite : {next.title}{next.accent ? ` ${next.accent}` : ''}</p>}
    </main>
    <details>
      <summary>Objections prévues</summary>
      <ul>{objections.map(([said, answer]) => <li key={said}><b>{said}</b><span>{answer}</span></li>)}</ul>
    </details>
  </div>;
}
