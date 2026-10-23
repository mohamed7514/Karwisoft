'use client';

import { useEffect } from 'react';

export function ServicesObserver() {
  useEffect(() => {
    if(!('IntersectionObserver' in window)) return;
    const links=[...document.querySelectorAll<HTMLAnchorElement>('.service-strip a')];
    const observer=new IntersectionObserver(entries => {
      for(const entry of entries) if(entry.isIntersecting) links.forEach(link => {
        if(link.hash.slice(1)===entry.target.id) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    },{ rootMargin: '-10% 0px -65% 0px',threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  },[]);
  return null;
}
