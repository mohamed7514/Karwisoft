import type { Metadata } from 'next';
import { SiteHeader } from '../../../components/SiteHeader';
import { SeoMethodCycle } from '../../../components/SeoMethodCycle';
import { SeoComparison } from '../../../components/SeoComparison';
import { SeoMethodIcon } from '../../../components/SeoMethodIcon';
import { SeoPillarExplorer } from '../../../components/SeoPillarExplorer';
import { SeoReadingJourney } from '../../../components/SeoReadingJourney';
import { SeoCompetitiveLab } from '../../../components/SeoCompetitiveLab';
import { SeoPillarsWork } from '../../../components/SeoPillarsWork';
import { SeoLearningProvider, SeoLearningCompletion } from '../../../components/SeoLearningProvider';
import { SeoJourneyGate } from '../../../components/SeoJourneyGate';
import { seoCycle } from '../../../lib/seo-methodology';
import '../../styles/seo-methodology.css';
import '../../styles/seo-learning.css';
import '../../styles/seo-lesson.css';
import '../../styles/seo-case.css';
import '../../styles/seo-work.css';
import '../../styles/seo-quiz.css';
import '../../styles/seo-pyramid.css';

export const metadata: Metadata = {
  title: 'SEO dentaire à Gatineau — Comprendre les écarts, construire votre plan | Karwisoft',
  description: 'Comprenez les composants du SEO, ce que nous analysons chez les cliniques les plus visibles et comment chaque sprint améliore votre site avec des livrables vérifiables.',
};

