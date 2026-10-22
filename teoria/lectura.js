/* Mejora opcional: enlaces y contenido funcionan también sin este archivo. */
(() => {
  const disclosure = document.querySelector('.contents-disclosure');
  const desktop = matchMedia('(min-width: 701px)');
  const adapt = () => { disclosure.open = desktop.matches; };
  adapt();
  desktop.addEventListener('change', adapt);
  if (!('IntersectionObserver' in window)) return;
  const label = document.getElementById('tema-actual');
  const links = [...document.querySelectorAll('.contents a')];
  const headings = [...document.querySelectorAll('article h2, article h3, article h4')];
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const passed = headings.filter(heading => heading.getBoundingClientRect().top <= innerHeight * .35);
    const heading = passed.at(-1);
    links.forEach(link => link.removeAttribute('aria-current'));
    label.hidden = !heading;
    if (!heading) return;
    const indexedHeading = [...passed].reverse().find(item =>
      links.some(link => decodeURIComponent(link.hash.slice(1)) === item.id));
    const current = links.find(link => decodeURIComponent(link.hash.slice(1)) === indexedHeading?.id)
      || links.find(link => link.hash === '#' + heading.closest('article').id);
    if (current) current.setAttribute('aria-current', 'location');
    label.textContent = 'Estás leyendo / ' + heading.textContent;
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  const observer = new IntersectionObserver(schedule, { threshold: [0, 1] });
  headings.forEach(heading => observer.observe(heading));
  // Also update across gaps longer than the viewport (tables, figures, examples).
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  update();
})();
