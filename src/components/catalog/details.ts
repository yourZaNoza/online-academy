// Раскрывающийся блок «Подробнее»: программа и краткая сводка.
// Выдвигается под рядом с выбранной карточкой. Что показать — решает страница через getDetails.

import type { ProgramModule, Tone } from '../../content/types';
import { $ } from '../../utils/dom';
import './details.css';

export interface Details {
  title: string;
  tone: Tone;
  /** Заголовок левой колонки: «Программа курса» */
  label: string;
  modules: ProgramModule[];
  /** Слово перед номером пункта: «Урок» → «Урок 1: …» */
  itemLabel: string;
  /** Строки сводки справа: [«Стоимость», «4 900 ₽»] */
  facts: [string, string][];
  /** Ссылка под кнопкой «Записаться» (необязательно) */
  link?: { href: string; label: string };
}

const CHEVRON = `<svg class="course__chevron" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>`;

/** Кнопка «Подробнее / Свернуть» для карточки каталога */
export const moreButton = (): string => `
  <button type="button" class="btn btn--sm course__more text-sm font-bold" aria-expanded="false">
    <span class="course__more-label">Подробнее</span>${CHEVRON}
  </button>`;

function detailsContent(details: Details): string {
  let itemNo = 0;
  const modules = details.modules
    .map(
      (mod, i) => `
        <li class="program__module">
          <p class="program__title font-display font-bold text-lg m-0"><span class="program__num text-sm">${i + 1}</span>${mod.title}</p>
          <ul class="program__lessons text-sm">
            ${mod.lessons.map((lesson) => `<li>${details.itemLabel} ${++itemNo}: ${lesson}</li>`).join('')}
          </ul>
        </li>`,
    )
    .join('');

  return `
    <button type="button" class="course-details__close" aria-label="Свернуть">
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13"/></svg>
    </button>
    <div class="course-details__program">
      <p class="course-details__label text-xs font-extrabold uppercase m-0">${details.label}</p>
      <ol class="program">${modules}</ol>
    </div>
    <aside class="course-details__summary course__cover--${details.tone}">
      <p class="font-display font-bold text-2xl leading-tight m-0">${details.title}</p>
      <dl class="course-details__facts text-sm">
        ${details.facts.map(([k, v]) => `<div><dt>${k}</dt><dd class="font-extrabold">${v}</dd></div>`).join('')}
      </dl>
      <a href="/contacts/" class="btn course-details__cta font-bold">Записаться</a>
      ${details.link ? `<a href="${details.link.href}" class="text-xs font-semibold text-ink-soft text-center underline underline-offset-2">${details.link.label}</a>` : ''}
    </aside>`;
}

export function initDetails(
  grid: HTMLElement,
  getDetails: (title: string) => Details | null,
): { close: () => void } {
  let panel: HTMLElement | null = null;
  let active: HTMLElement | null = null;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const setExpanded = (card: HTMLElement, expanded: boolean): void => {
    card.classList.toggle('is-active', expanded);
    const btn = $('.course__more', card);
    btn.setAttribute('aria-expanded', String(expanded));
    $('.course__more-label', btn).textContent = expanded ? 'Свернуть' : 'Подробнее';
  };

  /** Последняя карточка в ряду, после которой вставляется блок */
  const rowEnd = (card: HTMLElement): HTMLElement => {
    const cards = [...grid.querySelectorAll<HTMLElement>('.course')];
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    const index = cards.indexOf(card);
    return cards[Math.min(Math.ceil((index + 1) / cols) * cols, cards.length) - 1];
  };

  const placeArrow = (card: HTMLElement): void => {
    if (!panel) return;
    const x = card.getBoundingClientRect().left + card.offsetWidth / 2 - grid.getBoundingClientRect().left;
    panel.style.setProperty('--arrow-x', `${x}px`);
  };

  const collapse = (el: HTMLElement): void => {
    el.classList.remove('is-open');
    if (reduceMotion.matches) return el.remove();
    el.addEventListener('transitionend', () => el.remove(), { once: true });
    setTimeout(() => el.remove(), 600); // на случай, если transitionend не придёт
  };

  const close = (): void => {
    if (active) setExpanded(active, false);
    if (panel) collapse(panel);
    grid.classList.remove('has-open');
    panel = active = null;
  };

  const open = (card: HTMLElement): void => {
    const details = getDetails(card.dataset.title ?? '');
    if (!details) return;
    const anchor = rowEnd(card);
    if (active) setExpanded(active, false);

    // Тот же ряд — меняем содержимое на месте, иначе схлопываем старый блок и выдвигаем новый
    if (panel && panel.previousElementSibling !== anchor) {
      collapse(panel);
      panel = null;
    }
    const isNew = !panel;
    if (!panel) {
      panel = document.createElement('section');
      panel.className = 'course-details';
      panel.setAttribute('aria-label', `${details.label} «${details.title}»`);
      panel.innerHTML = '<div class="course-details__clip"><div class="course-details__box"></div></div>';
      anchor.after(panel);
    }
    $('.course-details__box', panel).innerHTML = detailsContent(details);
    active = card;
    setExpanded(card, true);
    grid.classList.add('has-open');
    placeArrow(card);

    if (isNew) {
      const el = panel;
      void el.offsetHeight; // фиксируем закрытое состояние, чтобы сработал transition
      el.classList.add('is-open');
      setTimeout(() => el.scrollIntoView({ block: 'nearest', behavior: reduceMotion.matches ? 'auto' : 'smooth' }), 450);
    }
  };

  grid.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('.course-details__close')) return close();
    const btn = target.closest('.course__more');
    if (!btn) return;
    const card = btn.closest<HTMLElement>('.course')!;
    if (card === active) close();
    else open(card);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && active) {
      const btn = $('.course__more', active);
      close();
      btn.focus();
    }
  });

  // При смене числа колонок блок должен оказаться под нужным рядом
  window.addEventListener('resize', () => {
    if (!active || !panel) return;
    const anchor = rowEnd(active);
    if (panel.previousElementSibling !== anchor) anchor.after(panel);
    placeArrow(active);
  });

  return { close };
}
