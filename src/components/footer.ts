import { CONTACTS, SITE_NAME } from '../data/site';
import { $, asset } from '../utils/dom';

export function renderFooter(root: HTMLElement): void {
  const year = new Date().getFullYear();
  const { links } = CONTACTS;
  const phoneHref = CONTACTS.phone.replace(/[^\d+]/g, '');

  root.innerHTML = `
    <div class="container">
      <div class="site-footer__grid">
        <div data-reveal>
          <a href="/" class="logo">
            <img src="${asset('/icons/icon light.svg')}" alt="" class="logo__mark" width="40" height="40" />
            <span class="font-display font-semibold text-xl leading-tight">
              Кисловодская<br />Онлайн-Академия искусств
            </span>
          </a>
          <div class="site-footer__links text-sm font-bold">
            <a href="${links.orgInfo}" class="underline underline-offset-2">Сведения об образовательной организации</a>
            <a href="${links.govSite}" class="underline underline-offset-2">Государственный сайт академии</a>
          </div>

          <!-- Заглушка: сюда встанет виджет карты (Яндекс.Карты и т.п.) -->
          <div class="map-stub" id="map">
            <div class="map-stub__center">
              <img src="${asset('/icons/point.svg')}" alt="" width="40" height="40" />
              <span class="text-sm font-bold">Здесь будет карта</span>
              <span class="text-xs">${CONTACTS.address}</span>
            </div>
            <span class="map-stub__label font-display text-sm font-semibold">Хотите записаться офлайн? Мы на карте!</span>
          </div>

          <div class="rating">
            <span class="font-display font-bold">${CONTACTS.rating}</span>
            <span class="text-yellow tracking-wider" aria-label="5 из 5">★★★★★</span>
            <span class="text-xs font-semibold text-ink-soft">Рейтинг организации в Яндексе</span>
          </div>
        </div>

        <div data-reveal data-reveal-delay="150">
          <h2 class="font-display font-bold text-xl m-0">Контакты</h2>
          <div class="contacts text-sm leading-relaxed">
            <p>${CONTACTS.fullName}</p>
            <p><b>Сокращенное наименование образовательной организации:</b> ${CONTACTS.shortName}</p>
            <p><b>Телефон:</b> <a href="tel:${phoneHref}" class="no-underline">${CONTACTS.phone}</a></p>
            <p><b>Режим работы:</b> ${CONTACTS.schedule}</p>
            <p><b>Email:</b> <a href="mailto:${CONTACTS.email}" class="underline underline-offset-2">${CONTACTS.email}</a></p>
            <p><b>Адрес:</b> ${CONTACTS.address}</p>
          </div>
          <div class="socials">
            <a href="${links.vk}" aria-label="ВКонтакте"><img src="/icons/vk.jpg" alt="" /></a>
            <a href="${links.telegram}" aria-label="Telegram"><img src="/icons/tg.jpg" alt="" /></a>
          </div>
        </div>
      </div>

      <div class="site-footer__bar">
        <button class="to-top" type="button" aria-label="Наверх">
          <img src="/icons/up.svg" alt="" />
        </button>
        <p class="m-0 text-sm font-semibold">
          © 2020 – ${year} ${SITE_NAME}. Все права защищены.
          <a href="${links.privacy}" class="underline underline-offset-2">Политика конфиденциальности</a>
        </p>
      </div>
    </div>`;

  $('.to-top', root).addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
