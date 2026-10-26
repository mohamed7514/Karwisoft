'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { seoCycle } from '../lib/seo-methodology';

const mobileLabels = ['Le premier', 'Les écarts', 'Les bases', 'Contenu et liens', 'Le bilan'];

export function SeoMethodCycle() {
  const [active, setActive] = useState(0);
  const [view, setView] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  function select(next: number) { setActive(next); setView(0); }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = seoCycle.length - 1;
    else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % seoCycle.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + seoCycle.length) % seoCycle.length;
    else return;
    event.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  }

  function nextStep() {
    const next = (active + 1) % seoCycle.length;
    select(next);
  }

  return <div className="method-cycle">
    <div className="seo-cycle-navigation">
    <div className="seo-mobile-picker"><label className="method-sr-only" htmlFor={`${id}-select`}>Choisir un temps de travail</label><select id={`${id}-select`} value={active} onChange={event => select(Number(event.target.value))} aria-controls={`${id}-panel-${active}`}>{seoCycle.map((step, index) => <option key={step.id} value={index}>0{index + 1} · {mobileLabels[index]}</option>)}</select><button type="button" aria-label="Étape précédente" onClick={() => select((active - 1 + seoCycle.length) % seoCycle.length)}>←</button><button type="button" aria-label="Étape suivante" onClick={nextStep}>→</button></div>
    <div className="method-tabs" role="tablist" aria-label="Les cinq étapes de notre méthode SEO">
      {seoCycle.map((step, index) => <button
        key={step.id} ref={element => { tabs.current[index] = element; }}
        type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`}
        aria-selected={active === index} tabIndex={active === index ? 0 : -1}
        onClick={() => select(index)} onKeyDown={event => onKeyDown(event, index)}
        className="method-tab" data-complete={index < active}
      ><span className="method-tab-number">{String(index + 1).padStart(2, '0')}</span><span>{step.label}</span></button>)}
    </div>
    <div className="seo-detail-controls"><div className="seo-detail-views" role="group" aria-label="Détails du travail"><button type="button" aria-pressed={view === 0} aria-controls={`${id}-panel-${active}`} onClick={() => setView(0)}>Pourquoi</button><button type="button" aria-pressed={view === 1} aria-controls={`${id}-panel-${active}`} onClick={() => setView(1)}>Les actions</button><button type="button" aria-pressed={view === 2} aria-controls={`${id}-panel-${active}`} onClick={() => setView(2)}>Votre livrable</button></div><div className="seo-inline-stepper"><button type="button" aria-label="Étape précédente" onClick={() => select((active - 1 + seoCycle.length) % seoCycle.length)}>←</button><button type="button" aria-label="Étape suivante" onClick={nextStep}>→</button></div></div>
    <div className="method-cycle-track" aria-hidden="true"><span style={{ width: `${(active + 1) * 20}%` }} /></div>
    </div>
    <div className="method-panels">
      {seoCycle.map((step, index) => <section
        key={step.id} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`}
        hidden={active !== index} tabIndex={0} className="method-panel"
      >
        <div className="method-panel-copy">
          <h3>{step.title}</h3>
          {view === 0 && <div className="seo-sprint-reading"><h4 className="seo-sprint-question">Pourquoi ce sprint ?</h4><p>{step.purpose}</p></div>}
          {view === 1 && <div className="seo-sprint-reading"><h4 className="seo-sprint-question">Comment nous avançons</h4><ul className="method-checks">{step.items.map(item => <li key={item}>{item}</li>)}</ul></div>}
          {view === 2 && <aside className="method-output" aria-label="Livrable de cette étape"><p className="method-kicker">Ce que vous recevez</p><h4>{step.output}</h4><p>{step.proof}</p><details key={step.id} className="seo-sprint-acceptance"><summary>Accès et critères de livraison <span aria-hidden="true">+</span></summary><dl className="seo-sprint-check"><div><dt>Pour avancer</dt><dd>{step.requires}</dd></div><div><dt>Comment nous vérifions</dt><dd>{step.check}</dd></div></dl></details></aside>}
        </div>
      </section>)}
    </div>
    <noscript><ol className="method-nojs">{seoCycle.map(step => <li key={step.id}><strong>{step.label}</strong><p>{step.purpose}</p><ul>{step.items.map(item => <li key={item}>{item}</li>)}</ul><p>Livrable : {step.output}. {step.proof}</p><p>Pour avancer : {step.requires}</p><p>Vérification : {step.check}</p></li>)}</ol></noscript>
  </div>;
}
