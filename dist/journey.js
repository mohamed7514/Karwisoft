/* Faithful local Épure hero + scroll-driven slide photography. */
(() => {
if(!window.gsap||!window.ScrollTrigger)return;
const {gsap,ScrollTrigger}=window;gsap.registerPlugin(ScrollTrigger);const media=gsap.matchMedia();
media.add({motion:'(prefers-reduced-motion: no-preference)',desktop:'(min-width: 1101px)'},context=>{
if(!context.conditions.motion)return;
document.querySelectorAll('.deck-slide').forEach(slide=>{
gsap.fromTo(slide.querySelector('.deck-photo img'),{scale:1.12},{scale:1,ease:'none',scrollTrigger:{trigger:slide,start:'top bottom',end:'bottom top',scrub:.8}});
gsap.fromTo(slide.querySelectorAll('.deck-copy > *, .deck-demo'),{y:35,opacity:0},{y:0,opacity:1,duration:.85,stagger:.1,ease:'power3.out',scrollTrigger:{trigger:slide,start:'top 72%',once:true}});
});
const wow=document.querySelector('.wow-slide'),before=wow.querySelector('.demo-before'),patches=wow.querySelector('.demo-patches');
gsap.timeline({scrollTrigger:{id:'epure-live-hero',trigger:wow,start:context.conditions.desktop?'top top':'top 30%',end:context.conditions.desktop?'+=850':'bottom 70%',pin:context.conditions.desktop?wow:false,scrub:.5,invalidateOnRefresh:true}}).set(before,{opacity:1}).set(patches,{opacity:1}).to('.demo-tooth-left',{attr:{height:235},duration:.26,ease:'power1.inOut'},.15).to('.demo-tooth-right',{attr:{height:235},duration:.26,ease:'power1.inOut'},.28).to(before,{opacity:0,duration:.32,ease:'power1.inOut'},.48).to(patches,{opacity:0,duration:.12},.81).to({},{duration:.07});
gsap.fromTo('.workflow-grid>div',{y:28,opacity:0},{y:0,opacity:1,stagger:.1,duration:.6,scrollTrigger:{trigger:'.workflow-grid',start:'top 85%',once:true}});
});
})();
