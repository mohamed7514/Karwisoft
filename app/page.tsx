import { ExperienceProvider } from '../components/Experience';
import { SiteHeader } from '../components/SiteHeader';
import { StoryIntro } from '../components/StoryIntro';
import { PatientJourney } from '../components/PatientJourney';
import { Offer } from '../components/Offer';
import { Closing } from '../components/Closing';
import { SiteFooter } from '../components/SiteFooter';
import { PresentationControls } from '../components/PresentationControls';
import { LandingAnimations } from '../components/LandingAnimations';

export default function HomePage() {
  return <ExperienceProvider>
    <SiteHeader />
    <main id="main"><StoryIntro /><PatientJourney /><Offer /><Closing /></main>
    <SiteFooter />
    <PresentationControls />
    <LandingAnimations />
  </ExperienceProvider>;
}
