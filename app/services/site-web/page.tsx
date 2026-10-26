import type { Metadata } from 'next';
import { SiteHeader } from '../../../components/SiteHeader';
import { ServicesReveal } from '../../../components/ServicesReveal';

export const metadata: Metadata = {
  title: 'Création de Site Web — Karwisoft | Un site qui transforme les visites en patients',
  description:
    'Karwisoft crée des sites web pour cliniques dentaires : rapides, mobiles, et conçus pour convaincre le visiteur de prendre rendez-vous. Clé en main.',
};

export default function SiteWebPage() {
  return (
    <div className="sv-page sd-page">
      <SiteHeader services />

      <main id="main">

        {/* ── BREADCRUMB ── */}
        <nav className="sd-breadcrumb wrap" aria-label="Fil d'ariane">
          <a href="/services">Nos services</a>
          <span aria-hidden="true">›</span>
          <span aria-current="page">Création de Site Web</span>
        </nav>

        {/* ── HERO ── */}
        <header className="sd-hero wrap sv-fade-in" aria-labelledby="sd-title">
          <div className="sd-hero-badge">
            <span className="sd-badge-num">04</span>
            <span className="sd-badge-tag">Site Web</span>
          </div>
          <h1 id="sd-title">
            Création de<br />
            <em>Site Web</em>
          </h1>
          <p className="sd-hero-sub">
            Un site conçu spécifiquement pour les cliniques dentaires : lisible sur téléphone, rassurant pour le patient, et bâti pour
            <strong> transformer les visiteurs en rendez-vous</strong> — pas juste en curieux.
          </p>
          <div className="sd-hero-bar">
            <div className="sd-metric">
              <span>Clé en main</span>
              <small>vous n'avez rien à gérer</small>
            </div>
            <div className="sd-metric-sep" aria-hidden="true"></div>
            <div className="sd-metric">
              <span>Mobile first</span>
              <small>72 % des patients cherchent sur téléphone</small>
            </div>
            <div className="sd-metric-sep" aria-hidden="true"></div>
            <div className="sd-metric">
              <span>4–6 semaines</span>
              <small>du premier appel à la mise en ligne</small>
            </div>
          </div>
        </header>

        {/* ── POURQUOI C'EST IMPORTANT ── */}
        <section className="sd-section wrap sv-reveal" aria-labelledby="sd-why-title">
          <div className="sd-section-intro">
            <p className="sv-label">Le problème avec la plupart des sites dentaires</p>
            <h2 id="sd-why-title">Un patient visite votre site. Il repart sans appeler. Pourquoi ?</h2>
          </div>
          <div className="sd-two-col">
            <div>
              <p>
                La majorité des sites de cliniques dentaires sont fait pour dire « on existe ». Ce n'est pas suffisant. Un patient qui atterrit sur votre site a une question simple en tête : « Est-ce que cette clinique est faite pour moi ? »
              </p>
              <p>
                Si votre site ne répond pas à cette question en moins de 10 secondes — il part. Il rappelle votre concurrent. Votre site doit répondre clairement à : qui vous êtes, ce que vous faites, pourquoi vous faire confiance, et comment prendre rendez-vous. Tout le reste est secondaire.
              </p>
            </div>
            <div className="sd-callout">
              <p className="sd-callout-q">Ce qui manque la plupart du temps</p>
              <ul className="sd-callout-list">
                <li>Lisibilité sur téléphone (souvent catastrophique)</li>
                <li>Description claire de chaque soin, en langage patient</li>
                <li>Bouton de prise de rendez-vous visible et accessible</li>
                <li>Photos réelles de la clinique et de l'équipe</li>
                <li>Temps de chargement acceptable (lent = abandon)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── PLAN COMPLET ── */}
        <section className="sd-plan-section" aria-labelledby="sd-plan-title">
          <div className="wrap">
            <div className="sd-section-intro sv-reveal">
              <p className="sv-label">Notre plan pour vous</p>
              <h2 id="sd-plan-title">Du premier appel à la mise en ligne.</h2>
              <p>Vous n'avez pas à gérer un projet web. Vous répondez à nos questions une fois, on s'occupe de tout.</p>
            </div>
            <ol className="sd-plan-steps">
              <li className="sd-plan-item sv-reveal">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">01</span>
                  <div className="sd-plan-line" aria-hidden="true"></div>
                </div>
                <div className="sd-plan-content">
                  <h3>Entrevue de découverte</h3>
                  <p>Un appel de 60 minutes pour comprendre votre clinique : vos soins, votre équipe, vos valeurs, ce qui vous différencie, ce que vous aimeriez que les patients ressentent en visitant votre site. C'est votre seul vrai effort — on prend tout en note.</p>
                  <div className="sd-plan-deliverable">
                    <span>🎙️</span> Vous faites : Un seul appel. On s'occupe de la suite.
                  </div>
                </div>
              </li>
              <li className="sd-plan-item sv-reveal sv-delay-1">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">02</span>
                  <div className="sd-plan-line" aria-hidden="true"></div>
                </div>
                <div className="sd-plan-content">
                  <h3>Plan du site et structure</h3>
                  <p>On définit la structure de votre site : quelles pages créer, dans quel ordre, et quel contenu mettre où. On vous présente un plan simple à valider avant de commencer à créer quoi que ce soit.</p>
                  <div className="sd-plan-deliverable">
                    <span>📐</span> Vous validez : Structure du site avant le début du design
                  </div>
                </div>
              </li>
              <li className="sd-plan-item sv-reveal sv-delay-2">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">03</span>
                  <div className="sd-plan-line" aria-hidden="true"></div>
                </div>
                <div className="sd-plan-content">
                  <h3>Design professionnel</h3>
                  <p>On crée un design propre, professionnel, et adapté à l'image de votre clinique. Palette de couleurs cohérente, typographie lisible, photos bien intégrées. Conçu pour inspirer confiance au premier coup d'œil — sur téléphone comme sur ordinateur.</p>
                  <div className="sd-plan-deliverable">
                    <span>🎨</span> Vous validez : Maquette visuelle avant développement
                  </div>
                </div>
              </li>
              <li className="sd-plan-item sv-reveal sv-delay-3">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">04</span>
                  <div className="sd-plan-line" aria-hidden="true"></div>
                </div>
                <div className="sd-plan-content">
                  <h3>Rédaction de tout le contenu</h3>
                  <p>On rédige l'intégralité des textes de votre site : page d'accueil, pages de soins, présentation de l'équipe, FAQ, et page de contact. En langage clair pour le patient — pas du jargon médical. Vous lisez, vous corrigez si besoin, on publie.</p>
                  <div className="sd-plan-deliverable">
                    <span>📝</span> Vous recevez : Tout le contenu pour relecture avant publication
                  </div>
                </div>
              </li>
              <li className="sd-plan-item sv-reveal">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">05</span>
                  <div className="sd-plan-line" aria-hidden="true"></div>
                </div>
                <div className="sd-plan-content">
                  <h3>Développement et tests</h3>
                  <p>On construit le site, on le teste sur tous les appareils (téléphones, tablettes, ordinateurs), on vérifie la vitesse de chargement, et on s'assure que le formulaire et le bouton de rendez-vous fonctionnent parfaitement.</p>
                  <div className="sd-plan-deliverable">
                    <span>🔧</span> On fait : Tests complets avant mise en ligne
                  </div>
                </div>
              </li>
              <li className="sd-plan-item sv-reveal sv-delay-1">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">06</span>
                </div>
                <div className="sd-plan-content">
                  <h3>Mise en ligne et formation</h3>
                  <p>On publie votre site, on le connecte à Google Search Console (pour que Google commence à l'indexer), et on vous montre en 15 minutes comment mettre à jour vos horaires ou ajouter une info simple. Pas besoin de savoir coder.</p>
                  <div className="sd-plan-deliverable">
                    <span>🚀</span> Vous recevez : Site en ligne + formation de 15 minutes
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* ── CE QUI EST INCLUS ── */}
        <section className="sd-includes-section wrap sv-reveal" aria-labelledby="sd-includes-title">
          <p className="sv-label">Ce qui est inclus</p>
          <h2 id="sd-includes-title">Tout ce dont votre clinique a besoin.</h2>
          <div className="sd-includes-grid">
            <div className="sd-include-item sv-reveal">
              <span className="sd-include-icon">📱</span>
              <h3>Mobile parfait</h3>
              <p>Optimisé pour téléphone — là où arrivent 72 % de vos visiteurs.</p>
            </div>
            <div className="sd-include-item sv-reveal sv-delay-1">
              <span className="sd-include-icon">⚡</span>
              <h3>Chargement rapide</h3>
              <p>Un site lent perd des patients. On optimise chaque image et ressource.</p>
            </div>
            <div className="sd-include-item sv-reveal sv-delay-2">
              <span className="sd-include-icon">🦷</span>
              <h3>Pages de soins</h3>
              <p>Une page claire par soin : implants, blanchiment, orthodontie, urgences…</p>
            </div>
            <div className="sd-include-item sv-reveal sv-delay-3">
              <span className="sd-include-icon">📅</span>
              <h3>Prise de rendez-vous</h3>
              <p>Bouton de rendez-vous visible sur chaque page, formulaire ou lien direct.</p>
            </div>
            <div className="sd-include-item sv-reveal">
              <span className="sd-include-icon">🗺️</span>
              <h3>Google Maps intégré</h3>
              <p>Carte, horaires, numéro de téléphone — facilement accessibles.</p>
            </div>
            <div className="sd-include-item sv-reveal sv-delay-1">
              <span className="sd-include-icon">🔒</span>
              <h3>Sécurité HTTPS</h3>
              <p>Certificat SSL inclus — votre site est sécurisé et digne de confiance.</p>
            </div>
            <div className="sd-include-item sv-reveal sv-delay-2">
              <span className="sd-include-icon">✍️</span>
              <h3>Tous les textes rédigés</h3>
              <p>On écrit tout. Vous n'avez pas à rédiger une seule ligne.</p>
            </div>
            <div className="sd-include-item sv-reveal sv-delay-3">
              <span className="sd-include-icon">📊</span>
              <h3>Analytics inclus</h3>
              <p>Vous voyez combien de personnes visitent votre site et d'où elles viennent.</p>
            </div>
          </div>
        </section>

        {/* ── VOTRE RÔLE ── */}
        <section className="sd-role-section wrap sv-reveal" aria-labelledby="sd-role-title">
          <div className="sd-role-inner">
            <div className="sd-role-copy">
              <p className="sv-label">Votre rôle</p>
              <h2 id="sd-role-title">Répondre à nos questions.<br />Approuver le résultat. C'est tout.</h2>
              <p>
                Vous n'avez pas à gérer un projet web, à écrire du contenu, ou à comprendre le design. On s'occupe de tout. Vous faites confiance à notre processus, on livre un site clé en main.
              </p>
              <ul className="sd-role-list">
                <li><span>✓</span> Participer à l'entrevue de découverte <em>(60 min, une fois)</em></li>
                <li><span>✓</span> Valider la structure et le design <em>(2 fois, rapide)</em></li>
                <li><span>✓</span> Relire les textes avant publication <em>(à votre rythme)</em></li>
                <li><span>✓</span> Donner votre accord final pour la mise en ligne</li>
              </ul>
            </div>
            <div className="sd-role-visual" aria-hidden="true">
              <div className="sd-role-card">
                <p className="sd-role-card-title">CE QUE VOUS N'AVEZ PAS À FAIRE</p>
                <ul className="sd-role-not">
                  <li><span>✗</span> Écrire le moindre texte</li>
                  <li><span>✗</span> Gérer un hébergement ou un nom de domaine</li>
                  <li><span>✗</span> Comprendre le design ou le code</li>
                  <li><span>✗</span> Coordonner plusieurs prestataires</li>
                  <li><span>✗</span> Suivre un chantier technique complexe</li>
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
              <h2 id="sd-faq-title">Ce qu'on nous demande sur la création de site.</h2>
            </div>
            <div className="sv-faq-list">
              <details className="sv-faq-item sv-reveal">
                <summary>Combien ça coûte ?</summary>
                <p>Le prix varie selon la taille de votre clinique, le nombre de soins à couvrir, et vos besoins spécifiques. On vous donne un devis clair lors du premier appel, sans surprise. Pas de frais cachés.</p>
              </details>
              <details className="sv-faq-item sv-reveal sv-delay-1">
                <summary>Qui va s'occuper du site après la mise en ligne ?</summary>
                <p>Vous pouvez mettre à jour des informations simples (horaires, numéro) vous-même — on vous montre comment. Pour des changements plus importants, on est disponibles. On peut aussi proposer une maintenance mensuelle si vous préférez ne rien toucher.</p>
              </details>
              <details className="sv-faq-item sv-reveal sv-delay-2">
                <summary>Et si je n'ai pas de photos de ma clinique ?</summary>
                <p>On peut travailler avec des photos professionnelles de stock dans un premier temps, puis les remplacer quand vous aurez vos propres photos. On peut aussi vous recommander un photographe local. Le contenu ne bloque pas le projet.</p>
              </details>
              <details className="sv-faq-item sv-reveal sv-delay-3">
                <summary>Mon site actuel est mauvais. Vous pouvez le refaire complètement ?</summary>
                <p>Oui, c'est souvent la meilleure solution. Repartir sur une base propre permet de construire quelque chose qui fonctionne vraiment — plutôt que de bricoler un site qui a des problèmes de fond. On évalue ça ensemble lors du premier appel.</p>
              </details>
              <details className="sv-faq-item sv-reveal">
                <summary>Est-ce que vous faites aussi le SEO pour le site que vous créez ?</summary>
                <p>Oui. Les sites qu'on crée sont construits avec les bonnes bases SEO dès le départ. Si vous voulez aller plus loin avec un travail SEO mensuel continu, c'est un service séparé qu'on peut combiner. On vous explique ce qui a le plus de sens pour vous.</p>
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
                  On commence par regarder<br />
                  <em>votre site actuel ensemble.</em>
                </h2>
                <p>Un appel de 30 minutes pour voir ce qui manque, ce qui peut être amélioré, et si un nouveau site a vraiment du sens pour vous. On est honnêtes si la réponse est non.</p>
              </div>
              <div className="sv-cta-action sv-reveal sv-delay-2">
                <a className="sv-btn-cta" href="mailto:Contact@Karwisoft.com?subject=Nouveau site web pour ma clinique dentaire">
                  <span>Analyser mon site actuel</span>
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
          <a href="/services/google-ads">← Service précédent : Google Ads</a>
          <a href="/services">← Tous les services</a>
        </nav>
        <span>© 2026 Karwisoft Marketing</span>
      </footer>

      <ServicesReveal />
    </div>
  );
}
