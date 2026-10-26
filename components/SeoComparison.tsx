'use client';

import { Fragment, useId, useState } from 'react';
import { seoPillars } from '../lib/seo-methodology';

export function SeoComparison() {
  const [selected, setSelected] = useState<string | null>(null);
  const id = useId();
  return <div className="method-comparison">
    <noscript><style>{'@media(max-width:760px){.method-comparison-row[data-selected=false]>td{display:block}}'}</style></noscript>
    <table>
      <caption className="method-sr-only">Les six piliers SEO et leur application locale : observations à vérifier, principes à adapter, actions et preuves de livraison. La mesure concerne vos propres données.</caption>
      <thead><tr><th scope="col">Ce qu’on compare</th><th scope="col">Le principe à adapter</th><th scope="col">Ce qu’on travaille en plus</th></tr></thead>
      <tbody>{seoPillars.map((pillar, index) => <Fragment key={pillar.id}>
        <tr className="method-comparison-row" data-selected={selected === pillar.id}>
          <th scope="row"><button type="button" id={`${id}-button-${pillar.id}`} aria-expanded={selected === pillar.id} aria-controls={`${id}-example-${pillar.id}`} onClick={() => setSelected(selected === pillar.id ? null : pillar.id)}>
            <span className="method-row-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{pillar.name}<span className="method-row-plus" aria-hidden="true">{selected === pillar.id ? '−' : '+'}</span>
          </button></th>
          <td data-label="Le principe à adapter">{pillar.reproduce}</td><td data-label="Ce qu’on travaille en plus">{pillar.improve}</td>
        </tr>
        <tr className="method-example-row" hidden={selected !== pillar.id} id={`${id}-example-${pillar.id}`}>
          <td colSpan={3}><div role="region" aria-labelledby={`${id}-button-${pillar.id}`} className="seo-comparison-detail"><div><p className="method-kicker">Ce que nous vérifions</p><p>{pillar.check}</p></div><div><p className="method-kicker">Exemple d’action</p><p>{pillar.example}</p></div><div><p className="method-kicker">Votre preuve de livraison</p><p>{pillar.proof}</p></div></div></td>
        </tr>
      </Fragment>)}</tbody>
    </table>
  </div>;
}
