import { SlideFrame,ExperienceRegion } from './Experience';
import { JourneyNavigation } from './PresentationControls';
import { IntakeQuiz,HeroHotspots,BranchChoice,ReplaySmile } from './Demos';

export function PatientJourney() {
  return <>
    <ExperienceRegion id="parcours" region="journey">
      <SlideFrame className="deck-slide " id="attirer" data-deck="1" aria-labelledby="title-attirer">
        <picture className="deck-photo">
          <source srcSet="/assets/search-800.webp 800w, /assets/search-1536.webp 1536w" sizes="100vw" />
          <img src="/assets/search-1536.webp" width="1536" height="1024" loading="lazy" alt="La patiente recherche une clinique sur son téléphone." />
        </picture>
        <div className="deck-shade" aria-hidden="true">
        </div>
        <div className="deck-layout wrap">
          <div className="deck-copy">
            <p className="eyebrow">Comment vous choisir s’il ne vous voit pas ?</p>
            <h2 id="title-attirer">Pour vous choisir,<br />
              <em>il doit vous voir.</em>
            </h2>
            <p>Il cherche un soin dans votre secteur. Google Ads permet de cibler cette intention et de le conduire vers une page dédiée à ce besoin.</p>
          </div>
          <div className="deck-demo">
            <div className="deck-panel">
              <div className="panel-label">GOOGLE ADS<span>EXEMPLE</span>
              </div>
              <div className="intent-query">
                <span className="search-icon">
                </span> implants dentaires à Montréal</div>
              <small>Annonce · Démonstration</small>
              <h3>Retrouvez l’envie de sourire.</h3>
              <p>Implants dentaires à Montréal. Découvrez vos options, à votre rythme.</p>
              <div className="mini-tags">
                <span>Le bon soin</span>
                <span>La bonne zone</span>
                <span>La bonne page</span>
              </div>
              <p className="fine">Visibilité publicitaire. Position et volume non garantis.</p>
            </div>
          </div>
        </div>
        <div className="deck-bottom wrap">
          <p>
            <span>LE GAIN POUR VOTRE CLINIQUE</span>Concentrer le budget sur les recherches qui correspondent à vos soins et à votre zone.</p>
          <span className="deck-number">01 <i>/ 12</i>
          </span>
        </div>
      </SlideFrame>
      <SlideFrame className="deck-slide " id="ressentir" data-deck="2" aria-labelledby="title-ressentir">
        <picture className="deck-photo">
          <source srcSet="/assets/patient-800.webp 800w, /assets/patient-1536.webp 1536w" sizes="100vw" />
          <img src="/assets/patient-1536.webp" width="1536" height="1024" loading="lazy" alt="Portrait de la patiente, sereine dans une clinique lumineuse." />
        </picture>
        <div className="deck-shade" aria-hidden="true">
        </div>
        <div className="deck-layout wrap">
          <div className="deck-copy">
            <p className="eyebrow">Il vous voit. Pourquoi cliquer sur vous ?</p>
            <h2 id="title-ressentir">Son besoin.<br />
              <em>Ses mots. Son émotion.</em>
            </h2>
            <p>Il souhaite retrouver le plaisir de sourire, mais peut craindre le traitement, le prix ou le jugement. Votre annonce lui donne une première raison d’avancer : ici, on commence par l’écouter.</p>
          </div>
          <div className="deck-demo">
            <div className="feeling-quote">
              <span>CE QU’IL AIMERAIT RETROUVER</span>
              <blockquote>« Sourire sans<br />y penser. »</blockquote>
              <div className="thought-chips">
                <span>Est-ce adapté à mon cas ?</span>
                <span>Va-t-on m’écouter ?</span>
                <span>Par quoi commencer ?</span>
              </div>
            </div>
          </div>
        </div>
        <div className="deck-bottom wrap">
          <p>
            <span>LE GAIN POUR VOTRE CLINIQUE</span>Donner une raison de découvrir votre approche dès l’annonce.</p>
          <span className="deck-number">02 <i>/ 12</i>
          </span>
        </div>
      </SlideFrame>
      <SlideFrame className="deck-slide wow-slide" id="convaincre" data-deck="3" aria-labelledby="title-convaincre">
        <picture className="deck-photo">
          <source srcSet="/assets/reaction-800.webp 800w, /assets/reaction-1536.webp 1536w" sizes="100vw" />
          <img src="/assets/reaction-1536.webp" width="1536" height="1024" loading="lazy" alt="La patiente regarde le site sur son ordinateur, agréablement impressionnée." />
        </picture>
        <div className="deck-shade" aria-hidden="true">
        </div>
        <div className="deck-layout wrap">
          <div className="deck-copy">
            <p className="eyebrow">Il arrive. Pourquoi rester ?</p>
            <h2 id="title-convaincre">Vous avez gagné le clic.<br />
              <em>Donnons-lui une suite.</em>
            </h2>
            <p>Vous avez investi pour le faire venir. Il doit comprendre votre approche, ressentir votre sérieux et trouver facilement la prochaine étape.</p>
          </div>
          <div className="deck-demo">
            <div className="real-site">
              <div className="browser-bar">
                <span>● ● ●</span>
                <span>Épure / Notre véritable template</span>
                <span>↗</span>
              </div>
              <div className="real-hero">
                <img className="demo-final" src="/assets/smile-final.webp" alt="Illustration fictive d’un sourire complet" />
                <img className="demo-before" src="/assets/smile-before.webp" alt="Illustration fictive du sourire initial" />
                <svg className="demo-patches" viewBox="0 0 1536 1024" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <defs>
                    <filter id="demo-soft">
                      <feGaussianBlur stdDeviation="4">
                      </feGaussianBlur>
                    </filter>
                    <clipPath id="demo-left-bound">
                      <ellipse cx="554" cy="391" rx="78" ry="111">
                      </ellipse>
                    </clipPath>
                    <clipPath id="demo-right-bound">
                      <ellipse cx="1150" cy="382" rx="58" ry="102">
                      </ellipse>
                    </clipPath>
                    <mask id="demo-left-mask" maskUnits="userSpaceOnUse" x="465" y="260" width="180" height="270">
                      <rect className="demo-tooth-left" x="465" y="275" width="180" height="0" fill="white" filter="url(#demo-soft)">
                      </rect>
                    </mask>
                    <mask id="demo-right-mask" maskUnits="userSpaceOnUse" x="1080" y="260" width="140" height="270">
                      <rect className="demo-tooth-right" x="1080" y="275" width="140" height="0" fill="white" filter="url(#demo-soft)">
                      </rect>
                    </mask>
                  </defs>
                  <g clipPath="url(#demo-left-bound)" mask="url(#demo-left-mask)">
                    <image href="/assets/smile-final.webp" width="1536" height="1024">
                    </image>
                  </g>
                  <g clipPath="url(#demo-right-bound)" mask="url(#demo-right-mask)">
                    <image href="/assets/smile-final.webp" width="1536" height="1024">
                    </image>
                  </g>
                </svg>
                <div className="real-hero-shade">
                </div>
                <div className="real-nav">
                  <b>ÉPURE.</b>
                  <span>Votre sourire. Votre rythme.</span>
                  <span>☰</span>
                </div>
                <div className="real-caption">
                  <small>L’ENVIE DE SOURIRE, À NOUVEAU.</small>
                  <h3>Le plaisir de sourire,<br />
                    <em>à nouveau.</em>
                  </h3>
                  <span>Faites défiler. Laissez le sourire évoluer. ↓</span>
                </div>
              </div>
              <p className="demo-disclaimer">Transformation fictive à visée illustrative. Aucun résultat de traitement n’est garanti.</p>
              <ReplaySmile />
            </div>
            <HeroHotspots />
          </div>
        </div>
        <div className="deck-bottom wrap">
          <p>
            <span>LE GAIN POUR VOTRE CLINIQUE</span>Donner à chaque visite une chance de devenir une conversation.</p>
          <span className="deck-number">03 <i>/ 12</i>
          </span>
        </div>
      </SlideFrame>
      <SlideFrame className="deck-slide trust-slide" id="confiance" data-deck="4" aria-labelledby="title-confiance">
        <picture className="deck-photo">
          <source srcSet="/assets/consultation-800.webp 800w, /assets/consultation-1536.webp 1536w" sizes="100vw" />
          <img src="/assets/consultation-1536.webp" width="1536" height="1024" loading="lazy" alt="Une dentiste écoute une patiente lors d’une consultation illustrative." />
        </picture>
        <div className="deck-shade" aria-hidden="true">
        </div>
        <div className="deck-layout wrap">
          <div className="deck-copy">
            <p className="eyebrow">Il est impressionné. Peut-il vous faire confiance ?</p>
            <h2 id="title-confiance">Il découvre un site.<br />
              <em>Il choisit une équipe.</em>
            </h2>
            <p>Votre équipe, votre approche, votre lieu et des réponses à ses hésitations. Il découvre les personnes qui vont l’accueillir et comprend comment se passera la première rencontre.</p>
          </div>
          <div className="deck-demo">
            <div className="deck-panel trust-proof">
              <div className="panel-label">LA CONFIANCE PREND FORME<span>EXEMPLE</span>
              </div>
              <img src="/assets/dentist-800.webp" width="800" height="533" loading="lazy" alt="Portrait illustratif d’une dentiste dans sa clinique" />
              <h3>« Qui va m’accueillir ? »</h3>
              <p>Une équipe présentée. Une approche expliquée. Un premier rendez-vous qui devient plus facile à envisager.</p>
              <ul>
                <li>Votre équipe et ses qualifications vérifiées</li>
                <li>Le déroulement de la première visite</li>
                <li>Des avis authentiques de vos patients</li>
              </ul>
              <p className="fine">Personnes et clinique fictives dans cette démonstration. Les contenus réels seront propres au cabinet.</p>
            </div>
          </div>
        </div>
        <div className="deck-bottom wrap">
          <p>
            <span>LE GAIN POUR VOTRE CLINIQUE</span>Répondre à ses hésitations avant qu’il décide de vous contacter.</p>
          <span className="deck-number">04 <i>/ 12</i>
          </span>
        </div>
      </SlideFrame>
      <SlideFrame className="deck-slide " id="orienter" data-deck="5" aria-labelledby="title-orienter">
        <picture className="deck-photo">
          <source srcSet="/assets/clinic-800.webp 800w, /assets/clinic-1536.webp 1536w" sizes="100vw" />
          <img src="/assets/clinic-1536.webp" width="1536" height="1024" loading="lazy" alt="Une réception dentaire chaleureuse et lumineuse." />
        </picture>
        <div className="deck-shade" aria-hidden="true">
        </div>
        <div className="deck-layout wrap">
          <div className="deck-copy">
            <p className="eyebrow">Il envisage la suite. Par où commencer ?</p>
            <h2 id="title-orienter">Son besoin décide<br />
              <em>du prochain pas.</em>
            </h2>
            <p>Une urgence appelle un contact rapide. Un projet de soin appelle des réponses. Chaque patient trouve un chemin adapté, dès le premier choix.</p>
          </div>
          <div className="deck-demo">
            <div className="deck-panel">
              <div className="panel-label">LE PREMIER CHOIX<span>EXEMPLE</span>
              </div>
              <h3>Comment peut-on vous aider ?</h3>
              <BranchChoice />
              <p className="fine">Simulation : aucun appel ni demande transmis.</p>
            </div>
          </div>
        </div>
        <div className="deck-bottom wrap">
          <p>
            <span>LE GAIN POUR VOTRE CLINIQUE</span>Limiter les obstacles entre son intention et le contact avec votre équipe.</p>
          <span className="deck-number">05 <i>/ 12</i>
          </span>
        </div>
      </SlideFrame>
      <SlideFrame className="deck-slide " id="photos" data-deck="6" aria-labelledby="title-photos">
        <picture className="deck-photo">
          <source srcSet="/assets/capture-800.webp 800w, /assets/capture-1536.webp 1536w" sizes="100vw" />
          <img src="/assets/capture-1536.webp" width="1536" height="1024" loading="lazy" alt="La même patiente prend une photo de son sourire avec son téléphone." />
        </picture>
        <div className="deck-shade" aria-hidden="true">
        </div>
        <div className="deck-layout wrap">
          <div className="deck-copy">
            <p className="eyebrow">Il souhaite avancer. Comment préparer l’échange ?</p>
            <h2 id="title-photos">Son sourire.<br />
              <em>Un premier contexte.</em>
            </h2>
            <p>Avec son accord, des photos guidées accompagnent sa demande. Votre équipe peut préparer ses questions avant le premier échange. Il reste libre de passer cette étape.</p>
          </div>
          <div className="deck-demo">
            <div className="deck-panel">
              <div className="panel-label">CAPTURE MULTI-ANGLES GUIDÉE<span>EXEMPLE</span>
              </div>
              <div className="capture-example">
                <img src="/assets/patient-800.webp" alt="Exemple de cadrage d’un sourire" />
                <div className="capture-guide" aria-hidden="true">
                </div>
                <span>Placez votre sourire dans le cadre</span>
              </div>
              <div className="capture-steps">
                <span>01 Face</span>
                <span>02 Dents</span>
                <span>03 Profil · optionnel</span>
              </div>
              <p>Des photos facultatives, avec une explication claire de leur usage.</p>
              <p className="fine">Aucun diagnostic sur photo. Ici, aucune photo personnelle n’est collectée.</p>
            </div>
          </div>
        </div>
        <div className="deck-bottom wrap">
          <p>
            <span>LE GAIN POUR VOTRE CLINIQUE</span>Moins d’informations à redemander ; plus de contexte pour préparer le rappel.</p>
          <span className="deck-number">06 <i>/ 12</i>
          </span>
        </div>
      </SlideFrame>
      <SlideFrame className="deck-slide " id="demande" data-deck="7" aria-labelledby="title-demande">
        <picture className="deck-photo">
          <source srcSet="/assets/reminder-800.webp 800w, /assets/reminder-1536.webp 1536w" sizes="100vw" />
          <img src="/assets/reminder-1536.webp" width="1536" height="1024" loading="lazy" alt="La patiente prépare tranquillement son rendez-vous sur son téléphone." />
        </picture>
        <div className="deck-shade" aria-hidden="true">
        </div>
        <div className="deck-layout wrap">
          <div className="deck-copy">
            <p className="eyebrow">Il veut vous rencontrer. Comment faciliter sa demande ?</p>
            <h2 id="title-demande">Un prochain pas clair.<br />
              <em>Puis le suivant.</em>
            </h2>
            <p>Besoin, échéance, budget envisagé, puis préférence de rendez-vous. Une question à la fois pour préparer une demande que votre réception pourra traiter.</p>
          </div>
          <div className="deck-demo">
            <div className="deck-panel">
              <div className="panel-label">SMART INTAKE + RENDEZ-VOUS<span>EXEMPLE</span>
              </div>
              <IntakeQuiz />
              <p className="fine">Exemple interactif sans coordonnées ni envoi. Un créneau demandé reste à valider par la clinique.</p>
            </div>
          </div>
        </div>
        <div className="deck-bottom wrap">
          <p>
            <span>LE GAIN POUR VOTRE CLINIQUE</span>Recevoir un contact structuré, avec les informations utiles pour le rappeler.</p>
          <span className="deck-number">07 <i>/ 12</i>
          </span>
        </div>
      </SlideFrame>
      <SlideFrame className="deck-slide " id="reception" data-deck="8" aria-labelledby="title-reception">
        <picture className="deck-photo">
          <source srcSet="/assets/reception-800.webp 800w, /assets/reception-1536.webp 1536w" sizes="100vw" />
          <img src="/assets/reception-1536.webp" width="1536" height="1024" loading="lazy" alt="La réceptionniste consulte une demande à son bureau." />
        </picture>
        <div className="deck-shade" aria-hidden="true">
        </div>
        <div className="deck-layout wrap">
          <div className="deck-copy">
            <p className="eyebrow">Il vous contacte. Comment assurer la suite ?</p>
            <h2 id="title-reception">Son intérêt est là.<br />
              <em>Votre équipe est prévenue.</em>
            </h2>
            <p>La demande rejoint le calendrier maître. Une notification SMS ou email prévient la réception, avec un lien vers les informations déjà fournies. Votre équipe vérifie et confirme.</p>
          </div>
          <div className="deck-demo">
            <div className="deck-panel">
              <div className="panel-label">LE RELAIS À LA RÉCEPTION<span>EXEMPLE</span>
              </div>
              <div className="notification">
                <span className="notification-icon">↗</span>
                <div>
                  <small>NOTIFICATION CLINIQUE · EXEMPLE</small>
                  <h3>Nouvelle demande à valider</h3>
                </div>
              </div>
              <dl className="request-data">
                <div>
                  <dt>Besoin</dt>
                  <dd>Évaluation implants</dd>
                </div>
                <div>
                  <dt>Préférence</dt>
                  <dd>Un matin cette semaine</dd>
                </div>
                <div>
                  <dt>Photos</dt>
                  <dd>2 photos · si fournies</dd>
                </div>
                <div>
                  <dt>État</dt>
                  <dd>
                    <span className="status-pill">En attente de validation</span>
                  </dd>
                </div>
              </dl>
              <p>SMS / email → lien vers la fiche sécurisée. Les photos restent dans l’espace prévu.</p>
              <div className="reception-chain">
                <span>Vérifier</span>→<span>Confirmer</span>→<span>Inscrire au logiciel</span>
              </div>
              <p className="fine">Saisie par la réception dans Dentitek, Dentrix ou Progident. Sans API ni synchronisation native.</p>
            </div>
          </div>
        </div>
        <div className="deck-bottom wrap">
          <p>
            <span>LE GAIN POUR VOTRE CLINIQUE</span>Traiter la demande rapidement, avec son contexte, pendant que le projet est présent à l’esprit.</p>
          <span className="deck-number">08 <i>/ 12</i>
          </span>
        </div>
      </SlideFrame>
      <SlideFrame className="deck-slide " id="rappels" data-deck="9" aria-labelledby="title-rappels">
        <picture className="deck-photo">
          <source srcSet="/assets/reminder-800.webp 800w, /assets/reminder-1536.webp 1536w" sizes="100vw" />
          <img src="/assets/reminder-1536.webp" width="1536" height="1024" loading="lazy" alt="La patiente consulte un message près de son agenda." />
        </picture>
        <div className="deck-shade" aria-hidden="true">
        </div>
        <div className="deck-layout wrap">
          <div className="deck-copy">
            <p className="eyebrow">Il a rendez-vous. Comment garder le lien ?</p>
            <h2 id="title-rappels">Son créneau est réservé.<br />
              <em>Accompagnons-le jusqu’au jour J.</em>
            </h2>
            <p>Un oubli peut laisser un créneau vide. Après confirmation, le rappel SMS remet le rendez-vous en tête et indique comment prévenir la clinique en cas d’imprévu.</p>
          </div>
          <div className="deck-demo">
            <div className="phone-mock">
              <div className="phone-notch">
              </div>
              <span className="phone-clock">9:41</span>
              <div className="sms-contact">
                <span>É</span>Épure · Exemple</div>
              <p className="sms-date">RENDEZ-VOUS CONFIRMÉ PAR LA CLINIQUE</p>
              <div className="sms-bubble">Bonjour Camille, rappel de votre rendez-vous demain à 10 h. Un imprévu ? Contactez la réception pour modifier votre rendez-vous.</div>
              <span className="sms-meta">Rappel programmé après confirmation</span>
              <div className="sms-bottom">Un imprévu ? Prévenez-nous. ↗</div>
            </div>
            <p className="widget-caption">Automatisation SMS prévue via Twilio · Aucun SMS envoyé ici</p>
          </div>
        </div>
        <div className="deck-bottom wrap">
          <p>
            <span>LE GAIN POUR VOTRE CLINIQUE</span>Anticiper les changements et faciliter la réorganisation de votre agenda.</p>
          <span className="deck-number">09 <i>/ 12</i>
          </span>
        </div>
      </SlideFrame>
      <SlideFrame className="deck-slide " id="avis" data-deck="10" aria-labelledby="title-avis">
        <picture className="deck-photo">
          <source srcSet="/assets/review-800.webp 800w, /assets/review-1536.webp 1536w" sizes="100vw" />
          <img src="/assets/review-1536.webp" width="1536" height="1024" loading="lazy" alt="La patiente consulte son téléphone après une visite." />
        </picture>
        <div className="deck-shade" aria-hidden="true">
        </div>
        <div className="deck-layout wrap">
          <div className="deck-copy">
            <p className="eyebrow">Après la visite, comment aider le prochain patient à vous choisir ?</p>
            <h2 id="title-avis">Son expérience éclaire<br />
              <em>le prochain choix.</em>
            </h2>
            <p>Après la visite, chaque patient est invité à partager librement son expérience. Ces retours peuvent aider les prochains visiteurs à découvrir votre clinique.</p>
          </div>
          <div className="deck-demo">
            <div className="deck-panel">
              <div className="panel-label">L’APRÈS-VISITE<span>EXEMPLE</span>
              </div>
              <span className="review-symbol" aria-hidden="true">✳</span>
              <h3>Merci de votre visite.</h3>
              <p>Votre expérience compte. Si vous le souhaitez, partagez un avis sur Google.</p>
              <span className="example-link">Partager mon expérience ↗</span>
              <div className="neutral-note">La même invitation pour tous.<br />Une opinion libre. Aucune note imposée.</div>
              <p className="fine">Exemple de message après une visite effectuée. Aucun avis réel ni envoi dans cette présentation.</p>
            </div>
          </div>
        </div>
        <div className="deck-bottom wrap">
          <p>
            <span>LE GAIN POUR VOTRE CLINIQUE</span>Faire vivre votre réputation avec des retours authentiques, sans imposer de note.</p>
          <span className="deck-number">10 <i>/ 12</i>
          </span>
        </div>
      </SlideFrame>
      <SlideFrame className="workflow-section" id="workflow" data-deck="11">
        <div className="wrap">
          <p className="eyebrow">Pourquoi vous ? Parce que toute la suite est pensée.</p>
          <h2>Un parcours.<br />
            <em>Aucun relais oublié.</em>
          </h2>
          <p className="workflow-lead">Il vous voit, vous découvre, vous fait confiance et vous contacte. Votre équipe confirme le rendez-vous ; les automatisations accompagnent la suite.</p>
          <div className="workflow-grid">
            <div>
              <span>01</span>
              <strong>Google Ads</strong>
              <p>Soin + zone + message.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Site premium</strong>
              <p>Rassurer et orienter.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Photos + mini-quiz</strong>
              <p>Comprendre sa demande.</p>
            </div>
            <div>
              <span>04</span>
              <strong>Demande de créneau</strong>
              <p>Calendrier maître.</p>
            </div>
            <div>
              <span>05</span>
              <strong>Réception</strong>
              <p>Notification → vérification → confirmation.</p>
            </div>
            <div>
              <span>06</span>
              <strong>Rappel SMS</strong>
              <p>Après confirmation.</p>
            </div>
            <div>
              <span>07</span>
              <strong>La visite</strong>
              <p>L’équipe prend soin du patient.</p>
            </div>
            <div>
              <span>08</span>
              <strong>Invitation à un avis</strong>
              <p>Après la visite effectuée.</p>
            </div>
          </div>
          <div className="workflow-rules">
            <span>Urgence → contact direct</span>
            <span>Photos facultatives</span>
            <span>Aucune API dentaire</span>
          </div>
          <p className="workflow-foot">Parcours cible de l’offre. Les connexions, le calendrier et les automatisations sont à configurer pour chaque clinique ; cette présentation en simule le fonctionnement.</p>
        </div>
      </SlideFrame>
      <SlideFrame className="deck-slide " id="mesurer" data-deck="12" aria-labelledby="title-mesurer">
        <picture className="deck-photo">
          <source srcSet="/assets/dentist-800.webp 800w, /assets/dentist-1536.webp 1536w" sizes="100vw" />
          <img src="/assets/dentist-1536.webp" width="1536" height="1024" loading="lazy" alt="Une dentiste regarde le visiteur dans sa clinique." />
        </picture>
        <div className="deck-shade" aria-hidden="true">
        </div>
        <div className="deck-layout wrap">
          <div className="deck-copy">
            <p className="eyebrow">Et pour votre clinique : que rapporte ce parcours ?</p>
            <h2 id="title-mesurer">Le parcours est pensé.<br />
              <em>Mesurons sa valeur.</em>
            </h2>
            <p>Combien de traitements supplémentaires faut-il pour rentabiliser votre acquisition ? On relie les coûts aux contacts, puis aux visites et aux traitements attribuables aux campagnes.</p>
          </div>
          <div className="deck-demo">
            <div className="deck-panel">
              <div className="panel-label">LA QUESTION DU ROI<span>MÉTHODE</span>
              </div>
              <div className="roi-path">
                <span>Budget investi</span>
                <b>↓</b>
                <span>Contacts valides</span>
                <b>↓</b>
                <span>Patients venus</span>
                <b>↓</b>
                <strong>Traitements acceptés</strong>
              </div>
              <div className="roi-equation">
                <span>ROI DU DISPOSITIF</span>
                <p>(Marge attribuable − coûts d’acquisition)<br />÷ coûts d’acquisition</p>
              </div>
              <p className="fine">Coûts : publicité, gestion, part du site affectée à la période et outils. Calcul avec les données réelles du cabinet. Les contacts issus des appels et formulaires sont suivis selon les critères convenus ; un contact ne garantit pas une visite ni un traitement.</p>
            </div>
          </div>
        </div>
        <div className="deck-bottom wrap">
          <p>
            <span>LE GAIN POUR VOTRE CLINIQUE</span>Évaluer ce que l’acquisition rapporte et identifier l’étape à améliorer.</p>
          <span className="deck-number">12 <i>/ 12</i>
          </span>
        </div>
      </SlideFrame>
    </ExperienceRegion>
    <JourneyNavigation />
  </>;
}
