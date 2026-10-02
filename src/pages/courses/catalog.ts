// Каталог курсов: фильтры по аудитории и карточки.

import { AUDIENCES, COURSES, type Audience, type Course } from '../../content/courses';
import { $, asset } from '../../utils/dom';
import { plural, rub } from '../../utils/format';
import { initDetails } from './course-details';

const CHEVRON = `<svg class="course__chevron" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>`;

type Filter = Audience | 'all';

function courseCard(course: Course, index: number): string {
  const cover = course.image
    ? `<img src="${asset(course.image)}" alt="" class="course__image" loading="lazy" />`
    : `<img src="${asset(course.icon)}" alt="" class="course__icon" />`;
  const tags = course.audience
    .map((a) => `<li class="course__tag text-xs font-extrabold uppercase">${AUDIENCES[a]}</li>`)
    .join('');

  return `
    <article class="course animate-fade-up" style="animation-delay:${index * 50}ms" data-title="${course.title}">
      <span class="course__age text-sm font-extrabold uppercase">от ${course.age} лет</span>
      <div class="course__cover course__cover--${course.tone}">${cover}</div>
      <ul class="course__tags">${tags}</ul>
      <h3 class="font-display font-bold text-2xl leading-tight m-0">${course.title}</h3>
      <p class="course__text text-sm leading-normal">${course.description}</p>
      <div class="course__footer">
        <div>
          <p class="font-display font-extrabold text-lg leading-none m-0">${rub(course.price)}</p>
          <p class="text-xs font-semibold text-ink-soft m-0 mt-1">${course.priceNote}</p>
        </div>
        <button type="button" class="btn btn--sm course__more text-sm font-bold" aria-expanded="false">
          <span class="course__more-label">Подробнее</span>${CHEVRON}
        </button>
      </div>
    </article>`;
}

export function initCatalog(): void {
  const filters = $('#course-filters');
  const grid = $('#course-grid');
  const counter = $('#course-count');
  let current: Filter = 'all';
  const details = initDetails(grid);

  const options: [Filter, string][] = [['all', 'Все курсы'], ...(Object.entries(AUDIENCES) as [Audience, string][])];
  filters.innerHTML = options
    .map(
      ([id, label]) =>
        `<button type="button" class="pill text-sm font-bold" role="tab" data-filter="${id}" aria-selected="${id === current}">${label}</button>`,
    )
    .join('');

  const render = (): void => {
    const list = current === 'all' ? COURSES : COURSES.filter((c) => c.audience.includes(current as Audience));
    details.close();
    counter.textContent = `${list.length} ${plural(list.length, ['курс', 'курса', 'курсов'])}`;
    grid.innerHTML = list.length
      ? list.map(courseCard).join('')
      : `<p class="courses__empty text-lg font-semibold animate-fade-in">Скоро здесь появятся новые курсы. Оставьте заявку — подберём программу индивидуально.</p>`;
    filters.querySelectorAll<HTMLButtonElement>('.pill').forEach((btn) => {
      btn.setAttribute('aria-selected', String(btn.dataset.filter === current));
    });
  };

  filters.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.pill');
    if (!btn || btn.dataset.filter === current) return;
    current = btn.dataset.filter as Filter;
    render();
  });

  render();
}
