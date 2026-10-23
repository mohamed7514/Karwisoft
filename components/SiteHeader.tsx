import { LandingChrome } from './Experience';
import { SiteNavigation } from './SiteNavigation';

export function SiteHeader({ services = false }: { services?: boolean }) {
  const content = <>
    <a className="brand" href={services ? '/' : '#accueil'} aria-label="Karwisoft Marketing, accueil">
      karwisoft<span>marketing<span className="brand-dot">®</span></span>
    </a>
    <SiteNavigation services={services} />
  </>;
  return <>
    <a className="skip" href="#main">Aller au contenu</a>
    {services ? <header className="header">{content}</header> : <LandingChrome className="header" as="header">{content}</LandingChrome>}
  </>;
}
