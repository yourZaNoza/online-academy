// Какие cookie ставит сайт. Из этого списка собирается таблица на странице «Политика конфиденциальности».
// Подключили новый сервис (чат, пиксель соцсети и т.п.) — допишите его cookie сюда.

export type CookieKind = 'necessary' | 'optional';

export interface CookieInfo {
  name: string;
  /** Кто ставит cookie */
  owner: string;
  purpose: string;
  lifetime: string;
  /** necessary — работают всегда; optional — только после «Согласен» */
  kind: CookieKind;
}

export const COOKIE_KINDS: Record<CookieKind, string> = {
  necessary: 'Необходимые',
  optional: 'Только с согласия',
};

export const COOKIES: CookieInfo[] = [
  {
    name: 'cookie_consent',
    owner: 'Сайт академии',
    purpose: 'Запоминает ваш выбор в уведомлении о cookie, чтобы не показывать его на каждой странице.',
    lifetime: '1 год',
    kind: 'necessary',
  },
  {
    name: 'lead_source',
    owner: 'Сайт академии',
    purpose:
      'Запоминает, откуда вы пришли на сайт (рекламная ссылка или сайт-источник), чтобы мы видели это в заявке и понимали, какая реклама работает.',
    lifetime: '30 дней',
    kind: 'optional',
  },
  {
    name: '_ym_uid, _ym_d, _ym_isad, _ym_visorc и другие _ym_*',
    owner: 'Яндекс.Метрика (ООО «Яндекс»)',
    purpose: 'Обезличенная статистика посещений: сколько людей заходит на сайт и какие страницы смотрят.',
    lifetime: 'от сеанса до 1 года',
    kind: 'optional',
  },
  {
    name: 'yandexuid, i, yuidss и другие cookie Яндекса',
    owner: 'Яндекс.Карты (ООО «Яндекс»)',
    purpose: 'Работа интерактивной карты в подвале сайта.',
    lifetime: 'до 1 года',
    kind: 'optional',
  },
];
