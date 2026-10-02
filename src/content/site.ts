// Общие данные сайта: меню и контакты. Правьте здесь — изменения попадут на все страницы.

export type PageId = 'academy' | 'courses' | 'masterclasses' | 'contests' | 'contacts';

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
  { id: 'contacts', label: 'Связь', href: '/contacts/' },
];

export interface HeaderCta {
  label: string;
  href: string;
}

/** Кнопка справа в шапке. Для отдельных страниц можно задать свою. */
export const DEFAULT_CTA: HeaderCta = { label: 'Записаться на консультацию', href: '/#consultation' };

export const PAGE_CTA: Partial<Record<PageId, HeaderCta>> = {
  courses: { label: 'Записаться на пробный урок', href: '/#consultation' },
};

export const CONTACTS = {
  fullName:
    'Автономная некоммерческая организация профессионального обучения и дополнительного профессионального образования «Кисловодская Академия искусств»',
  shortName: 'АНО ПО и ДПО «Кисловодская Академия искусств»',
  phone: '+7 928 346-48-27',
  hotline: '8 (800) 555-35-35',
  schedule: 'пн–сб 9:00–19:00 (Мск)',
  email: 'kis1academyofarts@gmail.com',
  address: '357700, Ставропольский край, г. Кисловодск, пр. Победы, 37А',
  rating: '5,0',
  links: {
    orgInfo: '#',
    govSite: '#',
    privacy: '#',
    vk: '#',
    telegram: '#',
  },
};
