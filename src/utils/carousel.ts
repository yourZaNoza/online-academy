/**
 * Карусель: сдвигает .track внутри .viewport по одной карточке.
 * Стрелки [data-prev] / [data-next], необязательный счётчик [data-counter] и свайп пальцем.
 * Сколько карточек видно одновременно — решает CSS (ширина карточек).
 * loop: бесконечная прокрутка — после последней карточки снова идёт первая.
 */
export function initCarousel(
  scope: HTMLElement,
  viewport: HTMLElement,
  track: HTMLElement,
  { loop = false }: { loop?: boolean } = {},
): void {
  const prev = scope.querySelector<HTMLButtonElement>('[data-prev]');
  const next = scope.querySelector<HTMLButtonElement>('[data-next]');
  const counter = scope.querySelector<HTMLElement>('[data-counter]');

  const originals = Array.from(track.children) as HTMLElement[];
  const total = originals.length;

  // Для бесконечной прокрутки ставим копии карточек по обе стороны:
  // [копии][оригиналы][копии]. Доехав до копии, незаметно перескакиваем на такой же оригинал.
  if (loop && total > 0) {
    const clone = (card: HTMLElement): HTMLElement => {
      const copy = card.cloneNode(true) as HTMLElement;
      copy.setAttribute('aria-hidden', 'true');
      copy.querySelectorAll('a, button').forEach((el) => el.setAttribute('tabindex', '-1'));
      return copy;
    };
    track.prepend(...originals.map(clone));
    track.append(...originals.map(clone));
  }

  const cards = Array.from(track.children) as HTMLElement[];
  let index = loop ? total : 0;

  const maxIndex = (): number => {
    const first = cards[0];
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const perView = Math.max(1, Math.round((viewport.clientWidth + gap) / (first.offsetWidth + gap)));
    return Math.max(0, total - perView);
  };

  const move = (animate = true): void => {
    if (!animate) track.style.transition = 'none';
    track.style.transform = `translateX(${-(cards[index]?.offsetLeft ?? 0)}px)`;
    if (!animate) {
      void track.offsetWidth; // применяем позицию до того, как вернуть анимацию
      track.style.transition = '';
    }
  };

  // Если стоим на копии — перескакиваем на её оригинал без анимации
  const normalize = (): void => {
    if (index >= total && index < total * 2) return;
    index = ((index % total) + total) % total + total;
    move(false);
  };

  const update = (): void => {
    if (loop) {
      move();
      return;
    }
    const max = maxIndex();
    index = Math.min(index, max);
    move();
    if (counter) counter.textContent = `${index + 1} / ${max + 1}`;
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === max;
  };

  const go = (step: number): void => {
    if (loop) {
      normalize();
      index += step;
    } else {
      index = Math.min(Math.max(index + step, 0), maxIndex());
    }
    update();
  };

  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));
  window.addEventListener('resize', () => (loop ? move(false) : update()));
  if (loop) {
    track.addEventListener('transitionend', (e) => {
      if (e.target === track) normalize();
    });
  }

  // Свайп пальцем; клик после свайпа гасим, чтобы не сработали ссылки/кнопки в карточках
  const swallowClick = (ev: Event): void => ev.stopPropagation();
  let startX: number | null = null;
  viewport.addEventListener('pointerdown', (e) => (startX = e.clientX));
  viewport.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) <= 50) return;
    go(dx < 0 ? 1 : -1);
    viewport.addEventListener('click', swallowClick, { capture: true, once: true });
    setTimeout(() => viewport.removeEventListener('click', swallowClick, true));
  });

  if (loop) move(false);
  else update();
}
