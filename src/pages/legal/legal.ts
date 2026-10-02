// Страницы документов: «Пользовательское соглашение», «Политика конфиденциальности», «Согласие на обработку данных».
// Текст документа — прямо в HTML (pages/agreement/, pages/privacy/, pages/consent/ → index.html).
// Раздел берётся из <body data-page="...">.

import { bootstrap } from '../../layout/bootstrap';
import { COOKIES, COOKIE_KINDS } from '../../content/cookies';
import type { PageId } from '../../content/site';
import './legal.css';

bootstrap(document.body.dataset.page as PageId);

// Таблица cookie собирается из src/content/cookies.ts — чтобы политика не расходилась с сайтом
const table = document.querySelector<HTMLElement>('#cookie-table');
if (table) {
  table.innerHTML = `
    <table class="legal__table text-sm">
      <thead><tr><th>Cookie</th><th>Кто ставит</th><th>Зачем</th><th>Срок</th><th>Когда</th></tr></thead>
      <tbody>
        ${COOKIES.map(
          (c) => `<tr>
            <td><code>${c.name}</code></td>
            <td>${c.owner}</td>
            <td>${c.purpose}</td>
            <td>${c.lifetime}</td>
            <td>${COOKIE_KINDS[c.kind]}</td>
          </tr>`,
        ).join('')}
      </tbody>
    </table>`;
}
