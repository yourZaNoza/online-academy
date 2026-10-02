// Страница «Мастер-классы» (pages/masterclasses/index.html)

import { bootstrap } from '../../layout/bootstrap';
import { MASTERCLASSES } from '../../content/masterclasses';
import { initCatalog } from '../../components/catalog/catalog';
import { initDetails, moreButton, type Details } from '../../components/catalog/details';
import { $ } from '../../utils/dom';
import { rub } from '../../utils/format';

bootstrap('masterclasses');

function masterclassDetails(title: string): Details | null {
  const item = MASTERCLASSES.find((m) => m.title === title);
  if (!item) return null;
  return {
    title,
    tone: item.tone,
    label: 'Программа мастер-класса',
    modules: item.program,
    itemLabel: 'Шаг',
    facts: [
      ['Стоимость', rub(item.price)],
      ['Длительность', item.duration],
      ['Возраст', `от ${item.age} лет`],
      ['Формат', item.format],
    ],
  };
}

const grid = $('#masterclass-grid');
const details = initDetails(grid, masterclassDetails);

initCatalog({
  items: MASTERCLASSES,
  filters: $('#masterclass-filters'),
  grid,
  counter: $('#masterclass-count'),
  audiences: ['kids', 'adults', 'beginners', 'masters'],
  allLabel: 'Все курсы',
  noun: ['мастер-класс', 'мастер-класса', 'мастер-классов'],
  empty: 'Скоро здесь появятся новые мастер-классы. Оставьте заявку — подскажем, с чего начать.',
  action: moreButton,
  onRender: details.close,
});
