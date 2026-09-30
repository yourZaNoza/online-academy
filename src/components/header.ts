import { DEFAULT_CTA, NAV_ITEMS, PAGE_CTA, SITE_NAME, type PageId } from '../data/site';
import { $, asset } from '../utils/dom';

export function renderHeader(root: HTMLElement, activePage: PageId): void {
  const links = NAV_ITEMS.map(
    (item) => `
      <li>
        <a href="${item.href}" class="site-nav__link text-sm font-semibold"
           ${item.id === activePage ? 'aria-current="page"' : ''}>${item.label}</a>
      </li>`,
  ).join('');
  const cta = PAGE_CTA[activePage] ?? DEFAULT_CTA;

  root.innerHTML = `
    <div class="container site-header__inner animate-fade-in">
      <a href="/" class="logo">
        <img src="${asset('/icons/icon light.svg')}" alt="" class="logo__mark" width="40" height="40" />
        <span class="font-display font-bold text-sm sm:text-lg leading-tight">${SITE_NAME}</span>
      </a>
      <nav class="site-nav" id="site-nav" aria-label="Основное меню">
        <ul class="site-nav__list">${links}</ul>
        <a href="${cta.href}" class="btn text-sm font-bold">${cta.label}</a>
      </nav>
      <button class="burger" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Открыть меню">
        <span></span>
      </button>
    </div>`;

  const nav = $('#site-nav', root);
  const burger = $<HTMLButtonElement>('.burger', root);

  const setOpen = (open: boolean): void => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  };

  burger.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });

  // Тень у шапки, когда страница прокручена
  const onScroll = (): void => {
    root.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
