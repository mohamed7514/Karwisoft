import type { Metadata } from 'next';
import { SiteHeader } from '../../components/SiteHeader';
import { ServicesObserver } from '../../components/ServicesObserver';
import { ServicesReveal } from '../../components/ServicesReveal';

export const metadata: Metadata = {
  title: 'Comment ça marche — Karwisoft | Marketing pour cliniques dentaires',
  description:
    'Comment Karwisoft aide votre clinique dentaire à attirer plus de patients : une explication simple, sans jargon, de ce que nous faisons concrètement.',
};

export default function ServicesPage() {
  return (
    <div className="sv-page">
      <SiteHeader services />

      <main id="main">

        {/* ══════════════════════════════════════════
            HERO — La question des 10 patients
        ══════════════════════════════════════════ */}
        <section className="sv-hero wrap" aria-labelledby="sv-title">
          <div className="sv-hero-copy sv-fade-in">
            <p className="sv-label">Pour les cliniques dentaires</p>
            <h1 id="sv-title">
              Docteur, si 10 nouveaux patients cherchent un implant dentaire aujourd'hui —{' '}
              <span className="sv-h1-accent">combien vont choisir votre clinique plutôt qu'une autre ?</span>
            </h1>
            <p className="sv-hero-desc">
              La plupart vont ouvrir Google, regarder les 3 premiers résultats, et appeler. Si votre clinique n'est pas là, elle n'existe pas pour eux.
            </p>
            <div className="sv-hero-actions">
              <a className="sv-btn-primary" href="#comment">Voir comment changer ça</a>
              <a className="sv-btn-ghost" href="#contact">Parler à quelqu'un</a>
            </div>
          </div>

          {/* Visuel : 10 patients, répartition réelle */}
          <div className="sv-hero-visual sv-fade-in sv-delay-1" aria-hidden="true">
            <div className="sv-ten">
              <p className="sv-ten-title">10 patients qui cherchent aujourd'hui</p>
              <div className="sv-ten-grid">
                <span className="sv-patient sv-patient-you">🧑</span>
                <span className="sv-patient sv-patient-you">🧑</span>
                <span className="sv-patient sv-patient-lost">🧑</span>
                <span className="sv-patient sv-patient-lost">🧑</span>
                <span className="sv-patient sv-patient-lost">🧑</span>
                <span className="sv-patient sv-patient-lost">🧑</span>
                <span className="sv-patient sv-patient-lost">🧑</span>
                <span className="sv-patient sv-patient-lost">🧑</span>
                <span className="sv-patient sv-patient-lost">🧑</span>
                <span className="sv-patient sv-patient-lost">🧑</span>
              </div>
              <div className="sv-ten-legend">
                <span className="sv-leg sv-leg-you"><span></span>Votre clinique</span>
                <span className="sv-leg sv-leg-lost"><span></span>Vos concurrents</span>
              </div>
              <p className="sv-ten-note">
                Sans visibilité en ligne,<br />la majorité vous échappe.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            LE PROBLÈME
        ══════════════════════════════════════════ */}
        <section className="sv-problem wrap sv-reveal" aria-label="Le problème que nous résolvons">
          <div className="sv-problem-text">
            <p className="sv-label">La réalité aujourd'hui</p>
            <h2>Avoir une excellente clinique<br />ne suffit plus.</h2>
            <p>
              Vos patients actuels vous connaissent. Ils reviennent, ils vous recommandent — c'est bien. Mais le patient qui vient d'emménager dans le quartier, lui, il cherche en ligne. Et s'il ne vous trouve pas facilement, vous n'existez pas pour lui.
            </p>
          </div>
          <div className="sv-problem-stats">
            <div className="sv-stat sv-reveal sv-delay-1">
              <span className="sv-stat-num">8 / 10</span>
              <span className="sv-stat-desc">patients cherchent leur dentiste en ligne avant d'appeler</span>
            </div>
            <div className="sv-stat sv-reveal sv-delay-2">
              <span className="sv-stat-num">3 sec</span>
              <span className="sv-stat-desc">c'est le temps qu'un visiteur passe avant de décider de rester ou partir</span>
            </div>
            <div className="sv-stat sv-reveal sv-delay-3">
              <span className="sv-stat-num">1re page</span>
              <span className="sv-stat-desc">92 % des clics se font sur les résultats de la première page Google</span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            NOS 4 SERVICES — Aperçu + lien vers page détail
        ══════════════════════════════════════════ */}
        <section className="sv-how" id="comment" aria-labelledby="sv-how-title">
          <div className="wrap">
            <div className="sv-how-intro sv-reveal">
              <p className="sv-label">Ce que nous faisons concrètement</p>
              <h2 id="sv-how-title">
                Quatre façons d'amener<br />plus de patients jusqu'à vous.
              </h2>
              <p>
                Pas de jargon. Juste ce que ça fait vraiment pour votre clinique.
              </p>
            </div>

            {/* SERVICE 1 — SEO */}
            <div className="sv-lever sv-reveal" id="seo" aria-labelledby="lv1-title">
              <div className="sv-lever-num" aria-hidden="true">01</div>
              <div className="sv-lever-body">
                <div className="sv-lever-copy">
                  <p className="sv-label">Service 01</p>
                  <h3 id="lv1-title">Référencement Naturel <span className="sv-service-tag">SEO</span></h3>
                  <p className="sv-service-def">
                    Quand un patient tape « implant dentaire » ou « urgence dentaire » sur Google, votre clinique apparaît parmi les premiers résultats — <strong>sans payer pour chaque clic.</strong>
                  </p>
                  <ul className="sv-gains">
                    <li><span>↗</span> Plus de visites depuis des patients qui cherchent exactement ce que vous offrez</li>
                    <li><span>↗</span> Présence durable sur Google — l'effet grandit avec le temps</li>
                    <li><span>↗</span> Rapport mensuel clair : vous voyez tout ce qui progresse</li>
                  </ul>
                  <a className="sv-lever-link" href="/services/seo">
                    Voir comment on s'y prend →
                  </a>
                </div>
                <div className="sv-lever-visual sv-reveal sv-delay-1">
                  <div className="sv-visual-card">
                    <div className="sv-vc-header">
                      <span className="sv-vc-label">RÉSULTAT DANS GOOGLE</span>
                    </div>
                    <div className="sv-vc-query">
                      <span>⌕</span> implant dentaire clinique
                    </div>
                    <div className="sv-vc-result">
                      <span className="sv-vc-badge">Votre clinique — 1re position</span>
                      <p>Implants dentaires — Clinique du Sourire</p>
                      <small>clinique-du-sourire.ca › implants · ★★★★★ 4.9 (127 avis)</small>
                    </div>
                    <div className="sv-vc-result sv-vc-dim">
                      <p>Concurrent #2</p>
                      <small>autre-clinique.ca</small>
                    </div>
                    <div className="sv-vc-result sv-vc-dim">
                      <p>Concurrent #3</p>
                      <small>clinique-abc.ca</small>
                    </div>
                    <p className="sv-vc-note">Exemple illustratif · Délai typique : 3 à 6 mois</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SERVICE 2 — SEO IA */}
            <div className="sv-lever sv-lever-alt sv-reveal" id="seo-ia" aria-labelledby="lv2-title">
              <div className="sv-lever-num" aria-hidden="true">02</div>
              <div className="sv-lever-body">
                <div className="sv-lever-visual sv-reveal sv-delay-1">
                  <div className="sv-visual-card sv-vc-dark">
                    <div className="sv-vc-header">
                      <span className="sv-vc-label">QUESTION À CHATGPT / GOOGLE IA</span>
                    </div>
                    <div className="sv-vc-ai-q">
                      « C'est quoi un implant dentaire et combien ça coûte ? »
                    </div>
                    <div className="sv-vc-ai-a">
                      <span className="sv-ai-dot">✳</span>
                      <p>Un implant dentaire est une racine artificielle en titane posée dans la mâchoire. Le coût varie entre 1 500 $ et 3 000 $… <span className="sv-ai-source">— Contenu de votre site référencé</span></p>
                    </div>
                    <p className="sv-vc-note">Exemple éditorial · Dépend de la qualité de votre contenu</p>
                  </div>
                </div>
                <div className="sv-lever-copy">
                  <p className="sv-label">Service 02</p>
                  <h3 id="lv2-title">Référencement pour l'IA <span className="sv-service-tag">SEO IA</span></h3>
                  <p className="sv-service-def">
                    De plus en plus de patients posent leurs questions directement à ChatGPT ou Google IA. Si votre site contient les bonnes réponses, <strong>l'IA vous cite comme référence</strong> — devant des milliers de personnes.
                  </p>
                  <ul className="sv-gains">
                    <li><span>↗</span> Votre clinique mentionnée quand les patients cherchent à comprendre leurs soins</li>
                    <li><span>↗</span> Une visibilité que la plupart de vos concurrents n'ont pas encore</li>
                    <li><span>↗</span> Votre expertise perçue comme une référence, avant même le premier contact</li>
                  </ul>
                  <a className="sv-lever-link" href="/services/seo-ia">
                    Voir comment on s'y prend →
                  </a>
                </div>
              </div>
            </div>

            {/* SERVICE 3 — Google Ads */}
            <div className="sv-lever sv-reveal" id="google-ads" aria-labelledby="lv3-title">
              <div className="sv-lever-num" aria-hidden="true">03</div>
              <div className="sv-lever-body">
                <div className="sv-lever-copy">
                  <p className="sv-label">Service 03</p>
                  <h3 id="lv3-title">Publicités Google <span className="sv-service-tag">Google Ads</span></h3>
                  <p className="sv-service-def">
                    Votre clinique apparaît <strong>en tête de Google dès demain</strong>, avant même les résultats naturels. Vous ne payez que quand quelqu'un clique — jamais pour la vue.
                  </p>
                  <ul className="sv-gains">
                    <li><span>↗</span> Des appels et demandes de rendez-vous dès la première semaine</li>
                    <li><span>↗</span> Ciblage précis : seulement les patients dans votre secteur</li>
                    <li><span>↗</span> Votre budget reste toujours entre vos mains — on ne touche pas à votre carte</li>
                  </ul>
                  <a className="sv-lever-link" href="/services/google-ads">
                    Voir comment on s'y prend →
                  </a>
                </div>
                <div className="sv-lever-visual sv-reveal sv-delay-1">
                  <div className="sv-visual-card">
                    <div className="sv-vc-header">
                      <span className="sv-vc-label">CE QUI SE PASSE EN 3 ÉTAPES</span>
                    </div>
                    <div className="sv-steps">
                      <div className="sv-step">
                        <span className="sv-step-n">1</span>
                        <div>
                          <strong>Le patient cherche</strong>
                          <span>« implant dentaire urgent »</span>
                        </div>
                      </div>
                      <div className="sv-step-arrow">↓</div>
                      <div className="sv-step">
                        <span className="sv-step-n">2</span>
                        <div>
                          <strong>Votre annonce apparaît en premier</strong>
                          <span>Avant les résultats naturels, avant vos concurrents</span>
                        </div>
                      </div>
                      <div className="sv-step-arrow">↓</div>
                      <div className="sv-step">
                        <span className="sv-step-n">3</span>
                        <div>
                          <strong>Il vous contacte</strong>
                          <span>Appel direct, formulaire, ou prise de rendez-vous</span>
                        </div>
                      </div>
                    </div>
                    <p className="sv-vc-note">Résultats possibles dès la première semaine</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SERVICE 4 — Site Web */}
            <div className="sv-lever sv-lever-alt sv-reveal" id="sites-web" aria-labelledby="lv4-title">
              <div className="sv-lever-num" aria-hidden="true">04</div>
              <div className="sv-lever-body">
                <div className="sv-lever-visual sv-reveal sv-delay-1">
                  <div className="sv-visual-card sv-vc-site">
                    <div className="sv-site-bar">
                      <span aria-hidden="true">● ● ●</span>
                      <span>votre-clinique.ca</span>
                    </div>
                    <div className="sv-site-content">
                      <div className="sv-site-img"></div>
                      <div className="sv-site-text">
                        <strong>Bienvenue chez Dr. Lemaire</strong>
                        <p>Une clinique centrée sur votre confort. Prenez rendez-vous en ligne.</p>
                        <span className="sv-site-cta">Prendre rendez-vous →</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sv-lever-copy">
                  <p className="sv-label">Service 04</p>
                  <h3 id="lv4-title">Création de Site Web <span className="sv-service-tag">Site Web</span></h3>
                  <p className="sv-service-def">
                    Un site conçu pour les cliniques dentaires : rapide, lisible sur téléphone, et bâti pour <strong>convaincre le visiteur de prendre rendez-vous</strong> — pas juste de regarder.
                  </p>
                  <ul className="sv-gains">
                    <li><span>↗</span> Un site qui donne envie d'appeler dès les premières secondes</li>
                    <li><span>↗</span> Clé en main : vous répondez à nos questions une fois, on fait le reste</li>
                    <li><span>↗</span> Compatible mobile, rapide, et connecté à Google dès la mise en ligne</li>
                  </ul>
                  <a className="sv-lever-link" href="/services/site-web">
                    Voir comment on s'y prend →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            POURQUOI KARWISOFT
        ══════════════════════════════════════════ */}
        <section className="sv-why wrap sv-reveal" aria-labelledby="sv-why-title">
          <div className="sv-why-intro">
            <p className="sv-label">Pourquoi Karwisoft</p>
            <h2 id="sv-why-title">On ne vend pas des services.<br />On aide votre clinique à grandir.</h2>
          </div>
          <div className="sv-why-grid">
            <div className="sv-why-card sv-reveal sv-delay-1">
              <span className="sv-why-icon" aria-hidden="true">🦷</span>
              <h3>On se spécialise en dentisterie</h3>
              <p>On ne travaille pas avec des plombiers ni des restaurants. On comprend votre domaine, vos soins, et ce que recherchent vos futurs patients.</p>
            </div>
            <div className="sv-why-card sv-reveal sv-delay-2">
              <span className="sv-why-icon" aria-hidden="true">📊</span>
              <h3>Vous voyez ce qui se passe</h3>
              <p>Chaque mois, un rapport simple : combien de personnes vous ont trouvé, combien ont appelé, ce qu'on a ajusté. Pas de boîte noire.</p>
            </div>
            <div className="sv-why-card sv-reveal sv-delay-3">
              <span className="sv-why-icon" aria-hidden="true">🤝</span>
              <h3>Un vrai interlocuteur</h3>
              <p>Pas un ticket de support. Une personne qui connaît votre clinique, répond à vos questions et vous explique chaque décision.</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PROCESS
        ══════════════════════════════════════════ */}
        <section className="sv-process wrap sv-reveal" aria-labelledby="sv-process-title">
          <div className="sv-process-intro">
            <p className="sv-label">Comment on démarre ensemble</p>
            <h2 id="sv-process-title">Simple. Pas de surprise.</h2>
          </div>
          <ol className="sv-process-list">
            <li className="sv-process-step sv-reveal sv-delay-1">
              <span className="sv-pstep-n" aria-hidden="true">1</span>
              <div>
                <h3>On se parle</h3>
                <p>Un appel de 30 minutes pour comprendre votre clinique, vos objectifs, et ce qui freine votre croissance en ligne. Sans engagement, sans jargon.</p>
              </div>
            </li>
            <li className="sv-process-step sv-reveal sv-delay-2">
              <span className="sv-pstep-n" aria-hidden="true">2</span>
              <div>
                <h3>On vous propose un plan</h3>
                <p>Un devis clair avec exactement ce qu'on va faire, pourquoi, et combien ça coûte. Vous décidez ce qui a du sens pour vous.</p>
              </div>
            </li>
            <li className="sv-process-step sv-reveal sv-delay-3">
              <span className="sv-pstep-n" aria-hidden="true">3</span>
              <div>
                <h3>On travaille. Vous soignez.</h3>
                <p>On s'occupe du reste. Votre seul rôle : répondre aux nouveaux patients qui vous contactent.</p>
              </div>
            </li>
            <li className="sv-process-step sv-reveal sv-delay-3">
              <span className="sv-pstep-n" aria-hidden="true">4</span>
              <div>
                <h3>On ajuste chaque mois</h3>
                <p>Le web évolue. On surveille, on optimise, on vous tient informé. Ce qui marche, on le renforce. Ce qui ne marche pas, on le change.</p>
              </div>
            </li>
          </ol>
        </section>

        {/* ══════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════ */}
        <section className="sv-faq" id="questions" aria-labelledby="sv-faq-title">
          <div className="wrap">
            <div className="sv-faq-intro sv-reveal">
              <p className="sv-label">Vos questions</p>
              <h2 id="sv-faq-title">Les choses qu'on nous demande souvent.</h2>
            </div>
            <div className="sv-faq-list">
              <details className="sv-faq-item sv-reveal">
                <summary>Est-ce que je dois prendre les quatre services en même temps ?</summary>
                <p>Non. On commence par ce qui a le plus d'impact pour votre situation. Certaines cliniques démarrent avec un site web, d'autres avec Google Ads pour des résultats rapides. On définit ça ensemble lors du premier appel.</p>
              </details>
              <details className="sv-faq-item sv-reveal sv-delay-1">
                <summary>Combien de temps avant de voir des résultats ?</summary>
                <p>Google Ads : des appels peuvent arriver dès les premières semaines. Le référencement naturel (SEO) prend 3 à 6 mois pour montrer des résultats significatifs — c'est un investissement à long terme. On est honnêtes là-dessus dès le départ.</p>
              </details>
              <details className="sv-faq-item sv-reveal sv-delay-2">
                <summary>Est-ce que vous garantissez une première position sur Google ?</summary>
                <p>Non — et méfiez-vous de ceux qui le promettent. Google décide seul de son classement. Ce qu'on garantit, c'est un travail sérieux, transparent, et des rapports mensuels honnêtes sur ce qui progresse.</p>
              </details>
              <details className="sv-faq-item sv-reveal sv-delay-3">
                <summary>Qui gère mon budget publicitaire Google Ads ?</summary>
                <p>Vous. Le budget que vous payez à Google est entièrement séparé de nos honoraires. Vous décidez du montant, vous pouvez le voir en temps réel, et vous pouvez l'ajuster à tout moment. On gère la stratégie et les campagnes — pas votre carte de crédit.</p>
              </details>
              <details className="sv-faq-item sv-reveal sv-delay-3">
                <summary>Quelle différence entre le SEO classique et le SEO pour l'IA ?</summary>
                <p>Le SEO classique, c'est apparaître dans les résultats Google classiques. Le SEO IA, c'est s'assurer que quand quelqu'un pose une question à ChatGPT ou Google IA sur un soin dentaire, votre clinique peut être mentionnée. Ce sont deux canaux complémentaires — pas contradictoires.</p>
              </details>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════ */}
        <section className="sv-cta" id="contact" aria-labelledby="sv-cta-title">
          <div className="wrap">
            <div className="sv-cta-inner">
              <div className="sv-cta-copy sv-reveal">
                <p className="sv-label sv-label-light">Le prochain pas</p>
                <h2 id="sv-cta-title">
                  Un appel de 30 minutes.<br />
                  <em>Pour voir si on peut vraiment vous aider.</em>
                </h2>
                <p>
                  Pas de présentation PowerPoint interminable. On écoute votre situation, on vous dit honnêtement si on peut aider, et ce que ça implique.
                </p>
              </div>
              <div className="sv-cta-action sv-reveal sv-delay-2">
                <a
                  className="sv-btn-cta"
                  href="mailto:Contact@Karwisoft.com?subject=Je%20veux%20attirer%20plus%20de%20patients"
                >
                  <span>Discuter de votre clinique</span>
                  <span className="sv-btn-arrow" aria-hidden="true">↗</span>
                </a>
                <a className="sv-cta-email" href="mailto:Contact@Karwisoft.com">
                  Contact@Karwisoft.com
                </a>
                <p className="sv-cta-note">Réponse en moins de 24 heures · Sans engagement</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="sv-footer wrap">
        <a className="brand" href="/">karwisoft<span>marketing</span></a>
        <nav aria-label="Navigation de pied de page">
          <a href="/">Accueil</a>
          <a href="#comment">Nos services</a>
          <a href="/?mode=presentation#intro-1">La présentation ↗</a>
        </nav>
        <span>© 2026 Karwisoft Marketing</span>
      </footer>

      <ServicesObserver />
      <ServicesReveal />
    </div>
  );
}
