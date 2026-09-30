// Контент страницы «Курсы». Чтобы добавить курс или поменять цену — правьте массивы ниже.

export type Tone = 'peach' | 'cream' | 'lavender';

export type Audience = 'kids' | 'adults' | 'applicants' | 'beginners' | 'masters';

export const AUDIENCES: Record<Audience, string> = {
  kids: 'Для детей',
  adults: 'Для взрослых',
  applicants: 'Для поступающих',
  beginners: 'Для начинающих',
  masters: 'Для мастеров',
};

export interface Course {
  title: string;
  description: string;
  age: number;
  audience: Audience[];
  price: number;
  /** Подпись под ценой: «за курс», «за месяц», «длительность - 1 месяц» */
  priceNote: string;
  tone: Tone;
  /** Иконка-заглушка на обложке, пока нет картинки */
  icon: string;
  /** Картинка обложки из public/ (необязательно) */
  image?: string;
  /** Ссылка на страницу курса */
  href: string;
}

export const COURSES: Course[] = [
  {
    title: 'Рисунок с нуля',
    description:
      'Постановка руки и штриховки, контроль линий, техника скетчинга, композиция линий, градации света и тени — без художественного опыта.',
    age: 9,
    audience: ['beginners', 'kids'],
    price: 4900,
    priceNote: 'за курс',
    tone: 'peach',
    icon: '/icons/brush.svg',
    href: '#',
  },
  {
    title: 'Маленький творец',
    description: 'Программа для детей в доступной форме: знакомство с цветами, формами и первыми техниками.',
    age: 6,
    audience: ['kids', 'beginners'],
    price: 4600,
    priceNote: 'за курс',
    tone: 'cream',
    icon: '/icons/point.svg',
    href: '#',
  },
  {
    title: 'ПредПрофи. Дизайн. Худграф.',
    description:
      'Продвинутый уровень для тех, кто хочет отточить мастерство и собрать портфолио для поступления на направления: дизайн, худграф.',
    age: 14,
    audience: ['adults', 'applicants'],
    price: 6900,
    priceNote: 'длительность - 3 месяца',
    tone: 'lavender',
    icon: '/icons/picture.svg',
    href: '#',
  },
  {
    title: 'Композиция с нуля',
    description: 'Основные законы создания картины, построение перспективы — без художественного опыта.',
    age: 9,
    audience: ['beginners', 'kids'],
    price: 4900,
    priceNote: 'длительность - 1 месяц',
    tone: 'cream',
    icon: '/icons/gallery.svg',
    href: '#',
  },
  {
    title: 'Сказочный мир',
    description: 'Набор работ по композиции с сюжетами популярных сказок: от замка доброй феи, до золушки.',
    age: 6,
    audience: ['kids', 'beginners'],
    price: 3500,
    priceNote: 'за месяц',
    tone: 'lavender',
    icon: '/icons/message.svg',
    href: '#',
  },
  {
    title: 'Мастер акварелист',
    description:
      'Работы в технике акварель - пошаговое продвижение к продвинутому уровню живописи. Для тех, кто уже знаком с основами живописи.',
    age: 14,
    audience: ['adults'],
    price: 6900,
    priceNote: 'за курс',
    tone: 'peach',
    icon: '/icons/nav.svg',
    href: '#',
  },
  {
    title: 'Живопись с нуля',
    description:
      'Основы цветоведения, материалы, приемы живописи, лепка формы цветом объемных предметов. Передача фактуры материала.',
    age: 9,
    audience: ['beginners', 'kids'],
    price: 4900,
    priceNote: 'за месяц',
    tone: 'lavender',
    icon: '/icons/brush.svg',
    href: '#',
  },
  {
    title: 'Основы изобразительной грамоты',
    description: 'Графика, рисунок животных, натюрморт из трех предметов и более, разноплановый пейзаж, основы дизайна.',
    age: 10,
    audience: ['kids', 'beginners'],
    price: 6500,
    priceNote: 'за месяц',
    tone: 'peach',
    icon: '/icons/point.svg',
    href: '#',
  },
  {
    title: 'Мастер в технике гуашь',
    description:
      'Работы в технике гуашь - пошаговое продвижение к продвинутому уровню живописи. Для тех, кто уже знаком с основами живописи.',
    age: 14,
    audience: ['adults'],
    price: 6900,
    priceNote: 'за месяц',
    tone: 'cream',
    icon: '/icons/picture.svg',
    href: '#',
  },
  {
    title: 'Дизайн с нуля',
    description:
      'Статика и динамика, большое/малое пятно, стилизация объектов, шрифты, словообраз — без художественного опыта.',
    age: 9,
    audience: ['beginners', 'kids'],
    price: 4900,
    priceNote: 'за месяц',
    tone: 'lavender',
    icon: '/icons/brush.svg',
    href: '#',
  },
  {
    title: 'На пути к мастеру',
    description: 'Тематические натюрморты по рисунку, живописи. Композиции конкурсного уровня.',
    age: 12,
    audience: ['kids', 'beginners'],
    price: 8500,
    priceNote: 'за месяц',
    tone: 'peach',
    icon: '/icons/point.svg',
    href: '#',
  },
  {
    title: 'График-Профи',
    description: 'Работы в технике карандаш, соус, уголь, тушь, перо. Для тех, кто уже знаком с основами рисунка.',
    age: 14,
    audience: ['adults'],
    price: 6900,
    priceNote: 'за месяц',
    tone: 'cream',
    icon: '/icons/picture.svg',
    href: '#',
  },
  {
    title: 'Скульптура',
    description: 'Материаловедение, передача формы, фактуры, детализация — без художественного опыта.',
    age: 9,
    audience: ['beginners', 'kids'],
    price: 4900,
    priceNote: 'за месяц',
    tone: 'lavender',
    icon: '/icons/brush.svg',
    href: '#',
  },
];

