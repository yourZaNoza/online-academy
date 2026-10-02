// Раскрывающийся блок «Подробнее»: программа курса и краткая сводка.
// Выдвигается под рядом с выбранной карточкой.

import { COURSES, type Course } from '../../content/courses';
import { PROGRAMS } from '../../content/course-programs';
import { $ } from '../../utils/dom';
import { rub } from '../../utils/format';

function detailsContent(course: Course): string {
  const program = PROGRAMS[course.title];
  if (!program) return '';
  let lessonNo = 0;
  const modules = program.modules
    .map(
      (mod, i) => `
        <li class="program__module">
          <p class="program__title font-display font-bold text-lg m-0"><span class="program__num text-sm">${i + 1}</span>${mod.title}</p>
          <ul class="program__lessons text-sm">
            ${mod.lessons.map((lesson) => `<li>Урок ${++lessonNo}: ${lesson}</li>`).join('')}
          </ul>
        </li>`,
    )
    .join('');
  const rows: [string, string][] = [
    ['Стоимость', rub(course.price)],
    ['Длительность', program.duration],
    ['Уроков', String(lessonNo)],
    ['Формат', program.format],
  ];

  return `
    <button type="button" class="course-details__close" aria-label="Свернуть">
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13"/></svg>
    </button>
    <div class="course-details__program">
      <p class="course-details__label text-xs font-extrabold uppercase m-0">Программа курса</p>
      <ol class="program">${modules}</ol>
    </div>
    <aside class="course-details__summary course__cover--${course.tone}">
      <p class="font-display font-bold text-2xl leading-tight m-0">${course.title}</p>
      <dl class="course-details__facts text-sm">
        ${rows.map(([k, v]) => `<div><dt>${k}</dt><dd class="font-extrabold">${v}</dd></div>`).join('')}
      </dl>
      <a href="/#consultation" class="btn course-details__cta font-bold">Записаться</a>
      <p class="text-xs font-semibold text-ink-soft text-center m-0">Первый урок бесплатно</p>
    </aside>`;
}

export function initDetails(grid: HTMLElement): { close: () => void } {
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
    const course = COURSES.find((c) => c.title === card.dataset.title);
    if (!course) return;
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
      panel.setAttribute('aria-label', `Программа курса «${course.title}»`);
      panel.innerHTML = '<div class="course-details__clip"><div class="course-details__box"></div></div>';
      anchor.after(panel);
    }
    $('.course-details__box', panel).innerHTML = detailsContent(course);
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
