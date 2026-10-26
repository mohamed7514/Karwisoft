'use client';

import { useEffect } from 'react';

export function ServicesReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      document.querySelectorAll('.sv-reveal').forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('.sv-reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
