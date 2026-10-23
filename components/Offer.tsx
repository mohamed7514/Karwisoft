import { SlideFrame,ModelCard,ModelButton } from './Experience';

export function Offer() {
  return <>
    <SlideFrame className="offer-section" id="offre" aria-labelledby="offer-title">
      <div className="wrap">
        <div className="offer-heading reveal">
          <p className="eyebrow">Une seule plateforme. Le même accompagnement.</p>
          <h2 id="offer-title">Votre budget Google Ads.<br />
            <span className="serif">La formule qui lui correspond.</span>
          </h2>
          <p>Trois formules de gestion Google Ads, avec les mêmes prestations. Seule la tranche de budget publicitaire mensuel géré change.</p>
        </div>
        <div className="offer-common">
          <h3>Inclus dans chaque formule.</h3>
          <ul>
            <li>
              <strong>Objectifs et zone ciblée</strong>
              <span>Définir les soins à promouvoir et le secteur à couvrir.</span>
            </li>
            <li>
              <strong>Recherche de mots-clés</strong>
              <span>Choisir les recherches auxquelles vos annonces répondent.</span>
            </li>
            <li>
              <strong>Création des campagnes</strong>
              <span>Organiser les campagnes et rédiger les annonces Google Ads.</span>
            </li>
            <li>
              <strong>Suivi des contacts</strong>
              <span>Configurer la mesure des appels et des formulaires.</span>
            </li>
            <li>
              <strong>Gestion et optimisation</strong>
              <span>Surveiller les dépenses et ajuster les campagnes.</span>
            </li>
            <li>
              <strong>Rapport mensuel</strong>
              <span>Expliquer les résultats et les prochaines actions.</span>
            </li>
          </ul>
        </div>
        <div className="offer-grid reveal">
          <ModelCard model="essentielle">
            <div className="offer-card-top">
              <span>01 / PREMIÈRE TRANCHE</span>
              <span aria-hidden="true">↗</span>
            </div>
            <h3>Essentielle.</h3>
            <p>La formule correspondant à notre première tranche de budget publicitaire mensuel géré.</p>
            <span className="offer-platform">Google Ads · Mêmes prestations</span>
            <div className="offer-price">Budget publicitaire <span>Tranche sur devis</span>
            </div>
            <div className="offer-price">Gestion Karwisoft <span>Sur devis</span>
            </div>
            <ModelButton model="essentielle" />
          </ModelCard>
          <ModelCard model="avancee">
            <div className="offer-card-top">
              <span>02 / TRANCHE INTERMÉDIAIRE</span>
              <span aria-hidden="true">↗</span>
            </div>
            <h3>Avancée.</h3>
            <p>La formule correspondant à une tranche de budget publicitaire mensuel géré plus élevée.</p>
            <span className="offer-platform">Google Ads · Mêmes prestations</span>
            <div className="offer-price">Budget publicitaire <span>Tranche sur devis</span>
            </div>
            <div className="offer-price">Gestion Karwisoft <span>Sur devis</span>
            </div>
            <ModelButton model="avancee" />
          </ModelCard>
          <ModelCard model="premium">
            <div className="offer-card-top">
              <span>03 / TRANCHE SUPÉRIEURE</span>
              <span aria-hidden="true">↗</span>
            </div>
            <h3>Premium.</h3>
            <p>La formule correspondant à notre tranche supérieure de budget publicitaire mensuel géré.</p>
            <span className="offer-platform">Google Ads · Mêmes prestations</span>
            <div className="offer-price">Budget publicitaire <span>Tranche sur devis</span>
            </div>
            <div className="offer-price">Gestion Karwisoft <span>Sur devis</span>
            </div>
            <ModelButton model="premium" />
          </ModelCard>
        </div>
        <div className="offer-note">
          <p>Le budget publicitaire est payé à Google par la clinique. Les frais de gestion Karwisoft sont distincts. Les seuils des tranches, les honoraires et la création du site sont précisés au devis.</p>
          <p>Les mêmes prestations dans les trois formules, exclusivement sur Google Ads.</p>
        </div>
        <div className="launch-bonus reveal">
          <span className="bonus-symbol" aria-hidden="true">✳</span>
          <div>
            <p className="eyebrow">Pour lancer le mouvement</p>
            <h3>Configuration Google Ads<br />+ 30 jours de gestion offerts.</h3>
            <p>À l’achat du site. Les 30 jours commencent au lancement des campagnes. Budget publicitaire à la charge du cabinet ; suite de la gestion précisée au devis.</p>
          </div>
          <span className="bonus-label">BONUS<br />DE LANCEMENT</span>
        </div>
      </div>
    </SlideFrame>
  </>;
}