export default function SeoPage() {
  return <SeoLearningProvider><div className="sv-page method-page">
    <SiteHeader services />
    <main id="main">
      <nav className="method-breadcrumb wrap" aria-label="Fil d’ariane"><a href="/services/">Nos services</a><span aria-hidden="true">/</span><span aria-current="page">Référencement naturel</span></nav>

      <header className="method-hero seo-learning-hero wrap" aria-labelledby="method-title">
        <div className="method-hero-copy">
          <p className="method-kicker">SEO dentaire · Comprendre avant d’investir</p>
          <h1 id="method-title">Clinique Dentaire<br />Gatineau devant vous&nbsp;?<br /><em>Comprenons pourquoi.</em></h1>
          <p className="method-hero-lead">Pourquoi un patient la trouve avant vous ? Étudions sa page sur les implants pour comprendre les piliers du SEO. Puis décidons quoi reprendre, construire pour votre clinique et ajouter pour viser mieux.</p>
          <div className="method-hero-actions"><a className="sv-btn-primary" href="#comprendre-seo">Comprendre le SEO en 5 minutes <span aria-hidden="true">↓</span></a><a className="method-text-link" href="mailto:Contact@Karwisoft.com?subject=SEO%20pour%20ma%20clinique">Parlons de votre clinique <span aria-hidden="true">↗</span></a></div>
          <p className="method-hero-note">Comprendre les six piliers. Comparer les écarts. Savoir ce que vous achetez.</p>
        </div>
        <figure className="seo-search-scene">
          <div className="seo-search-browser"><i /><i /><i /><span>Une recherche de patient</span></div>
          <div className="seo-search-bar"><SeoMethodIcon kind="search" /><span>implants dentaires Gatineau</span><span aria-hidden="true">↵</span></div>
          <div className="seo-search-result seo-search-leader"><span className="seo-search-result-label">La clinique que vous voyez avant vous</span><strong>Clinique Dentaire Gatineau</strong><p>Quelles pages ? Quels liens ? Quelle présence locale ?</p><a href="#comprendre-seo">Comprendre les différences <span aria-hidden="true">↓</span></a></div>
          <div className="seo-search-connection" aria-hidden="true"><span /><i>?</i><span /></div>
          <div className="seo-search-result seo-search-yours"><span className="seo-search-result-label">Le point de départ du travail</span><strong>Votre clinique</strong><p>Identifier les écarts. Construire votre plan.</p></div>
          <figcaption>Situation illustrative, sans relevé de classement. La première clinique varie selon la recherche, le lieu, la date et le type de résultat : carte ou site web.</figcaption>
        </figure>
      </header>

      <SeoReadingJourney />

      <SeoJourneyGate>
      <section className="method-section seo-understand-section" id="parcours-seo" aria-labelledby="seo-understand-title">
        <div className="wrap">
          <div className="method-section-heading seo-quick-heading"><p className="method-kicker">01 / Comprendre les six dimensions</p><h2 id="seo-understand-title">Six questions.<br /><em>Puis, à vous de reconstruire.</em></h2><p>Pourquoi et comment travailler chaque dimension ? Une réponse ouvre la suivante, avec une explication. Le défi final vous aide à retenir le modèle.</p></div>
          <SeoPillarsWork />
          <p className="seo-work-scope">Les observations sont liées aux pages publiques consultées. Elles montrent des éléments visibles, sans révéler le processus interne de la clinique ni établir sa première place ou la cause exacte de son classement. Les outils cités sont des exemples d’analyse, pas des outils dont l’usage par cette clinique est confirmé.</p>
          <SeoLearningCompletion><details className="seo-work-demonstration"><summary>Voir les schémas de cette analyse <span aria-hidden="true">+</span></summary><SeoPillarExplorer /></details></SeoLearningCompletion>
          <div className="seo-measurement-note"><SeoMethodIcon kind="local" /><div><p><strong>Le contexte local s’applique aussi à Google Maps.</strong> Voici comment ce volet se traduit en interventions : fiche fidèle à vos soins, coordonnées cohérentes et avis authentiques.</p><details className="seo-local-application"><summary>Pourquoi et comment travailler le SEO local ?</summary><p>Google indique que les résultats locaux dépendent surtout de la pertinence, de la distance et de la notoriété. Nous vérifions les catégories, services, horaires et coordonnées de votre fiche, préparons une demande d’avis honnête et observons les résultats depuis des lieux définis. Vous recevez le relevé des modifications et leur statut. La distance avec le patient ne se corrige pas en modifiant une page.</p></details></div></div>
          <p className="method-caption seo-source-note">Pour approfondir : <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr" target="_blank" rel="noreferrer">les principes du SEO selon Google</a> et <a href="https://support.google.com/business/answer/7091?hl=fr" target="_blank" rel="noreferrer">les facteurs du classement local</a>.</p>
        </div>
      </section>

      <section className="method-section wrap" id="reprendre-ameliorer" aria-labelledby="method-comparison-title">
        <div className="method-section-heading">
          <p className="method-kicker">02 / Appliquer ce que vous venez d’apprendre</p>
          <h2 id="method-comparison-title">Comment dépasser<br /><em>Centre dentaire Gatineau ?</em></h2>
        </div>

        {/* Intro : 3 choses, c’est tout */}
        <div className="seo-beat-intro">
          <span className="seo-beat-number" aria-hidden="true">3</span>
          <div className="seo-beat-summary">
            <strong>Trois choses. C’est tout.</strong>
            <p>Vous venez de voir comment ils fonctionnent. Voici quoi faire avec ça.</p>
          </div>
        </div>

        {/* 3 cartes */}
        <ol className="seo-beat-steps" aria-label="Les trois étapes pour dépasser la concurrence">
          <li className="seo-beat-step">
            <span className="seo-beat-step-num">01</span>
            <h3>Copier</h3>
            <p>Ce qu’ils font et que vous n’avez pas encore.</p>
            <ul>
              <li>Une page dédiée par soin (implants, blanchiment…)</li>
              <li>Un titre H1 qui correspond à la recherche du patient</li>
              <li>La fiche Google avec horaires, photos et catégories</li>
              <li>Des liens internes entre vos pages de soins</li>
            </ul>
          </li>
          <li className="seo-beat-step">
            <span className="seo-beat-step-num">02</span>
            <h3>Reproduire</h3>
            <p>La même structure — calibrée pour votre clinique.</p>
            <ul>
              <li>Le plan de page adapté à vos soins prioritaires</li>
              <li>Les balises titre et description pour chaque page</li>
              <li>L’architecture qui guide Google et le patient</li>
              <li>Le maillage entre vos pages existantes</li>
            </ul>
          </li>
          <li className="seo-beat-step seo-beat-step--add">
            <span className="seo-beat-step-num">03</span>
            <h3>Ajouter</h3>
            <p>Ce qu’ils n’ont pas — et qui vous dépasse.</p>
            <ul>
              <li>Votre expertise locale : quartiers, écoles, employeurs</li>
              <li>Des réponses aux vraies questions des patients (FAQ)</li>
              <li>Des photos réelles de votre équipe et de vos locaux</li>
              <li>Des avis authentiques liés à des soins spécifiques</li>
            </ul>
          </li>
        </ol>

        <p className="seo-beat-transition">On fait ça ensemble ci-dessous — faites évoluer les deux pages pour voir concrètement les écarts.</p>

        <SeoCompetitiveLab />
        <details className="seo-audit-details"><summary>Voir ce que nous vérifions pour chacun des six piliers <span aria-hidden="true">+</span></summary><p>Cette grille précise les observations, les actions possibles et les preuves de livraison. Les données de mesure concernent votre site. Une différence visible chez un concurrent reste une piste à vérifier.</p><SeoComparison /></details>
        <div className="seo-case-outcome"><div><h3>L’écart devient une liste de tâches.</h3><p>Une page à créer, des liens à ajouter, un blocage à corriger, des sources à contacter. Nous classons ces tâches par priorité et définissons ce qui sera livré dans chaque sprint.</p></div><a href="#plan-seo">Voir comment on avance <span aria-hidden="true">→</span></a></div>
      </section>

      <section className="method-section method-cycle-section" id="plan-seo" aria-labelledby="method-cycle-title">
        <div className="wrap">
          <div className="method-section-heading"><p className="method-kicker">03 / Transformer la comparaison en plan</p><h2 id="method-cycle-title">Des sprints avec un but.<br /><em>Et un travail à vous montrer.</em></h2><p>Les piliers expliquent le SEO ; les sprints organisent le travail pour viser les premières positions. Un sprint peut toucher plusieurs piliers. Avant de commencer, nous définissons son objectif, les pages et actions prévues, les responsables, les validations et les critères de livraison.</p></div>
          <SeoMethodCycle />
          <p className="method-caption">Ces cinq temps décrivent la logique du travail, sans imposer cinq durées identiques. Le suivi commence dès le départ ; le contenu, la technique et les liens continuent d’être travaillés selon les besoins. La première place reste un objectif, sans garantie de classement.</p>
        </div>
      </section>

      <section className="method-section seo-evidence-section" id="livrables-seo" aria-labelledby="method-deliverables-title">
        <div className="wrap">
          <div className="method-section-heading"><p className="method-kicker">04 / Une confiance qui se vérifie</p><h2 id="method-deliverables-title">Vous voyez ce qu’on a trouvé.<br /><em>Ce qu’on a fait. Et ce qui évolue.</em></h2><p>Chaque sprint laisse une trace consultable. Vous pouvez relier le problème de départ à l’intervention, puis au contrôle effectué et aux résultats suivis.</p></div>
          <div className="seo-proof-example" data-seo-reveal><div className="seo-proof-heading"><SeoMethodIcon kind="content" /><strong>À quoi ressemble une action documentée ?</strong><span>Exemple de livrable</span></div><dl><div><dt>Constat</dt><dd>Une page de soin importante n’a aucun lien depuis les pages principales du site.</dd></div><div><dt>Pourquoi agir</dt><dd>Créer un chemin pour que les visiteurs et Google puissent la découvrir plus facilement.</dd></div><div><dt>Travail livré</dt><dd>Ajout de liens contextuels depuis les pages pertinentes, avec la liste des pages modifiées.</dd></div><div><dt>Contrôle</dt><dd>Vérification des liens publiés et de leur destination, puis suivi de la page dans Search Console, l’outil de suivi de Google.</dd></div></dl></div>
          <ol className="method-deliverables">{seoCycle.map((step, index) => <li key={step.id}><span>0{index + 1}</span><h3>{step.output}</h3><p>{step.proof}</p></li>)}</ol>
          <div className="method-evidence-note"><strong>Un travail livré.<br />Des effets à observer.</strong><p>Le tableau de bord relie les actions à l’évolution des recherches, pages et contacts mesurés. Il indique les sources des données et leurs limites. Nous ajustons les prochaines priorités selon ce que les observations permettent de conclure.</p></div>
        </div>
      </section>

      <section className="method-cta" id="contact" aria-labelledby="method-cta-title"><div className="wrap"><p className="method-kicker">Votre clinique. Vos recherches. Votre plan.</p><h2 id="method-cta-title">Qui apparaît avant vous ?<br /><em>Commençons par le comprendre.</em></h2><p>Parlons des soins que vous souhaitez développer et de votre secteur. Nous pourrons définir les recherches à examiner, les concurrents à étudier et le périmètre d’un premier diagnostic.</p><div className="method-cta-actions"><a className="sv-btn-primary" href="mailto:Contact@Karwisoft.com?subject=Diagnostic%20SEO%20concurrentiel%20pour%20ma%20clinique">Parler du SEO de ma clinique <span aria-hidden="true">↗</span></a><a className="method-text-link" href="#comprendre-seo">Revoir les composants <span aria-hidden="true">↑</span></a></div><p className="method-cta-note">Indiquez le nom de votre clinique, son site web et sa ville pour préparer notre échange.</p></div></section>
      <p className="method-brand-statement wrap">Comprendre les composants. Comparer les écarts. Construire une réponse utile. Vérifier le travail et ses effets.</p>
      </SeoJourneyGate>
    </main>
    <footer className="sv-footer wrap"><a className="sv-footer-brand" href="/">Karwisoft<span>.</span></a><p>Le SEO dentaire, expliqué et documenté.</p><nav aria-label="Liens utiles"><a href="/services/">Tous nos services</a><a href="/services/seo-ia/">SEO & IA</a></nav></footer>
  </div></SeoLearningProvider>;
}
