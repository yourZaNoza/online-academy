// Каталог курсов: общий компонент каталога + раскрывающийся блок «Подробнее».

import { COURSES } from '../../content/courses';
import { PROGRAMS } from '../../content/course-programs';
import { AUDIENCES, type Audience } from '../../content/types';
import { initCatalog as initCatalogGrid } from '../../components/catalog/catalog';
import { initDetails, moreButton, type Details } from '../../components/catalog/details';
import { $ } from '../../utils/dom';
import { rub } from '../../utils/format';

function courseDetails(title: string): Details | null {
  const course = COURSES.find((c) => c.title === title);
  const program = PROGRAMS[title];
  if (!course || !program) return null;
  const lessons = program.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
  return {
    title,
    tone: course.tone,
    label: 'Программа курса',
    modules: program.modules,
    itemLabel: 'Урок',
    facts: [
      ['Стоимость', rub(course.price)],
      ['Длительность', program.duration],
      ['Уроков', String(lessons)],
      ['Формат', program.format],
    ],
    note: 'Первый урок бесплатно',
  };
}

export function initCatalog(): void {
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
