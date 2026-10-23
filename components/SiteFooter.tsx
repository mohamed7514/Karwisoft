import { LandingChrome } from './Experience';

export function SiteFooter() {
  return <>
    <LandingChrome className="wrap footer" as="footer">
      <a className="brand" href="#accueil">karwisoft<span>marketing<span className="brand-dot">®</span>
      </span>
      </a>
      <p>Du premier clic à l’après-visite.</p>
      <span>Photos illustratives générées par IA · 2026</span>
    </LandingChrome>
    <LandingChrome>
      <a className="back-top" href="#accueil" aria-label="Retour en haut">↑</a>
    </LandingChrome>
  </>;
}
