'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useExperience } from './Experience';
import { shell } from '../lib/i18n/dict';
import type { Locale } from '../lib/i18n/config';
import '../app/styles/hero-bulle.css';

export function HomeIntro({ children, locale }: { children: ReactNode; locale: Locale }) {
  const { presenting } = useExperience();
  return presenting ? children : <VisionHero locale={locale} />;
}

function VisionHero({ locale }: { locale: Locale }) {
  const t = shell[locale];
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const bounds = section.getBoundingClientRect();
    let inView = bounds.bottom > 0 && bounds.top < window.innerHeight;
    const sync = () => {
      section.dataset.motion = paused || preference.matches || document.hidden || !inView ? 'paused' : 'running';
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0.08 });
    observer.observe(section);
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [paused]);

  return <section ref={root} className="vision-hero" id="accueil" aria-labelledby="vision-title" data-motion="running">
    <picture className="vision-past">
      <source media="(max-width: 760px), (max-aspect-ratio: 1/1)" srcSet="/assets/hero-passe-mobile.webp" />
      <img src="/assets/hero-passe.webp" width="2560" height="1440" fetchPriority="high" alt={t.heroPast} />
    </picture>
    <div className="vision-shade" aria-hidden="true" />

    <button className="vision-playback" type="button" aria-pressed={paused} aria-label={paused ? t.resumeAria : t.pauseAria} onClick={() => setPaused(value => !value)}>
      <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor" aria-hidden="true">{paused ? <path d="M3 1.5 10 6l-7 4.5z" /> : <path d="M2 1h3v10H2zm5 0h3v10H7z" />}</svg>
      {paused ? t.resume : t.pause}
    </button>

    <figure className="vision-portal">
      <div className="vision-hover">
        <div className="vision-opening">
          <div className="vision-glass">
            <img src="/assets/hero-futur.webp" width="1536" height="1536" fetchPriority="high" alt={t.heroFuture} />
          </div>
        </div>
      </div>
    </figure>

    <h1 id="vision-title" className="vision-title">{t.heroTitle} <em>{t.heroEm}</em></h1>
  </section>;
}
