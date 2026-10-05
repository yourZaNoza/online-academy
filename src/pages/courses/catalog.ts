// Каталог курсов: общий компонент каталога + раскрывающийся блок «Подробнее».

import { COURSES } from '../../content/courses';
import { PROGRAMS } from '../../content/course-programs';
import { AUDIENCES, TEACHER_PLACEHOLDER, type Audience } from '../../content/types';
import { initCatalog as initCatalogGrid } from '../../components/catalog/catalog';
import { initDetails, moreButton, type Details } from '../../components/catalog/details';
import { $ } from '../../utils/dom';
import { rub } from '../../utils/format';

function courseDetails(title: string): Details | null {
  const course = COURSES.find((c) => c.title === title);
  const program = PROGRAMS[title];
  if (!course || !program) return null;
  return {
    title,
    tone: course.tone,
    label: 'Программа курса',
    modules: program.modules,
    itemLabel: 'Урок',
    facts: [
      ['Стоимость', rub(course.price)],
      ['Преподаватель', course.teacher ?? TEACHER_PLACEHOLDER],
      ['Формат', program.format],
      ['Длительность', program.duration],
    ],
    link: { href: '#formats', label: 'Оформить индивидуальную программу' },
  };
}

export function initCatalog(): void {
  // Программа ищется по точному названию курса: после переименования курса поправьте ключ в course-programs.ts
  if (import.meta.env.DEV) {
    const missing = COURSES.filter((c) => !PROGRAMS[c.title]).map((c) => c.title);
    if (missing.length) console.warn('Нет программы в course-programs.ts для курсов:', missing);
  }

  const grid = $('#course-grid');
  const details = initDetails(grid, courseDetails);

  initCatalogGrid({
    items: COURSES,
    filters: $('#course-filters'),
    grid,
    counter: $('#course-count'),
    audiences: Object.keys(AUDIENCES) as Audience[],
    allLabel: 'Все курсы',
    noun: ['курс', 'курса', 'курсов'],
    empty: 'Скоро здесь появятся новые курсы. Оставьте заявку — подберём программу индивидуально.',
    action: moreButton,
    onRender: details.close,
  });
}
