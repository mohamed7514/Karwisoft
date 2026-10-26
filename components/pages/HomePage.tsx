import { ExperienceProvider } from '../Experience';
import { SiteHeader } from '../SiteHeader';
import { StoryIntro } from '../StoryIntro';
import { PatientJourney } from '../PatientJourney';
import { Offer } from '../Offer';
import { Closing } from '../Closing';
import { SiteFooter } from '../SiteFooter';
import { PresentationControls } from '../PresentationControls';
import { LandingAnimations } from '../LandingAnimations';
import { HomeBody } from '../HomeSections';
import type { Locale } from '../../lib/i18n/config';

// The presentation deck (PatientJourney, Offer, Closing) stays French: it is a live sales tool.
export function HomePage({ locale }: { locale: Locale }) {
  return <ExperienceProvider>
    <SiteHeader locale={locale} />
    <main id="main"><StoryIntro locale={locale} /><HomeBody locale={locale}><PatientJourney /><Offer /><Closing /></HomeBody></main>
    <SiteFooter locale={locale} />
    <PresentationControls />
    <LandingAnimations />
  </ExperienceProvider>;
}
