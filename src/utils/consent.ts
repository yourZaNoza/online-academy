// Согласие посетителя на необязательные cookie (см. src/content/cookies.ts).
// Согласие хранится в cookie `cookie_consent` на год и копией уходит на сервер (api/consent.php):
// по журналу на сервере можно подтвердить, кто и когда дал согласие.

interface Consent {
  decision: 'accepted';
  version: string;
  /** Случайный номер посетителя — по нему запись ищется в журнале на сервере */
  id: string;
}

/** Версия текста согласия. Поменяйте (например, на '2027-01'), когда изменится политика, — баннер покажется всем снова */
export const CONSENT_VERSION = '2026-10';

const CONSENT_COOKIE = 'cookie_consent';
const YEAR = 365 * 24 * 60 * 60;
const CONSENT_URL = '/api/consent.php';
const CHANGE_EVENT = 'consentchange';

export function readCookie(name: string): string | null {
  const match = document.cookie.split('; ').find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

export function writeCookie(name: string, value: string, maxAgeSeconds: number): void {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secure}`;
}

function newId(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return [...crypto.getRandomValues(new Uint8Array(16))].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Согласие посетителя или null, если он ещё не нажал «Согласен» (или изменилась версия политики) */
export function getConsent(): Consent | null {
  const [decision, version, id] = (readCookie(CONSENT_COOKIE) ?? '').split('.');
  if (decision !== 'accepted' || version !== CONSENT_VERSION || !id) return null;
  return { decision, version, id };
}

export const hasConsent = (): boolean => getConsent() !== null;

/** «Согласен» в баннере: запоминаем в cookie и записываем в журнал на сервере */
export function saveConsent(): void {
  const decision = 'accepted';
  const id = newId();
  writeCookie(CONSENT_COOKIE, [decision, CONSENT_VERSION, id].join('.'), YEAR);

  const data = new FormData();
  data.set('id', id);
  data.set('decision', decision);
  data.set('version', CONSENT_VERSION);
  data.set('page', location.pathname);
  // sendBeacon дойдёт до сервера, даже если посетитель сразу уйдёт со страницы
  if (!navigator.sendBeacon?.(CONSENT_URL, data)) {
    fetch(CONSENT_URL, { method: 'POST', body: data, keepalive: true }).catch(() => {});
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Запускает callback один раз: сразу, если согласие уже есть, или когда посетитель нажмёт «Согласен» */
export function onConsent(callback: () => void): void {
  if (hasConsent()) return callback();
  window.addEventListener(CHANGE_EVENT, callback, { once: true });
}
