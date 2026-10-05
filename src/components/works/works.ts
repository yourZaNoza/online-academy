// Раздел «Примеры работ наших учеников»: фильтр по классам и сетка работ, клик по фото — на весь экран.
// Используется на странице «Академия»; под сеткой — ссылка на страницу «Галерея».
// В HTML достаточно пустой секции: <section class="section section--white" id="works"></section>

import { $, asset } from '../../utils/dom';
import { openLightbox } from '../../utils/lightbox';
import { DEFAULT_GRADE, GRADES, WORKS, type Grade, type Work } from '../../content/academy';
import './works.css';

function workCard(work: Work, index: number): string {
  const content = work.image
    ? `<button type="button" class="tile__open" data-index="${index}" aria-label="Открыть на весь экран: ${work.title ?? 'работа ученика'}">
         <img src="${asset(work.image)}" alt="${work.title ?? 'Работа ученика'}" class="tile__image" loading="lazy" />
       </button>`
    : work.icon
      ? `<img src="${asset(work.icon)}" alt="" class="tile__icon" />`
      : '';

  return `<li class="card card--${work.tone} tile animate-fade-up" style="animation-delay:${index * 60}ms">${content}</li>`;
}

export function renderWorks(root: HTMLElement): void {
  root.innerHTML = `
      <div class="container">
        <div class="works__head">
          <div class="works__birds" data-reveal aria-hidden="true">
            <img src="/icons/bird%201.svg" alt="" class="bird bird--yellow animate-hop" />
            <img src="/icons/bird%202.svg" alt="" class="bird bird--orange animate-hop [animation-delay:1.2s]" />
          </div>
          <div class="works__controls">
            <h2 class="tag-title font-display font-extrabold text-3xl sm:text-4xl leading-tight" data-reveal>
              <span class="tag tag--orange">Примеры работ</span>
              <span class="tag tag--yellow">наших учеников</span>
            </h2>
            <div class="pills" role="tablist" aria-label="Выбор класса" data-reveal></div>
          </div>
        </div>
        <ul class="tiles" aria-live="polite"></ul>
        <p class="works__more m-0" data-reveal>
          <a href="/gallery/" class="font-display font-extrabold text-2xl sm:text-3xl">Перейти к <span>галерее</span></a>
        </p>
      </div>`;

  initWorks($('.pills', root), $('.tiles', root));
}

/** Переключатель классов + сетка работ */
function initWorks(filters: HTMLElement, grid: HTMLElement): void {
  let current: Grade = DEFAULT_GRADE;

  filters.innerHTML = GRADES.map(
    (grade) => `
      <button type="button" class="pill text-lg font-extrabold" role="tab"
              data-grade="${grade}" aria-selected="${grade === current}">${grade} класс</button>`,
  ).join('');

  const render = (): void => {
    grid.innerHTML = WORKS[current].map(workCard).join('');
    filters.querySelectorAll<HTMLButtonElement>('.pill').forEach((btn) => {
      btn.setAttribute('aria-selected', String(Number(btn.dataset.grade) === current));
    });
  };

  // Клик по фото — на весь экран; листаются только работы выбранного класса
  grid.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.tile__open');
    if (!btn) return;
    const gallery = WORKS[current]
      .filter((work) => work.image)
      .map((work) => ({ src: work.image!, alt: work.title ?? 'Работа ученика' }));
    const clicked = WORKS[current][Number(btn.dataset.index)];
    openLightbox(gallery, Math.max(0, gallery.findIndex((g) => g.src === clicked?.image)));
  });

  filters.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.pill');
    const grade = Number(btn?.dataset.grade) as Grade;
    if (!btn || grade === current) return;
    current = grade;
    render();
  });

  render();
}
