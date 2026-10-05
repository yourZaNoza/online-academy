// Общие данные сайта: меню и контакты. Правьте здесь — изменения попадут на все страницы.

// agreement, privacy, consent — страницы документов, в меню их нет
export type PageId =
  | 'academy'
  | 'courses'
  | 'masterclasses'
  | 'contests'
  | 'gallery'
  | 'contacts'
  | 'agreement'
  | 'privacy'
  | 'consent';

export interface NavItem {
  id: PageId;
  label: string;
  href: string;
}

export const SITE_NAME = 'Кисловодская Онлайн-Академия искусств';

// Каждой странице соответствует папка с index.html в pages/ (pages/courses/index.html → /courses/)
export const NAV_ITEMS: NavItem[] = [
  { id: 'academy', label: 'Академия', href: '/' },
  { id: 'courses', label: 'Курсы', href: '/courses/' },
  { id: 'masterclasses', label: 'Мастер-классы', href: '/masterclasses/' },
  { id: 'contests', label: 'Конкурсы', href: '/contests/' },
  { id: 'gallery', label: 'Галерея', href: '/gallery/' },
];

export interface HeaderCta {
  label: string;
  href: string;
}

/** Кнопка справа в шапке. Для отдельных страниц можно задать свою. */
export const DEFAULT_CTA: HeaderCta = { label: 'Консультация', href: '/contacts/' };

export const PAGE_CTA: Partial<Record<PageId, HeaderCta>> = {};

// &nbsp; — неразрывный пробел: слова по обе стороны не разъедутся на разные строки
export const CONTACTS = {
  fullName:
    'Автономная некоммерческая организация профессионального обучения и дополнительного профессионального образования «Кисловодская Академия&nbsp;искусств»',
  shortName: 'АНО ПО и ДПО «Кисловодская Академия&nbsp;искусств»',
  /** Основной телефон (блок консультации) — онлайн-академия */
  phone: '8 928 008 22 25',
  /** Телефоны и режим работы в подвале; kind выделяется жирным */
  branches: [
    { kind: 'оффлайн', phone: '8 928 346-48-27', hours: 'пн–сб 9:00–19:00 (Мск)' },
    { kind: 'онлайн', phone: '8 928 008 22 25', hours: 'пн–пт 9:00–18:00 (Мск)' },
  ],
  email: 'kis-online-akademia@yandex.ru',
  /** Телефон из сообщения об ошибке отправки формы */
  hotline: '8 928 008 22 25',
  address: '357700, Ставропольский край, г. Кисловодск, пр.&nbsp;Победы,&nbsp;37А',
  rating: '4,9',
  links: {
    orgInfo: 'https://kislovodskacademyofart-school.profiedu.ru/sveden/common',
    govSite: 'https://kislovodskacademyofart-school.profiedu.ru/',
    privacy: '/privacy/',
    agreement: '/agreement/',
    consent: '/consent/',
    vk: 'https://vk.ru/club219874819',
    telegram: 'https://t.me/akademia_iskystv',
  },
  /** Карта из конструктора Яндекс.Карт: id карты — параметр um. height должна совпадать с высотой .map в styles/footer.css */
  mapWidget:
    'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A0273ffdf6a900bd4a8d90f2c9d6c8fd9cb03c47ccdc388835294b30d88c1e68f&width=100%25&height=232&lang=ru_RU&scroll=true',
};

/**
 * Номер счётчика Яндекс.Метрики (metrika.yandex.ru → настройки счётчика).
 * 0 — Метрика выключена. Включается только у посетителей, нажавших «Согласен» в cookie-баннере.
 */
export const METRIKA_ID = 0;
