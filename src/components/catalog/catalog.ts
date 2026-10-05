// Каталог карточек с фильтрами по аудитории.
// Используется на страницах «Курсы» и «Мастер-классы».

import { AUDIENCES, type Audience, type CatalogItem } from '../../content/types';
import { asset } from '../../utils/dom';
import { plural, rub } from '../../utils/format';
import './catalog.css';

type Filter = Audience | 'all';

export interface CatalogOptions<T extends CatalogItem> {
  items: T[];
  filters: HTMLElement;
  grid: HTMLElement;
  counter: HTMLElement;
  /** Фильтры после «Все …», в нужном порядке */
  audiences: Audience[];
  /** Подпись первого фильтра: «Все курсы» */
  allLabel: string;
  /** Формы слова для счётчика: ['курс', 'курса', 'курсов'] */
  noun: [string, string, string];
  /** Текст, если по фильтру ничего не нашлось */
  empty: string;
  /** Кнопка или ссылка в правом нижнем углу карточки */
  action: (item: T) => string;
  /** Показывать бейдж «от N лет» на карточке (по умолчанию — да) */
  showAge?: boolean;
  /** Вызывается перед каждой перерисовкой сетки */
  onRender?: () => void;
}

function card<T extends CatalogItem>(item: T, index: number, action: string, showAge: boolean): string {
  const imageStyle = [
    item.imagePosition && `object-position:${item.imagePosition}`,
    item.imageZoom && `transform:scale(${item.imageZoom})`,
  ]
    .filter(Boolean)
    .join(';');
  const cover = item.image
    ? `<img src="${asset(item.image)}" alt="" class="course__image" loading="lazy"${imageStyle ? ` style="${imageStyle}"` : ''} />`
    : `<img src="${asset(item.icon)}" alt="" class="course__icon" />`;
  const tags = item.audience
    .map((a) => `<li class="course__tag font-extrabold uppercase">${AUDIENCES[a]}</li>`)
    .join('');

  return `
    <article class="course animate-fade-up" style="animation-delay:${index * 50}ms" data-title="${item.title}">
      ${showAge ? `<span class="course__age text-sm font-extrabold uppercase">от ${item.age} лет</span>` : ''}
      <div class="course__cover course__cover--${item.tone}">${cover}</div>
      <ul class="course__tags">${tags}</ul>
      <h3 class="font-display font-bold text-2xl leading-tight m-0">${item.title}</h3>
      <p class="course__text text-sm leading-normal">${item.description}</p>
      <div class="course__footer">
        <div>
          <p class="font-display font-extrabold text-lg leading-none m-0">${rub(item.price)}</p>
          <p class="text-xs font-semibold text-ink-soft m-0 mt-1">${item.priceNote}</p>
        </div>
        ${action}
      </div>
    </article>`;
}

export function initCatalog<T extends CatalogItem>(opts: CatalogOptions<T>): void {
  const { items, filters, grid, counter } = opts;
  let current: Filter = 'all';

  const options: [Filter, string][] = [['all', opts.allLabel], ...opts.audiences.map((a): [Filter, string] => [a, AUDIENCES[a]])];
  filters.innerHTML = options
    .map(
      ([id, label]) =>
        `<button type="button" class="pill text-sm font-bold" role="tab" data-filter="${id}" aria-selected="${id === current}">${label}</button>`,
    )
    .join('');

  const render = (): void => {
    const list = current === 'all' ? items : items.filter((item) => item.audience.includes(current as Audience));
    opts.onRender?.();
    counter.textContent = `${list.length} ${plural(list.length, opts.noun)}`;
    grid.innerHTML = list.length
      ? list.map((item, i) => card(item, i, opts.action(item), opts.showAge ?? true)).join('')
      : `<p class="courses__empty text-lg font-semibold animate-fade-in">${opts.empty}</p>`;
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
