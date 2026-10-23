import Link from 'next/link';
import { LandingChrome } from './Experience';

export function SiteHeader() {
  return <>
    <a className="skip" href="#main">Aller au contenu</a>
    <LandingChrome className="header" as="header">
      <a className="brand" href="#accueil" aria-label="Karwisoft Marketing, accueil">karwisoft<span>marketing<span className="brand-dot">®</span>
      </span>
      </a>
      <nav aria-label="Navigation principale">
        <Link className="services-link" href="/services/">Services</Link>
        <a href="#parcours">Le parcours</a>
        <a className="presentation-link" href="?mode=presentation#accueil">Présenter <span aria-hidden="true">↗</span>
        </a>
        <a className="nav-offer" href="#offre">L’offre <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </LandingChrome>
  </>;
}
