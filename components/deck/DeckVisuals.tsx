'use client';

import { useState } from 'react';
import { getGifts, getSitePlans, money, PROMO } from '../../lib/pricing';
import type { Visual } from '../../lib/deck';

const QUERY = 'implant dentaire près de moi';

function Search() {
  return <div className="dv-search" aria-hidden="true">
    <div className="dv-bar"><span className="dv-type">{QUERY}</span><i className="dv-caret" /></div>
    <ul>
      <li><b>Clinique dentaire A</b><span>Implants · 4,6 ★</span></li>
      <li><b>Centre dentaire B</b><span>Implants · 4,8 ★</span></li>
      <li><b>Clinique dentaire C</b><span>Implants · 4,5 ★</span></li>
      <li className="dv-you"><b>Votre clinique ?</b><span>…</span></li>
    </ul>
    <p>Exemple illustratif</p>
  </div>;
}

// French typography: keep ? attached to the previous word.
const nb = (text: string) => text.replace(/ ([?!:;])/g, '\u00a0$1');

const Hole = () => <i className="dv-mini-hole" aria-hidden="true" />;

// The patient path with three places where he is lost.
function Leaks() {
  const steps = ['Il cherche', 'Il entre sur votre site', 'Il compare', 'Il vous choisit'];
  const leaks: Record<number, [string, string]> = { 0: ['Fuite n° 1', 'Il ne vous trouve pas'], 1: ['Fuite n° 2', 'Il n’a pas confiance'], 2: ['Fuite n° 3', 'Il en choisit une autre'] };
  return <div className="dv-leaks" role="img" aria-label="Le parcours du patient avec trois fuites : il ne vous trouve pas, il n’a pas confiance, il choisit une autre clinique">
    {steps.map((step, index) => <div className="dv-leak-item" key={step}>
      <span className="dv-step-node">{step}</span>
      {leaks[index] && <div className="dv-leak"><Hole /><b>{leaks[index][0]}</b><span>{leaks[index][1]}</span></div>}
    </div>)}
  </div>;
}

function Doubts() {
  const doubts = ['Est-ce adapté à mon cas ?', 'Va-t-on m’écouter ?', 'Qui va m’accueillir ?', 'Par quoi commencer ?'];
  return <div className="dv-doubts" aria-label="Les questions que le patient se pose en silence">
    {doubts.map((text, index) => <p key={text} style={{ ['--i' as string]: index }}>{nb(text)}</p>)}
  </div>;
}

function Clones() {
  const names = ['Clinique A', 'Clinique B', 'Clinique C'];
  return <div className="dv-clones" aria-hidden="true">
    {names.map(name => <div key={name} className="dv-clone"><i /><b>{name}</b><span>Des soins dentaires de qualité</span><u>Prendre rendez-vous</u></div>)}
    <div className="dv-clone dv-you"><i /><b>Votre clinique</b><span>{nb('Qu’est-ce qui vous distingue ?')}</span><u>?</u></div>
    <p>Exemple illustratif</p>
  </div>;
}

function Doors() {
  const doors = [
    ['Maintenant', 'Google Ads', 'Vous apparaissez en haut. Vous ne payez que le clic.'],
    ['Durable', 'SEO', 'Vous remontez sans payer chaque clic. L’effet reste.'],
    ['Demain', 'GEO', 'Quand il demande à l’IA, c’est vous qu’on cite.'],
  ];
  return <div className="dv-doors dv-doors-wide">
    {doors.map(([when, tag, text]) => <div key={when} className="dv-door"><i aria-hidden="true" /><em>{when}</em><strong>{tag}</strong><p>{text}</p></div>)}
  </div>;
}

const COMPARE: { row: string; desk: string; site: string; hole: string }[] = [
  { row: 'Accueille', desk: 'Dit bonjour, rassure', site: 'Un accueil clair dès les premières secondes', hole: 'Personne ne l’accueille' },
  { row: 'Répond', desk: 'Quand quelqu’un est libre', site: 'À toute heure, avec l’assistant IA', hole: 'Ses questions restent sans réponse' },
  { row: 'Oriente', desk: 'Au téléphone', site: 'Urgence ou consultation, dès le premier clic', hole: 'Il ne sait pas où aller' },
  { row: 'Réserve', desk: 'Inscrit le rendez-vous', site: 'Demande de créneau, vérifiée par votre réception', hole: 'Il appelle la clinique suivante' },
];

