'use client';

import { useEffect } from 'react';
import { useExperience } from './Experience';

export function LandingAnimations() {
  const { presenting }=useExperience();
  useEffect(() => {
    if(presenting||new URLSearchParams(location.search).get('mode')==='presentation') return;
    let disposed=false;
    let cleanup: (() => void)|undefined;
    void Promise.all([import('gsap'),import('gsap/ScrollTrigger'),import('../lib/landing-animations.mjs')]).then(([{ gsap },{ ScrollTrigger },{ initializeAnimations }]) => {
      if(disposed) return;
      cleanup=initializeAnimations(gsap,ScrollTrigger);
    });
    return () => { disposed=true; cleanup?.(); };
  },[presenting]);
  return null;
}
