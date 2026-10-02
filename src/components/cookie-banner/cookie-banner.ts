// Уведомление о cookie внизу экрана. Показывается, пока посетитель не нажмёт «Согласен».
// До этого необязательные cookie (Метрика, карта, источник заявки) не ставятся.

import { CONTACTS } from '../../content/site';
import { getConsent, saveConsent } from '../../utils/consent';
import './cookie-banner.css';

const COOKIE_ICON = `<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M27.5 16.5A11.5 11.5 0 1 1 15.5 4.5a4 4 0 0 0 5 5 4 4 0 0 0 7 7Z"/><circle cx="11" cy="13" r="1.3" fill="currentColor"/><circle cx="18" cy="20" r="1.3" fill="currentColor"/><circle cx="11.5" cy="21" r="1.3" fill="currentColor"/></svg>`;

let banner: HTMLElement | null = null;

function accept(): void {
  saveConsent();
  const el = banner;
  banner = null;
  if (!el) return;
  el.classList.add('is-hiding');
  el.addEventListener('animationend', () => el.remove(), { once: true });
  setTimeout(() => el.remove(), 400); // на случай, если анимации нет
}

function openCookieBanner(): void {
  banner = document.createElement('section');
  banner.className = 'cookie-banner';
  banner.setAttribute('aria-label', 'Уведомление о cookie');
  banner.innerHTML = `
    <span class="cookie-banner__icon">${COOKIE_ICON}</span>
    <p class="cookie-banner__text text-sm font-semibold leading-normal m-0">
      На сайте используются файлы cookie. Продолжая использование сайта, вы соглашаетесь на обработку своих
      персональных данных (<a href="${CONTACTS.links.consent}">согласие</a>). Подробности об обработке ваших данных — в
      <a href="${CONTACTS.links.privacy}">политике конфиденциальности</a>.
    </p>
    <div class="cookie-banner__actions">
      <button type="button" class="btn cookie-banner__btn text-sm font-bold">Согласен</button>
    </div>`;

  banner.querySelector('button')!.addEventListener('click', accept);
  document.body.append(banner);
}

export function initCookieBanner(): void {
  if (!getConsent()) openCookieBanner();
}
