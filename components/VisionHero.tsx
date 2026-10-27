'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useExperience } from './Experience';
import { shell } from '../lib/i18n/dict';
import type { Locale } from '../lib/i18n/config';
import { createHeroPanorama } from '../lib/hero-sequence';
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
    const portal = section?.querySelector<HTMLElement>('.vision-portal');
    const header = document.querySelector<HTMLElement>('header.header');
    if (!section || !portal) return;
    const portrait = matchMedia('(max-width: 760px), (max-aspect-ratio: 1/1)');
    const align = () => {
      const { width, height } = section.getBoundingClientRect();
      // These coordinates belong to the painted ring, not the viewport.
      // Keep the single opening in front of the right-hand observers at every aspect ratio.
      if (portrait.matches) {
        const imageHeight = width * 2560 / 1440;
        Object.assign(portal.style, {
          left: `${width * .5133}px`, top: `${imageHeight * .3523}px`,
          width: `${width * .5484}px`, height: `${imageHeight * .3032}px`,
        });
      } else {
        const imageWidth = Math.max(width, height * 2560 / 1440);
        const imageHeight = imageWidth * 1440 / 2560;
        Object.assign(portal.style, {
          left: `${(width - imageWidth) / 2 + imageWidth * .516}px`,
          top: `${(height - imageHeight) / 2 + imageHeight * .4495}px`,
          width: `${imageWidth * .359}px`, height: `${imageHeight * .613}px`,
        });
      }
    };
    const syncHeader = () => {
      if (header) header.dataset.visionOverlay = String(section.getBoundingClientRect().bottom > header.offsetHeight);
    };
    const observer = new ResizeObserver(() => { align(); syncHeader(); });
    observer.observe(section);
    portrait.addEventListener('change', align);
    window.addEventListener('scroll', syncHeader, { passive: true });
    align(); syncHeader();
    return () => {
      observer.disconnect();
      portrait.removeEventListener('change', align);
      window.removeEventListener('scroll', syncHeader);
      if (header) delete header.dataset.visionOverlay;
    };
  }, []);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const sequence = createHeroPanorama(section);
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      sequence.setReducedMotion(preference.matches);
      sequence.setPlaying(section.dataset.motion === 'running');
    };
    const observer = new MutationObserver(sync);
    observer.observe(section, { attributes: true, attributeFilter: ['data-motion'] });
    preference.addEventListener('change', sync);
    sync();
    return () => {
      sequence.dispose();
      observer.disconnect();
      preference.removeEventListener('change', sync);
    };
  }, []);

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

    <figure className="vision-portal" aria-label={t.heroFuture}>
      <div className="vision-glass">
        <img className="vision-panorama" src="/assets/hero-table-panorama.webp"
          width="2172" height="724" fetchPriority="high" decoding="async" alt="" aria-hidden="true" />
      </div>
    </figure>

    <h1 id="vision-title" className="vision-title">{t.heroTitle} <em>{t.heroEm}</em></h1>
  </section>;
}