function Compare() {
  const open = () => window.dispatchEvent(new Event('kw:open-chat'));
  return <div className="dv-compare">
    <div className="dv-cmp" role="table" aria-label="Comparaison des trois réceptions">
      <div className="dv-cmp-head" role="row">
        <span role="columnheader" />
        <span role="columnheader">La réception<br />de votre bureau</span>
        <span role="columnheader" className="site">La réception<br />de votre site</span>
        <span role="columnheader" className="hole"><Hole />Sans réception :<br />le trou noir</span>
      </div>
      {COMPARE.map(line => <div className="dv-cmp-row" role="row" key={line.row}>
        <b role="rowheader">{line.row}</b>
        <span role="cell" data-label="Bureau">{line.desk}</span>
        <span role="cell" className="site" data-label="Site">{line.site}</span>
        <span role="cell" className="hole" data-label="Trou noir">{line.hole}</span>
      </div>)}
    </div>
    <button type="button" onClick={open}>Parler à l’assistant</button>
  </div>;
}

function Questions() {
  const [city, setCity] = useState('');
  const ai = `Quelle est la meilleure clinique pour un implant dentaire ${city ? `à ${city}` : 'près de moi'} ? Donne-moi 3 options.`;
  return <div className="dv-questions">
    <div className="dv-q-card">
      <span className="dv-q-num">1</span>
      <p>{nb('Si un patient de l’autre bout de la ville cherche mon soin,')} <b>{nb('est-ce que je suis là ?')}</b></p>
      <div className="dv-q-row">
        <label><span>Ville</span><input value={city} onChange={event => setCity(event.target.value)} placeholder="Gatineau" autoComplete="off" /></label>
        <div className="dv-live-actions dv-one"><a href={`https://chatgpt.com/?q=${encodeURIComponent(ai)}`} target="_blank" rel="noopener noreferrer">Demander à l’IA</a></div>
      </div>
    </div>
    <div className="dv-q-card">
      <span className="dv-q-num">2</span>
      <p>{nb('Quand un inconnu arrive sur mon site,')} <b>{nb('qui l’accueille et le rassure ?')}</b></p>
    </div>
    <div className="dv-q-card">
      <span className="dv-q-num">3</span>
      <p>{nb('À côté de deux autres cliniques,')} <b>{nb('qu’est-ce qui me fait choisir la mienne ?')}</b></p>
    </div>
    <p className="dv-q-foot">Si l’une des réponses est « je ne sais pas », vous avez trouvé une fuite.</p>
  </div>;
}

// The close: the Premium site answers the three leaks, and the button is the purchase.
function Offer() {
  const premium = getSitePlans('fr').find(plan => plan.featured)!;
  const live = Date.now() <= new Date(PROMO.deadline).getTime();
  const gifts = getGifts('fr').map(gift => gift.months + ' ' + gift.name).join(' + ');
  const rows: [string, string, string][] = [
    ['Fuite n° 1', 'Il vous trouve', gifts + ' offerts'],
    ['Fuite n° 2', 'Il a confiance', premium.features[0] + ' · ' + premium.features[1]],
    ['Fuite n° 3', 'Il vous choisit', premium.features[3] + ' · ' + premium.features[2]],
  ];
  const price = live ? premium.price : premium.regularPrice ?? premium.price;
  return <div className="dv-buy">
    <div className="dv-buy-head"><em>{live ? 'Meilleure offre' : 'Offre'}</em><b>Site {premium.name}</b></div>
    <ul>{rows.map(([leak, answer, text]) => <li key={leak}><i>{leak}</i><span>{answer}</span><b>{text}</b></li>)}</ul>
    <div className="dv-buy-price">
      {live && premium.regularPrice && <s>{money(premium.regularPrice, 'fr')}</s>}
      <strong>{money(price, 'fr')}</strong>
      {live && <span>Jusqu’au {PROMO.label.fr} · {PROMO.seatsLeft} places restantes</span>}
    </div>
    <a className="dv-buy-cta" href="/commande/?plan=premium">Réserver ma place</a>
    <a className="dv-buy-more" href="/tarifs/">Autres offres, Google Ads, SEO et GEO : voir les tarifs</a>
  </div>;
}

export function DeckVisual({ kind }: { kind: Visual }) {
  switch (kind) {
    case 'search': return <Search />;
    case 'leaks': return <Leaks />;
    case 'doubts': return <Doubts />;
    case 'clones': return <Clones />;
    case 'compare': return <Compare />;
    case 'doors': return <Doors />;
    case 'questions': return <Questions />;
    case 'offer': return <Offer />;
    default: return null;
  }
}
