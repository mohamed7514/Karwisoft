'use client';

import { useEffect, useState } from 'react';
import { useSeoLearning } from './SeoLearningProvider';
import { SEO_QUICK_COUNT } from '../lib/seo-five-minute';
import { SeoLearningTimer } from './SeoJourneyGate';

const stages = [
  { id: 'comprendre-seo', label: 'Comprendre' },
  { id: 'reprendre-ameliorer', label: 'Comparer' },
  { id: 'plan-seo', label: 'Construire' },
  { id: 'livrables-seo', label: 'Vérifier' },
] as const;

export function SeoReadingJourney() {
  const [active, setActive] = useState(-1);
  const { answers, started, percentage, complete } = useSeoLearning();

  useEffect(() => {
    const sections = stages.map(stage => document.getElementById(stage.id));
    let frame = 0;
    function update() {
      frame = 0;
      if (!started) { setActive(-1); return; }
      const marker = window.innerHeight * .4;
      const tops = sections.map(section => section?.getBoundingClientRect().top ?? Infinity);
      let active = -1;
      tops.forEach((top, index) => { if (top <= marker) active = index; });
      setActive(active);
    }
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(requestUpdate);
    sections.forEach(section => { if (section) resize.observe(section); });
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    update();

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('seo-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    document.querySelectorAll('[data-seo-reveal]').forEach(element => observer.observe(element));

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      resize.disconnect();
      observer.disconnect();
    };
  }, [started]);

  return <nav className="seo-reading-journey" aria-label="Votre parcours pour comprendre le plan SEO">
    <div className="wrap seo-reading-inner"><div className="seo-reading-progress"><span className="seo-reading-label">Votre apprentissage <strong>{percentage} %</strong></span><SeoLearningTimer /></div><ol>{stages.map((stage, index) => <li key={stage.id} data-current={active === index} data-past={index < active}><a href={`#${started ? stage.id : 'comprendre-seo'}`} aria-current={active === index ? 'step' : undefined}><span aria-hidden="true">0{index + 1}</span>{stage.label}</a></li>)}</ol></div>
    <div className="seo-reading-track" role="progressbar" aria-label="Progression de la mini-leçon SEO" aria-valuemin={0} aria-valuemax={SEO_QUICK_COUNT + 1} aria-valuenow={answers.length + (complete ? 1 : 0)} aria-valuetext={`${answers.length} questions sur ${SEO_QUICK_COUNT}, pyramide ${complete ? 'reconstruite' : 'à reconstruire'}, ${percentage} %`}><span style={{ width: `${percentage}%` }} /></div>
  </nav>;
}
