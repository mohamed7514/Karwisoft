/* One source of content, two ways to explore it. */
(() => {
  if (new URLSearchParams(location.search).get('mode') !== 'presentation') return;
  document.documentElement.classList.add('presenting');
  const story = document.querySelector('.story');
  const scenes = [...document.querySelectorAll('[data-story-scene]')];
  scenes.forEach((scene, index) => {scene.id = 'intro-' + (index + 1)});
  const frames = [...scenes, document.querySelector('#approche'), ...document.querySelectorAll('[data-deck]'), document.querySelector('#offre'), document.querySelector('#suite')];
  const labels = ['Il cherche. Pourquoi vous ?', 'Il compare ses options', 'Pourquoi vous choisir ?', 'Notre approche', 'Être visible', 'Parler à son besoin', 'La première impression', 'Inspirer confiance', 'Orienter le patient', 'Les photos guidées', 'L’aperçu du sourire', 'Préparer la demande', 'Le relais de la réception', 'Les rappels', 'L’après-visite', 'Le parcours complet', 'Mesurer', 'Les deux formules', 'Parlons de votre clinique'];
  const top = document.querySelector('.present-top');
  const controls = document.querySelector('.present-controls');
  const previous = document.querySelector('#present-prev');
  const next = document.querySelector('#present-next');
  const overview = document.querySelector('#presentation-overview');
  let index = 0;
  document.querySelector('.header').hidden = true;
  document.querySelector('.footer').hidden = true;
  document.querySelector('.deck-nav').hidden = true;
  document.querySelector('.back-top').hidden = true;
  document.querySelector('#questions').hidden = true;
  top.hidden = controls.hidden = false;

  function show(target, focus = true) {
    index = Math.max(0, Math.min(frames.length - 1, target));
    frames.forEach((frame, i) => {frame.hidden = i !== index});
    story.hidden = index >= scenes.length;
    document.querySelector('#parcours').hidden = !frames[index].hasAttribute('data-deck');
    previous.disabled = index === 0;
    next.disabled = index === frames.length - 1;
    document.querySelector('#present-position').textContent = String(index + 1).padStart(2, '0') + ' / ' + frames.length;
    document.querySelector('#leave-presentation').href = '?' + (index < scenes.length ? '#accueil' : '#' + frames[index].id);
    document.querySelectorAll('[data-present-go]').forEach((button, i) => button.setAttribute('aria-current', i === index ? 'step' : 'false'));
    history.replaceState(null, '', '?mode=presentation#' + frames[index].id);
    window.scrollTo({top:0, behavior:'instant'});
    if (focus) {
      const heading = frames[index].querySelector('h2');
      if (heading) {heading.tabIndex = -1; heading.focus({preventScroll:true})}
    }
  }
  function goTo(id) {const target = id === 'accueil' ? 0 : frames.findIndex(frame => frame.id === id); if (target >= 0) show(target)}
  window.karwisoftPresentation = {goTo};
  if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const replay = document.createElement('button');
    replay.type = 'button'; replay.className = 'replay-smile';
    replay.textContent = 'Rejouer la transformation illustrative ↻';
    document.querySelector('.real-site').append(replay);
    replay.addEventListener('click', () => {
      replay.disabled = true;
      const before = document.querySelector('.demo-before');
      const patches = document.querySelector('.demo-patches');
      window.gsap.timeline({onComplete: () => {replay.disabled = false}})
        .set(before, {opacity:1}).set(patches, {opacity:1})
        .set('.demo-tooth-left, .demo-tooth-right', {attr:{height:0}})
        .to('.demo-tooth-left', {attr:{height:235},duration:.7,ease:'power1.inOut'}, .35)
        .to('.demo-tooth-right', {attr:{height:235},duration:.7,ease:'power1.inOut'}, .65)
        .to(before, {opacity:0,duration:.8}, 1.15)
        .to(patches, {opacity:0,duration:.3}, 1.9);
    });
  }
  previous.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  frames.forEach((frame, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.presentGo = String(i);
    const number = document.createElement('span');
    number.textContent = String(i + 1).padStart(2, '0');
    button.append(number, document.createTextNode(labels[i]));
    button.addEventListener('click', () => {overview.close(); show(i)});
    document.querySelector('#overview-items').append(button);
  });
  document.querySelector('#present-overview').addEventListener('click', () => overview.showModal());
  document.querySelector('#overview-close').addEventListener('click', () => overview.close());
  overview.addEventListener('click', event => {if (event.target === overview) {const r=overview.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)overview.close()}});
  const fullscreen = document.querySelector('#present-fullscreen');
  if (!document.documentElement.requestFullscreen) fullscreen.hidden = true;
  fullscreen.addEventListener('click', async () => {
    try {if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()} catch {fullscreen.hidden = true}
  });
  document.addEventListener('fullscreenchange', () => fullscreen.setAttribute('aria-label', document.fullscreenElement ? 'Quitter le plein écran' : 'Afficher en plein écran'));
  document.addEventListener('keydown', event => {
    if (overview.open || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest('input, textarea, select, button, a, summary, [contenteditable]')) return;
    const direction = {ArrowRight:1, PageDown:1, ArrowLeft:-1, PageUp:-1};
    if(event.key in direction){event.preventDefault();show(index + direction[event.key])}
    if(event.key==='Home'){event.preventDefault();show(0)}
    if(event.key==='End'){event.preventDefault();show(frames.length-1)}
  });
  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if(!anchor)return;
    const id = anchor.getAttribute('href').slice(1);
    if (id === 'main') {event.preventDefault();show(index);return}
    if (id === 'parcours') {event.preventDefault();goTo('attirer');return}
    if (id === 'accueil' || frames.some(frame => frame.id === id)) {event.preventDefault();goTo(id)}
  });
  document.querySelectorAll('[data-story-go]').forEach(button => button.addEventListener('click', () => show(Number(button.dataset.storyGo))));
  const target = frames.findIndex(frame => frame.id === location.hash.slice(1));
  show(target >= 0 ? target : 0, false);
  addEventListener('hashchange', () => goTo(location.hash.slice(1)));
})();
