import { SlideFrame,ExperienceRegion,StoryControls } from './Experience';
import { HomeIntro } from './VisionHero';
import type { Locale } from '../lib/i18n/config';

export function StoryIntro({ locale = 'fr' }: { locale?: Locale }) {
  return <>
    <HomeIntro locale={locale}>
    <ExperienceRegion className="story" id="accueil" aria-labelledby="hero-title" region="story" as="section">
      <h1 id="hero-title" className="sr-only">Un patient cherche un dentiste. Il compare plusieurs cliniques. Pourquoi choisirait-il la vôtre ?</h1>
      <div className="story-stage">
        <SlideFrame className="story-scene story-search" data-story-scene="0" aria-labelledby="search-scene-title" as="article" id="intro-1">
          <picture className="story-photo">
            <source srcSet="/assets/search-800.webp 800w, /assets/search-1536.webp 1536w" sizes="100vw" />
            <img src="/assets/search-1536.webp" width="1536" height="1024" fetchPriority="high" alt="Une femme consulte son téléphone chez elle, au début de sa recherche d’un dentiste." />
          </picture>
          <div className="story-shade" aria-hidden="true">
          </div>
          <div className="story-caption wrap">
            <p className="eyebrow">01 / Une recherche. Plusieurs possibilités.</p>
            <h2 id="search-scene-title">Il cherche.<br />Il compare.<br />
              <em>Pourquoi vous ?</em>
            </h2>
            <p>Un patient cherche un dentiste. Il découvre plusieurs cliniques. Pourquoi choisirait-il la vôtre ?</p>
          </div>
          <div className="story-search-query">
            <span className="search-icon" aria-hidden="true">
            </span>
            <span>Implants dentaires près de moi<span className="typing-caret" aria-hidden="true">
            </span>
            </span>
            <span aria-hidden="true">↵</span>
          </div>
          <span className="scene-credit">Scène illustrative · Image générée par IA</span>
        </SlideFrame>
        <SlideFrame className="story-scene story-discover" data-story-scene="1" aria-labelledby="discover-scene-title" as="article" id="intro-2">
          <picture className="story-photo">
            <source srcSet="/assets/clinic-800.webp 800w, /assets/clinic-1536.webp 1536w" sizes="100vw" />
            <img src="/assets/clinic-1536.webp" width="1536" height="1024" alt="Un intérieur de clinique dentaire fictive, lumineux, en pierre naturelle et bois clair." />
          </picture>
          <div className="story-shade" aria-hidden="true">
          </div>
          <div className="story-caption wrap">
            <p className="eyebrow">02 / Votre clinique entre dans son choix</p>
            <h2 id="discover-scene-title">Il compare<br />
              <em>ses options.</em>
            </h2>
            <p>Votre message. Votre site. Votre approche. Qu’est-ce qui lui donne envie d’en savoir plus ?</p>
          </div>
          <div className="browser-mock story-browser" aria-label="Maquette illustrative du site de votre clinique">
            <div className="browser-bar">
              <div className="browser-dots" aria-hidden="true">
                <i>
                </i>
                <i>
                </i>
                <i>
                </i>
              </div>
              <span>votre-clinique.ca</span>
              <span aria-hidden="true">↗</span>
            </div>
            <div className="clinic-nav">
              <strong>votre clinique.</strong>
              <span>Des soins. De l’attention.</span>
              <span aria-hidden="true">☰</span>
            </div>
            <div className="clinic-hero">
              <img src="/assets/patient-800.webp" width="800" height="533" alt="Portrait illustratif d’une femme souriante." />
              <div className="clinic-photo-shade" aria-hidden="true">
              </div>
              <div className="clinic-copy">
                <span>IMPLANTS DENTAIRES</span>
                <h3>Retrouvez l’envie<br />de sourire.</h3>
                <span className="clinic-pill">Découvrir mes options ↗</span>
              </div>
            </div>
            <div className="clinic-bottom">
              <span>01 <b>Écouter.</b>
              </span>
              <span>02 <b>Rassurer.</b>
              </span>
              <span>03 <b>Accompagner.</b>
              </span>
            </div>
          </div>
          <span className="scene-credit">Clinique fictive · Maquette illustrative</span>
        </SlideFrame>
        <SlideFrame className="story-scene story-choice" data-story-scene="2" aria-labelledby="choice-scene-title" as="article" id="intro-3">
          <picture className="story-photo">
            <source srcSet="/assets/consultation-800.webp 800w, /assets/consultation-1536.webp 1536w" sizes="100vw" />
            <img src="/assets/consultation-1536.webp" width="1536" height="1024" alt="Une dentiste écoute une patiente lors d’une consultation, dans un cadre calme et chaleureux." />
          </picture>
          <div className="story-shade" aria-hidden="true">
          </div>
          <div className="story-caption wrap">
            <p className="eyebrow">03 / La question qui change la suite</p>
            <h2 id="choice-scene-title">Pourquoi<br />
              <em>vous choisir ?</em>
            </h2>
            <p>De sa recherche à sa visite, chaque étape doit lui donner une raison d’avancer avec votre clinique.</p>
            <a className="story-next" href="#approche">Voyons comment <span aria-hidden="true">↗</span>
            </a>
          </div>
          <span className="scene-credit">Scène illustrative · Image générée par IA</span>
        </SlideFrame>
        <div className="story-toolbar wrap">
          <span className="story-scroll">Faites défiler pour suivre le patient <span aria-hidden="true">↓</span>
          </span>
          <StoryControls />
          <a href="#approche">Le parcours <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </ExperienceRegion>
    <SlideFrame className="deck-intro wrap" id="approche">
      <p className="eyebrow">Sites web & acquisition pour les cliniques dentaires</p>
      <h2>Pourquoi votre clinique ?<br />
        <em>Construisons sa réponse.</em>
      </h2>
      <p>Karwisoft réunit votre site web, vos campagnes Google Ads et le parcours de prise de contact. D’abord vous voir. Puis vous découvrir, vous faire confiance et vous contacter. Votre équipe prend ensuite le relais.</p>
      <a href="#attirer" className="button dark">Entrer dans le parcours <span>↓</span>
      </a>
      <a className="approach-offer" href="#offre">Découvrir les formules ↗</a>
      <span className="demo-note">Présentation interactive · Clinique et patients fictifs · Aucun envoi réel</span>
    </SlideFrame>
    </HomeIntro>
  </>;
}
