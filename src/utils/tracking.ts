// Необязательные cookie — работают только после «Согласен» в cookie-баннере:
// Яндекс.Метрика и источник перехода для заявок (lead_source).

import { METRIKA_ID } from '../content/site';
import { onConsent, readCookie, writeCookie } from './consent';

const MONTH = 30 * 24 * 60 * 60;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

type Ym = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };

function loadMetrika(): void {
  if (!METRIKA_ID) return;
  const w = window as unknown as { ym?: Ym };
  const ym: Ym = (...args) => (ym.a ??= []).push(args);
  ym.l = Date.now();
  w.ym = ym;

  const script = document.createElement('script');
  script.src = 'https://mc.yandex.ru/metrika/tag.js';
  script.async = true;
  document.head.append(script);
  ym(METRIKA_ID, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true });
}

/**
 * Запоминает, откуда пришёл посетитель: метки рекламной ссылки (utm_*) или сайт-источник.
 * Сервер добавляет это в письмо с заявкой (api/send.php).
 */
function rememberSource(): void {
  const params = new URLSearchParams(location.search);
  const utm = UTM_KEYS.filter((key) => params.get(key)).map((key) => `${key}=${params.get(key)}`);
  if (utm.length) return writeCookie('lead_source', utm.join(', ').slice(0, 300), MONTH);

  if (readCookie('lead_source') || !document.referrer) return;
  const referrer = new URL(document.referrer);
  if (referrer.hostname !== location.hostname) writeCookie('lead_source', `переход с ${referrer.hostname}`, MONTH);
}

export function initTracking(): void {
  onConsent(() => {
    loadMetrika();
    rememberSource();
  });
}
