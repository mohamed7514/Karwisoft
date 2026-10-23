// Original GSAP choreography, owned and cleaned up by the React lifecycle.
export function initializeAnimations(gsap, ScrollTrigger) {
  let disposed = false;
    gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  const root = document.documentElement;
  const story = document.querySelector('.story');
  const stage = story.querySelector('.story-stage');
  const scenes = [...story.querySelectorAll('[data-story-scene]')];
  const controls = [...story.querySelectorAll('[data-story-go]')];

  media.add('(prefers-reduced-motion: no-preference) and (min-width: 1101px) and (min-height: 700px)', () => {
    let active = -1;
    function selectScene(index) {
      if (active === index) return;
      active = index;
      story.dataset.activeScene = String(index);
      scenes.forEach((scene, i) => {
        scene.inert = i !== index;
        scene.setAttribute('aria-hidden', String(i !== index));
      });
      controls.forEach((control, i) => control.setAttribute('aria-pressed', String(i === index)));
    }

    gsap.set(scenes.slice(1), {autoAlpha: 0});
    story.classList.add('story-enhanced');
    root.classList.add('motion-ready');
    selectScene(0);

    const timeline = gsap.timeline({
      defaults: {ease: 'none'},
      scrollTrigger: {
        id: 'karwisoft-story', trigger: story, start: 'top top',
        end: () => '+=' + Math.max(1200, window.innerHeight * 2.4),
        pin: stage, scrub: 0.65, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: self => selectScene(self.progress < 0.33 ? 0 : self.progress < 0.69 ? 1 : 2),
        onLeave: () => selectScene(2), onLeaveBack: () => selectScene(0),
        onToggle: self => root.classList.toggle('in-story', self.isActive)
      }
    });
    timeline
      .to(scenes[0].querySelector('.story-photo img'), {scale: 1.08, duration: 1.4}, 0)
      .to('.story-search-query', {xPercent: -8, y: -25, duration: 0.7}, 0.1)
      .set(scenes[1], {autoAlpha: 1}, 0.85)
      .fromTo(scenes[1], {clipPath: 'inset(100% 0% 0% 0%)'}, {clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power2.inOut'}, 0.85)
      .fromTo(scenes[1].querySelector('.story-caption'), {y: 45, opacity: 0}, {y: 0, opacity: 1, duration: 0.45}, 1.03)
      .fromTo('.story-browser', {y: 65, rotation: 7, scale: 0.9}, {y: 0, rotation: 0, scale: 1, duration: 0.7, ease: 'power2.out'}, 1.02)
      .to(scenes[1].querySelector('.story-photo img'), {scale: 1.08, duration: 1}, 1.4)
      .set(scenes[2], {autoAlpha: 1}, 2.05)
      .fromTo(scenes[2], {clipPath: 'inset(100% 0% 0% 0%)'}, {clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power2.inOut'}, 2.05)
      .fromTo(scenes[2].querySelector('.story-caption'), {y: 40, opacity: 0}, {y: 0, opacity: 1, duration: 0.4}, 2.25)
      .to(scenes[2].querySelector('.story-photo img'), {scale: 1.06, duration: 0.7}, 2.6)
      .to({}, {duration: 0.1}, 3.3);

    root.classList.toggle('in-story', timeline.scrollTrigger.isActive);
    const intro = gsap.timeline({defaults: {ease: 'power3.out'}});
    intro.from(scenes[0].querySelectorAll('.story-caption > *'), {y: 24, opacity: 0, duration: 1, stagger: 0.12}, 0.15)
      .from('.story-search-query', {opacity: 0, duration: 0.7}, 0.6);

    function goToScene(index) {
      const trigger = timeline.scrollTrigger;
      const positions = [0.02, 0.51, 0.94];
      window.scrollTo({top: trigger.start + (trigger.end - trigger.start) * positions[index], behavior: 'smooth'});
    }
    const clickHandlers = controls.map((button, index) => {
      const handler = () => goToScene(index);
      button.addEventListener('click', handler);
      return handler;
    });
    const group = story.querySelector('.story-controls');
    function onKey(event) {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      const index = controls.indexOf(document.activeElement);
      if (index < 0) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowRight' ? 1 : 2)) % 3;
      controls[next].focus({preventScroll: true});
      goToScene(next);
    }
    group.addEventListener('keydown', onKey);

    document.querySelectorAll('.reveal').forEach(element => {
      gsap.fromTo(element, {opacity: 0, y: 40}, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: {trigger: element, start: 'top 88%', once: true}
      });
    });
    document.querySelectorAll('.emotion-source > img, .portrait-placeholder > img').forEach(image => {
      gsap.fromTo(image, {scale: 1.12}, {scale: 1, ease: 'none', scrollTrigger: {trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.8}});
    });
    gsap.fromTo('.bonus-symbol', {rotation: -50}, {rotation: 20, scrollTrigger: {trigger: '.launch-bonus', start: 'top bottom', end: 'bottom center', scrub: 0.8}});

    return () => {
      controls.forEach((button, i) => button.removeEventListener('click', clickHandlers[i]));
      group.removeEventListener('keydown', onKey);
      story.classList.remove('story-enhanced');
      root.classList.remove('motion-ready');
      root.classList.remove('in-story');
      delete story.dataset.activeScene;
      scenes.forEach(scene => {scene.inert = false;scene.removeAttribute('aria-hidden')});
    };
  });

  function refresh() {if (!disposed) ScrollTrigger.refresh()}
  window.addEventListener('load', refresh, {once: true});
  if (document.fonts?.ready) document.fonts.ready.then(refresh);

  media.add({motion:'(prefers-reduced-motion: no-preference)',desktop:'(min-width: 1101px) and (min-height: 700px)'},context=>{
if(!context.conditions.motion)return;
document.querySelectorAll('.deck-slide').forEach(slide=>{
gsap.fromTo(slide.querySelector('.deck-photo img'),{scale:1.12},{scale:1,ease:'none',scrollTrigger:{trigger:slide,start:'top bottom',end:'bottom top',scrub:.8}});
gsap.fromTo(slide.querySelectorAll('.deck-copy > *, .deck-demo'),{y:35,opacity:0},{y:0,opacity:1,duration:.85,stagger:.1,ease:'power3.out',scrollTrigger:{trigger:slide,start:'top 72%',once:true}});
});
const wow=document.querySelector('.wow-slide'),before=wow.querySelector('.demo-before'),patches=wow.querySelector('.demo-patches');
gsap.timeline({scrollTrigger:{id:'epure-live-hero',trigger:wow,start:context.conditions.desktop?'top top':'top 30%',end:context.conditions.desktop?'+=850':'bottom 70%',pin:context.conditions.desktop?wow:false,scrub:.5,invalidateOnRefresh:true}}).set(before,{opacity:1}).set(patches,{opacity:1}).to('.demo-tooth-left',{attr:{height:235},duration:.26,ease:'power1.inOut'},.15).to('.demo-tooth-right',{attr:{height:235},duration:.26,ease:'power1.inOut'},.28).to(before,{opacity:0,duration:.32,ease:'power1.inOut'},.48).to(patches,{opacity:0,duration:.12},.81).to({},{duration:.07});
gsap.fromTo('.workflow-grid>div',{y:28,opacity:0},{y:0,opacity:1,stagger:.1,duration:.6,scrollTrigger:{trigger:'.workflow-grid',start:'top 85%',once:true}});
});

  return () => { disposed = true; window.removeEventListener('load', refresh); media.revert(); };
}
