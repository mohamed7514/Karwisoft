import type { Metadata } from 'next';
import { SiteHeader } from '../../../components/SiteHeader';
import { ServicesReveal } from '../../../components/ServicesReveal';

export const metadata: Metadata = {
  title: 'Référencement IA (SEO IA) — Karwisoft | Visible sur ChatGPT et Google IA',
  description:
    'Comment Karwisoft fait en sorte que votre clinique dentaire soit citée par ChatGPT, Google IA et Perplexity quand les patients posent des questions sur leurs soins.',
};

export default function SeoIaPage() {
  return (
    <div className="sv-page sd-page">
      <SiteHeader services />

      <main id="main">

        {/* ── BREADCRUMB ── */}
        <nav className="sd-breadcrumb wrap" aria-label="Fil d'ariane">
          <a href="/services">Nos services</a>
          <span aria-hidden="true">›</span>
          <span aria-current="page">Référencement IA</span>
        </nav>

        {/* ── HERO ── */}
        <header className="sd-hero wrap sv-fade-in" aria-labelledby="sd-title">
          <div className="sd-hero-badge">
            <span className="sd-badge-num">02</span>
            <span className="sd-badge-tag">SEO IA</span>
          </div>
          <h1 id="sd-title">
            Référencement<br />
            <em>pour l'IA</em>
          </h1>
          <p className="sd-hero-sub">
            Vos futurs patients posent leurs questions à ChatGPT et Google IA.
            Si votre site contient les bonnes réponses, <strong>l'IA vous cite comme référence</strong> — et vous gagnez une visibilité que vos concurrents n'ont pas encore.
          </p>
          <div className="sd-hero-bar">
            <div className="sd-metric">
              <span>Nouveau canal</span>
              <small>avant vos concurrents</small>
            </div>
            <div className="sd-metric-sep" aria-hidden="true"></div>
            <div className="sd-metric">
              <span>Confiance</span>
              <small>l'IA valide votre expertise</small>
            </div>
            <div className="sd-metric-sep" aria-hidden="true"></div>
            <div className="sd-metric">
              <span>Complémentaire</span>
              <small>au SEO classique</small>
            </div>
          </div>
        </header>

        {/* ── POURQUOI C'EST IMPORTANT ── */}
        <section className="sd-section wrap sv-reveal" aria-labelledby="sd-why-title">
          <div className="sd-section-intro">
            <p className="sv-label">Pourquoi c'est nouveau et important</p>
            <h2 id="sd-why-title">Les patients ne cherchent plus seulement sur Google.</h2>
          </div>
          <div className="sd-two-col">
            <div>
              <p>
                Avant, tout le monde tapait des mots-clés sur Google. Maintenant, beaucoup de gens posent des vraies questions à ChatGPT, Google IA, ou Perplexity : « Est-ce qu'un implant dentaire fait mal ? », « Quelle est la différence entre un bridge et un implant ? », « Comment choisir un bon dentiste ? »
              </p>
              <p>
                Ces IA cherchent des sources fiables pour répondre. Si votre site contient des explications claires et bien écrites sur ces sujets, il peut être cité. C'est une nouvelle porte d'entrée — et la plupart de vos concurrents n'ont pas encore pensé à l'ouvrir.
              </p>
            </div>
            <div className="sd-callout sd-callout-dark">
              <p className="sd-callout-q">Ce que ça change concrètement</p>
              <p>Un patient demande à ChatGPT : « C'est quoi un implant dentaire ? » L'IA répond en citant du contenu de votre site. Le patient voit votre nom, fait confiance, et cherche votre clinique. Vous n'avez rien payé pour cette visibilité.</p>
            </div>
          </div>
        </section>

        {/* ── PLAN COMPLET ── */}
        <section className="sd-plan-section" aria-labelledby="sd-plan-title">
          <div className="wrap">
            <div className="sd-section-intro sv-reveal">
              <p className="sv-label">Notre plan pour vous</p>
              <h2 id="sd-plan-title">Ce qu'on fait pour que l'IA vous cite.</h2>
            </div>
            <ol className="sd-plan-steps">
              <li className="sd-plan-item sv-reveal">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">01</span>
                  <div className="sd-plan-line" aria-hidden="true"></div>
                </div>
                <div className="sd-plan-content">
                  <h3>Cartographie des questions patients</h3>
                  <p>On identifie toutes les questions que vos futurs patients posent aux IA concernant la dentisterie : soins, douleurs, coûts, procédures, comparaisons. On priorise celles où vous pouvez vous démarquer.</p>
                  <div className="sd-plan-deliverable">
                    <span>📄</span> Vous recevez : Liste des questions prioritaires à couvrir sur votre site
                  </div>
                </div>
              </li>
              <li className="sd-plan-item sv-reveal sv-delay-1">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">02</span>
                  <div className="sd-plan-line" aria-hidden="true"></div>
                </div>
                <div className="sd-plan-content">
                  <h3>Rédaction de contenu IA-friendly</h3>
                  <p>On rédige des réponses claires, structurées et précises à ces questions sur votre site. Le format utilisé est exactement celui que les IA comme ChatGPT et Google Gemini privilégient pour leurs citations : des réponses directes, des listes, des explications progressives.</p>
                  <div className="sd-plan-deliverable">
                    <span>📝</span> Vous recevez : Pages de contenu rédigées, à valider avant publication
                  </div>
                </div>
              </li>
              <li className="sd-plan-item sv-reveal sv-delay-2">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">03</span>
                  <div className="sd-plan-line" aria-hidden="true"></div>
                </div>
                <div className="sd-plan-content">
                  <h3>Structuration des données</h3>
                  <p>On ajoute des balises techniques invisibles (schema.org) qui aident les IA à comprendre qui vous êtes, ce que vous faites, où vous êtes, et à quelle expertise vous pouvez répondre. C'est ce qu'on appelle les données structurées.</p>
                  <div className="sd-plan-deliverable">
                    <span>🔧</span> On fait : Intégration technique invisible — zéro action de votre part
                  </div>
                </div>
              </li>
              <li className="sd-plan-item sv-reveal sv-delay-3">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">04</span>
                  <div className="sd-plan-line" aria-hidden="true"></div>
                </div>
                <div className="sd-plan-content">
                  <h3>Mise à jour continue</h3>
                  <p>Les IA évoluent rapidement. De nouvelles questions apparaissent chaque mois. On surveille ce qui change, on met votre contenu à jour, et on ajoute de nouvelles réponses pour rester pertinent.</p>
                  <div className="sd-plan-deliverable">
                    <span>🔄</span> On fait : Veille mensuelle et mises à jour de contenu
                  </div>
                </div>
              </li>
              <li className="sd-plan-item sv-reveal">
                <div className="sd-plan-left">
                  <span className="sd-plan-n">05</span>
                </div>
                <div className="sd-plan-content">
                  <h3>Rapport de visibilité IA</h3>
                  <p>On teste régulièrement comment les IA répondent à des questions liées à votre domaine et votre secteur. On vous montre dans quels contextes votre clinique est mentionnée et comment on progresse.</p>
                  <div className="sd-plan-deliverable">
                    <span>📊</span> Vous recevez : Rapport mensuel clair sur votre visibilité IA
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
              <h2 id="sd-role-title">Vous n'avez pas besoin<br />de comprendre l'IA.</h2>
              <p>
                On s'occupe de tout ce qui est technique. Votre seul rôle : nous donner les informations sur vos soins et votre approche, et approuver le contenu avant qu'on le publie.
              </p>
              <ul className="sd-role-list">
                <li><span>✓</span> Répondre à nos questions sur vos soins <em>(une fois)</em></li>
                <li><span>✓</span> Approuver les textes rédigés <em>(rapide)</em></li>
                <li><span>✓</span> Lire le rapport mensuel <em>(5 minutes)</em></li>
              </ul>
            </div>
            <div className="sd-role-visual" aria-hidden="true">
              <div className="sd-role-card">
                <p className="sd-role-card-title">CE QUE VOUS N'AVEZ PAS À FAIRE</p>
                <ul className="sd-role-not">
                  <li><span>✗</span> Comprendre comment fonctionnent ChatGPT ou Gemini</li>
                  <li><span>✗</span> Écrire du contenu technique</li>
                  <li><span>✗</span> Tester les réponses des IA vous-même</li>
                  <li><span>✗</span> Gérer les données structurées</li>
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
              <h2 id="sd-faq-title">Ce qu'on nous demande sur le SEO IA.</h2>
            </div>
            <div className="sv-faq-list">
              <details className="sv-faq-item sv-reveal">
                <summary>Est-ce que c'est garanti que l'IA va me citer ?</summary>
                <p>Non — les IA décident seules de ce qu'elles citent. Ce qu'on garantit, c'est que votre contenu sera dans le format et la qualité que les IA recherchent. C'est exactement comme le SEO : on optimise pour maximiser les chances, sans contrôler l'algorithme.</p>
              </details>
              <details className="sv-faq-item sv-reveal sv-delay-1">
                <summary>Quelle différence avec le SEO classique ?</summary>
                <p>Le SEO classique cible les résultats Google traditionnels (liste de liens). Le SEO IA cible les réponses générées par les intelligences artificielles. Les deux utilisent votre site comme base, mais les formats de contenu et les critères sont différents. C'est pour ça qu'on recommande les deux ensemble.</p>
              </details>
              <details className="sv-faq-item sv-reveal sv-delay-2">
                <summary>Est-ce que mes patients utilisent vraiment ChatGPT ?</summary>
                <p>De plus en plus, oui. Surtout les patients qui cherchent à comprendre un soin avant de prendre rendez-vous. Ils veulent d'abord comprendre — et ils font confiance aux réponses de l'IA pour ça. Si votre clinique est la source citée, vous êtes déjà perçu comme l'expert avant même le premier contact.</p>
              </details>
              <details className="sv-faq-item sv-reveal sv-delay-3">
                <summary>Est-ce que je peux commencer avec juste le SEO IA sans le SEO classique ?</summary>
                <p>Oui, c'est possible. Les deux services sont indépendants. Cela dit, dans la plupart des cas, un site bien optimisé pour Google (SEO classique) est aussi mieux positionné pour l'IA — le contenu de qualité bénéficie aux deux. On vous conseille honnêtement selon votre budget et vos priorités.</p>
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
                  On vérifie si vos concurrents<br />
                  <em>sont déjà cités par l'IA.</em>
                </h2>
                <p>Un appel de 30 minutes pour voir où vous en êtes et ce que ça représente comme opportunité pour votre clinique spécifiquement.</p>
              </div>
              <div className="sv-cta-action sv-reveal sv-delay-2">
                <a className="sv-btn-cta" href="mailto:Contact@Karwisoft.com?subject=Visibilité IA pour ma clinique dentaire">
                  <span>En discuter avec nous</span>
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
          <a href="/services/seo">← Service précédent : SEO</a>
          <a href="/services/google-ads">Service suivant : Google Ads →</a>
        </nav>
        <span>© 2026 Karwisoft Marketing</span>
      </footer>

      <ServicesReveal />
    </div>
  );
}
