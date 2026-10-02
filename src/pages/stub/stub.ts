// Временная страница «в разработке» для разделов, у которых ещё нет макета.
// Раздел берётся из <body data-page="...">.

import { bootstrap } from '../../layout/bootstrap';
import { NAV_ITEMS, type PageId } from '../../content/site';
import { $, asset } from '../../utils/dom';
import './stub.css';

const page = document.body.dataset.page as PageId;
bootstrap(page);

const title = NAV_ITEMS.find((item) => item.id === page)?.label ?? 'Раздел';

$('#stub').innerHTML = `
  <div class="stub animate-fade-up">
    <img src="${asset('/icons/Pen.svg')}" alt="" class="stub__icon animate-float" />
    <h1 class="tag-title font-display font-extrabold text-4xl sm:text-5xl leading-tight">
      <span class="tag tag--orange">${title}</span>
      <span class="tag tag--yellow">скоро здесь</span>
    </h1>
    <p class="text-lg m-0">Раздел в разработке. А пока загляните в наши курсы или оставьте заявку на консультацию.</p>
    <div class="stub__actions">
      <a href="/courses/" class="btn text-sm font-bold">Смотреть курсы</a>
      <a href="/#consultation" class="btn btn--ghost text-sm font-bold">Получить консультацию</a>
    </div>
  </div>`;
