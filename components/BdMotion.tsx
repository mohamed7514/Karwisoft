'use client';

import { useEffect } from 'react';

const TARGETS = '.bd-h,.bd-pill,.bd-lead,.bd-sub,.bd-body,.bd-card,.bd-btn,.bd-link,.bd-offer-box,.bd-faq details,.tf-plan,.tf-row,.tf-note,.sx-row,.sx-step,.bd-footer';

// Adds `.is-in` to each target as it enters the viewport; the CSS does the rest.
export function BdMotion() {
  useEffect(() => {
    const items = [...document.querySelectorAll<HTMLElement>(TARGETS)];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('is-in'));
      return;
    }
    items.forEach(item => {
      const peers = [...(item.parentElement?.children ?? [])].filter(child => child.matches(TARGETS));
      item.style.setProperty('--d', `${Math.min(peers.indexOf(item), 6) * 90}ms`);
    });
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return null;
}
