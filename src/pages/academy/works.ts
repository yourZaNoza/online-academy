import { asset } from '../../utils/dom';
import { DEFAULT_GRADE, GRADES, LICENSES, WORKS, type Grade, type Work } from '../../content/academy';

function workCard(work: Work, index: number): string {
  const content = work.image
    ? `<img src="${asset(work.image)}" alt="${work.title ?? 'Работа ученика'}" class="tile__image" loading="lazy" />`
    : work.icon
      ? `<img src="${asset(work.icon)}" alt="" class="tile__icon" />`
      : '';

  return `<li class="card card--${work.tone} tile animate-fade-up" style="animation-delay:${index * 60}ms">${content}</li>`;
}

/** «Примеры работ»: переключатель классов + сетка работ */
export function initWorks(filters: HTMLElement, grid: HTMLElement): void {
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

  filters.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.pill');
    const grade = Number(btn?.dataset.grade) as Grade;
    if (!btn || grade === current) return;
    current = grade;
    render();
  });

  render();
}

export function renderLicenses(grid: HTMLElement): void {
  grid.innerHTML = LICENSES.map(
    (item, i) => `
      <li class="card card--${item.tone} license" data-reveal data-reveal-delay="${i * 120}">
        ${
          item.image
            ? `<img src="${asset(item.image)}" alt="${item.title ?? 'Лицензия'}" class="tile__image" loading="lazy" />`
            : `<img src="${asset(item.icon)}" alt="" class="license__icon" />`
        }
      </li>`,
  ).join('');
}
