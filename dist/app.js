document.documentElement.classList.add('js');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const reveals=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});
  reveals.forEach(element=>observer.observe(element));
  const steps=[...document.querySelectorAll('[data-step]')];
  const railLinks=[...document.querySelectorAll('.journey-rail a')];
  const stepObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const step=Number(entry.target.dataset.step);railLinks.forEach((link,i)=>{link.classList.toggle('active',i===step-1);if(i===step-1)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current')});document.querySelector('.rail-line i').style.height=`${step/steps.length*100}%`})},{rootMargin:'-25% 0px -45% 0px',threshold:0});
  steps.forEach(step=>stepObserver.observe(step));
}else{reveals.forEach(element=>element.classList.add('visible'))}
const backTop=document.querySelector('.back-top');
let queued=false;
function scrollUpdate(){backTop.classList.toggle('visible',window.scrollY>650);queued=false}
window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(scrollUpdate)}},{passive:true});scrollUpdate();

const flow=document.querySelector('#flow-content');
const initialFlow=flow.innerHTML;
function setProgress(step){document.querySelector('#flow-count').textContent=`0${step} / 03`;document.querySelectorAll('.flow-progress i').forEach((item,i)=>item.classList.toggle('done',i<step))}
function focusFlow(){const heading=flow.querySelector('h3');heading.tabIndex=-1;heading.focus({preventScroll:true})}
function resetFlow(focus=false){flow.innerHTML=initialFlow;setProgress(1);if(focus)focusFlow()}
flow.addEventListener('click',event=>{
  const choice=event.target.closest('[data-need]');
  if(choice){
    if(choice.dataset.need==='Une urgence'){
      setProgress(2);flow.innerHTML='<h3>Un besoin urgent ?</h3><p>Le parcours donne priorité au contact direct avec la clinique.</p><p class="flow-result">Un accès téléphone dédié, à connecter au numéro de votre cabinet.</p><p>Simulation du parcours — aucun appel déclenché.</p>';
    }else{
      setProgress(2);flow.innerHTML='<h3>Préparons votre visite.</h3><p>Photos facultatives et quelques questions pour préciser votre besoin.</p><div class="flow-choices"><button type="button" data-flow-next><span>Continuer la simulation</span><span aria-hidden="true">↗</span></button></div>';
    }
    focusFlow();return;
  }
  if(event.target.closest('[data-flow-next]')){setProgress(3);flow.innerHTML='<h3>Vous avez fait le premier pas.</h3><p class="flow-result">Votre demande rejoint la réception pour validation et confirmation du rendez-vous.</p><p>Simulation — aucune demande envoyée.</p>';focusFlow()}
});
document.querySelector('#flow-reset').addEventListener('click',()=>resetFlow(true));
const labels={lead:'Votre choix : site premium + gestion Google Ads par lead.',mensuel:'Votre choix : site premium + gestion Google Ads au mois.'};
document.querySelectorAll('.model-button').forEach(button=>button.addEventListener('click',()=>{
  const model=button.dataset.model;
  document.querySelectorAll('.offer-card').forEach(card=>{const selected=card.dataset.model===model;card.classList.toggle('selected',selected);const action=card.querySelector('button');action.setAttribute('aria-pressed',String(selected));action.innerHTML=selected?'Modèle sélectionné <span aria-hidden="true">✓</span>':'Choisir ce modèle <span aria-hidden="true">↗</span>'});
  document.querySelector('#selected-model').textContent=labels[model];
  const next=document.querySelector('#suite');next.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'});
  const title=document.querySelector('#next-title');title.tabIndex=-1;title.focus({preventScroll:true});
}));
