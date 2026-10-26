import { seoPillarWork } from '../lib/seo-pillar-work';
import { seoLessons } from '../lib/seo-lessons';
import { seoLearningPillars } from '../lib/seo-learning';
import { SeoMethodIcon } from './SeoMethodIcon';
import { SeoLearningJourney } from './SeoLearningJourney';
import { SeoLearningCompletion } from './SeoLearningProvider';
import { seoQuickLessons } from '../lib/seo-five-minute';

/** Guided with JavaScript; full reading fallback when scripts are unavailable. */
export function SeoPillarsWork() {
  return <><SeoLearningJourney /><SeoLearningCompletion><details className="seo-full-work"><summary>Pour aller plus loin : les 40 tâches détaillées <span aria-hidden="true">+</span></summary><p>Lecture facultative, en complément du parcours de cinq minutes.</p><DetailedPillars /></details></SeoLearningCompletion><noscript><style>{'.seo-guided-learning, .seo-reading-label, .seo-reading-track { display: none !important; }'}</style><p className="seo-work-scope">Les six piliers vous sont proposés en lecture libre.</p><div className="seo-work-grid">{seoQuickLessons.map((lesson, index) => {
    return <article className="seo-work-pillar" key={lesson.id}><h3>{index + 1}. {lesson.name}</h3><h4>{lesson.title}</h4><dl className="seo-task-explanation"><div><dt>Pourquoi ?</dt><dd>{lesson.why}</dd></div><div><dt>Comment ?</dt><dd>{lesson.how}</dd></div></dl><div className="seo-work-observation"><p><strong>Chez cette clinique :</strong> {lesson.observed}</p></div></article>;
  })}</div><details className="seo-full-work"><summary>Pour aller plus loin : les 40 tâches détaillées</summary><DetailedPillars /></details></noscript></>;
}

function DetailedPillars() {
  return <div className="seo-work-grid">
    {seoPillarWork.map((pillar, index) => {
      const lesson = seoLessons.find(item => item.id === pillar.id)!;
      const detail = seoLearningPillars.find(item => item.id === pillar.id)!;
      return <article className="seo-work-pillar" id={`seo-detailed-${pillar.id}`} key={pillar.id} aria-labelledby={`seo-detailed-${pillar.id}-title`}>
        <header><span className="seo-work-icon"><SeoMethodIcon kind={detail.icon} /></span><h3 id={`seo-detailed-${pillar.id}-title`}><span>{index + 1}.</span> {pillar.name}</h3></header>
        <dl className="seo-task-methods">{pillar.tasks.map(item => <div key={item.task}><dt>{item.task}</dt><dd><p><strong>Pourquoi ?</strong> {item.why}</p><p><strong>Comment ?</strong> {item.how}</p></dd></div>)}</dl>
        <div className="seo-work-observation"><p><strong>Chez cette clinique :</strong> {pillar.observed} <a href={lesson.source.href} target="_blank" rel="noreferrer" aria-label={`${lesson.source.label} (nouvel onglet)`}>Voir <span aria-hidden="true">↗</span></a></p></div>
        <p className="seo-work-tools"><span>Outils possibles :</span> {pillar.tools}</p>
        <details className="seo-work-detail"><summary>Comprendre les termes et le livrable <span aria-hidden="true">+</span></summary><p>{pillar.terms}</p><p><strong>Pour votre clinique, vous recevez :</strong> {detail.delivery}</p></details>
      </article>;
    })}
  </div>;
}
