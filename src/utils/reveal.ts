// Плавное появление блоков при прокрутке.
// Помечайте элементы атрибутом data-reveal (и при желании data-reveal-delay="150").

const HIDDEN = ['opacity-0', 'translate-y-8'];
const TRANSITION = ['transition-all', 'duration-700', 'ease-out'];

export function initReveal(scope: ParentNode = document): void {
  const elements = scope.querySelectorAll<HTMLElement>('[data-reveal]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove(...HIDDEN);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  elements.forEach((el) => {
    el.classList.add(...TRANSITION, ...HIDDEN);
    const delay = el.dataset.revealDelay;
    if (delay) el.style.transitionDelay = `${delay}ms`;
    observer.observe(el);
  });
}
