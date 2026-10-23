import { SlideFrame,LandingChrome,SelectedModel,ContactLink } from './Experience';

export function Closing() {
  return <>
    <LandingChrome className="faq-section wrap" id="questions" aria-labelledby="faq-title" as="section">
      <div>
        <p className="eyebrow">Avant d’en parler ensemble</p>
        <h2 id="faq-title">Les bonnes questions.<br />
          <em>Des réponses claires.</em>
        </h2>
      </div>
      <div className="faq-list">
        <details>
          <summary>Que comprend votre accompagnement ?</summary>
          <p>Chaque formule Google Ads comprend les objectifs et le ciblage, la recherche de mots-clés, la création des campagnes et des annonces, le suivi des appels et formulaires, l’optimisation et un rapport mensuel. La création du site et ses fonctionnalités sont définies séparément au devis.</p>
        </details>
        <details>
          <summary>Quelle différence entre les trois formules ?</summary>
          <p>Essentielle, Avancée et Premium correspondent à des tranches différentes de budget publicitaire mensuel géré. La plateforme reste Google Ads et les prestations sont les mêmes. Les seuils de budget et les frais de gestion Karwisoft sont précisés au devis.</p>
        </details>
        <details>
          <summary>Le budget Google Ads est-il inclus ?</summary>
          <p>Le budget publicitaire est payé par la clinique et se distingue de la création du site et des frais de gestion. Le bonus de lancement couvre la configuration et les 30 premiers jours de gestion à compter du lancement des campagnes, à l’achat du site.</p>
        </details>
        <details>
          <summary>Comment la réception reçoit-elle les demandes ?</summary>
          <p>Le fonctionnement présenté prévoit une demande avec le contexte utile, une vérification par la réception, puis une confirmation au patient. L’équipe inscrit le rendez-vous dans son logiciel habituel. Les outils et notifications sont à configurer ; aucune connexion au logiciel dentaire n’est présentée comme déjà active.</p>
        </details>
        <details>
          <summary>Peut-on adapter ce parcours à notre clinique ?</summary>
          <p>Oui. La démonstration sert de point de départ : votre identité, vos soins, votre équipe et votre organisation déterminent le parcours final. Les photos et le quiz peuvent être facultatifs. L’aperçu du sourire montré ici reste une illustration.</p>
        </details>
      </div>
    </LandingChrome>
    <SlideFrame className="next-section wrap reveal" id="suite" aria-labelledby="next-title">
      <p className="eyebrow">Pourquoi vous ? Construisons la réponse.</p>
      <div className="next-row">
        <h2 id="next-title">Votre prochain patient.<br />
          <span className="serif">Un parcours pensé pour lui.</span>
        </h2>
        <div className="next-detail">
          <SelectedModel />
          <p className="micro">Votre clinique, vos soins, votre zone. Et un message qui parle à vos patients.</p>
          <ContactLink />
          <a className="contact-email" href="mailto:Contact@Karwisoft.com">Contact@Karwisoft.com</a>
          <p className="contact-note">Écrivez-nous le nom de votre clinique, votre ville et les soins que vous souhaitez développer.</p>
        </div>
      </div>
    </SlideFrame>
  </>;
}
