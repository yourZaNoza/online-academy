// Страница «Галерея» (pages/gallery/index.html): все работы учеников с фильтром по классам.
// Работы, авторы и преподаватели — в src/content/academy.ts (WORKS).

import { bootstrap } from '../../layout/bootstrap';
import { GRADES, WORKS, type Grade, type Work } from '../../content/academy';
import { $, asset } from '../../utils/dom';
import { plural } from '../../utils/format';
import { openLightbox } from '../../utils/lightbox';
import '../../components/catalog/catalog.css';
import './gallery.css';

bootstrap('gallery');

type Filter = Grade | 'all';

interface GalleryWork extends Work {
  grade: Grade;
}

/** Сначала все работы 1 класса, затем 2-го и так далее */
const ALL_WORKS: GalleryWork[] = GRADES.flatMap((grade) =>
  WORKS[grade].filter((work) => work.image).map((work) => ({ ...work, grade })),
);

const filters = $('#gallery-filters');
const grid = $('#gallery-grid');
const counter = $('#gallery-count');
let current: Filter = 'all';
let shown: GalleryWork[] = ALL_WORKS;

function workCard(work: GalleryWork, index: number): string {
  const title = work.title ?? 'Работа ученика';
  const { name, age, teacher } = work.author;
  return `
    <li class="work-card animate-fade-up" style="animation-delay:${Math.min(index, 12) * 50}ms">
      <button type="button" class="work-card__frame" data-index="${index}" aria-label="Открыть на весь экран: ${title}">
        <img src="${asset(work.image!)}" alt="${title}" class="work-card__image" loading="lazy" />
      </button>
      <span class="work-card__tag text-xs font-extrabold uppercase">${work.grade} класс</span>
      <h3 class="font-display font-bold text-2xl leading-tight m-0">${title}</h3>
      <p class="work-card__meta text-sm">
        Выполнил(а): ${name}, ${age} ${plural(age, ['год', 'года', 'лет'])}<br />
        Преподаватель: ${teacher}
      </p>
    </li>`;
}

/** Горизонтальные работы — 344×252, вертикальные — 252×344: ориентацию узнаём после загрузки */
function markOrientation(img: HTMLImageElement): void {
  const apply = (): void => {
    img.classList.toggle('is-landscape', img.naturalWidth > img.naturalHeight);
  };
  if (img.complete && img.naturalWidth) apply();
  else img.addEventListener('load', apply, { once: true });
}

function render(): void {
  shown = current === 'all' ? ALL_WORKS : ALL_WORKS.filter((work) => work.grade === current);
  counter.textContent = `${shown.length} ${plural(shown.length, ['работа', 'работы', 'работ'])}`;
  grid.innerHTML = shown.map(workCard).join('');
  grid.querySelectorAll<HTMLImageElement>('.work-card__image').forEach(markOrientation);
  filters.querySelectorAll<HTMLButtonElement>('.pill').forEach((btn) => {
    btn.setAttribute('aria-selected', String(btn.dataset.filter === String(current)));
  });
}

const options: [Filter, string][] = [['all', 'Все работы'], ...GRADES.map((g): [Filter, string] => [g, `${g} класс`])];
filters.innerHTML = options
  .map(
    ([id, label]) =>
      `<button type="button" class="pill text-sm font-bold" role="tab" data-filter="${id}" aria-selected="${id === current}">${label}</button>`,
  )
  .join('');

filters.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.pill');
  if (!btn) return;
  const next: Filter = btn.dataset.filter === 'all' ? 'all' : (Number(btn.dataset.filter) as Grade);
  if (next === current) return;
  current = next;
  render();
});

// Клик по работе — на весь экран; листаются работы, которые сейчас показаны
grid.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.work-card__frame');
  if (!btn) return;
  const images = shown.map((work) => ({ src: work.image!, alt: work.title ?? 'Работа ученика' }));
  openLightbox(images, Number(btn.dataset.index));
});

render();
