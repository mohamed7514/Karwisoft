'use client';

import { useEffect, useRef, useState, type PointerEvent, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { seoSignals, seoPyramidLevels, type SeoSignalId } from '../lib/seo-pyramid';
import { useSeoLearning } from './SeoLearningProvider';
import { pyramidTierStyle } from './SeoSignalPyramid';

type Drag = { id: SeoSignalId; pointerId: number; x: number; y: number; currentX: number; currentY: number; moved: boolean; element: HTMLButtonElement };
type Ghost = { id: SeoSignalId; x: number; y: number; over: number | null };
const tokenOrder: readonly SeoSignalId[] = ['qualite', 'local', 'technique', 'reputation', 'pertinence', 'autorite'];

function slotAt(x: number, y: number): number | null {
  const element = document.elementFromPoint(x, y)?.closest('[data-pyramid-slot]');
  if (!element) return null;
  const value = Number(element.getAttribute('data-pyramid-slot'));
  return Number.isInteger(value) && value >= 0 && value < seoSignals.length ? value : null;
}

export function SeoPyramidGame() {
  const { placements, pyramidChecked, complete, placeSignal, checkPyramid, clearPyramid } = useSeoLearning();
  const [selected, setSelected] = useState<SeoSignalId | null>(null);
  const [ghost, setGhost] = useState<Ghost | null>(null);
  const [message, setMessage] = useState('');
  const drag = useRef<Drag | null>(null);
  const suppressClickUntil = useRef(0);
  const placed = placements.filter(Boolean).length;
  const matches = placements.filter((id, index) => id === seoPyramidLevels[index].id).length;
  const dragging = ghost !== null;

  useEffect(() => () => {
    const current = drag.current;
    if (current?.element.hasPointerCapture(current.pointerId)) current.element.releasePointerCapture(current.pointerId);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    let frame = 0;
    function scrollAtEdge() {
      const current = drag.current;
      if (!current?.moved) return;
      const top = (document.querySelector('.seo-reading-journey')?.getBoundingClientRect().bottom ?? 80) + 38;
      const delta = current.currentY < top ? -8 : current.currentY > window.innerHeight - 48 ? 8 : 0;
      if (delta) {
        window.scrollBy({ top: delta, behavior: 'instant' });
        const over = slotAt(current.currentX, current.currentY);
        setGhost(previous => previous && previous.over !== over ? { ...previous, over } : previous);
      }
      frame = requestAnimationFrame(scrollAtEdge);
    }
    frame = requestAnimationFrame(scrollAtEdge);
    return () => cancelAnimationFrame(frame);
  }, [dragging]);

  function cancelDrag() {
    const current = drag.current;
    if (current?.element.hasPointerCapture(current.pointerId)) current.element.releasePointerCapture(current.pointerId);
    drag.current = null;
    setGhost(null);
  }

  function place(id: SeoSignalId, slot: number) {
    placeSignal(id, slot);
    setSelected(null);
    setMessage(`${seoSignals.find(signal => signal.id === id)!.name} placé au niveau ${seoSignals.length - slot}.`);
    requestAnimationFrame(() => document.getElementById(`seo-pyramid-slot-${slot}`)?.focus({ preventScroll: true }));
  }

  function pointerEvents(id: SeoSignalId | null) {
    return {
      onPointerDown(event: PointerEvent<HTMLButtonElement>) {
        if (!id || complete || event.button !== 0 || !event.isPrimary) return;
        drag.current = { id, pointerId: event.pointerId, x: event.clientX, y: event.clientY, currentX: event.clientX, currentY: event.clientY, moved: false, element: event.currentTarget };
        event.currentTarget.setPointerCapture(event.pointerId);
      },
      onPointerMove(event: PointerEvent<HTMLButtonElement>) {
        const current = drag.current;
        if (!current || current.pointerId !== event.pointerId) return;
        if (!current.moved && Math.hypot(event.clientX - current.x, event.clientY - current.y) < 6) return;
        current.moved = true;
        current.currentX = event.clientX;
        current.currentY = event.clientY;
        event.preventDefault();
        setGhost({ id: current.id, x: event.clientX, y: event.clientY, over: slotAt(event.clientX, event.clientY) });
      },
      onPointerUp(event: PointerEvent<HTMLButtonElement>) {
        const current = drag.current;
        if (!current || current.pointerId !== event.pointerId) return;
        const slot = slotAt(event.clientX, event.clientY);
        const moved = current.moved;
        cancelDrag();
        if (!moved) return;
        suppressClickUntil.current = performance.now() + 350;
        if (slot !== null) place(current.id, slot);
        else setMessage('Déplacement annulé. Déposez l’étiquette sur un niveau de la pyramide.');
      },
      onPointerCancel: cancelDrag,
    };
  }

  function select(id: SeoSignalId) {
    if (performance.now() < suppressClickUntil.current) return;
    setSelected(previous => previous === id ? null : id);
    setMessage(`${seoSignals.find(signal => signal.id === id)!.name} sélectionné. Choisissez un niveau de la pyramide.`);
  }
  function chooseSlot(slot: number) {
    if (performance.now() < suppressClickUntil.current) return;
    if (selected) place(selected, slot);
    else if (placements[slot]) select(placements[slot]);
    else setMessage('Choisissez d’abord une étiquette, puis ce niveau.');
  }
  const draggedSignal = ghost ? seoSignals.find(signal => signal.id === ghost.id)! : null;

  return <section className="seo-pyramid-game" id="seo-pyramid-game" tabIndex={-1} aria-labelledby="seo-pyramid-game-title" onKeyDown={event => {
    if (event.key === 'Escape') { cancelDrag(); setSelected(null); setMessage('Sélection annulée.'); }
  }}>
    <div className="seo-game-heading"><div><p className="method-kicker">Défi mémoire</p><h3 id="seo-pyramid-game-title">Reconstruisez la pyramide.</h3><p>Replacez les six dimensions du modèle observé.</p></div><strong className="seo-game-count">{placed}<span> / 6 placées</span></strong></div>
    <p className="seo-game-instructions" id="seo-game-instructions">Glissez les étiquettes, ou sélectionnez une étiquette puis un niveau, au toucher ou au clavier.</p>
    <div className="seo-game-layout">
      <div className="seo-game-board" role="group" aria-label="Pyramide à remplir, du sommet à la base" aria-describedby="seo-game-instructions">
        {seoPyramidLevels.map((expected, index) => {
          const id = placements[index];
          const signal = seoSignals.find(item => item.id === id);
          const correct = pyramidChecked && id === expected.id;
          const wrong = pyramidChecked && id !== expected.id;
          return <div className="seo-game-tier-row" key={expected.id} style={pyramidTierStyle(index, signal?.color ?? '#e6e4d7')}>
            <button type="button" id={`seo-pyramid-slot-${index}`} data-pyramid-slot={index} data-filled={!!signal} data-over={ghost?.over === index} data-correct={correct} data-wrong={wrong} className="seo-game-slot" aria-label={`Niveau ${seoSignals.length - index}${index === seoSignals.length - 1 ? ', base' : ''} : ${signal?.name ?? 'vide'}${wrong ? ', à corriger' : correct ? ', correct' : ''}`} aria-pressed={!!signal && selected === id} disabled={complete} onClick={() => chooseSlot(index)} {...pointerEvents(id)}>
              <span className="seo-slot-content"><span className="seo-pyramid-number">0{seoSignals.length - index}</span><strong>{signal?.name ?? 'Déposer ici'}</strong>{pyramidChecked && <span aria-hidden="true">{correct ? '✓' : '↻'}</span>}</span>
            </button>
          </div>;
        })}
        <p className="seo-game-foundation">La base du modèle</p>
      </div>
      <div className="seo-game-bank-panel"><p className="seo-game-bank-title">Les dimensions à replacer</p><div className="seo-game-bank" role="group" aria-label="Étiquettes à déplacer">{tokenOrder.filter(id => !placements.includes(id)).map(id => {
        const signal = seoSignals.find(item => item.id === id)!;
        return <button type="button" className="seo-game-token" key={id} data-signal-id={id} aria-pressed={selected === id} style={{ '--signal-color': signal.color } as CSSProperties} onClick={() => select(id)} {...pointerEvents(id)}><span aria-hidden="true">⠿</span>{signal.name}</button>;
      })}</div>
        {placed === seoSignals.length && <p className="seo-game-bank-empty">Les six étiquettes sont placées. {complete ? 'Le modèle est reconstruit.' : 'Vérifiez votre pyramide ; vous pouvez encore déplacer ou échanger les niveaux.'}</p>}
        <div className="seo-game-actions"><button type="button" className="seo-game-check" onClick={() => { checkPyramid(); setSelected(null); }} disabled={placed !== seoSignals.length || complete}>{complete ? 'Pyramide reconstruite ✓' : 'Vérifier ma pyramide'}</button>{!complete && placed > 0 && <button type="button" className="seo-game-clear" onClick={() => { clearPyramid(); setSelected(null); setMessage('Pyramide vidée. Les six étiquettes sont disponibles.'); }}>Tout retirer</button>}</div>
        <p className="seo-game-model-note">Vous reconstituez notre modèle de mémorisation. Ses niveaux ne sont pas une pondération de Google.</p>
      </div>
    </div>
    <p className="seo-game-live" role="status" aria-live="polite">{pyramidChecked ? complete ? 'Les six niveaux sont corrects. Mini-leçon terminée.' : `${matches} niveaux corrects sur 6. Consultez les repères ci-dessous puis déplacez les étiquettes à corriger.` : message}</p>
    {pyramidChecked && <div className="seo-game-correction"><h4>{complete ? 'Ce que chaque niveau vous rappelle' : 'Les repères pour vous corriger'}</h4><ol>{seoSignals.map(signal => <li key={signal.id}><strong>{signal.name}.</strong> {signal.correction}</li>)}</ol></div>}
    {ghost && draggedSignal && createPortal(<div className="seo-pyramid-ghost" aria-hidden="true" style={{ left: ghost.x, top: ghost.y, background: draggedSignal.color }}>{draggedSignal.name}</div>, document.body)}
  </section>;
}