// ---------- Форматы обучения (тарифы) ----------

export interface Plan {
  name: string;
  /** Цвет «наклейки» с названием */
  badge: 'orange' | 'light' | 'yellow' | 'dark';
  tone: Tone;
  /** Фоновая иконка-декор */
  decor: string;
  /** Пункты: included=false — пункт серый, без галочки */
  features: { text: string; included: boolean }[];
  /** Цена: число — надбавка к курсу, строка — произвольная надпись */
  price: { extra: number; old: number } | string;
}

const f = (text: string, included = true) => ({ text, included });

export const PLANS: Plan[] = [
  {
    name: 'Стандарт',
    badge: 'orange',
    tone: 'cream',
    decor: '/icons/camera.svg',
    features: [
      f('Самостоятельное изучение'),
      f('Полноценная программа<br>с модулями и уроками'),
      f('Доступ к лекциям'),
      f('Уроки в записи, возможность смотреть видеоматериал в любое время'),
      f('Проверка ДЗ', false),
      f('Чат с учениками', false),
      f('Сертификаты и грамоты', false),
      f('Онлайн-занятия<br>с учителями', false),
      f('Записи пройденных онлайн-занятий', false),
      f('Личные занятия с учителем', false),
      f('Личный куратор', false),
      f('Индивидуальная программа обучения', false),
    ],
    price: 'Бесплатно при покупке курса',
  },
  {
    name: 'Продвинутый',
    badge: 'light',
    tone: 'lavender',
    decor: '/icons/Pen.svg',
    features: [
      f('Самостоятельное изучение'),
      f('Полноценная программа<br>с модулями и уроками'),
      f('Доступ к лекциям'),
      f('Уроки в записи, возможность смотреть видеоматериал в любое время'),
      f('Проверка ДЗ'),
      f('Групповой чат с учениками'),
      f('Сертификаты и грамоты'),
      f('Онлайн-занятия<br>с учителями', false),
      f('Записи пройденных онлайн-занятий', false),
      f('Личные занятия с учителем', false),
      f('Личный куратор', false),
      f('Индивидуальная программа обучения', false),
    ],
    price: { extra: 3280, old: 6820 },
  },
  {
    name: 'Как в школе',
    badge: 'yellow',
    tone: 'peach',
    decor: '/icons/point.svg',
    features: [
      f('Самостоятельное изучение'),
      f('Полноценная программа<br>с модулями и уроками'),
      f('Доступ к лекциям'),
      f('Уроки в записи, возможность смотреть видеоматериал в любое время'),
      f('Проверка ДЗ'),
      f('Групповой чат с учениками'),
      f('Сертификаты и грамоты'),
      f('Онлайн-занятия<br>с учителями 1 раз в неделю'),
      f('Записи пройденных онлайн-занятий'),
      f('Личные занятия с учителем', false),
      f('Личный куратор', false),
      f('Индивидуальная программа обучения', false),
    ],
    price: { extra: 6820, old: 12340 },
  },
  {
    name: 'Премиум',
    badge: 'dark',
    tone: 'cream',
    decor: '/icons/picture.svg',
    features: [
      f('Самостоятельное изучение'),
      f('Полноценная программа<br>с модулями и уроками'),
      f('Доступ к лекциям'),
      f('Уроки в записи, возможность смотреть видеоматериал в любое время'),
      f('Проверка ДЗ'),
      f('Групповой чат с учениками'),
      f('Сертификаты и грамоты'),
      f('Онлайн-занятия<br>с учителями 1 раз в неделю'),
      f('Записи пройденных онлайн-занятий'),
      f('Личные занятия с учителем<br>до 2 раз в неделю'),
      // На макете у «Премиума» нет строки «Личный куратор» — при необходимости добавьте: f('Личный куратор'),
      f('Индивидуальная программа обучения'),
    ],
    price: { extra: 9530, old: 18980 },
  },
];
