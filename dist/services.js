/* Native links and disclosures keep this page usable without JavaScript. */
(() => {
  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('.service-strip a')];
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      links.forEach(link => {
        if (link.hash.slice(1) === entry.target.id) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    }
  }, {rootMargin:'-10% 0px -65% 0px', threshold:0});
  sections.forEach(section => observer.observe(section));
})();
