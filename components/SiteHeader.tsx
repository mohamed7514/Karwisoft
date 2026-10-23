import { LandingChrome } from './Experience';
import { SiteNavigation } from './SiteNavigation';

export function SiteHeader() {
  return <>
    <a className="skip" href="#main">Aller au contenu</a>
    <LandingChrome className="header" as="header">
      <a className="brand" href="#accueil" aria-label="Karwisoft Marketing, accueil">karwisoft<span>marketing<span className="brand-dot">®</span>
      </span>
      </a>
      <SiteNavigation />
    </LandingChrome>
  </>;
}
