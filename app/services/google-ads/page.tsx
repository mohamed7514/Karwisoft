import type { Metadata } from 'next';
import { SiteHeader } from '../../../components/SiteHeader';
import { ServicesReveal } from '../../../components/ServicesReveal';

export const metadata: Metadata = {
  title: 'Publicités Google (Google Ads) — Karwisoft | Nouveaux patients dès cette semaine',
  description:
    'Karwisoft gère vos campagnes Google Ads pour attirer des patients rapidement. Vous approuvez le budget, vous répondez aux appels. On gère le reste.',
};

export default function GoogleAdsPage() {
  return (
    <div className="sv-page sd-page">
      <SiteHeader services />

      <main id="main">

        {/* ── BREADCRUMB ── */}
        <nav className="sd-breadcrumb wrap" aria-label="Fil d'ariane">
          <a href="/services">Nos services</a>
          <span aria-hidden="true">›</span>
          <span aria-current="page">Publicités Google</span>
        </nav>

        {/* ── HERO ── */}
        <header className="sd-hero wrap sv-fade-in" aria-labelledby="sd-title">
          <div className="sd-hero-badge">
            <span className="sd-badge-num">03</span>
            <span className="sd-badge-tag">Google Ads</span>
          </div>
          <h1 id="sd-title">
            Publicités<br />
            <em>Google</em>
          </h1>
          <p className="sd-hero-sub">
            Votre clinique apparaît <strong>en tête de Google dès cette semaine</strong>, exactement quand un patient est prêt à appeler. Vous ne payez que quand quelqu'un clique — jamais pour la vue.
          </p>
          <div className="sd-hero-bar">
            <div className="sd-metric">
              <span>1–7 jours</span>
              <small>pour voir les premières demandes</small>
            </div>
            <div className="sd-metric-sep" aria-hidden="true"></div>
            <div className="sd-metric">
              <span>Clic = intérêt</span>
              <small>vous payez seulement si on vous clique</small>
            </div>
            <div className="sd-metric-sep" aria-hidden="true"></div>
            <div className="sd-metric">
              <span>Contrôle total</span>
              <small>votre budget reste entre vos mains</small>
            </div>
          </div>
        </header>

        {/* ── POURQUOI C'EST IMPORTANT ── */}
        <section className="sd-section wrap sv-reveal" aria-labelledby="sd-why-title">
          <div className="sd-section-intro">
            <p className="sv-label">Comment ça fonctionne simplement</p>
            <h2 id="sd-why-title">Votre annonce, devant le bon patient, au bon moment.</h2>
          </div>
          <div className="sd-two-col">
            <div>
              <p>
                Google Ads, c'est simple : vous payez Google pour afficher votre annonce en tête des résultats quand quelqu'un cherche un soin que vous offrez. Le patient voit votre clinique avant tous les autres — y compris avant ceux qui ont travaillé leur SEO pendant des années.
              </p>
              <p>
                Le grand avantage : c'est <strong>immédiat.</strong> Pas besoin d'attendre 6 mois. Si vous ouvrez une nouvelle clinique, si vous avez des plages horaires à remplir, ou si vous voulez promouvoir un soin précis — Google Ads est la solution la plus rapide.
              </p>
            </div>
            <div className="sd-callout">
              <p className="sd-callout-q">La différence clé avec le SEO</p>
              <p>Le SEO, c'est construire une présence qui dure — mais ça prend 3 à 6 mois. Google Ads, c'est une vitrine instantanée — ça marche dès le premier jour, mais l'effet s'arrête si vous stoppez les campagnes. Les deux sont complémentaires selon vos besoins.</p>
            </div>
          </div>
        </section>

        {/* ── PLAN COMPLET ── */}
        <section className="sd-plan-section" aria-labelledby="sd-plan-title">
          <div className="wrap">
            <div className="sd-section-intro sv-reveal">
              <p className="sv-label">Notre plan pour vous</p>
              <h2 id="sd-plan-title">Ce qu'on fait, du premier appel au rapport mensuel.</h2>
            </div>
            <ol className="sd-plan-steps">
              <li className="sd-plan-item sv-reveal">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">01</span>
                  <div className="sd-plan-line" aria-hidden="true"></div>
                </div>
                <div className="sd-plan-content">
                  <h3>Définir ensemble vos objectifs</h3>
                  <p>On commence par comprendre ce que vous voulez : attirer plus de patients en général ? Promouvoir un soin spécifique comme les implants ou le blanchiment ? Cibler une zone géographique précise ? On adapte la stratégie à vos priorités réelles.</p>
                  <div className="sd-plan-deliverable">
                    <span>🎯</span> On définit : Objectifs, soins à promouvoir, secteur géographique
                  </div>
                </div>
              </li>
              <li className="sd-plan-item sv-reveal sv-delay-1">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">02</span>
                  <div className="sd-plan-line" aria-hidden="true"></div>
                </div>
                <div className="sd-plan-content">
                  <h3>Définir votre budget — vous gardez le contrôle</h3>
                  <p>Le budget que vous payez à Google est entièrement séparé de nos honoraires. Vous décidez combien vous mettez, vous pouvez le voir en temps réel dans votre compte Google, et vous pouvez l'ajuster ou le mettre en pause à tout moment. On ne touche jamais à votre carte.</p>
                  <div className="sd-plan-deliverable">
                    <span>💳</span> Vous gardez : Accès complet à votre compte Google Ads
                  </div>
                </div>
              </li>
              <li className="sd-plan-item sv-reveal sv-delay-2">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">03</span>
                  <div className="sd-plan-line" aria-hidden="true"></div>
                </div>
                <div className="sd-plan-content">
                  <h3>Création des annonces — vous validez avant tout</h3>
                  <p>On rédige les annonces qui vont apparaître sur Google : le titre, la description, les liens rapides. On vous soumet tout avant le lancement. Rien ne part sans votre approbation. Le message reflète exactement l'image de votre clinique.</p>
                  <div className="sd-plan-deliverable">
                    <span>📝</span> Vous validez : Chaque annonce avant sa mise en ligne
                  </div>
                </div>
              </li>
              <li className="sd-plan-item sv-reveal sv-delay-3">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">04</span>
                  <div className="sd-plan-line" aria-hidden="true"></div>
                </div>
                <div className="sd-plan-content">
                  <h3>Ciblage précis de votre secteur</h3>
                  <p>On configure les campagnes pour cibler uniquement les patients dans votre zone géographique — votre ville, vos quartiers, un rayon autour de votre clinique. Pas question de payer pour des clics de gens à 200 km qui ne viendront jamais.</p>
                  <div className="sd-plan-deliverable">
                    <span>📍</span> On fait : Ciblage géographique précis, jours et heures optimaux
                  </div>
                </div>
              </li>
              <li className="sd-plan-item sv-reveal">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">05</span>
                  <div className="sd-plan-line" aria-hidden="true"></div>
                </div>
                <div className="sd-plan-content">
                  <h3>Surveillance quotidienne et optimisation</h3>
                  <p>On surveille les performances chaque semaine : quelles annonces génèrent des appels, quels mots-clés convertissent, où le budget est gaspillé. On ajuste en temps réel pour maximiser le nombre de patients par dollar dépensé.</p>
                  <div className="sd-plan-deliverable">
                    <span>🔍</span> On fait : Optimisation hebdomadaire des campagnes
                  </div>
                </div>
              </li>
              <li className="sd-plan-item sv-reveal sv-delay-1">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">06</span>
                </div>
                <div className="sd-plan-content">
                  <h3>Rapport mensuel clair</h3>
                  <p>Chaque mois, on vous envoie un rapport simple : combien de clics, combien d'appels générés, coût par contact, et ce qu'on a ajusté. Pas de jargon. Vous savez exactement ce que vous avez obtenu pour votre investissement.</p>
                  <div className="sd-plan-deliverable">
                    <span>📊</span> Vous recevez : Rapport mensuel avec coût par patient acquis
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* ── VOTRE RÔLE ── */}
        <section className="sd-role-section wrap sv-reveal" aria-labelledby="sd-role-title">
          <div className="sd-role-inner">
            <div className="sd-role-copy">
              <p className="sv-label">Votre rôle</p>
              <h2 id="sd-role-title">Approuvez. Attendez les appels.<br />C'est tout.</h2>
              <p>
                Google Ads est le service qui demande le moins d'implication de votre part. On configure tout. Vous approuvez le budget et les annonces. Ensuite : votre téléphone sonne.
              </p>
              <ul className="sd-role-list">
                <li><span>✓</span> Définir votre budget mensuel <em>(vous gardez le contrôle)</em></li>
                <li><span>✓</span> Approuver les annonces avant lancement <em>(15 minutes)</em></li>
                <li><span>✓</span> Répondre aux appels et demandes de rendez-vous</li>
                <li><span>✓</span> Lire le rapport mensuel <em>(5 minutes)</em></li>
              </ul>
            </div>
            <div className="sd-role-visual" aria-hidden="true">
              <div className="sd-role-card">
                <p className="sd-role-card-title">CE QUE VOUS N'AVEZ PAS À FAIRE</p>
                <ul className="sd-role-not">
                  <li><span>✗</span> Créer ou gérer les campagnes vous-même</li>
                  <li><span>✗</span> Choisir les mots-clés</li>
                  <li><span>✗</span> Surveiller les performances au quotidien</li>
                  <li><span>✗</span> Comprendre comment Google Ads fonctionne</li>
                  <li><span>✗</span> Ajuster les enchères ou les budgets</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="sv-faq" aria-labelledby="sd-faq-title">
          <div className="wrap">
            <div className="sv-faq-intro sv-reveal">
              <p className="sv-label">Vos questions</p>
              <h2 id="sd-faq-title">Ce qu'on nous demande sur Google Ads.</h2>
            </div>
            <div className="sv-faq-list">
              <details className="sv-faq-item sv-reveal">
                <summary>Quel budget minimum pour que ça marche ?</summary>
                <p>Ça dépend de votre secteur et de la compétitivité. En dentisterie, un budget de départ raisonnable est autour de 500 à 800 $ par mois en publicités. On vous conseille un budget selon votre marché local lors de notre premier appel — et on ne pousse jamais à dépenser plus que nécessaire.</p>
              </details>
              <details className="sv-faq-item sv-reveal sv-delay-1">
                <summary>Est-ce que je peux mettre mes campagnes en pause ?</summary>
                <p>Oui, à tout moment. Vous avez le contrôle total sur votre compte Google Ads. Si vous partez en vacances, si vous êtes complet pour le mois, ou si vous voulez changer de stratégie — on peut mettre en pause ou ajuster immédiatement.</p>
              </details>
              <details className="sv-faq-item sv-reveal sv-delay-2">
                <summary>Comment je sais que les appels viennent de Google Ads ?</summary>
                <p>On met en place un suivi d'appels qui vous permet de voir exactement combien d'appels ont été générés par vos annonces. Vous voyez le nombre, l'heure, et la durée — sans avoir à vous fier uniquement à notre parole.</p>
              </details>
              <details className="sv-faq-item sv-reveal sv-delay-3">
                <summary>Est-ce que Google Ads peut me ruiner si ça ne marche pas ?</summary>
                <p>Non. Vous fixez un budget maximum quotidien ou mensuel. Google ne peut jamais dépasser ce plafond. Si on constate que les résultats ne sont pas au rendez-vous, on ajuste la stratégie avant de continuer à dépenser.</p>
              </details>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="sv-cta" aria-labelledby="sd-cta-title">
          <div className="wrap">
            <div className="sv-cta-inner">
              <div className="sv-cta-copy sv-reveal">
                <p className="sv-label sv-label-light">Prochaine étape</p>
                <h2 id="sd-cta-title">
                  On analyse votre marché local<br />
                  <em>et on vous dit ce que ça peut rapporter.</em>
                </h2>
                <p>Un appel de 30 minutes pour évaluer la demande dans votre secteur, estimer le coût par patient, et voir si Google Ads est la bonne solution pour vous.</p>
              </div>
              <div className="sv-cta-action sv-reveal sv-delay-2">
                <a className="sv-btn-cta" href="mailto:Contact@Karwisoft.com?subject=Google Ads pour ma clinique dentaire">
                  <span>Analyser mon marché local</span>
                  <span className="sv-btn-arrow" aria-hidden="true">↗</span>
                </a>
                <a className="sv-cta-email" href="/services">← Retour aux services</a>
                <p className="sv-cta-note">Sans engagement · Réponse en moins de 24 heures</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="sv-footer wrap">
        <a className="brand" href="/">karwisoft<span>marketing</span></a>
        <nav aria-label="Navigation de pied de page">
          <a href="/services/seo-ia">← Service précédent : SEO IA</a>
          <a href="/services/site-web">Service suivant : Site Web →</a>
        </nav>
        <span>© 2026 Karwisoft Marketing</span>
      </footer>

      <ServicesReveal />
    </div>
  );
}
